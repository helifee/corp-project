/*
 * @(#)k060111.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 考试系统
 */
/**
 *  评分任务分配JavaScript.
 *
 * @author qiliqiang
 * @version 1.0
 */
/**
 * 画面onload.
 */
function initForm() {
	// 每十分钟更新一次排他锁
	window.setInterval(updateLock,600000);
	 
	// 员工ID和姓名共通
	initTtJsNameFilter("singleMarkerId", "singleMarkerNm");
	
	// 分配方式可用区分
	var assignModeAbled = $('assignModeAbled').value;
	
	// 分配方式不可用
	if (assignModeAbled == "false") {
		$('selAssignMode').disable();
	}
	if (!assignCheck()) {
		return false;
	}
	return true;
}

/**
 * 更新排他锁.
 */
function updateLock(){
	var url = 'k060111UpdateLock.action';
	var params = 'examineId=' + $F('examineId');
	params = addStamp(params);
	new Ajax.Request(url, { 
		method: 'get', 
		parameters: params,
		onComplete : function(response) {
			var flg = checkException(response);
		}
	}); 
}

/**
 * 分配方式选择.
 */
function assignCheck() {
	// 分配方式取得
	//var selAssignMode = $('selAssignMode').options[$('selAssignMode').selectedIndex].value;
	var selAssignMode = $F('selAssignMode');
	// 分配方式控制画面显示
	if (selAssignMode == "1") {
		$('div_question').addClassName('none');
		$('div_paper').removeClassName('none');
		//表格隔行变色
		listColor('tb_PaperNumList');
		listColor('empPaperListTb');
	} else if (selAssignMode == "2") {
		$('div_paper').addClassName('none');
		$('div_question').removeClassName('none');
		
		//表格隔行变色
		listColor('tb_QuestionNumList');
		listColor('empQuestionListTb');
	}
	
	return true;
}

/**
 * 评分者设定.
 */
function setMarker() {
	//按试卷分配
	if ($F('selAssignMode') == '1') {
		setPaperMark();
	}
	//按大题分配
	if ($F('selAssignMode') == '2') {
		setBigQuestionMark();
	}
	// 清空评分者文本输入框
	$('singleMarkerId').clear();
	$('singleMarkerNm').clear();
}

/**
 * 试卷评分者设定.
 */
function setPaperMark() {
	// 分配的试卷数
	var assignPaperNum = 0;
	// 单独评分者ID
	var singleMarkerId = $F('singleMarkerId');
	// 单独评分者姓名
	var singleMarkerNm = $F('singleMarkerNm');
	if (singleMarkerId != '' && singleMarkerNm != '') {
		// 遍历选中的checkbox
		for (var i = 0; i < $('empPaperListTb').rows.length; i++) {
			// 选中的试卷
			if ($('empPaperListTb').select('tr')[i].down(1).checked) {
				// 无评分者
				if ($('empPaperListTb').select('tr')[i].down(0).next(2).innerHTML == "") {
					//更新评分者姓名
					$('empPaperListTb').select('tr')[i].down(0).next(2).innerHTML = singleMarkerNm;
					//更新评分状态
					$('empPaperListTb').select('tr')[i].down(0).next(3).innerHTML = "未完成";
					//更新评分者ID
					$('paperMarkerId' + i).value = 'YD' + singleMarkerId;
					// 分配的大题数加1
					assignPaperNum = assignPaperNum + 1
					//有评分者
				} else {
					//更新评分者姓名
					$('empPaperListTb').select('tr')[i].down(0).next(2).innerHTML = singleMarkerNm;
					//更新评分者ID
					$('paperMarkerId' + i).value = 'YD' + singleMarkerId;
				}
				// 清空checkbox的选中状态
				$('empPaperListTb').select('tr')[i].down(1).checked = "";
			}
		}
		// 更新剩余任务量
		$('remainPaperNum').innerHTML = $('remainPaperNum').innerHTML - assignPaperNum;
		// 更新评分者任务量一览
		updateMarkerPaperNum();
	}
}

/**
 * 大题评分者设定.
 */
function setBigQuestionMark() {
	// 分配的大题量
	var assignQuestionNum = 0;
	// 单独评分者ID
	var singleMarkerId = $F('singleMarkerId');
	// 单独评分者姓名
	var singleMarkerNm = $F('singleMarkerNm');
	if (singleMarkerId != '' && singleMarkerNm != '') {
		// 遍历选中的checkbox
		for (var i = 0; i < $('empQuestionListTb').rows.length; i++) {
			// 选中的大题
			if ($('empQuestionListTb').select('tr')[i].down(1).checked) {
				// 无评分者
				if ($('empQuestionListTb').select('tr')[i].down(0).next(2).innerHTML == "") {
					//更新评分者姓名
					$('empQuestionListTb').select('tr')[i].down(0).next(2).innerHTML = singleMarkerNm;
					//更新评分状态
					$('empQuestionListTb').select('tr')[i].down(0).next(3).innerHTML = "未完成";
					//更新评分者ID
					$('questionMarkerId' + i).value = 'YD' + singleMarkerId;
					// 分配的大题数加1
					assignQuestionNum = assignQuestionNum + 1
					//有评分者
				} else {
					//更新评分者姓名
					$('empQuestionListTb').select('tr')[i].down(0).next(2).innerHTML = singleMarkerNm;
					//更新评分者ID
					$('questionMarkerId' + i).value = 'YD' + singleMarkerId;
				}
				// 清空checkbox的选中状态
				$('empQuestionListTb').select('tr')[i].down(1).checked = "";
			}
		}
		// 更新剩余题量
		$('remainQuestionNumDiv').innerHTML = $('remainQuestionNumDiv').innerHTML - assignQuestionNum;
		// 更新评分者题量
		updateMarkerQuestionNum();
	}
}

