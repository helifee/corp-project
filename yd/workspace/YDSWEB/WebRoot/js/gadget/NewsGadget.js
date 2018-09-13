/*
 * @(#)NewsGadget.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 公告系统
 */
/**
 * @fileoverview 公告新闻JavaScript.
 *
 * @author 远东)zhangzheng
 * @version 1.0 2010/08/25
 */
var last;

/**
 * 画面初期化.
 */
function init() {
	var tabs = $('newsTabs').childElements();
	
	for (var i = 0; i < tabs.length; i++) {
		Event.observe(tabs[i], 'mouseover', changeTab);
	}
	
	var maxDate = 'pubs';
	var v1, v2;
	v1 = $('pubs').down('.ndate') ? $('pubs').down('.ndate').innerHTML : '0000-00-00';
	v2 = $('news').down('.ndate') ? $('news').down('.ndate').innerHTML : '0000-00-00';
	if (v1 > v2) {
		maxDate = 'pubs';
	} else {
		v1 = v2;
		maxDate = 'news';
	}
	
	v2 = $('brief').down('.ndate') ? $('brief').down('.ndate').innerHTML : '0000-00-00';
	if (v2 > v1) {
		maxDate = 'brief';
	}
	
	fireEvent($('tab_' + maxDate), 'mouseover');
	setHeight(170);
}

function resize(size) {
	if (size == 2) {
		$('content').removeClassName('w_300').addClassName('w_600');
		$$('a').each(function(item) {
			item.update(item.readAttribute('title'));
		});
	} else if (size == 1) {
		$('content').removeClassName('w_600').addClassName('w_300');
		$$('a').each(function(item) {
			item.update(StrLeft(item.readAttribute('title'), 34));
		});
	}
}

function changeTab(event) {
	var element = Event.element(event);
	element.addClassName('active').removeClassName('normal');
	$(element.id.substr(4)).removeClassName('none');
	if (last && element.id != last) {
		$(last).addClassName('normal').removeClassName('active');
		$(last.substr(4)).addClassName('none');
	}
	last = element.id;
}
