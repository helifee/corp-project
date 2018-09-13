var dt = new Date();
var tree;
var buildTree = function() {
	var root = new Ext.tree.AsyncTreeNode({
		id : '0',
		text : '数据字典'
	});
	tree = new Ext.tree.TreePanel({
		loader : new Ext.tree.TreeLoader({
			dataUrl : 'Dict!getTrees.ajax'
		}),
		root : root,
		renderTo : 'projectIdTree',
		border : false,
		autoHeight : false,
		animate : true,// 以动画形式伸展,收缩子节点
		autoScroll : true
	});
	tree.on('click', function(node) {
		$("#maskDiv").mask("页面加载中...");
		var dt = new Date().getTime();
		node.expand();
		node.select();
		Ext.get(document.getElementById("category_frame")).dom.src = "Dict!list.do?parentId="+node.id+"&dt="+dt;
	});
	tree.on('beforeload', function(node) {
		tree.loader.dataUrl = 'Dict!getTrees.ajax?parentId=' + node.id;
	});
	root.expand();
	root.select();
};

var init = function() {
	buildTree();
	var height = 360;
	var mainheight = $(window).height() - $("#category_frame").offset().top;
	tree.setHeight(mainheight);
};
Ext.onReady(init);
var refreshTree=function(){
	var node = tree.getSelectionModel().getSelectedNode();
	if (null != node){
		if ( node.hasChildNodes() ) {
			node.reload();
		} else {
			node.parentNode.reload();
			node.expand();
		}
	} else {
		tree.getRootNode().reload();
	}
}