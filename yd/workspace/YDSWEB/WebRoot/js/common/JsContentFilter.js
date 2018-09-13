/*
 * @(#)JsContentFilter.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 共通系统
 */

/**
 * @author wangduo
 * @version 1.0
 */

/**
 * 通过请求指定Action的url得到指定的数组，
 * 输入框输入时对数组内容进行过滤，
 * 达到提示的效果
 * @param {String} contentInputId 输入控件ID
 * @param {String} actionUrl 请求Action的url
 * @param {String} arrayName 储存过滤内容的数组名
 */
function JsContentFilter(contentInputId, actionUrl, arrayName) {
	
	var iFilter = null;

	new Ajax.Request(actionUrl, {
		method: 'get',
		parameters: addStamp(''),
		onComplete: function(request) {
			if (checkException(request)) {
				return;
			}
			
			// 获得姓名、拼音首字母过滤功能
			iFilter = new JsInputFilter(contentInputId,null,true);
			
			// 添加过滤资源
			iFilter.setContentArray(eval('request.responseJSON.' + arrayName));	
		}
	});
	
	// 添加待筛选内容数组
	this.setContentArray = function(newActionUrl) {
	
		new Ajax.Request(newActionUrl, {
			method: 'get',
			parameters: addStamp(''),
			onComplete: function(request) {
				if (checkException(request)) {
					return;
				}
				
				// 添加过滤资源
				iFilter.setContentArray(eval('request.responseJSON.' + arrayName));
				
				iFilter.flush();
			}
		});
	}

}

