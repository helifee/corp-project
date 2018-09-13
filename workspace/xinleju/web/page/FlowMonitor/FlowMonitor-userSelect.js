function SelectUserWindow() {
		var opType = $("#opType").attr("value");
		// 参与者树
		var root = new Ext.tree.AsyncTreeNode({
			id : 'Root_0',
			prefix : 'Root_',
			text : '人员选择',
			expanded : true
		});
		var tzTree = new Ext.tree.TreePanel({
			loader : new Ext.tree.TreeLoader({
				dataUrl : 'FlowMonitor!getTree.ajax?parentId=' + root.id + '&prefix=' + root.attributes.prefix + "&opType=" + opType,
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
			tzTree.loader.dataUrl = 'FlowMonitor!getTree.ajax?parentId=' + node.id + '&prefix=' + node.attributes.prefix + "&opType=" + opType;
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

	var opType = $("#opType").attr("value");
	Ext.each(selNodes, function(node) {
		var nodePrefix = node.id.substring(0, 5);
		var type = node.attributes.type;
		var b = false;
		if ((opType == 1 || opType == 3) && (nodePrefix == 'Role_' || type == "user" || type == "role")) {
			b = true;
		}
		if (opType == 2 && (nodePrefix == 'Role_' || nodePrefix == 'Brch_' || type == "user" || type == "department" || type == "role")) {
			b = true;
		}
		
		if (b) {
			jsAddItemToSelect('tzList', node.text, node.id);
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
	//if (datas.length == 0) {
	//	alert("请选择通知人!");
	//	return;
	//}
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
		opener.document.getElementById("monitor").value = datas;
		opener.document.getElementById("selectMonitor").value = names;
	} else if (opType == 2) {
		opener.document.getElementById("beMonitored").value = datas;
		opener.document.getElementById("selectBeMonitored").value = names;
	} else {
		opener.document.getElementById("suspend").value = datas;
		opener.document.getElementById("selectSuspend").value = names;
	}
	alert("保存成功!");
	window.close();
}