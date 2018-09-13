/*
 * @(#)k060071.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 教育子系统
 */
/**
 * @fileoverview 考试详细(管理)JavaScript.
 *
 * @author zhangaijun
 * @version 1.0
 */

/**
 * 最大最小时间.
 */
var g_maxDate_applyClosing;
var g_maxDate_Notify;

/**
 * 考试状态枚举.
 */
var ConfirmEnum = {
	/** 编辑中. */
	R12_1: 1,
	/** 等待审批. */
	R12_2: 2,
	/** 考试已批准. */
	R12_3: 3,
	/** 考试不批准. */
	R12_4: 4,
	/** 报名结束. */
	R12_5: 5,
	/** 报名已批准. */
	R12_6: 6,
	/** 评分任务未分配. */
	R12_7: 7,
	/** 评分任务已分配. */
	R12_8: 8,
	/** 评分中. */
	R12_9: 9,
	/** 评分已汇总. */
	R12_10: 10,
	/** 成绩已发布. */
	R12_11: 11
};

/**
 * 考试标志枚举.
 */
var ExamineFlgEnum = {
	NORMAL_EXAM: 1,
	FREELY_EXAM: 2,
	TEST_EXAM: 3
}

/**
 * 画面操作模式枚举.
 */
var OperationEnum = {
	OPERATION_VIEW: '1',
	OPERATION_EDIT: '2',
	OPERATION_APPLY: '3',
	OPERATION_DELETE: '4',
	OPERATION_REPAIR: '5'
}

var g_regexDateFormat = '^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$';

/**
 * 画面onload.
 */
function initForm() {

	// 针对对象变化操作
	showSelectDiv();
	
	initControl();
	
	// 重置列表颜色
	listColor('table_paperList', 300);
}

/**
 * 画面控制.
 */
function initControl() {
	// 画面模式
	var mode = $F('operatMode');
	
	// 查看模式
	if (mode == OperationEnum.OPERATION_VIEW) {
		// 查看模式控制
		viewModeControl();
	} else if (mode == OperationEnum.OPERATION_EDIT) {
		//编辑模式控制
		editModeControl();
	} else if (mode == OperationEnum.OPERATION_APPLY) {
		// 审批模式控制
		approveModeControl();
	} else if (mode == OperationEnum.OPERATION_DELETE) {
		// 删除模式控制
		deleteModeControl();
	} else if (mode == OperationEnum.OPERATION_REPAIR) {
		// 调整模式控制
		repairModeControl();
	}
	// 让select控件处于非选中状态
	sltExamineInfoOptions = $('sltExamineInfo').childElements();
	for (var i = 0; i < sltExamineInfoOptions.length; i++) {
		sltExamineInfoOptions[i].selected = false;
	}
	sltCourseInfoOptions = $('sltCourseInfo').childElements();
	for (var i = 0; i < sltCourseInfoOptions.length; i++) {
		sltCourseInfoOptions[i].selected = false;
	}
	
}

/**
 * 编辑模式控制.
 */
function editModeControl() {
	// 考试编辑中时，可见
	if ($F('examineStatus') == 1) {
		// 考试名称
		$('examineName').enable();
		// 考试开始日期
		$('examineStartDate').enable();
		// 随时考试时
		if ($F('examineFlg') == 2) {
			// 考试结束日期
			$('examineEndDate').enable();
		}
		
		// 参阅答案标志
		$('checkAnswerFlg').enable();
		// 必考标志
		$('mustExamineFlg').enable();
		// 考试开始结束时刻不是随时考试,不可用
		if ($F('examineFlg') != 2) {
			$('examineStartTime').enable();
			//$('examineEndTime').enable();
		}
		// 报名截止日期,时刻,普通考试时,不可用
		if ($F('examineFlg') == 1) {
			$('applyClosingDate').enable();
			$('applyClosingTime').enable();
		}
		// 通知提醒日期,不是试考试时,不可用
		if ($F('examineFlg') != 3) {
			$('examineNotifyDate').enable();
		}
		// 考试说明
		$('examineComment').enable();
		// 报名需批准
		if ($F('examineFlg') != 2) {
			$('applyConfirmFlg').enable();
		} else {
			$('applyConfirmFlg').disable();
		}
		
		// 针对对象
		$('objectTypeList').enable();
		$('projectList').enable();
		$('yearList').enable();
		$('btnSelectUser').removeClassName('none');
		
		// 不批准原因
		$('divRefuseReason').addClassName('none');
		
		// 如果列表为空，移除、查看按钮不可用
		if ($('sltExamineInfo').innerHTML == '') {
			$('btnViewTest').disable();
			$('btnRemoveTest').disable();
		}
		if ($('sltCourseInfo').innerHTML == '') {
			$('btnViewCourse').disable();
			$('btnRemoveCourse').disable();
		}
		// 考试时间
		$('examineInfo.examineTime').enable();
		addRequiredCheck($('examineInfo.examineTime'), getMessage('js.com.warning.0001', '考试时间'), true);
		addRegexCheck($('examineInfo.examineTime'), getMessage('js.com.warning.0002', '考试时间'), '^[1-9][0-9]*$');
		addFormCheck(OperationEnum.OPERATION_EDIT);
	} else {
	
		viewModeControl();
		
	}
	
}

/**
 * 删除模式控制.
 */
function deleteModeControl() {

	// 和查看模式的控制一样
	viewModeControl();
	
}

/**
 * 审批模式控制.
 */
