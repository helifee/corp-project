var tree;
var buildTree = function(rootId,rootPrefix,rootName) {
    var root = new Ext.tree.AsyncTreeNode({
        id : rootId,
        prefix : rootPrefix,
        text : rootName,
        expanded : true
    });
    
    tree = new Ext.tree.TreePanel({
        loader : new Ext.tree.TreeLoader({
            dataUrl : 'Ct!getTree.ajax?parentId=' + root.id.substring(root.attributes.prefix.indexOf('_')+1) + '&prefix=' + root.attributes.prefix + '&isDisabled=' + $("#isDisabled").val()
            ,baseAttrs : {
				uiProvider : Ext.ux.TreeCheckNodeUI
			}
        }),
        
        root : root,
        renderTo : 'tree',
        border : false,
        autoScroll : false,
        rootVisible : true,
        autoHeight : true,
        width : '100%'
    });
	tree.on('beforeload', function(node) {
		var dt = new Date();
		var nodeIdVar = (node.id).substring(node.attributes.prefix.indexOf('_')+1);
		tree.loader.dataUrl = 'Ct!getTree.ajax?parentId=' + nodeIdVar + '&prefix=' + node.attributes.prefix + '&isDisabled=true&t' + dt.getTime();
	});
	
    
	root.expand();
	root.select();
	tree.loader.on("load",function(node,response){
		root.firstChild.expand();
	});
}
var getObjectIds = function() {
	var selNodes = tree.getChecked();
	var ids = "";
	var names = "";
	Ext.each(selNodes, function(node) {
		ids += isEmpty(ids) ? node.id : ("," + node.id);
		names += isEmpty(names) ? node.text : ("," + node.text);
	});
	return ids + ";" + names;
}
var init = function() {
	var treeRootPrefix = document.getElementById("treeRootPrefix").value;
	var treeRootId = document.getElementById("treeRootId").value;
	var treeRootName = document.getElementById("treeRootName").value;
	buildTree(treeRootPrefix,treeRootId,isEmpty(treeRootName) ? '根节点' : treeRootName);
};
Ext.onReady(init);