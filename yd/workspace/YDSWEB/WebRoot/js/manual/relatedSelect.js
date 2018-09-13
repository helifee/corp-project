/*
 * @(#)relatedSelect.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: Manual
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
window.onload = function() {
	
	var selectIdArr;
	var selectIdArr2;
	
	var actionNameArr;
	var actionNameArr2;
	
	// Id数组
	selectIdArr = ['nationId', 'provinceId', 'cityId'];
	selectIdArr2 = ['nationId2', 'provinceId2'];
	
	// Action数组
	actionNameArr = ['getNationListAction.action', 'getProvinceListAction.action', 'getCityListAction.action'];
	actionNameArr2 = ['getNationList2Action.action', 'getProvinceList2Action.action'];
	
	registMultiSelect(selectIdArr, actionNameArr);
	
	//带回调函数
	registMultiSelect(selectIdArr2, actionNameArr2, beforeLoad, afterLoad);
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
