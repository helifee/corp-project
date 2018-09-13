/*
 * @(#) k060141.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试系统
 *    SubSystem: 考试子系统
 */
/**
 * @fileoverview 课程选择JavaScript.
 *
 * @author liyanrui
 * @version 1.0
 */
/**
 * 保持checkBox状态的Hash
 */
var g_checkBoxIdStatus = new Hash();

/**
 * 日期校验格式
 */
var regexDateFormat = '^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$';
/**
 * 画面onload.
 */
function k060141initForm() {
	
	initCategoryList('K060141', '0', 1, true, '1', 'sltCategory1', 'sltCategory2', 'sltCategory3', '1', '1');
	
	$('courseId').focus();
}

/**
 * 课程选择一览检索.
 */
function searchInfoList() {

	if (!checkForm('k060141searchForm')) {
		return;
	}
	// 显示加载动画
	showLoader();
	//检索数据并刷新信息显示列表
	var url = 'k060141GetCourseList.action';
	var pars = $('k060141searchForm').serialize();
	$('oldParam').value = pars;
	pars = 'pageNumber=0&' + pars;
	pars = addStamp(pars);
	new Ajax.Updater('div_pagerCommon', url, {
		parameters: pars,
		method: 'get',
		onLoading: function() {
		},
		onSuccess: function(response) {
		},
		onFailure: function(response) {
			reportError();
		},
		onComplete: function(response) {
			var flg = checkException(response);
			if (!flg) {
			
				// 重置列表颜色
				listColor('pagerList');
				// 设置是否选中
				setCheckBoxStatus();
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
	MsgBox.message(getMessage('js.com.error.0001'));
}

/**
 * 分页时使用的ajax提交函数.
 */
function pagerCommonTag(pageUrl, pageNumber) {
	// 显示加载动画
	showLoader();
	//从隐藏控件中取出上次使用的检索条件
	var pars = $('oldParam').value;
	
	//设定url以及其余参数
	var url = pageUrl + '&pageNumber=' + pageNumber + '&' + pars;
	
	pars = addStamp(pars);
	new Ajax.Updater('div_pagerCommon', url, {
		method: 'get',
		onSuccess: function(response) {
		},
		onFailure: function(response) {
			MsgBox.message(getMessage('js.com.error.0001'));
		},
		onComplete: function(response) {
			// 设置是否选中
			setCheckBoxStatus();
			// 重置列表颜色
			listColor('pagerList');
			// 隐藏加载动画
			hideLoader();
		}
	});
}

/**
 * checkBox全选/全不选.
 */
function selectAll() {

	// 取得一览件数
	var itemCounts = $('itemCount').value;
	
	if (itemCounts != 0) {
		for (var i = 0; i < itemCounts; i++) {
			var itemSelected = 'itemSelected' + i;
			var itemId = 'courseId' + i;
			var itemName = 'courseName' + i;
			
			// 设置checkBox选中状态
			$(itemSelected).checked = $('selectAll').checked;
			
			// 保持checkBox选中的ID
			g_checkBoxIdStatus.set($(itemId).innerHTML, $(itemSelected).checked);
		}
	}
}

/**
 * 点击选中/取消选中一次考试.
 */
function selectOneItem(itemIndex) {
	var itemSelected = 'itemSelected' + itemIndex;
	var itemId = 'courseId' + itemIndex;
	var itemName = 'courseName' + itemIndex;
	
	// 保持checkBox选中的ID
	g_checkBoxIdStatus.set($(itemId).innerHTML, $(itemSelected).checked);
}

/**
 * 设置checkBox状态.
 */
function setCheckBoxStatus() {

	// 取得一览件数
	var itemCounts = $('itemCount').value;
	
	if (!itemCounts.empty()) {
		if (itemCounts != 0) {
			for (var i = 0; i < itemCounts; i++) {
				var itemSelected = 'itemSelected' + i;
				var itemId = 'courseId' + i;
				$(itemSelected).checked = g_checkBoxIdStatus.get($(itemId).innerHTML);
			}
		}
	}
}

/**
 * 加入选择的课程ID和课程名称.
 */
function addCourse() {
	// 判断教材选中情况
	if (checkSelectedItem()) {
		// 将提交结果转化成JSON串
		var g_checkBoxIdStatusJson = g_checkBoxIdStatus.toJSON();
		// 设置Action
		var url = 'k060141AddCourse';
		// 设置参数
		var pars = 'checkBoxIdStatusJson =' + g_checkBoxIdStatusJson;
		// Ajax提交请求
		var myAjax = new Ajax.Request(url, {
			method: 'post',
			parameters: pars,
			onComplete: function(request) {
				var flg = checkException(request);
				if (!flg) {
					if (request.responseText == 'success') {
					
						window.close();
						if (window.opener != null && !window.opener.closed) {
							window.opener.addCourseCallBack();
						}
					} else {
						$('div_main').update(request.responseText);
					}
				}
			},
			onFailure: reportError
		});
	} else {
		MsgBox.message(getMessage('js.tt.info.KST11', '课程'));
	}
	
}

/**
 * 检查画面选中考试数量.
 * @return Boolean true:false.
 */
function checkSelectedItem() {

	// 选择件数
	var selectedNum = g_checkBoxIdStatus.keys().length;
	
	// Hash中数据数量为0件时
	if (selectedNum == 0) {
		return false;
		// Hash中的教材checkBox选中状态都为false时	
	} else if (g_checkBoxIdStatus.values().indexOf(true) == -1) {
		return false;
	}
	
	return true;
}