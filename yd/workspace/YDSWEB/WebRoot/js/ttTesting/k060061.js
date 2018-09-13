/*
 * @(#)k060061.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 考试系统
 */
/**
 *  考试总体设定及生成JavaScript.
 *
 * @author qiliqiang
 * @version 1.0
 */

/**
 * 最大最小时间.
 */
var g_maxDate_applyClosing;
var g_maxDate_Notify;
var g_maxDate_Notify3;
var g_minDate_ExamineEnd3;
var g_minDate_ExamineEnd2;
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
 * 考试循环方式枚举.
 */
var C38_Enum = {
	/** 按年循环. */
	C38_1: 1,
	/** 按月循环. */
	C38_2: 2,
	/** 按周循环. */
	C38_3: 3
};

var timeFlag = {
	Start: 'Start',
	End: 'End'
};

/**
 * 画面onload.
 */
function initForm() {
	
	// 火狐IE兼容
	firefoxIE();
	
	//评定等级显示隐藏控制
	resultlevelControl();
	
	//查看模式
	if ($F('operatMode') == '1') {
		//考试名称
		$('examineName').disable();
		//参阅答案标志
		$('checkAnswerFlg').disable();
		//考试时间
		$('examineTime').disable();
		//再考试标志
		$('againExamineFlg').disable();
		//必考标志
		$('mustExamineFlg').disable();
		//考试说明
		$('examineComment').disable();
		//新建试卷
		$('createPaperBtn').disable();
		//选择试卷
		$('selectPaperBtn').disable();
		
		// 关联考试课程操作按钮控制
		relationButtonControl(false);
		
		//报名批准标志
		$('ApplyConfirmFlg').disable();
		//评定等级数量
		$('resultlevelNum').disable();
		//通过考试评定等级
		$('passexamineLevel').disable();
		//评定等级1
		$('resultlevel1Name').disable();
		$('resultlevel1Score').disable();
		//评定等级2
		$('resultlevel2Name').disable();
		$('resultlevel2Score').disable();
		//评定等级3
		$('resultlevel3Name').disable();
		$('resultlevel3Score').disable();
		//评定等级4
		$('resultlevel4Name').disable();
		$('resultlevel4Score').disable();
		//评定等级5
		$('resultlevel5Name').disable();
		$('resultlevel5Score').disable();
		//有效成绩标志
		for (var i = 1; $('scoreValidFlg' + i); i++) {
			$('scoreValidFlg' + i).disable();
		}
		//修改按钮
		$('midifyBtn').hide();
		//保存按钮
		$('saveBtn').hide();
		//生成考试按钮
		$('createExamineBtn').hide();
		//删除按钮
		$('deleteBtn').hide();
		//生成考试一览
		if ($('childExamineInfoTb').rows.length > 0) {
			for (var i = 0; i < $('childExamineInfoTb').rows.length; i++) {
				//考试ID
				$('childExamineIdA' + i).hide();
				$('childExamineIdLb' + i).show();
				//编辑子考试
				$('modifyChildExamineA' + i).hide();
				$('modifyChildExamineLb' + i).show();
				//删除子考试
				$('deletaChildExamineA' + i).hide();
				$('deletaChildExamineLb' + i).show();
				
			}
		} else {
			$('childExamineDiv').hide();
		}
	} //编辑模式
 else if ($F('operatMode') == '2') {

		// 父考试保存成功过。
		if ($('resultlevel1Name').value!=null && $('resultlevel1Name').value!='') {

			//考试名称
			$('examineName').disable();
			//考试时间
			$('examineTime').disable();
			//参阅答案标志
			$('checkAnswerFlg').disable();
			//再考试标志
			$('againExamineFlg').disable();
			//必考标志
			$('mustExamineFlg').disable();
			//考试说明
			$('examineComment').disable();
			//新建试卷
			$('createPaperBtn').disable();
			//选择试卷
			$('selectPaperBtn').disable();

			// 关联考试课程操作按钮控制
			relationButtonControl(false);
			
			//报名批准标志
			$('ApplyConfirmFlg').disable();
			//评定等级数量
			$('resultlevelNum').disable();
			//通过考试评定等级
			$('passexamineLevel').disable();
			//评定等级1
			$('resultlevel1Name').disable();
			$('resultlevel1Score').disable();
			//评定等级2
			$('resultlevel2Name').disable();
			$('resultlevel2Score').disable();
			//评定等级3
			$('resultlevel3Name').disable();
			$('resultlevel3Score').disable();
			//评定等级4
			$('resultlevel4Name').disable();
			$('resultlevel4Score').disable();
			//评定等级5
			$('resultlevel5Name').disable();
			$('resultlevel5Score').disable();
			//有效成绩标志
			for (var i = 1; $('scoreValidFlg' + i); i++) {
				$('scoreValidFlg' + i).disable();
			}

			//保存按钮
			$('saveBtn').hide();

			for (var i = 0; i < $('childExamineInfoTb').rows.length; i++) {
				//考试ID
				$('childExamineIdA' + i).show();
				$('childExamineIdLb' + i).hide();
				//编辑子考试
				if ($F('examineStatus' + i) == ConfirmEnum['R12_1'] ||
				$F('examineStatus' + i) == ConfirmEnum['R12_2'] ||
				$F('examineStatus' + i) == ConfirmEnum['R12_3'] ||
				$F('examineStatus' + i) == ConfirmEnum['R12_4']) {
					$('modifyChildExamineA' + i).show();
					$('modifyChildExamineLb' + i).hide();
				} else {
					$('modifyChildExamineA' + i).hide();
					$('modifyChildExamineLb' + i).show();
				}
				
				//删除子考试
				$('deletaChildExamineA' + i).show();
				$('deletaChildExamineLb' + i).hide();
			}
		} 
		//父考试第一次编辑，未成功保存过。
 		else {
			// 关联考试课程操作按钮控制
			relationButtonControl(true);

			//修改按钮
			$('midifyBtn').hide();
			//生成考试按钮
			$('createExamineBtn').disable();
			
			//生成考试一览
			$('childExamineDiv').hide();
		}

		//删除按钮
		$('deleteBtn').hide();
		//删除子考试
		for (var i = 0; i < $('childExamineInfoTb').rows.length; i++) {
			$('deletaChildExamineA' + i).show();
			$('deletaChildExamineLb' + i).hide();
		}
		

} //删除模式
 else if ($F('operatMode') == '4') {
		//考试名称
		$('examineName').disable();
		//考试时间
		$('examineTime').disable();
		//参阅答案标志
		$('checkAnswerFlg').disable();
		//再考试标志
		$('againExamineFlg').disable();
		//必考标志
		$('mustExamineFlg').disable();
		//考试说明
		$('examineComment').disable();
		//新建试卷
		$('createPaperBtn').disable();
		//选择试卷
		$('selectPaperBtn').disable();

		// 关联考试课程操作按钮控制
		relationButtonControl(false);

		//报名批准标志
		$('ApplyConfirmFlg').disable();
		//评定等级数量
		$('resultlevelNum').disable();
		//通过考试评定等级
		$('passexamineLevel').disable();
		//评定等级1
		$('resultlevel1Name').disable();
		$('resultlevel1Score').disable();
		//评定等级2
		$('resultlevel2Name').disable();
		$('resultlevel2Score').disable();
		//评定等级3
		$('resultlevel3Name').disable();
		$('resultlevel3Score').disable();
		//评定等级4
		$('resultlevel4Name').disable();
		$('resultlevel4Score').disable();
		//评定等级5
		$('resultlevel5Name').disable();
		$('resultlevel5Score').disable();
		//有效成绩标志
		for (var i = 1; $('scoreValidFlg' + i); i++) {
			$('scoreValidFlg' + i).disable();
		}
		//修改按钮
		$('midifyBtn').hide();
		//保存按钮
		$('saveBtn').hide();
		//生成考试按钮
		$('createExamineBtn').hide();
		//生成考试一览
		if ($('childExamineInfoTb') != null && $('childExamineInfoTb').rows.length > 0) {
			for (var i = 0; i < $('childExamineInfoTb').rows.length; i++) {
				//考试ID
				$('childExamineIdA' + i).show();
				$('childExamineIdLb' + i).hide();
				//编辑子考试
				$('modifyChildExamineA' + i).hide();
				$('modifyChildExamineLb' + i).show();
				//删除子考试
				$('deletaChildExamineA' + i).hide();
				$('deletaChildExamineLb' + i).show();
			}
		}
	}
	
	g_box = new PopupBox({
		// 唯一标志
		key: 3,
		// 标题内容，元素或字符串
		title: '考试生成方式设定',
		// 图标的CSS
		icon: 'img_opt opt_EditTable',
		// 内容元素
		content: $('setExamine'),
		// 显示位置，相当与z-index
		position: 5,
		// 是否允许拖动
		drag: true
	
	});
	
	//表格隔行变色
	listColor('paperListTb');
	listColor('childExamineInfoTb');
	
}

