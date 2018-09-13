/*
 * @(#)Ya0060.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 权限管理
 */

/**
 * @fileoverview 用户权限查看画面JavaScript.
 *
 * @author liyanrui
 * @version 1.0
 */
//全局变量
var g_struct = [];
var g_tree = null;

/**
 * 页面初始化
 */
function initForm(){
	
	// 取得用户名
    if ($F('userId').empty()) {

		// 用户不存在
		MsgBox.message(getMessage('js.com.warning.0004','用户'));
		// 关闭窗口
		window.close();
    }

	// 取得用户权限并显示
	var url = 'ya0060GetUserPermInfoTree.action';
	var params = 'userId ='+ encodeURI($F('userId'));
	var request = new Ajax.Request(url, {
		method: 'post',
		parameters: params,
		onComplete: TafelTreeInitBack,
		asynchronous:true
	});
	
	parent.permitSelectPageLoaded();
}

/**
 * 树初始化函数
 * @param {json} Action中返回的json数据
 */
function TafelTreeInitBack(json) {
	g_struct[0] = json.responseJSON.userPerInfoTree;

	//tree初始化
	if(!g_tree) {
		g_tree = new TafelTree('tree', g_struct, {
			'generate' : true,							//指定树是否一步步生成
			'imgBase' : '../js/tafelTree/imgs/',		//位图的位置
			'width' : '100%',							//宽度
			'height' : 'auto',                          //高度
			'cookies' : false,							//是否使用cookies
			'openAtLoad' : true,						//指定load后结点是否打开
			'checkboxesThreeState' : true,				//是否使用三态checkbox
			'defaultImg' : 'page.gif',					//默认位图
			'defaultImgOpen' : 'folderopen.gif',		//默认打开位图
			'defaultImgClose' : 'folder.gif',			//默认关闭位图
			'defaultImgSelected' : 'globe.gif',			//默认被选择的位图
			'defaultImgOpenSelected' : 'imgfolder.gif',	//默认打开的且选择的结点位图
			'defaultImgCloseSelected' : 'base.gif',	    //默认关闭的且选择的结点位图
			"onBeforeCheck" : 
			  function myBeforeCheck () {return false;} // 用户权限授权不可修改
		});
	}

	// 取得根节点
	var branch = g_tree.getBranchById('000');
}

/**
 * 关闭窗口
 */
function close_Button(){

	// 调用父页面接口  
	parent.closedPopup();
}

