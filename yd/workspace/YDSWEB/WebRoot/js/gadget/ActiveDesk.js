/*
 * @(#)ActiveDesk.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 活动桌面
 */
/**
 * @fileoverview 个人活动桌面JavaScript.
 *
 * @author 远东)zhangzheng
 * @version 1.0 2010/08/12
 */
var shadow;
var fixh;
var updateStr;
var delay;
var lastDrag;
var loadCount;

Event.observe(document, 'dom:loaded', initDesk);

/**
 * 初始化入口.
 */
function initDesk(size) {
	gadgetList = $$('.gadget');
	updateStr = '&activeDeskInfoList[#{index}].gadgetId=#{gid}&activeDeskInfoList[#{index}].locationCol=#{gcol}&activeDeskInfoList[#{index}].locationRow=#{grow}&activeDeskInfoList[#{index}].modeFlg=#{gfold}';
	Event.observe(document.body, 'mouseup', function() {
	
		// 隐藏遮罩.
		$('mask').hide();
		if (shadow) shadow.hide();
		
		if (lastDrag) {
			lastDrag.down('.gadgetBody').down().next().hide();
			fixHeight.delay(0.1);
		}
		
		// IE6手动resize
		if (ie6 && lastDrag) {
			var win = lastDrag.down('iframe');
			if (win.contentWindow.resize) {
				win.contentWindow.resize(lastDrag.getWidth() > 400 ? 2 : 1);
			}
		}
	});
	
	initForm();
}

/**
 * 重设高度.
 * @param {Object} gid 组件ID.
 * @param {Object} height 高度.
 */
function setHeight(gid, height) {
	var e;
	if (gid && $(gid)) {
		e = $(gid).down('.gadgetBody').down().next();
		e.setStyle({
			height: height + 'px'
		});
		e.hide();
		e = e.previous();
		e.show();
		
		// 动画效果
		if (isIe()) {
			e.setStyle({
				height: height + 'px'
			});
		} else {
			new Effect.Morph(e, {
				style: {
					height: height + 'px'
				},
				duration: 0.3
			});
		}
	}
}

/**
 * 组件加载完成事件.
 * @param {Object} gid ID.
 * @param {Object} win iframe对象.
 */
function gadgetLoad(gid, win) {
	// 装入setHeight方法
	win.contentWindow.__setHeight = setHeight.curry(gid);
	
	if(ie6)setHeight(gid, 0);
	
	// 设置大小
	if (win.contentWindow.resize) {
		if (win.contentDocument) {
			win.contentWindow.resize.defer(win.contentDocument.documentElement.clientWidth > 400 ? 2 : 1);
		} else {
			win.contentWindow.resize.defer(win.document.documentElement.clientWidth > 400 ? 2 : 1);
		}
	}
	
	if (!loadCount) loadCount = 0;
	loadCount++;
	
	// 刷新后IE下重绑定事件
	if (isIe()) {
		Event.observe(win.contentWindow, 'resize', gadgetResize.curry(gid));
	}
	
	if (loadCount == $('gadgetSize').value) {
		fixHeight();
		// IE6特别处理
		if (ie6) ie6fix.delay(1);
	}
}

/**
 * IE6下未知问题修正.
 */
function ie6fix() {
	var gadgets = $$('.gadget');
	var win;
	for (var i = 0; i < gadgets.length; i++) {
		win = Element.down(gadgets[i], 'iframe').contentWindow;
		if (win.resize) {
			win.resize.defer( gadgets[i].getWidth() > 400 ? 2 : 1);
		}
	}
	MsgBox.message('1').close();
}

/**
 * 改变大小事件.
 * @param {Object} gid ID.
 * @param {Object} event 事件对象.
 */
function gadgetResize(gid, event) {
	var win = Event.element(event);
	if (win.resize) {
		win.resize.defer(win.document.documentElement.clientWidth > 400 ? 2 : 1);
	}
}

/**
 * 拖放事件绑定.
 */
