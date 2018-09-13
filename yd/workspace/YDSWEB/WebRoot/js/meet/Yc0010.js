/*
 * @(#)Yc0010.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 会议室管理
 */
/**
 * @fileoverview 会议室管理画面JavaScript.
 *
 * @author mengxiaoyan
 * @version 1.0
 */

/**
 * 会议室相关数据.
 */
var g_hysData;

/**
 * 新建或者更新flag.
 */
var g_flag;

/**
 * 会议室信息弹出窗.
 */
var g_hysInfo;

/**
 * 会议室排序信息弹出窗.
 */
var g_box_sort;

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
		title: $('metRoomListTitle'),
		icon: 'img_opt opt_EditInfo',
		content: $('metRoomInfoList'),
		position: 5,
		drag: true,
		beforeclose: function() {
			MsgBox.confirm(getMessage('js.com.info.0005'), '确认', function() {
				g_hysInfo.Close(0);
				
			}, nullFunc, '是', '否');
			return false;
		}
	});
    // 弹出会议室排序参数设定
    g_box_sort = new PopupBox({
        // 唯一标志
        key: 'sort',
        // 标题内容，元素或字符串
        title: '会议室排序',
        // 图标的CSS
        icon: 'img_opt opt_EditTable',
        // 内容元素
        content: $('div_meetRoom_sort'),
        // 显示位置，相当与z-index
        position: 11,
        // 是否允许拖动
        drag: true    
    });
	$('newMetRoomLayer').hide();
	$('newMetRoomLayer').setStyle({
		zIndex: 14
	});
	$('metRoomTip').hide();
	$('metRoomTip').setStyle({
		width:'200px'
	});
	$('metRoomTip').down().setStyle({
		width:'200px'
	});
	
	if (-[1, ]) {
		$('metRoomInfoListForm')['imagefromx'].observe('input', posChange);
		$('metRoomInfoListForm')['imagefromy'].observe('input', posChange);
		$('metRoomInfoListForm')['imagetox'].observe('input', posChange);
		$('metRoomInfoListForm')['imagetoy'].observe('input', posChange);
	} else {
		Event.observe($('metRoomInfoListForm')['imagefromx'],'propertychange', posChange);
		Event.observe($('metRoomInfoListForm')['imagefromy'],'propertychange', posChange);
		Event.observe($('metRoomInfoListForm')['imagetox'],'propertychange', posChange);
		Event.observe($('metRoomInfoListForm')['imagetoy'],'propertychange', posChange);
	}
	$('drawBar').setStyle({
		top: '1px',
		left: '55px'
	});
		
	Element.removeClassName(document.body, 'none');
	$('metId').style.display="none";
	$('sortId').style.display="none";	 
}

/**
 * 加载数据.
 */
function loadData() {
	var url = 'yc0010GetMetRoomInfoLstJson.action';
	var param = addStamp();
	new Ajax.Request(url, {
		method: 'get',
		parameters: param,
		onSuccess: function(request) {
			var returnText = request.responseText;
			if (checkException(request)) return;
			g_hysData = request.responseText.stripScripts().stripTags().evalJSON();
			initMap();
			initList();
		}
	});
}

/**
 * 初始化地图.
 */
function initMap() {
	$('metRoomTip').hide();
	$('newMetRoomLayer').hide();
	Element.insert(document.body, {bottom:$('metRoomTip')});
	Element.insert(document.body, {bottom:$('newMetRoomLayer')});
	$('metRoomMap').update();
	$('metRoomMap').insert({bottom:$('metRoomTip')});
	$('metRoomMap').insert({bottom:$('newMetRoomLayer')});

	for (var i = 0, len = g_hysData.length; i < len; i++) {	
		if 	(g_hysData[i].metState == 1) {
			$('metRoomMap').insert({
				bottom: new Element('div', {
					'class': 'mapLayer',
					'id': 'metRoomLayer' + i,
					'index': i
				}).setStyle({
					left: g_hysData[i].imagefromx + 'px',
					top: g_hysData[i].imagefromy + 'px',
					width: (g_hysData[i].imagetox - g_hysData[i].imagefromx > 0 ? g_hysData[i].imagetox - g_hysData[i].imagefromx : 1) + 'px',
					height: (g_hysData[i].imagetoy - g_hysData[i].imagefromy > 0 ? g_hysData[i].imagetoy - g_hysData[i].imagefromy : 1) + 'px',
					lineHeight: (g_hysData[i].imagetoy - g_hysData[i].imagefromy) + 'px'
				}).update(g_hysData[i].metRnm).observe('mouseover', metRoomMouseOver).observe('mouseout', metRoomMouseOut)
		});			
		}

	}
}

