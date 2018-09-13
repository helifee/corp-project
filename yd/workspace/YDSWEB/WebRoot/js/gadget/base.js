/*
 * @(#)base.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 活动桌面
 */
/**
 * @fileoverview 活动桌面共通JavaScript.
 *
 * @author 远东)zhangzheng
 * @version 1.0 2010/08/27
 */
var heightDelay;
function setHeight(height){
	if (heightDelay) {
		window.clearTimeout(heightDelay);
		heightDelay = null;
	}
	if (window['__setHeight']) {
		_setHeight(height);
	} else {
		heightDelay = _setHeight.delay(0.2, height);
	}
}
function _setHeight(height){
	__setHeight(height);
}
