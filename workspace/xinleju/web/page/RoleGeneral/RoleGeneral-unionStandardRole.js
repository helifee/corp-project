var dt = new Date();
var tree;
$(document).ready(function() {
	if ( selRole && selRole.length > 0 ) {
		var selRoleLst = selRole.split(";");
		for (var idx = 0; idx < selRoleLst.length; idx++ ) {
			var id = selRoleLst[idx].split("_")[0];
			var text = selRoleLst[idx].split("_")[1];
			$("#paticipantList").append($("<option value='" + id + "'>" + text + "</option>"));
			
		}
	}
});


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
			if ( checkIsExist(node.id) ) {
				alert("已经存在该角色成员，不能重复选择!");
			} else {
				$("#paticipantList").append($("<option value='" + node.id + "'>" + node.text + "</option>"));
			}
		}else{
			node.expand();
		}
	});
	
	tree.on('beforeload', function(node) {
		dt = new Date();
		 
		tree.loader.dataUrl = 'Role!getTrees.do?show=enable&parentId='+node.id+'&dt='+dt.getTime();
	});
	tree.expand();
	 
};

function checkIsExist(id) {
	return $("#paticipantList option[value='" + id + "']").length > 0;
}

function removeSelRole() {
	$("#paticipantList option:selected").remove();
}

function moveUp() {
	$('#paticipantList option:selected').insertBefore($('#paticipantList option:selected').prev('option'));
}

function moveDown() {
	$('#paticipantList option:selected').insertAfter($('#paticipantList option:selected').next('option'));
}

function setSelRole() {
	var selRoles = "";
	$("#paticipantList option").each(function(){
		if (selRoles.length > 0) {
			selRoles += ";"
		}

		selRoles += this.value + "_" + this.text;
	});
	
	window.opener.setStandardRole(selRoles);
	window.close();
}

var refreshTree=function (id){
	tree.getNodeById(id).reload();
	
}

var init = function() {
	buildTree();
	 
};
 
Ext.onReady(init);