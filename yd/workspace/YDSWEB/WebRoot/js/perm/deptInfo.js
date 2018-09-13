/*
 * @(#)deptInfo.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 权限管理
 */
/**
 * @fileoverview 部门管理画面JavaScript.
 *
 * @author renlong
 * @version 1.0
 */
/**
 * 操作状态枚举.0:无 1：新建 2：更改.
 */
var OperateEnum = {
	None: 0,
	Create: 1,
	Modify: 2
};

/**
 * 标题文字枚举.
 */
var TitleEnum = {
	Normal: '部门详细信息',
	Create: '部门详细信息 - 新建',
	Modify: '部门详细信息 - 修改'
};

/**
 * 图标提示文字枚举.
 */
var IconMsgEnum = {
	Show: '展开',
	Hide: '收缩'
};

/**
 * 当前操作状态.
 */
var g_operateFlag = OperateEnum.None;

/**
 * 画面onload.
 */
function initForm() {
	$('deptInfoForm').disable();
	$('div_perm_deptInfoView').hide();
	listColor('table_deptList');
	$('deptModTitle').update(TitleEnum.Normal);
	$('deptIcon').title = IconMsgEnum.Show;
}

/**
 * 新建部门.
 */
function createDeptInfo() {

	// 状态：新建
	g_operateFlag = OperateEnum.Create;
	
	// 部门详细信息改为可编辑
	$('deptInfoForm').enable();
	
	// 部门详细信息清空
	$('deptId').clear();
	$('deptNm').clear();
	$('deptSnm').clear();
	$('leaderId').clear();
	$('parentDeptId').clear();
	$('deptDesc').clear();
	$('leaderNm').update();
	$('parentDeptNm').update();
	
	// 修改标题
	$('deptModTitle').update(TitleEnum.Create);
	
	// 部门详细信息可见
	if (!$('div_perm_deptInfoView').visible()) {
		resize();
	}
	
	$('createBtn').disable();
}

/**
 * 修改部门.
 * @param {String} deptId 部门ID.
 */
function modifyDeptInfo(deptId) {

	// 处于编辑状态时
	if (g_operateFlag != OperateEnum.None) {
		if (confirm(getMessage('js.com.info.0005'))) {
			clearDeptInfo();
		} else {
			return;
		}
	}
	
	// 修改标题
	$('deptModTitle').update(TitleEnum.Modify);
	
	// 重置列表颜色
	listColor('table_deptList');
	
	// 该行变色标记
	selectLine('table_deptList');
	
	// 状态：更改
	g_operateFlag = OperateEnum.Modify;
	
	// 取得部门详细信息
	var url = 'getDeptInfoAction.action';
	var pars = 'deptId=' + encodeURI(deptId);
	pars = addStamp(pars);
	new Ajax.Updater('div_perm_deptInfoView', url, {
		method: 'get',
		parameters: pars,
		onComplete: function(request) {
			if ($F('deptId').empty()) {
				$('deptInfoForm').disable();
				alert(getMessage('js.com.warning.0004', '部门'));
			} else {
			
				$('createBtn').disable();
				
				// 部门详细信息改为可编辑
				$('deptInfoForm').enable();
				
				// 部门ID不可编辑
				$('deptId').disable();
				
				// 部门详细信息可见
				if (!$('div_perm_deptInfoView').visible()) {
					resize();
				}
			}
		},
		onFailure: reportError
	});
}

/**
 * 删除部门.
 * @param {String} deptId 部门ID.
 */
