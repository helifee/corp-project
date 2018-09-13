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
			dt = new Date();
			$('body').mask("操作中...");
			$.ajax({
				type : "POST",
				url : 'PartyEntity!getFullName.do',
				data : {partyEntityId:node.id},
				dataType : "json",
				success : function(data) {
					$('body').unmask();
					if(data && data.result){
						window.parent.chooseRole(data.result,node.attributes.refId);
					}else{
						window.parent.chooseRole(node.text,node.attributes.refId);
					}
				},
				error : function(jqXHR, textStatus, errorThrown) {
					$('body').unmask();
					alert("网络故障！");
				}
			});
		}else{
//			alert("不可选中此节点");
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



var init = function() {
	var currentStructTypeId = document.getElementById("currentStructTypeId").value;
	buildTree(currentStructTypeId);
};

Ext.onReady(init);