function approveModeControl() {

	viewModeControl();
	
	if ($F('examineStatus') != 3) {
		$('refuseReason').readOnly = false;
		$('divRefuseReason').removeClassName('none');
	}
}

/**
 * 查看模式控制.
 */
function viewModeControl() {
	// 考试名称
	$('examineName').disable();
	// 考试开始日期
	$('examineStartDate').disable();
	if ($('examineEndDate')) {
		// 考试结束日期
		$('examineEndDate').disable();
	}
	// 参阅答案标志
	$('checkAnswerFlg').disable();
	// 必考标志
	$('mustExamineFlg').disable();
	// 考试开始结束时刻不是随时考试,不可用
	if ($F('examineFlg') != 2) {
		$('examineStartTime').disable();
		//$('examineEndTime').disable();
	}
	// 报名截止日期,时刻,普通考试时,不可用
	if ($F('examineFlg') == 1) {
		$('applyClosingDate').disable();
		$('applyClosingTime').disable();
	}
	// 通知提醒日期,不是试考试时,不可用
	if ($F('examineFlg') != 3) {
		$('examineNotifyDate').disable();
	}
	// 考试说明
	$('examineComment').disable();
	// 报名需批准
	$('applyConfirmFlg').disable();
	
	//评定等级1
	if(null != $('resultlevel1Score')) {
		$('resultlevel1Score').disable();
	}	
	//评定等级2
	if (null != $('resultlevel2Score')) {
		$('resultlevel2Score').disable();
	}	
	//评定等级3
	if (null != $('resultlevel3Score')) {
		$('resultlevel3Score').disable();
	}
	//评定等级4
	if (null != $('resultlevel4Score')) {
		$('resultlevel4Score').disable();
	}	
	//评定等级5
	if (null != $('resultlevel5Score')) {
		$('resultlevel5Score').disable();
	}
	// 针对对象
	$('objectTypeList').disable();
	$('projectList').disable();
	$('yearList').disable();
	$('btnSelectUser').addClassName('none');
	
	// 不批准原因
	// 考试不批准时，可见
	if ($F('examineStatus') == 4) {
		$('refuseReason').readOnly = true;
		$('divRefuseReason').removeClassName('none');
	} else {
		$('divRefuseReason').addClassName('none');
	}
	// 如果列表为空，查看按钮不可用
	if ($('sltExamineInfo').innerHTML == '') {
		$('btnViewTest').disable();
	}
	if ($('sltCourseInfo').innerHTML == '') {
		$('btnViewCourse').disable();
	}
}

/**
 * 调整模式控制.
 */
function repairModeControl() {

	// 考试名称
	$('examineName').disable();
	// 考试开始日期
	$('examineStartDate').enable();
	// 考试结束日期
	if ($('examineEndDate')) {
		$('examineEndDate').enable();
	}
	// 参阅答案标志
	$('checkAnswerFlg').disable();
	// 必考标志
	$('mustExamineFlg').disable();
	// 考试开始结束时刻不是随时考试,可用
	if ($F('examineFlg') != 2) {
		$('examineStartTime').enable();
		//$('examineEndTime').enable();
	}
	// 报名截止日期,时刻,普通考试时,可用
	if ($F('examineFlg') == 1) {
		$('applyClosingDate').disable();
		$('applyClosingTime').disable();
	}
	// 通知提醒日期,不是试考试时,可用
	if ($F('examineFlg') != 3) {
		$('examineNotifyDate').disable();
	}
	// 考试说明
	$('examineComment').disable();
	// 报名需批准
	$('applyConfirmFlg').disable();
		
	//评定等级1
	if(null != $('resultlevel1Score')) {
		$('resultlevel1Score').disable();
	}	
	//评定等级2
	if (null != $('resultlevel2Score')) {
		$('resultlevel2Score').disable();
	}	
	//评定等级3
	if (null != $('resultlevel3Score')) {
		$('resultlevel3Score').disable();
	}
	//评定等级4
	if (null != $('resultlevel4Score')) {
		$('resultlevel4Score').disable();
	}	
	//评定等级5
	if (null != $('resultlevel5Score')) {
		$('resultlevel5Score').disable();
	}
	
	// 针对对象
	$('objectTypeList').disable();
	$('projectList').disable();
	$('yearList').disable();
	$('btnSelectUser').addClassName('none');
	
	$('divRefuseReason').addClassName('none');
	addFormCheck(OperationEnum.OPERATION_REPAIR);
}

/**
 * 追加考试.
 */
function addTest() {
	//计算left,top,居中定位
	var width = 800;
	var height = 600;
	var left = (screen.availWidth - width) * 0.5;
	var top = (screen.availHeight - height) * 0.5;
	var sFeatures = 'width=' + width + 'px, height=' + height + 'px, left=' + left + 'px, top=' + top +
	'px, toolbar=no, menubar=no, scrollbars=yes, resizable=no,location=no, status=yes';
	
	k060131Handle = window.open('k060131InitExamineSele?parenetId=' + $('examineId').value + '&idName=sltExamineInfo', 'addTestWin', sFeatures);
}

/**
 * 追加课程.
 */
function addCourse() {
	//计算left,top,居中定位
	var width = 800;
	var height = 600;
	var left = (screen.availWidth - width) * 0.5;
	var top = (screen.availHeight - height) * 0.5;
	var sFeatures = 'width=' + width + 'px, height=' + height + 'px, left=' + left + 'px, top=' + top +
	'px, toolbar=no, menubar=no, scrollbars=yes, resizable=no,location=no, status=yes';
	
	k060141Handle = window.open('k060141InitCourseSele?parenetId=' + $('examineId').value + '&idName=sltCourseInfo', 'addCourseWin', sFeatures);
}

