/*
 * @(#)Yd0020.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 社内团购
 */
/**
 * @author pengchuan
 * @version 1.0  2010/10/29
 */
/**
 *初期画面加载
 */
function initForm(){
	
    //存取管理画面员工姓名和Id自动匹配
	new JsNameFilter('accId', 'accName', window['g_basePath']);
	//履历查询画面员工姓名和Id自动匹配
    new JsNameFilter('accId2', 'accName2', window['g_basePath']);
	$('comAccId').value=$('accComId').value;
    if ($('reloadFlg').value=='1'){
        nTabs($('record_tab'),1);
		changeAcc();
    }
}

/**
 * 点击账户类型控件隐藏处理（存取管理画面）
 */

function changeFlag(){
	removeFieldError('money');
	$('accId').value="";
	$('accName').value="";
	$('money').value="";
	if($($NN('tansferCondA.accFlag')[0]).checked){
		
		$('company').removeClassName('none');
		$('personal').addClassName('none');
		$('remain').removeClassName('none');
		$('enableRemain').innerHTML=$('gpsRemain').innerHTML;  
		removeCheck('money','double');
	}
	else{
		$('company').addClassName('none');
		$('personal').removeClassName('none');
		$('remain').addClassName('none');
		removeCheck('money','double');
	}
}
/**
 * 点击存取方式隐藏控件处理（存取管理画面）
 */
function changeType(){
    removeFieldError('money');
	if($($NN('tansferCondA.ioFlag')[0]).checked){
		$($NN('tansferCondA.ioFlag')[0]).value='1';
		$('save').removeClassName('none');
		$('out').addClassName('none');
		removeCheck('money','double');
	}
	else{
		$($NN('tansferCondA.ioFlag')[0]).value='2';
		$('save').addClassName('none');
		$('out').removeClassName('none');
		removeCheck('money','double');
	}	
}

/**
 * 点击账户类型隐藏控件处理（履行查询画面）
 */
function changeAcc(){
	
	if($($NN('yd0020CondA.accFlag')[0]).checked){
		$($NN('yd0020CondA.accFlag')[0]).value='1';
		$('comAcc').removeClassName('none');
		$('perAcc').addClassName('none');
		$('accComId').value=$('comAccId').value;
		$('accName2').value="";
		$('accId2').value="";
		$('accComId').enable();
		$('accId2').disable();
	}
	else{
	    $('accComId').value="";
		$('accComId').disable();
		$('accId2').enable();
		$($NN('yd0020CondA.accFlag')[0]).value='2';
		$('comAcc').addClassName('none');
		$('perAcc').removeClassName('none');
		if ($('reloadFlg').value== '1') {
			
			$('accId2').value = $('accId2').value.substring(2);
		}
		else{
			$('accName2').value="";
		    $('accId2').value="";
		}
	}	
}
/**
 * 取得公司账户余额
 */
function  getComRemain(){
	removeFieldError('money');
	if($('comAccId').value=='YS999999'){
		
		$('enableRemain').innerHTML=$('gpsRemain').innerHTML;
		removeCheck('money','double'); 
	}
	else{
		$('enableRemain').innerHTML=$('cafeRemain').innerHTML;
		removeCheck('money','double');
	}
}
/**
 * 取得个人账户余额
 */
function getPerRemain2(){
    
    if ($('accId').value != "" || $('accName').value != "") {
        $('remain').removeClassName('none');
        var url = 'yd0020getperRemain.action';
        pars = 'pesAccId=' + $('accId').value;
        pars = addStamp(pars);
        new Ajax.Updater('enableRemain', url, {
            method: 'get',
            parameters: pars,
            onComplete: function(response){
            	if (checkException(response)) {
                    return;
                }
            }
        });
    }
}
/**
 * 取得个人账户余额
 */
function getPerRemain(){
	getPerRemain2.delay(0.5);
}

/**
 * 存取钱操作
 */
function  accessMoney(){
	var msgcotent;
	addRequiredCheck('money', getMessage('js.com.warning.0001','存取金额'), true);
	if($($NN('tansferCondA.ioFlag')[0]).checked){
		addDoubleCheck('money', getMessage('js.com.warning.0014','存入金额',0.01,999.99), 0.01,999.99);
	    msgcotent = $('iodiv').getElementsBySelector('[for="'+$NN('tansferCondA.ioFlag')[0].id+'"]')[0].innerHTML;
	}
	else{
		if($('enableRemain').innerHTML <= 999.99 && $('enableRemain').innerHTML > 0){
			addDoubleCheck('money', getMessage('js.com.warning.0014','取出金额',0.01,$('enableRemain').innerHTML), 0.01, $('enableRemain').innerHTML);
		}
		else{
			addDoubleCheck('money', getMessage('js.com.warning.0014','取出金额',0.01,999.99), 0.01,999.99);
		}
	    msgcotent = $('iodiv').getElementsBySelector('[for="'+$NN('tansferCondA.ioFlag')[1].id+'"]')[0].innerHTML;
	}
    if ($($NN('tansferCondA.accFlag')[1]).checked) {
        addRequiredCheck('accId', getMessage('js.com.warning.0001','个人账户'), true);
    }
    else {
		 removeCheck('accId', '*');
    }
    if (!checkForm('accessMoneyForm')) {
        return;
    }

    MsgBox.confirm(getMessage('js.gps.info.0031',msgcotent,$('money').value), '确认对话框', function(){
    
        var url = 'yd0020SaveTrans.action';
        $('accessMoneyForm').action = url;
        $('accessMoneyForm').submit();
    }, function(){
        // 取消时回调
        return;
    }, '是', '否');
}

/**
 * 交易履历查询一览
 */
function searchExchangeHis(){

   if($($NN('yd0020CondA.accFlag')[0]).checked){
        $('accId2').clear();
    }
    if (!checkForm('compAccInfoForm')) {
        return;
    }
    var url = 'yd0020findExHisList.action';
    var pars = $('compAccInfoForm').serialize() + '&pageNumber=1';
    $('oldParam').value = $('compAccInfoForm').serialize();
    pars = addStamp(pars);
    new Ajax.Updater('div_company_accountInfoList', url, {
        method: 'get',
        parameters: pars,
        onComplete: function(response){
        
            if (checkException(response)) {
                return;
            }
        }
    });
}

/**
 * 分页时使用的ajax提交函数.
 */
function pagerCommonTag(pageUrl, pageNumber){
    var url = pageUrl;
    var pars =$('oldParam').value+ '&pageNumber=' + pageNumber;
    new Ajax.Updater('div_company_accountInfoList', url, {
        method: 'get',
        parameters: pars
    });
}
/**
 * 选项卡处理
 * @param {Object} thisObj
 * @param {Object} Num
 */
function nTabs(thisObj,Num){
    
    if (thisObj.className == "active") 
        return;
    var tabObj = thisObj.parentNode.id;
    var tabList = $(tabObj).select('li');
    for (i = 0; i < tabList.length; i++) {
        if (i == Num) {
            if (i == tabList.length - 1) {
                thisObj.className = 'active bd_r_1sccc';
            }
            else {
                thisObj.className = 'active';
            }
            $(tabObj + '_Content' + i).setStyle({
                display: 'block'
            });
        }
        else {
            if (i == tabList.length - 1) {
                tabList[i].className = 'normal bd_r_1sccc';
            }
            else {
                tabList[i].className = 'normal';
            }
            $(tabObj + '_Content' + i).setStyle({
                display: 'none'
            });
        }
    }
}
