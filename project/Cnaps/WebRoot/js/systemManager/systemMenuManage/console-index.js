// ȫ��·��
var basePath = getRootPath();
if(typeof(glbRootPath) != "undefined"){
	basePath = glbRootPath;
}
// ��չ����
FormEditWin = function(){
	var curFormWin;
	return {
		width : 600,
		height : 400,
		showAddDirWin : function(parentNode) {
			// ��ʾ�����Ŀ¼����
			var number = parentNode.indexOf(parentNode.lastChild) + 1;
			var editpage = basePath
					+ "/systemManage/systemMenusManage/SystemmenusmanageAction.do?method=editNodes&parentId="
					+ parentNode.id + "&leaf=0&number=" + number;
			var window = this.createWin("windirnew", "�½�Ŀ¼�ڵ�", editpage, function() {
				parentNode.reload();
			});
			window.show();
		},
		showAddLeafWin : function(parentNode) {
			// ��ʾ�����Ҷ�ӽڵ㴰��
			var number = parentNode.indexOf(parentNode.lastChild) + 1;
			var editpage = basePath
					+ "/systemManage/systemMenusManage/SystemmenusmanageAction.do?method=editNodes&parentId="
					+ parentNode.id + "&leaf=1&number=" + number;
			var window = this.createWin("winleafnew", "�½�Ҷ�ӽڵ�", editpage, function() {
				parentNode.reload();
			});
			window.show();
		},
		showEditDirWin : function(node) {
			// ��ʾĿ¼�༭����
			var editpage = basePath
					+ "/systemManage/systemMenusManage/SystemmenusmanageAction.do?method=editNodes&id=" + node.id;
			var window = this.createWin("win" + node.id, node.text, editpage, function() {
				var nodeparent = node.parentNode;
				var tree = node.getOwnerTree();
				nodeparent.on("expand", function(pnode) {
					tree.getNodeById(node.id).select();
				}, this, {
					single : true
				});
				node.parentNode.reload();
			});
			window.show();
		},
		showEditLeafWin : function(node) {
			// ��ʾҶ�ӽڵ�༭����
			var editpage = basePath
					+ "/systemManage/systemMenusManage/SystemmenusmanageAction.do?method=editNodes&id=" + node.id;
			var window = this.createWin("win" + node.id, node.text, editpage, function() {
				var nodeparent = node.parentNode;
				var tree = node.getOwnerTree();
				nodeparent.on("expand", function(pnode) {
					tree.getNodeById(node.id).select();
				}, this, {
					single : true
				});
				node.parentNode.reload();
			});
			window.show();
		},
		createWin : function(winId, winTitle, iframePage, closeFun) {
			// �������ʹ��ڴ���ʱ����
			var win = Ext.getCmp(winId);
			if (!win) {
				win = new Ext.Window({
					id : winId,
					title : "�˵��༭����-" + winTitle,
					width : this.width,
					height : this.height,
					maximizable : true,
					modal : true,
					html : "<iframe width='100%' height='100%' frameborder='0' src='"
							+ iframePage + "'></iframe>"
				});
				this.reloadNavNode = closeFun;
			}
			curFormWin = win;
			return win;
		},
		reloadNavNode : function() {
		},
		close : function() {
			if(curFormWin){
				curFormWin.close();
			}
		}
	}
}();

