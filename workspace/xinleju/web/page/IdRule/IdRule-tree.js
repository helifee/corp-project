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
            dataUrl : 'IdRule!getTree.ajax?parentId=t' + (new Date()).getTime()
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
    tree.on('click', function(node) {
    	document.getElementById("objectId").value = node.attributes.code;
    	document.getElementById("objectName").value = node.attributes.text;
	});
	tree.on('beforeload', function(node) {
		var dt = new Date();
		var nodeIdVar = (node.id).substring(node.attributes.prefix.indexOf('_')+1);
		tree.loader.dataUrl = 'Ct!getTree.ajax?parentId=' + nodeIdVar + '&prefix=' + node.attributes.prefix + '&t' + dt.getTime();
	});
	
    
	root.expand();
	root.select();
	tree.loader.on("load",function(node,response){
		root.firstChild.expand();
	});
}
var getObjectIdName = function() {
	var objectId = document.getElementById("objectId").value;
	var objectName = document.getElementById("objectName").value;
	return objectId + ";" + objectName;
}
var init = function() {
	var treeRootPrefix = document.getElementById("treeRootPrefix").value;
	var treeRootId = document.getElementById("treeRootId").value;
	var treeRootName = document.getElementById("treeRootName").value;
	buildTree(treeRootPrefix,treeRootId,isEmpty(treeRootName) ? '编号规则' : treeRootName);
};
Ext.onReady(init);