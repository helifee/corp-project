var dt = new Date();
var tree;
var root;
var buildTree = function() {
	root = new Ext.tree.AsyncTreeNode({
		id : '-1',
		text : '角色'
	});
	tree = new Ext.tree.TreePanel({
		loader : new Ext.tree.TreeLoader({
			dataUrl : 'FuncAuth!getTrees.do?dt='+dt
		}),
		root : root,
		renderTo : 'roleTree',
		border : false,
		autoHeight : false,
		animate : true,// 以动画形式伸展,收缩子节点
		height : 340,
		autoScroll : true
	});
	tree.on('dblclick', function(node) {
		if(node.leaf){
			//若父亲id为空，则此分类为特殊的叶子节点，默认为其本身id
			window.returnValue = node.id;
            window.close();
		}
	});
	tree.on('beforeload', function(node) {
		tree.loader.dataUrl = 'FuncAuth!getTrees.do?parentId='+node.id+'&dt='+dt.getTime();
	});
	tree.on('load', function(node) {
		//若存在搜索，则自动全部展开
	});
	root.expand();
	root.select();
};

var init = function() {
	buildTree();
};
Ext.onReady(init);