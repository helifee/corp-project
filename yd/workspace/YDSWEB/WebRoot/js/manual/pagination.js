/*
 * @(#)Pagination.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 开发手册
 */
/**
 * @fileoverview 分页示例JavaScript.
 *
 * @author 远东)xupai
 * @version 1.0 2010/08/04
 */
/**
 * 画面初期化.
 */
function searchPageInfo() {
	//加载动画
	showLoader();

	var url = 'manualFindPageLst.action';
	var pars = $('paginationForm').serialize();
	//把检索条件所在的form串行化后，设到隐藏控件oldParam中，
	//然后使用oldParam的值，进行检索。（点击下一页的时候也是用这个隐藏控件的值）
	$('oldParam').value = pars;
	pars = 'pageNumber=0&'+pars;
	pars = addStamp(pars);
	new Ajax.Updater('div_manual_pagelist', url, {
		method: 'get',
		parameters: pars,
		onComplete: function(response) {
			hideLoader();
			if (checkException(response)) {
				return;
			}
			// 在高度达到指定值时出现滚动条
			listColor('table_peoList', 200);
		}
	});
}

//点击 第几页时调用的提交函数。
function pagerCommonTag(pageUrl , pageNumber){
	
	//调用自己的具体实现 函数 ，该函数中必须至少包含pageUrl , pageNumber两个参数
	myOwnPagerSubmit(pageUrl , pageNumber);
}

//实现自己的分页提交。
function myOwnPagerSubmit(pageUrl , pageNumber){
	
	//从隐藏控件中取出上次使用的检索条件
	var pars = $('oldParam').value;
	//设定url以及其余参数
	var url = pageUrl +'&pageNumber=' + pageNumber + '&' +pars;
	new Ajax.Updater('div_manual_pagelist', url , {    
		   onLoading : function() {},
		   onSuccess : function(response) {},
		   onComplete : function(response) {
			   var flg = checkException(response);
			    if(!flg) {		    	
					listColor('table_peoList', 200);
			    }
		   }
	   });		
}
