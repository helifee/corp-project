var dt = new Date();
var tree;
var userRoleFlag = true;
var buildTree = function(partyStructTypeId) {
	dt = new Date();
	var root = new Ext.tree.AsyncTreeNode({
		id : '0',
		text : '组织架构'
	});
	tree = new Ext.tree.TreePanel({
		loader : new Ext.tree.TreeLoader({
			dataUrl : 'User!getTrees.do?dt='+dt+'&partyStructTypeId='+partyStructTypeId
		}),
		root : root,
		renderTo : 'partyTree',
		border : false,
		containerScroll: false,
		rootVisible:false,
		autoHeight : false,
		animate : true,// 以动画形式伸展,收缩子节点
		autoScroll : false,
		enableDD:false
	});
	tree.on('click', function(node) {
		dt = new Date();
		if(userRoleFlag){
			Ext.get(document.getElementById("user_frame")).dom.src ="User!structUserList.do?limit=10&parentEntityId=" + node.id+ "&partyStructTypeId="+node.attributes.partyStructTypeId+"&dt="+dt;
		}else{
			Ext.get(document.getElementById("user_frame")).dom.src ="User!roleList.do?limit=10&parentEntityId=" + node.id+ "&partyStructTypeId="+node.attributes.partyStructTypeId+"&dt="+dt;
		}
		
	});
	
	tree.on('beforeload', function(node) {
		dt = new Date();
		var partyStructTypeId = document.getElementById("currentStructTypeId").value;
		if(node.partyStructTypeId=='undefined'||node.partyStructTypeId==''||node.partyStructTypeId==null||node.partyStructTypeId==0){
			node.partyStructTypeId = partyStructTypeId;
		}
		tree.loader.dataUrl = 'User!getTrees.do?parentEntityId='+node.id+'&partyStructTypeId='+node.partyStructTypeId+'&dt='+dt.getTime();
	});
 
	root.expand();
	root.select();
	tree.loader.on("load",function(node,response){
		root.firstChild.expand();
		 });
};

var refreshTree=function (id){
	//tree.root.reload();
	tree.getNodeById(id).reload();
}

var init = function() {
	var partyStructTypeId = document.getElementById("currentStructTypeId").value;
	buildTree(partyStructTypeId);
};
 
Ext.onReady(init);

function autoH(){
	setAutoHeight('user_frame',0);
}