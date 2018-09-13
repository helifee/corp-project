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
        $('#ctId',window.document).val('');
        $('#appId',window.document).val('');
        $('#serviceObjectDefineId',window.document).val('');
        var objDomId = 'ctId';
        if (prefixVar == 'App_'){
        	objDomId = 'appId';
        } else if(prefixVar == 'Object_'){
        	objDomId = 'serviceObjectDefineId';
        }
        $('#'+objDomId,window.document).val(ctId);
        queryFlow();
    });
    tree.on('beforeload', function(node) {
    	
        var ctId = (node.id).substring(node.attributes.prefix.indexOf('_')+1);
        var isDisabled = $("#isDisabled").val();
        tree.loader.dataUrl = 'Ct!getTree.ajax?parentId=' + ctId + '&prefix=' + node.attributes.prefix + '&isDisabled='+isDisabled;
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
    initTree();
}
Ext.onReady(init);

function setDisOrUnDisCateText() {
	var node = tree.getSelectionModel().getSelectedNode();
	if (node && isNotEmpty(node.id) && node.attributes.prefix.indexOf('Cate_') >= 0 && node.id != 'Cate_0') {
		var isDisabled = node.attributes.isDisabled;
		if (isDisabled) {
			$("#disOrUnDis").html('启用');
			$("#disOrUnDis").unbind("click");
			$("#disOrUnDis").bind("click", unDisCt);
			$("#disOrUnDis").addClass("t_submit");
			
		} else {
			$("#disOrUnDis").html('禁用');
			$("#disOrUnDis").unbind("click");
			$("#disOrUnDis").bind("click", disCt);
			$("#disOrUnDis").addClass("t_del");
		}
		$("#disOrUnDis").show();
		$("#addPdTm").show();
		$("#deletePdTm").show();
		$("#editPdTm").show();
		$("#batchChangeParticipant").show();
		$("#defaultPdTm").hide();
	} else {
		if (!node || isEmpty(node.id) || node.id.indexOf('_0') >= 0){
			$("#defaultPdTm").hide();
		}
		$("#defaultPdTm").show();
		$("#disOrUnDis").hide();
		//$("#deletePdTm").hide();
		$("#addPdTm").hide();
		$("#editPdTm").hide();
		$("#batchChangeParticipant").hide();
	}
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
 * 新建子部门
 */
function flowMonitorSet() {
	var count = 0;
	$("input[name='ids']:checked").each(
			function() {
				count++;
			}
	);
	if (count > 1 || count == 0) {
		alert("请选择一项流程模板进行监控设置!");
		return;
	}
	var id = $("input[name='ids']:checked").attr("value");
	OpenWin('FlowMonitor!setup.do?flowTempId='+id);
}


var queryOp = function(start){
	 if (start && start >= 0) {
		 document.getElementsByName('start')[0].value = start;
    }
	 $('body').mask("数据保存中...");
    $("#frm").submit();
};

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
//删除目录
function deleteCt() {
	var node = tree.getSelectionModel().getSelectedNode();
	if (node && isNotEmpty(node.id) && node.attributes.prefix.indexOf('Cate_') >= 0 && node.id != 'Cate_0') {

	if (node && node.id != 'Cate_0') {
		var ids = node.id.substring(5);
		if(!ids) {
			alert("请选择判定条目进行操作！");
			return;
		}
		var dt = new Date();
		if(window.confirm("确认要删除吗？")) {
			$('body').mask("删除中...");
			$.ajax({
				type : "POST",
				url : "Ct!deleteCt.do",
				data : {ids:ids,t:dt.getTime()},
				dataType : "json",
				success : function(data, textStatus, jqXHR) {
					$('body').unmask();
					if (data && data.success) {
						alert("删除成功！");
						window.refreshTree( $("#frm_ct_parentId").attr("value") );
					} else {
						alert("删除失败,已经被模板引用！");
					}
				},
				error : function(jqXHR, textStatus, errorThrown) {
					$('body').unmask();
					alert("删除失败！");
				}
			});
		}
	} else {
    	alert("请选择判定条目进行操作！");
		return;
    }
	}
	
}

function disCt() {
	var node = tree.getSelectionModel().getSelectedNode();
	if (node && node.id != 'Cate_0') {
		var id = node.id.substring(5);
		updateCt(1,id)
	} else {
    	alert("请选择判定条目进行操作！");
		return;
    }
}
function unDisCt() {
	var node = tree.getSelectionModel().getSelectedNode();
	if (node && node.id != 'Cate_0') {
		var id = node.id.substring(5);
		updateCt(0,id)
	} else {
    	alert("请选择判定条目进行操作！");
		return;
    }
}
var updateCt = function(isdisabled,ids) {
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
			url : "Ct!updateCt.do",
			data : {ids:ids, isdisabled : isdisabled,t:dt.getTime()},
			dataType : "json",
			success : function(data, textStatus, jqXHR) {
				$('body').unmask();
				if (data && data.success) {
					alert(dealName + "成功！");
					queryFlow();
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
}
var setDefaultFl = function() {
	var ids = getCheckBoxValues("ids");
	if(!ids) {
		alert("请选择一条记录进行操作！");
		return;
	} else if (ids.indexOf(';') > 0){
		alert("请选择一条记录进行操作！");
		return;
	}
	if(window.confirm("确认要将此流程模板设为默认吗？")) {
		$('body').mask("操作中...");
		$.ajax({
			type : "POST",
			url : "Designer!setDefaultFl.do",
			data : {ids:ids, t:(new Date()).getTime()},
			dataType : "json",
			success : function(data, textStatus, jqXHR) {
				$('body').unmask();
				if (data && data.success) {
					alert("操作成功！");
					$("#frm").submit();
				} else {
					alert("操作失败！");
				}
			},
			error : function(jqXHR, textStatus, errorThrown) {
				$('body').unmask();
				alert( "操作失败！");
			},
			dataType : "json"
		});
	}
};


var moveFlow = function(){
	var dt = new Date();
	if ($("input[type='checkbox']").is(":checked")) {
		var checkIdBox = $("input[name='ids']:checked");
		var flowIds = "";
		for (var i = 0, j = checkIdBox.length; i < j; i++) {
			flowIds += checkIdBox[i].value + (i == j-1 ? "" : ",");
		}
		var ctId = $("#ctId").val();
		var url = "Designer!moveFlow.do?ctId=" + ctId + "&flowIds="+flowIds;
		var sFeatures = {
			dialogWidth : 300,
			dialogHeight : 320,
			scroll : 'yes'
		};
		var rv = showModalDialogOverride(url, window, sFeatures);
		if(rv){
			$("#frm").submit();
		}
	} else {
		alert("请在右边列表复选框至少选择一条记录转移！");
	}
}

var viHistory=function(){
	var ids = getCheckBoxValues("ids");
	if(!ids) {
		alert("请选择一条记录进行操作！");
		return;
	} else if (ids.indexOf(';') > 0){
		alert("请选择一条记录进行操作！");
		return;
	}
	window.open('Designer!listHistory.do?id='+ids);
}


var toBatchChangeParticipant = function(){
	var selectedNode = tree.getSelectionModel().getSelectedNode();
	var ctId;
	if(selectedNode) {
		var idStr = selectedNode.id;
		if(idStr.indexOf("Cate_") == 0) {
			ctId = idStr.substring(idStr.indexOf("_")+1);
		}
	}
	if(ctId && ctId !=0) {
		openWindow('Ct!toBatchChangeParticipant.do?ctId='+ctId, "批量替换处理人", 600, 300);
	}else{
		alert("请选择流程分类!");
	}
	
}

function flowTest(){
	var ids = getCheckBoxValues("ids");
	if(!ids) {
		alert("请选择一条记录进行操作！");
		return;
	} else if (ids.indexOf(';') > 0){
		alert("请选择一条记录进行操作！");
		return;
	}
	window.open('FormTools!flowTest.do?id='+ids);
}

function chooseThisRow( id ) {
	$("#"+id).attr("checked", !$("#"+id).attr("checked"));
}

var refreshTree=function(id){
	if(isEmpty(id)){
		tree.getRootNode().reload();
	}else{
		var node = tree.getNodeById("Cate_"+id);
		if ( node.hasChildNodes() ) {
			node.reload();
		} else {
			node.parentNode.reload();
			node.expand();
		}
	}
}