/**
 * 更新评分者任务量一览.
 */
function updateMarkerPaperNum() {
	//遍历评分者评分试卷一览
	var markerHash = new Hash();
	for (var i = 0; i < $('empPaperListTb').rows.length; i++) {
		var markerNm = $('empPaperListTb').select('tr')[i].down(0).next(2).innerHTML;
		// 评分者不为空
		if (markerNm != "") {
			if (markerHash.get(markerNm)) {
				markerHash.set(markerNm, markerHash.get(markerNm) + ',' + $F('paperId' + i));
			} else {
				markerHash.set(markerNm, $F('paperId' + i));
				
			}
		}
	}
	//删除评分者任务量一览table
	var rowNum = $('tb_PaperNumList').rows.length;
	for (var i = 1; i < rowNum; i++) {
		$('tb_PaperNumList').deleteRow(i);
		rowNum = rowNum - 1;
		i = i - 1;
	}
	//重新生成评分者任务量一览table
	markerHash.each(function(pair) {
		//评分者姓名
		var markerNm = pair.key;
		//任务量
		var taskNum = 0;
		//试卷ID数组集合
		var paperIdArray = new Array();
		paperIdArray = pair.value.split(',');
		taskNum = paperIdArray.length;

		// 添加行
		var newline = $('cloneline_PaperTaskList').clone(true);
		// TABLE底部插入添加行
		$('tb_PaperNumList').down(0).insert({
			bottom: newline
		});
		newline.removeClassName('none');
		$(newline).down(0).innerHTML = markerNm;
		$(newline).down(0).next(0).innerHTML = taskNum;
	});
	//重置表格隔行变色
	listColor('tb_PaperNumList');
}

/**
 * 更新评分者题量一览.
 */
function updateMarkerQuestionNum() {
	//遍历评分者评分大题一览
	var markerHash = new Hash();
	for (var i = 0; i < $('empQuestionListTb').rows.length; i++) {
		var markerNm = $('empQuestionListTb').select('tr')[i].down(0).next(2).innerHTML;
		// 评分者不为空
		if (markerNm != "") {
			if (markerHash.get(markerNm)) {
				markerHash.set(markerNm, parseInt(markerHash.get(markerNm), 10) + 1);
			} else {
				markerHash.set(markerNm, '1');
				
			}
		}
	}
	//删除评分者大题量一览table
	var rowNum = $('tb_QuestionNumList').rows.length;
	for (var i = 1; i < rowNum; i++) {
		$('tb_QuestionNumList').deleteRow(i);
		rowNum = rowNum - 1;
		i = i - 1;
	}
	//重新生成评分者大题量一览table
	markerHash.each(function(pair) {
		// 添加行
		var newline = $('cloneline_QuestionTaskList').clone(true);
		// TABLE底部插入添加行
		$('tb_QuestionNumList').down(0).insert({
			bottom: newline
		});
		newline.removeClassName('none');
		$(newline).down(0).innerHTML = pair.key;
		$(newline).down(0).next(0).innerHTML = pair.value;
	});
	//重置表格隔行变色
	listColor('tb_QuestionNumList');
}

/**
 * 提交form.
 */
function submitForm() {
	//按试卷分配
	if ($F('selAssignMode') == '1') {

		$('empPaperListForm').action = 'k060111UpdateMarkPaper.action?' + '&examineId=' + $F('examineId') + '&markmissionFlg=' + $F('selAssignMode');
		$('empPaperListForm').submit();
	}
	//按大题分配
	if ($F('selAssignMode') == '2') {
		$('empQuestionListForm').action = 'k060111UpdateMarkQuestion.action?' + '&examineId=' + $F('examineId') + '&markmissionFlg=' + $F('selAssignMode');
		$('empQuestionListForm').submit();
	}
	
	showLoader();
	return true;
}

/**
 * 退出编辑.
 */
function quitMarkAssign() {
	
	if (!confirm(getMessage('js.tt.warn.JYW02'))){
		return;
	}
	
	var url = 'k060111QuitMarkAssign.action';
	var pars = 'examineId=' + $F('examineId');
	pars = addStamp(pars);
	var request = new Ajax.Request(url, {
		method: 'post',
		parameters: pars,
		asynchronous: true
	});
	
	window.open('','_self','');
	window.close();

}

