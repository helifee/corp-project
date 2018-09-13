/*
 * @(#)Yb9010.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 人员管理
 */
/**
 * @fileOverview 员工选择页面 Javascript
 *
 * @author tengchanglong
 * @version 1.0
 * 
 *  mode: 1-->人员系统
 *        2-->会议系统
 *        3-->考试系统
 */
/**
 * 人员类
 * @param {String} id
 * @param {String} name
 */
function User(id, name) {
	this.id = id;
	this.name = name;
}

var rightCnt = 0;
var leftCnt = 0;
var firstPopFlag = 0;
var lastLine = null;
/**
 * 主页面初始化
 */
function empSelectInit() {

	initValidation('empInfoForm');
	
	if ($('mode').value != 3) {
		
		// 人员系统和会议系统是弹出层
		parent.empSelectPageLoaded();
	}
	
	// 取得父页面人员
	if ($('mode').value == 3) {
		// 考试系统是弹出页面
		var usersPrevious = window.dialogArguments;
		if (typeof(usersPrevious) == 'undefined') {
			if (window.opener && !window.opener.closed) {
				usersPrevious = window.opener.prepareInitUsers();
			}
		}	
	} else {
		// 人员系统和会议系统是弹出层
		var usersPrevious = parent.prepareInitUsers();
	}
	
	//显示已选人员
	var newline = '<tr id="right_{0}" onclick="choose(this)"><td>{1}</td></tr>';
	
	if (typeof(usersPrevious) != 'undefined') {
		if (usersPrevious.length != 0) {
			usersPrevious.each(function(item) {
				Element.insert($('emp_right').down(),{
					bottom: newline.format(item.id, item.name)
				});
			});
			// 已选人员数量
			rightCnt = usersPrevious.length;
			$('empSelectedCnt').innerHTML = rightCnt;
		} else {
			$('empSelectedCnt').innerHTML = rightCnt;
		}
	}
	

	
	// 排序功能绑定
	new SortTable('emp_head', 'emp_left');
	
	// 在高度达到指定值时出现滚动条
	if($('emp_left').down('tr')){
		listColor('emp_left', 270);
	}
	
	if($('emp_right').down('tr')){
		listColor('emp_right', 270);
	}

	
	if($('mode').value != 1){
		var selectIdArr, actionNameArr;
		//部门，项目联动设定
		// Id数组
		selectIdArr = ['deptId', 'proId'];
		// Action数组
		actionNameArr = ['yb9010FindDeptIdList.action', 'yb9010FindProIdList.action'];
		// 下拉列表无回调
		registMultiSelect(selectIdArr, actionNameArr);
	}	
	
	// 弹出高级查询参数设定
	empAdvSearch_box = new PopupBox({
		// 唯一标志
		key: 3,
		// 标题内容，元素或字符串
		title: '高级查询',
		// 图标的CSS
		icon: 'org_info',
		// 内容元素
		content: $('div_empAdvSearch'),
		// 显示位置，相当与z-index
		position: 1,
		// 是否允许拖动
		drag: true
	
	});
	
	// 查询出的人员数量
	$('empCnt').innerHTML = 0;
	

	
}

/**
 * 主页面【高级查询】按钮事件
 */
function pop() {

	//不是第一次弹出则不需要调用Ajax
	if (firstPopFlag == 1) {
	
		empAdvSearch_box.Popup();
		return;
	}
	
	// 设定树的属性
	var treePropertiesDept = {
		'openAtLoad': false
	}
	var treePropertiesPos = {
		'openAtLoad': false
	}
	
	// 弹出的位置，top left 
	empAdvSearch_box.Popup(20, 25);
	
	var url = 'yb9011AdvSearchInit.action?mode=' + $('mode').value;
	var pars = '';
	new Ajax.Updater('div_empAdvSearch', url, {
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
			initValidation('advEmpInfoForm');
			
			// 所属项目table在高度达到指定值时出现滚动条
			listColor('table_dept', 150);
			// 员工职位table在高度达到指定值时出现滚动条
			listColor('table_pos', 150);
			
			// 页面加载时创建树
			if ($('mode').value == 1) {
				// 人员系统树结构不带项目
				createTree('myTreeDept', '../common/deptTreeList.action', 'deptTreeList', treePropertiesDept, false, true);
			} else {
				createTree('myTreeDept', '../common/orgTreeList.action', 'orgTreeList', treePropertiesDept, false, true);
			}
			
			createTree('myTreePos', '../common/positionTree.action', 'positionTree', treePropertiesPos, false, true);
			
			// 类别table在高度达到指定值时出现滚动条
			listColor('table_status', 150);
			// 状态table在高度达到指定值时出现滚动条
			listColor('table_state', 150);
			
			
		}
	});
}