// ������
NavTree = function(){
	var nav;
	var navEditor;
	var leafMenu;
	var dirMenu;
	var loader;
	var root;
	var removeFlag = false;
	var titleChangeFlag = false;
	var nodeSelected;
	var mgr;
	return {
		init : function(){
			if(!mgr){
				Ext.Msg.alert("������ʾ","����ͨ��NavTree.setMgr()����mgr");
				return;
			}
			if(!loader){
				loader = new Ext.tree.TreeLoader({
					url : basePath + 'systemManage/systemMenusManage/SystemmenusmanageAction.do?method=getAllOneLevelNodesByIndentifier'
				});
				loader.on('beforeload', function(treeloader, node) {
					treeloader.baseParams = {
						id : node.id,
						method : 'tree'
					};
				}, this);
			}
			if(!root){
				root = new Ext.tree.AsyncTreeNode({
					id : '0',
					text : "ϵͳ�˵�����"
				});
			}
			 
			if(!nav){
				nav = new Ext.tree.TreePanel({
					//title : "",
					width : 400,
					autoScroll : true,
					animate : true,
					loader : loader,
					useArrows : true,
					el:'addSystemMenu',
					root : root,
					bodyStyle:"background:transparent",
					enableDD : false,
					enableDrop : false,
					autoHeight : true,
					listeners : {
						'click' : function(node, event) {
						//alert(node.isLeaf());
							if (node.isLeaf()) {
								// ΪҶ�ӽڵ�ʱ���������������
								event.stopEvent();
							}
						}
					}
				});
				//nav.root.expand(true, true);
				// ����Ҽ��˵�
				nav.on("contextmenu", this.showTreeMenu);
				// ���ڵ��ı��ı�ʱ�����¼�
				nav.on("textchange", function(node, newText, oldText) {
					if (!titleChangeFlag && newText != oldText) {
				 
						mgr.modifyTitle(node.id, newText, function(success) {
						//alert(success);
							if (!success) {
								Ext.Msg.show({
									title : "����ʧ�ܣ�",
									msg : "�˵��޸�ʧ�ܣ�",
									buttons : Ext.Msg.OK,
									icon : Ext.MessageBox.ERROR
								});
								titleChangeFlag = true;
								node.setText(oldText);
								titleChangeFlag = false;
							}else
							{
								//alert("��ӳɹ�");
								//node.parentNode.reload();
								//FormEditWin.close()
							}
						});
					}
				});
				// ���ڵ��ƶ�ʱ�����¼�
				nav.on("movenode", function(tree, node, oldParent, newParent, index) {
					mgr.ajaxMoveNode(node.id, oldParent.id, newParent.id, index);
				});
				// ���ڵ�ɾ��ʱ�����¼�
				nav.on("remove", function(tree, parentNode, node) {
					if (removeFlag) {
						mgr.delNode(node.id);
					   // parentNode.reload();
					}
				});
			}
			if(!navEditor){
				navEditor = new Ext.tree.TreeEditor(nav, {
					allowBlank : false,
					ignoreNoChange : true,
					blankText : '���ⲻ��Ϊ��',
					selectOnFocus : true
				});
			}
			this.setLeafMenu();
			this.setDirMenu();
		},
		setMgr : function(manager){
			mgr = manager;
		},
		getMgr : function(){
			return mgr;
		},
		setLeafMenu: function(){
			// ����Ҷ�Ӳ˵�
			if(!leafMenu){
				leafMenu = new Ext.menu.Menu({
					items : [{
						text : "�޸ı���",
						handler : function() {
							navEditor.triggerEdit(nodeSelected);
						}
					}, "-", {
						text : "�༭",
						handler : function() {
							FormEditWin.showEditLeafWin(nodeSelected);
						}
					}, "-", {
						text : "ɾ��",
						handler : this.delTreeItemComfirm
					}]
				});
			}
		},
		setDirMenu: function(){
			// ����Ŀ¼�˵�
			if(!dirMenu){
				dirMenu = new Ext.menu.Menu({
					items : [{
						text : "�޸ı���",
						handler : function() {
							navEditor.triggerEdit(nodeSelected);
						}
					}, "-", {
						text : "�༭",
						handler : function() {
							FormEditWin.showEditDirWin(nodeSelected);
						}
					}, "-", {
						text : "���Ҷ�ӽڵ�",
						handler : function() {
							FormEditWin.showAddLeafWin(nodeSelected);
						}
					}, "-", {
						text : "���Ŀ¼�ڵ�",
						handler : function() {
							FormEditWin.showAddDirWin(nodeSelected);
						}
					}, "-", {
						text : "ɾ��",
						handler : this.delTreeItemComfirm
					}]
				});
			}
		},
		showTreeMenu : function(node, e){
			nodeSelected = node;
			nodeSelected.select();
			if (node.isLeaf()) {
				// ��ʾҶ�ӽڵ�˵�
				leafMenu.showAt(e.getPoint());
			} else {
				// ��ʾĿ¼�ڵ�˵�
				dirMenu.showAt(e.getPoint());
			}
		},
		delTreeItemComfirm : function(){
			Ext.Msg.confirm("ȷ��ɾ��", "ȷ��Ҫɾ����ѡ�ڵ���", function(btn) {
				if (btn == "yes") {
					NavTree.delTreeItem();
				}
			});
		},
		delTreeItem : function(){
			if (nodeSelected != nav.getRootNode()) {
				removeFlag = true;
				nodeSelected.remove();
				removeFlag = false;
			} else {
				Ext.Msg.alert("����", "����ɾ�����ĸ��ڵ㣡");
			}
		},
		show : function(){
			nav.render();
			nav.getRootNode().toggle();
			nav.root.expand(false, true);
		}
	}
}();

// �ĵ��������ִ��
Ext.onReady(function(){
	Ext.BLANK_IMAGE_URL = basePath +"/ext2.2.1/resources/images/default/s.gif";
	if(typeof(systemmenusmanageServices)=="undefined"){
		Ext.Msg.alert("������ʾ","��������DWR����ʵ����NavigateManager");
	}else{
		NavTree.setMgr(systemmenusmanageServices);
		NavTree.init();
		NavTree.show();
	}
});