/**
 * 课程考试选择按钮制御
 */
function relationButtonControl(editable) {
	if ($('sltExamineInfo').innerHTML.blank()) {
		$('btnViewTest').disable();
		$('btnRemoveTest').disable();
	} else {
		$('btnViewTest').enable();
		$('btnRemoveTest').enable();
	}
	if ($('sltCourseInfo').innerHTML.blank()) {
		$('btnViewCourse').disable();
		$('btnRemoveCourse').disable();
	} else {
		$('btnViewCourse').enable();
		$('btnRemoveCourse').enable();
	}
}

/**
 * 添加考试回调.
 */
function addExamineCallBack() {

	var url = 'k060071GetMustPassExamineList.action';
	var params = $('TestInfoForm').serialize();
	params = addStamp(params);
	new Ajax.Updater('div_mustexamine_list', url, {
		mehtod: 'get',
		parameters: params,
		onComplete: function(response) {
			var flg = checkException(response);
			
			if (!flg) {
			
				relationButtonControl(true);
				showOpTip(getMessage('js.tt.info.GTT02'));
			}
		}
	});
}

/**
 * 移除考试.
 */
function removeTest(sltElementId) {
	var selectElement = $(sltElementId);
	var options;
	var selectedFlg = false;
	if (selectElement != null) {
		options = selectElement.childElements();
		
		if (options.length > 0) {
			for (var i = 0, len = options.length; i < len; i++) {
				if (options[i].selected == true) {
					selectedFlg = true;
					var url = 'k060071RemoveSelectedExamine.action';
					var params = $('TestInfoForm').serialize();
					params = params + "&selectedExamineId=" + options[i].value;
					params = addStamp(params);
					new Ajax.Updater('div_mustexamine_list', url, {
						mehtod: 'get',
						parameters: params,
						onComplete: function(response) {
							var flg = checkException(response);
							
							if (!flg) {
							
								relationButtonControl(true);
								showOpTip(getMessage('js.tt.info.GTT02'));
							}
						}
					});
				}
			}
			if (selectedFlg == false) {
				//请选择一个考试
				addFieldError(sltElementId, getMessage('js.tt.error.KSE40'));
				selectElement.focus();
			}
		}
	}
}

/**
 * 添加课程回调.
 */
function addCourseCallBack() {

	var url = 'k060071GetMustPassCourseList.action';
	var params = $('TestInfoForm').serialize();
	params = addStamp(params);
	new Ajax.Updater('div_mustcourse_list', url, {
		mehtod: 'get',
		parameters: params,
		onComplete: function(response) {
			var flg = checkException(response);
			
			if (!flg) {
			
				relationButtonControl(true);
				showOpTip(getMessage('js.tt.info.GTT02'));
			}
		}
	});
}

/**
 * 移除课程.
 */
function removeCourse(sltElementId) {
	var selectElement = $(sltElementId);
	var options;
	var selectedFlg = false;
	if (selectElement != null) {
		options = selectElement.childElements();
		
		if (options.length > 0) {
			for (var i = 0, len = options.length; i < len; i++) {
				if (options[i].selected == true) {
					selectedFlg = true;
					var url = 'k060071RemoveSelectedCourse.action';
					var params = $('TestInfoForm').serialize();
					params = params + "&selectedCourseId=" + options[i].value;
					params = addStamp(params);
					new Ajax.Updater('div_mustcourse_list', url, {
						mehtod: 'get',
						parameters: params,
						onComplete: function(response) {
							var flg = checkException(response);
							
							if (!flg) {
								relationButtonControl(true);
								showOpTip(getMessage('js.tt.info.GTT02'));
							}
						}
					});
				}
			}
			if (selectedFlg == false) {
				//请选择一个课程
				addFieldError(sltElementId, getMessage('js.tt.error.KSE41'));
				selectElement.focus();
			}
		}
	}
}

/**
 * 查看考试.
 */
function viewTest(sltElementId) {

	var selectElement = $(sltElementId);
	
	if (selectElement.value == null || selectElement.value == '') {
		//请选择一个考试
		addFieldError(sltElementId, getMessage('js.tt.error.KSE40'));
		selectElement.focus();
	} else {
		window.open('k060061InitViewMode?examineId=' + selectElement.value +
		'&operatMode=1', selectElement.value);
	}
	
}

/**
 * 查看课程.
 */
function viewCourse(sltElementId) {

	var selectElement = $(sltElementId);
	
	if (selectElement.value == null || selectElement.value == '') {
		//请选择一个课程
		addFieldError(sltElementId, getMessage('js.tt.error.KSE41'));
		selectElement.focus();
	} else {
		window.open('../training/j020041InitViewMode?courseId=' + selectElement.value +
		'&examineId=' +
		$('examineId').value, selectElement.value);
	}
	
}

/**
 * 再编辑按钮.
 */
function reEdit() {
	
	// wanqiuhong 10/11 编辑：修改再编辑按钮的提示信息
	var status = $('examineInfo.examineStatusName').innerHTML;

    if ("考试已批准" == status) {
        if (!confirm(getMessage('js.tt.warn.JYW05'))) {
            return;
        }
    } else{
    	if (!confirm(getMessage('js.tt.warn.JYW04'))) {
            return;
        }
    }
	// 显示加载动画
	showLoader();
	
	var url = 'k060071ReEditExamineInfo.action';
	$('TestInfoForm').action = url;
	$('TestInfoForm').submit();
}

/**
 * 系统错误处理.
 */
