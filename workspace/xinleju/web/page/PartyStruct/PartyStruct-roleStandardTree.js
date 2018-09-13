var dt = new Date();
var tree;
var currentNode;

var buildTree = function(partyStructTypeId) {
	dt = new Date();
	var show = 'disEnable';
	var root = new Ext.tree.AsyncTreeNode({
		id : '0',
		text : '组织架构'
	});
	tree = new Ext.tree.TreePanel({
		loader : new Ext.tree.TreeLoader({
			dataUrl : 'Role!getTrees.do?show=' + show + '&dt='+dt
		}),
		root : root,
		renderTo : 'partyTree',
		rootVisible:false,
		containerScroll: false,
		border : false,
		autoHeight : false,
		animate : true,// 以动画形式伸展,收缩子节点
		autoScroll : false

	});
	tree.on('click', function(node) {
		if(node.leaf==true){	
			window.parent.roleStandard(node.text,node.id);
		}else{
//			alert("不可选中此节点");
			node.expand();
		}
	});
	
	tree.on('beforeload', function(node) {
		dt = new Date();
		tree.loader.dataUrl = 'Role!getTrees.do?show=' + show + '&parentId='+node.id+'&dt='+dt.getTime();
	});


	root.expand();
	root.select();
	tree.loader.on("load",function(node,response){
		root.firstChild.expand();
	});
};



var init = function() {
	var currentStructTypeId = document.getElementById("currentStructTypeId").value;
	buildTree(currentStructTypeId);
};

Ext.onReady(init);