/**
 * 会议室相关数据.
 */
var g_hysData;

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
var hysCssEnum = {
	pass: 'hysPass',
	passMine: 'hysPassMine',
	none: 'hysNone',
	mine: 'hysMine',
	others: 'hysOthers'
};

/**
 * 地址枚举.
 */
var hysStrEnum = {
	listHref: 'conferensituation.action?conferensituationId={0}&startDate={1}&endDate={2}&radiobutton=rq',
	yyModify: 'yuyueModifyInit.action?yuyueinfo.startdate={0}&yuyueinfo.start_hour={1}&yuyueinfo.start_minute={2}&yuyueinfo.hys={3}&yuyueInfoSource=1',
	yyCreate: 'yuyue.action?yuyueinfo.startdate={0}&yuyueinfo.start_hour={1}&yuyueinfo.start_minute={2}&yuyueinfo.end_hour={3}&yuyueinfo.end_minute={4}&yuyueinfo.hys={5}',
}

/**
 * 数值常量枚举.
 */
var numEnum = {
	celWidth: 40,
	dayStart: 16,
	dayEnd: 37
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
	g_day = new Date(parseInt(tmp[0]), parseInt(tmp[1]) - 1, parseInt(tmp[2]));
	$('hysToolTip').hide();
	g_today = $('viewDay').readAttribute('today');
	g_now = $('viewDay').readAttribute('nowtime');
	$('viewDay').value = g_day.getFullYear() + '-' + formatNum(g_day.getMonth() + 1, 2) + '-' + formatNum(g_day.getDate(), 2);
	$('weekDay').update(dayNameEnum[g_day.getDay()]);
	
	$('tLine').setStyle({
		marginLeft: '14px'
	});
	$('yyList').setStyle({
		width: '840px',
		lineHeight: '13px',
		marginLeft: '14px'
	});
	$('yyList').previous().setStyle({
		width: '880px'
	});
	$('yyList').previous().down().setStyle({
		lineHeight: '30px'
	});
	$('hysList').setStyle({
		lineHeight: '30px'
	});
	$('hysList').previous().setStyle({
		height: '37px'
	});
	$('hysList').up().setStyle({
		width: '60px',
		marginRight: '10px',
		marginLeft: '5px'
	});
	$('btnNext').setStyle({
		marginLeft: '-20px'
	});
	gotoDay(0);
	regBtnFunc();
}

/**
 * 设置游标.
 */
function drawCursor() {
	var leftP;
	if (!$('hysCursor')) {
		leftP = g_now > numEnum.dayEnd ? numEnum.dayEnd - numEnum.dayStart : (g_now < numEnum.dayStart ? 0 : g_now - numEnum.dayStart);
		$('yyList').up().insert({
			bottom: new Element('div', {
				'title': '当前时间',
				'id': 'hysCursor'
			}).setStyle({
				width: '12px',
				height: (16 + g_hysData.length * 34) + 'px',
				position: 'absolute',
				top: '22px',
				left: (leftP * 40 + 9) + 'px'
			}).insert({
				top: new Element('div', {
					'class': 'hysTimeCur'
				}),
				bottom: new Element('div', {
					'class': 'hysTimeCurLine'
				}).setStyle({
					height: (-3 + g_hysData.length * 37) + 'px'
				})
			})
		});
	}
	if ($('viewDay').value != g_today) {
		$('hysCursor').hide();
	} else {
		$('hysCursor').show();
	}
}

/**
 * 初始化地图.
 */
