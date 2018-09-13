/*
 * @(#)Yc0020.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 会议室管理
 */
/**
 * @fileoverview 会议室预约情况一览画面JavaScript.
 *
 * @author fangjiayuan
 * @version 1.0
 */

/**
 * 会议室相关数据.
 */
var g_metData;

/**
 * 当前时间.
 */
var g_now;

/**
 * 正在浏览的日期.
 */
var g_day;

/**
 * 当前日期.
 */
var g_today;

/**
 * CSS枚举.
 */
var metCssEnum = {
	pass: 'hysPass',
	passMine: 'hysPassMine',
	none: 'hysNone',
	mine: 'hysMine',
	others: 'hysOthers',
	Invate:'hysInvate'
};

/**
 * 地址枚举.
 */
var metStrEnum = {
	// 会议室预约情况
	metApplyInfo: 'yc0040Init.action?metId={0}&metDate={1}',
	// 会议室预约详细修改
	metApplyModify: 'yc0030Init.action?fromId=yc0020&yc0030MetInfo.startDate={0}&yc0030MetInfo.startHour={1}&yc0030MetInfo.startMinute={2}&yc0030MetInfo.metId={3}&viewMode=1',
	// 会议室预约详细新建
	metApplyCreate: 'yc0030Init.action?fromId=yc0020&yc0030MetInfo.startDate={0}&yc0030MetInfo.startHour={1}&yc0030MetInfo.startMinute={2}&yc0030MetInfo.endHour={3}&yc0030MetInfo.endMinute={4}&yc0030MetInfo.metId={5}&viewMode=0'
}

/**
 * 数值常量枚举.
 */
var numEnum = {
	celWidth: 43,
	dayStart: 16,
	dayEnd: 36
};

var dayNameEnum = {
	0: '星期日',
	1: '星期一',
	2: '星期二',
	3: '星期三',
	4: '星期四',
	5: '星期五',
	6: '星期六'
}

/**
 * 页面初始化.
 */
function init() {

	var tmp = $('viewDay').readAttribute('nowday').split('-');
	g_day = new Date(parseInt(tmp[0],10), parseInt(tmp[1],10)-1, parseInt(tmp[2],10));
	// 当前日期
	g_today = $('viewDay').readAttribute('today');
	// 当前时间对应的刻度
	g_now = $('viewDay').readAttribute('nowtime');
	$('viewDay').value = g_day.pattern('yyyy-MM-dd');
	$('weekDay').update(dayNameEnum[g_day.getDay()]);
	
	$('tLine').setStyle({
		marginLeft: '0px'
	});

	$('metDaymetList').setStyle({
		width: '870px',
		lineHeight: '13px'
	});
	
	$('metDaymetList').previous().setStyle({
		width: '870px'
	});

	$('metDaymetList').previous().down().setStyle({
		lineHeight: '30px'
	});
	$('metList').setStyle({
		lineHeight: '30px'
	});
	$('metList').previous().setStyle({
		lineHeight: '37px'
	});
	$('metList').up().setStyle({
		marginRight: '8px',
		marginLeft: '0px'
	});
	$('btnNext').setStyle({
		marginLeft: '-20px'
	});

	//设定弹出的会议信息层的宽度
	
	$('metToolTip').hide();
	$('metToolTip').setStyle({
		width:'200px'
	});
	$('metToolTip').down().setStyle({
		width:'200px'
	});
	
	
	// 跳转到当前日期
	gotoDay(0);
	// 将页面中的所有按钮加上样式
	regBtnFunc();
	
	// 会议室预约详细弹出层
	myPopbox01 = new PopupBox({
	
		// 唯一标志，相同页面中不可重复
		key: 'my01',
		
		// 标题内容，可用元素或字符串
		title: $('meetTitle'),
		
		// 图标的CSS
		icon: 'img_opt opt_Relation',
	    
	    // 内容元素
		content: $('myPopContent01'),
		    
		// 显示位置，相当与z-index
		position: 3,
		    
		// 是否允许拖动
		drag: true,
		    
		// 是否需要加载动画
		loader: true,

		// 关闭后的回调，用于刷新页面等
		afterclose: function(){
			afterClose();
		}
	});

	if ($('sparkPopUpMsg').value != null && $('sparkPopUpMsg').value != '') {

		// 会议室预约详细修改
		$('meetTitle').update('会议修改');
		$('sparkPopUpMsg').value = $('sparkPopUpMsg').value.replace('*', '&');
		$('sparkPopUpMsg').value = $('sparkPopUpMsg').value.replace('*', '&');
		$('sparkPopUpMsg').value = $('sparkPopUpMsg').value.replace('*', '&');
		$('sparkPopUpMsg').value = $('sparkPopUpMsg').value.replace('*', '&');
		$('sparkPopUpMsg').value = $('sparkPopUpMsg').value.replace('*', '&');
		$('myInnerPage').src = 'yc0030Init.action?' + $('sparkPopUpMsg').value.unescapeHTML();
		myPopbox01.popup();
	}
}

