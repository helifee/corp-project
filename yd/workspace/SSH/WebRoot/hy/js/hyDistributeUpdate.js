/**
 * 会议室相关数据.
 */
var g_hysData;

/**
 * 会议室信息弹出窗.
 */
var g_hysInfo;

/**
 * 延时缓存.
 */
var g_posDelay;

/**
 * 上次激活的索引缓存.
 */
var g_lastIndex;

/**
 * 页面初始化.
 */
function init() {
	loadData();
	g_hysInfo = new PopupBox({
		key: 'dis',
		title: $('distInfoTitle'),
		icon: 'img_opt opt_EditInfo',
		content: $('distInfo'),
		position: 5,
		drag: true,
		beforeclose: function() {
			MsgBox.confirm('放弃当前操作？', '确认', function() {
				g_hysInfo.Close(0);
			}, nullFunc, '是', '否');
			return false;
		}
	});
	$('newHysLayer').hide();
	$('newHysLayer').setStyle({
		zIndex: 14
	});
	$('hysToolTip').hide();
	
	if (-[1, ]) {
		$('hysInfoForm')['hysQx'].observe('input', posChange);
		$('hysInfoForm')['hysQy'].observe('input', posChange);
		$('hysInfoForm')['hysZx'].observe('input', posChange);
		$('hysInfoForm')['hysZy'].observe('input', posChange);
	} else {
		$('hysInfoForm')['hysQx'].observe('propertychange', posChange);
		$('hysInfoForm')['hysQy'].observe('propertychange', posChange);
		$('hysInfoForm')['hysZx'].observe('propertychange', posChange);
		$('hysInfoForm')['hysZy'].observe('propertychange', posChange);
	}
	$('drawBar').setStyle({
		top: '1px',
		left: '55px'
	});
	Element.removeClassName(document.body, 'none');
}

/**
 * 加载数据.
 */
function loadData() {
	var url = 'getHysInfoAction.action';
	var param = addStamp();
	new Ajax.Request(url, {
		method: 'get',
		parameters: param,
		onSuccess: function(request) {
			g_hysData = request.responseText.evalJSON();
			initMap();
			initList();
		}
	});
}

/**
 * 初始化地图.
 */
function initMap() {
	$('hysMap').update();
	for (var i = 0, len = g_hysData.length; i < len; i++) {
		$('hysMap').insert({
			bottom: new Element('div', {
				'class': 'mapLayer',
				'id': 'hysLayer' + i,
				'index': i
			}).setStyle({
				left: g_hysData[i].imagefromx + 'px',
				top: g_hysData[i].imagefromy + 'px',
				width: (g_hysData[i].imagetox - g_hysData[i].imagefromx > 0 ? g_hysData[i].imagetox - g_hysData[i].imagefromx : 1) + 'px',
				height: (g_hysData[i].imagetoy - g_hysData[i].imagefromy > 0 ? g_hysData[i].imagetoy - g_hysData[i].imagefromy : 1) + 'px',
				lineHeight: (g_hysData[i].imagetoy - g_hysData[i].imagefromy) + 'px'
			}).update(g_hysData[i].hysmc).observe('mouseover', hysMouseOver).observe('mouseout', hysMouseOut)
		});
	}
}

/**
 * 初始化列表.
 */
function initList() {
	var tbd = $('hysListTable').down();
	var lines = tbd.childElements();
	var newLine;
	var tds;
	lines.each(function(item) {
		item.hide()
	});
	for (var i = 0, len = g_hysData.length; i < len; i++) {
		if (lines[i]) {
			newLine = lines[i];
		} else {
			newLine = $('dataLine').clone(true).removeClassName('none');
			tbd.insert({
				bottom: newLine
			});
			newLine.observe('mouseover', hysMouseOver);
			newLine.observe('mouseout', hysMouseOut);
		}
		newLine.show();
		newLine.writeAttribute({
			'id': 'hysList' + i
		});
		newLine.writeAttribute({
			'index': i
		});
		tds = newLine.childElements();
		tds[0].update(g_hysData[i].id);
		tds[1].update(StrLeft(g_hysData[i].hysmc, 30));
		tds[2].update(g_hysData[i].rnrs);
		tds[3].update(StrLeft(g_hysData[i].sb, 42) || '&nbsp;');
		tds[4].update(g_hysData[i].wxjk);
		tds[5].update(g_hysData[i].dh || '&nbsp;');
	}
	listColor('hysListTable');
}

/**
 * 会议室鼠标移上事件.
 * @param {Object} event
 */
