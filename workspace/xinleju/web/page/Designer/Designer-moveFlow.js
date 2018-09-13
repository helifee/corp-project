/**
 * 流程目录转移脚本by chenhb
 */
var tree;
Ext.onReady(function() {

	/* 根节点，虚拟节点，数据库不存 */
	var root = new Ext.tree.AsyncTreeNode({
		id : 'Cate_0',
		text : '流程目录',
        prefix : 'Cate_',
		uiProvider : Ext.ux.TreeCheckNodeUI
	});

	/* 构建树对象 */
	tree = new Ext.tree.TreePanel({
		loader : new Ext.tree.TreeLoader({
            dataUrl : 'Ct!getTree.ajax?parentId=' + root.id.substring(root.attributes.prefix.indexOf('_')+1) + '&prefix=' + root.attributes.prefix + '&isDisabled=',
			baseAttrs : {
				uiProvider : Ext.ux.TreeCheckNodeUI
			}
		}),
		checkModel : 'single',
		root : root,
		renderTo : 'ctTree',
		border : false,
		autoHeight : false,
		animate : true,// 以动画形式伸展,收缩子节点
		autoScroll : true,
		getCheckedIdAry : function() {
			var t = this;
			var result = [];
			var checkedNodes = t.getChecked();
			if (checkedNodes && checkedNodes.length > 0) {
				for (var i = 0; i < checkedNodes.length; i++) {
					result.push(checkedNodes[i].attributes.id);
				}
			}
			return result;
		}
	});

	/* 加载前带入参数，父节点ID */
	tree.on("beforeload", function(node) {
		var ctId = (node.id).substring(node.attributes.prefix.indexOf('_')+1);
		this.loader.dataUrl = 'Ct!getTree.ajax?parentId=' + ctId + '&prefix=' + node.attributes.prefix + '&isDisabled=0';
	});
	
	root.expand();
	root.select();
})

function confirmMove(btnGroupId) {
	$("#" + btnGroupId).hide();
	var flowIds = $("#flowIds").val();
	var result = tree.getCheckedIdAry();
	if (!(result && result.length > 0)) {
		alert("请选择一个目标分类！");
		$("#" + btnGroupId).show();
		return;
	}
	var targetId = result[0].split("_")[1];
	Ext.Ajax.request({
		url : 'Designer!moveFlowSave.do',
		params : {
			flowIds : flowIds,
			targetId : targetId
		},
		method : 'POST',
		success : function(response) {
			if (response && response.responseText) {
				var result = Ext.util.JSON.decode(response.responseText);
				if (result && result.success) {
					alert(result.msg);
					window.returnValue=[targetId];
					window.close();
				} else {
					alert(result.msg);
					$("#" + btnGroupId).show();
				}
			}
		}
	});
}
