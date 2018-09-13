/*
 * @(#)k060021.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 考试子系统
 */
/**
 * @fileoverview 考试详细（用户）JavaScript.
 *
 * @author tengchanglong
 * @version 1.00 2010/04/26
 */

/**
 * 画面onload.
 */
function initForm() {

}

/**
 * 报名申请提交.
 */
function applySubmit() {
	if(confirm(getMessage('js.tt.warn.KSW15'))){
		// 显示加载动画
	    showLoader();
		 
		// 表单提交
		var url = 'k060021ApplySubmit.action?'+dataSerialize($('k060021Form'));
		$('k060021Form').action = url;
		$('k060021Form').submit();	
	}
}

/**
 * 报名申请取消.
 */
function applyCancelSubmit() {
	if(confirm(getMessage('js.tt.warn.KSW27'))){
		
		// 显示加载动画
     	showLoader();
	 
		// 表单提交
		var url = 'k060021ApplyCancel.action?'+dataSerialize($('k060021Form'));
		$('k060021Form').action = url;
		$('k060021Form').submit();
	}
}

/**
 * 考试开始提交.
 */
function examStartSubmit(){
	// 显示加载动画
    //showLoader();
	
    var url = "k060031InitWaitPage.action?examineId="+$('examineId').value
    +'&examineStatus=0';	
	window.open(url,'examineWin');

	// 表单提交
	//var url = 'k060021ExamStart.action?'+dataSerialize($('k060021Form'));
	//$('k060021Form').action = url;
	//$('k060021Form').submit();
}

/**
 * 考试继续提交.
 */
function examContinueSubmit(){
	
	// 显示加载动画
    showLoader();
	
	// 表单提交
	var url = 'k060021ExamContinue.action?'+dataSerialize($('k060021Form'));
	$('k060021Form').action = url;
	$('k060021Form').submit();	
}

/**
 * 重新考试提交.
 */
function examAgainSubmit(){
	
	// 显示加载动画
    //showLoader();
	
	// 表单提交
//	var url = 'k060021ExamRestart.action?'+dataSerialize($('k060021Form'));
//	$('k060021Form').action = url;
//	$('k060021Form').submit();
	var url = 'k060031InitWaitPage.action?examineId='+$('examineId').value
	+'&examineStatus=1';
	window.open(url,'examineWin');
	
}

/**
 * 查看答卷提交.
 */
function resultCheckSubmit(){

	// 显示加载动画
    showLoader();

	// 表单提交
	//var url = 'k060091TestAnswerViewMode.action?'+dataSerialize($('k060021Form'));
	//$('k060021Form').action = url;
	//$('k060021Form').submit();
	
	var url = 'k060091TestAnswerViewMode.action?examineId='+$('examineId').value
	+'&examineJoinTimes='+$('examEmployeeInfo.examineJoinTimes').value;
	window.open(url,'viewAnswerWin');
}

 /**
  * 更新关注度.
  */
function attentionChange(){
	
	// 显示加载动画
    showLoader();
	 
	// 表单提交
	var url = 'k060021UpdateAttention.action?'+dataSerialize($('k060021Form'));
	$('k060021Form').action = url;
	$('k060021Form').submit();	
	
/*	// 显示加载动画
    showLoader();
	
	var url = 'k060021UpdateAttention.action';
	var pars = 'testId='+$('examineId').value+'&attentionFlg='+$('attentionList').value;
	pars = addStamp(pars);
	var myAjax = new Ajax.Request(url, {
        method: 'post',
        parameters: pars,
        onComplete: function(request){
            if (request.responseText == 'error') {
                MsgBox.error(getMessage('js.tt.error.0001'));
            }
            else {
                // 提交成功，画面关注度随之改变
				$('testInfo.attention').innerHTML = $('attentionList').options[$('attentionList').selectedIndex].text;
            }
			
			// 隐藏加载动画
            hideLoader();
        }
    });*/
	
	

}
