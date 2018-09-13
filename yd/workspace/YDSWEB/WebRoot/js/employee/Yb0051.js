/*
 * @(#)Yb0051.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 员工管理
 */
/**
 * @fileoverview 部门信息画面JavaScript.
 *
 * @author pengchuan
 * @version 1.0
 */
/**
 * 画面模式(mode).
 * 		1：部门信息新规模式
 * 		2:部门信息查看模式
 * 		3：部门信息修改模式
 */

/**
 * 人员类（弹出的员工选择画面取得本页面传递的人员数组用）
 * @param {String} id
 * @param {String} name
 */
function User(id, name) {
	this.id = id;
	this.name = name;
}

/**
 * 初始化.
 */
function init() {
	
	initValidation('mainForm');
	new JsNameFilter('empId', 'orgMngerNm', window['g_basePath']);
	
	// 新规模式
	if (mode == 1) {
		$('modify').hide();
		$('orgMngerNm').enable();
		
		if(!$('firstFlg').value){
			$('orgState').selectedIndex = $('orgState').selectedIndex + 1;
			if(!$('orgState').value){
				MsgBox.message(getMessage('js.emp.warning.0002')); 
				dept_box.close(0);
				loadMap();
			}
			$('firstFlg').value = 'no';			
		}

	}
	
	// 查看模式
	if (mode == 2) {
		$('modify').show();
		$('save').hide();
		$('cancel').hide();
		$('mngerSet').hide();
		$('orgNm').disable();
		$('empId').disable();
		$('orgSnm').disable();
		$('orgState').disable();
		$('orgMngerNm').disable();
		$('orgDesc').disable();
	}
	
	// 修改模式
	if (mode == 3) {
		$('modify').hide();
		$('orgMngerNm').enable();
	}
	
	
}


/**
 * 部门信息修改画面
 *
 */
function modifyOrgInfo() {

	mode = 3;
	$('save').show();
	$('cancel').show();
	$('mngerSet').show();
	$('orgNm').enable();
	$('empId').enable();
	$('orgSnm').enable();
	$('orgState').enable();
	$('orgDesc').enable();
	$('orgMngerNm').enable();
	$('modify').hide();
	
}

/**
 * 提交保存按钮
 */
function saveOrgInfo() {


	//输入校验
	if (!checkForm('mainForm')) {
		return;
	}
	
	//修改模式下提交保存按钮
	if (mode == 3) {
		var url = 'yb0051ModifyInfo.action';
		var pars = $('mainForm').serialize();
		
		MsgBox.confirm(getMessage('js.com.info.0003'), '确认对话框', function(){
	    	new Ajax.Request(url, {
				method: 'post',
				parameters: pars,
				onSuccess: function(response) {
				},
				onComplete: function(request) {
					if (request.responseText.include('err="1"')) {
						$('DeptInfoPage').update(request.responseText);
						init();
					} else {
						dept_box.close(0);
						loadMap();
						showOpTip(getMessage('js.com.info.0009'));
					}
				},
				onFailure: function(request) {
				}
			});
		}, function(){
		}, '是', '否');
		

	}
	
	//新规模式下提交保存按钮
	if (mode == 1) {
		var url = 'yb0051FormMain';
		var pars = $('mainForm').serialize() + '&empOrgInfo2.orgId=' + $F('orgId2');
		MsgBox.confirm(getMessage('js.com.info.0004'), '确认对话框', function(){
		   	new Ajax.Request(url, {
				method: 'post',
				parameters: pars,
				onSuccess: function(response) {
				},
				onComplete: function(request) {
					if (request.responseText.include('err="1"')) {
						$('DeptInfoPage').update(request.responseText);
						init();
					} else {
						dept_box.close(0);
						loadMap();
						showOpTip(getMessage('js.com.info.0008'));
					}
					
				},
				onFailure: function(request) {
				}
			});
		}, function(){
		}, '是', '否');
		
	}
	
}



/**
 * 弹出的员工选择画面取得本页面传递的人员数组
 * @return 本页面传递的人员数组
 * ※弹出的员工选择画面会调用
 */
function prepareInitUsers() {
	// 传初始人员
	var usersPrevious = [];
	var id = 'YD' + $('empId').value;
	var name = $('orgMngerNm').value;
	// 初始人员存在则传给人员选择画面
	if (id && name) {
		usersPrevious.push(new User(id, name));
	}
	return usersPrevious;
}

/**
 * 取得所选人员信息
 * @param 人员数组
 */
function display(users) {

	//所选人员
	if (typeof(users) != 'undefined') {
	
		if (users.length != 0) {
		
			$('empId').value = users[0].id.replace('YD', '');
			$('orgMngerNm').value = users[0].name;
			
			//关闭弹出的员工选择画面※
			emp_box.close(0);
		}
	} else {
		MsgBox.error(getMessage('js.com.error.0001'));
	}
	
}

/**
 * 设置主管
 * 弹出员工选择画面
 * 参数empNum为限定选择的人数，如果不需要限定则不传
 */
function setOrgMnger() {
	$('empSelectPage').src = 'yb9010Init.action?mode=1&empNum=1';
	emp_box.Popup();
}

/**
 * 取消后返回迁移元画面
 *
 */
function modifyCancel() {

	if (mode == 3) {
		mode = 2;
		var url = 'yb0051Init.action?mode=2' + '&orgId=' + $F('orgId') + '&orgId2=' + $F('orgId2');
		var pars = '';
		MsgBox.confirm(getMessage('js.com.info.0005'), '确认对话框', function(){
		    new Ajax.Updater('DeptInfoPage', url, {
				method: 'post',
				evalScripts: true,
				parameters: pars,
				onLoading: function() {
				},
				onSuccess: function(response) {
				},
				onFailure: function(request) {
				},
				onComplete: function(request) {
					init();
				}
			});
		}, function(){
			mode = 3;
		}, '是', '否');
		
	} else {
		MsgBox.confirm(getMessage('js.com.info.0005'), '确认对话框', function(){
			dept_box.close();
		}, function(){
		}, '是', '否');

	}
}

/**
 * 关闭员工选择画面
 * 由弹出的员工选择画面调用
 */
function empSelectPageLoaded() {
	emp_box.loaded();
}














