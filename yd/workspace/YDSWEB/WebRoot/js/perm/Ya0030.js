/*
 * @(#)Ya0030.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 权限管理
 */
/**
 * @fileoverview 角色管理JavaScript.
 *
 * @author lihuajuan
 * @version 1.0
 */
 
// 全局变量
var myPopbox01;

/**
 * 新建角色信息弹出.
 */
function popInnerPageAdd(){
	$('myInnerPage').src = 'ya0020GetRolePerMgrInfo.action';
	myPopbox01.popup();
}

/**
* 修改角色信息弹出.
*/
function popInnerPageModify(roleId){
	$('myInnerPage').src = 'ya0020GetRolePerMgrInfo.action?modeFlg=1&roleId=' + roleId;
	myPopbox01.popup();
}

/**
 * 初始化.
 */
function init(){
	
	// 在高度达到指定值时出现滚动条
    listColor('table_peoList', 300);

	myPopbox01 = new PopupBox({
	
		// 唯一标志，相同页面中不可重复
		key: 'my01',
		
		// 标题内容，可用元素或字符串
		title: '角色信息授权',
		
		// 图标的CSS
		icon: 'img_opt opt_Relation',
	    
	    // 内容元素
		content: $('myPopContent01'),
		    
		// 显示位置，相当与z-index
		position: 3,
		    
		// 是否允许拖动
		drag: true,
		    
		// 是否需要加载动画
		loader: true,

		// 关闭后的回调，用于刷新页面等
		afterclose: function(){
			afterClose();
		}
	});
}

 /**
  * 弹出层关闭后的回调，用于刷新页面等
  */
function afterClose(){
	location.href = 'ya0030Init.action';
	// 在高度达到指定值时出现滚动条
    listColor('table_peoList', 300);

}

/**
 * 弹出层加载完成时调用的父页面接口 
 */

function myInnerPageLoaded(){
	myPopbox01.loaded();
}

/**
 * 弹出层关闭时调用的父页面接口
 */
function myInnerPageClose(para){
	myPopbox01.close();
}