/**
 * 设置游标.
 */
function drawCursor() {
	
	// 当前游标位置
	var leftP;
	if (!$('metCursor')) {
		// 当前游标位置
		leftP = g_now > numEnum.dayEnd ? numEnum.dayEnd - numEnum.dayStart : (g_now < numEnum.dayStart ? 0 : g_now - numEnum.dayStart);
		$('metDaymetList').up().insert({
			bottom: new Element('div', {
				'title': '当前时间',
				'id': 'metCursor'
			}).setStyle({
				width: '12px',
				height: (16 + g_metData.length * 34) + 'px',
				position: 'absolute',
				top: '22px',
				left: (leftP * 43 -6) + 'px'
			}).insert({
				top: new Element('div', {
					'class': 'hysTimeCur'
				}),
				bottom: new Element('div', {
					'class': 'hysTimeCurLine'
				}).setStyle({
					height: (-3 + g_metData.length * 37) + 'px'
				})
			})
		});
	}
	
		
	
	if ($('viewDay').value != g_today) {
		$('metCursor').hide();
	} else {
		$('metCursor').show();
	}
}

/**
 * 初始化地图.
 */
function initMap() {
	var nLayer;
	for (var i = 0, len = g_metData.length; i < len; i++) {
		$('metMap').insert({
			bottom: nLayer = new Element('div', {
				'class': 'mapLayer',
				'id': 'metLayer' + i
			}).setStyle({
				left: g_metData[i].imagefromx + 'px',
				top: g_metData[i].imagefromy + 'px',
				width: (g_metData[i].imagetox - g_metData[i].imagefromx) + 'px',
				height: (g_metData[i].imagetoy - g_metData[i].imagefromy) + 'px',
				lineHeight: (g_metData[i].imagetoy - g_metData[i].imagefromy) + 'px'
			}).update(g_metData[i].metRnm)
		});
		nLayer.observe('mouseover', hysMouseOver);
		nLayer.observe('mouseout', hysMouseOut);
		nLayer.observe('click', function(event) {
			var e = Event.element(event);
			var bars = $('barList' + e.index).childElements();
			var st, ed;
			for (var x = 0, y = bars.length; x < y; x++) {
				st = bars[x].sTime;
				if (st != null) {
					if (bars[x].hasClassName(metCssEnum.none)) {
						fireEvent(bars[x], 'click');
						return;
					}
				}
			}
		});
		nLayer.index = i;
	}
}

/**
 * 初始化列表.
 */
function initList() {
	var nList;
	for (var i = 0, len = g_metData.length; i < len; i++) {
		$('metList').insert({
			bottom: nList = new Element('div', {
				'id': 'metList' + i,
				'class': 'margin_bottom_4 hysList'
			}).update(g_metData[i].metRnm)
		});
		nList.observe('mouseover', hysMouseOver);
		nList.observe('mouseout', hysMouseOut);
		nList.observe('click', function(event) {
			var e = Event.element(event);
			// 会议室预约情况
			window.location.href = metStrEnum.metApplyInfo.format(g_metData[e.index].metId, $('viewDay').value)
		});
		nList.index = i;
		$('metDaymetList').insert({
			bottom: createBars(i)
		});
	}
}

/**
 * 创建预约时间条.
 * @param {int} index 会议室索引.
 */