function deleteDeptInfo(deptId) {

	// 处于编辑状态时
	if (g_operateFlag != OperateEnum.None) {
		if (confirm(getMessage('js.com.info.0005'))) {
			clearDeptInfo();
		} else {
			return;
		}
	}
	
	// 获得当前行号
	var rowIndex = Event.element(getEvent()).up('tr', 0).rowIndex;
	// 该行变色标记
	selectLine('table_deptList');
	
	// 提交到 deptInfoDelAction
	if (confirm(getMessage('js.com.info.0001'))) {
		var url = 'delDeptInfoAction.action';
		var pars = 'deptId=' + encodeURI(deptId);
		new Ajax.Request(url, {
			method: 'get',
			parameters: pars,
			onComplete: function(request) {
			
				// 发生错误
				if (request.responseText.empty()) {
					alert(getMessage('js.com.info.0011'));
				} else {
				
					// 删除行
					$('table_deptList').deleteRow(rowIndex);
					
					// 更新计数
					$('deptInfosCnt').update($('deptInfosCnt').innerHTML - 1);
					
					// 重置列表颜色
					listColor('table_deptList');
					
					// 状态：无
					g_operateFlag = OperateEnum.None;
				}
			},
			onFailure: reportError
		});
	} else {
	
		// 重置列表颜色
		listColor('table_deptList');
	}
}

/**
 * 【取消】按钮事件.
 */
function clearDeptInfo() {

	// 部门详细信息清空
	$('deptId').clear();
	$('deptNm').clear();
	$('deptSnm').clear();
	$('leaderId').clear();
	$('parentDeptId').clear();
	$('deptDesc').clear();
	$('leaderNm').update();
	$('parentDeptNm').update();
	
	// 状态：无
	g_operateFlag = OperateEnum.None;
	
	// 部门详细信息改为不可编辑
	$('deptInfoForm').disable();
	
	$('createBtn').enable();
	
	// 重置列表颜色
	listColor('table_deptList');
	
	// 修改标题
	$('deptModTitle').update(TitleEnum.Normal);
}

/**
 * 提交按钮事件.
 */
function submitDeptInfo() {

	// 输入校验
	if (!validate()) {
		return;
	}
	
	// 修改状态下
	if (g_operateFlag == OperateEnum.Modify) {
		submitModify();
		
		// 新建状态下
	} else if (g_operateFlag == OperateEnum.Create) {
		submitCreate();
	}
}

/**
 * 提交新建表单.
 */
function submitCreate() {

	// 页面提交deptInfoAddAction
	if (confirm(getMessage('js.com.info.0002'))) {
		var url = 'addDeptInfoAction.action';
		var pars = $('deptInfoForm').serialize();
		pars = addToken(pars);
		new Ajax.Updater('div_perm_deptInfoList', url, {
			method: 'post',
			parameters: pars,
			onComplete: function(request) {
			
				// 重置列表颜色
				listColor('table_deptList');
				
				if (!$('hideFlg').value.empty()) {
					alert(getMessage('js.com.warning.0005', '部门'));
				} else {
					clearDeptInfo();
				}
			},
			onFailure: reportError
		});
	}
}

/**
 * 提交修改表单.
 */
function submitModify() {

	// 页面提交deptInfoUpdAction
	if (confirm(getMessage('js.com.info.0003'))) {
		var deptId = $F('deptId');
		var url = 'updDeptInfoAction.action';
		
		// 修改状态下deptId被禁用，serialize方法无法取到，需要手动添加
		var pars = 'departmentInfo.deptId=' + $F('deptId') + '&' + $('deptInfoForm').serialize();
		new Ajax.Updater('div_perm_deptInfoList', url, {
			method: 'post',
			parameters: pars,
			onComplete: function(request) {
			
				// 重置列表颜色
				listColor('table_deptList');
				
				if (!$('hideFlg').value.empty()) {
					alert(getMessage('js.com.info.0011'));
				}
				clearDeptInfo();
			},
			onFailure: reportError
		});
	}
}

/**
 * 部门详细信息是否可见.
 */
function resize() {
	$('div_perm_deptInfoView').toggle();
	
	// 更改图标及提示文字
	if ($('deptIcon').hasClassName('opt_FillRight')) {
		$('deptIcon').removeClassName('opt_FillRight').addClassName('opt_FillDown');
		$('deptIcon').title = IconMsgEnum.Show;
	} else {
		$('deptIcon').removeClassName('opt_FillDown').addClassName('opt_FillRight');
		$('deptIcon').title = IconMsgEnum.Hide;
	}
}

