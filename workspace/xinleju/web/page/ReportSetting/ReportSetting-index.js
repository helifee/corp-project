var dt = new Date();
var tree;
var buildTree = function() {
	var root = new Ext.tree.AsyncTreeNode({
		id : '0',
		text : '应用'
	});
	tree = new Ext.tree.TreePanel({
		loader : new Ext.tree.TreeLoader({
			dataUrl : 'ReportSetting!getTrees.ajax'
		}),
		root : root,
		renderTo : 'reportTree',
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
		Ext.get(document.getElementById("category_frame")).dom.src = "ReportSetting!list.do?code="+node.id;
	});
	tree.on('beforeload', function(node) {
		tree.loader.dataUrl = 'ReportSetting!getTrees.ajax?code=' + node.id;
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