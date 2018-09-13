/*
 * @(#)Yd0030.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 社内团购系统
 */
/**
 * @fileoverview 发布订单JavaScript.
 *
 * @author 远东)lincheng
 * @version 1.0 2010/10/22
 */



/**
 * 点中的商品价格连接.
 */
var g_goodElement;

/**
 * 画面初期化.
 */
function initForm() {

    g_myPopbox = new PopupBox({
	    // 唯一标志
	    key: 1,
	    // 标题内容，元素或字符串
	    title: '商品价格-修改',
	    // 图标的CSS
	    icon: 'img_opt opt_EditTable',
	    // 内容元素
	    content: $('editePrice'),
	    // 显示位置，相当与z-index
	    position: 10,
	    // 是否允许拖动
	    drag: true
	    //加载动画
	    //loader: true
    });

	bussFlag();
}

/**
 * 弹出修改价格.
 * @param {Object} objThis
 */
function setMoney(objThis) {
	initValidation('dealForm2');
	$('exchange').value = objThis.innerHTML;
	g_goodElement = objThis;
	g_myPopbox.popup();
	$('exchange').activate();
}

/**
 * 修改商品价格
 * @param {Object} objThis
 */
function setMoneyDo() {
	if (checkForm($('dealForm2'))) {
		var targ = g_goodElement;
		if ($(targ).innerHTML != $('exchange').value) {
			$(targ).innerHTML = $('exchange').value;
			$(targ).previous(0).value= $('exchange').value;
			$(targ).setStyle({backgroundColor:'#FF0'});
		}
		g_myPopbox.close();
	}
}

/**
 * 设置个人业务与自行结算绑定
 */
function bussFlag() {
	if($('dealForm_orderInfo_bussFlag2') != null && $('dealForm_orderInfo_bussFlag2').checked) {
		$('dealForm_orderInfo_payFlag1').disabled = 'disabled';
		$('dealForm_orderInfo_payFlag2').checked = 'checked';
	}
	if($('dealForm_orderInfo_bussFlag1') != null && $('dealForm_orderInfo_bussFlag1').checked) {
		$('dealForm_orderInfo_payFlag1').disabled = false;
		$('dealForm_orderInfo_payFlag1').checked = 'checked';
	}
}
/**
 * 判断是否选择了商品
 */
function checkGoods() {
	if (checkForm('dealForm')) {
		var ckbox = $('goodsList').select('input[type="checkbox"]');
		var isCheck = false;
		for (i = 0; i < ckbox.size(); i++) {
			if (ckbox[i].checked) {
				isCheck = true;
			}
		}
		if (isCheck) {
			MsgBox.confirm(getMessage('js.gps.info.0033'), '确认对话框', function(){
				$('dealForm').submit();
			}, function(){
			// do nothing
			}, 'Yes', 'No');
			
		}
		else {
			MsgBox.message(getMessage('js.gps.error.0006'));
			return false;
		}
	}

}
/**
 * 改变商品分类，请求对应商品
 * @param {Object} objValue
 */
function chooseCate() {
	reqCate.delay(0.5); 
	$('goodsCateId').value = $F('goodsCate');
}
function reqCate() {
	var url = 'gps/yd0030getGoods.action';
	var params = 'goodsCateId=' + $F('goodsCate');
	new Ajax.Updater('goodsList', url, { 
		method: 'get',
		parameters: addStamp(params), 
		asynchronous: true
	}); 
}


/**
 * 转到商品管理画面
 */
function gotoGoodsM() {
	
	$('dealForm').action = 'yd0030To0040';
	$('dealForm').submit();
}
