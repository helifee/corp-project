var dt = new Date();
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
            dataUrl : 'CateMgr!getCateTree.ajax?parentId=' + root.id + '&prefix=' + root.attributes.prefix + '&isdisabled=' + getStatus()
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
        $('#cateMgrDtoCtId').val(cateId);
        query();
    });
    tree.on('beforeload', function(node) {
        var cateId = (node.id).substring(5);
        tree.loader.dataUrl = 'CateMgr!getCateTree.ajax?parentId=' + cateId + '&prefix=' + node.attributes.prefix + '&isdisabled=' + getStatus();
    });
    var selectPath = $('#selectPath').val();
    if(selectPath!=null&&selectPath!=''){
    	tree.selectPath(selectPath,'id',setDisOrUnDisCateText);
    }
    else{
    	root.expand();
        root.select();
    }
}

function init() {
	$("#disOrUnDis").hide();
    initTree();
    Resize();
}

Ext.onReady(init);
var refreshTree=function(id){
	if(isEmpty(id)){
		tree.getRootNode().reload();
	}else{
		var node = tree.getSelectionModel().getSelectedNode();
		if (null != node){
			node.reload();
		} else {
			tree.getRootNode().reload();
		}
	}
}
var query = function(start){
	if (start && start >= 0) {
		document.getElementsByName('start')[0].value = start;
	}
	$('body').mask("数据查询中...");
	$("#frm").submit();
}
var queryAndRefreshTree = function(start, id){
	this.query(start);
	this.refreshTree(id);
}
function getStatus(){
	var status = '';
	if ($('#cateMgrDto_status')){
		status = $('#cateMgrDto_status').val();
	}
	return status;
}
/**
 * 新建判定条目
 */
function newCate() {
    var node = tree.getSelectionModel().getSelectedNode();
    var parentId = (node && node.id != 'Cate_0') ? node.id.substring(5) : null;
    window.open('CateMgr!editCate.do' + (parentId ? '?parentId=' + parentId : ''), 'win_' + dt.getTime(), opts);
}

/**
 * 编辑判定条目
 */
function editCate() {
    var node = tree.getSelectionModel().getSelectedNode();
    if (node && isNotEmpty(node.id) && node.id != 'Cate_0') {
        var id = node.id.substring(5);
        window.open('CateMgr!editCate.do?id=' + id, 'win_' + dt.getTime(), opts);
    }
}
function disCate() {
    var node = tree.getSelectionModel().getSelectedNode();
    if (node && isNotEmpty(node.id) && node.id != 'Cate_0') {
        var id = node.id.substring(5);
        updateCate(1,id)
    } else {
    	alert("请选择判定条目进行操作！");
		return;
    }
}
function unDisCate() {
    var node = tree.getSelectionModel().getSelectedNode();
    if (node && isNotEmpty(node.id) && node.id != 'Cate_0') {
        var id = node.id.substring(5);
        updateCate(0,id)
    } else {
    	alert("请选择判定条目进行操作！");
		return;
    }
}
/**
 * 
 * 新建判定条目值
 */
var newCateVal = function() {
    var node = tree.getSelectionModel().getSelectedNode();
    if (node && isNotEmpty(node.id) && node.id != 'Cate_0') {
        var cateId = node.id.substring(5);
        window.open('CateMgr!editCateVal.do?cateId=' + cateId, 'win_' + dt.getTime(), opts);
    }
}

/**
 * 
 * 编辑判定条目值
 */
var editCateVal = function() {
	var ids = getCheckBoxValues("ids");
	if(!ids) {
		alert("请选择一条记录进行操作！");
		return;
	} else if (ids.indexOf(';') > 0){
		alert("请选择一条记录进行操作！");
		return;
	} else {
		window.open('CateMgr!editCateVal.do?id=' + ids, 'win_' + dt.getTime(), opts);
	}
}
function setDisOrUnDisCateText() {
	var node = tree.getSelectionModel().getSelectedNode();
	if (node && isNotEmpty(node.id) && node.id != 'Cate_0') {
		var isDisabled = node.attributes.isDisabled;
		if (isDisabled) {
			$("#disOrUnDis").html('启用判定条目');
			$("#disOrUnDis").unbind("click");
			$("#disOrUnDis").bind("click", unDisCate);
			$("#disOrUnDis").addClass("t_submit");
			$("#disOrUnDis").show();
		} else {
			$("#disOrUnDis").html('禁用判定条目');
			$("#disOrUnDis").unbind("click");
			$("#disOrUnDis").bind("click", disCate);
			$("#disOrUnDis").addClass("t_del");
			$("#disOrUnDis").show();
		}
	} else {
		$("#disOrUnDis").hide();
		$("#editPdTm").hide();
	}
}
var updateCate = function(isdisabled,ids) {
	var dealName = "";
	if (isdisabled == 1){
		dealName = "禁用";
	} else {
		dealName = "启用";
	}
	var dt = new Date();
	if(!ids) {
		alert("请选择判定条目进行操作！");
		return;
	}
	if(window.confirm("确认要" + dealName + "吗？")) {
		$('body').mask(dealName + "中...");
		$.ajax({
			type : "POST",
			url : "CateMgr!updateCate.do",
			data : {ids:ids, isdisabled : isdisabled,t:dt.getTime()},
			dataType : "json",
			success : function(data, textStatus, jqXHR) {
				$('body').unmask();
				if (data && data.success) {
					alert(dealName + "成功！");
					queryAndRefreshTree();
				} else {
					alert(dealName + "失败！");
				}
			},
			error : function(jqXHR, textStatus, errorThrown) {
				$('body').unmask();
				alert(dealName + "失败！");
			}
		});
	}
};
var updateCateVal = function(isdisabled) {
	var dealName = "";
	if (isdisabled == 1){
		dealName = "禁用";
	} else {
		dealName = "启用";
	}
	var dt = new Date();
	// document.getElementById('cateValList').contentWindow.document
	var ids = getCheckBoxValues("ids");
	if(!ids) {
		alert("请选择一条记录进行操作！");
		return;
	}
	if(window.confirm("确认要" + dealName + "吗？")) {
		$('body').mask(dealName + "中...");
		$.ajax({
			type : "POST",
			url : "CateMgr!updateCateVal.do",
			data : {ids:ids, isdisabled : isdisabled,t:dt.getTime()},
			dataType : "json",
			success : function(data, textStatus, jqXHR) {
				$('body').unmask();
				if (data && data.success) {
					alert(dealName + "成功！");
					query();
				} else {
					alert(dealName + "失败！");
				}
			},
			error : function(jqXHR, textStatus, errorThrown) {
				$('body').unmask();
				alert(dealName + "失败！");
			}
		});
	}
};