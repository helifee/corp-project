/*
 * @(#)treeTest.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: sample
 */

/**
 * tree sample js
 * 
 * @author zhangdaoqiang
 * @version 1.0 2010/02/25
 */

//全局变量
var g_struct = [];
var g_tree = null;
var changedNodes = [];
var nodesOld = new Hash();
var nodesNew = new Hash();

/**
 * 页面初始化
 */
function TafelTreeInit() {
	
	var url = '../sample/treeTest.action';
	var params = '';
	var request = new Ajax.Request(url, {
		method: 'post',
		parameters: params,
		onComplete: TafelTreeInitBack,
		asynchronous:true
	});
}

/**
 * 页面初始callback函数
 * @param {Object} json 返回的json数据
 */
function TafelTreeInitBack(json) {
	
//	g_struct[0] = json.responseText.evalJSON(true).tree;
	g_struct[0] = json.responseJSON.tree;

	//tree初始化
	if(!g_tree) {
		g_tree = new TafelTree('myTree', g_struct, {	//myTree：页面div的id, g_struct：json数据
			'generate' : true,							//指定树是否一步步生成
			'imgBase' : '../js/tafelTree/imgs/',		//位图的位置
			'width' : '100%',							//宽度
			'height' : 'auto',							//高度
			'openAtLoad' : true,						//指定load后结点是否打开
			'cookies' : false,							//是否使用cookies
			//'openOneAtOnce' : true,					//是否只打开一次
			'checkboxesThreeState' : true,				//是否使用三态checkbox
			'defaultImg' : 'page.gif',					//默认位图
			'defaultImgOpen' : 'folderopen.gif',		//默认打开位图
			'defaultImgClose' : 'folder.gif',			//默认关闭位图
			'defaultImgSelected' : 'globe.gif',			//默认被选择的位图
			'defaultImgOpenSelected' : 'imgfolder.gif',	//默认打开的且选择的结点位图
			'defaultImgCloseSelected' : 'base.gif',		//默认关闭的且选择的结点位图
			'onEdit' : myEdit,							//指定双击结点处理function
			'onBeforeCheck' : myBeforeCheck,
			'onCheck' : myCheck
	
		});
	}

	var branch = g_tree.getBranchById('000');
	branch.addClass('root');
	
	//alert(g_tree.countBranches());
	//alert(g_tree.serialize(true));
	//alert(Object.toJSON(g_struct));
	
	/*
	var branches = g_tree.getBranches();
	for(var i = 0; i < branches.length; i++) {	
		alert(branches[0].isChecked());
		break;
	}
	*/
	
	//注册按钮事件
	Event.observe('button1','click', treeSubmit);
	
}

/**
 * 修改结点文本
 * @param {Object} branch 点击的结点
 * @param {Object} newValue 新输入的值
 * @param {Object} oldValue 原来的值
 */
function myEdit(branch, newValue, oldValue) {
	return newValue;
}

/**
 * 定义结点结构
 * @param {Object} id
 * @param {Object} check
 */
function Node(id, check, txt) {
	this.id = id;
	this.check = check;
	this.txt = txt;
}


/**
 * 取得点击结点的父子结点和自身的数组
 * 
 * @param {Object} branch

function getNodes(branch) {
	
	//取得父结点
	var nodes = branch.getParents();
	
	//取得子结点
	nodes = nodes.concat(branch.getBranches());
	
	//取得自身
	nodes.push(branch);
	
	return nodes;
}
*/

/**
 * 取得点击结点的叶子结点和自身(若本身是叶子)的数组
 * 
 * @param {Object} branch
 */
function getNodes(branch) {
	
	//定义返回数组
	var leaves = [];
	
	//如果是叶子结点,则加入到数组中
	if(!branch.hasChildren()) {
		leaves.push(branch);
	
	//如果是非叶子结点,则循环其所有子结点
	} else {
		var children = branch.getBranches();
		for(var i = 0; i < children.length; i++) {
			if(!children[i].hasChildren()) {
				leaves.push(children[i]);
			}
		}
	}
	
	return leaves;
}


/**
 * 结点check前事件处理方法，保存初始时可能变化的结点的状态
 * 
 * @param {Object} branch
 * @param {Object} status
 */
function myBeforeCheck(branch, status) {
	
	var nodes = getNodes(branch);
	
	//保存到初始状态Map中（如果id存在则不保存）
	for(var i = 0; i < nodes.length; i++) {
		var id = nodes[i].getId();
		var check = nodes[i].isChecked();
		var text = nodes[i].getText();
		var tmpNode = nodesOld.get(id);
		if (typeof(tmpNode) == 'undefined') {
			nodesOld.set(id, new Node(id, check, text));
		}
	}
	
	return true;
}

/**
 * 结点check后事件处理方法，保存提交前所有变化结点最终状态
 * 
 * @param {Object} branch
 * @param {Object} status
 */
function myCheck (branch, status) {
		
	var nodes = getNodes(branch);
	
	//保存到初始状态Map中（如果id存在则不保存）
	for(var i = 0; i < nodes.length; i++) {
		var id = nodes[i].getId();
		var check = nodes[i].isChecked();
		var text = nodes[i].getText();
		nodesNew.set(id, new Node(id, check, text));
	}
}
 
/**
 * 比较两个Map，返回不同的key-value
 * 
 * @param {Object} nodesNew
 * @param {Object} nodesOld
 */
function diffenceBetween(nodesNew, nodesOld) {
	nodesNew.each(function(pair){
		var id = pair.key;
		var check1 = pair.value.check;
		var check2 = nodesOld.get(id).check;
		if(check1 == check2) {
			nodesNew.unset(id);
		}
	});
	
	return nodesNew;
}

/**
 * 按钮事件
 */
function treeSubmit(){
	
	//取得更改过的结点
	var changedNodes = diffenceBetween(nodesNew, nodesOld);

	var url = '../sample/saveTree.action';
	
	//传整个树到后台
	//var params = "jsonStr=" + Object.toJSON(g_struct[0]);
	
	//传变化的叶子结点到后台
	var params = "jsonStr=" + changedNodes.toJSON();
	//alert(params);
	
	var request = new Ajax.Request(url, {
		method: 'post',
		parameters: params,
		//onComplete: TafelTreeInitBack,
		asynchronous:true
	});
}
