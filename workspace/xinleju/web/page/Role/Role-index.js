var dt = new Date();
var tree;
var buildTree = function() {
	var show = 'disEnable';
	dt = new Date();
	var root = new Ext.tree.AsyncTreeNode({
		id : '0',
		text : '标准角色'
	});
	tree = new Ext.tree.TreePanel({
		loader : new Ext.tree.TreeLoader({
			dataUrl : 'Role!getTrees.do?show=' + show + '&dt='+dt
		}),
		root : root,
		renderTo : 'roleTree',
		border : false,
		containerScroll: false,
		//rootVisible:false,
		autoHeight : false,
		animate : true,// 以动画形式伸展,收缩子节点
		autoScroll : false
//		enableDD:true
	});
	tree.on('click', function(node) {
		dt = new Date();
		$("#parentId").attr("value",node.id)
		Ext.get(document.getElementById("roleframe")).dom.src ="Role!list.do?parentId=" + node.id+"&dt="+dt;
		
	});
	
	tree.on('beforeload', function(node) {
		dt = new Date();
		tree.loader.dataUrl = 'Role!getTrees.do?show=' + show + '&parentId='+node.id+'&dt='+dt.getTime();
	});
	tree.on("nodedragover", function(e){ 
		var node = e.target; 
		if(node.leaf) 
		node.leaf=false; 
		return true; 
	}); 
	root.expand();
	root.select();
};

var refreshTree=function (id){
	tree.getNodeById(id).reload();
}

var init = function() {
	buildTree();
};
 
Ext.onReady(init);