/*
 * @(#) k040051.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试系统
 *    SubSystem: 考试子系统
 */
/**
 * @fileoverview 试题预览核对删除 JavaScript.
 *
 * @author liyanrui
 * @version 1.0
 */
/**
 * 核对通过处理.
 */
function checkPass(rowIndex) {
	
	// 火狐IE兼容
	firefoxIE();	

	//刷新信息
	var url = 'k040051CheckPass.action';
	var pars = 'question.questionVersionNo=' + encodeURI($F('questionVersionNo' + rowIndex)) +
	'& question.questionId=' +
	encodeURI($F('questionId' + rowIndex)) +
	'& question.updateTimeFlag=' +
	encodeURI($F('updateTime' + rowIndex)) +
	'& question.newFlg=' +
	encodeURI($F('newFlg' + rowIndex) +
	'& mode=' +
	encodeURI($F('mode')) +
	'& jsonQueIdList=' +
	$F('jsonQueIdList') +
	'& queId=' +
	encodeURI($F('queId')));
	pars = addStamp(pars);
	
	// 显示加载动画
	showLoader();
	
	var targetForm = $('K040051Form');
	targetForm.action = url + '?' + pars;
	targetForm.submit();
}

/**
 * 删除处理.
 */
function deleteBtn() {
	if (confirm(getMessage('js.tt.warn.JYW07'))) {
	
		// 显示加载动画
		showLoader();
		// 表单提交
		var url = 'k040051DeleteQuestion.action';
		$('K040051Form').action = url;
		$('K040051Form').submit();
	}
}

/**
 * 确认处理.
 */
function confirmBtn() {
	// 显示加载动画
	showLoader();
	
	
	// 接口参数.模式为<考试卷新建确认>或<考试卷修改确认>或<练习卷新建确认>或<练习卷修改确认>时
	if ($F('mode') == 8 || $F('mode') == 9 || $F('mode') == 10 || $F('mode') == 11) {
	
		// 设置Action
		var url = 'k040051ConfirmQuestion';
		// 设置参数
		var pars = $('K040051Form').serialize()
		// Ajax提交请求
		var myAjax = new Ajax.Request(url, {
			method: 'post',
			parameters: pars,
			onComplete: function(request) {
				var flg = checkException(request);
				if (!flg) {
					// 隐藏加载动画
					hideLoader();
					if (window.opener != null && !window.opener.closed) {
					
						var questionIdMap = new Hash();
						questionIdMap.set($F('queId'), true);
						window.close();
						window.opener.chooseQuestionCallBack(questionIdMap.toJSON());
					}
					
				}
			},
			onFailure: reportError
		});
		
	} else {
		// 表单提交
		var url = 'k040051ConfirmQuestion.action';
		$('K040051Form').action = url;
		$('K040051Form').submit();
	}
}

/**
 * 修改处理.
 */
function updateQuestion(rowIndex) {

	// 显示加载动画
	showLoader();
	
	// 表单提交
	var url = 'k040021InitUpdateQuesMode.action?questionId=' + $F('questionId' + rowIndex) + '&callScreenId=K040051' +
	'&questionIdList=' +
	$('jsonQueIdList').value;
	
	window.location.href = url;
}

function downloadFile(fileName) {
	// 表单提交
	var url = 'k040051DownloadAnswerFile.action?fileName=' + fileName;
	$('K040051Form').action = url;
	$('K040051Form').submit();
}

/**
 * 系统错误处理.
 */
function reportError() {
	alert(getMessage('js.com.error.0001'));
}