function reportError() {

	MsgBox.error(getMessage('js.com.error.0001'));
}

/**
 * 新建试卷按钮.
 */
function newPaper() {
	//计算left,top,居中定位
	var width = 1000;
	var height = 600;
	var left = (screen.availWidth - width) * 0.5;
	var top = (screen.availHeight - height) * 0.5;
	var sFeatures = 'width=' + width + 'px, height=' + height + 'px, left=' + left + 'px, top=' + top +
	'px, toolbar=no, menubar=no, x_scrollbars=no, y_scrollbars=yes,resizable=no,location=no, status=yes';
	
	window.open('k050011InitCreateMode2?sltCategory1=' + $('category1Id').value +
	'&sltCategory2=' +
	$('category2Id').value +
	'&sltCategory3=' +
	$('category3Id').value +
	'&belongId=' +
	$('examineId').value, 'addPaperWin', sFeatures);
}

/**
 * 选择试卷按钮.
 */
function selectePaper() {

	//计算left,top,居中定位
	var width = 1000;
	var height = 600;
	var left = (screen.availWidth - width) * 0.5;
	var top = (screen.availHeight - height) * 0.5;
	var sFeatures = 'width=' + width + 'px, height=' + height + 'px, left=' + left + 'px, top=' + top +
	'px, toolbar=no, menubar=no, scrollbars=yes,resizable=no,location=no, status=yes';
	
	k050021Handle = window.open('k050021InitSelectMode?category1=' + $('category1Id').value +
	'&category2=' +
	$('category2Id').value +
	'&category3=' +
	$('category3Id').value +
	'&examineFlg=' +
	$('examineFlg').value +
	'&examineId=' +
	$('examineId').value, 'addPaperWin', sFeatures);
}

/**
 * 选择试卷按钮回调.
 */
function selectePaperCallBack() {

	// 选择试卷
	
	var url = 'k060071SelectePaperCallBack.action';
	
	var pars = $('TestInfoForm').serialize();
	
	addStamp(pars);
	
	new Ajax.Updater('div_k060071_list', url, {
	
		method: 'post',
		parameters: pars,
		onComplete: function(request) {
		
			// 重置列表颜色
			listColor('table_paperList');
			
		},
		onFailure: reportError
	});
}

/**
 * 查看试卷.
 */
function viewSelectedPaper(paperId, paperVersionNo) {
	window.open('k060031InitEditViewMode?ifViewChange=0' +
	'&paperId=' +
	paperId +
	'&paperVersionNo=' +
	paperVersionNo);
}

/**
 * 移除试卷.
 */
function removeSelectedPaper(srcElement) {

	// 获得当前行号
	var rowIndex = $(srcElement).up('tr', 0).rowIndex;
	
	// 该行变色标记
	selectLine('table_paperList');
	
	if (confirm(getMessage('js.tt.warn.JYW12'))) {
	
		// 移除试卷
		var url = 'k060071RemoveSelectedPaper.action';
		var pars = $('TestInfoForm').serialize();
		pars = pars + '& removePaperNo=' + encodeURI(rowIndex);
		new Ajax.Updater('div_k060071_list', url, {
		
			method: 'post',
			parameters: pars,
			onComplete: function(request) {
			
				// 重置列表颜色
				listColor('table_paperList');
				
			},
			onFailure: reportError
		});
	}
}

/**
 * 保存按钮.
 */
function updateExamine() {
	if (!checkForm('TestInfoForm')) {
		return;
	}
	
	// 评定等级合理性检查
	var levelNum = $F('resultlevelNum');
	
	for (var i = 2; i < levelNum; i++) {
		if (parseInt($F('resultlevel' + i + 'Score'), 10) >= parseInt($F('resultlevel' + (i - 1) + 'Score'), 10)) {
			addFieldError('resultlevel' + i + 'Score', getMessage('js.tt.error.KSE44'));
			$('resultlevel' + i + 'Score').focus();
			return false;
		}
	}
	
	// 画面模式
	var mode = $F('operatMode');
	
	var tablePaperList = $('table_paperList');
	var rows = tablePaperList.childElements()[0].childElements();
	
	// 总分
	var totalScore = 0;
	// 考试时间
	var totalTime = $F('examineInfo.examineTime');
	// 算出总分
	if (rows.length > 0) {
		totalScore = rows[0].childElements()[4].childElements()[0].innerHTML;
		// wanqiuhong 10/27 追加： 如果考试方式为【随时考试】，所选的试卷只能有一张卷且自动判题区分为‘1’全部自动判题
		// 考试方式
		var examineFlg = $F('examineFlg');
		// 自动判题区分数量
		var autoMarkFlg = rows[0].childElements()[10].select('INPUT')[0].value;
		// 如果考试方式为【随时考试】
		if (2 == examineFlg) {
			if (rows.length > 1) {				
				MsgBox.message(getMessage('js.tt.error.KSE04'));
				return false;
			
			// 如果该试卷中大题的自动判题区分为"存在手动判题"的大题数量不为0
			} else if (autoMarkFlg > 0) {
				MsgBox.message(getMessage('js.tt.error.KSE03'));
				return false;				
			}			
		}
		
		// wanqiuhong 10/21 追加：随机试卷与固定试卷不可同时存在，且随机卷只能有一张
		// 随机卷数
		var randomFlg = 0;
		// 固定卷数
		var BigquestFlg = 0;
		for (var i = 0; i < rows.length; i++) {
			// 随机卷存在判断
			if ("有" == rows[i].childElements()[2].select('INPUT')[0].value) {
				randomFlg ++;
				
			// 固定卷存在判断
			}else if ("无" == rows[i].childElements()[2].select('INPUT')[0].value) {
				BigquestFlg ++;
			}
			// 随机卷数量判断
			if (randomFlg > 1) {							
				MsgBox.message(getMessage('js.tt.warn.KSW04'));
				return false;
			}
			// 不可同时存在判断
			if(randomFlg > 0 && BigquestFlg > 0){
				MsgBox.message(getMessage('js.tt.warn.KSW03'));
				return false;
			}			
			
			if ("有" == rows[i].childElements()[2].select('INPUT')[0].value) {
	
			}
			// 总分判断
			if (rows[i].childElements()[4].childElements()[0].innerHTML != totalScore) {
				MsgBox.message(getMessage('js.tt.warn.KSW23'));
				return false;
			}
		}
	}
	
	
	// 不可用的控件提交
	$('TestInfoForm').enable();
	submitSelect();
	
	// 编辑模式
	if (mode == '2') {
	
		// 显示加载动画
		showLoader();
		
		$('TestInfoForm').action = 'k060071UpdateExamineInfo.action?examineInfo.totalScore=' + totalScore +
		'&' +
		dataSerialize($('TestInfoForm'));
		$('TestInfoForm').submit();
		// 调整模式
	} else {
		// 显示加载动画
		showLoader();
		
		$('TestInfoForm').action = 'k060071RepairExamineInfo.action' + '?' + dataSerialize($('TestInfoForm'));
		$('TestInfoForm').submit();
	}
}

