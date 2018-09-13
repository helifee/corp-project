/*
 * @(#)k070021.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 考试系统
 */
/**
 * 检索成绩信息.
 */
function initPage(){
	 showLoader();
	 
	//设置列表颜色	
	listColor('table_scoreInfo');
	hideLoader();
}

function listPart() {
	//显示有效成绩	
	var url = 'k070021ShowValidScores.action';
	showList(url);	
}

function listAll() {
	//显示全部成绩
	var url = 'k070021ShowAllScores.action';
	showList(url);	
}
function showList(str) {	

	// 显示加载动画
    showLoader();
	var url = str;
	var pars = 'examId='+$('examId').value;
	
	//检索数据并刷新信息显示列表
	new Ajax.Updater('div_score_list', url, {
		method: 'post',
		parameters: pars,
		onLoading: function() {	
		},
		onSuccess: function(response) {	
		},
		onFailure: function(request) {	
			reportError();
		},
		onComplete: function(response) {	
		
			//Ajax异常检查	true:异常	false:正常
			var flg = checkException(response);
			if (!flg) {
				
				// 重置列表颜色
				listColor('table_scoreInfo');
				
				// 隐藏加载动画
                hideLoader();
			}		
		}
	});
}
/**
 * 系统错误处理.
 */
function reportError() {
	MsgBox.error(getMessage('js.com.error.0001'));
}
