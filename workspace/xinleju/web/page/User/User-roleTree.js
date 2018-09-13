var dt = new Date();
var tree;
var currentNode;

var buildTree = function(partyStructTypeId) {
	dt = new Date();
	var root = new Ext.tree.AsyncTreeNode({
		id : '0',
		text : '组织架构'
	});
	tree = new Ext.tree.TreePanel({
		loader : new Ext.tree.TreeLoader({
			dataUrl : 'PartyEntity!getTrees.do?dt='+dt+'&partyStructTypeId='+partyStructTypeId
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
			addRole(node.attributes.refId);
		}else{
			node.expand();
		}
	});
	
	tree.on('beforeload', function(node) {
		dt = new Date();
		if(node.partyStructTypeId=='undefined'||node.partyStructTypeId==''||node.partyStructTypeId==null||node.partyStructTypeId==0){
			node.partyStructTypeId = partyStructTypeId;
		}
		 
		tree.loader.dataUrl = 'PartyEntity!getTrees.do?parentEntityId='+node.id+'&partyStructTypeId='+node.partyStructTypeId+'&dt='+dt.getTime();
	});
	
    
	root.expand();
	root.select();
	tree.loader.on("load",function(node,response){
		root.firstChild.expand();
		 });
};
 
 
function addRole(roleId){
	
	var partyStructTypeId = $("#currentStructTypeId").val();
	var userId = $("#userId").val();
	$('body').mask('操作中...');
	$.post('User!addRole.do?roleId='+roleId+'&userId='+userId+'&partyStructTypeId='+partyStructTypeId, $('#frm').serialize(), function(data) {
		$('body').unmask();
		if(data.result=='success'){
			window.parent.refreshR();
		}else{
			alert("已有此角色，不可添加");
		}
	});
	
}
 

var init = function() {
	var currentStructTypeId = document.getElementById("currentStructTypeId").value;
	buildTree(currentStructTypeId);
	 
};
 
Ext.onReady(init);
 