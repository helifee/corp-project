 var tree;
 var initTree = function() {
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
            checkModel : 'single',
            root : root,
            renderTo : 'tree',
            border : true,
            autoScroll : true,
            rootVisible : false,
            height : 300,
            width : '100%'
        });
        tree.on('click', function(node) {
            // selectToList();
            node.expand();
            node.select();
        });
        
        tree.on('beforeload', function(node) {

        	tree.loader.baseParams['q'] = $('#users_tree_qk').val();
        	
            tree.loader.dataUrl = 'Participant!getTree.ajax?parentId=' + node.id + '&prefix=' + node.attributes.prefix + '&t=' + new Date().getTime();
        });
        root.expand();
        root.select();
 }      
        
function init() {
	    initTree();
}
Ext.onReady(init);



function selectPaticipant(nameDom,idDom){
	var checkedNodes = tree.getChecked();
	if(checkedNodes&&checkedNodes.length>0) {
		var checkNode = checkedNodes[0];
		var id = checkNode.id;
		var name = checkNode.text;
		window.opener.document.getElementById(nameDom).value = name;
		window.opener.document.getElementById(idDom).value = id;
		window.close();
	}else{
		alert("请选择参与人！");
	}
	
}
