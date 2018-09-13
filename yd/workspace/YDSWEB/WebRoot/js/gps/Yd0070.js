/*
 * @(#)Yd0070.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 社内团购
 */
/**
 * @fileoverview 订购详细画面JavaScript.
 *
 * @author gaoweiwei
 * @version 1.0
 */

// 临时项目
var indexNm;

/**
 * 初始化.
 */
function initForm() {

	// 计算已购入合计金额.
	sumCompute();
	
	// 在高度达到指定值时出现滚动条、隔行变色等
	listColor('table_detailNowList', 68);
	listColor('table_detailAllList', 340);
	
	// 取得订单商品一览表格中的所有行
	var rowAll = $('table_detailAllList').down().childElements();
	var length = rowAll.length;
	// 订单商品一览总额设定
	for(var index = 0; index < length; index++){
    	$("totalPrice"+index).innerHTML = convertMoney($F("buyCnt"+index) * $F("gpsPriceTmp"+index));
	}
	
	// 替换/追加pop画面
	g_box = new PopupBox({
		// *唯一标志，相同页面中不可重复
		key: 'my01',
		// *标题内容，可用元素或字符串
		title: '替换/追加',
		// *图标的CSS
		icon: '',
		// *内容元素
		content: $('div_repApp_pop'),
		// *显示位置，相当与z-index
		position: 3,
		// 是否允许拖动
		drag: true
	});
	
	// 订购确认pop画面
	w_box = new PopupBox({
		// *唯一标志，相同页面中不可重复
		key: 'my02',
		// *标题内容，可用元素或字符串
		title: '订购确认',
		// *图标的CSS
		icon: '',
		// *内容元素
		content: $('div_buy_pop'),
		// *显示位置，相当与z-index
		position: 3,
		// 是否允许拖动
		drag: true
	});
	
	// 订单商品一览排序
	new SortTable('table_detailAllListHead', 'table_detailAllList');
	
	if ($F('orderStatus') == '0') {
		var inputs = $('div_detail_main').select('input');
		for (i=0; i < inputs.size(); i++) {
			inputs[i].disable();
		}
	}
}
/**
 * 计算已购入合计金额.
 */
function sumCompute(){
	// 计算已购买的合计金额
    var sum  = 0;
	if($('table_detailNowList').select('tr') == undefined) return;
	var len = $('table_detailNowList').select('tr').length
    for(var i=0; i<len; i++){
		sum = sum + parseFloat($F('buyTotalPrice'+i));
    }
    $('buySum').innerHTML = convertMoney(sum);
	
}

/**
 * 删除操作.
 * @param {String} orderId		订单ID.
 * @param {String} customerId	订购者ID.
 * @param {String} goodsId		商品ID.
 */
function del(orderId, customerId, goodsId){
	
    MsgBox.confirm('　　　' + getMessage('js.com.info.0006') + '　　　　', '确认对话框', function(){
		// 删除操作
    	location.href = 'yd0070Del.action?orderId=' + orderId + '&customerId=' + customerId + '&goodsId=' + goodsId + '&fromId=' + $F('fromId');
    }, function(){
        // 取消时回调
     	return;
    }, '是', '否');
}

/**
 * 购买操作.
 * @param {int} index	表格行号.
 */
function buy(index){

    //输入校验
    if (!checkInput("buyCnt"+index)) {
        return;
    }

	if($F("buyCnt"+index) < 1){
		
		MsgBox.message(getMessage('js.com.warning.0009','订购份数','1份'));
		return;
	}
	
	// 取得已订购商品一览表格中的所有行
	var rowNow = $('table_detailNowList').down().childElements();
	
	// 取得订购的行数
	indexNm = index;
	
	// 已订购过商品
	if(rowNow.length){
		
		// 弹出替换/追加层
		g_box.popup();
	// 还未订购商品
	}else{
		
		// 弹出订购确认层
		w_box.popup();
		$('goodsName').innerHTML = $F("buyCnt"+index) + "份" + $F("goodsNameTmp"+index);
		$('totalPrice').innerHTML = $("totalPrice"+index).innerHTML + "元";
	}
}

/**
 * 替换/追加层关闭（点击确定）
 */
function popOkClose() {
	if (checkInput("buyCnt" + indexNm)) {
		if ($('radioCheck1').checked) {
		
			// 替换选项
			location.href = 'yd0070Rep.action?goodsId=' + $F("goodsIdTmp" + indexNm) + '&orderId=' + $F("orderIdTmp" + indexNm) + '&buyCntM=' + $F("buyCnt" + indexNm) + '&gpsPrice=' + $F("gpsPriceTmp" + indexNm) + '&fromId=' + $F('fromId');
		}
		else {
			// 追加选项
			location.href = 'yd0070Add.action?goodsId=' + $F("goodsIdTmp" + indexNm) + '&orderId=' + $F("orderIdTmp" + indexNm) + '&buyCntM=' + $F("buyCnt" + indexNm) + '&gpsPrice=' + $F("gpsPriceTmp" + indexNm) + '&fromId=' + $F('fromId');
		}
	}
	
	g_box.close();
}

/**
 * 替换/追加层关闭（点击取消）
 */
function popCancelClose() {
	g_box.close(0);
}

/**
 * 商品一览总额取得
 * @param {int} index	表格行号.
 */
function changeTotalPrice(index) {
	
    //输入校验
	addRegexCheck($("buyCnt"+index), getMessage('js.com.warning.0002','订购数量'), '^[0-9]+$');
	
	if(checkInput("buyCnt"+index)){
		$("totalPrice"+index).innerHTML = convertMoney($F("buyCnt"+index) * $F("gpsPriceTmp"+index));
	} else {
		return;
	}
}

/**
 * 订购确认层关闭（点击确定）
 */
function popBuyOkClose() {
	// 购买商品
	if (checkInput("buyCnt" + indexNm)) {
		location.href = 'yd0070Add.action?goodsId=' + $F("goodsIdTmp" + indexNm) + '&orderId=' + $F("orderIdTmp" + indexNm) + '&buyCntM=' + $F("buyCnt" + indexNm) + '&gpsPrice=' + $F("gpsPriceTmp" + indexNm) + '&fromId=' + $F('fromId');
	}
	w_box.close();
}

/**
 * 订购确认层关闭（点击取消）
 */
function popBuyCancelClose() {
	w_box.close(0);
}

/**
 * 商品信息提示
 */

function mousePos(e) {
    
    return {"x":e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,
	"y":e.clientY+document.body.scrollTop+document.documentElement.scrollTop};
}
function showTip(event, obj, goodsId) {
    var t = $('goodsTip');
	var e = window.event || event;
	var mouse = mousePos(e);
	obj.delay = function() {
		obj.delay = null;
		//设定参数
		var pars = addStamp('goodsId=' + goodsId);
		new Ajax.Updater('goodsTip', 'yd0070GetGoodsInfo.action', {
			method: 'get',
	        parameters: pars,
		   	onComplete : function(response) {
			   var flg = checkException(response);
			    if(!flg) {
					t.setStyle({left : mouse.x + 10 + 'px',top : mouse.y - t.getHeight() -10 + 'px'});
					if (mouse.y - t.getHeight() <= 0) {
						t.setStyle({top : '2px'});
					}
					t.removeClassName('none');
			    }
		   }
	  	 });
	}.delay(0.5);
}
function msout(xx) {
	if (xx.delay) {
		window.clearTimeout(xx.delay);
		xx.delay=null;
	}
	$('goodsTip').addClassName('none');
}
