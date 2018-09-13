var tree;
var initTree = function() {
    
    var root = new Ext.tree.AsyncTreeNode({
        id : 'Cate_0',
        prefix : 'Cate_',
        text : '判定条目树',
        expanded : true
    });
    
    tree = new Ext.tree.TreePanel({
        loader : new Ext.tree.TreeLoader({
            dataUrl : 'CateMgr!getCateTree.ajax?parentId=' + root.id + '&prefix=' + root.attributes.prefix
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
        var cateId = (node.id).substring(5);
        
        parent.queryCateVal();
        parent.setDisOrUnDisCateText(node.attributes.isDisabled);
    });
    
    //   tree.on('collapsenode', function(node) {
    //       parent.setHeight('orgnTree');
    //   });
    
    tree.on('beforeload', function(node) {
    	
        var cateId = (node.id).substring(5);

        tree.loader.dataUrl = 'CateMgr!getCateTree.ajax?parentId=' + cateId + '&prefix=' + node.attributes.prefix;
    });
    root.expand();
    root.select();
}

function init() {
    initTree();
    parent.Resize();
}

Ext.onReady(init);

function getSelectedCateId() {
    var node = tree.getSelectionModel().getSelectedNode();
    var cateId = (node && node.id != 'Cate_0') ? node.id.substring(5) : null;
    return cateId;
}

/**
 * 新建判定条目
 */
function newCate() {
    var node = tree.getSelectionModel().getSelectedNode();
    var parentId = (node && node.id != 'Cate_0') ? node.id.substring(5) : null;
    
    OpenWin('CateMgr!editCate.do' + (parentId ? '?parentId=' + parentId : ''));
}

/**
 * 编辑判定条目
 */
function editCate() {
    var node = tree.getSelectionModel().getSelectedNode();
    if (node && node.id != 'Cate_0') {
        var id = node.id.substring(5);
        OpenWin('CateMgr!editCate.do?id=' + id);
    }
}
function disCate() {
    var node = tree.getSelectionModel().getSelectedNode();
    if (node && node.id != 'Cate_0') {
        var id = node.id.substring(5);
        
        //ajax
        $.post('CateMgr!disCate.do', {
            id : id
        }, function(data) {
            updateTree(data);
        });
    }
}
function unDisCate() {
    var node = tree.getSelectionModel().getSelectedNode();
    if (node && node.id != 'Cate_0') {
        var id = node.id.substring(5);
        
        //ajax
        $.post('CateMgr!unDisCate.do', {
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
var newCateVal = function() {
    var node = tree.getSelectionModel().getSelectedNode();
    if (node && node.id != 'Cate_0') {
        var cateId = node.id.substring(5);
        OpenWin('CateMgr!editCateVal.do?cateId=' + cateId);
    }
}

/**
 * 
 * 编辑判定条目值
 */
var editCateVal = function(cateValId) {
    
    OpenWin('CateMgr!editCateVal.do?id=' + cateValId);
}

function updateTree(data) {
    var name = data.name;

    var id = data.id;
    var parentId = data.parentId;
    var nodeId = 'Cate_' + id;
    
    var node = tree.getNodeById(nodeId);
   
    if (node) {
    	
    	node.attributes.isDisabled = (data.isDisabled == 1) ;
    	
        if (node.attributes.isDisabled) {
            node.setText('<font style=\"color:red\">' + name + '</b>');
        }
        else {
            node.setText(name);
        }
        parent.setDisOrUnDisCateText(node.attributes.isDisabled);
    }
    else {
        parentId = (parentId == null || parentId == '') ? '0' : parentId;

        var parentNodeId = 'Cate_' + parentId;
        var parentNode = tree.getNodeById(parentNodeId);
        
        if (parentNode) {
            node = new Ext.tree.TreeNode({
                id : nodeId,
                text : name,
                isDisabled : false,
                leaf : true,
                prefix : 'Cate_',
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