/**
 * 主页面【查询】按钮事件
 * @return
 */
function searchEmp() {
	// 输入校验
	if (!checkForm('empInfoForm')) {
		return;
	}
	
	//加载动画
	showLoader();
	var leftHideCnt = 0;
	var url = 'yb9010FindEmp.action';
	var pars = $('empInfoForm').serialize();
	pars = addStamp(pars);
	new Ajax.Request(url, {
		method: 'get',
		parameters: pars,
		onSuccess: function(response) {
			hideLoader();
			if (checkException(response)) {
				return;
			}
			$('div_empInfoList').update(response.responseText);
			// 检查是否已选
			var alldArr = $('emp_left').down().childElements();
			for (var i = 0; i < alldArr.length; i++) {
				if ($($(alldArr[i]).id.replace('left', 'right'))) {
					$(alldArr[i]).hide();
					leftHideCnt = leftHideCnt + 1;
				}
			}
			
			// 查询出的人员数量
			leftCnt = alldArr.length - leftHideCnt;
			$('empCnt').innerHTML = leftCnt;
			// 在高度达到指定值时出现滚动条
			if($('emp_left').down().innerHTML){
				listColor('emp_left', 270);
			}
		}
	});
	
}

/**
 * 主页面【选择】按钮事件
 */
function empSubmit(empNum) {
	var users = [];
	
	// 选择一个员工时
	if(empNum == '1'){
		var selected = $('emp_left').select('.slt');
		if(selected.length != 0){
			users.push(new User($(selected[0]).id.replace('left_', ''), selected[0].down(1).innerHTML));	
		}
		
	}else{
	// 选择多个员工时
		var selected = $('emp_right').down().childElements();
		for (var i = 0; i < selected.length; i++) {
			users.push(new User($(selected[i]).id.replace('right_', ''), selected[i].down().innerHTML));
		}
	}
	
	//已选员工一览检查
	if (users.length == 0) {
		if (empNum == '1') {
			MsgBox.error(getMessage('js.emp.warning.0003'));
			return;
		}
	}
	
	//选择人员数检查
	var checkMsg = '请选择' + $('empNum').value + '个员工！';
	if ($('empNum').value != 0) {
		if (users.length != $('empNum').value) {
			MsgBox.error(checkMsg);
			return;
		}
	}

	if ($('mode').value == 3) {
		if (typeof(window.dialogArguments) == 'undefined') {
			if (window.opener && !window.opener.closed) {
				window.opener.display(users);
				
			} else {
				MsgBox.error(getMessage('js.com.error.0001'));
			}
		} else {
			window.returnValue = users;
		}
		window.close();
	}else{
		parent.display(users);
	}
	
}

/**
 * 主页面【关闭】按钮事件（暂时未启用）
 */
function closeWindow() {
	if($('mode').value == 3){
		
	}else{
		MsgBox.confirm(getMessage('js.com.info.0015'), '确认对话框', function() {
			window.close();
		}, function() {
		}, '确定', '取消');		
	}

}

/**
 * 选择行
 * @param line：选中行
 */
