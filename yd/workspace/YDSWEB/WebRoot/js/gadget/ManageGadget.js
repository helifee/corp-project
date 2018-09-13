/*
 * @(#)ManageGadget.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 活动桌面
 */
/**
 * @fileoverview 添加/移除组件JavaScript.
 *
 * @author 远东)zhangzheng
 * @version 1.0 2010/08/12
 */
var gadgetBlock = '<div id="gg_#{gdgId}" class="span-24 padding_top_10  block"><div class="imgArea " ><img src="../images/activeDesk/#{pic}"></div><div class="infoArea" ><div class="gdgName">#{name}</div><div class="gdgDesc" title="#{desc}">#{descOmi}</div></div><div class="varArea" ><div class="gdgVer">版本：#{ver}</div><div class="gdgDesc ">更新日期：#{update}</div></div><div class=" countArea text_center last"><div id="count">此组件有<span class="countSpan">#{count}</span>位用户使用</div></div><div class="button span-2 "><a class="imgBtn1 float_l" onclick="addMe(#{gdgId})">立即添加</a></div></div>';

/**
 * 画面初期化.
 */
function initForm() {
	// 初始化事件
	$('content').update();
	new Ajax.Request('findGadgetList.action', {
		method: 'get',
		parameters: addStamp(),
		onSuccess: load
	});
	var content='<input type="button" class="btn span-2" value="重置首页" onclick="resetGadget()"/>'
	$('btnSet').insert({
			top: content
		});
}

function load(request) {
	if (checkException(request)) {
		return;
	}
	gadgetList = request.responseText.evalJSON();
	for (var i = 0; i < gadgetList.length; i++) {
		var gInfo = gadgetList[i];
		var content = gadgetBlock.interpolate({
			gdgId: gInfo.gadgetId,
			pic: gInfo.preImg,
			update: gInfo.updateTime.substring(0, 10),
			ver: gInfo.ver,
			count: gInfo.gdsCount,
			name: gInfo.gadgetNm,
			descOmi: StrLeft(gInfo.gadgetDesc,90),
			desc: gInfo.gadgetDesc
		});
		
		$('content').insert({
			bottom: content
		});
	}
	if ($('content').down() == null) {
		$('content').insert({
			bottom: '<img src="../images/activeDesk/mesg.png">'
		});
	}
}

function addMe(gdgId) {
	var param;
	var list;
	$('gg_' + gdgId).hide();
	param = 'gadget.locationCol=3&gadget.locationRow=999&gadget.gadgetId=' + gdgId;
	new Ajax.Request('addGadget.action', {
		method: 'get',
		parameters: addStamp(param),
		onSuccess: function(request) {
			if (checkException(request)) {
				return;
			}
		}
	});
	list = $('content').childElements();
	for (var i = 0; i < list.length; i++) {

		if (list[i].visible()) {
			return;
		}
	}
	
	$('content').insert({
		bottom: '<img src="../images/activeDesk/mesg.png">'
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
