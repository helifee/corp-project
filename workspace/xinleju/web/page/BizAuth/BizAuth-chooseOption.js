var dt = new Date();
var tree;
var root;
var buildTree = function() {
	var scopeId = $("#scopeId").attr("value");
	root = new Ext.tree.AsyncTreeNode({
		id : '0',
		text : '标准分类'
	});
	tree = new Ext.tree.TreePanel({
		loader : new Ext.tree.TreeLoader({
			dataUrl : 'BizAuth!getScopeOptionTree.ajax?scopeId='+ scopeId +'&dt='+dt
			//dataUrl : 'http://192.168.10.251/test/dataauth.jsp?dt='+dt
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
		if(node.id != this.getRootNode().id) {
			//若父亲id为空，则此分类为特殊的叶子节点，默认为其本身id
			Ext.get(document.getElementById("role_frame")).dom.contentWindow.sc.addRole(node.attributes["code"] , node.text, node.attributes.leaf);
		}
	});
	tree.on('beforeload', function(node) {
		tree.loader.dataUrl = 'BizAuth!getScopeOptionTree.do?parentId='+node.id+'&scopeId='+ scopeId +'&dt='+dt.getTime();
		//tree.loader.dataUrl = 'http://192.168.10.251/test/dataauth.jsp?parentId='+node.id +'&dt='+dt.getTime();
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