function choose(line) {
	
	// 只选一个人时
	if($('empNum').value == 1){
		if ($(line).hasClassName('slt')) {
			$(line).removeClassName('slt');
			lastLine = null;
		} else {
			$(line).addClassName('slt');
			if(lastLine != null){
				lastLine.removeClassName('slt');
				lastLine = $(line);
			}else{
				lastLine = $(line);
			}
		}
	}else{
		if ($(line).hasClassName('slt')) {
			$(line).removeClassName('slt');
		} else {
			$(line).addClassName('slt');
		}
	}

}

/**
 * 添加员工
 */
function addEmp() {
	
	var selectedArr = $('emp_left').select('.slt');
	
	// 选择一个员工时
	if($('empNum').value == 1){
		delAllEmp();
	}
	
	addEmpList(selectedArr);
	
	// 查询出的人员数量
	var allArr = $('emp_left').down().childElements();
	
	var leftHideCnt = 0;
	
	for (var i = 0; i < allArr.length; i++) {
		if (allArr[i].visible() == false) {
			leftHideCnt = leftHideCnt + 1;
		}
	}
	leftCnt = allArr.length - leftHideCnt;
	$('empCnt').innerHTML = leftCnt;
	
	// 选择的人员数量
	
	var rightArr = $('emp_right').down().childElements();
	$('empSelectedCnt').innerHTML = rightArr.length;
}

/**
 * 添加全部员工
 */
function addAllEmp() {

	var allArr = $('emp_left').down().childElements();
	// 检查是否已选
	for (var i = 0; i < allArr.length; i++) {
		if ($($(allArr[i]).id.replace('left', 'right'))) {
			//存在就不设置
		} else {
			//不存在的话设置成选中状态
			$(allArr[i]).addClassName('slt');
		}
	}
	
	var selectedArr = $('emp_left').select('.slt');
	addEmpList(selectedArr);
	
	// 查询出的人员数量
	$('empCnt').innerHTML = '0';
	
	// 选择的人员数量
	var rightArr = $('emp_right').down().childElements();
	$('empSelectedCnt').innerHTML = rightArr.length;
	
}

/**
 * 添加员工逻辑
 * @param selectedArr：选中行(数组)
 */
function addEmpList(selectedArr) {
	
	var leftHideCnt = 0;
	
	var newline = '<tr id="right_{0}" onclick="choose(this)"><td>{1}</td></tr>';
	
	for (var i = 0; i < selectedArr.length; i++) {
		
		$(selectedArr[i]).hide();
		
		leftHideCnt = leftHideCnt + 1;
		
		$(selectedArr[i]).removeClassName('slt');
		//插到最后
		Element.insert($('emp_right').down(),{
			bottom: newline.format($(selectedArr[i]).id.replace('left_', ''), $(selectedArr[i]).down(1).innerHTML)
		});
	}
	
	if($('emp_left').down('tr')){
		listColor('emp_left', 270);
	}
	
	if($('emp_right').down('tr')){
		listColor('emp_right', 270);
	}
	
}

/**
 * 删除员工
 */
function delEmp() {
	var selectedArr = $('emp_right').select('.slt');
	delEmpList(selectedArr);
	
	// 查询出的人员数量
	var leftHideCnt = 0;
	var allArr = $('emp_left').down().childElements();
	for (var i = 0; i < allArr.length; i++) {
		if (allArr[i].visible() == false) {
			leftHideCnt = leftHideCnt + 1;
		}
	}
	leftCnt = allArr.length - leftHideCnt;
	$('empCnt').innerHTML = leftCnt;
	
	// 选择的人员数量
	var rightArr = $('emp_right').down().childElements();
	$('empSelectedCnt').innerHTML = rightArr.length;
}

/**
 * 删除全部员工
 */
function delAllEmp() {
	var selectedArr = $('emp_right').down().childElements();
	delEmpList(selectedArr);
	
	// 查询出的人员数量
	var leftHideCnt = 0;
	var allArr = $('emp_left').down().childElements();
	for (var i = 0; i < allArr.length; i++) {
		if (allArr[i].visible() == false) {
			leftHideCnt = leftHideCnt + 1;
		}
	}
	leftCnt = allArr.length - leftHideCnt;
	$('empCnt').innerHTML = leftCnt;
	// 选择的人员数量
	$('empSelectedCnt').innerHTML = '0';
}