/**
 * 关联考试课程操作按钮控制.
 *
 * @param editable 考试信息是否可以编辑
 */
function relationButtonControl(editable) {

	if (editable) {
		$('addExamineBtn').enable();
		$('addCourseBtn').enable();
	} else {
		$('addExamineBtn').disable();
		$('addCourseBtn').disable();
	}
	
	// 没有需要通过的考试时，移除考试和考试查看按钮不可用
	if ($('examineInfoListSel').childElements().length == 0) {
		$('removeExamineBtn').disable();
		$('lookExamineBtn').disable();
	} else {
		$('lookExamineBtn').enable();
		
		if (editable) {
			$('removeExamineBtn').enable();
		} else {
			$('removeExamineBtn').disable();
		}
	}
	
	// 没有需要通过的课程时，移除考试和考试查看按钮不可用
	if ($('courseInfoListSel').childElements().length == 0) {
		$('removeCourseBtn').disable();
		$('lookCourseBtn').disable();
	} else {
		$('lookCourseBtn').enable();
		
		if (editable) {
			$('removeCourseBtn').enable();
		} else {
			$('removeCourseBtn').disable();
		}
	}
}

/**
 * 修改按钮的画面控制.
 */
function modifyExamine() {
	//考试名称
	$('examineName').enable();
	//考试时间
	$('examineTime').enable();
	//参阅答案标志
	$('checkAnswerFlg').enable();
	//再考试标志
	$('againExamineFlg').enable();
	//必考标志
	$('mustExamineFlg').enable();
	//考试说明
	$('examineComment').enable();
	//新建试卷
	$('createPaperBtn').enable();
	//选择试卷
	$('selectPaperBtn').enable();

	// 关联考试课程操作按钮控制
	relationButtonControl(true);

	//报名批准标志
	$('ApplyConfirmFlg').enable();
	//评定等级数量
	$('resultlevelNum').enable();
	//通过考试评定等级
	$('passexamineLevel').enable();
	//评定等级1
	$('resultlevel1Name').enable();
	$('resultlevel1Score').enable();
	//评定等级2
	$('resultlevel2Name').enable();
	$('resultlevel2Score').enable();
	//评定等级3
	$('resultlevel3Name').enable();
	$('resultlevel3Score').enable();
	//评定等级4
	$('resultlevel4Name').enable();
	$('resultlevel4Score').enable();
	//评定等级5
	$('resultlevel5Name').enable();
	$('resultlevel5Score').enable();
	//有效成绩标志
	for (var i = 1; $('scoreValidFlg' + i); i++) {
		$('scoreValidFlg' + i).enable();
	}
	//修改按钮
	$('midifyBtn').hide();
	//保存按钮
	$('saveBtn').show();
	//生成考试按钮
	$('createExamineBtn').hide();
	//删除按钮
	$('deleteBtn').hide();
	//生成考试一览
	$('childExamineDiv').show();
	for (var i = 0; i < $('childExamineInfoTb').rows.length; i++) {
		//考试ID
		$('childExamineIdA' + i).hide();
		$('childExamineIdLb' + i).show();
		//编辑子考试
		$('modifyChildExamineA' + i).hide();
		$('modifyChildExamineLb' + i).show();
		//删除子考试
		$('deletaChildExamineA' + i).hide();
		$('deletaChildExamineLb' + i).show();
	}
	
}

/**
 * 考试信息修改提交.
 */
function examineInfoSubmit() {
	
	if (!checkForm('examineInfoForm') || !validate()) {
		return;
	}
	
	//考试总分设定
	var totalScore = '0';
	if ($('paperListTb').rows.length > 0) {
		//totalScore = $('paperListTb').rows(0).down(0).next(2).innerHTML;
		totalScore = $F('testPaperInfoList[0].paperTotalScore');
	}
	// 让select控件处于选中状态
	sltExamineInfoOptions = $('examineInfoListSel').childElements();
	for (var i = 0; i < sltExamineInfoOptions.length; i++) {
		sltExamineInfoOptions[i].selected = true;
	}
	sltCourseInfoOptions = $('courseInfoListSel').childElements();
	for (var i = 0; i < sltCourseInfoOptions.length; i++) {
		sltCourseInfoOptions[i].selected = true;
	}
	//提交
	var url = 'k060061UpdateExamineInfo';
	var pars = $('examineInfoForm').serialize() + '&totalScore=' + totalScore;
	showLoader();
	new Ajax.Request(url, {
		method: 'post',
		parameters: pars,
		onComplete: function(request) {
		
			var flg = checkException(request);
			if (!flg) {
				//画面控制
				saveExamine();
				// 让select控件处于未选中状态
				for (var i = 0; i < sltExamineInfoOptions.length; i++) {
					sltExamineInfoOptions[i].selected = false;
				}
				for (var i = 0; i < sltCourseInfoOptions.length; i++) {
					sltCourseInfoOptions[i].selected = false;
				}
				hideLoader();
				showOpTip(getMessage('js.tt.info.GTT02'));
			}
			
		},
		onFailure: reportError
	});
}

