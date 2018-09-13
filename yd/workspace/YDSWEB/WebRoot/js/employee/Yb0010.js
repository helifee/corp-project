/*
 * @(#)Yb0010.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 人员管理
 */
/**
 * @fileoverview 人员管理画面JavaScript.
 *
 * @author fangjiayuan
 * @version 1.0
 */
/**
 * 画面初期化.
 */
var firstPopFlag=0;
function initForm() {

	// 在高度达到指定值时出现滚动条
	listColor('table_peoList', 450);
	
	// 弹出高级查询参数设定
	g_box = new PopupBox({
		// 唯一标志
		key: 3,
		// 标题内容，元素或字符串
		title: '高级查询',
		// 图标的CSS
		icon: 'org_info',
		// 内容元素
		content: $('div_peo_empAdvSearch'),
		// 显示位置，相当与z-index
		position: 1,
		// 是否允许拖动
		drag: true
	
	});
	
	// table排序
	new SortTable('table_peoListHead', 'table_peoList');
	
	myPopbox03 = new PopupBox({
		// 唯一标志，相同页面中不可重复
		key: 'my03',
		
		// 标题内容，可用元素或字符串
		title: '员工职位设定',
		
		// 图标的CSS
		icon: 'img_opt opt_Relation',
		
		// 内容元素
		content: $('myPopContent03'),
		
		// 显示位置，相当与z-index
		position: 3,
		
		// 是否允许拖动
		drag: true,
		
		// 是否需要加载动画
		loader: true
		
	});
	
}

/**
 * 查询按钮事件.
 */
function searchEmpInfo() {

	// 输入校验
	if (!checkForm('empInfoForm')) {
		return;
	}
	
	//加载动画
	showLoader();
	
	var url = 'yb0010FindEmpLst.action';
	var pars = $('empInfoForm').serialize();
	pars = addStamp(pars);
	new Ajax.Updater('div_peo_empInfoList', url, {
		method: 'get',
		parameters: pars,
		onComplete: function(response) {
			hideLoader();
			if (checkException(response)) {
				return;
			}
			
			new SortTable('table_peoListHead', 'table_peoList');
			
			// 在高度达到指定值时出现滚动条
			listColor('table_peoList', 450);
		}
	});
}

/**
 * 弹出高级查询.
 */
function pop() {

	//不是第一次弹出则不需要调用Ajax
	if (firstPopFlag == 1) {
		g_box.Popup(60,200);
		return;
	}
	
	// 设定树的属性
	var treeProperties = {
		'openAtLoad': false
	}
	var treePropertiesDept = {
		'openAtLoad': false
	}
	
	//加载动画
	showLoader();
	
	var url = 'yb0011AdvSearchInit.action';
	var pars = '';
	new Ajax.Updater('div_peo_empAdvSearch', url, {
		method: 'get',
		evalScripts: true,
		parameters: pars,
		onComplete: function(response) {
			hideLoader();
			if (checkException(response)) {
				return;
			}
			
			initValidation('advEmpInfoForm');
			
			// 弹出的位置，top left 
			g_box.Popup(60,200);
			// 页面加载时创建树
			createTree('myTreeDept', '../common/deptTreeList.action', 'deptTreeList', treePropertiesDept, false, true);
			createTree('myTree', '../common/positionTree.action', 'positionTree', treeProperties, false, true);
						
			addCustomCheck($('startYearTo'), '开始日期必须小于或等于结束日期！', 'startYearCheck', function(value) {
				// 开始日期与结束日期输入校验
				startDate = $('startYearFrom').value;
				endDate = $('startYearTo').value;
				if (startDate != '' && endDate != '') {
					if (startDate > endDate) {
						return false;
					} else {
						return true;
					}
				} else {
					return true;
				}
			});
		}
	});
	
}

/**
 * 员工登记.
 */
function empRegist() {

	// 迁移到员工登记画面
	location.href = 'yb0010ToYb0020RegInit.action?fromId=01&mode=1' + '&' + $('empInfoForm').serialize();
	
}

/**

 * 员工状态设定.

 * @param {String} empId		员工编号.

 * @param {String} empCnm		员工姓名.

 * @param {String} updateTime	DB内更新时间.

 */

//function yb0010ToYb0030Mod(empId, empCnm, updateTime){
//
//    // 迁移到员工状态设定画面
//    location.href = 'yb0010ToYb0030Mod.action?fromId=01&modeFlg=2' + '&empId=' + empId + '&empCnm=' + empCnm + '&updateTime=' + updateTime + '&' + $('empInfoForm').serialize();
//}

function popInnerPage(obj){
	
	var rowNum=$(obj).up('tr').rowIndex;
    $('myInnerPage').src = 'yb0040Init.action?' + 'empId='+$('table_peoList').down().childElements()[rowNum].childElements()[0].innerHTML+'&empName='+encodeURI($('table_peoList').down().childElements()[rowNum].childElements()[1].innerHTML);
    myPopbox03.popup();
}

function myInnerPageLoaded(){
    myPopbox03.loaded();
}

function myInnerPageClose(){
    
	myPopbox03.close();

	var url = 'yb0010FindEmpLst.action';
	var pars = $('empInfoForm').serialize();
	pars = addStamp(pars);
	new Ajax.Updater('div_peo_empInfoList', url, {
		method: 'get',
		parameters: pars,
		onComplete: function(response) {
			hideLoader();
			if (checkException(response)) {
				return;
			}
			
			new SortTable('table_peoListHead', 'table_peoList');
			
			// 在高度达到指定值时出现滚动条
			listColor('table_peoList', 450);
		}
	});
}
