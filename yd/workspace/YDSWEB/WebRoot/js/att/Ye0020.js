/*
 * @(#)Yc0020.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 
 */
/**
 * @fileoverview Yc0020画面JavaScript.
 *
 * @author liuyiwei
 * @version 1.0
 */
 
/**
 * 画面模式枚举.
 * 		1：用户请假申请
 * 		2:审批者察看
 * 		3：个人察看
 * 		4：交验出错
 */
var OpenEnum = {
    mode1: '1',
    mode2: '2',
    mode3: '3',
    mode4: '4'
};
var regexDateFormat = '^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$';

// 在加载完成时调用父页面接口
Event.observe(window, 'load', function() {
	parent.myInnerPageLoaded();
});

/**
 * 页面初始化.
 */
function init() {

	if ($F('mode') == OpenEnum.mode1) {
    	$('btnCancel').hide();
    }else{
		if ($F('mode') == OpenEnum.mode2) {
			$('btnCancel').hide();
			$('divrestDayType').disabled = true;
			$('restStartDate').disabled = true;
			$('divhalf').disabled = true;
			$('enddate').disabled = true;
			//$('exaSuggestion').disabled = true;
			$('flowForLeave').disabled = true;
			$('restReason').disabled = true;
			$('divrestType').disabled = true;
			$('divsuggestion').style.display = 'block';
			$('btnSubmit').hide();
		} else if ($F('mode') == OpenEnum.mode3) {
			$('divrestDayType').disabled = true;
			$('restStartDate').disabled = true;
			$('divhalf').disabled = true;
			$('enddate').disabled = true;
			//$('exaSuggestion').disabled = true;
			$('flowForLeave').disabled = true;
			$('restReason').disabled = true;
			$('divrestType').disabled = true;
			$('divsuggestion').style.display = 'block';
			$('btnSubmit').hide();
		} else if ($F('mode') == OpenEnum.mode4) {
			$('btnCancel').hide();
			getflowForLeave('&ye0020AttInfo.leaveDays=' + $('leaveDays').innerText);
		}

		var restDayTypeList = document.getElementsByName("ye0020AttInfo.restDayType");
		for (i = 0; i < restDayTypeList.length; i++) {
			if (restDayTypeList[i].checked) {
				initDayType(restDayTypeList[i].value);
			}
		} 
		
		var restTypeList = document.getElementsByName("ye0020AttInfo.restType");
		for (i = 0; i < restTypeList.length; i++) {
			if (restTypeList[i].checked) {
				initRestType(restTypeList[i].value);
			}
		} 
	}
	
}

function initDayType(restDayType){
	if(restDayType == 'H'){
		halfday();
	}else if(restDayType == 'S'){
		singleday();
	}else if(restDayType == 'M'){
		$('divenddate').style.display='block';
		$('startdate').update('起始日期');
		$('divtyperadio').style.display='block';
	}
}

function initRestType(restType){
	//$('leaveDaysHid').value = $('leaveDays').innerText;
	if(restType == 'H'){
		$('leaveDays').innerHTML = '共' + $('leaveDays').innerText + '天';
		$('exrestTime').innerHTML = '剩余换休：' + $('exrestTime').innerText+ '分';
		$('ptoDays').innerHTML = '';
	}else if(restType == 'N'){
		$('leaveDays').innerHTML = '共' + $('leaveDays').innerText + '天';
		$('ptoDays').innerHTML = '剩余年休：' + $('ptoDays').innerText + '天';
		$('exrestTime').innerHTML = '';
	}else{
		$('leaveDays').innerHTML = '共' + $('leaveDays').innerText + '天';
		$('exrestTime').innerHTML = '';
		$('ptoDays').innerHTML = '';
	}
}

function restDayTypeClick(restDayType){
	$('restStartDate').clear();
	$('enddate').clear();
	$('flowForLeave').options.length = 0;

	var restTypeList = document.getElementsByName("ye0020AttInfo.restType");
	for (i = 0; i < restTypeList.length; i++) {
		if (restTypeList[i].checked) {
			restTypeList[i].checked = false;
		}
	} 
	
	if(restDayType == 'H'){
		halfday();
	}else if(restDayType == 'S'){
		singleday();
	}else if(restDayType == 'M'){
		multiday();
	}
}
function halfday(){
	$('divhalf').style.display='block';
	$('divenddate').style.display='none';
	$('startdate').update('请假日期');
	$('divtyperadio').style.display='none';
}
function singleday(){	
	$('divhalf').style.display='none';
	$('divenddate').style.display='none';
	$('startdate').update('请假日期');
	$('divtyperadio').style.display='block';
}
function multiday(){
	$('leaveDays').innerHTML = '';
	$('exrestTime').innerHTML = '';
	$('ptoDays').innerHTML = '';
	$('divhalf').style.display='none';
	$('divenddate').style.display='block';
	$('startdate').update('起始日期');
	$('divtyperadio').style.display='block';
}

