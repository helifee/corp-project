var dt = new Date();
var tree;
var buildTree = function() {
	dt = new Date();
	var root = new Ext.tree.AsyncTreeNode({
		id : '0',
		text : '菜单管理',
		app_code : 'a'
	});
	tree = new Ext.tree.TreePanel({
		loader : new Ext.tree.TreeLoader({
		
			dataUrl : 'Menu!getTrees.do?dt='+dt
		}),
		root : root,
		renderTo : 'roleTree',
		border : false,
		containerScroll: false,
		autoHeight : false,
		animate : true,// 以动画形式伸展,收缩子节点
		autoScroll : false,
		enableDD:false
	});
	tree.on('click', function(node) {
		dt = new Date();
		$("#app").attr("value",node.id.split(":")[2]);
		if (node.id.split(":")[1] == undefined || node.id.split(":")[2] == undefined) {
			Ext.get(document.getElementById("roleframe")).dom.src ="Menu!list.do?dt="+dt;
		} else {
			Ext.get(document.getElementById("roleframe")).dom.src ="Menu!list.do?parentId=" + node.id.split(":")[1]+"&systemCode="+node.id.split(":")[2]+"&dt="+dt;
		}
		
	});
	
	tree.on('beforeload', function(node) {
		dt = new Date();
		if(node.id=='0'){		
			tree.loader.dataUrl = 'Menu!getTrees.do?dt='+dt.getTime();
		}
		else{
			tree.loader.dataUrl = 'Menu!getTrees.do?parentId='+node.id.split(":")[1]+'&systemCode='+node.id.split(":")[2]+'&dt='+dt.getTime();
		}
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