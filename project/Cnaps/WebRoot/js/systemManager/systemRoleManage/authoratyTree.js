Ext.BLANK_IMAGE_URL = getRootPath()
		+ "/ext2.2.1/resources/images/default/s.gif";
Ext.QuickTips.init();
var TreeTest = function() {
	var Tree = Ext.tree;
	var tree = null/* δ����Ȩ���� */, tree2 = null/* �ѷ���Ȩ���� */;
	var ExtJsRPB = {/* http ���� */
		indentifier : "",
		roleindentifier : "",
		menuindentifiers : "",
		common : ""
	};
	Tree.addOrModifyUrl = getRootPath()
			+ "/systemManage/authordistributionmanagerAction.do?method=addOrModifyAuthors";// ��ӻ����޸Ľ�ɫȨ��URL
	return {
		init : function() {
			if (!tree) {
				tree = new Tree.TreePanel({
					el : 'tree',
					// title : "ȫ��Ȩ��",
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
								text : 'ȫ��Ȩ����',
								draggable : false,
								id : "0"
							}),
					tbar : [
							/*Ext.get("rolenamecode").getValue() + " /  "
									+ */Ext.get("rolename").getValue() + "  ȫ��Ȩ��",
							"->", {
								text : "����",
								pressed : true,
								scope : this,
								handler : function() {
									//history.back();
									window.parent.location.href=getRootPath()+ "/systemManage/systemRoleManageAction.do?method=querySystemRole";
									
								}
							}, "-", {
								text : "���Ȩ��",
								pressed : true,
								tooltip : "Ϊ "
										+ Ext.get("rolenamecode").getValue()
										+ " /  "
										+ Ext.get("rolename").getValue()
										+ " ���Ȩ��",
								scope : this,
								handler : function() {
									getCheckedNodesId(tree, "���", "add",
											Tree.addOrModifyUrl);
								}
							}],
					bbar : [
							/*Ext.get("rolenamecode").getValue() + " /  "
									+ */Ext.get("rolename").getValue() + "  ȫ��Ȩ��",
							"->", {
								text : "����",
								pressed : true,
								scope : this,
								handler : function() {
									//history.back();
									window.parent.location.href=getRootPath()+ "/systemManage/systemRoleManageAction.do?method=querySystemRole";
									
								}
							}, "-", {
								text : "���Ȩ��",
								pressed : true,
								tooltip : "Ϊ "
										+ Ext.get("rolenamecode").getValue()
										+ " /  "
										+ Ext.get("rolename").getValue()
										+ " ���Ȩ��",
								handler : function() {
									getCheckedNodesId(tree, "���", "add",
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
			// })// ע��check�¼�

			// --------------------------------------------------------------------------------------------------------------------------
			if (!tree2) {
				tree2 = new Tree.TreePanel({
					el : 'tree2',
					// title : "�ѷ���Ȩ��",
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
								text : '�ѷ���Ȩ����',
								draggable : false,
								id : "0"
							}),
					tbar : [
							{
								text : "ɾ��Ȩ��",
								tooltip : "ɾ�� "
										+ Ext.get("rolenamecode").getValue()
										+ " /  "
										+ Ext.get("rolename").getValue()
										+ " ��Ȩ��",
								pressed : true,
								handler : function() {
									getCheckedNodesId(tree2, "ɾ��", "del",
											Tree.addOrModifyUrl);
								}
							},
							"-",
							{
								text : "����",
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
									+ "  �ѷ���Ȩ��"],
					bbar : [
							{
								text : "ɾ��Ȩ��",
								pressed : true,
								tooltip : "ɾ�� "
										+ Ext.get("rolenamecode").getValue()
										+ " /  "
										+ Ext.get("rolename").getValue()
										+ " ��Ȩ��",
								handler : function() {
									getCheckedNodesId(tree2, "ɾ��", "del",
											Tree.addOrModifyUrl);
								}
							},
							"-",
							{
								text : "����",
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
									+ "  �ѷ���Ȩ��"]
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
						title : "����",
						msg : "��ѡ����Ҫ" + title + "��Ȩ�޽���" + title + " ! ",
						fixCursor : true,
						icon : Ext.Msg.WARNING,
						buttons : Ext.Msg.OK,
						minWidth : 300
					});
		}

	}
	function invokMethod(title, extjsrpb, requesturl, op, checkedNodes) {
		Ext.MessageBox.wait("���ڴ�������...", "���Ժ�");
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
									title : "Ȩ��" + title + "ʧ��",
									msg : "�������������Ƿ����� �� ",
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