function initMap() {
	var nLayer;
	for (var i = 0, len = g_hysData.length; i < len; i++) {
		$('hysMap').insert({
			bottom: nLayer = new Element('div', {
				'class': 'mapLayer',
				'id': 'hysLayer' + i
			}).setStyle({
				left: g_hysData[i].imagefromx + 'px',
				top: g_hysData[i].imagefromy + 'px',
				width: (g_hysData[i].imagetox - g_hysData[i].imagefromx) + 'px',
				height: (g_hysData[i].imagetoy - g_hysData[i].imagefromy) + 'px',
				lineHeight: (g_hysData[i].imagetoy - g_hysData[i].imagefromy) + 'px',
			}).update(g_hysData[i].hysmc)
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
					if (bars[x].hasClassName(hysCssEnum.none)) {
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
	for (var i = 0, len = g_hysData.length; i < len; i++) {
		$('hysList').insert({
			bottom: nList = new Element('div', {
				'id': 'hysList' + i,
				'class': 'margin_bottom_4 hysList'
			}).update(g_hysData[i].hysmc)
		});
		nList.observe('mouseover', hysMouseOver);
		nList.observe('mouseout', hysMouseOut);
		nList.observe('click', function(event) {
			var e = Event.element(event);
			window.location.href = hysStrEnum.listHref.format(g_hysData[e.index].hysid, $('viewDay').value, $('viewDay').value)
		});
		nList.index = i;
		$('yyList').insert({
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
	var prevEnd = numEnum.dayStart;
	var bars = new Element('div', {
		'class': 'float_l position_rel margin_bottom_6',
		'id': 'barList' + index
	}).setStyle({
		width: '840px',
		height: '30px'
	});
	bars.index = index;
	for (var i = 0, len = g_hysData[index].hyslist.length; i < len; i++) {
		yy = g_hysData[index].hyslist[i];
		if (yy.haverenflg == 1) {
			yyStart = calcStart(yy);
			yyEnd = calcEnd(yy);
			if (yyEnd > numEnum.dayEnd) yyEnd = numEnum.dayEnd;
			if (yyStart < numEnum.dayStart) yyStart = numEnum.dayStart;
			if (prevEnd < yyStart) {
				fillEmp(bars, prevEnd, yyStart);
			}
			bar = new Element('div', {
				'class': 'bd_1s333 text_center float_l position_abs padding_top_2 overflow_hd'
			}).update(yy.sqrName + '<br>(' + yy.cjrs + '人)').setStyle({
				left: ((yyStart - numEnum.dayStart) * numEnum.celWidth) + 'px',
				width: ((yyEnd - yyStart) * numEnum.celWidth) + 'px',
				height: '28px'
			});
			bar.yyIndex = i;
			bar.hysIndex = index;
			if ((yyStart < g_now && g_today == $('viewDay').value) || g_today > $('viewDay').value) {
			
				if (yy.sqridflg == 1) {
					bar.addClassName(hysCssEnum.passMine);
					bar.addClassName('cur_pointer');
					bar.observe('click', function(event) {
						var e = Event.element(event);
						if (e.tagName == 'BR') e = e.up();
						var hysInfo = g_hysData[e.hysIndex];
						var yyInfo = hysInfo.hyslist[e.yyIndex];
						window.location.href = hysStrEnum.yyModify.format($('viewDay').value, formatNum(yyInfo.starthhTime, 2), formatNum(yyInfo.startmmTime, 2), hysInfo.hysid);
					});
				} else {
					bar.addClassName(hysCssEnum.pass);
				}
			} else {
				if (yy.sqridflg == 1) {
					bar.addClassName(hysCssEnum.mine);
					bar.addClassName('cur_pointer');
					bar.observe('click', function(event) {
						var e = Event.element(event);
						if (e.tagName == 'BR') e = e.up();
						var hysInfo = g_hysData[e.hysIndex];
						var yyInfo = hysInfo.hyslist[e.yyIndex];
						window.location.href = hysStrEnum.yyModify.format($('viewDay').value, formatNum(yyInfo.starthhTime, 2), formatNum(yyInfo.startmmTime, 2), hysInfo.hysid);
					});
				} else {
					bar.addClassName(hysCssEnum.others);
				}
			}
			bars.insert({
				bottom: bar
			});
			prevEnd = yyEnd;
		}
	}
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
	if ((pass && g_today == $('viewDay').value) || g_today > $('viewDay').value) {
		bar.addClassName(hysCssEnum.pass);
	} else {
		bar.addClassName(hysCssEnum.none);
		bar.addClassName('cur_pointer');
		bar.update('预约');
		bar.observe('click', function(event) {
			var e = Event.element(event);
			var hysInfo = g_hysData[e.hysIndex];
			var st = e.sTime;
			var ed = e.eTime;
			window.location.href = hysStrEnum.yyCreate.format($('viewDay').value, formatNum(Math.floor(st / 2), 2), formatNum((st % 2) * 30, 2), formatNum(Math.floor(ed / 2), 2), formatNum((ed % 2) * 30, 2), hysInfo.hysid);
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
	var num = yy.starthhTime * 2;
	if (yy.startmmTime > 0) num++;
	return num;
}

/**
 * 计算结束时间.
 * @param {Object} yy 预约信息.
 * @return {int} 结束时间.
 */
function calcEnd(yy) {
	var num = yy.endhhTime * 2;
	if (yy.endmmTime > 0) num++;
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
	var pOffset = $('hysLayer' + index).cumulativeOffset();
	var pWidth = $('hysLayer' + index).getWidth();
	var rWidth;
	var tip = $('hysToolTip');
	
	$('hysLayer' + index).addClassName('mapLayerHover');
	$('hysList' + index).addClassName('hysListHover');
	setToolTip(index);
	pWidth = pOffset.left + pWidth + 2 - $('content').cumulativeOffset().left;
	rWidth = tip.getWidth();
	if (pWidth + rWidth >= 921) {
		pWidth = pOffset.left - rWidth - $('content').cumulativeOffset().left - 1;
	}
	tip.setStyle({
		top: (pOffset.top) + 'px',
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
	$('hysToolTip').hide();
	$('hysLayer' + index).removeClassName('mapLayerHover');
	$('hysList' + index).removeClassName('hysListHover');
}

/**
 * 设置悬浮窗内容.
 * @param {Object} index 会议室索引.
 */
function setToolTip(index) {
	$('tipMc').update(g_hysData[index].hysmc);
	$('tipRs').update(g_hysData[index].rnrs);
	$('tipSb').update(g_hysData[index].sb || '无');
	$('tipJk').update(g_hysData[index].wxjk || '无');
	$('tipDh').update(g_hysData[index].dh || '无');
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
}

/**
 * 手动输入日期事件.
 */
function dayOnchange() {
	var tmp = $('viewDay').value.split('-');
	g_day = new Date(parseInt(tmp[0]), parseInt(tmp[1]) - 1, parseInt(tmp[2]));
	gotoDay(0);
}

/**
 * 跳转到指定日期.
 * @param {Object} offset 日期偏移.
 */
function gotoDay(offset) {
	g_day.setDate(g_day.getDate() + offset);
	$('viewDay').value = g_day.getFullYear() + '-' + formatNum(g_day.getMonth() + 1, 2) + '-' + formatNum(g_day.getDate(), 2);
	$('weekDay').update(dayNameEnum[g_day.getDay()]);
	
	var url = 'hysylinit.action';
	var param = 'stryyDate=' + $('viewDay').value;
	param = addStamp(param);
	new Ajax.Request(url, {
		method: 'get',
		parameters: param,
		onSuccess: function(request) {
			g_hysData = request.responseText.evalJSON();
			$('hysMap').update();
			$('hysList').update();
			$('yyList').update();
			$('content').removeClassName('none');
			initMap();
			initList();
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
};
