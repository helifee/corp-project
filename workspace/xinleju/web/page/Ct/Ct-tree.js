var tree;
var initTree = function() {
    
    var root = new Ext.tree.AsyncTreeNode({
        id : 'Root_0',
        prefix : 'Root_',
        text : '根节点',
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
        rootVisible : false,
        autoHeight : true,
        width : '100%'
    });
    tree.on('click', function(node) {
        var ctId = (node.id).substring(node.attributes.prefix.indexOf('_')+1);
        var prefixVar = node.attributes.prefix;
        $('#ctId',window.parent.document).val('');
        $('#appId',window.parent.document).val('');
        $('#serviceObjectDefineId',window.parent.document).val('');
        var objDomId = 'ctId';
        if (prefixVar == 'App_'){
        	objDomId = 'appId';
        } else if(prefixVar == 'Object_'){
        	objDomId = 'serviceObjectDefineId';
        }
        $('#'+objDomId,window.parent.document).val(ctId);
        parent.queryFlow();
    });
    tree.on('beforeload', function(node) {
    	
        var ctId = (node.id).substring(node.attributes.prefix.indexOf('_')+1);
        var isDisabled = $("#isDisabled").val();
        tree.loader.dataUrl = 'Ct!getTree.ajax?parentId=' + ctId + '&prefix=' + node.attributes.prefix + '&isDisabled='+isDisabled;
    });
    
    var selectPath = $('#selectPath').val();
    if(selectPath!=null&&selectPath!=''){
    	tree.selectPath(selectPath,'id');
    }
    else{
    	root.expand();
        root.select();
    }
    
}

function init() {
    initTree();
    //parent.Resize();
}

Ext.onReady(init);

function getSelectedCtId() {
    var node = tree.getSelectionModel().getSelectedNode();
    var cateId = (node && node.id != 'Cate_0') ? node.id.substring(5) : null;
    return cateId;
}

/**
 * 新建子部门
 */
function newCt() {
    var node = tree.getSelectionModel().getSelectedNode();
   
    var parentId = (node && node.id != 'Cate_0') ? node.id.substring(5) : null;
    
    OpenWin('Ct!edit.do' + (parentId ? '?parentId=' + parentId : ''));
}

/**
 * 编辑
 */
function editCt() {
    var node = tree.getSelectionModel().getSelectedNode();
    if (node && node.id != 'Catet_0') {
        var id = node.id.substring(5);
        OpenWin('Ct!edit.do?id=' + id);
    }
}
function disCt() {
    var node = tree.getSelectionModel().getSelectedNode();
    if (node && node.id != 'Cate_0') {
        var id = node.id.substring(5);
        
        //ajax
        $.post('Ct!disCt.do', {
            id : id
        }, function(data) {
            updateTree(data);
        });
    }
}
function unDisCt() {
    var node = tree.getSelectionModel().getSelectedNode();
    if (node && node.id != 'Cate_0') {
        var id = node.id.substring(5);
        
        //ajax
        $.post('Ct!unDisCt.do', {
            id : id
        }, function(data) {
            updateTree(data);
        });
    }
}
/**
 * 
 * 新建用户
 */
var newCtVal = function() {
    var node = tree.getSelectionModel().getSelectedNode();
    if (node && node.id != 'Cate_0') {
        var cateId = node.id.substring(5);
        OpenWin('cate_val!edit.do?cateId=' + cateId);
    }
}

/**
 * 
 * 编辑用户
 */
var editCtVal = function(cateValId) {
    
    OpenWin('cate_val!edit.do?id=' + cateValId);
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
            node.setText('<font style=\"color:red\">' + name + '</font>');
        }
        else {
            node.setText(name);
        }
        parent.setDisOrUnDisCtText(node.attributes.isDisabled);
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