/**
 * 提交申请.
 */
function applyExamine() {
	if (!checkForm('TestInfoForm')) {
		return;
	}
	
	// 评定等级合理性检查
	var levelNum = $F('resultlevelNum');
	
	for (var i = 2; i < levelNum; i++) {
		if (parseInt($F('resultlevel' + i + 'Score'), 10) >= parseInt($F('resultlevel' + (i - 1) + 'Score'), 10)) {
			addFieldError('resultlevel' + i + 'Score', getMessage('js.tt.error.KSE44'));
			$('resultlevel' + i + 'Score').focus();
			return false;
		}
	}
	
	if (confirm(getMessage('js.tt.warn.KSW12'))) {
		// 不可用的控件提交
		$('TestInfoForm').enable();
		submitSelect();
		
		var tablePaperList = $('table_paperList');
		var rows = tablePaperList.childElements()[0].childElements();

		// 算出总分
		if (rows.length > 0) {
			totalScore = rows[0].childElements()[4].childElements()[0].innerHTML;
			// wanqiuhong 10/27 追加： 如果考试方式为【随时考试】，所选的试卷只能有一张卷且自动判题区分为‘1’全部自动判题
			// 考试方式
			var examineFlg = $F('examineFlg');
			// 自动判题区分数量
			var autoMarkFlg = rows[0].childElements()[10].select('INPUT')[0].value;
			// 如果考试方式为【随时考试】
			if (2 == examineFlg) {
				if (rows.length > 1) {				
					MsgBox.message(getMessage('js.tt.error.KSE04'));
					return false;
				
				// 如果该试卷中大题的自动判题区分为"存在手动判题"的大题数量不为0
				} else if (autoMarkFlg > 0) {
					MsgBox.message(getMessage('js.tt.error.KSE03'));
					return false;				
				}			
			}
			
			// wanqiuhong 10/21 追加：随机试卷与固定试卷不可同时存在，且随机卷只能有一张
			// 随机卷数
			var randomFlg = 0;
			// 固定卷数
			var BigquestFlg = 0;
			for (var i = 0; i < rows.length; i++) {
				// 随机卷存在判断
				if ("有" == rows[i].childElements()[2].select('INPUT')[0].value) {
					randomFlg ++;
					
				// 固定卷存在判断
				}else if ("无" == rows[i].childElements()[2].select('INPUT')[0].value) {
					BigquestFlg ++;
				}
				// 随机卷数量判断
				if (randomFlg > 1) {							
					MsgBox.message(getMessage('js.tt.warn.KSW04'));
					return false;
				}
				// 不可同时存在判断
				if(randomFlg > 0 && BigquestFlg > 0){
					MsgBox.message(getMessage('js.tt.warn.KSW03'));
					return false;
				}			
				
				if ("有" == rows[i].childElements()[2].select('INPUT')[0].value) {
		
				}
				// 总分判断
				if (rows[i].childElements()[4].childElements()[0].innerHTML != totalScore) {
					MsgBox.message(getMessage('js.tt.warn.KSW23'));
					return false;
				}
			}
		}
		
		// 显示加载动画
		showLoader();
		$('TestInfoForm').action = 'k060071ApplyExamineInfo.action?examineInfo.totalScore=' + totalScore +
		'&' +
		dataSerialize($('TestInfoForm'));
		$('TestInfoForm').submit();
	}
}

/**
 * 让select控件的选项提交.
 */