function createBars(index) {
	var bars, bar, yy, yyStart, yyEnd;
	// 8：00
	var prevEnd = numEnum.dayStart;
	var bars = new Element('div', {
		'class': 'float_l position_rel margin_bottom_6',
		'id': 'barList' + index
	}).setStyle({
		width: '870px',
		height: '30px'
	});
	bars.index = index;
	for (var i = 0, len = g_metData[index].metDaymetList.length; i < len; i++) {
		yy = g_metData[index].metDaymetList[i];
		// 会议室已经申请
		if (yy.applyFlg == 1) {
			// 开始时间
			yyStart = calcStart(yy);
			// 结束时间
			yyEnd = calcEnd(yy);
			// 结束时间超过18：00
			if (yyEnd > numEnum.dayEnd) yyEnd = numEnum.dayEnd;
			// 开始时间未到8：00
			if (yyStart < numEnum.dayStart) yyStart = numEnum.dayStart;
			// 开始时间超过8：00
			if (prevEnd < yyStart) {
				fillEmp(bars, prevEnd, yyStart);
			}
			bar = new Element('div', {
				'class': 'bd_1s333 text_center float_l position_abs padding_top_2 overflow_hd'
			}).update(yy.applyUserNm + '<br>(' + yy.joinUserCnt + '人)').setStyle({
				left: ((yyStart - numEnum.dayStart) * numEnum.celWidth) + 'px',
				width: ((yyEnd - yyStart) * numEnum.celWidth) + 'px',
				height: '28px'
			});
			bar.yyIndex = i;
			bar.hysIndex = index;
			// 会议时间已经过时
			if ((yyStart < g_now && g_today == $('viewDay').value) || g_today > $('viewDay').value) {
				// 本人申请会议室
				if (yy.applyUserFlg == 1) {
					bar.addClassName(metCssEnum.passMine);
					bar.addClassName('cur_pointer');
					bar.observe('click', function(event) {
						var e = Event.element(event);
						if (e.tagName == 'BR') e = e.up();
						var metRoomInfo = g_metData[e.hysIndex];
						var yyInfo = metRoomInfo.metDaymetList[e.yyIndex];
						// 会议室预约详细修改
						$('meetTitle').update('会议修改');
						$('myInnerPage').src = metStrEnum.metApplyModify.format($('viewDay').value, formatNum(yyInfo.startHhTime, 2), formatNum(yyInfo.startMmTime, 2), metRoomInfo.metId);
						myPopbox01.popup();

					});
				// 他人申请会议室
				} else {					
					// 是被邀请者
					if (yy.permitFlg != '0') {
						bar.addClassName(metCssEnum.passMine);
						bar.addClassName('cur_pointer');
						bar.observe('click', function(event) {
							var e = Event.element(event);
							if (e.tagName == 'BR') e = e.up();
							var metRoomInfo = g_metData[e.hysIndex];
							var yyInfo = metRoomInfo.metDaymetList[e.yyIndex];
							
							// 会议室预约详细修改
							$('meetTitle').update('会议修改');
							$('myInnerPage').src = metStrEnum.metApplyModify.format($('viewDay').value, formatNum(yyInfo.startHhTime, 2), formatNum(yyInfo.startMmTime, 2), metRoomInfo.metId);
							myPopbox01.popup();

						})
					}else{
						bar.addClassName(metCssEnum.pass);
					}
					
				}
			// 会议时间未过时
			} else {
				// 本人申请会议室
				if (yy.applyUserFlg == 1) {
					bar.addClassName(metCssEnum.mine);
					bar.addClassName('cur_pointer');
					bar.observe('click', function(event) {
						var e = Event.element(event);
						if (e.tagName == 'BR') e = e.up();
						var metRoomInfo = g_metData[e.hysIndex];
						var yyInfo = metRoomInfo.metDaymetList[e.yyIndex];
						// 会议室预约详细修改
						$('meetTitle').update('会议修改');
						$('myInnerPage').src = metStrEnum.metApplyModify.format($('viewDay').value, formatNum(yyInfo.startHhTime, 2), formatNum(yyInfo.startMmTime, 2), metRoomInfo.metId);
						myPopbox01.popup();

					});
				// 他人申请会议室
				} else {
					// 是被邀请者
					if(yy.permitFlg!='0'){
						bar.addClassName(metCssEnum.Invate);
						bar.addClassName('cur_pointer');
						bar.observe('click', function(event) {
							var e = Event.element(event);
							if (e.tagName == 'BR') e = e.up();
							var metRoomInfo = g_metData[e.hysIndex];
							var yyInfo = metRoomInfo.metDaymetList[e.yyIndex];
							// 会议室预约详细修改
							$('meetTitle').update('会议修改');
							$('myInnerPage').src = metStrEnum.metApplyModify.format($('viewDay').value, formatNum(yyInfo.startHhTime, 2), formatNum(yyInfo.startMmTime, 2), metRoomInfo.metId);	
							myPopbox01.popup();

						})					
					}else{
						bar.addClassName(metCssEnum.others);
					}

					
				}
			}
			bars.insert({
				bottom: bar
			});
			prevEnd = yyEnd;
		}
	}
	// 会议室没被申请
	if (prevEnd < numEnum.dayEnd) {
		fillEmp(bars, prevEnd, numEnum.dayEnd);
	}
	return bars;
}

