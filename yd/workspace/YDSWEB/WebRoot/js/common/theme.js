/*
 * @(#)theme.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: common
 */


/*
 * 取得主题列表
 */
function getThemeList(){
	var url = 'common/getThemeList.action';
	var params = addStamp();
	var request = new Ajax.Updater('themeList',url, {
		method: 'get',
		parameters: params,
		asynchronous: true
	});
}
Event.observe(window, 'load', getThemeList);