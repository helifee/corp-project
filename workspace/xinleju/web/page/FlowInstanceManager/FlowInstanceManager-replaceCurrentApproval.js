var dt = new Date();
var tree;

var buildTree = function() {
	/* 根节点，虚拟节点，数据库不存 */
	var root = new Ext.tree.AsyncTreeNode({
		id : '0',
		text : '华夏幸福'
	});
	tree = new Ext.tree.TreePanel({
		loader : new Ext.tree.TreeLoader({
			dataUrl : 'Orgn!getOrgnTree.ajax'
		}),
		root : root,
		rootVisible : false,
		renderTo : 'orgnTree',
		border : false,
		height : 470,
		animate : true,// 以动画形式伸展,收缩子节点
		autoScroll : true
	});
	tree.on('click', function(node) {
		var dt = new Date().getTime();
		node.expand();
		node.select();
		var fiId = document.getElementById("fiId").value;
		Ext.get(document.getElementById("user_frame")).dom.src = "FlowInstanceManager!userList.do?fiId="+fiId+"&orgnId="+node.id+"&dt="+dt;
	});
	tree.on('beforeload', function(node) {
		tree.loader.dataUrl = 'Orgn!getOrgnTree.ajax?parentId=' + node.id;
	});
	root.expand();
	root.select();
};

var init = function() {
	buildTree();
};
Ext.onReady(init);