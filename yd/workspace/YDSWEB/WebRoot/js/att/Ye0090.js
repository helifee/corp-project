/*
 * @(#)Ye0090.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 考勤系统
 */
/**
 * @fileoverview 考勤月报JavaScript.
 *
 * @author 远东)zhangdaoqiang
 * @version 1.0 2011/01/07
 */

function init() {
	$('div_kaoqinbuwanzheng').hide();
	$('div_kaoqin').show();
	$('div_jiaban').hide();
}

function lostClick() {
	$('div_kaoqinbuwanzheng').show();
	$('div_kaoqin').hide();
	$('div_jiaban').hide();
	
	var url = 'ye0090getAttInfoUncor.action';
	if($('yearmonth').value == '') {
		alert("请输入查询年月");
		$('yearmonth').focus();
		return;
	}
	var pars = 'yearMonth=' + $('yearmonth').value; 
	pars = addStamp(pars);
	new Ajax.Updater('div_kaoqinbuwanzheng', url, {
		method: 'get',
		parameters: pars,
		onComplete: function(response) {
			if (checkException(response)) {
				return;
			}
			
			new SortTable('table_peoListHead', 'table_peoList');
			
			// 在高度达到指定值时出现滚动条
			listColor('table_peoList', 450);
		}
	});
}

function kaoqinClick() {
	$('div_kaoqinbuwanzheng').hide();
	$('div_kaoqin').show();
	$('div_jiaban').hide();
	
	var url = 'ye0090getKQReport.action';
	if($('yearmonth').value == '') {
		alert("请输入查询年月");
		$('yearmonth').focus();
		return;
	}
	var pars = 'yearMonth=' + $('yearmonth').value; 
	pars = addStamp(pars);
	new Ajax.Updater('div_kaoqin', url, {
		method: 'get',
		parameters: pars,
		onComplete: function(response) {
			//hideLoader();
			if (checkException(response)) {
				return;
			}
			
			new SortTable('table_peoListHead', 'table_peoList');
			
			// 在高度达到指定值时出现滚动条
			listColor('table_peoList', 450);
		}
	});
}

function jiabanClick() {
	$('div_kaoqinbuwanzheng').hide();
	$('div_kaoqin').hide();
	$('div_jiaban').show();

	var url = 'ye0090getOTReport.action';
	if($('yearmonth').value == '') {
		alert("请输入查询年月");
		$('yearmonth').focus();
		return;
	}
	var pars = 'yearMonth=' + $('yearmonth').value; 
	pars = addStamp(pars);
	new Ajax.Updater('div_jiaban', url, {
		method: 'get',
		parameters: pars,
		onComplete: function(response) {
			if (checkException(response)) {
				return;
			}
			
			new SortTable('table_peoListHead', 'table_peoList');
			
			// 在高度达到指定值时出现滚动条
			listColor('table_peoList', 450);
		}
	});
}
