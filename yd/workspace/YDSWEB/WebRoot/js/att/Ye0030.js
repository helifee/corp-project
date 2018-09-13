/*
 * @(#)Yc0010.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 
 */
/**
 * @fileoverview XX画面JavaScript.
 *
 * @author 
 * @version 1.0
 */
 
var g_correctInfo;

/**
 * 页面初始化.
 */
function init() {
	/**员工Id和姓名自动匹配*/
	new JsNameFilter('accId', 'accName', window['g_basePath']);
	parent.$('myInnerPage').height = '295px';
	parent.$('myInnerPage').width = '510px';
	parent.g_box_correct.Popup();
	$('accId').value = $('loginId').value;
	$('accId').disable();
	$('accName').disable();
	
	//固定日期时，日期控件不可用
	if ($('attDate').value != '') {
		$('attDate').disable();
	}
	
	if ($('aftStartDateTime').value != '') {
		$('aftStartTime').value = $('aftStartDateTime').value.substring(11,16);
	} else {
		$('aftStartTime').value = '08:00';
	}
	
	if ($('aftEndDateTime').value != '') {
		$('aftEndTime').value = $('aftEndDateTime').value.substring(11,16);		
	} else {
		$('aftEndTime').value = '17:00';
	}

	if ($('loginId').value == $('loginId_A').value) {
		if ($('statusCor').value == '1' || $('statusCor').value == '2') {
			$('btnInsert').style.display = 'none';
			$('btnDelete').style.display = 'block';
		} else if ($('statusCor').value == '') {
			$('btnInsert').style.display = 'block';
			$('btnDelete').style.display = 'none';
		} else {
			$('btnInsert').style.display = 'none';
    		$('btnDelete').style.display = 'none';
		}
	} else {
		$('btnInsert').style.display = 'none';
    	$('btnDelete').style.display = 'none';
	}
	
	if ($('suggestion').value != ''&& $F('statusCor')=='5') {
		$('divSuggestion').style.display = 'block';
		parent.$('myInnerPage').height = '350px';
	} else {
		$('divSuggestion').style.display = 'none';
	}
	
	//首打卡时间
	if($('firstTime').innerHTML == ''){
		$('firstTime').innerHTML = '&nbsp;';
	}
	//末打卡时间
	if($('lastTime').innerHTML == ''){
		$('lastTime').innerHTML = '&nbsp;';
	}
	//变更前开始时间
	if($('befStartTime').innerHTML == ''){
		$('befStartTime').innerHTML = '&nbsp;';
	}
	//变更前结束时间
	if($('befEndTime').innerHTML == ''){
		$('befEndTime').innerHTML = '&nbsp;';
	}
}
 
/**
 * 考勤更正信息取得.
 * 
 */
function getCorrectInfo(){
	if ($F('attDate') != '') {
		var url = 'ye0030findbyid.action';
		pars = addStamp('loginId=' + $F('loginId') + '&attDate=' + $F('attDate'));
		new Ajax.Request(url, {
			method: 'get',
			parameters: pars,
			onComplete: function(request){
				if (checkException(request)) {
					return;
				}
				setAttTime(request);
			}
		});
	}
}
/**
 * 画面表示
 */
function setAttTime(request){
	// 将返回的JSON串解析成考勤更正申请信息对象
	g_correctInfo = request.responseText.evalJSON(true);

	if(g_correctInfo.errMessage != ''){
		$('attDate').value = '';
		MsgBox.message(g_correctInfo.errMessage);
	} else {
		//首打卡时间设置
		if(g_correctInfo.firstTime != ''){
			$('firstTime').innerHTML = g_correctInfo.firstTime;
		} else {
			$('firstTime').innerHTML = '&nbsp;';
		}
		//末打卡时间设置
		if(g_correctInfo.lastTime != ''){
			$('lastTime').innerHTML = g_correctInfo.lastTime;
		} else {
			$('lastTime').innerHTML = '&nbsp;';
		}
		//变更前开始时间设置
		if(g_correctInfo.befStarthhmm != ''){
			$('befStartTime').innerHTML = g_correctInfo.befStarthhmm;
		} else {
			$('befStartTime').innerHTML = '&nbsp;';
		}
		//变更前结束时间设置
		if(g_correctInfo.befEndhhmm != ''){
			$('befEndTime').innerHTML = g_correctInfo.befEndhhmm;
		} else {
			$('befEndTime').innerHTML = '&nbsp;';
		}
		//变更后开始时间
		if(g_correctInfo.aftStartTime != ''){
			$('aftStartTime').value = g_correctInfo.aftStartTime.substring(11,16);
		} else {
			$('aftStartTime').value = '08:00';
		}
		//变更后结束时间
		if(g_correctInfo.aftEndTime != ''){
			$('aftEndTime').value = g_correctInfo.aftEndTime.substring(11,16);
		} else {
			$('aftEndTime').value = '17:00';
		}
		//申请理由
		$('correctReason').value = g_correctInfo.correctReason;

		if (g_correctInfo.aftStartTime != "" && $('attDate').value != g_correctInfo.aftStartTime.substring(0,10)) {
			$('chkStartTime').checked = "true";
		}
		if (g_correctInfo.aftEndTime != "" && $('attDate').value != g_correctInfo.aftEndTime.substring(0,10)) {
			$('chkEndTime').checked = "true";
		}
      
	  	var attExamin = g_correctInfo.attExamin;
		
		for (i = 0, ilen = attExamin.length; i < ilen; i++) {
			$('tradeType').options[i] = new Option(attExamin[i].orgSnm,attExamin[i].orgId);
		}
	  
		if (g_correctInfo.statusCor != "") {
			$('btnInsert').style.display = 'none';
			$('btnDelete').style.display = 'block';
		} else {
			$('btnInsert').style.display = 'block';
			$('btnDelete').style.display = 'none';
		}
	}
}