/**
 * 取得上级部门名称.
 */
function getDeptName() {
	var url, pars, id;
	id = $F('parentDeptId');
	url = '../common/getDeptNmAction.action';
	pars = 'deptId=' + encodeURI(id);
	pars = addStamp(pars);
	
	// 清除原有名称
	$('parentDeptNm').update();
	
	// 上级部门ID为空时不进行get
	if (id.empty()) {
		return;
	}
	
	// 上级部门ID输入校验
	if (parentDeptIdValidate()) {
		new Ajax.Request(url, {
			method: 'get',
			parameters: pars,
			onComplete: function(request) {
				if (!request.responseText.empty()) {
				
					// 显示服务器的上级部门名称
					$('parentDeptNm').update(request.responseText);
				} else {
					$('parentDeptId').focus();
					alert(getMessage('js.com.info.0012'));
				}
			},
			onFailure: reportError
		});
	}
}

/**
 * 取得部门主管名称.
 */
function getMemberName() {
	var url, pars, id;
	id = $F('leaderId');
	url = '../common/getUserNmAction.action';
	pars = 'userId=' + encodeURI(id);
	pars = addStamp(pars);
	
	// 清除原有名称
	$('leaderNm').update();
	
	// 上级主管ID为空时不进行get
	if (id.empty()) {
		return;
	}
	
	// 部门主管ID输入校验
	if (leaderIdValidate()) {
		new Ajax.Request(url, {
			method: 'get',
			parameters: pars,
			onComplete: function(request) {
				if (!request.responseText.empty()) {
				
					// 显示服务器的部门主管名称 
					$('leaderNm').update(request.responseText);
				} else {
					$('leaderId').focus();
					alert(getMessage('js.com.warning.0004', '用户'));
				}
			},
			onFailure: reportError
		});
	}
}

/**
 * 系统错误处理.
 */
function reportError() {
	alert(getMessage('js.com.error.0001'));
}

/**
 * 输入校验.
 * @return Boolean true:false.
 */
function validate() {

	// 部门ID输入校验
	if (!deptIdValidate()) {
		return false;
	}
	
	// 部门名称输入校验
	if (!deptNmValidate()) {
		return false;
	}
	
	// 部门略称输入校验
	if (!deptSnmValidate()) {
		return false;
	}
	
	// 上级部门ID输入校验
	if (!deptNmValidate()) {
		return false;
	}
	
	// 部门主管ID输入校验
	if (!deptNmValidate()) {
		return false;
	}
	
	return true;
}

/**
 * 部门ID输入校验.
 * @return Boolean true:false.
 */
function deptIdValidate() {

	form = $('deptInfoForm');// 需校验的form
	var continueValidation = true;// 校验状态标记
	if (form.elements['departmentInfo.deptId']) {
		field = form.elements['departmentInfo.deptId'];
		// 非空校验
		if (continueValidation && field.value != null && (field.value.empty() || field.value.replace(/^\s+|\s+$/g, '').length == 0)) {
			alert(getMessage('js.com.warning.0001', '部门ID'));
			continueValidation = false;
		}
		
		// 输入长度校验
		if (continueValidation && field.value != null) {
			var value = field.value;
			// trim field value
			while (value.substring(0, 1) == ' ') 
				value = value.substring(1, value.length);
			while (value.substring(value.length - 1, value.length) == ' ') 
				value = value.substring(0, value.length - 1);
			if ((3 > -1 && value.length < 3) ||
			(3 > -1 && value.length > 3)) {
				alert(getMessage('js.com.warning.0003', '部门ID', '3'));
				continueValidation = false;
			}
		}
		
		// 输入合法化校验
		if (continueValidation && field.value != null && !field.value.match('[a-z0-9A-Z]{3}')) {
			alert(getMessage('js.com.warning.0002', '部门ID'));
			continueValidation = false;
		}
	}
	
	if (continueValidation) {
		return true;
	} else {
		$('deptId').focus();
		return false;
	}
}