/**
 * 初始化列表.
 */
function initList() {
	var tbd = $('metRoomListTable').down();
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
			newLine.observe('mouseover', metRoomMouseOver);
			newLine.observe('mouseout', metRoomMouseOut);
		}
		newLine.show();
		newLine.writeAttribute({
			'id': 'hysList' + i
		});
		newLine.writeAttribute({
			'index': i
		});
		tds = newLine.childElements();
		tds[0].update(g_hysData[i].metId);
		tds[1].title=g_hysData[i].metNm;			
		tds[1].update(StrLeft(g_hysData[i].metNm, 34));
		tds[2].update(g_hysData[i].metRnm);		
		tds[3].update(g_hysData[i].containCnt);
		tds[4].title=g_hysData[i].equipment;		
		tds[4].update(StrLeft(g_hysData[i].equipment, 25) || '&nbsp;');
		tds[5].update(g_hysData[i].netInterface);
		tds[6].update(g_hysData[i].tel || '&nbsp;');
		tds[8].update(g_hysData[i].metState);		
	}
	setTable();
	// 当会议室列表没有数据时，设置排序按钮不可用
	if (g_hysData == null){
		$('sortBtn').disabled = true;
		$('sortBtn').addClassName('disabled');
		$('metInfosCnt').innerHTML = 0;
	}else if (g_hysData.length == 0) {
		$('sortBtn').disabled = true;
		$('sortBtn').addClassName('disabled');
		$('metInfosCnt').innerHTML = 0;
	} else {
		$('sortBtn').disabled = false;
		$('sortBtn').removeClassName('disabled');
		$('metInfosCnt').innerHTML = g_hysData.length;					
	}		
}

/**
 * 设置table显示.
 */
function setTable(){
    listColor('metRoomListTable',300);
    var row = $('metRoomListTable').select('tr');  
    for (var i = 0, len = row.length; i < len; i++) {
        var col;
        col = row[i].select('td');
        col[8].hide();
        if (col[8].innerHTML == '0') {
            row[i].removeClassName('odd').removeClassName('even');
            row[i].addClassName('del');
        }else {
	        row[i].removeClassName('del');		
		}		

    }
}

/**
 * 会议室鼠标移上事件.
 * @param {Object} event
 */
function metRoomMouseOver(event) {
	var layer = Event.element(event);
	if (layer.tagName != 'DIV') layer = layer.up('tr');
	var index = layer.readAttribute('index');
	if (g_hysData[index].metState == 1) {
		var pOffset = $('metRoomLayer' + index).positionedOffset();
		var pWidth = $('metRoomLayer' + index).getWidth();
		var rWidth;
		var tip = $('metRoomTip');
		if (g_lastIndex == index) {
			window.clearTimeout($('metRoomLayer' + g_lastIndex).delay);
			g_lastIndex = null;
		}
		window.clearTimeout($('metRoomTip').delay);
		$('metRoomLayer' + index).addClassName('mapLayerHover');
		$('hysList' + index).addClassName('hysListHover');	
		setToolTip(index);
		pWidth = pOffset.left + pWidth + 2;
		rWidth = tip.getWidth();
		if (pWidth + rWidth >= 921) {
			pWidth = pOffset.left - rWidth - 2;
		}
		tip.setStyle({
			top: (pOffset.top) + 'px',
			left: pWidth + 'px'
		});
		//tip不再显示
		//if (layer.tagName != 'DIV')		tip.show();	
	
	}	

}

/**
 * 会议室鼠标移出事件.
 * @param {Object} event
 */
