function SelectUserWindow() {
		// 参与者树
		var root = new Ext.tree.AsyncTreeNode({
			id : 'Root_0',
			prefix : 'Root_',
			text : '人员选择',
			expanded : true
		});
		var tzTree = new Ext.tree.TreePanel({
			loader : new Ext.tree.TreeLoader({
				dataUrl : 'FlowWarning!getTree.ajax?parentId=' + root.id + '&prefix=' + root.attributes.prefix,
				baseAttrs : {
					uiProvider : Ext.ux.TreeCheckNodeUI
				}
			}),

			root : root,
			renderTo : 'tz_tree',
			border : true,
			autoScroll : true,
			rootVisible : false,
			height : 300,
			width : '100%'
		});
		tzTree.on('click', function(node) {
			// selectToList();
			node.expand();
			node.select();
		});

		tzTree.on('beforeload', function(node) {
			tzTree.loader.baseParams['q'] = $('#tz_tree_qk').val();
			tzTree.loader.dataUrl = 'FlowWarning!getTree.ajax?parentId=' + node.id + '&prefix=' + node.attributes.prefix;
		});
		root.expand();
		root.select();

		return tzTree;
	}

var queryTree = function(){

	user_win.root.reload(function(){
		var cs_tree_qk = $('#tz_tree_qk').val();
		if(cs_tree_qk != ''){
			user_win.getRootNode().expandChildNodes(false);
		}
	});
}

var selectToCsList = function() {
	var selNodes = user_win.getChecked();
	var ids = [];

	
	Ext.each(selNodes, function(node) {
		var nodePrefix = node.attributes.type;
		if (nodePrefix == 'user' || nodePrefix == 'role' || node.id.indexOf("Role") != -1) {
			if (node.id.substring(5) != 0) {
				var userid = node.id;
				if(node.leaf==true||(node.attributes.type=='user'||node.attributes.type=='role')){
					jsAddItemToSelect('tzList', node.text, userid);
				}else{
					alert("请选择正确的标准角色和人员！！");
				}
			}
		}
	});
};

var initSelect = function() {
	var datas = $("#datas").attr("value");
	if (datas.length > 0) {
		for (var x = 0; x < datas.split(";").length; x++) {
			jsAddItemToSelect('tzList', datas.split(";")[x].split(":")[1], datas.split(";")[x].split(":")[0]);
		}
	}
}

var save = function() {
	// Part_910:总经理;Part_911:董事长;User_938:tyx;Part_912:董事长秘书
	var datas = getMSelectValue('tzList');
	if (datas.length == 0) {
		alert("请选择通知人!");
		return;
	}
	var names = "";
	if (datas.length > 0) {
		for (var x = 0; x < datas.split(";").length; x++) {
			names += datas.split(";")[x].split(":")[1] + ",";
		}
	}
	if (names.length > 0) {
		names = names.substring(0,names.length-1);
	}
	var opType = $("#opType").attr("value");
	if (opType == 1) {
		opener.document.getElementById("noNoticeUsers").value = datas;
		opener.document.getElementById("selectNoNoticeUsers").value = names;
	} else {
		opener.document.getElementById("noticeUsers").value = datas;
		opener.document.getElementById("selectUsers").value = names;
	}
	alert("保存成功!");
	window.close();
}