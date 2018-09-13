var dt = new Date();
var tree;
var buildTree = function() {
	dt = new Date();
	var root = new Ext.tree.AsyncTreeNode({
		id : '0',
		text : '标准角色',
		expanded: true
	});
	tree = new Ext.tree.TreePanel({
		loader : new Ext.tree.TreeLoader({
			dataUrl : 'Role!getTrees.do?dt='+dt+"&show=enable"
		}),
		root : root,
		renderTo : 'roleTree',
		border : false,
		autoHeight : false,
		animate : true,// 以动画形式伸展,收缩子节点
		autoScroll : true
	});
	tree.on('dblclick', function(node) {
		
		if(node.leaf==true){
			dt = new Date();
			var partyStructTypeId = $('#partyStructTypeId').val();
			var parentEntityId = $('#parentEntityId').val();	
			$('body').mask('操作中...');
			$.post('PartyStruct!joinRole.do?partyStructTypeId='+partyStructTypeId+'&roleId='+node.id+'&parentEntityId='+parentEntityId, $('#frm').serialize(), function(data) {
				$('body').unmask();
				if(data.result=='success'){
					Ext.get(document.getElementById("role_frame")).dom.src ="PartyStruct!unionRoleList.do?parentId="+parentEntityId+"&partyStructTypeId="+partyStructTypeId;
					//window.opener.location.reload();
				}else{
					alert("已有添加过此角色");
				}
				
			});
			
		}else{
			alert("不可添加此节点");
		}
		//
		
	});
	
	tree.on('beforeload', function(node) {
		dt = new Date();
		 
		tree.loader.dataUrl = 'Role!getTrees.do?show=enable&parentId='+node.id+'&dt='+dt.getTime();
	});
	tree.expand();
	 
};

var refreshTree=function (id){
	//tree.root.reload();
	tree.getNodeById(id).reload();
	
}

var init = function() {
	buildTree();
	 
};
 
Ext.onReady(init);