/**
 * 保存校验.
 */
function validate() {

	// 评定等级合理性检查
	var levelNum = $F('resultlevelNum');
	
	for (var i = 2; i < levelNum; i++) {
		if (parseInt($F('resultlevel' + i + 'Score'), 10) >= parseInt($F('resultlevel' + (i - 1) + 'Score'), 10)) {
			addFieldError('resultlevel' + i + 'Score', getMessage('js.tt.error.KSE44'));
			$('resultlevel' + i + 'Score').focus();
			return false;
		}
	}
	
	var paperTime = 0;
	var paperTimeAreDiffrent = false;

	// 取得试卷最大大题时间，检查试卷的分数是否相同
	for (var i = 0; i < $('paperListTb').rows.length; i++) {
		var time = parseInt($F('testPaperInfoList[' + i + '].paperTime'), 10);
		
		if (paperTime < time) {
			paperTime = time;
		}
			
		if (i > 0) {
			var scoreBefore = parseInt($F('testPaperInfoList[' + (i - 1) + '].paperTotalScore'), 10);
			var scoreNow = parseInt($F('testPaperInfoList[' + i + '].paperTotalScore'), 10);
			
			if (scoreBefore != scoreNow){
				paperTimeAreDiffrent = true;
			}
		}
	}
	
	if (paperTimeAreDiffrent){
		if (!confirm(getMessage('js.tt.warn.KSW23'))){
			return false;
		}
	}
	
	if (parseInt($F('examineTime').empty() ? 0 : $F('examineTime'), 10) < parseInt(paperTime, 10)){
		if (!confirm(getMessage('js.tt.warn.KSW29'))){
			$('examineTime').focus();
			return false;
		}
	}
	
	return true;
}

/**
 * 保存按钮的画面控制.
 */
function saveExamine() {
	//考试名称
	$('examineName').disable();
	//考试时间
	$('examineTime').disable();
	//参阅答案标志
	$('checkAnswerFlg').disable();
	//再考试标志
	$('againExamineFlg').disable();
	//必考标志
	$('mustExamineFlg').disable();
	//考试说明
	$('examineComment').disable();
	//新建试卷
	$('createPaperBtn').disable();
	//选择试卷
	$('selectPaperBtn').disable();

	// 关联考试课程操作按钮控制
	relationButtonControl(false);

	//报名批准标志
	$('ApplyConfirmFlg').disable();
	//评定等级数量
	$('resultlevelNum').disable();
	//通过考试评定等级
	$('passexamineLevel').disable();
	//评定等级1
	$('resultlevel1Name').disable();
	$('resultlevel1Score').disable();
	//评定等级2
	$('resultlevel2Name').disable();
	$('resultlevel2Score').disable();
	//评定等级3
	$('resultlevel3Name').disable();
	$('resultlevel3Score').disable();
	//评定等级4
	$('resultlevel4Name').disable();
	$('resultlevel4Score').disable();
	//评定等级5
	$('resultlevel5Name').disable();
	$('resultlevel5Score').disable();
	//有效成绩标志
	for (var i = 1; $('scoreValidFlg' + i); i++) {
		$('scoreValidFlg' + i).enable();
	}
	//修改按钮
	$('midifyBtn').show();
	//保存按钮
	$('saveBtn').hide();
	//生成考试按钮
	$('createExamineBtn').enable();
	$('createExamineBtn').show();
	//删除按钮
	$('deleteBtn').hide();
	//生成考试一览
	$('childExamindListDiv').show();
	//生成考试一览
	$('childExamineDiv').show();
	for (var i = 0; i < $('childExamineInfoTb').rows.length; i++) {
		//考试ID
		$('childExamineIdA' + i).show();
		$('childExamineIdLb' + i).hide();
		//编辑子考试
		if ($F('examineStatus' + i) == ConfirmEnum['R12_1'] ||
			$F('examineStatus' + i) == ConfirmEnum['R12_2'] ||
			$F('examineStatus' + i) == ConfirmEnum['R12_3'] ||
			$F('examineStatus' + i) == ConfirmEnum['R12_4']) {
			$('modifyChildExamineA' + i).show();
			$('modifyChildExamineLb' + i).hide();
		} else {
			$('modifyChildExamineA' + i).hide();
			$('modifyChildExamineLb' + i).show();
		}
		//删除子考试
		$('deletaChildExamineA' + i).show();
		$('deletaChildExamineLb' + i).hide();
	}
}

/**
 * 新建试卷.
 */
function createPaper() {
		//计算left,top,居中定位
	var width = 1000;
	var height = 600;
    var left = (screen.availWidth - width) * 0.5;
    var top = (screen.availHeight - height) * 0.5;
    var sFeatures = 'width=' + width + 'px, height=' + height + 'px, left=' + left + 'px, top=' + top +
    'px, toolbar=no, menubar=no, scrollbars=yes,resizable=no,location=no, status=yes';

	window.open('k050011InitCreateMode2.action?belongId=' + 
	$F('examineId') + '&sltCategory1=' + $F('category1Id') + '&sltCategory2=' + 
	$F('category2Id') + '&sltCategory3=' + $F('category3Id'),'addPaperWin', sFeatures);
}

/**
 * 选择试卷按钮.
 */
function selectPaper() {

	//计算left,top,居中定位
	var width = 1000;
	var height = 600;
    var left = (screen.availWidth - width) * 0.5;
    var top = (screen.availHeight - height) * 0.5;
    var sFeatures = 'width=' + width + 'px, height=' + height + 'px, left=' + left + 'px, top=' + top +
    'px, toolbar=no, menubar=no, scrollbars=yes,resizable=no,location=no, status=yes';

	k050021Handle = window.open('k050021InitSelectMode?examineId=' + $F('examineId') +
	'&category1=' +
	$F('category1Id') +
	'&category2=' +
	$F('category2Id') +
	'&category3=' +
	$F('category3Id') +
	'&examineFlg=1', 'addPaperWin', sFeatures);
}

/**
 * 选择试卷按钮回调.
 */
