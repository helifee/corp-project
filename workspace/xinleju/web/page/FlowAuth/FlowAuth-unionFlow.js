var dt = new Date();
var tree;
$(document).ready(function() {
});


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
        $.ajax({
			type : "POST",
			url : "FlowAuth!getUserAuthScope.do?srcId="+ctId+"&prefixVar="+prefixVar,
			data : {ctId:ctId, prefixVar:prefixVar}, 
			dataType : "json",
			success : function(data, textStatus, jqXHR) {
				$('body').unmask();
				
				var scopesItems = $("#scopesItems");
				scopesItems.html("");
				
				for ( var idx = 0; idx < data.length; idx++ ) {
					scopesItems.append($("<option value='" + data[idx].flowCode + "'>" + getFlowFullPath( data[idx] ) + "</option>"));
				}
				
			},
			error : function(jqXHR, textStatus, errorThrown) {
				$('body').unmask();
				alert("网络故障！");
			}
		});
        
    });
    tree.on('beforeload', function(node) {
        var ctId = (node.id).substring(node.attributes.prefix.indexOf('_')+1);
        tree.loader.dataUrl = 'Ct!getTree.ajax?parentId=' + ctId + '&prefix=' + node.attributes.prefix;
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

function getFlowFullPath(data) {
	var allPath = "";
	if ( data.serviceObjectDefine != null ) {
		if ( data.serviceObjectDefine.appName != null && data.serviceObjectDefine.appName.length > 0 ) {
			allPath = data.serviceObjectDefine.appName + "/";

			if ( data.serviceObjectDefine.name != null && data.serviceObjectDefine.name.length > 0 ) {
				allPath += data.serviceObjectDefine.name;
			}
		}
	}
	
	if ( allPath != null && allPath.length > 0 ) {
		allPath += "/";
	}
	
	return allPath + data.flowName;
}



function init() {
    initTree();
}
Ext.onReady(init);

function rtnSelFlow() {
	var data = [];
	var idx = 0;
	$("#selFlowList option").each(function(){
		data[idx] = new Object();
		data[idx].value = $(this).val();
		data[idx].text = $(this).text();
		idx++;
	});

	window.opener.resetSelFlow(data);
}

function selFlow() {
	var text = $("#scopesItems").find("option:selected").text();
	var value = $("#scopesItems").val();
	if ( checkIsExist(value) ) {
		alert("该流程已选，不能重复选择!");
	} else {
		
		$("#selFlowList").append($("<option value='" + value + "'>" + text + "</option>"));
	}
}

function checkIsExist(id) {
	return $("#selFlowList option[value='" + id + "']").length > 0;
}

function removeSelFlow() {
	var id = $("#selFlowList").val();
	$("#selFlowList option[value='" + id + "']").remove();
}