var tree;
var initTree = function() {
    
    var root = new Ext.tree.AsyncTreeNode({
        id : 'ROOT_0',
        text : '公告类别',
        expanded : true
    });
    tree = new Ext.tree.TreePanel({
        loader : new Ext.tree.TreeLoader({
            dataUrl : 'NoticeType!getAllNoticeTypeTree.ajax?parentId=' + root.id+'&includeDisabled=true'+'&includeTemplate=false',
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
    	var idStr = node.id;
    	var parentId = idStr.substring(idStr.indexOf("_")+1);
    	Ext.getDom("rightFrame").src = "NoticeTemplate!list.do?noticeTypeId="+parentId;
    });
    tree.on('beforeload', function(node) {
        tree.loader.dataUrl = 'NoticeType!getAllNoticeTypeTree.ajax?parentId=' + node.id+'&includeDisabled=true'+'&includeTemplate=false';
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