var tree;
var tree2;
var buildTree = function() {
	var root = new Ext.tree.AsyncTreeNode({
		id : 'Root_0',
        prefix : 'Root_',
        text : '组织架构',
        expanded : true
	});
	tree = new Ext.tree.TreePanel({
		loader : new Ext.tree.TreeLoader({
			dataUrl : 'Participant!getOrgTreeForDimission.ajax?parentId=' + root.id + '&prefix=' + root.attributes.prefix + '&t=' + new Date().getTime()
			,baseAttrs : {
				uiProvider : Ext.ux.TreeCheckNodeUI
			}
		}),
		checkModel: "single",
		root : root,
		renderTo : 'partyEntityTree',
		rootVisible:false,
		containerScroll: false,
		border : false,
		height : 380,
		animate : true,// 以动画形式伸展,收缩子节点
		autoScroll : true

	});
	tree.on('click', function(node) {
//		chooseParty(node.id, node.text);
	});
	tree.on('beforeload', function(node) {
		tree.loader.baseParams['q'] = $('#query_tree_qk').val();
		tree.loader.dataUrl = 'Participant!getOrgTreeForDimission.ajax?parentId=' + node.id + '&prefix=' + node.attributes.prefix + '&t=' + new Date().getTime();
	});
	root.expand();
	root.select();
	tree.loader.on("load",function(node,response){
		root.firstChild.expand();
	});
};
var buildTree2 = function() {
	var root = new Ext.tree.AsyncTreeNode({
		id : 'Part_0',
        prefix : 'Part_',
        text : '用户选择',
        expanded : true
	});
	tree2 = new Ext.tree.TreePanel({
		loader : new Ext.tree.TreeLoader({
			dataUrl : 'Participant!getOrgTree.ajax?parentId=' + root.id + '&prefix=' + root.attributes.prefix + '&t=' + new Date().getTime()
//			,baseAttrs : {
//				uiProvider : Ext.ux.TreeCheckNodeUI
//			}
		}),
		checkModel: "single",
		root : root,
		renderTo : 'partyEntityTree2',
		rootVisible:false,
		containerScroll: false,
		border : false,
		height : 380,
		animate : true,// 以动画形式伸展,收缩子节点
		autoScroll : true

	});
	tree2.on('click', function(node) {
//		chooseParty2(node.id, node.text);
	});
	tree2.on('beforeload', function(node) {
		tree2.loader.baseParams['q'] = $('#query_tree_qk2').val();
		tree2.loader.dataUrl = 'Participant!getUserTree.ajax?parentId=' + node.id + '&prefix=' + node.attributes.prefix + '&t=' + new Date().getTime();
	});
	root.expand();
	root.select();
	tree2.loader.on("load",function(node,response){
		root.firstChild.expand();
	});
};
var query_tree = function(){
	tree.root.reload(function(){
		var users_tree_qk = $('#query_tree_qk').val();
		if (isNotEmpty(users_tree_qk)){
			tree.expandAll();
		}
	});
}
var query_tree2 = function(){
	tree2.root.reload(function(){
		var users_tree_qk = $('#query_tree_qk2').val();
		if (isNotEmpty(users_tree_qk)){
			tree2.expandAll();
		}
	});
}
function chooseParty(idVar,nameVar){
	var returnJson = {};
	returnJson.id = idVar;
	returnJson.name = nameVar;
	window.returnValue = returnJson;
	window.close();
}
function choosePartyAll(){
	var returnJson = {};
	var idVar = '';
	var nameVar = '';
	var checkedNodes = tree.getChecked();
	if (null != checkedNodes && checkedNodes.length > 0){
		idVar = checkedNodes[0].id;
		nameVar = checkedNodes[0].text;
	}
	returnJson.id = idVar;
	returnJson.name = nameVar;
	window.returnValue = returnJson;
	window.close();
}
var init = function() {
	buildTree();
	buildTree2();
};

Ext.onReady(init);