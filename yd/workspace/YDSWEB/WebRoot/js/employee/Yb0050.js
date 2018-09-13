/*
 * @(#)Yb0050.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 人员管理
 */
/**
 * @fileOverview 组织结构图页面 Javascript
 *
 * @author tengchanglong
 * @version 1.0
 */
var nowData;
var baseData;
var lastData = [];
var PopboxAddSubDept;
var PopboxWatchDeptInfo;
var mode;
var dept_box;
var emp_box;
/**
 * 画面启动时自动调用初期组织图.
 */
Event.observe(window, 'load', function() {
	loadMap();
	
	dept_box = new PopupBox({
		// *唯一标志，相同页面中不可重复
		key: 'my01',
		
		// *标题内容，可用元素或字符串
		title: '部门信息',
		
		// *图标的CSS
		icon: 'org_info',
		
		// *内容元素
		content: $('DeptInfoPage'),
		
		// *显示位置，相当与z-index
		position: 2,
		
		// 是否允许拖动
		drag: true
	
	});
	
	
	
	// pop员工选择画面
	emp_box = new PopupBox({
		// *唯一标志，相同页面中不可重复
		key: 'my03',
		// *标题内容，可用元素或字符串
		title: '员工选择',
		// *图标的CSS
		icon: 'org_info',
		// *内容元素
		content: $('empSelectPage'),
		// *显示位置，相当与z-index
		position: 3,
		// 是否允许拖动
		drag: true,
		
		loader: true
	});
	
});

/**
 * 初期组织图.
 */
function loadMap() {
	//发送请求取得组织结构
	var url = 'yb0050WatchSubOrg.action';
	new Ajax.Request(url, {
		method: 'get',
		parameters:addStamp(),
		onComplete: function(request) {
			baseData = request.responseText.evalJSON();
			nowData = baseData;
			drawMap();
			//隐藏按钮
			$('buttonDiv').hide();
		}
	});
	
	
}

/**
 * 创建组织树.
 * 共通方法createOrgMap参数（数据，容器，长，宽，显示得组织层级）
 */
function drawMap() {
	createOrgMap(nowData, 'orgMapContainer', 950, 500, 20);
}

/**
 * 【查看部门组织】按钮事件.
 */
function watchDeptOrg() {
	
	//记录当前数据状态
	lastData.push(nowData);
	//取得选中节点
	nowData = getNodeData();
	//发送请求取得组织结构
	var url = 'yb0050WatchSubOrg.action?nodeId=' + nowData.id;
	new Ajax.Request(url, {
		method: 'get',
		parameters:addStamp(),
		onComplete: function(request) {
			baseData = request.responseText.evalJSON();
			nowData = baseData;
			drawMap();
			//显示按钮
			$('buttonDiv').show();
		}
	});
}

/**
 * 【增加下属部门】按钮事件.
 */
function addSubDept() {
	nowData = getNodeData();
	var dispSeq = nowData.dispSeq;
	// 迁移到增加下属部门画面
	dept_box.Popup(200, 300);
	mode = 1;
	var url = 'yb0051Init?mode=1&orgId2=' + nowData.id + '&dispSeq=' + dispSeq;
	var pars = '';
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
	
}

/**
 * 【查看部门详细信息】按钮事件.
 */
function watchDeptInfo() {
	
	nowData = getNodeData();
	//取得节点上级部门的级别序
	var dispSeqMax;
	if(nowData.parentId){
		dispSeqMax = nowData.parent.dispSeq;		
	}
	//取得节点下级部门最大的级别序
	var dispSeqMin = nowData.childs.min(function(childs) {
		return childs.dispSeq;
	});
	// 迁移到查看部门信息画面
	dept_box.Popup(200, 300);
	mode = 2;
	var url = 'yb0051Init?mode=2&orgId=' + nowData.id +
				'&orgId2=' + nowData.parentId +
				'&dispSeqUp=' + dispSeqMax +
				'&dispSeqDown=' + dispSeqMin;
	var pars = '';
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
}

/**
 * 【后退】按钮事件.
 */
function funcReturn() {
	loadMap();
}