function selectePaperCallBack() {

	// 选择试卷
	var url = 'k060061SelectPaperCallBack.action';
	
	var pars = 'examineId=' + $F('examineId');
	pars = addStamp(pars);
	
	new Ajax.Updater('div_k060061_list', url, {
		method: 'get',
		parameters: pars,
		onComplete: function(response) {
		
			var flg = checkException(response);
			
			if (!flg) {
				
				paperListOptionLinkReset();
				
				// 重置列表颜色
				listColor('paperListTb');
			}
		},
		onFailure: reportError
	});
}

/**
 * 重置试卷列表操作栏.
 */
function paperListOptionLinkReset(){
	var tablePaperList = $('paperListTb');
				

}

/**
 * 弹出考试生成方式设定画面.
 */
function createModelSet() {
	initPage();
	resetValue();
	
	g_box.Popup((document.body.clientHeight - 300) / 2, (document.body.clientWidth - 790) / 2);
}

/**
 * 重置设定值.
 */
function resetValue() {
	var textfields = $('setExamine').select('input[type="text"]');
	
	for (var i = 0; i < textfields.length; i++) {
		textfields[i].clear();
	}
	
	$('createModelSelect1').checked = true;
	
	$('loopExamineModelSel').value = 1;
	$('yearLoopMonthSel').value = 1;
	$('moonLoopDaySel').value = 1;
	$('weekLoopDaySel').value = 1;
	
}

/**
 * 移除试卷.
 */
function removeSelectedPaper(paperId) {

	// 该行变色标记
	selectLine('paperListTb');
	if (confirm(getMessage('js.tt.warn.JYW12'))) {
	
		var url = 'k060061deleteSelectedPaper.action';
		var params = 'examineId=' + $F('examineId') + '&' +
		'paperId=' +
		paperId;
		params = addStamp(params);
		new Ajax.Updater('div_k060061_list', url, {
			mehtod: 'get',
			parameters: params,
			onComplete: function(response) {
				var flg = checkException(response);
				
				if (!flg){
					paperListOptionLinkReset();
				}
				
			}
		});
	}
	//表格隔行变色
	listColor('paperListTb');
}

/**
 * 移除考试.
 */
function removeExamine() {

	// 没有考试被选中
	if (noExamineHasBeenSelected()) {
		return;
	}
	
	var url = 'k060061DeleteSelectedExamine.action';
	var params = 'examineId=' + $F('examineId') + '&' +
	'necessaryExamineId=' +
	getSelectedOption('examineInfoListSel').value;
	params = addStamp(params);
	new Ajax.Updater('div_mustexamine_list', url, {
		mehtod: 'get',
		parameters: params,
		onComplete: function(response) {
			var flg = checkException(response);
			
			if (!flg) {
			
				// 重新控制编辑按钮
				relationButtonControl(true);
				
				showOpTip(getMessage('js.tt.info.GTT02'));
			}
		}
	});
}

function getSelectedOption(elementId) {
	var selectElement = $(elementId);
	var options;
	if (selectElement != null) {
		options = selectElement.childElements();
		if (options.length > 0) {
			for (var i = 0; i < options.length; i++) {
				if (options[i].selected == true) {
					return options[i];
				}
			}
		}
	}
	
	return null;
}

/**
 * 移除课程.
 */