/**
 * 部门名称输入校验.
 * @return Boolean true:false.
 */
function deptNmValidate() {

	form = $('deptInfoForm');// 需校验的form
	var continueValidation = true;// 校验状态标记
	// 非空校验
	if (form.elements['departmentInfo.deptNm']) {
		field = form.elements['departmentInfo.deptNm'];
		if (continueValidation && field.value != null && (field.value.empty() || field.value.replace(/^\s+|\s+$/g, '').length == 0)) {
			alert(getMessage('js.com.warning.0001', '部门名称'));
			continueValidation = false;
		}
	}
	
	if (continueValidation) {
		return true;
	} else {
		$('deptNm').focus();
		return false;
	}
}

/**
 * 部门略称输入校验.
 * @return Boolean true:false.
 */
function deptSnmValidate() {

	form = $('deptInfoForm');// 需校验的form
	var continueValidation = true;// 校验状态标记
	// 非空校验
	if (form.elements['departmentInfo.deptSnm']) {
		field = form.elements['departmentInfo.deptSnm'];
		if (continueValidation && field.value != null && (field.value.empty() || field.value.replace(/^\s+|\s+$/g, '').length == 0)) {
			alert(getMessage('js.com.warning.0001', '部门略称'));
			continueValidation = false;
		}
	}
	
	if (continueValidation) {
		return true;
	} else {
		$('deptSnm').focus();
		return false;
	}
}

/**
 * 上级部门ID输入校验.
 * @return Boolean true:false.
 */
function parentDeptIdValidate() {

	form = $('deptInfoForm');// 需校验的form
	var continueValidation = true;// 校验状态标记
	// 输入长度校验
	if (form.elements['departmentInfo.parentDeptId']) {
		field = form.elements['departmentInfo.parentDeptId'];
		if (continueValidation && !field.value.empty()) {
			var value = field.value;
			// trim field value
			while (value.substring(0, 1) == ' ') 
				value = value.substring(1, value.length);
			while (value.substring(value.length - 1, value.length) == ' ') 
				value = value.substring(0, value.length - 1);
			if ((3 > -1 && value.length < 3) ||
			(3 > -1 && value.length > 3)) {
				alert(getMessage('js.com.warning.0003', '上级部门ID', '3'));
				continueValidation = false;
			}
		}
		
		// 合法性校验
		if (continueValidation && !field.value.empty() && !field.value.match('[a-z0-9A-Z]{3}')) {
			alert(getMessage('js.com.warning.0002', '上级部门ID'));
			continueValidation = false;
		}
	}
	if (continueValidation) {
		return true;
	} else {
		$('parentDeptId').focus();
		return false;
	}
}

/**
 * 部门主管ID输入校验.
 * @return Boolean true:false.
 */
function leaderIdValidate() {

	form = $('deptInfoForm');// 需校验的form
	var continueValidation = true;// 校验状态标记
	// 输入长度校验
	if (form.elements['departmentInfo.leaderId']) {
		field = form.elements['departmentInfo.leaderId'];
		if (continueValidation && !field.value.empty()) {
			var value = field.value;
			// trim field value
			while (value.substring(0, 1) == ' ') 
				value = value.substring(1, value.length);
			while (value.substring(value.length - 1, value.length) == ' ') 
				value = value.substring(0, value.length - 1);
			if ((6 > -1 && value.length < 6) ||
			(6 > -1 && value.length > 6)) {
				alert(getMessage('js.com.warning.0003', '部门主管ID', '6'));
				continueValidation = false;
			}
		}
		
		// 合法性校验
		if (continueValidation && !field.value.empty() && !field.value.match('19[8-9][0-9]{3}|20[0-9]{4}|[0]{6}')) {
			alert(getMessage('js.com.warning.0002', '部门主管ID'));
			continueValidation = false;
		}
	}
	if (continueValidation) {
		return true;
	} else {
		$('leaderId').focus();
		return false;
	}
}