function metRoomMouseOut(event) {
	var layer = Event.element(event);
	if (layer.tagName != 'DIV') layer = layer.up('tr');
		var index = layer.readAttribute('index');
		if (g_hysData[index].metState == 1) {	
		if ($('metRoomLayer' + index)) {
			g_lastIndex = index;
			$('metRoomTip').delay = Element.hide.delay(0.05, $('metRoomTip'));
			$('metRoomLayer' + index).delay = Element.removeClassName.delay(0.05, $('metRoomLayer' + index), 'mapLayerHover');
			$('hysList' + index).delay = Element.removeClassName.delay(0.05, $('hysList' + index), 'hysListHover');
		}
	}	
}

/**
 * 设置悬浮窗内容.
 * @param {Object} index 会议室索引.
 */
function setToolTip(index) {
	$('tipMetRnm').update(g_hysData[index].metRnm);
	$('tipContainCnt').update(g_hysData[index].containCnt);
	$('tipEquipment').update(StrLeft(g_hysData[index].equipment, 20) || '&nbsp;');
	$('tipNetInterface').update(g_hysData[index].netInterface ||'无');
	$('tipTel').update(g_hysData[index].tel || '无');
}

/**
 * 新建会议室事件.
 */
function createMetRoom() {
	//新建
	g_flag = 1;
	$('metRoomInfoListForm').reset();
	$('metRoomInfoListForm')['metId'].enable();	
	$('metRoomInfoListForm')['sortId'].enable();	
	$('metRoomInfoListForm')['metState'].checked = true;		
	$('metRoomListTitle').update('会议室信息  新建');
	g_hysInfo.Popup();
	$('metRoomInfoListForm')['metNm'].focus();
}

/**
 * 排序会议室事件.
 */
function sortMetRoomInfoList() {
    // 弹出的位置，top left 
    g_box_sort.Popup(150, 400);
    
    var url = 'yc0010GetMetRoomInfoSort.action';
    var pars = addStamp(pars);
    
    new Ajax.Request(url, {
        method: 'get',
        parameters: pars,
        onSuccess: function(request){
			if (checkException(request)) return;
			// 更新容器
			$('div_meetRoom_sort').update(request.responseText);		
        }		
    });
}

/**
 * 区分上移.
 */
function moveUp(){
    var selectObj = $('metRoomSort');
    var theObjOptions = selectObj.options;
    for (var i = 1; i < theObjOptions.length; i++) {
        if (theObjOptions[i].selected && !theObjOptions[i - 1].selected) {
            swapOptionProperties(theObjOptions[i], theObjOptions[i - 1]);
        }
    }
}

/**
 * 区分下移.
 */
function moveDown(){
    var selectObj = $('metRoomSort');
    var theObjOptions = selectObj.options;
    for (var i = theObjOptions.length - 2; i > -1; i--) {
        if (theObjOptions[i].selected && !theObjOptions[i + 1].selected) {
            swapOptionProperties(theObjOptions[i], theObjOptions[i + 1]);
        }
    }
}

/**
 * 排序交换.
 */
function swapOptionProperties(option1, option2){
    var tempStr = option1.value;
    option1.value = option2.value;
    option2.value = tempStr;
    tempStr = option1.text;
    option1.text = option2.text;
    option2.text = tempStr;
    tempStr = option1.selected;
    option1.selected = option2.selected;
    option2.selected = tempStr;
}

/**
 * 提交会议室排序.
 */
function submitMetRoomSort(){
    var selectObj = $('metRoomSort');
    var theObjOptions = selectObj.options;
    var metRoomSort = '';
    for (var i = 0; i < theObjOptions.length; i++) {
        metRoomSort = metRoomSort + ',' + theObjOptions[i].value;
    }
    
    // 页面提交
	MsgBox.confirm(getMessage('js.com.info.0004'), '确认', function(){        
     var url = 'yc0010UpdMetRoomInfoSort.action';
     var pars = 'metRoomSort=' + metRoomSort;
     new Ajax.Request(url, {
         method: 'post',
         parameters: pars,
         onSuccess: function(request) {
			var returnText = request.responseText;
			if (checkException(request)) return;		
                g_box_sort.close();
				showOpTip(getMessage('js.com.info.0017'));			
				loadData();
            }		
    });
	
	}, nullFunc, '是', '否');
}


/**
 * 修改会议室事件.
 * @param {Object} obj
 */