function removeCourse() {

	// 没有课程被选中
	if (noCourseHasBeenSelected()) {
		return;
	}
	
	var url = 'k060061deleteSelectedCourse.action';
	var params = 'examineId=' + $F('examineId') + '&' +
	'necessaryCourseId=' +
	getSelectedOption('courseInfoListSel').value;
	params = addStamp(params);
	new Ajax.Updater('div_mustcourse_list', url, {
		mehtod: 'get',
		parameters: params,
		onComplete: function(response) {
			var flg = checkException(response);
			
			if (!flg) {
			
				// 重新控制编辑按钮
				relationButtonControl(true);
				
				showOpTip(getMessage('js.tt.info.GTT02'));
			}
		}
	});
	
	
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
 * 重置通过等级list
 *
 * @param levelNum 选定评定等级
 */
function resetPassLevelList(levelNum) {

	var options = $('passLevelTemplate').childElements();
	var levels = $('passexamineLevel').childElements();
	
	if (levels.length > levelNum) {
		for (var i = levelNum; i < levels.length; i++) {
			levels[i].remove();
		}
	} else {
		for (var i = levels.length; i < levelNum; i++) {
			var newOption = options[i].clone(true);
			$('passexamineLevel').insert(newOption);
		}
	}
}

/**
 * 评定等级控制.
 */
function resultlevelControl() {

	var levelNum = $F('resultlevelNum');
	
	// 重新设定通过等级列表值
	resetPassLevelList(levelNum);
	
	// 非最后档，状态重置，可写，可见。
	for (var i = 1; i < levelNum; i++) {
		$('resultlevel' + i + 'Div').show();
		$('resultlevel' + i + 'LastLb').innerText = '分以上';
		$('resultlevel' + i + 'Score').readOnly = false;
		$('resultlevel' + i + 'Score').stopObserving('change');
		addRequiredCheck('resultlevel' + i + 'Name', getMessage('js.com.warning.0001', '评定等级名称'), true);
		addRequiredCheck('resultlevel' + i + 'Score', getMessage('js.com.warning.0001', '评定等级分数'), true);
	}
	
	// 最后档，分数和上一档保持同步，只读，可见。
	addRequiredCheck('resultlevel' + levelNum + 'Name', getMessage('js.com.warning.0001', '评定等级名称'), true);
	addRequiredCheck('resultlevel' + levelNum + 'Score', getMessage('js.com.warning.0001', '评定等级分数'), true);
	$('resultlevel' + levelNum + 'LastLb').innerText = '分以下';
	$('resultlevel' + levelNum + 'Score').readOnly = true;
	$('resultlevel' + levelNum + 'Score').value = $F('resultlevel' + (levelNum - 1) + 'Score');
	$('resultlevel' + (levelNum - 1) + 'Score').observe('change', function() {
		if (isInteger($F('resultlevel' + (levelNum - 1) + 'Score')) ||
		$F('resultlevel' + (levelNum - 1) + 'Score').empty()) {
			$('resultlevel' + levelNum + 'Score').value = $F('resultlevel' + (levelNum - 1) + 'Score');
		}
	});
	$('resultlevel' + levelNum + 'Div').show();
	
	// 其余档隐藏，状态清空。
	for (var i = parseInt(levelNum, 10) + 1; i <= 5; i++) {
		$('resultlevel' + i + 'Div').hide();
		$('resultlevel' + i + 'Score').clear();
		$('resultlevel' + i + 'Name').clear();
		removeCheck('resultlevel' + i + 'Name', 'requiredstring');
		removeCheck('resultlevel' + i + 'Score', 'requiredstring');
		removeCheck('resultlevel' + i + 'Score', 'int');
	}
}

/**
 * 删除父考试.
 */
function deleteParentExamine() {
	for (var i = 0; i < $('childExamineInfoTb').rows.length; i++) {
		// 含有已经批准的子考试时，不能删除
		if ($F('examineStatus' + i) != ConfirmEnum['R12_1'] &&
		$F('examineStatus' + i) != ConfirmEnum['R12_2'] &&
		$F('examineStatus' + i) != ConfirmEnum['R12_4']) {
			MsgBox.error(getMessage('js.tt.error.KSE29'));
			return false;
		}
	}
	if (confirm(getMessage('js.tt.warn.JYW07'))) {
		var url = "k060061DeleteParentExamine.action";
		var pars = 'examineId=' + $F('examineId') + '&eventId=' + $F('eventId');
		pars = addStamp(pars);
		new Ajax.Request(url, {
			method: 'get',
			parameters: pars,
			onComplete: function(request) {
				var flg = checkException(request);
				if (!flg) {
					window.location.href = 'k060051InitExamineList';
				}
			},
			onFailure: reportError
		});
	}
}

/**
 * 添加考试.
 */
function addExamine() {
	//计算left,top,居中定位
	var width = 800;
	var height = 600;
    var left = (screen.availWidth - width) * 0.5;
    var top = (screen.availHeight - height) * 0.5;
    var sFeatures = 'width=' + width + 'px, height=' + height + 'px, left=' + left + 'px, top=' + top +
    'px, toolbar=no, scrollbars=yes,resizable=no,location=no, status=yes';

	//打开子画面
	k060131Handle = window.open('k060131InitExamineSele?parenetId=' + $F('examineId'),
		'addExamineWin',sFeatures);
}

/**
 * 添加考试回调.
 */
function addExamineCallBack() {

	var url = 'k060061GetMustPassExamineList.action';
	var params = 'examineId=' + $F('examineId')
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
 * 查看考试
 */
function viewExamine() {

	if (noExamineHasBeenSelected()) {
		return;
	}
	
	window.open('k060061InitViewMode?examineId=' + $('examineInfoListSel').value);
	
}

/**
 * 检查是否没有考试被选中
 */
function noExamineHasBeenSelected() {
	var selectElement = $('examineInfoListSel');
	
	if (selectElement.value == null || selectElement.value == '') {
		//请选择一个考试
		addFieldError('examineInfoListSel', getMessage('js.tt.info.KST11','考试'));
		$('examineInfoListSel').focus();
		return true;
	}
	
	return false;
}

/**
 * 添加课程.
 */
function addCourse() {
		//计算left,top,居中定位
	var width = 800;
	var height = 600;
    var left = (screen.availWidth - width) * 0.5;
    var top = (screen.availHeight - height) * 0.5;
    var sFeatures = 'width=' + width + 'px, height=' + height + 'px, left=' + left + 'px, top=' + top +
    'px, toolbar=no, menubar=no, scrollbars=yes,resizable=no,location=no, status=yes';

	k060141Handle = window.open('k060141InitCourseSele?parenetId=' + $F('examineId'),
		'addCourseWin',sFeatures);
}

/**
 * 添加课程回调.
 */
function addCourseCallBack() {

	var url = 'k060061GetMustPassCourseList.action';
	var params = 'examineId=' + $F('examineId')
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
 * 查看课程.
 */
function viewCourse() {

	if (noCourseHasBeenSelected()) {
		return;
	}
	
	window.open('../training/j020041InitViewMode?courseId=' + $('courseInfoListSel').value + '&examineId=' + $F('examineId'));
}

/**
 * 检查是否没有课程被选中
 */
function noCourseHasBeenSelected() {
	var selectElement = $('courseInfoListSel');
	
	if (selectElement.value == null || selectElement.value == '') {
		//请选择一个课程
		addFieldError('courseInfoListSel', getMessage('js.tt.info.KST11','课程'));
		$('courseInfoListSel').focus();
		return true;
	}
	
	return false;
}

/**
 * 查看试卷
 */
function viewSelectedPaper(paperId, paperVersionNo) {
	window.open('k060031InitEditViewMode?ifViewChange=0&paperId=' + paperId + '&paperVersionNo=' + paperVersionNo);
	
}

/**
 * 考试生成详细设定页面初期化.
 */
function initPage() {
	$('modelSelectDiv').show();
	$('singleExamineDiv').hide();
	$('loopExamineDiv').hide();
	$('anytimeExamineDiv').hide();
	$('testExamineDiv').hide();
	$('btndiv').hide();
}

/**
 * 考试生成详细设定页面显示控制.
 */
function examineDetailSet() {
	$('modelSelectDiv').hide();
	initValidation('examineSetForm');
	// 清除原有校验
	removeAllValidation();
	
	//单次考试
	if ($('createModelSelect1').checked) {
		$('singleExamineDiv').show();
		$('loopExamineDiv').hide();
		$('anytimeExamineDiv').hide();
		$('testExamineDiv').hide();
		
		// 添加校验
		addValidation('singleExamineDiv')
	} //循环考试
 else if ($('createModelSelect2').checked) {
		$('singleExamineDiv').hide();
		$('loopExamineDiv').show();
		$('anytimeExamineDiv').hide();
		$('testExamineDiv').hide();
		//考试日期显示隐藏控制
		examineDateControl()
		
		// 添加校验
		addValidation('loopExamineDiv')
	} //随时考试
 else if ($('createModelSelect3').checked) {
		$('singleExamineDiv').hide();
		$('loopExamineDiv').hide();
		$('anytimeExamineDiv').show();
		$('testExamineDiv').hide();
		
		// 添加校验
		addValidation('anytimeExamineDiv')
	} //试验考试
 else if ($('createModelSelect4').checked) {
		$('singleExamineDiv').hide();
		$('loopExamineDiv').hide();
		$('anytimeExamineDiv').hide();
		$('testExamineDiv').show();
		
		// 添加校验
		addValidation('testExamineDiv')
	}
	
	
	$('btndiv').show();
}

/**
 * 清空所有校验.
 */
function removeAllValidation() {

	clearError('examineSetForm');
	
	var textfields = $('setExamine').select('input[type="text"][maxlength="10"]');
	
	for (var i = 0; i < textfields.length; i++) {
		removeCheck(textfields[i], 'requiredstring');
	}
	
	var timeFields = $('setExamine').select('input[type="text"][maxlength="5"]');
	
	for (var i = 0; i < timeFields.length; i++) {
		removeCheck(timeFields[i], 'regex');
	}
	
	removeCheck('applyClosingDay', 'requiredstring');
	removeCheck('examineNotifyDay', 'requiredstring');
	removeCheck('applyClosingDay', 'regex');
	removeCheck('examineNotifyDay', 'regex');
}

/**
 * 为特定div添加校验.
 *
 * @param div id
 */
function addValidation(divId) {

	// 取得日期项目
	var dateFields = $(divId).select('input[type="text"][maxlength="10"]');
	
	// 日期项目添加必须入力校验
	for (var i = 0; i < dateFields.length; i++) {
		addRequiredCheck(dateFields[i], getMessage('js.com.warning.0001', $(dateFields[i]).up(0).previous(0).down(0).innerHTML.replace('：', '')), true);
	}
	
	// 取得时刻项目
	var timeFields = $(divId).select('input[type="text"][maxlength="5"]');
	
	// 时刻项目添加格式校验
	for (var i = 0; i < timeFields.length; i++) {
		addRegexCheck(timeFields[i], getMessage('js.com.warning.0002', $(timeFields[i]).up(0).previous(0).down(0).innerHTML.replace('：', '')), '((2[0-3])|[0-1][0-9]):[0-5][0-9]');
	}
	
	if (divId == 'loopExamineDiv') {
		addRequiredCheck('applyClosingDay', getMessage('js.com.warning.0001', '报名截止日期'), true);
		addRequiredCheck('examineNotifyDay', getMessage('js.com.warning.0001', '通知提醒日期'), true);
		addRegexCheck('applyClosingDay', getMessage('js.com.warning.0002', '报名截止日期'), '[1-9]d*');
		addRegexCheck('examineNotifyDay', getMessage('js.com.warning.0002', '通知提醒日期'), '[1-9]d*');
	}
}

/**
 * 返回上一步.
 */
function goBack() {
	initPage();
}

/**
 * 考试日期控制.
 */
function examineDateControl() {
	//按年循环
	if ($F('loopExamineModelSel') == '1') {
		$('yearLoopMonthDiv').show();
		$('yearLoopDayDiv').show();
		$('monthLoopDayDiv').hide();
		$('weekLoopDiv').hide();
		//当月天数控制
		yearLoopDayControl();
		//按月循环
	} else if ($F('loopExamineModelSel') == '2') {
		$('yearLoopMonthDiv').hide();
		$('yearLoopDayDiv').hide();
		$('monthLoopDayDiv').show();
		$('weekLoopDiv').hide();
		//按周循环
	} else if ($F('loopExamineModelSel') == '3') {
		$('yearLoopMonthDiv').hide();
		$('yearLoopDayDiv').hide();
		$('monthLoopDayDiv').hide();
		$('weekLoopDiv').show();
	}
}

/**
 * 当月天数控制.
 */
function yearLoopDayControl() {
	//每月天数
	var day;
	if ($F('yearLoopMonthSel') == '2') {
		day = 28;
	} else if ($F('yearLoopMonthSel') == '1' ||
	$F('yearLoopMonthSel') == '3' ||
	$F('yearLoopMonthSel') == '5' ||
	$F('yearLoopMonthSel') == '7' ||
	$F('yearLoopMonthSel') == '8' ||
	$F('yearLoopMonthSel') == '10' ||
	$F('yearLoopMonthSel') == '12') {
		day = 31;
	} else if ($F('yearLoopMonthSel') == '4' ||
	$F('yearLoopMonthSel') == '6' ||
	$F('yearLoopMonthSel') == '9' ||
	$F('yearLoopMonthSel') == '11') {
		day = 30;
	}
	//删除原有的项目
	for (; 0 < $('yearLoopDaySel').childElements().length;) {
		$('yearLoopDaySel').childElements()[0].remove();
	}
	//插入新的项目
	for (var i = 1; i <= day; i++) {
		$('yearLoopDaySel').insert({
			bottom: new Element('option', {
				'id': 'yearLoopDaySel_' + i
			})
		});
		$('yearLoopDaySel_' + i).value = i;
		$('yearLoopDaySel_' + i).innerHTML = i;
	}
}

/**
 * 保存子考试设定
 */
function saveChildExamine() {
	//考试日期时间相关设定
	examineTimeInfoSet();
}

/**
 * 考试设定时间字段校验
 *
 * @return true/false
 */
function checkTimeField() {
	var selectNo = getSelectedRadioNo();
	
	// 开始日时
	var startDateTime = getDateTime(timeFlag.Start);
	// 结束日时
	var endDateTime = getDateTime(timeFlag.End);
	// 考试时间
	var examineTime = $F('examineTime').empty() ? 0 : $F('examineTime');
	
	// 考试开始时间必须小于结束时间
	if (startDateTime >= endDateTime) {
		
		if (selectNo == 2 || selectNo == 3){
			if ($F('examineStartDate' + selectNo) > $F('examineEndDate' + selectNo)) {
				addFieldError('examineStartDate' + selectNo, getMessage('js.tt.error.KSE48'));
				$('examineStartDate' + selectNo).focus();
				return false;
			} 
		}

		addFieldError('examineStartTime' + selectNo, getMessage('js.tt.error.KSE48'));
		$('examineStartTime' + selectNo).focus();
		
		return false;
	}
	
	// 考试开始时间与结束时间的间隔必须大于或等于考试时间
	if ((endDateTime - startDateTime) / 60000 < examineTime) {
		if ($('examineEndDate' + selectNo) != null) addFieldError('examineStartDate' + selectNo, getMessage('js.tt.error.KSE49'));
		if ($('examineEndDate' + selectNo) != null) addFieldError('examineEndDate' + selectNo, getMessage('js.tt.error.KSE49'));
		if ($('examineStartTime' + selectNo) != null) addFieldError('examineStartTime' + selectNo, getMessage('js.tt.error.KSE49'));
		if ($('examineEndTime' + selectNo) != null) addFieldError('examineEndTime' + selectNo, getMessage('js.tt.error.KSE49'));
		
		if ($('examineEndDate' + selectNo) != null)$('examineStartDate' + selectNo).focus();
		else $('examineStartTime' + selectNo).focus();
		
		return false;
	}
	
	// 报名截止日期必须小于考试开始日期
	if (selectNo == 1 && $F('applyClosingDate1') >= $F('examineStartDate1')) {
		addFieldError('applyClosingDate1', getMessage('js.tt.error.KSE50'));
		$('applyClosingDate1').focus();
		return false;
	}
	
	// 通知提醒日期必须小于报名截止日期
	// 单次考试检查日期
	if (selectNo == 1 && $F('examineNotifyDate1') >= $F('applyClosingDate1')) {
		addFieldError('examineNotifyDate1', getMessage('js.tt.error.KSE51'));
		$('examineNotifyDate1').focus();
		return false;
	}
	// 循环考试检查提前天数，提醒提前天数要大于截止提前天数
	if (selectNo == 2 && parseInt($F('applyClosingDay'), 10) >= parseInt($F('examineNotifyDay'), 10)) {
		addFieldError('examineNotifyDay', getMessage('js.tt.error.KSE51'));
		$('examineNotifyDay').focus();
		return false;
	}
	
	// 通知提醒日期必须小于考试开始日期
	if ($('examineNotifyDate' + selectNo) != null &&
	$F('examineNotifyDate' + selectNo) >= $F('examineStartDate' + selectNo)) {
		addFieldError('examineNotifyDate' + selectNo, getMessage('js.tt.error.KSE70'));
		$('examineNotifyDate' + selectNo).focus();
		return false;
	}
	
	// 通知提醒日期必须大于当前日期
	if ($('examineNotifyDate' + selectNo) != null &&
	new Date($F('examineNotifyDate' + selectNo).replace(/-/g, '/')) <= new Date()) {
		addFieldError('examineNotifyDate' + selectNo, getMessage('js.tt.error.KSE79'));
		$('examineNotifyDate' + selectNo).focus();
		return false;
	}
	
	if (selectNo == 4 && new Date($F('examineStartDate4').replace(/-/g, '/')) <= new Date()){
		addFieldError('examineStartDate4', getMessage('js.tt.error.KSE69'));
		$('examineStartDate4').focus();
		return false;
	}
	
	return true;
}

/**
 * 取得日期
 * @param flag 开始结束标识
 * @return 日期
 */
function getDateTime(flag) {

	var selectNo = getSelectedRadioNo();
	var date;
	if (flag == timeFlag.End && $('examine' + flag + 'Date' + selectNo) == null) {
		date = $F('examineStartDate' + selectNo).replace(/-/g, '/');
	} else{
		date = $F('examine' + flag + 'Date' + selectNo).replace(/-/g, '/');
	}
	
	var time;
	if ($('examine' + flag + 'Time' + selectNo) == null) {
		if (flag == timeFlag.Start) {
			time = ' 00:00:00';
		} else {
			time = ' 23:59:00';
		}
	} else {
	
		if ($F('examine' + flag + 'Time' + selectNo).empty()) {
			if (flag == timeFlag.Start) {
				time = ' 00:00:00';
			} else {
				time = ' 23:59:00';
			}
		} else {
			time = ' ' + $F('examine' + flag + 'Time' + selectNo) + ':00'
		}
	}
	
	return new Date(date + time);
	
}

/**
 * 取得生成方式radio选择号
 *
 * @return radio选择号
 */
function getSelectedRadioNo() {

	var radios = $NN('createModelSelect');
	
	for (var i = 0; i < radios.length; i++) {
		if (radios[i].checked) {
			return i + 1;
		}
	}
	
	return null;
}

/**
 * 考试时间日期相关设定
 */
function examineTimeInfoSet() {

	if (!checkForm('examineSetForm') || !checkTimeField()) {
		return;
	}
	
	//考试开始时刻
	var startTime = ' 00:00:00';
	//考试结束时刻
	var endTime = ' 23:59:00';
	//报名截止时刻
	var closingTime = ' 23:59:00';
	//考试开始日时
	var examineStartTime = '';
	//考试结束日时
	var examineEndTime = '';
	//通知提醒日期
	var examineNotifyDate = '';
	//报名截止日时
	var applyClosingTime = '';
	//考试方式
	var createStyleFlg;
	//单次考试
	if ($('createModelSelect1').checked) {
		createStyleFlg = '1';
		if ($F('examineStartTime1') != '') {
			startTime = ' ' + $F('examineStartTime1') + ':00';
		}
		if ($F('examineEndTime1') != '') {
			endTime = ' ' + $F('examineEndTime1') + ':00';
		}
		if ($F('applyClosingTime1') != '') {
			closingTime = ' ' + $F('applyClosingTime1') + ':00';
		}
		//考试开始日时设定
		examineStartTime = $F('examineStartDate1') + startTime;
		//考试结束日时设定
		examineEndTime = $F('examineStartDate1') + endTime;
		//通知提醒日期设定
		examineNotifyDate = $F('examineNotifyDate1');
		//报名截止日时设定
		applyClosingTime = $F('applyClosingDate1') + closingTime;
	} //循环考试
 	else if ($('createModelSelect2').checked) {
		createStyleFlg = '2';
		//考试开始日期
		var startDate;
		//报名截止日期
		var closingDate;
		//通知提醒日期
		var notifyDate;
		//循环考试开始日期
		var loopExamineStartDate = new Date($F('examineStartDate2').substring(0, 4), $F('examineStartDate2').substring(5, 7) - 1, $F('examineStartDate2').substring(8, 10));
		//循环考试结束日期
		var loopExamineEndDate = new Date($F('examineEndDate2').substring(0, 4), $F('examineEndDate2').substring(5, 7) - 1, $F('examineEndDate2').substring(8, 10));
		if ($F('examineStartTime2') != '') {
			startTime = ' ' + $F('examineStartTime2') + ':00';
		}
		if ($F('examineEndTime2') != '') {
			endTime = ' ' + $F('examineEndTime2') + ':00';
		}
		if ($F('applyClosingTime2') != '') {
			closingTime = ' ' + $F('applyClosingTime2') + ':00';
		}
		//按年循环
		if ($F('loopExamineModelSel') == C38_Enum['C38_1']) {
			startDate = new Date($F('examineStartDate2').substring(0, 4), $F('yearLoopMonthSel') - 1, $F('yearLoopDaySel'));
			//如果第一次考试开始日期小于循环考试开始日期，把第一次考试开始日期加1
			if (startDate < loopExamineStartDate) {
				startDate.setFullYear(startDate.getFullYear() + 1);
			}
			//考试开始日期大于循环考试结束日期检查
			if (startDate > loopExamineEndDate) {
				addFieldError('yearLoopMonthSel', getMessage('js.tt.error.KSE48'));
				addFieldError('yearLoopDaySel', getMessage('js.tt.error.KSE48'));
				$('yearLoopDaySel').focus();
				return;
			}
			//循环设定每次相关考试时间
			for (var i = 0; startDate <= loopExamineEndDate; i++) {
				examineStartTime += dateFormat(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate()) + startTime + ',';
				examineEndTime += dateFormat(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate()) + endTime + ',';
				closingDate = new Date(startDate);
				closingDate.setDate(startDate.getDate() - $F('applyClosingDay'));
				applyClosingTime += dateFormat(closingDate.getFullYear(), closingDate.getMonth() + 1, closingDate.getDate()) + closingTime + ',';
				notifyDate = new Date(startDate);
				notifyDate.setDate(startDate.getDate() - $F('examineNotifyDay'));
				examineNotifyDate += dateFormat(notifyDate.getFullYear(), notifyDate.getMonth() + 1, notifyDate.getDate()) + ',';
				startDate.setFullYear(startDate.getFullYear() + 1);
			}
		} //按月循环
 		else if ($F('loopExamineModelSel') == C38_Enum['C38_2']) {
			startDate = new Date($F('examineStartDate2').substring(0, 4), $F('examineStartDate2').substring(6, 7) - 1, $F('moonLoopDaySel'));
			//当每次考试开始日期小于循环考试开始日期时
			if (startDate < loopExamineStartDate) {
				startDate.setMonth(startDate.getMonth() + 1);
			}
			//考试开始日期大于循环考试结束日期检查
			if (startDate > loopExamineEndDate) {
				addFieldError('moonLoopDaySel', getMessage('js.tt.error.KSE48'));
				$('moonLoopDaySel').focus();
				return;
			}
			//循环设定每次相关考试时间
			for (var i = 0; startDate <= loopExamineEndDate; i++) {
				examineStartTime += dateFormat(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate()) + startTime + ',';
				examineEndTime += dateFormat(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate()) + endTime + ',';
				closingDate = new Date(startDate);
				closingDate.setDate(startDate.getDate() - $F('applyClosingDay'));
				applyClosingTime += dateFormat(closingDate.getFullYear(), closingDate.getMonth() + 1, closingDate.getDate()) + closingTime + ',';
				notifyDate = new Date(startDate);
				notifyDate.setDate(startDate.getDate() - $F('examineNotifyDay'));
				examineNotifyDate += dateFormat(notifyDate.getFullYear(), notifyDate.getMonth() + 1, notifyDate.getDate()) + ',';
				startDate.setMonth(startDate.getMonth() + 1);
			}
		} //按周循环
 		else if ($F('loopExamineModelSel') == C38_Enum['C38_3']) {
			startDate = new Date(loopExamineStartDate.getFullYear(), loopExamineStartDate.getMonth(), loopExamineStartDate.getDate());
			for (; startDate.getDay() != $F('weekLoopDaySel');) {
				startDate.setDate(startDate.getDate() + 1)
			}
			//考试开始日期大于循环考试结束日期检查
			if (startDate > loopExamineEndDate) {
				addFieldError('weekLoopDaySel', getMessage('js.tt.error.KSE48'));
				$('weekLoopDaySel').focus();
				return;
			}
			//循环设定每次相关考试时间
			for (var i = 0; startDate <= loopExamineEndDate; i++) {
				examineStartTime += dateFormat(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate()) + startTime + ',';
				examineEndTime += dateFormat(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate()) + endTime + ',';
				closingDate = new Date(startDate);
				closingDate.setDate(startDate.getDate() - $F('applyClosingDay'));
				applyClosingTime += dateFormat(closingDate.getFullYear(), closingDate.getMonth() + 1, closingDate.getDate()) + closingTime + ',';
				notifyDate = new Date(startDate);
				notifyDate.setDate(startDate.getDate() - $F('examineNotifyDay'));
				examineNotifyDate += dateFormat(notifyDate.getFullYear(), notifyDate.getMonth() + 1, notifyDate.getDate()) + ',';
				startDate.setDate(startDate.getDate() + 7);
			}
		}
	} //随时考试
	else if ($('createModelSelect3').checked) {
		createStyleFlg = '3';
		//考试开始日时设定
		examineStartTime = $F('examineStartDate3') + startTime;
		//考试结束日时设定
		examineEndTime = $F('examineEndDate3') + endTime;
		//通知提醒日期设定
		examineNotifyDate = $F('examineNotifyDate3');
		//报名截止日时设定
		applyClosingTime = $F('examineEndDate3') + closingTime;
	} //试验考试
 	else if ($('createModelSelect4').checked) {
		createStyleFlg = '4';
		if ($F('examineStartTime4') != '') {
			startTime = ' ' + $F('examineStartTime4') + ':00';
		}
		if ($F('examineEndTime4') != '') {
			endTime = ' ' + $F('examineEndTime4') + ':00';
		}
		//考试开始日时设定
		examineStartTime = $F('examineStartDate4') + startTime;
		//考试结束日时设定
		examineEndTime = $F('examineStartDate4') + endTime;
		//报名截止日时设定
		applyClosingTime = examineEndTime;
	}
	g_box.Close();
	//提交
	var url = 'k060061UpdateExamineCreateStyle.action';
	var pars = 'createStyleFlg=' + createStyleFlg +
	'&examineId=' +
	$F('examineId') +
	'&strExamineStartTime=' +
	examineStartTime +
	'&strExamineEndTime=' +
	examineEndTime +
	'&strExamineNotifyDate=' +
	examineNotifyDate +
	'&strApplyClosingTime=' +
	applyClosingTime +
	'&eventId=' +
	$F('eventId');
	var myAjax = new Ajax.Updater('childExamindListDiv', url, {
		method: 'post',
		parameters: pars,
		onComplete: function(response) {
			var flg = checkException(response);
			if (!flg) {
				for (var i = 0; i < $('childExamineInfoTb').rows.length; i++) {
					//考试ID
					$('childExamineIdA' + i).show();
					$('childExamineIdLb' + i).hide();
					//编辑子考试
					$('modifyChildExamineA' + i).show();
					$('modifyChildExamineLb' + i).hide();
					//删除子考试
					$('deletaChildExamineA' + i).show();
					$('deletaChildExamineLb' + i).hide();
				}
				
				showOpTip(getMessage('js.tt.info.GTT02'));
			}
			
		},
		onFailure: reportError
	});
}

/**
 * 日期格式化
 */
function dateFormat(year, month, day) {
	var date;
	var fullmonth;
	var fullday;
	if (month < 10) {
		fullmonth = '0' + month;
	} else {
		fullmonth = month;
	}
	if (day < 10) {
		fullday = '0' + day;
	} else {
		fullday = day;
	}
	date = year + '-' + fullmonth + '-' + fullday;
	return date;
}



/**
 * setDate.
 */
function setDate(){	
	var d=$('examineStartDate1').value;
	g_maxDate_applyClosing = getNDaySDate(d,-1);
	
	var d2 = $('applyClosingDate1').value;
	g_maxDate_Notify = getNDaySDate(d2,-1);
	
	var d4 = $('examineStartDate2').value;
	g_minDate_ExamineEnd2 = getNDaySDate(d4,0);
	
	var d3 = $('examineStartDate3').value;
	g_maxDate_Notify3 = getNDaySDate(d3,-1);
	g_minDate_ExamineEnd3 = getNDaySDate(d3,0);
}
/**
 * 系统错误处理.
 */
function reportError() {

	MsgBox.error(getMessage('js.com.error.0001'));
}
