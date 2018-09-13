/*
 * @(#)userMgrTest.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: Sample
 */
/**
 * @fileoverview 用户职位/角色管理示例JavaScript.
 *
 * @author zhangzheng
 * @version 1.0
 */

var mytest1 = new UserMgr({
	// *页面模式，ModeEnum中的值
	mode: ModeEnum.RolUsr,
	
	// 是否自动初始化内容，否则自行调用init()方法
	autoInit: false,
	
	// 标识符，页面内多次调用时必须指定不同值
	index: 'QQKK',
	
	// *目标DIV容器
	container: 'div_dest1',
	
	// *action选项
	action: {
	
		// 来源action
		sourceAction: 'json-posmgr.html',
		
		// 来源action参数
		sourceParam: '',
		
		// 目标action
		destAction: 'xxxxx',
		
		// 目标action参数(如token、stamp)
		destParam: '',
		
		// 查询用action
		selectAction: 'select.html',
		
		// 查询用action参数
		selectParam: addStamp(),
		
		// 对话框action
		dialogAction:'getRolePerMgrInfoAction.action',
		
		// 是否启用前台检索
		frontSelect: true
	},
	
	// *Bean属性名
	attrName: {
		// 部门信息名称
		deptObj: 'deptinfo',
		// 角色/职位信息名称
		prObj: 'prinfo',
		// 用户信息名称
		userObj: 'userinfo',
		// 关系信息名称
		rltObj: 'rltinfo',
		
		// 部门ID
		deptId: 'dpId',
		// 部门名称
		deptName: 'dpNm',
		// 角色/职位ID
		prId: 'pid',
		// 角色/职位名称
		prName: 'pnm',
		// 用户ID
		userId: 'uid',
		// 用户名
		userName: 'unm',
		// 用户部门ID
		userDept: 'ud',
		// 关系-角色/职位ID
		rltPrId: 'rpid',
		// 关系-用户ID
		rltUserId: 'ruid',
		// 关系-起始日期
		rltStart: 'stdt',
		// 关系-结束日期
		rltEnd: 'eddt',
		// 关系-操作标志(提交用)
		rltOpFlg: 'flg',
		// 需要前台保留并提交的属性
		rltKeep: ['updateStamp', 'operaterId', 'permFlag'],
		
		// 查询-入社年
		selectYear: 'bean.year',
		// 查询-姓名
		selectName: 'bean.cname',
		// 查询-部门
		selectDept: 'bean.dept',
		// 查询-职位(职位-用户管理用)
		selectPos: 'bean.pos',
		// 提交-JSON名
		submitJson: 'json'
	}
});
var mytest2 = new UserMgr({
	// *页面模式，ModeEnum中的值
	mode: ModeEnum.UsrRol,
	
	// 是否自动初始化内容，否则自行调用init()方法
	autoInit: false,
	
	// 标识符，页面内多次调用时必须指定不同值
	index: 'IIXX',
	
	// *目标DIV容器
	container: 'div_dest2',
	
	// *action选项
	action: {
	
		// 来源action
		sourceAction: 'json-posmgr.html',
		
		// 来源action参数
		sourceParam: '',
		
		// 目标action
		destAction: 'xxxxx',
		
		// 目标action参数(如token、stamp)
		destParam: '',
		
		// 查询用action
		selectAction: 'select.html',
		
		// 查询用action参数
		selectParam: addStamp(),
		
		// 对话框action
		dialogAction:'getRolePerMgrInfoAction.action',
		
		// 是否启用前台检索
		frontSelect: true
	},
	
	// *Bean属性名
	attrName: {
		// 部门信息名称
		deptObj: 'deptinfo',
		// 角色/职位信息名称
		prObj: 'prinfo',
		// 用户信息名称
		userObj: 'userinfo',
		// 关系信息名称
		rltObj: 'rltinfo',
		
		// 部门ID
		deptId: 'dpId',
		// 部门名称
		deptName: 'dpNm',
		// 角色/职位ID
		prId: 'pid',
		// 角色/职位名称
		prName: 'pnm',
		// 用户ID
		userId: 'uid',
		// 用户名
		userName: 'unm',
		// 用户部门ID
		userDept: 'ud',
		// 关系-角色/职位ID
		rltPrId: 'rpid',
		// 关系-用户ID
		rltUserId: 'ruid',
		// 关系-起始日期
		rltStart: 'stdt',
		// 关系-结束日期
		rltEnd: 'eddt',
		// 关系-操作标志(提交用)
		rltOpFlg: 'flg',
		// 需要前台保留并提交的属性
		rltKeep: ['updateStamp', 'operaterId', 'permFlag'],
		
		// 查询-入社年
		selectYear: 'bean.year',
		// 查询-姓名
		selectName: 'bean.cname',
		// 查询-部门
		selectDept: 'bean.dept',
		// 查询-职位(职位-用户管理用)
		selectPos: 'bean.pos',
		// 提交-JSON名
		submitJson: 'json'
	}
});

function show1() {
	$('div_dest2').hide();
	mytest1.init.defer();
	$('div_dest1').show();
}

function show2() {
	$('div_dest1').hide();
	mytest2.init.defer();
	$('div_dest2').show();
}

