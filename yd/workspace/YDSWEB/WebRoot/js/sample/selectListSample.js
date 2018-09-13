/*
 * @(#)selectList_sample.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: Sample
 */
/**
 * @fileoverview 下拉列表联动JavaScript.
 *
 * @author renlong
 * @version 1.0
 */
/**
 * 画面onload.
 */
function initForm() {
	var selectIdArr, actionNameArr;
	
	// Id数组
	selectIdArr = ['nationId', 'provinceId', 'cityId'];
	
	// Action数组
	actionNameArr = ['getNationListAction.action', 'getProvinceListAction.action', 'getCityListAction.action'];
	
	// ①有回调
	registMultiSelect(selectIdArr, actionNameArr, beforeLoad, afterLoad);
	
	// ②无回调
	//registMultiSelect(selectIdArr, actionNameArr);
}

/**
 * 加载子菜单前.
 * @param {Object} selectId 菜单Id.
 */
function beforeLoad(selectId) {
	$(selectId + 'Status').update('等');
}

/**
 * 加载子菜单后.
 * @param {Object} selectId 菜单Id.
 */
function afterLoad(selectId) {
	$(selectId + 'Status').update('好');
}

/**
 * 提交.
 */
function submitInfo() {
	alert('form:' + $('itemForm').serialize());
	$('itemForm').action = $('itemForm').action + '?' + dataSerialize($('itemForm'));
	alert('url:' + $('itemForm').action);
	$('itemForm').submit();
}
