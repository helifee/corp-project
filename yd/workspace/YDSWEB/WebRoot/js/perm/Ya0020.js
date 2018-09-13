/*
 * @(#)Ya0020.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 权限管理
 */
/**
 * @fileoverview 角色信息授权JavaScript.
 *
 * @author caoxiaodong
 * @version 1.0
 */

/**
 * 全局变量.
 */ 
var g_struct = [];
var g_tree = null;
var g_changedNodes = [];
var g_nodesOld = new Hash();
var g_nodesNew = new Hash();

/**
 * 操作状态枚举.0:新规 1：修改 2：参照
 */
var OperateEnum = {
	Create: 0,
	Modify: 1,
	Reference: 2
};

/**
 * 画面onload.
 */
function initForm() {

	var modeFLG = $F('modeFlg');
	
	// 树的初始化
	treeInit();
	
	// 角色ID非活性
	$('roleId').disable();
	
	if (modeFLG == OperateEnum.Create) {
	
		// 新规模式（基本信息和授权部活性、删除按钮非显示）
		$('delete').style.visibility="hidden";
	} else if (modeFLG == OperateEnum.Reference) {
	
		// 照会模式（基本信息和授权部非活性、删除、提交、取消按钮非显示）
		$('roleNm').disable();
		$('roleDesc').disable();
		$('delete').hide();
		$('dosubmit').hide();
		$('cancel').hide();
	} else if (modeFLG != OperateEnum.Modify) {
	
		// 其它直接弹出错误信息
		reportError();
		window.close();
	}
	regBtnFunc();
}

/**
 * 树的初始化
 */
function treeInit() {

	var url = 'ya0020GetRolePerMgrTree.action';
	var params = 'modeFlg=' + encodeURI($F('modeFlg')) + '&roleId=' + encodeURI($F('roleId'));
	var request = new Ajax.Request(url, {
		method: 'post',
		parameters: params,
		onComplete: TafelTreeInitBack,
		asynchronous: true
	});
}

/**
 * 页面初始callback函数
 * @param {Object} json 返回的json数据
 */
function TafelTreeInitBack(json) {

	g_struct[0] = json.responseJSON.tree;
	
	//tree初始化
	if (!g_tree) {
		g_tree = new TafelTree('myTree', g_struct, {
			'generate': true, // 指定树是否一步步生成
			'imgBase': '../js/tafelTree/imgs/', // 位图的位置
			'width': '50%', // 宽度
			'height': 'auto', // 高度
			'openAtLoad': true, // 指定load后结点是否打开
			'cookies': false, // 是否使用cookies
			'checkboxesThreeState': true, // 是否使用三态checkbox
			'onBeforeCheck': myBeforeCheck, // checkbox是否可以选择
			'defaultImg': 'page.gif', // 默认位图
			'defaultImgOpen': 'folderopen.gif', // 默认打开位图
			'defaultImgClose': 'folder.gif', // 默认关闭位图
			'defaultImgSelected': 'globe.gif', // 默认被选择的位图
			'defaultImgOpenSelected': 'imgfolder.gif', // 默认打开的且选择的结点位图
			'defaultImgCloseSelected': 'base.gif', // 默认关闭的且选择的结点位图
			'onCheck': myCheck
		});
	}
	
	var branch = g_tree.getBranchById('000');
	branch.addClass('root');
}

/**
 * 定义结点结构
 * @param {Object} id
 * @param {Object} check
 * @param {Object} txt
 */
function Node(id, check, txt) {
	this.id = id;
	this.check = check;
	this.txt = txt;
}

/**
 * 取得点击结点的叶子结点和自身(若本身是叶子)的数组
 *
 * @param {Object} branch
 */
