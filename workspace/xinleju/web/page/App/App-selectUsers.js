
var init = function (){
	Ext.BLANK_IMAGE_URL = 'js/ext/resources/images/default/s.gif';
	
	buildTree();
}
var buildTree = function() {
	
	// 参与者树
	var root = new Ext.tree.AsyncTreeNode({
		id : 'Root_0',
		prefix : 'Root_',
		text : '人员选择',
		expanded : true
	});
	tree = new Ext.tree.TreePanel({
		loader : new Ext.tree.TreeLoader({
			dataUrl : 'Participant!getTree.ajax?parentId=' + root.id + '&prefix=' + root.attributes.prefix + '&t=' + new Date().getTime(),
			baseAttrs : {
				uiProvider : Ext.ux.TreeCheckNodeUI
			}
		}),

		root : root,
		renderTo : 'users_tree',
		border : true,
		autoScroll : true,
		rootVisible : false,
		height : 270,
		width : '100%'
	});
	tree.on('click', function(node) {
		// selectToList();
		node.expand();
		node.select();
	});

	tree.on('beforeload', function(node) {

		//tree.loader.baseParams['q'] = $('#users_tree_qk').val();

		tree.loader.dataUrl = 'Participant!getTree.ajax?parentId=' + node.id + '&prefix=' + node.attributes.prefix + '&t='
			+ new Date().getTime();
	});
	root.expand();
	root.select();

	return tree;
}

Ext.onReady(init);