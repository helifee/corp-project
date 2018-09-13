/*
 * @(#)eduGadget.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 公告系统
 */
/**
 * @fileoverview 公告新闻JavaScript.
 *
 * @author 远东)liuzhongnan
 * @version 1.0 2010/08/31
 */

var last;

/**
 * 画面初期化.
 */
function init() {
	
	var tabs = $('ttTabs').childElements();
	for (var i = 0; i < tabs.length; i++) {
		Event.observe(tabs[i], 'mouseover', changeTab);
	}
	fireEvent($('tab_training'), 'mouseover');
	setHeight(125);
}

function changeTab(event) {
	var element = Event.element(event);
	element.addClassName('active').removeClassName('normal');
	$(element.id.substr(4)).removeClassName('none');
	if(last && element.id != last){
		$(last).addClassName('normal').removeClassName('active');
		$(last.substr(4)).addClassName('none');
	}
	last = element.id;
}
function resize(size){
	if (size == 2) {
		$('content').removeClassName('w_300').addClassName('w_600');
		$$('a').each(function(item) {
			item.update(StrLeft(item.readAttribute('title'), 68));
		});
	} else if (size == 1) {
		$('content').removeClassName('w_600').addClassName('w_300');
		$$('a').each(function(item) {
			item.update(StrLeft(item.readAttribute('title'), 34));
		});
	}
}
