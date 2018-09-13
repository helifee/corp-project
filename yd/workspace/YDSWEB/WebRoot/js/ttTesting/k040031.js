/*
 * @(#) k040031.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试系统
 *    SubSystem: 考试子系统
 */
/**
 * @fileoverview 试卷批量修改JavaScript.
 *
 * @author chenjunshuai
 * @version 1.0
 */
/**
 * 保存试题ID的Hash.
 */
var g_questionId = new Hash();

/**
 * 保存选中试题更新时间的Hash.
 */
var g_updateTime = new Hash();

/**
 * 保存所有试题更新时间的Hash.
 */
var g_allUpdateTime = new Hash();

/**
 * 取得关键字信息.
 */
var g_keywordJson;

/**
 * 画面onload.
 */
function initForm() {
	initCategoryList('K040031', '0', 1, true, '0', 'sltCategory1', 'sltCategory2', 'sltCategory3', '1', '1');
	g_keywordJson = new JsContentFilter('keyword1', 'k040031GetKeyWordInfo.action', 'keywordList');
	
	listColor('questionLibraryListTable');
	
	for (var i = 0; i < $('questionLibraryListTable').rows.length - 1; i++) {
		$('content' + i).innerText = $('rtfContent' + i).innerText.replace(/\r|\n/g, "");
		$('content' + i).title = $('rtfContent' + i).innerText;
	}
	
	$('sltCategory1').focus();
}

/**
 * checkBox全选/全不选.
 */
function selectAll() {
	for (var i = 0; i < $('questionLibraryListTable').rows.length; i++) {
		$('ck' + i).checked = $('ckAll').checked;
	}
}

/**
 * 修改按钮.
 */
function modifyTestQuestions() {

	var pars = '';
	
	for (var i = 0; i < $('questionLibraryListTable').rows.length - 1; i++) {
		g_allUpdateTime.set('updtTime' + i, $('updtTime' + i).value);
	}
	
	// 一览中选中的一行把试题ID和更新时间存入HASH中
	for (var i = 0; i < $('questionLibraryListTable').rows.length - 1; i++) {
		if ($('ck' + i).checked) {
			g_questionId.set($('questionId' + i).innerText.strip(), $('questionId' + i).innerText.strip());
			g_updateTime.set('updtTime' + i, $('updtTime' + i).value);
		} else {
			g_questionId.unset($('questionId' + i).innerText.strip());
			g_updateTime.unset('updtTime' + i);
		}
	}
	
	// 选试题类型
	if ($('questionTypeCkb').checked) {
		pars = 'questionLibrary.questionType=2' + '&questionLibrary.questionKindFlag=1';
	}
	
	// 选分类
	if ($('categoryIdCkb').checked) {
		pars = pars + '&questionLibrary.category1Id=' + encodeURI($('sltCategory1').value) +
		'&questionLibrary.category2Id=' +
		encodeURI($('sltCategory2').value) +
		'&questionLibrary.category3Id=' +
		encodeURI($('sltCategory3').value) +
		'&questionLibrary.categoryIdFlag=1';
	} else {
		pars = pars + '&questionLibrary.categoryIdFlag=0';
	}
	
	// 选关键字
	if ($('keywordCkb').checked) {
		pars = pars + '&questionLibrary.keyword=' + encodeURI($F('keyword1')) + '&questionLibrary.keywordFlag=1';
	}
	
	// 选试题难度
	if ($('questionDifficultyCkb').checked) {
		pars = pars + '&questionLibrary.questionDifficulty=' + encodeURI($('questionDifficulty').value) +
		'&questionLibrary.questionDifFlag=1';
	}
	
	// 选试题来源
	if ($('questionSourceCkb').checked) {
		pars = pars + '&questionLibrary.questionSource=' + encodeURI($F('questionSource')) +
		'&questionLibrary.questionSourceFlag=1';
	}
	
	// 选试题分数
	if ($('questionScoreCkb').checked) {
	
		// 检查试题分数
		if (!validate()) {
			return;
		}
		pars = pars + '&questionLibrary.questionScore=' + encodeURI($F('questionScore')) +
		'&questionLibrary.questionScoreFlag=1';
	} else {
		pars = pars + '&questionLibrary.questionScoreFlag=0';
	}

	pars = pars + '&checkBoxFlag=0' + '&questionIdJson=' + g_questionId.toJSON() + '&updateTimeJson=' + g_updateTime.toJSON() +
	'&allUpdateTimeJson=' +
	g_allUpdateTime.toJSON();
	if (!($('questionTypeCkb').checked || $('categoryIdCkb').checked || $('keywordCkb').checked ||
	$('questionDifficultyCkb').checked ||
	$('questionSourceCkb').checked ||
	$('questionScoreCkb').checked)) {
		return;
	}
	
	// 显示加载动画
	showLoader();
	
	var url = 'k040031UpdateTestQuestions.action?' + pars;
	$('k040031Form').action = url;
	$('k040031Form').submit();
}

/**
 * 根据分类ID取得关键字.
 */
function selectCategory1Id() {
	var url = 'k040031GetKeyWordInfo.action?category1Id=' + encodeURI($('sltCategory1').value);
	g_keywordJson.setContentArray(url);
}

/**
 * 检查试题分数.
 */
function validate() {
	if ($F('questionScore').empty()) {
		addFieldError('questionScore', getMessage('js.com.warning.0001', '试题分数'));
		return false;
	}
	if (!$F('questionScore').match('^[0-9]*[1-9][0-9]*$')) {
		addFieldError('questionScore', getMessage('js.tt.error.KSE54'));
		return false;
	}
	return true;
}

/**
 * 系统错误处理.
 */
function reportError() {
	MsgBox.error(getMessage('js.com.error.0001'));
}
