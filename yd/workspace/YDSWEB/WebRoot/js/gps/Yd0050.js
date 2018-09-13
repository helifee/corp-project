/*
 * @(#)Yd0050.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 社内团购系统
 */
/**
 * @fileoverview 订单一览JavaScript.
 *
 * @author 远东)lincheng
 * @version 1.0 2010/11/05
 */
/**
 * 画面初期化.
 */
function initForm() {
	listColor('table_peoList');
}

function searchOrder() {
	//设定url以及其余参数
	var url = 'yd0050GetOrderList';
	var pars = addStamp('yd0050CondA.orderContent=' + $F('orderContent') + '&yd0050CondA.createTime=' + $F('sTime') + '&yd0050CondA.createTime2=' + $F('eTime') + '&myOrder=' + $F('myOrder'));
	new Ajax.Updater('table_peo', url, {
		method: 'get',
        parameters: pars,
	   	onComplete : function(response) {
		   var flg = checkException(response);
		    if(!flg) {		    	
				listColor('table_peoList');
				$('orderContentH').value = $F('orderContent');
				$('sTimeH').value = $F('sTime');
				$('eTimeH').value = $F('eTime');
		    }
	   }
   });	
}
/**
 * 分页提交
 * @param {Object} pageUrl
 * @param {Object} pageNumber
 */
function pagerCommonTag(pageUrl, pageNumber){
	
	//设定url以及其余参数
	var url = pageUrl;
	var pars = addStamp('yd0050CondA.orderContent=' + $F('orderContentH') + '&yd0050CondA.createTime=' + $F('sTimeH') + '&yd0050CondA.createTime2=' + $F('eTimeH') + '&pageNumber=' + pageNumber + '&myOrder=' + $F('myOrder'));
	new Ajax.Updater('table_peo', url, {
		method: 'get',
        parameters: pars,
	   	onComplete : function(response) {
		   var flg = checkException(response);
		    if(!flg) {		    	
				listColor('table_peoList');
		    }
	   }
   });		
}