function submitSelect() {
	// 清除需要考试迭代的考试信息
	var iteExamineInfo = $('iteExamineInfo').childElements();
	for (var i = 0; i < iteExamineInfo.length; i++) {
		$('iteExamineInfo').removeChild(iteExamineInfo[i]);
	}
	// 清除需要课程迭代的考试信息
	var iteCourseInfo = $('iteCourseInfo').childElements();
	for (var i = 0; i < iteCourseInfo.length; i++) {
		$('iteCourseInfo').removeChild(iteCourseInfo[i]);
	}
	
	// 将select控件中的需要考试追加到需要考试迭代中，以便提交
	sltExamineInfoOptions = $('sltExamineInfo').childElements();
	for (var i = 0; i < sltExamineInfoOptions.length; i++) {
		$('iteExamineInfo').insert({
			bottom: new Element('input', {
				'id': 'examineInfoList[' + i + '].examineId'
			})
		});
		$('examineInfoList[' + i + '].examineId').writeAttribute('name', 'examineInfoList[' + i + '].examineId');
		
		$('iteExamineInfo').insert({
			bottom: new Element('input', {
				'id': 'examineInfoList[' + i + '].examineName'
			})
		});
		
		$('examineInfoList[' + i + '].examineName').writeAttribute('name', 'examineInfoList[' + i + '].examineName');
		
		$('examineInfoList[' + i + '].examineId').value = sltExamineInfoOptions[i].value;
		$('examineInfoList[' + i + '].examineName').value = sltExamineInfoOptions[i].innerHTML;
	}
	
	// 将select控件中的需要课程追加到需要课程迭代中，以便提交
	sltCourseInfoOptions = $('sltCourseInfo').childElements();
	
	for (var i = 0; i < sltCourseInfoOptions.length; i++) {
	
		$('iteCourseInfo').insert({
			bottom: new Element('input', {
				'id': 'courseInfoList[' + i + '].courseId'
			})
		});
		$('courseInfoList[' + i + '].courseId').writeAttribute('name', 'courseInfoList[' + i + '].courseId');
		
		$('iteCourseInfo').insert({
			bottom: new Element('input', {
				'id': 'courseInfoList[' + i + '].courseName'
			})
		});
		
		$('courseInfoList[' + i + '].courseName').writeAttribute('name', 'courseInfoList[' + i + '].courseName');
		
		$('courseInfoList[' + i + '].courseId').value = sltCourseInfoOptions[i].value;
		$('courseInfoList[' + i + '].courseName').value = sltCourseInfoOptions[i].innerHTML;
	}
}

/**
 * 批准按钮.
 */
function approveExamine() {
	if (confirm(getMessage('js.tt.warn.JYW16'))) {
		// 不可用的控件提交
		$('TestInfoForm').enable();
		// 显示加载动画
		
		showLoader();
		var url = 'k060071ApproveExamineInfo.action' + '?' + dataSerialize($('TestInfoForm'));
		$('TestInfoForm').action = url;
		
		$('TestInfoForm').submit();
	}
}

/**
 * 不批准按钮.
 */
function unApproveExamine() {
	if (confirm(getMessage('js.tt.warn.JYW06'))) {
		// 不可用的控件提交
		$('TestInfoForm').enable();
		// 显示加载动画
		showLoader();
		
		var url = 'k060071RefuseExamineInfo.action' + '?' + dataSerialize($('TestInfoForm'));
		$('TestInfoForm').action = url;
		
		$('TestInfoForm').submit();
	}
}

/**
 * 取消按钮.
 */
function cancelExamine() {
	if (confirm(getMessage('js.tt.warn.KSW25'))) {
		// 不可用的控件提交
		$('TestInfoForm').enable();
		
		// 显示加载动画
		showLoader();
		
		var url = 'k060071CancelExamineInfo.action' + '?' + dataSerialize($('TestInfoForm'));
		$('TestInfoForm').action = url;
		$('TestInfoForm').submit();
	}
}

/**
 * 删除按钮.
 */
function deleteExamine() {
	if (confirm(getMessage('js.tt.warn.JYW07'))) {
		// 不可用的控件提交
		$('TestInfoForm').enable();
		
		// 显示加载动画
		showLoader();
		
		var url = 'k060071DeleteExamineInfo.action' + '?' + dataSerialize($('TestInfoForm'));
		$('TestInfoForm').action = url;
		$('TestInfoForm').submit();
	}
}

/**
 * 画面校验.
 */