function modifyMetRoom(obj) {
	//更新
	g_flag = 2;
	var i = obj.up('tr').readAttribute('index');
	$('metRoomInfoListForm')['metId'].value = g_hysData[i].metId;
	$('metRoomInfoListForm')['sortId'].value = g_hysData[i].sortId;
	$('metRoomInfoListForm')['metNm'].value = g_hysData[i].metNm;
	$('metRoomInfoListForm')['metRnm'].value = g_hysData[i].metRnm;	
	$('metRoomInfoListForm')['containCnt'].value = g_hysData[i].containCnt;
	$('metRoomInfoListForm')['equipment'].value = g_hysData[i].equipment;
	$('metRoomInfoListForm')['netInterface'].value = g_hysData[i].netInterface;
	$('metRoomInfoListForm')['tel'].value = g_hysData[i].tel;
	$('metRoomInfoListForm')['imagefromx'].value = g_hysData[i].imagefromx;
	$('metRoomInfoListForm')['imagefromy'].value = g_hysData[i].imagefromy;
	$('metRoomInfoListForm')['imagetox'].value = g_hysData[i].imagetox;
	$('metRoomInfoListForm')['imagetoy'].value = g_hysData[i].imagetoy;
	$('metRoomInfoListForm')['metState'].checked = g_hysData[i].metState == 1;
	clearError($('metRoomInfoListForm'));
	redrawNewLayer();
	$('metRoomListTitle').update('会议室信息  修改');
	g_hysInfo.Popup();
	$('metRoomInfoListForm')['metNm'].focus();
}

/**
 * 提交会议室.
 */
function submitMetRoom() {
	// 输入校验
    if (!checkForm ($('metRoomInfoListForm'))) {
        return;
    }
	if (!validate()) return;
	var url;
	var mesg;
	if (g_flag == 1) {
		url = 'yc0010InsertMetRoom.action'
		mesg = getMessage('js.com.info.0002');
	} else if (g_flag == 2) {
		url = 'yc0010UpdateMetRoom.action';
		mesg = getMessage('js.com.info.0003');
	}
	$('newMetRoomLayer').hide();
	MsgBox.confirm(mesg, '确认', function() {
	new Ajax.Request(url, {
		parameters: $('metRoomInfoListForm').serialize(),
		method: 'post',
		onSuccess: function(response) {
			if (checkException(response)) {
                return;
            }
			showOpTip(getMessage('js.met.info.0004'));
			loadData();
			g_hysInfo.Close(0);
			$('newMetRoomLayer').hide();
		}
	});
	},nullFunc, '是', '否');	

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
	if ($F($('metRoomInfoListForm')['imagefromx']).blank() ||
	$F($('metRoomInfoListForm')['imagefromy']).blank() ||
	$F($('metRoomInfoListForm')['imagetox']).blank() ||
	$F($('metRoomInfoListForm')['imagetoy']).blank() ||
	$F($('metRoomInfoListForm')['imagetoy']) - 0 <= $F($('metRoomInfoListForm')['imagefromy']) - 0 ||
	$F($('metRoomInfoListForm')['imagetox']) - 0 <= $F($('metRoomInfoListForm')['imagefromx']) - 0) {
		$('newMetRoomLayer').hide();
	} else {
		if ($F($('metRoomInfoListForm')['imagetox']) > $('metRoomMap').getWidth()) {
			$('metRoomInfoListForm')['imagetox'].value = $('metRoomMap').getWidth();
		}
		if ($F($('metRoomInfoListForm')['imagetoy']) > $('metRoomMap').getHeight()) {
			$('metRoomInfoListForm')['imagetoy'].value = $('metRoomMap').getHeight();
		}
		if ($F($('metRoomInfoListForm')['imagefromx']) > $('metRoomMap').getWidth()) {
			$('metRoomInfoListForm')['imagefromx'].value = $('metRoomMap').getWidth();
		}
		if ($F($('metRoomInfoListForm')['imagefromy']) > $('metRoomMap').getHeight()) {
			$('metRoomInfoListForm')['imagefromy'].value = $('metRoomMap').getHeight();
		}
		g_posDelay = redrawNewLayer.delay(0.5);
	}
}

/**
 * 绘制编辑中的会议室.
 */
