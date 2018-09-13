/*
 * @(#)pagerSample.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: sample
 */
 
var pageName = '分页共通';
var lockId = 'lock1'; //
var mainActionUrl = 'pagerSampleMainAction.action'; //

//点击 第几页时调用的提交函数。
function pagerCommonTag(pageUrl , pageNumber){
	
	//调用自己的具体实现 函数 ，该函数中必须至少包含pageUrl , pageNumber两个参数
	myOwnPagerSubmit(pageUrl , pageNumber);

}

//实现自己的分页提交。
function myOwnPagerSubmit(pageUrl , pageNumber){
	
	//从隐藏控件中取出上次使用的检索条件
	var pars = $('oldParam').value;
	//设定url以及其余参数
	var url = pageUrl +'&pageNumber=' + pageNumber + '&' +pars;
	new Ajax.Updater('div_pagerCommonAjax', url , {    
		   onLoading : function() {},
		   onSuccess : function(response) {},
		   onComplete : function(response) {
			   var flg = checkException(response);
			    if(!flg) {		    	
		    			listColor('pagerCommonList');  

			    }
		   }
	   });		
}

//点击搜索时的提交函数
function submitInfo(){
	autoCheckSumbit(lockId);
	var url = 'pagerSampleAction.action';
	
	//把检索条件所在的form串行化后，设到隐藏控件oldParam中，
	//然后使用oldParam的值，进行检索。（点击下一页的时候也是用这个隐藏控件的值）
	var pars = $('pagerForm').serialize();
	$('oldParam').value = pars;
	pars = 'pageNumber=0&'+pars;
	new Ajax.Updater('div_pagerCommonAjax', url , {    
		   parameters: pars,
		   onLoading : function() {
	        },
	       onSuccess:function(request){
	       },
	       onFailure: function(request){
	       },
		   onComplete : function(response) {	    	 
	    	   var flg = checkException(response);
			   if(!flg) {		    	  
		    			listColor('pagerCommonList');
	           }
		   }
	   });		
}

function initForm(stateFlag){		
	// 调用页面排他检索函数
	autoPageCheck(pageName, lockId, mainActionUrl, stateFlag);	
}
