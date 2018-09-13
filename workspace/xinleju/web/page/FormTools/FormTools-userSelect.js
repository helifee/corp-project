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
				dataUrl : 'FormTools!getPeTree.ajax?parentId=' + root.id + '&prefix=' + root.attributes.prefix,
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
			tzTree.loader.dataUrl = 'FormTools!getPeTree.ajax?parentId=' + node.id + '&prefix=' + node.attributes.prefix;
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
		var nodePrefix = node.id.substring(0, 5);
		var type = node.attributes.type;
		var b = false;
		if (type == "user" ) {
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
	window.returnValue = getMSelectValue('tzList');
	window.close();
}