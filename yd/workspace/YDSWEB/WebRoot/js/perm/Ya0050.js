/*
 * @(#)Ya0050.js
 * @fileoverview 权限查询画面JavaScript.
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 权限管理
 */

/**
 * 全局变量
 */
var g_struct = [];
var g_tree = null;
var myPopbox01;
var myPopbox02;

/**
 * 根据权限Id查询用户和角色信息.
 * @param {String} permitId 权限ID.
 */
function getInfoByPermitId(permitId,permitName) {

	//页面提交ya0050GetInfoByPermitId
	var url = 'ya0050GetInfoByPermitId';
	var pars = 'permitId=' + encodeURI(permitId);
	new Ajax.Updater('div_perm_permitInfoList', url, {
		parameters: pars,
		onComplete: function(request){
			$('labPerName').update(permitName)  ;
			$('labPerName2').update(permitName)  ;
		}
	});
}

/**
 * 页面初始化
 */
function init() {

	var treeProperties = {

			//菜单单击事件
			'onClick': myClick ,

			//菜单展开关闭事件
			'onOpen':myOpen,
			
			'openOneAtOnce': true
		}
	createTree('div_permtree', '../perm/ya0050GetPermInfos.action','permitTree',treeProperties,true,false);


	// 查看用户权限信息弹出层初始化
	myPopbox01 = new PopupBox({
	 	
 		// 唯一标志，相同页面中不可重复
 		key: 'my01',
 		
 		// 标题内容，可用元素或字符串
 		title: '用户权限查看',
 		
 		// 图标的CSS
 		icon: 'img_opt opt_Relation',
 	    
 	    // 内容元素
 		content: $('myPopContent01'),
 		    
 		// 显示位置，相当与z-index
 		position: 3,
 		    
 		// 是否允许拖动
 		drag: true,

 		// 是否需要加载动画
 		loader: true

 	});
	
	// 查看角色信息弹出层初始化
	myPopbox02 = new PopupBox({
	 	
 		// 唯一标志，相同页面中不可重复
 		key: 'my02',
 		
 		// 标题内容，可用元素或字符串
 		title: '角色信息授权',
 		
 		// 图标的CSS
 		icon: 'img_opt opt_Relation',
 	    
 	    // 内容元素
 		content: $('myPopContent02'),
 		    
 		// 显示位置，相当与z-index
 		position: 3,
 		    
 		// 是否允许拖动
 		drag: true,
 		    
 		// 是否需要加载动画
 		loader: true
 	});
 }

/**
 * 菜单单击事件
 * @param {Object} branch 监听器
 */
function myClick(branch) {

	//当点击不是根节点的时候
	if (branch.getId() != '000') {
	getInfoByPermitId(branch.getId(),branch.getText());
	}
}

 /**
 * 菜单展开关闭事件
 * @param {Object} branch 监听器
 * @param {Object} status 三项表达式
 */
function myOpen (branch, status) {

	//将一览部清空。
	$('div_perm_permitInfoList').update();
}
 
/**
 * 查看用户权限信息弹出.
 */
function popInnerPageUserPerms(userId){
	
	$('myInnerPage01').src = 'ya0060GetUserPermInfo.action?modeFlg=2&userId=' + userId;
	myPopbox01.popup();
}
  
/**
 * 查看角色信息弹出.
 */
function popInnerPageRoleInfos(roleId){
	$('myInnerPage02').src = 'ya0020GetRolePerMgrInfo.action?modeFlg=2&roleId=' + roleId;
	myPopbox02.popup();
}
 
/**
 * 查看用户权限信息弹出层加载完成时调用的父页面接口.
 */
function permitSelectPageLoaded(){
	myPopbox01.loaded();
}

/**
 * 查看用户权限信息弹出层关闭时调用的父页面接口.
 */
function closedPopup(){
	myPopbox01.close(0);
}

/**
 * 查看角色信息弹出层加载完成时调用的父页面接口. 
 */
function myInnerPageLoaded(){
	myPopbox02.loaded();
}
