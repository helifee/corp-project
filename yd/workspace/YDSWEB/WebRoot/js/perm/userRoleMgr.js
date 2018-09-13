/*
 * @(#)userRoleMgr.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 权限管理
 */
/**
 * @fileoverview 用户角色管理JavaScript.
 *
 * @author yuanjinling
 * @version 1.0
 */

/**
 * 用户角色管理——按角色画面表示
 */
var rolUsr = new UserMgr({
	// *页面模式，ModeEnum中的值
	mode: ModeEnum.RolUsr,
	
	// 是否自动初始化内容，否则自行调用init()方法
	autoInit: true,
	
	// 标识符，页面内多次调用时必须指定不同值
	index: 'rolUsr',
	
	// *目标DIV容器
	container: 'roleOrUserTab_Content0',
	
	// *action选项
	action: {
	
		// 来源action
		sourceAction: 'getUserRoleMgrRoleAction.action',
		
		// 来源action参数
		sourceParam:  addStamp(),
		
		// 目标action
		destAction: 'submitUserRoleAction.action',
		
		// 目标action参数(如token、stamp)
		destParam: '',
		
		// 查询用action
		selectAction: 'getUserListInRoleAction.action',
		
		// 查询用action参数
		selectParam: addStamp(),
		
		// 对话框action
		dialogAction:'getRolePerMgrInfoAction.action',
		
		// 是否启用前台检索
		frontSelect: false
	},
	
	// *Bean属性名
	attrName: {
		// 部门信息名称
		deptObj: 'deptList',
		// 角色/职位信息名称
		prObj: 'perRoleInfoList',
		// 用户信息名称
		userObj: 'userInfoList',
		// 关系信息名称
		rltObj: 'perUserPermitInfoList',
		
		// 部门ID
		deptId: 'orgId',
		// 部门名称
		deptName: 'orgNm',
		// 角色/职位ID
		prId: 'roleId',
		// 角色/职位名称
		prName: 'roleName',
		// 用户ID
		userId: 'empId',
		// 用户名
		userName: 'empCnm',
		// 用户部门ID
		userDept: 'chargeOrgId',
		// 关系-角色/职位ID
		rltPrId: 'posRoleId',
		// 关系-用户ID
		rltUserId: 'userId',
		// 关系-起始日期
		rltStart: 'permitStaDate',
		// 关系-结束日期
		rltEnd: 'permitEndDate',
		// 关系-操作标志(提交用)
		rltOpFlg: 'flg',
		rltKeep: 'OperatorId',
		
		// 查询-入社年
		selectYear: 'userInfo.startYear',
		// 查询-姓名
		selectName: 'userInfo.empCnm',
		// 查询-部门
		selectDept: 'userInfo.chargeOrgId',
		// 提交-JSON名
		submitJson: 'jsonPermitInfo'
	}
});

/**
 * 用户角色管理——按用户画面表示
 */
var usrRol = new UserMgr({
	// *页面模式，ModeEnum中的值
	mode: ModeEnum.UsrRol,
	
	// 是否自动初始化内容，否则自行调用init()方法
	autoInit: false,
	
	// 标识符，页面内多次调用时必须指定不同值
	index: 'usrRol',
	
	// *目标DIV容器
	container: 'roleOrUserTab_Content1',
	
	// *action选项
	// *action选项
	action: {
	
		// 来源action
		sourceAction: 'getUserRoleMgrRoleAction.action',
		
		// 来源action参数
		sourceParam:  addStamp(),
		
		// 目标action
		destAction: 'submitUserRoleAction.action',
		
		// 目标action参数(如token、stamp)
		destParam: '',
		
		// 查询用action
		selectAction: 'getUserListInRoleAction.action',
		
		// 查询用action参数
		selectParam: addStamp(),
		
		// 对话框action
		dialogAction:'getRolePerMgrInfoAction.action',
		
		// 是否启用前台检索
		frontSelect: false
	},
	
	// *Bean属性名
	attrName: {
		// 部门信息名称
		deptObj: 'deptList',
		// 角色/职位信息名称
		prObj: 'perRoleInfoList',
		// 用户信息名称
		userObj: 'userInfoList',
		// 关系信息名称
		rltObj: 'perUserPermitInfoList',
		
		// 部门ID
		deptId: 'orgId',
		// 部门名称
		deptName: 'orgNm',
		// 角色/职位ID
		prId: 'roleId',
		// 角色/职位名称
		prName: 'roleName',
		// 用户ID
		userId: 'empId',
		// 用户名
		userName: 'empCnm',
		// 用户部门ID
		userDept: 'chargeOrgId',
		// 关系-角色/职位ID
		rltPrId: 'posRoleId',
		// 关系-用户ID
		rltUserId: 'userId',
		// 关系-起始日期
		rltStart: 'permitStaDate',
		// 关系-结束日期
		rltEnd: 'permitEndDate',
		// 关系-操作标志(提交用)
		rltOpFlg: 'flg',
		rltKeep: 'OperatorId',
		
		// 查询-入社年
		selectYear: 'userInfo.startYear',
		// 查询-姓名
		selectName: 'userInfo.empCnm',
		// 查询-部门
		selectDept: 'userInfo.chargeOrgId',
		// 提交-JSON名
		submitJson: 'jsonPermitInfo'
	}
});

/**
 * 用户角色管理——选项卡的实现
 */			
function nTabs(thisObj, Num) {
	if (thisObj.className == 'active') return;
	var tabObj = thisObj.parentNode.id;
	var tabList = $(tabObj).select('li');

	//Num:0 按角色选项卡；Num:1 按用户选项卡
		if (Num == 0) {					
			if (usrRol.isChanged()) {				
				MsgBox.confirm(getMessage('js.com.info.0012'), '确认对话框', function() {
					tabList[0].className = 'active';
					tabList[1].className = 'normal bd_r_1sccc';			
					$('roleOrUserTab_Content' + 0).removeClassName('none');
					$('roleOrUserTab_Content' + 1).addClassName('none');
					usrRol.init.defer();
					rolUsr.init.defer();					
				}, function() {
					return;
				}, 'Yes', 'No');
			} else {
				tabList[0].className = 'active';
				tabList[1].className = 'normal bd_r_1sccc';			
				$('roleOrUserTab_Content' + 0).removeClassName('none');
				$('roleOrUserTab_Content' + 1).addClassName('none');
				rolUsr.init.defer();
			}
			
		} else {
			if(rolUsr.isChanged()){
				MsgBox.confirm(getMessage('js.com.info.0012'), '确认对话框', function() {
					tabList[0].className = 'normal';
					tabList[1].className = 'active bd_r_1sccc';
					$('roleOrUserTab_Content' + 0).addClassName('none');
					$('roleOrUserTab_Content' + 1).removeClassName('none');
					rolUsr.init.defer();
		            usrRol.init.defer();
				}, function() {
					return;
				}, 'Yes', 'No');
			} else {
				tabList[0].className = 'normal';
				tabList[1].className = 'active bd_r_1sccc';
				$('roleOrUserTab_Content' + 0).addClassName('none');
				$('roleOrUserTab_Content' + 1).removeClassName('none');	
				usrRol.init.defer();
			}
		}		
}




			