function initForm() {

	gds = $$('.gadgetRoad');
	gds.each(function(item) {
		Sortable.create(item, {
			ghosting: false,
			constraint: false,
			containment: gds,
			only: ['type1', 'type2'],
			handle: 'gadgetTitle',
			scroll: window,
			tag: 'div',
			dropOnEmpty: true,
			onUpdate: function(element) {
				// 拖放结束
				if (delay) {
					window.clearTimeout(delay);
				}
				// 延时2秒更新位置信息
				delay = updateDesk.delay(2);
			},
			onChange: function(element) {
				// 移动虚线框
				if (!shadow.visible() || element.previous() != shadow) {
					Element.insert(element, {
						before: shadow
					});
					shadow.show();
					$('mask').show();
					element.down('.gadgetBody').down().next().show();
					lastDrag = element;
				}
				shadow.setStyle({
					height: element.getHeight() - 2 + 'px',
					width: element.getWidth() - 2 + 'px'
				});
			}
		});
	});
	shadow = new Element('div').addClassName('gadgetShadow');
}

/**
 * 收缩事件.
 * @param {Object} item
 */
function togEvent(item) {
	item = $(item);
	new Effect.toggle(item.up('.gadget').down('.gadgetBody'), 'blind', {
		duration: 0.5,
		afterFinish: function(obj) {
			var p = 'gadgetId=' + item.up('.gadget').id.substr(3);
			var gbody = item.up('.gadget').down('.gadgetBody');
			p += '&foldFlg=';
			p += (gbody.visible() ? 1 : 2);
			new Ajax.Request('changeStatus.action', {
				method: 'get',
				parameters: addStamp(p)
			});
			item.writeAttribute({
				'title': gbody.visible() ? '收缩' : '展开'
			});
			fixHeight();
		}
	});
}

/**
 * 关闭事件.
 * @param {Object} item
 */
function closeEvent(item) {
	item = $(item);
	MsgBox.confirm('关闭组件[' + item.up('.gadget').down('.gadgetTitle').innerHTML.stripTags() + ']？', '确认', function() {
		new Effect.BlindUp(item.up('.gadget'), {
			duration: 0.5,
			afterFinish: function(obj) {
				new Ajax.Request('delGadget.action', {
					method: 'get',
					parameters: addStamp('gadgetId=' + item.up('.gadget').id.substr(3))
				});
				Element.remove(obj.element);
				fixHeight();
			}
		});
	}, function() {
	
	}, '确定', '取消');
	
}

/**
 * 刷新事件.
 * @param {Object} item
 */
function refreshEvent(item) {
	item = $(item);
	var gad = item.up('.gadget');
	var iframe = gad.down('iframe');
	var src = iframe.src;
	iframe.src = '';
	iframe.src = src;
}

/**
 * 提交位置信息.
 */
function updateDesk() {
	var param = 'a=1';
	var count = 0;
	for (var i = 0; i < 4; i++) {
		var gds = $('Road_' + i).select('.gadget');
		for (var j = 0; j < gds.length; j++) {
			param += updateStr.interpolate({
				index: count,
				gid: gds[j].id.substr(3),
				gcol: i,
				grow: j,
				gfold: gds[j].down('.gadgetBody').visible() ? 1 : 2
			});
			count++;
		}
	}
	
	new Ajax.Request('updatePersonSetting.action', {
		method: 'post',
		parameters: addStamp(param),
		onComplete: function() {
			delay = null;
		}
	});
}

/**
 * 重置组件.
 */
function resetGadget() {
	MsgBox.confirm('确认要恢复默认设置？', '确认', function() {
		window.location = 'resetGadget.action';
	}, function() {
	}, '确定', '取消');
}

/**
 * 拖放触发高度修复.
 */
function fixHeight() {
	fixh = $('Road_0').getHeight();
	
	$('Road_1').setStyle({
		height: 'auto'
	});
	$('Road_2').setStyle({
		height: 'auto'
	});
	$('Road_3').setStyle({
		height: 'auto'
	});
	
	var maxh = Math.max($('Road_1').getHeight(), $('Road_2').getHeight(), $('Road_3').getHeight() - fixh);
	$('Road_1').setStyle({
		height: maxh + 'px'
	});
	$('Road_2').setStyle({
		height: maxh + 'px'
	});
	$('Road_3').setStyle({
		height: maxh + fixh + 'px'
	});
}