function redrawNewLayer() {
	$('newMetRoomLayer').show();
	$('newMetRoomLayer').setStyle({
		left: ($F($('metRoomInfoListForm')['imagefromx']) - 0) + 'px',
		top: ($F($('metRoomInfoListForm')['imagefromy']) - 0 + 0) + 'px',
		width: ($F($('metRoomInfoListForm')['imagetox']) - $F($('metRoomInfoListForm')['imagefromx']) > 0 ? $F($('metRoomInfoListForm')['imagetox']) - $F($('metRoomInfoListForm')['imagefromx']) : 1) + 'px',
		height: ($F($('metRoomInfoListForm')['imagetoy']) - $F($('metRoomInfoListForm')['imagefromy']) > 0 ? $F($('metRoomInfoListForm')['imagetoy']) - $F($('metRoomInfoListForm')['imagefromy']) : 1) + 'px',
		lineHeight: ($F($('metRoomInfoListForm')['imagetoy']) - $F($('metRoomInfoListForm')['imagefromy']) > 0 ? $F($('metRoomInfoListForm')['imagetoy']) - $F($('metRoomInfoListForm')['imagefromy']) : 1) + 'px'
	}).update($F($('metRoomInfoListForm')['metRnm']));
}

function drawLayer() {
	if (document.body.setCapture) $('metRoomMap').setCapture();
	document.body.onselectstart = function() {
		return false;
	}
	Element.addClassName(document.body, 'mus');
	document.body.setStyle({
		cursor: 'crosshair'
	});
	Event.observe(document, 'mousedown', startDraw);
	$('newMetRoomLayer').hide();
	g_hysInfo.box.hide();
}

function startDraw(event) {
	var mapOffset = $('metRoomMap').cumulativeOffset();
	$('metRoomMap').oTop = mapOffset.top;
	$('metRoomMap').oLeft = mapOffset.left;
	if (Event.pointerX(event) - $('metRoomMap').oLeft < 0 || Event.pointerY(event) - $('metRoomMap').oTop < 0) {
		return;
	}
	if (Event.pointerX(event) - $('metRoomMap').oLeft > $('metRoomMap').getWidth() || Event.pointerY(event) - $('metRoomMap').oTop > $('metRoomMap').getHeight()) {
		return;
	}
	$('metRoomInfoListForm')['imagefromx'].value = Event.pointerX(event) - $('metRoomMap').oLeft;
	$('metRoomInfoListForm')['imagefromy'].value = Event.pointerY(event) - $('metRoomMap').oTop;
	$('newMetRoomLayer').update();
	Event.observe(document, 'mousemove', drawing);
	Event.observe(document, 'mouseup', endDraw);
}

function drawing(event) {
	if (Event.pointerX(event) - $('metRoomMap').oLeft - $F($('metRoomInfoListForm')['imagefromx']) <= 0 || Event.pointerY(event) - $('metRoomMap').oTop - $F($('metRoomInfoListForm')['imagefromy']) <= 0) {
		return;
	}
	if (Event.pointerX(event) - $('metRoomMap').oLeft > $('metRoomMap').getWidth()) {
		$('metRoomInfoListForm')['imagetox'].value = $('metRoomMap').getWidth();
	} else {
		$('metRoomInfoListForm')['imagetox'].value = Event.pointerX(event) - $('metRoomMap').oLeft;
	}
	if (Event.pointerY(event) - $('metRoomMap').oTop > $('metRoomMap').getHeight()) {
		$('metRoomInfoListForm')['imagetoy'].value = $('metRoomMap').getHeight();
	} else {
		$('metRoomInfoListForm')['imagetoy'].value = Event.pointerY(event) - $('metRoomMap').oTop;
	}
	if (!-[1, ]) {
		Event.stopObserving(document, 'mousemove', drawing);
		Event.observe.delay(0.03, document, 'mousemove', drawing);
	}
	redrawNewLayer();
}

function endDraw(event) {
	Event.stopObserving(document, 'mousedown', startDraw);
	Event.stopObserving(document, 'mousemove', drawing);
	Event.stopObserving(document, 'mouseup', endDraw);
	if (document.body.releaseCapture) $('metRoomMap').releaseCapture();
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
	if (!compareValidate('imagefromx', 'imagetox', '会议室标签起点X坐标', '会议室标签终点X坐标')) return false;
	if (!compareValidate('imagefromy', 'imagetoy', '会议室标签起点Y坐标', '会议室标签终点Y坐标')) return false;
	return true;
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
	form = $('metRoomInfoListForm');
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
