/*
 * @(#)commonPageLock.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: sample
 */


/**
 
 * @author fengliang
 * @version 1.0 2010/06/13
 */

var frontTime =new Date().getTime() / 1000; //上一次onMouseDown或者onkeyDown的时
var isFirstReq = 1;//1:第一次触发；2:不是第一次触发；
var pageNameCommon;
function autoPageCheck(pageNameParam, lockIdParam, 
		mainActionUrlParam, stateFlag){
	
	pageNameCommon = pageNameParam;
	
	if(stateFlag == 'success'){
		autoCheckBind(lockIdParam);
	}
		
	//页面排他时，弹出当前正在登陆的用户名称
	var userName = $('userNameHide').value;
	var url = mainActionUrlParam + '?proType=' + 'kickCheck';
	if(userName != ""){    
       MsgBox.confirm(userName + '已经登陆' + pageNameCommon + '，是否踢掉？', '页面排他', 
              function(){
    	 	      $('pagerForm').action = url; 
		          $('pagerForm').submit();
    	      },
              function(){
                  window.history.back(-1);
    	      }, 'Yes', 'No');
	}
	
}

function autoCheckBind(lockIdParam){
	window.tempCheckSumbit = autoCheckSumbit.curry(lockIdParam);
	setInterval('tempCheckSumbit()', 120000);
	
	document.body.onmousedown=function(){
		var currentTime = new Date().getTime() / 1000;
		if( (isFirstReq == 1) || (currentTime - frontTime) > 60){
			autoCheckSumbit(lockIdParam);
			frontTime = currentTime;
			if(isFirstReq == 1){
				isFirstReq = 2;
			}
		}	
	};
	document.body.onkeydown=function(){
		var currentTime = new Date().getTime() / 1000;
		if( (isFirstReq == 1) || (currentTime - frontTime) > 60){
			autoCheckSumbit(lockIdParam);
			frontTime = currentTime;
			if(isFirstReq == 1){
				isFirstReq = 2;
			}
		}	
	};
}
function autoCheckSumbit(paramLock){
	
	var url = $('commonActionPath').value + 'common/checkLockAction.action?lockId=' + paramLock;
	new Ajax.Request(url, {
		onComplete: function(response) {
		    //Ajax异常检查	true:异常	false:正常
		    var flg = checkException(response);
		    if(!flg) {
			    //正常时执行自已的操作
			    if (response.responseText.empty() == false) {
				    MsgBox.message('用户' + response.responseText + '已经登陆' + pageNameCommon + '，你被踢掉了！',
						       '页面排他', 
						       function(){
                                     top.location = $('commonActionPath').value;
				                });
				}
		    }

			}
		}
	);
}

