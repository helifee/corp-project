var tree;
var initTree = function() {
    
    var root = new Ext.tree.AsyncTreeNode({
        id : 'ROOT_0',
        text : '公告类别',
        expanded : true
    });
    tree = new Ext.tree.TreePanel({
        loader : new Ext.tree.TreeLoader({
            dataUrl : 'NoticeType!getTypeTree.ajax?parentId=' + root.id+'&includeDisabled=false'+'&includeTemplate=true',
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
    tree.on('beforeload', function(node) {
        tree.loader.dataUrl = 'NoticeType!getTypeTree.ajax?parentId=' + node.id+'&includeDisabled=false'+'&includeTemplate=true';
    });
	root.expand();
    root.select();
}
function init() {
    initTree();
}
Ext.onReady(init);

function select() {
	var selectedNode = tree.getSelectionModel().getSelectedNode();
	if(selectedNode){
		var selectedId = selectedNode.id;
		var selectedName = selectedNode.text;
		var noticeTemplateId=selectedId.substring(selectedId.indexOf("_")+1);
		var noticeTemplateName=selectedName.substring(selectedName.indexOf("_")+1);
		
		var noticetype=selectedId.substring(0,selectedId.indexOf("_"));
		if(noticetype=="NOTICETYPE"){
			alert("请选择模板");
		}else{
			window.opener.document.getElementById("noticeTemplateId").value=noticeTemplateId;
			window.opener.document.getElementById("noticeTemplateName").value=noticeTemplateName;
			window.close();
		}
		
	}
	
}
