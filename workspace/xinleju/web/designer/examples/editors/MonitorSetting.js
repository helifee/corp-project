var overdue_setting_window,lId,lName;
OverdueSettingWindow = Ext.extend(Ext.Window, {
	title : '审批人领导选择',
	closable : true,
	width : 990,
	height : 500,
	plain : true,
	maximizable : true,
	layout : 'border',
	closeAction : 'hide',
	modal : true,
	shadow:false,
	initComponent : function() {
		// 可阅人配置
		this.LeaderTree = this.init_leader_tree();
	},
	init_leader_tree :function(){
		var currentDep = 0;
		var rootType = 3;
		// 参与者树
		var root = new Ext.tree.AsyncTreeNode({
			id : 'Root_0',
			prefix : 'Root_',
			text : '审批人领导选择',
			expanded : true
		});
		var LeaderTree = new Ext.tree.TreePanel({
			loader : new Ext.tree.TreeLoader({
				dataUrl : '../../../Participant!getWarnTree.ajax?parentId=' + root.id + '&prefix=' + root.attributes.prefix+ '&t=' + new Date().getTime(),
				baseAttrs : {
					uiProvider : Ext.ux.TreeCheckNodeUI
				}
			}),
			root : root,
			renderTo : 'leader_tree',
			border : true,
			autoScroll : true,
			rootVisible : false,
			height : 300,
			width : '100%'
		});
		LeaderTree.on('click', function(node) {
			node.expand();
			node.select();
		});
		LeaderTree.on('beforeload', function(node) {
			LeaderTree.loader.baseParams['q'] = $('#leader_tree_qk').val();
			LeaderTree.loader.dataUrl = '../../../Participant!getWarnTree.ajax?parentId=' + node.id + '&prefix=' + node.attributes.prefix+ '&t=' + new Date().getTime();
		});
		root.expand();
		root.select();
		return LeaderTree;
	},
});
/** 
 * 选择 从左向右 
 */
var selectToLeaderList = function() {
	var selNodes = overdue_setting_window.LeaderTree.getChecked();
	var ids = [];
	Ext.each(selNodes, function(node) {
		var nodePrefix = node.id.substring(0, 5);
		if (nodePrefix == 'Xdpa_' || nodePrefix == 'Part_' || nodePrefix == 'User_' || nodePrefix == 'Role_' || nodePrefix == 'Orgn_' || nodePrefix == 'Pbiz_' || nodePrefix == 'Objf_' || nodePrefix == 'Rank_') {
			if (node.id.substring(5) != 0) {
				var userid = node.id;
				if(node.leaf==true||(node.attributes.type=='user'||node.attributes.type=='role')){
					jsAddItemToSelect('leaderList', node.text, userid);
				}else{
					alert("请选择正确的标准角色和人员！！");
				}
			}
		}
	});
};

/**
 * 删除 从右向左
 */
var removeFromLeaderList = function(id) {
	jsRemoveSelectedItemFromSelect(id);
};

/**
 * 查询
 */
var query_leader_tree = function(){
	overdue_setting_window.LeaderTree.root.reload(function(){
		var leader_tree_qk = $('#leader_tree_qk').val();
		if(leader_tree_qk != ''){
			overdue_setting_window.LeaderTree.getRootNode().expandChildNodes(true);
		}
	});
}

/**
 * 显示领导岗位明细
 */
var showLeaderDetail = function(selectedString,tarDiv){
	Ext.Ajax.request({
		type : "POST",
		dataType : "json",
		url : "../../../Designer!showDetail.ajax",
		params : {'selectedString' : selectedString},
		success : function(resp) {
			var response = Ext.util.JSON.decode(resp.responseText);
			$('#' + tarDiv).val(response.detail);
		},
		failure : function() {
			
		}
	});
}

var init = function(){
	overdue_setting_window = new OverdueSettingWindow();
}
Ext.onReady(init);

var leaderWin;
var showLeaderWin = function(type){
	if(leaderWin!=null){
		leaderWin.close(); 
	}
	leaderWin = new Ext.Window({ 
		width:800,
		height:410,
		resizable:false,
		html:'<iframe name=\'leaderFrame\' id=\'leaderFrame\' height=\'100%\' width=\'100%\' src=\'/designer/examples/editors/_leader_select.jsp\'> </iframe>',
		title:"审批人领导选择" ,
		buttonAlign: 'right',
		buttons: [{ text: '确定', handler: function(){
		var options =$(window.frames["leaderFrame"].document.getElementById("leaderList")).find("option");
		if(options.length > 0){
			var lId = "";
			var lName = "";
	        options.each(function() {
	        	lId = lId + $(this).val() + ";";
	        	lName = lName + $(this).text() + ";";
		    });
	        if(type == "ac"){
		    	$("#ac_leaderId").val(lId);
		    	$("#ac_leaderName").val(lName);	
	        }else{
		    	$("#leaderId").val(lId);
		    	$("#leaderName").val(lName);	
	        }
			leaderWin.close();	
			}
		}
		}]
	});
	leaderWin.show(); 
}

function getByDefualtOptions(){
//	var options=$("#leaderId").val()+":"+$("#leaderName").val();
	var options= lId + ":" + lName
	return options;
}