function getNodes(branch) {

	//定义返回数组
	var leaves = [];
	
	//如果是叶子结点,则加入到数组中
	if (!branch.hasChildren()) {
		var root = branch.getAncestor();
		if (root) {
			leaves.push(branch);
		}
		
	//如果是非叶子结点,则循环其所有子结点
	} else {
		var children = branch.getBranches();
		for (var i = 0; i < children.length; i++) {
			if (!children[i].hasChildren()) {
				leaves.push(children[i]);
			}
		}
	}
	
	return leaves;
}

/**
 * 取得树中选中与半选中的节点
 */
function getCheckedNodes(){
	
	// 定义选择节点数组
	var leaves = [];

	// 定义返回的节点
	var checkNodes = new Hash();
	
	// 部分选中节点
	var partCheckedNodes = g_tree.getPartCheckedBranches();

	// 选中节点
	var checkedNodes = g_tree.getCheckedBranches();
	
	for (var i = 0; i < partCheckedNodes.length; i++) {
		leaves.push(partCheckedNodes[i]);
	}
	for (var i = 0; i < checkedNodes.length; i++) {
		leaves.push(checkedNodes[i]);
	}
	for (var i = 0; i < leaves.length; i++) {
		var id = leaves[i].getId();
		var check = leaves[i].isChecked();
		var text = leaves[i].getText();
		checkNodes.set(id, new Node(id, check, text));
	}
	checkNodes.unset('001');
		
	return checkNodes;
}

/**
 * 结点check前事件处理方法，保存初始时可能变化的结点的状态
 *
 * @param {Object} branch
 * @param {Object} status
 */
function myBeforeCheck(branch, status) {

	// checkbox是否可以选择判定.
	if ($F('modeFlg') == OperateEnum.Reference) {
		return false;
	} else {
		var nodes = getNodes(branch);

		//保存到初始状态Map中（如果id存在则不保存）
		for (var i = 0; i < nodes.length; i++) {
			var id = nodes[i].getId();
			var check = nodes[i].isChecked();
			var text = nodes[i].getText();
			var tmpNode = g_nodesOld.get(id);
			if (typeof(tmpNode) == 'undefined') {
				g_nodesOld.set(id, new Node(id, check, text));
			}
		}
		return true;
	}
}

/**
 * 结点check后事件处理方法，保存提交前所有变化结点最终状态
 *
 * @param {Object} branch
 * @param {Object} status
 */
function myCheck(branch, status) {

	var nodes = getNodes(branch);

	//保存到初始状态Map中（如果id存在则不保存）
	for (var i = 0; i < nodes.length; i++) {
		var id = nodes[i].getId();
		var check = nodes[i].isChecked();
		var text = nodes[i].getText();
		g_nodesNew.set(id, new Node(id, check, text));
	}
}

/**
 * 比较两个Map，返回不同的key-value
 *
 * @param {Object} nodesNew
 * @param {Object} nodesOld
 */
function diffenceBetween(nodesNew, nodesOld) {

	nodesNew.each(function(pair) {
		var id = pair.key;
		var check1 = pair.value.check;
		var check2 = nodesOld.get(id).check;
		if (check1 == check2) {
			nodesNew.unset(id);
		}
	});
	
	return nodesNew;
}

/**
 *  取消按钮事件.
 */
function resetInfo() {

	MsgBox.confirm(getMessage('js.com.info.0005'), '确认对话框', function() {

		// 消除原来的树
		$('myTree').innerHTML = '';
		g_tree = null;
		
		// 树的初始化，重新取得树
		treeInit();
	}, function() {
	}, '是', '否');
}

/**
 *  删除按钮事件.
 */
function deleteRoleInfo() {

    // 输入校验
    if (!checkForm('ya0020Form')) {
        return;
    }

	MsgBox.confirm(getMessage('js.per.info.0012'), '确认对话框', function() {
		okDeleteRoleInfo();
	}, function() {
	}, '是', '否');
}

/**
 *  删除按钮事件.
 */