/**
 * 填充空白时间.
 * @param {Object} bars 容器.
 * @param {Object} st 开始时间.
 * @param {Object} ed 结束时间.
 * @param {Object} pass 是否已过期.
 */
function fillEmp(bars, st, ed, pass) {
	if (pass == null && g_today == $('viewDay').value) {
		if (ed <= g_now) {
			pass = true;
		} else if (st >= g_now) {
			pass = false;
		} else {
			fillEmp(bars, st, g_now, true);
			fillEmp(bars, g_now, ed, false);
			return;
		}
	}
	var bar = new Element('div', {
		'class': 'bd_1s333 text_center float_l position_abs padding_top_8'
	}).setStyle({
		left: ((st - numEnum.dayStart) * numEnum.celWidth) + 'px',
		width: ((ed - st) * numEnum.celWidth) + 'px',
		height: '22px'
	});
	bar.hysIndex = bars.index;
	bar.sTime = st;
	bar.eTime = ed;
	// 会议室预约过时
	if ((pass && g_today == $('viewDay').value) || g_today > $('viewDay').value) {
		bar.addClassName(metCssEnum.pass);
	// 会议室预约未过时
	} else {
		bar.addClassName(metCssEnum.none);
		bar.addClassName('cur_pointer');
		bar.update('预约');
		bar.observe('click', function(event) {
			var e = Event.element(event);
			var metRoomInfo = g_metData[e.hysIndex];
			var st = e.sTime;
			var ed = e.eTime;
			// 会议室预约详细新建
			$('meetTitle').update('会议预约');
			$('myInnerPage').src = metStrEnum.metApplyCreate.format($('viewDay').value, formatNum(Math.floor(st / 2), 2), formatNum((st % 2) * 30, 2), formatNum(Math.floor(ed / 2), 2), formatNum((ed % 2) * 30, 2), metRoomInfo.metId);
			myPopbox01.popup();

		});
	}
	bars.insert({
		bottom: bar
	});
}

/**
 * 计算开始时间.
 * @param {Object} yy 预约信息.
 * @return {int} 开始时间.
 */
function calcStart(yy) {
	var num = yy.startHhTime * 2;
	if (yy.startMmTime > 0) num++;
	return num;
}

/**
 * 计算结束时间.
 * @param {Object} yy 预约信息.
 * @return {int} 结束时间.
 */
function calcEnd(yy) {
	var num = yy.endHhTime * 2;
	if (yy.endMmTime > 0) num++;
	return num;
}

/**
 * 会议室鼠标移上事件.
 * @param {Object} event
 */