function addFormCheck(operationMode) {
	// 考试开始日期必须输入
	addRequiredCheck($('examineStartDate'), getMessage('js.com.warning.0001', '考试开始日期'), true);
	// 考试开始日期格式检查
	addRegexCheck($('examineStartDate'), getMessage('js.com.warning.0002', '考试开始日期'), g_regexDateFormat);
	// 档次评定格式检查
	var levelNum = $F('resultlevelNum');
	for (var i = 1; i < levelNum; i++) {
		addRequiredCheck($('resultlevel' + levelNum + 'Score'), getMessage('js.com.warning.0001', '评定等级分数'), true);
		addRegexCheck($('resultlevel' + levelNum + 'Score'), getMessage('js.com.warning.0002', '评定等级分数'), '^[1-9][0-9]*$');
	}
	
	// 考试标志
	var examineFlg = $F('examineFlg');
	// 随时考试,追加考试结束日期和通知提醒日期关联检查
	if (ExamineFlgEnum.FREELY_EXAM == examineFlg) {
		// 必须输入
		addRequiredCheck($('examineEndDate'), getMessage('js.com.warning.0001', '考试结束日期'), true);
		addRequiredCheck($('examineNotifyDate'), getMessage('js.com.warning.0001', '通知提醒日期'), true);
		// 格式检查
		addRegexCheck($('examineEndDate'), getMessage('js.com.warning.0002', '考试结束日期'), g_regexDateFormat);
		addRegexCheck($('examineNotifyDate'), getMessage('js.com.warning.0002', '通知提醒日期'), g_regexDateFormat);
		
		// 通知提醒日期与考试开始日期校验 
		if (OperationEnum.OPERATION_EDIT == operationMode) {
			addCustomCheck($('examineNotifyDate'), getMessage('js.tt.error.KSE51'), 'examineStartDate', function compareInputTime() {
				if (compareDate($('examineNotifyDate'), $('examineStartDate')) && $F('examineNotifyDate') != $F('examineStartDate')) {
					if (compareDate($('examineStartDate'), $('examineEndDate'))) {
						removeFieldError($('examineStartDate'));
					}
					return compareDate($('examineNotifyDate'), $('examineStartDate'));
				}
				addFieldError($('examineStartDate'), getMessage('js.tt.error.KSE51'));
				return false;
			});
		}
		
		// 考试开始与通知提醒日期关联校验 
		addCustomCheck($('examineStartDate'), getMessage('js.tt.error.KSE51'), 'examineStartDate1', function compareInputTime() {
			if (compareDate($('examineNotifyDate'), $('examineStartDate')) && $F('examineNotifyDate') != $F('examineStartDate')) {
				removeFieldError($('examineNotifyDate'));
				if (compareDate($('examineStartDate'), $('examineEndDate'))) {
					removeFieldError($('examineEndDate'));
				} else {
					addFieldError($('examineEndDate'), getMessage('js.tt.error.KSE48'));
				}
				return true;
			} else {
				if (OperationEnum.OPERATION_EDIT == operationMode) {
					addFieldError($('examineNotifyDate'), getMessage('js.tt.error.KSE51'));
				}
				return false;
			}
		});
		// 考试开始日期与结束日期关联校验 
		addCustomCheck($('examineStartDate'), getMessage('js.tt.error.KSE48'), 'examineStartDate2', function compareInputTime() {
			if (compareDate($('examineStartDate'), $('examineEndDate'))) {
				removeFieldError($('examineEndDate'));
				if (compareDate($('examineNotifyDate'), $('examineStartDate')) && $F('examineNotifyDate') != $F('examineStartDate')) {
					removeFieldError($('examineNotifyDate'));
				} else {
					if (OperationEnum.OPERATION_EDIT == operationMode) {
						addFieldError($('examineNotifyDate'), getMessage('js.tt.error.KSE51'));
					}
				}
				return true;
			} else {
				addFieldError($('examineEndDate'), getMessage('js.tt.error.KSE48'));
				return false;
			}
		});
		
		// 考试结束与开始日期关联校验
		addCustomCheck($('examineEndDate'), getMessage('js.tt.error.KSE48'), 'examineEndDate', function compareInputTime() {
			if (compareDate($('examineStartDate'), $('examineEndDate'))) {
				if (compareDate($('examineNotifyDate'), $('examineStartDate')) && $F('examineNotifyDate') != $F('examineStartDate')) {
					removeFieldError($('examineStartDate'));
				}
				return compareDate($('examineStartDate'), $('examineEndDate'));
			}
			addFieldError($('examineStartDate'), getMessage('js.tt.error.KSE48'));
			return false;
		});
	} else {
		// 格式校验
		addRegexCheck('examineStartTime', getMessage('js.com.warning.0002', '考试开始时刻'), '((2[0-3])|[0-1][0-9]):[0-5][0-9]');
		addRegexCheck('examineEndTime', getMessage('js.com.warning.0002', '考试结束时刻'), '((2[0-3])|[0-1][0-9]):[0-5][0-9]');
		// 开始与结束时刻关联校验 
		addCustomCheck($('examineStartTime'), getMessage('js.tt.error.KSE48'), 'examineStartTime', function compareInputTime() {
			if (compareDetailTime($('examineStartTime'), $('examineEndTime'))) {
				removeFieldError($('examineEndTime'));
			} else {
				addFieldError($('examineStartTime'), getMessage('js.tt.error.KSE48'));
				addFieldError($('examineEndTime'), getMessage('js.tt.error.KSE48'));
			}
			return compareDetailTime($('examineStartTime'), $('examineEndTime'));
		});
		
		// 考试结束与开始时刻关联校验
		addCustomCheck($('examineEndTime'), getMessage('js.tt.error.KSE48'), 'examineEndTime', function compareInputTime() {
			if (compareDetailTime($('examineStartTime'), $('examineEndTime'))) {
				removeFieldError($('examineStartTime'));
			} else {
				addFieldError($('examineStartTime'), getMessage('js.tt.error.KSE48'));
				addFieldError($('examineEndTime'), getMessage('js.tt.error.KSE48'));
			}
			return compareDetailTime($('examineStartTime'), $('examineEndTime'));
		});
		// 普通考试, 追加报名截止日期通知提醒日期关联校验
		if (ExamineFlgEnum.NORMAL_EXAM == examineFlg) {
			// 必须输入
			addRequiredCheck($('applyClosingDate'), getMessage('js.com.warning.0001', '报名截止日期'), true);
			addRequiredCheck($('examineNotifyDate'), getMessage('js.com.warning.0001', '通知提醒日期'), true);
			// 格式校验
			addRegexCheck($('applyClosingDate'), getMessage('js.com.warning.0002', '报名截止日期'), g_regexDateFormat);
			addRegexCheck('applyClosingTime', getMessage('js.com.warning.0002', '报名截止时刻'), '((2[0-3])|[0-1][0-9]):[0-5][0-9]');
			addRegexCheck($('examineNotifyDate'), getMessage('js.com.warning.0002', '通知提醒日期'), g_regexDateFormat);
			
			// 编辑模式下校验有效
			if (OperationEnum.OPERATION_EDIT == operationMode) {
				// 通知提醒日期与报名截止日期关联校验
				addCustomCheck($('examineNotifyDate'), getMessage('js.tt.error.KSE51'), 'examineStartDate', function compareInputTime() {
					if (compareDate($('examineNotifyDate'), $('applyClosingDate')) && $F('examineNotifyDate') != $F('applyClosingDate')) {
						if (compareDate($('applyClosingDate'), $('examineStartDate')) && $F('applyClosingDate') != $F('examineStartDate')) {
							removeFieldError($('applyClosingDate'));
						}
						return compareDate($('examineNotifyDate'), $('applyClosingDate'));
					}
					addFieldError($('applyClosingDate'), getMessage('js.tt.error.KSE51'));
					return false;
				});
				// 报名截止日期与通知提醒日期关联校验
				addCustomCheck($('applyClosingDate'), getMessage('js.tt.error.KSE51'), 'applyClosingDate1', function compareInputTime() {
					if (compareDate($('examineNotifyDate'), $('applyClosingDate')) && $F('examineNotifyDate') != $F('applyClosingDate')) {
						removeFieldError($('examineNotifyDate'));
						if (compareDate($('applyClosingDate'), $('examineStartDate')) && $F('applyClosingDate') != $F('examineStartDate')) {
							removeFieldError($('examineStartDate'));
						} else {
							addFieldError($('examineStartDate'), getMessage('js.tt.error.KSE50'));
						}
						return true;
					} else {
						addFieldError($('examineNotifyDate'), getMessage('js.tt.error.KSE51'));
						return false;
					}
				});
				// 报名截止日期与考试开始日期关联校验
				addCustomCheck($('applyClosingDate'), getMessage('js.tt.error.KSE50'), 'applyClosingDate2', function compareInputTime() {
					if (compareDate($('applyClosingDate'), $('examineStartDate')) && $F('applyClosingDate') != $F('examineStartDate')) {
						removeFieldError($('examineStartDate'));
						if (compareDate($('examineNotifyDate'), $('applyClosingDate')) && $F('examineNotifyDate') != $F('applyClosingDate')) {
							removeFieldError($('examineNotifyDate'));
						} else {
							addFieldError($('examineNotifyDate'), getMessage('js.tt.error.KSE51'));
						}
						return true;
					} else {
						addFieldError($('examineStartDate'), getMessage('js.tt.error.KSE50'));
						return false;
					}
				});
			}
			
			// 考试开始日期与报名截止日期关联校验
			addCustomCheck($('examineStartDate'), getMessage('js.tt.error.KSE50'), 'examineStartDate', function compareInputTime() {
				if (compareDate($('applyClosingDate'), $('examineStartDate')) && $F('applyClosingDate') != $F('examineStartDate')) {
					if (compareDate($('examineNotifyDate'), $('applyClosingDate')) && $F('examineNotifyDate') != $F('applyClosingDate')) {
						removeFieldError($('applyClosingDate'));
					}
					return compareDate($('applyClosingDate'), $('examineStartDate'));
				}
				if (OperationEnum.OPERATION_EDIT == operationMode) {
					addFieldError($('applyClosingDate'), getMessage('js.tt.error.KSE50'));
				}
				return false;
			});
		}
	}	
}