/**
 * 考勤更正信息提交.
 * 
 */
function setTime(){
	
	 if ($('chkStartTime').checked) {
		 $('aftStartDateTime').value = getTomorrow($('attDate').value) + " " + $('aftStartTime').value;
	 } else {
		 $('aftStartDateTime').value = $('attDate').value + " " + $('aftStartTime').value;
	 }
	 if ($('chkEndTime').checked) {
		 $('aftEndDateTime').value = getTomorrow($('attDate').value) + " " + $('aftEndTime').value;
	 } else {
		 $('aftEndDateTime').value = $('attDate').value + " " + $('aftEndTime').value;
	 }
	addRequiredCheck('attDate',getMessage('js.com.warning.0001','考勤日期'), true);
	addRequiredCheck('aftStartTime',getMessage('js.com.warning.0001','更新后开始时间'), true);
	addRequiredCheck('aftEndTime',getMessage('js.com.warning.0001','更新后结束时间'), true);
	addRequiredCheck('correctReason',getMessage('js.com.warning.0001','理由'), true);
	
	// 更新后开始与结束时间校验 
    addCustomCheck($('aftStartTime'), '开始时间不能大于结束时间', 'aftStartTime', function timeCompare(){
         if (compareTime($('aftStartDateTime'), $('aftEndDateTime'))) {
            removeFieldError($('aftStartTime'));
        }
        return compareTime($('aftStartDateTime'), $('aftEndDateTime'));

    });

    checkInput($('aftStartTime'));

  	if (checkForm('attCorrectForm')) {
		MsgBox.confirm(getMessage('js.att.info.0004'), '确认对话框', function(){
			$('attDate').enable();
			var url='ye0030insert.action';
			var pars=$('attCorrectForm').serialize();
			pars = addStamp(pars);
			new Ajax.Updater('div_att_info', url, {
			method: 'get',
			parameters: pars,
			onComplete: function(response){
				if(checkException(response)){
						return;
			    }

				if(response.responseText != ''){
					MsgBox.message(response.responseText);
					return;
				}
				parent.g_box_correct.Close();
				parent.searchAttInfo($('attDate').value.substring(0,4), $('attDate').value.substring(5,7));
			}
		  });
		  }, function(){
	        // 取消时回调
	        return;
	    }, '是', '否');
	} 
}

/**
 * 考勤更正信息撤销.
 * 
 */
function deleteTime(){
	MsgBox.confirm(getMessage('js.att.info.0005'), '确认对话框', function(){
			$('attDate').enable();
		    var url='ye0030delete.action';
			var pars=$('attCorrectForm').serialize();
			pars = addStamp(pars);
			new Ajax.Updater('div_att_info', url, {
			method: 'get',
			parameters: pars,
			onComplete: function(response){
				if(checkException(response)){
						return;
			    }
				if(response.responseText != ''){
					MsgBox.message(response.responseText);
					return;
				}
				parent.g_box_correct.Close();
				parent.searchAttInfo($('attDate').value.substring(0,4), $('attDate').value.substring(5,7));
			}
		  });
    }, function(){
        // 取消时回调
        return;
    }, '是', '否');
}
function getTomorrow(strtoday){

	var today=new Date(strtoday.substring(0,4),strtoday.substring(5,7) - 1,strtoday.substring(8,10));
	var tomorrow=new Date(today.valueOf()+1*24*60*60*1000);
	var showDatetomorrow=tomorrow.getYear()+"-"+(tomorrow.getMonth()+1)+"-"+tomorrow.getDate();
	return showDatetomorrow;

}


   