function okDeleteRoleInfo() {

	var roleId = $F('roleId');
	var url = 'ya0020DelRolePerMgrInfo.action';
	var pars = 'roleId=' + encodeURI(roleId) + '&hidRoleNm=' + encodeURI($F('hidRoleNm'));
	new Ajax.Request(url, {
		method: 'post',
		parameters: pars,
		onSuccess: function(request) {
			if(checkException(request)) return;
			if (request.responseText.empty()) {
				
				showOpTip(getMessage('js.com.info.0010'));
				window.returnValue = 1;
				window.close();
			} else {

				window.returnValue = 1;
				// 调用父页面接口  
				parent.myInnerPageClose(); 

			}
		},
		onFailure: reportError
	});
}

/**
 * 提交按钮事件.
 */
function submitRoleInfo() {

    // 输入校验
    if (!checkForm('ya0020Form')) {
        return;
    }

	if ($F('modeFlg') == OperateEnum.Create) {
	
		// 页面提交(新建)
		MsgBox.confirm(getMessage('js.com.info.0004'), '确认对话框', function() {
			okNewCreate();
		}, function() {
		}, '是', '否');
		
	} else if ($F('modeFlg') == OperateEnum.Modify) {
	
		// 页面提交(修改)
		MsgBox.confirm(getMessage('js.com.info.0004'), '确认对话框', function() {
			okModify();
		}, function() {
		}, '是', '否');
	}
}

/**
 * 确认新建按钮事件.
 */
function okNewCreate() {

	//取得更改过的结点
	var url = 'ya0020AddRolePerMgrInfo.action';
	var pars = 'jsonStr=' + getCheckedNodes().toJSON();
	pars = getRoleParas(pars);
	new Ajax.Request(url, {
		method: 'post',
		parameters: pars,
		onSuccess: function(request) {
			if (checkException(request)) return;
	          
			if (request.responseText.empty()) {
					showOpTip(getMessage('js.com.warning.0005', '该角色/权限ID'));
					window.returnValue = 1;
					window.close();
					
			} else {
				
				window.returnValue = 1;
					
				// 调用父页面接口 
				parent.myInnerPageClose();  
			}
		}
	});
}

/**
 * 确认修改按钮事件.
 */
function okModify() {

	//取得更改过的结点
	var g_changedNodes = diffenceBetween(g_nodesNew, g_nodesOld);
	var url = 'ya0020UpdRolePerMgrInfo.action';
	var pars = 'jsonStr=' + g_changedNodes.toJSON() + '&jsonStrC=' + getCheckedNodes().toJSON() +
	'&hidRoleNm=' +
	encodeURI($F('hidRoleNm'));
	pars = getRoleParas(pars);
	new Ajax.Request(url, {
		method: 'post',
		parameters: pars,
		onSuccess: function(request) {
			if (checkException(request)) return;

			if (request.responseText.empty()) {
				showOpTip(getMessage('js.com.warning.0004', '该角色/权限ID'));
				window.returnValue = 1;
				window.close();

			} else {
				
				window.returnValue = 1;
					
				// 调用父页面接口  
				parent.myInnerPageClose();  

			}
		}
	});
}

/**
 * 角色信息参数的追加.
 * @return String 追加的角色信息参数
 */
function getRoleParas(paras) {

	var ret = paras;
	
	ret = ret +'&perRoleInfo.roleId=' + $F('roleId') +
	'&'+ $('ya0020Form').serialize() ;
	
	// 判断角色名和角色描述的信息是否改变
	if ($F('hidRoleNm') != $F('roleNm')) {
		ret = ret + '&updateRoleFlg=' + '1';
	} else if ($F('hidRoleDesc') != $F('roleDesc')) {
		ret = ret + '&updateRoleFlg=' + '2';
	} else {
		ret = ret + '&updateRoleFlg=' + '0';
	}
	return ret;
}

/**
 * 系统错误处理.
 */
function reportError() {
	MsgBox.message(getMessage('js.com.error.0001'));
}

/**
 * 在加载完成时调用父页面接口.
 */
Event.observe(window, 'load', function() {  
 	parent.myInnerPageLoaded();  
 });  
