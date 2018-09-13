Ext.BLANK_IMAGE_URL = getRootPath()
		+ "/ext2.2.1/resources/images/default/s.gif";
Ext.QuickTips.init();
var TreeTest = function() {
	var Tree = Ext.tree;
	var tree = null/* 未分配权限树 */, tree2 = null/* 已分配权限树 */;
	var ExtJsRPB = {/* http 参数 */
		indentifier : "",
		roleindentifier : "",
		menuindentifiers : "",
		common : ""
	};
	Tree.addOrModifyUrl = getRootPath()
			+ "/systemManage/authordistributionmanagerAction.do?method=addOrModifyAuthors";// 添加或者修改角色权限URL
	return {
		init : function() {
			if (!tree) {
				tree = new Tree.TreePanel({
					el : 'tree',
					// title : "全部权限",
					animate : true,
					autoScroll : true,
					useArrows : true,
					rootVisible : false,
					autoHeight : true,
					bodyStyle : "background:transparent",
					checkModel : "cascade",
					enableDD : false,
					containerScroll : true,
					dropConfig : {
						appendOnly : true
					},
					loader : new Tree.TreeLoader({
						url : getRootPath()
								+ '/getNodesByIndentifier.do?method=getWFPNodesBySystemRole&rolueIdentifier='
								+ Ext.get("rolueIdentifier").getValue(),
						baseAttrs : {
							uiProvider : Ext.ux.TreeCheckBoxNodeUI
						},
						listeners : {
							beforeload : {
								scope : this,
								fn : function(loader, node) {
									loader.baseParams = {
										indentifier : node.id
									}
								}
							}
						}
					}),
					root : new Tree.AsyncTreeNode({
								text : '全部权限树',
								draggable : false,
								id : "0"
							}),
					tbar : [
							/*Ext.get("rolenamecode").getValue() + " /  "
									+ */Ext.get("rolename").getValue() + "  全部权限",
							"->", {
								text : "返回",
								pressed : true,
								scope : this,
								handler : function() {
									//history.back();
									window.parent.location.href=getRootPath()+ "/systemManage/systemRoleManageAction.do?method=querySystemRole";
									
								}
							}, "-", {
								text : "添加权限",
								pressed : true,
								tooltip : "为 "
										+ Ext.get("rolenamecode").getValue()
										+ " /  "
										+ Ext.get("rolename").getValue()
										+ " 添加权限",
								scope : this,
								handler : function() {
									getCheckedNodesId(tree, "添加", "add",
											Tree.addOrModifyUrl);
								}
							}],
					bbar : [
							/*Ext.get("rolenamecode").getValue() + " /  "
									+ */Ext.get("rolename").getValue() + "  全部权限",
							"->", {
								text : "返回",
								pressed : true,
								scope : this,
								handler : function() {
									//history.back();
									window.parent.location.href=getRootPath()+ "/systemManage/systemRoleManageAction.do?method=querySystemRole";
									
								}
							}, "-", {
								text : "添加权限",
								pressed : true,
								tooltip : "为 "
										+ Ext.get("rolenamecode").getValue()
										+ " /  "
										+ Ext.get("rolename").getValue()
										+ " 添加权限",
								handler : function() {
									getCheckedNodesId(tree, "添加", "add",
											Tree.addOrModifyUrl);
								}
							}]
				});
			}
			tree.render();
			tree.on('click', function(node) {
						if (!node.isLeaf()) {
							node.expand();
						}
					});
			// tree.root.expand(true, true);
			// tree.on("check", function(node, checked) {
			// alert(node.text + " = " + node.id + " true/false:"
			// + checked)
			// })// 注册check事件

			// --------------------------------------------------------------------------------------------------------------------------
			if (!tree2) {
				tree2 = new Tree.TreePanel({
					el : 'tree2',
					// title : "已分配权限",
					animate : true,
					autoScroll : true,
					useArrows : true,
					rootVisible : false,
					autoHeight : true,
					bodyStyle : "background:transparent",
					checkModel : "multiple",
					containerScroll : true,
					enableDD : false,
					dropConfig : {
						appendOnly : true
					},
					loader : new Ext.tree.TreeLoader({
						url : getRootPath()
								+ '/getNodesByIndentifier.do?method=getYFPNodesBySystemRole&rolueIdentifier='
								+ Ext.get("rolueIdentifier").getValue(),
						baseAttrs : {
							uiProvider : Ext.ux.TreeCheckBoxNodeUI
						},
						listeners : {
							beforeload : {
								scope : this,
								fn : function(loader, node) {
									loader.baseParams = {
										indentifier : node.id
									}
								}
							}
						}
					}),
					root : new Tree.AsyncTreeNode({
								text : '已分配权限树',
								draggable : false,
								id : "0"
							}),
					tbar : [
							{
								text : "删除权限",
								tooltip : "删除 "
										+ Ext.get("rolenamecode").getValue()
										+ " /  "
										+ Ext.get("rolename").getValue()
										+ " 的权限",
								pressed : true,
								handler : function() {
									getCheckedNodesId(tree2, "删除", "del",
											Tree.addOrModifyUrl);
								}
							},
							"-",
							{
								text : "返回",
								pressed : true,
								scope : this,
								handler : function() {
									//history.back();
									window.parent.location.href=getRootPath()+ "/systemManage/systemRoleManageAction.do?method=querySystemRole";
								}
							},
							"->",
							/*Ext.get("rolenamecode").getValue() + " /  "
									+*/ Ext.get("rolename").getValue()
									+ "  已分配权限"],
					bbar : [
							{
								text : "删除权限",
								pressed : true,
								tooltip : "删除 "
										+ Ext.get("rolenamecode").getValue()
										+ " /  "
										+ Ext.get("rolename").getValue()
										+ " 的权限",
								handler : function() {
									getCheckedNodesId(tree2, "删除", "del",
											Tree.addOrModifyUrl);
								}
							},
							"-",
							{
								text : "返回",
								pressed : true,
								scope : this,
								handler : function() {
									//history.back();
									window.parent.location.href=getRootPath()+ "/systemManage/systemRoleManageAction.do?method=querySystemRole";
								}
							},
							"->",
							/*Ext.get("rolenamecode").getValue() + " /  "
									+ */Ext.get("rolename").getValue()
									+ "  已分配权限"]
				});
			}
			tree2.render();
			tree2.on('click', function(node) {
						if (!node.isLeaf()) {
							node.expand();
						}
					});
		}
	};
	function getCheckedNodesId(taee, title, op, requesturl) {
		var checkedNodeIds = new Array();
		var checkedNodes = new Array();
		if (op == "add") {
			checkedNodes = taee.getChecked();
		}
		else {
			if (taee.getChecked().length != 0)
				checkedNodes = taee.getUnChecked();
		}
		if (checkedNodes.length != 0) {
			Ext.each(checkedNodes, function(node) {
						if (node.getDepth() == 0 || node.getDepth() == 1) {
							node.id = parseInt('0');
						}
						checkedNodeIds.push(node.id);
					})
			ExtJsRPB.indentifier = Ext.get("indentifier").getValue();
			ExtJsRPB.roleindentifier = Ext.get("rolueIdentifier").getValue();
			ExtJsRPB.menuindentifiers = checkedNodeIds.join(",");
			invokMethod(title, ExtJsRPB, requesturl, op, checkedNodes);
		}
		else {
			Ext.Msg.show({
						title : "警告",
						msg : "请选择需要" + title + "的权限进行" + title + " ! ",
						fixCursor : true,
						icon : Ext.Msg.WARNING,
						buttons : Ext.Msg.OK,
						minWidth : 300
					});
		}

	}
	function invokMethod(title, extjsrpb, requesturl, op, checkedNodes) {
		Ext.MessageBox.wait("正在处理数据...", "请稍候");
		Ext.Ajax.request({
					url : requesturl + "&op=" + op,
					params : {
						ExtJsRPB : Ext.util.JSON.encode(extjsrpb)
					},
					success : function(response, options) {
						Ext.MessageBox.hide();
						/*
						 * tree.root.reload(); tree.root.expand(true, true);
						 */
						tree2.root.reload();
						tree2.root.expand(true, true);
					},
					failure : function() {
						Ext.MessageBox.hide();
						Ext.Msg.show({
									title : "权限" + title + "失败",
									msg : "请检查网络连接是否正常 ！ ",
									fixCursor : true,
									icon : Ext.Msg.ERROR,
									buttons : Ext.Msg.OK,
									minWidth : 300
								});
					}
				});
	}
}();
Ext.EventManager.onDocumentReady(TreeTest.init, TreeTest, true);
