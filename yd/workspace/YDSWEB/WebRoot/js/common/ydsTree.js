/*
 * @(#)ydsTree.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: common
 */
/**
 * yds tree js
 *
 * @author zhangdaoqiang
 * @version 1.0 2010/06/09
 */
//全局变量
var g_checkboxId = '';

function setTreeProperties(newProperties, g_properties, showCheck) {
	//如果没有自定义属性，就用默认属性设置树
	if (newProperties.generate == null) {
		newProperties.generate = g_properties.generate;
	}
	if (newProperties.imgBase == null) {
		newProperties.imgBase = g_properties.imgBase;
	}
	if (newProperties.width == null) {
		newProperties.width = g_properties.width;
	}
	if (newProperties.height == null) {
		newProperties.height = g_properties.height;
	}
	if (newProperties.openAtLoad == null) {
		newProperties.openAtLoad = g_properties.openAtLoad;
	}
	if (newProperties.cookies == null) {
		newProperties.cookies = g_properties.cookies;
	}
	if (newProperties.checkboxesThreeState == null) {
		newProperties.checkboxesThreeState = g_properties.checkboxesThreeState;
	}
	if (newProperties.defaultImg == null) {
		newProperties.defaultImg = g_properties.defaultImg;
	}
	if (newProperties.defaultImgOpen == null) {
		newProperties.defaultImgOpen = g_properties.defaultImgOpen;
	}
	if (newProperties.defaultImgClose == null) {
		newProperties.defaultImgClose = g_properties.defaultImgClose;
	}
	if (newProperties.defaultImgSelected == null) {
		newProperties.defaultImgSelected = g_properties.defaultImgSelected;
	}
	if (newProperties.defaultImgOpenSelected == null) {
		newProperties.defaultImgOpenSelected = g_properties.defaultImgOpenSelected;
	}
	if (newProperties.defaultImgCloseSelected == null) {
		newProperties.defaultImgCloseSelected = g_properties.defaultImgCloseSelected;
	}
	if (showCheck) {
		newProperties.checkboxesThreeState = true;
	}
	
}

/**
 * 页面初始化
 * @param {Object}id 页面树所以div的id
 * @param {Object}url 初始化树的请求action
 * @param {Object}tree action中保存tree数据的属性名
 * @param {Object}treeProperties tree里不用默认属性的属性集合
 * @param {boolean}showRoot 是否显示根节点
 * @param {boolean}showCheck 是否显示checkbox
 */
function createTree(divId, url, tree, treeProperties, showRoot, showCheck) {
	var g_properties = {
		'generate': true, //指定树是否一步步生成
		'imgBase': '../js/tafelTree/imgs/', //位图的位置
		'width': 'auto', //宽度
		'height': 'auto', //高度
		'openAtLoad': true, //指定load后结点是否打开
		'cookies': false, //是否使用cookies
		'checkboxesThreeState': false, //是否使用三态checkbox
		'defaultImg': 'page.gif', //默认位图
		'defaultImgOpen': 'folderopen.gif', //默认打开位图
		'defaultImgClose': 'folder.gif', //默认关闭位图
		'defaultImgSelected': 'globe.gif', //默认被选择的位图
		'defaultImgOpenSelected': 'imgfolder.gif', //默认打开的且选择的结点位图
		'defaultImgCloseSelected': 'base.gif' //默认关闭的且选择的结点位图		
		//		'onCheck' : _myCheck			            //checkbox状态改变时自定义function
		//		'onEdit' : _myEdit,							//指定双击结点处理自定义function
		//		'onOpen':_myOpen,							//菜单展开关闭事件自定义function
		//		'onClick' : _myClick			            //单击节点时处理的自定义function
	}
	
	var params = '';
	var request = new Ajax.Request(url, {
		method: 'post',
		parameters: params,
		onComplete: function(json) {
			if (!checkException(json)) {
				setTreeProperties(treeProperties, g_properties, showCheck);
				newTree(json, divId, tree, treeProperties, showRoot);
			}
		},
		asynchronous: true
	});
}

/**
 * 页面初始callback函数
 * @param {Object} json 返回的json数据
 * @param {Object} div的id, g_struct：json数据
 * @param {Object}tree action中保存tree数据的属性名
 * @param {Object}treeProperties tree里不用默认属性的属性集合
 * @param {boolean}showRoot 是否显示根节点
 */
function newTree(json, divId, tree, treeProperties, showRoot) {
	var g_struct = [];
	var g_tree;
	if (showRoot) {
		g_struct[0] = json.responseJSON[tree];
	} else {
		g_struct = json.responseJSON[tree];
	}
	//tree初始化
	g_tree = new TafelTree(divId, g_struct, treeProperties);
	$(divId).getSelected = getSelected.curry(g_tree);
	$(divId).getAllSelected = getAllSelected.curry(g_tree);
	$(divId).selectAll = selectAll.curry(g_tree);
	$(divId).unselectAll = unselectAll.curry(g_tree);
}

/**
 * checkbox状态改变时function
 */
function _myBindCheck() {

	//取得树中非选中的结点
	var branches = g_tree.getBranches(function(branch) {
		if (!branch.isChecked()) {
			return true;
		}
	});
	
	//与树绑定的checkbox
	var chk = $(g_checkboxId);
	
	//如果树有存在非选中的结点则绑定的checkbox非选中，否则选中
	if (branches.length > 0) {
		chk.checked = false;
	} else {
		chk.checked = true;
	}
}

/**
 * 取得选择的叶子结点ID
 */
function getSelected(g_tree) {
	var posArr = [];
	var branches = g_tree.getBranches(function(branch) {
		if ((!branch.hasChildren()) && (branch.getAncestor()) && (branch.isChecked())) {
			posArr.push(branch.getId());
		}
	});
	
	return posArr;
}

/**
 * 取得选择的所有结点ID（不包含半选中）
 */
function getAllSelected(g_tree) {
	var posArr = [];
	var branches = g_tree.getBranches(function(branch) {
		if (branch.isChecked() == 1) {
			posArr.push(branch.getId());
		}
	});
	return posArr;
}

/**
 * 绑定指定的checkbox到树上
 *
 * @param {Object} id: checkbox id
 */
function bind(id) {

	//将指定的checkbox的id保存在全局变量中
	g_checkboxId = id;
	
	//给指定的checkbox绑定事件
	Event.observe(id, 'click', function() {
		var branches = g_tree.getBranches(function(branch) {
			var state = $(id).checked;
			if (state) {
				branch.check(1);
			} else {
				branch.check(0);
			}
		});
	});
	
}

/**
 * 将所有的结点置为选中
 */
function selectAll(g_tree) {
	var branches = g_tree.getBranches(function(branch) {
		branch.check(1);
	});
}

/**
 * 将所有的结点置为非选中
 */
function unselectAll(g_tree) {
	var branches = g_tree.getBranches(function(branch) {
		branch.check(0);
	});
}