function hysMouseOver(event) {
	var layer = Event.element(event);
	if (layer.tagName != 'DIV') layer = layer.up('tr');
	var index = layer.index;
	var pOffset = $('metLayer' + index).cumulativeOffset();
	var pWidth = $('metLayer' + index).getWidth();
	var rWidth;
	var tip = $('metToolTip');
	
	$('metLayer' + index).addClassName('mapLayerHover');
	$('metList' + index).addClassName('hysListHover');
	setToolTip(index);

	pWidth = pOffset.left + pWidth + 2 - $('content').cumulativeOffset().left;
	rWidth = tip.getWidth();
	if (pWidth + rWidth >= 921) {
		pWidth = pOffset.left - rWidth - $('content').cumulativeOffset().left - 1;
	}
	tip.setStyle({
		top: (pOffset.top) - $('content').cumulativeOffset().top + 'px' ,
		left: pWidth + 'px'
	});
	tip.show();
}

/**
 * 会议室鼠标移出事件.
 * @param {Object} event
 */
function hysMouseOut(event) {
	var layer = Event.element(event);
	var index = layer.index;
	$('metToolTip').hide();
	$('metLayer' + index).removeClassName('mapLayerHover');
	$('metList' + index).removeClassName('hysListHover');
}

/**
 * 设置悬浮窗内容.
 * @param {Object} index 会议室索引.
 */
function setToolTip(index) {
	$('tipMetNm').update(g_metData[index].metRnm);
	$('tipContainCnt').update(g_metData[index].containCnt);
	$('tipEquipment').update(g_metData[index].equipment || '无');
	$('tipNetInterface').update(g_metData[index].netInterface || '无');
	$('tipTel').update(g_metData[index].tel || '无');
}

/**
 * 单击日期输入框事件.
 */
function changeDay() {
	WdatePicker({
		el: 'viewDay',
		dateFmt: 'yyyy-MM-dd',
		isShowClear: false,
		onpicked: function() {
			g_day = new Date($dp.cal.getP('y'), $dp.cal.getP('M') - 1, $dp.cal.getP('d'));
		}
		
	});
	// 跳转到指定日期
	gotoDay(0);
}

/**
 * 手动输入日期事件.
 */
function dayOnchange() {
	var tmp = $('viewDay').value.split('-');
	if(tmp.length != 3){
		g_day = new Date();
	}else{
		g_day = new Date(parseInt(tmp[0],10), parseInt(tmp[1],10) - 1, parseInt(tmp[2],10));
	}
	// 跳转到指定日期
	gotoDay(0);	
}

/**
 * 跳转到指定日期.
 * @param {Object} offset 日期偏移.
 */
function gotoDay(offset) {
	if(!g_day.getFullYear()){
		dayOnchange();
	}
	g_day.setDate(g_day.getDate() + offset);
	$('viewDay').value = g_day.getFullYear() + '-' + formatNum(g_day.getMonth() + 1, 2) + '-' + formatNum(g_day.getDate(), 2);
	$('weekDay').update(dayNameEnum[g_day.getDay()]||'&nbsp;');
	
	var url = 'yc0020MeetRoomListinit.action';
	var param = 'metDate=' + $('viewDay').value;
	param = addStamp(param);
	new Ajax.Request(url, {
		method: 'get',
		parameters: param,
		onSuccess: function(request) {
			if (checkException(request)) return;
			g_metData = request.responseText.evalJSON();
			$('metMap').update();
			$('metList').update();
			$('metDaymetList').update();
			$('content').removeClassName('none');
			// 初始化地图
			initMap();
			// 初始化列表
			initList();
			// 游标设定
			drawCursor();
		}
	});
}

/**
 * 数字格式化.
 * @param {Object} num 数字.
 * @param {Object} len 长度.
 */
function formatNum(num, len) {
	var string = String(num);
	var tmp = '';
	if (len - string.length <= 0) return string;
	for (var i = 0, count = len - string.length; i < count; i++) {
		tmp += '0';
	}
	return tmp + string;
}

 /**
  * 弹出层关闭后的回调，用于刷新页面等
  */
function afterClose(){
	location.href = 'yc0020SystemTimeinit.action?reloadFlg=1';
}

/**
 * 弹出层加载完成时调用的父页面接口 
 */
function myInnerPageLoaded(){
	myPopbox01.loaded();
}

/**
 * 弹出层关闭时调用的父页面接口
 */
function myInnerPageClose(){
	myPopbox01.close();
}