function submitAttRestApp(){
	$('errormsgDiv').innerHTML = '';
	//一天
	if($('divenddate').style.display == 'none' || $('divenddate').style.display == ''){
		//请假日期校验
   		addRequiredCheck($('restStartDate'), getMessage('js.com.warning.0001', '请假日期'), true);
		
		//半天
		if($('divhalf').style.display != 'none'){
			
			//addCustomCheck($('restHalfDayType'), getMessage('js.com.warning.0001', '上午下午'), 'restHalfDayType', function restHalfDayTypeCheck(){
				
			//	var restHalfDayTypeList = document.getElementsByName("ye0020AttInfo.restHalfDayType");
			//	var halfDayCheck = false;
			//	for (i = 0; i < restHalfDayTypeList.length; i++) {
			//		if (restHalfDayTypeList[i].checked) {
			//			halfDayCheck = true;
			//		}
			//	} 
			//	return halfDayCheck;
	
	    	//},true);
			
			//addRequiredCheck($('restHalfDayType'), getMessage('js.com.warning.0001', '上午下午'), true);
		}
	}else{
		//多天
		//请假日期校验
   		addRequiredCheck($('restStartDate'), getMessage('js.com.warning.0001', '起始日期'), true);
   		addRequiredCheck($('enddate'), getMessage('js.com.warning.0001', '终止日期'), true);
		
		// 开始与结束时间校验 
    	addCustomCheck($('restStartDate'), getMessage('js.com.warning.0006'), 'restStartDate', function timeCompare(){
			if (compareTime($('restStartDate'), $('enddate'))) {
            	removeFieldError($('restStartDate'));
        	}
        	return compareTime($('restStartDate'), $('enddate'));

    	});

	}
   
	//addRequiredCheck('restReason',getMessage('js.com.warning.0001','休假理由'), true);
	// 自动校验
    if (!checkForm('ye0020InfoForm')) 
        return;
	 
	// 表单提交
	//var url = 'ye0020InsertAttRestApp.action?';
	
	$('userId').disabled = false;
	$('userName').disabled = false;
	var pars = $('ye0020InfoForm').serialize();
	$('userId').disabled = true;
	$('userName').disabled = true;
	pars = pars +'&ye0020AttInfo.leaveDays=' + $('leaveDaysHid').value
				+'&ye0020AttInfo.ptoDays=' + $('ptoDaysHid').value
				+'&ye0020AttInfo.exrestTime=' + $('exrestTimeHid').value;

	//$('ye0020InfoForm').action = url + pars;
	//$('ye0020InfoForm').submit();
	pars = addStamp(pars);
	var myAjax = new Ajax.Request('ye0020InsertAttRestApp.action', {
		method: 'post',
		parameters: pars,
		onComplete: function(response) {
			if(checkException(response)){
				return;
			}
			parent.myInnerPageClose(); 
		}
	});
	//parent.myPopbox03.Close();
	//parent.searchAttList.defer();
	//parent.myInnerPageClose(); 
}

function cancelAttRestApp(){
	 MsgBox.message(getMessage('js.att.info.0005'), '确认对话框', function(){  
	
	 	//确定时表单提交
		var url = 'ye0020CancelAttRestApp.action?';
	
		$('ye0020InfoForm').action = url;
		$('ye0020InfoForm').submit();
		parent.myInnerPageClose(); 
	 });  

	
}

function countDays(paraRestType){
	
	if ($F('enddate') != "" && paraRestType == 'N') {
		// 年休跨年校验 
		addCustomCheck($('restStartDate'), getMessage('js.att.error.0009'), 'restStartDate', function timeCompare() {
			if ($F('restStartDate').substring(0, 4) != $F('enddate').substring(0, 4)) {
				return false;
			}
			return true;
		});
		// 自动校验
		if (!checkForm('ye0020InfoForm')) return;
	}	
	$('userId').disabled = false;
	$('userName').disabled = false;
	var pars = $('ye0020InfoForm').serialize();
	$('userId').disabled = true;
	$('userName').disabled = true;
	
	pars = addStamp(pars);
		
	var myAjax = new Ajax.Request('ye0020getAttDaysCnt.action', {
		method: 'post',
		parameters: pars,
		onComplete: function(response){
			leaveDaysInfo = response.responseText.evalJSON(true);
			$('leaveDaysHid').value = leaveDaysInfo.leaveDays;
			if(leaveDaysInfo.restType == 'H'){
				$('exrestTimeHid').value = leaveDaysInfo.exrestTime;
				$('leaveDays').innerHTML = '共' + leaveDaysInfo.leaveDays + '天';
				$('exrestTime').innerHTML = '剩余换休：' + leaveDaysInfo.exrestTime+ '分钟';
				$('ptoDays').innerHTML = '';
			}else if(leaveDaysInfo.restType == 'N'){
				$('ptoDaysHid').value = leaveDaysInfo.ptoDays;
				$('leaveDays').innerHTML = '共' + leaveDaysInfo.leaveDays + '天';
				$('ptoDays').innerHTML = '剩余年休：' + leaveDaysInfo.ptoDays + '天';
				$('exrestTime').innerHTML = '';
			}else{
				$('leaveDays').innerHTML = '共' + leaveDaysInfo.leaveDays + '天';
				$('exrestTime').innerHTML = '';
				$('ptoDays').innerHTML = '';
			}
			
			getflowForLeave('&ye0020AttInfo.leaveDays=' + leaveDaysInfo.leaveDays);
		}
	});
}

function getflowForLeave(parpars){
	
	$('userId').disabled = false;
	$('userName').disabled = false;
	var pars = $('ye0020InfoForm').serialize() + parpars;
	$('userId').disabled = true;
	$('userName').disabled = true;
	
	var myAjax = new Ajax.Request('ye0020getflowForLeave.action', {
		method: 'post',
		parameters: pars,
		onComplete: function(response){
			
			var optionIdPre;
			flowForLeaveInfo = response.responseText.evalJSON(true);
			
			for (var i = 0, len = flowForLeaveInfo.length; i < len; i++) {
	            optionIdPre = $('flowForLeave').id + '_';
	            if ($(optionIdPre + i) == null) {
	                $('flowForLeave').insert({
	                    bottom: new Element('option', {
	                        'id': optionIdPre + i
	                    })
	                });
	            }
	            $(optionIdPre + i).value = flowForLeaveInfo[i].flowForLeaveId;
	            $(optionIdPre + i).update(flowForLeaveInfo[i].flowForLeaveName);
	            $(optionIdPre + i).show();
	    	}
		}
	});
}