/**
 * 开始时间与结束时间输入校验.
 * @param1 {String} 开始时间.
 * @param2 {String} 结束时间.
 * @return Boolean true:false.
 */
function compareDate() {

	var arg0 = arguments[0];
	var arg1 = arguments[1];
	if (arguments.length > 2) {
		msgid = arguments[2];
	}
	var d1 = new Date(arg0.value.replace(/\-/g, "\/"));
	var d2 = new Date(arg1.value.replace(/\-/g, "\/"));
	if (d1 > d2) {
		return false;
	}
	return true;
}

/**
 * 时刻大小比较
 * @param 开始时刻
 * @param 结束时刻
 * @return 比较结果
 */
function compareDetailTime(startTime, endTime) {
	var time1 = startTime.value.replace(":", "");
	var time2 = endTime.value.replace(":", "");
	
	if (time2 > time1) {
		return true;
	}
	return false;
}

/**
 * 档次分数『以上』变动『以下』.
 */
function chageValue() {
	var levelNum = $F('resultlevelNum');

	if (isInteger($F('resultlevel' + (levelNum - 1) + 'Score')) ||
		$F('resultlevel' + (levelNum - 1) + 'Score').empty()) {
			$('resultlevel' + levelNum + 'Score').value = $F('resultlevel' + (levelNum - 1) + 'Score');
	}
}

/**
 * 判断是否整数.
 */
function isInteger(score) {
	if (score.length != 0) {
		reg = /^\d*$/;
		if (reg.test(score)) {
			return true;
		}
	}	
	return false;
}
 
 /**
  * setDate.
  */
 function setDate(examineFlg){	
 	var d=$('examineStartDate').value;
 	g_maxDate_applyClosing = getNDaySDate(d,-1);
	
	// 考试是普通考试时
  	if (examineFlg == 1) {
	 	var d2 = $('applyClosingDate').value;
	 	g_maxDate_Notify = getNDaySDate(d2,-1);		
	}	
 }
 /**
 * resetExamineEndTime.
 */
 function resetExamineEndTime(){
	 var tmp = $('examineStartTime').value;
	 var date = new Date(2003,1,1,tmp.substring(0, 2),tmp.substring(3,5),0);
	 var t=$('examineInfo.examineTime').value;
	 date.setMinutes(date.getMinutes() + Number(t), 0, 0);
	 $('examineEndTime').value = date.pattern("HH:mm")
 }