function hysMouseOver(event) {
	var layer = Event.element(event);
	if (layer.tagName != 'DIV') layer = layer.up('tr');
	var index = layer.readAttribute('index');
	var pOffset = $('hysLayer' + index).cumulativeOffset();
	var pWidth = $('hysLayer' + index).getWidth();
	var rWidth;
	var tip = $('hysToolTip');
	if (g_lastIndex == index) {
		window.clearTimeout($('hysLayer' + g_lastIndex).delay);
		g_lastIndex = null;
	}
	window.clearTimeout($('hysToolTip').delay);
	$('hysLayer' + index).addClassName('mapLayerHover');
	//$('hysList' + index).addClassName('hysListHover');
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
	if (layer.tagName != 'DIV') layer = layer.up('tr');
	var index = layer.readAttribute('index');
	if ($('hysLayer' + index)) {
		g_lastIndex = index;
		$('hysToolTip').delay = Element.hide.delay(0.05, $('hysToolTip'));
		$('hysLayer' + index).delay = Element.removeClassName.delay(0.05, $('hysLayer' + index), 'mapLayerHover');
		//$('hysList' + index).delay = Element.removeClassName.delay(0.05, $('hysList' + index), 'hysListHover');
	}
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
 * 新建会议室事件.
 */
function createHys() {
	$('hysInfoForm').reset();
	$('hysInfoForm')['hysId'].enable();
	$('distInfoTitle').update('新建会议室');
	g_hysInfo.Popup();
	$('hysInfoForm')['hysId'].focus();
}

/**
 * 修改会议室事件.
 * @param {Object} obj
 */
function modifyHys(obj) {
	var i = obj.up('tr').readAttribute('index');
	$('hysInfoForm')['hysId'].value = g_hysData[i].id;
	$('hysInfoForm')['hysId'].disable();
	$('hysInfoForm')['hysMc'].value = g_hysData[i].hysmc;
	$('hysInfoForm')['hysRs'].value = g_hysData[i].rnrs;
	$('hysInfoForm')['hysSb'].value = g_hysData[i].sb;
	$('hysInfoForm')['hysJs'].value = g_hysData[i].wxjk;
	$('hysInfoForm')['hysDh'].value = g_hysData[i].dh;
	$('hysInfoForm')['hysPx'].value = g_hysData[i].sortid;
	$('hysInfoForm')['hysBg'][0].checked = g_hysData[i].hybgbz;
	$('hysInfoForm')['hysQx'].value = g_hysData[i].imagefromx;
	$('hysInfoForm')['hysQy'].value = g_hysData[i].imagefromy;
	$('hysInfoForm')['hysZx'].value = g_hysData[i].imagetox;
	$('hysInfoForm')['hysZy'].value = g_hysData[i].imagetoy;
	redrawNewLayer();
	$('distInfoTitle').update('修改会议室');
	g_hysInfo.Popup();
	$('hysInfoForm')['hysMc'].focus();
}

/**
 * 删除会议室事件.
 * @param {Object} obj
 */
function deleteHys(obj) {
	var element = obj.up('tr');
	MsgBox.confirm('警告：删除会议室会导致该会议室的预约情况无法显示！<br/>确定删除吗?', '确认', function() {
		var url = 'distributeDeleteAction.action';
		new Ajax.Request(url, {
			parameters: 'hysIddelete=' + element.down(0).innerHTML,
			onSuccess: function(request) {
				loadData();
				MsgBox.message('会议室变更成功！');
			},
			onFailure: function(request) {
				MsgBox.error('服务器故障，请稍候重试');
			}
		});
	}, nullFunc, '是', '否');
}

/**
 * 提交会议室.
 */
function submitHys() {
	if (!validate()) return;
	var url = 'distributeNewOrUpdateAction.action';
	$('hysInfoForm')['hysId'].enable();
	new Ajax.Request(url, {
		parameters: $('hysInfoForm').serialize(),
		onSuccess: function(response) {
			MsgBox.message('会议室变更成功！');
			loadData();
			g_hysInfo.Close(0);
			$('newHysLayer').hide();
		},
		onFailure: function(request) {
			MsgBox.error('服务器故障，请稍候重试');
		}
	});
}

/**
 * 取消按钮事件.
 */
function cancelHys() {
	MsgBox.confirm('放弃当前操作？', '确认', function() {
		g_hysInfo.Close(0);
		$('newHysLayer').hide();
		$('hysInfoForm').reset();
	}, nullFunc, '是', '否');
}

/**
 * 坐标值更改事件.
 * @param {Object} event
 */
function posChange(event) {
	if (!-[1, ] && event.propertyName != 'value') return;
	if (g_posDelay) {
		window.clearTimeout(g_posDelay);
		g_posDelay = null;
	}
	var e = Event.element(event);
	if (e.value.toString() != Number(e.value).toString()) {
		e.value = Number(e.value) || 0;
	}
	if ($F($('hysInfoForm')['hysZx']).blank() ||
	$F($('hysInfoForm')['hysZy']).blank() ||
	$F($('hysInfoForm')['hysQx']).blank() ||
	$F($('hysInfoForm')['hysQy']).blank() ||
	$F($('hysInfoForm')['hysZy']) - 0 <= $F($('hysInfoForm')['hysQy']) - 0 ||
	$F($('hysInfoForm')['hysZx']) - 0 <= $F($('hysInfoForm')['hysQx']) - 0) {
		$('newHysLayer').hide();
	} else {
		if ($F($('hysInfoForm')['hysZx']) > $('hysMap').getWidth()) {
			$('hysInfoForm')['hysZx'].value = $('hysMap').getWidth();
		}
		if ($F($('hysInfoForm')['hysZy']) > $('hysMap').getHeight()) {
			$('hysInfoForm')['hysZy'].value = $('hysMap').getHeight();
		}
		if ($F($('hysInfoForm')['hysQx']) > $('hysMap').getWidth()) {
			$('hysInfoForm')['hysQx'].value = $('hysMap').getWidth();
		}
		if ($F($('hysInfoForm')['hysQy']) > $('hysMap').getHeight()) {
			$('hysInfoForm')['hysQy'].value = $('hysMap').getHeight();
		}
		g_posDelay = redrawNewLayer.delay(0.5);
	}
}

/**
 * 绘制编辑中的会议室.
 */
function redrawNewLayer() {
	$('newHysLayer').show();
	$('newHysLayer').setStyle({
		left: ($F($('hysInfoForm')['hysQx']) - 0) + 'px',
		top: ($F($('hysInfoForm')['hysQy']) - 0 + 41) + 'px',
		width: ($F($('hysInfoForm')['hysZx']) - $F($('hysInfoForm')['hysQx']) > 0 ? $F($('hysInfoForm')['hysZx']) - $F($('hysInfoForm')['hysQx']) : 1) + 'px',
		height: ($F($('hysInfoForm')['hysZy']) - $F($('hysInfoForm')['hysQy']) > 0 ? $F($('hysInfoForm')['hysZy']) - $F($('hysInfoForm')['hysQy']) : 1) + 'px',
		lineHeight: ($F($('hysInfoForm')['hysZy']) - $F($('hysInfoForm')['hysQy'])) + 'px'
	}).update($F($('hysInfoForm')['hysMc']));
}

function drawLayer() {
	if (document.body.setCapture) $('hysMap').setCapture();
	document.body.onselectstart = function() {
		return false;
	}
	Element.addClassName(document.body, 'mus');
	document.body.setStyle({
		cursor: 'crosshair'
	});
	Event.observe(document, 'mousedown', startDraw);
	$('newHysLayer').hide();
	g_hysInfo.box.hide();
}

function startDraw(event) {
	var mapOffset = $('hysMap').cumulativeOffset();
	$('hysMap').oTop = mapOffset.top;
	$('hysMap').oLeft = mapOffset.left;
	if (Event.pointerX(event) - $('hysMap').oLeft < 0 || Event.pointerY(event) - $('hysMap').oTop < 0) {
		return;
	}
	if (Event.pointerX(event) - $('hysMap').oLeft > $('hysMap').getWidth() || Event.pointerY(event) - $('hysMap').oTop - $('hysMap').oTop > $('hysMap').getHeight()) {
		return;
	}
	$('hysInfoForm')['hysQx'].value = Event.pointerX(event) - $('hysMap').oLeft;
	$('hysInfoForm')['hysQy'].value = Event.pointerY(event) - $('hysMap').oTop;
	$('newHysLayer').update();
	Event.observe(document, 'mousemove', drawing);
	Event.observe(document, 'mouseup', endDraw);
}

function drawing(event) {
	if (Event.pointerX(event) - $('hysMap').oLeft - $F($('hysInfoForm')['hysQx']) <= 0 || Event.pointerY(event) - $('hysMap').oTop - $F($('hysInfoForm')['hysQy']) <= 0) {
		return;
	}
	if (Event.pointerX(event) - $('hysMap').oLeft > $('hysMap').getWidth()) {
		$('hysInfoForm')['hysZx'].value = $('hysMap').getWidth();
	} else {
		$('hysInfoForm')['hysZx'].value = Event.pointerX(event) - $('hysMap').oLeft;
	}
	if (Event.pointerY(event) - $('hysMap').oTop > $('hysMap').getHeight()) {
		$('hysInfoForm')['hysZy'].value = $('hysMap').getHeight();
	} else {
		$('hysInfoForm')['hysZy'].value = Event.pointerY(event) - $('hysMap').oTop;
	}
	
	redrawNewLayer();
}

function endDraw(event) {
	Event.stopObserving(document, 'mousedown', startDraw);
	Event.stopObserving(document, 'mousemove', drawing);
	Event.stopObserving(document, 'mouseup', endDraw);
	if (document.body.releaseCapture) $('hysMap').releaseCapture();
	document.body.onselectstart = null;
	Element.removeClassName(document.body, 'mus');
	document.body.setStyle({
		cursor: 'default'
	});
	g_hysInfo.box.show();
	redrawNewLayer();
}

/**
 * 输入验证.
 */
function validate() {
	if (!commonValidate('hysId', '会议室ID', 1, 2)) return false;
	if (!commonValidate('hysMc', '会议室名称', 1, 34)) return false;
	if (!commonValidate('hysRs', '容纳人数', 1, 3)) return false;
	if (!commonValidate('hysDh', '电话', 1, 4, true)) return false;
	if (!commonValidate('hysSb', '设备', 1, 255, true)) return false;
	if (!commonValidate('hysJs', '接口数量', 1, 3)) return false;
	if (!commonValidate('hysPx', '排序', 1, 2)) return false;
	if (!commonValidate('hysQx', '会议室标签起点X坐标', 1, 4)) return false;
	if (!commonValidate('hysQy', '会议室标签起点Y坐标', 1, 4)) return false;
	if (!commonValidate('hysZx', '会议室标签终点X坐标', 1, 4)) return false;
	if (!commonValidate('hysZy', '会议室标签终点Y坐标', 1, 4)) return false;
	if (!compareValidate('hysQx', 'hysZx', '会议室标签起点X坐标', '会议室标签终点X坐标')) return false;
	if (!compareValidate('hysQy', 'hysZy', '会议室标签起点Y坐标', '会议室标签终点Y坐标')) return false;
	return true;
}

/**
 * 通用验证方法.
 * @param {Object} name 输入框名.
 * @param {Object} text 描述.
 * @param {Object} min 最小长度.
 * @param {Object} max 最大长度.
 * @param {Object} noEmp 不检查空值.
 */
function commonValidate(name, text, min, max, noEmp) {
	var result = true;
	var field, value;
	form = $('hysInfoForm');
	if (form[name]) {
		field = form[name];
		value = field.value.strip();
		if (!noEmp && value.empty()) {
			MsgBox.error(text + '：不能为空！', null, function() {
				field.focus();
			});
			result = false;
		} else if (!value.empty() && min && max && (value.length < min || value.length > max)) {
			MsgBox.error(text + '长度应为' + min + '到' + max + '位！', null, function() {
				field.focus();
			});
			result = false;
		}
	}
	return result;
}

/**
 * 关联验证.
 * @param {Object} name1 输入框1.
 * @param {Object} name2 输入框2.
 * @param {Object} text1 描述1.
 * @param {Object} text2 描述2.
 */
function compareValidate(name1, name2, text1, text2) {
	var result = true;
	var field1, field2, value1, value2;
	form = $('hysInfoForm');
	if (form[name1] && form[name2]) {
		field1 = form[name1];
		field2 = form[name2];
		value1 = field1.value.strip();
		value2 = field2.value.strip();
		if (value1.empty() || value2.empty()) {
			result = true;
		} else if (value1 - 0 > value2 - 0) {
			MsgBox.error(text2 + '必须大于' + text1 + '！', null, function() {
				field2.focus();
			});
			result = false;
		}
	}
	return result;
}

/**
 * 获取字符串左侧指定长度的部分(中文按2计算).
 * @param {String} str 原字符串.
 * @param {int} len 长度.
 * @return {String} 截取后的字符串.
 */
function StrLeft(str, len) {
	var count = 0;
	len -= 3;
	for (var i = 0; i < str.length; i++) {
		if (str.charCodeAt(i) > 256) {
			count += 2;
		} else {
			count++;
		}
		if (count > len) return str.substring(0, i) + '....';
		if (count == len) return str.substring(0, i + 1) + '...';
	}
	return str;
}
