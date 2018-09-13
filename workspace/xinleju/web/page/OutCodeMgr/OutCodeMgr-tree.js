var tree;
var initTree = function() {
    
    var root = new Ext.tree.AsyncTreeNode({
        id : 'Ocdf_0',
        prefix : 'Ocdf_',
        text : '工作流外部编码分类',
        expanded : true
    });
    
    tree = new Ext.tree.TreePanel({
        loader : new Ext.tree.TreeLoader({
            dataUrl : 'OutCodeMgr!getOcdTree.ajax?parentId=' + root.id + '&prefix=' + root.attributes.prefix
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
        var ocdId = (node.id).substring(5);
        
        parent.queryOc();
        parent.setDisOrUnDisocdText(node.attributes.isDisabled);
    });
    
    //   tree.on('collapsenode', function(node) {
    //       parent.setHeight('orgnTree');
    //   });
    
    tree.on('beforeload', function(node) {
    	
        var ocdId = (node.id).substring(5);

        tree.loader.dataUrl = 'OutCodeMgr!getOcdTree.ajax?parentId=' + ocdId + '&prefix=' + node.attributes.prefix;
    });
    root.expand();
    root.select();
}

function init() {
    initTree();
    parent.Resize();
}

Ext.onReady(init);

function getSelectedocdId() {
    var node = tree.getSelectionModel().getSelectedNode();
    var ocdId = (node && node.id != 'Ocdf_0') ? node.id.substring(5) : null;
    return ocdId;
}

/**
 * 新建判定条目
 */
function newOcd() {
    var node = tree.getSelectionModel().getSelectedNode();
    var parentId = (node && node.id != 'Ocdf_0') ? node.id.substring(5) : null;
    
    OpenWin('OutCodeMgr!editOcd.do' + (parentId ? '?parentId=' + parentId : ''));
}

/**
 * 编辑判定条目
 */
function editOcd() {
    var node = tree.getSelectionModel().getSelectedNode();
    if (node && node.id != 'Ocdf_0') {
        var id = node.id.substring(5);
        OpenWin('OutCodeMgr!editOcd.do?id=' + id);
    }
}
function disOcd() {
    var node = tree.getSelectionModel().getSelectedNode();
    if (node && node.id != 'Ocdf_0') {
        var id = node.id.substring(5);
        
        //ajax
        $.post('OutCodeMgr!disOcd.do', {
            id : id
        }, function(data) {
            updateTree(data);
        });
    }
}
function unDisOcd() {
    var node = tree.getSelectionModel().getSelectedNode();
    if (node && node.id != 'Ocdf_0') {
        var id = node.id.substring(5);
        
        //ajax
        $.post('OutCodeMgr!unDisOcd.do', {
            id : id
        }, function(data) {
            updateTree(data);
        });
    }
}
/**
 * 
 * 新建判定条目值
 */
var newOc = function() {
    var node = tree.getSelectionModel().getSelectedNode();
    if (node && node.id != 'Ocdf_0') {
        var ocdId = node.id.substring(5);
        OpenWin('OutCodeMgr!editOc.do?ocdId=' + ocdId);
    }
}

/**
 * 
 * 编辑判定条目值
 */
var editOc = function(ocId) {
    
    OpenWin('OutCodeMgr!editOc.do?id=' + ocId);
}

function updateTree(data) {
    var name = data.name;

    var id = data.id;
    var parentId = data.parentId;
    var nodeId = 'Ocdf_' + id;
    
    var node = tree.getNodeById(nodeId);
   
    if (node) {
    	
    	node.attributes.isDisabled = (data.isDisabled == 1) ;
    	
        if (node.attributes.isDisabled) {
            node.setText('<font style=\"color:red\">' + name + '</b>');
        }
        else {
            node.setText(name);
        }
        parent.setDisOrUnDisocdText(node.attributes.isDisabled);
    }
    else {
        parentId = (parentId == null || parentId == '') ? '0' : parentId;

        var parentNodeId = 'Ocdf_' + parentId;
        var parentNode = tree.getNodeById(parentNodeId);
        
        if (parentNode) {
            node = new Ext.tree.TreeNode({
                id : nodeId,
                text : name,
                isDisabled : false,
                leaf : true,
                prefix : 'Ocdf_',
                targetId : id,
                targetName : name
            });
            
            parentNode.appendChild(node);
            if (!parentNode.isExpanded()) {
                parentNode.expand();
            }
        }
    }
    
}