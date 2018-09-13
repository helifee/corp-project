var tree;
var initTree = function() {
    
    var root = new Ext.tree.AsyncTreeNode({
        id : 'ROOT_0',
        text : '表单类别',
        expanded : true
    });
    tree = new Ext.tree.TreePanel({
        loader : new Ext.tree.TreeLoader({
            dataUrl : 'FormCt!getFormCtTree.ajax?parentId=' + root.id+'&includeDisabled=true',
            baseAttrs : {
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
    	Ext.getDom("rightFrame").src = "FormDefine!list.do?formCtId="+node.id;
    });
    tree.on('beforeload', function(node) {
        tree.loader.dataUrl = 'FormCt!getFormCtTree.ajax?parentId=' + node.id+'&includeDisabled=true';
    });
	root.expand();
    root.select();
}
function init() {
    initTree();
}
Ext.onReady(init);

function reloadTree(){
	var selectedNode = tree.getSelectionModel().getSelectedNode();
	if(selectedNode){
		var selectedId = selectedNode.id;
		var parentNode = selectedNode.parentNode;
		if(parentNode) {
			parentNode.reload();
		}
		setTimeout(function(){
			var toSelectedNode = tree.getNodeById(selectedId);
			if(toSelectedNode) {
				toSelectedNode.select();
				toSelectedNode.reload();
			}
		},200)
	}

}