/**
 * 删除员工逻辑
 * @param selectedArr：选中行(数组)
 */
function delEmpList(selectedArr) {
	var leftShowCnt = 0;
	for (var i = 0; i < selectedArr.length; i++) {
		if ($($(selectedArr[i]).id.replace('right', 'left'))) {
			$($(selectedArr[i]).id.replace('right', 'left')).show();
			leftShowCnt = leftShowCnt + 1;
		}
		$(selectedArr[i]).remove();
	}
	if($('emp_left').down('tr')){
		listColor('emp_left', 270);
	}
	// 特殊部分删除全部时候需要调用listcolor
	listColor('emp_right', 270);	
}


/**
 * 弹出页面【查询】按钮事件
 * @return
 */
function advSearchEmpInfo() {

	// 输入校验
	if (!checkForm('advEmpInfoForm')) {
		return;
	}
	
	// 开始日期与结束日期输入校验
	if (!startYearValidate()) {
		return;
	}
	
	//取得选择的部门和职位(调用ydsTree.js中的方法)
	var dept = $('myTreeDept').getAllSelected();
	var pos = $('myTreePos').getSelected();
	
	//加载动画
	showLoader();
	
	//设置性别
	if ($('advEmpSexM').checked == true && $('advEmpSexF').checked == true) {
		$('empSex').value = '';
	} else if ($('advEmpSexM').checked == true && $('advEmpSexF').checked == false) {
		$('empSex').value = 'm'
	} else if ($('advEmpSexM').checked == false && $('advEmpSexF').checked == true) {
		$('empSex').value = 'f'
	} else {
		$('empSex').value = '';
	}
	
	var leftHideCnt = 0;
	var url = 'yb9011FindAdvEmpLst.action';
	var pars = $('advEmpInfoForm').serialize() + '&' + serialize(dept, 'yb9010CondB.orgIdInfos') + '&' + serialize(pos, 'yb9010CondB.posIdInfos');
	pars = addStamp(pars);
	new Ajax.Updater('div_empInfoList', url, {
		method: 'get',
		parameters: pars,
		onComplete: function(response) {
			hideLoader();
			if (checkException(response)) {
				return;
			}
			// 设定是否是第一次弹出高级查询画面
			firstPopFlag = 1;
			empAdvSearch_box.close();
			
			// 检查是否已选
			var alldArr = $('emp_left').down().childElements();
			for (var i = 0; i < alldArr.length; i++) {
				if ($($(alldArr[i]).id.replace('left', 'right'))) {
					$(alldArr[i]).hide();
					leftHideCnt = leftHideCnt + 1;
				}
			}
			
			// 查询出的人员数量
			leftCnt = alldArr.length - leftHideCnt;
			$('empCnt').innerHTML = leftCnt;
			
			// 在高度达到指定值时出现滚动条
			if($('emp_left').down().innerHTML){
				listColor('emp_left', 270);
			}
			// 员工一览画面初始化
			$('empInfoForm').reset();
		}
	});
	
}

/**
 * 弹出页面【清空】按钮事件
 */
function clearEmpInfo() {

	// 树的结点置为非选中
	$('myTreeDept').unselectAll();
	$('myTreePos').unselectAll();
	
	// 高级检索画面内容清空
	$('advEmpInfoForm').reset();
	
}

/**
 * 弹出页面入社期间校验
 * @return 返回 true：校验成功 false：校验失败
 */
function startYearValidate() {

	// 开始日期与结束日期输入校验
	startDate = $('startYearFrom').value;
	endDate = $('startYearTo').value;
	if (startDate != '' && endDate != '') {
		if (startDate > endDate) {
			addFieldError($('startYearTo'), getMessage('js.emp.warning.0003'));
			return false;
		} else {
			return true;
		}
	} else {
		return true;
	}
}
