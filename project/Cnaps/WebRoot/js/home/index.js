homeconfig = {}
function isComplete(i1frameid) {
	if (!window.frames[i1frameid]) {
		Ext.MessageBox.hide();
	} else if (window.frames[i1frameid].document.readyState == "complete") {
		Ext.MessageBox.hide();
	}
}
function convertURL(url) {
	if (url.indexOf("?") >= 0) {
		url = url + '&timStamp=' + (new Date()).valueOf();
	}
	else {
		url = url + '?timStamp=' + (new Date()).valueOf();
	}
	return url;
}

/**
 * ����Ext.BLANK_IMAGE_URL��Ĭ��·��
 */
var buildImageUrl = function() {
	Ext.BLANK_IMAGE_URL = getRootPath()
			+ "/ext2.2.1/resources/images/default/s.gif";
}
/**
 * ����ϵͳ��¼�������Ч����������ʧʱ��
 */
var buildSetTimeout = function() {
	setTimeout(function() { // �˺��������������(��ʾ����)��, �������ʾ���ƺ�����.
				Ext.get('loading').remove(); // ɾ��ͼƬ�ͷ���
				Ext.get('loading-mask').fadeOut({ // ����Ч����ʽ,ɾ���������ղ�
					remove : true
				});
			}, 300);
}
/**
 * ���� ����չʾϵͳ��ҳ��������ť
 */
var initData = function() {
	if (Ext.get('relogin')) {
		Ext.get('relogin').on('click', function() {// ���µ�¼
					document.forms[0].submit();
				});
	}

	if (Ext.get("cdtcal")) {
		Ext.get("cdtcal").on('click', function() {// ������
					showCalculato();
				});
	}
	if (Ext.get('logout')) {
		Ext.get('logout').on('click', function() {// �˳�ϵͳ
					if (confirm("ȷ��Ҫ�˳�ϵͳ?") == true) {
						document.forms[0].action = getRootPath()
								+ "/system/login.do?method=logout";
						document.forms[0].submit();
						closeWindow();
					}
				});
	}
	if (Ext.get('chgpwd')) {
		Ext.get('chgpwd').on('click', function() {// �޸�����
					Ext.get('main').dom.src = getRootPath()
							+ "/systemManage/systemUserManage/systemUserManageAction.do?method=modifyUserPasswordView";
					document.forms[0].action = getRootPath()
							+ "/system/login.do?method=reLogin";
				});
	}
};
/**
 * ���� ����ϵͳ��ҳ�Ĳ��֡��ṹΪ����ṹ�ϡ�����.
 */
var buildLayout = function() {
	var layout = new Ext.Viewport({
				layout : 'border',
				items : [{// ϵͳ��ҳ�ϲ�
					split : true,
					region : 'north',
					collapsible : true,
					collapseMode : 'mini',
					height : 101,
					maxSize : 101,
					minSize : 101,
					contentEl : homeconfig.northContentEl || 'banner'
				}, {	// ϵͳ��ҳ��.ϵͳ�˵�
							split : true,
							layout : 'fit',
							width : 180,
							region : 'west',
							collapsible : true,
							collapseFirst : false,
							margins : '0 0 5 5',
							cmargins : '0 0 0 0',
							collapseMode : 'mini',
							title : homeconfig.title || 'ϵͳ�˵�',
							border : false,
							tools : [{
										id : "refresh",
										qtip : 'ˢ�²˵�',
										handler : function() {
											tree.root.reload();
										}
									}]
						}, {// ϵͳ�в���������
							region : 'center',
							contentEl : homeconfig.centerContentEl
									|| 'main-div',
							autoScroll : true
						}/*
							 * , {// ϵͳ��ҳ�ײ� region : 'south', height :
							 * homeconfig.height || 23, contentEl :
							 * homeconfig.northContentEl || 'south' }
							 */]
			});
	// ��ȡϵͳ������
	var nav = layout.items.get(1);
	var root = new Ext.tree.AsyncTreeNode({
				id : homeconfig.rootId || "0",
				text : homeconfig.rootText || "ϵͳ�˵�"
			});
	// ����ϵͳ�˵�
	var tree = new Ext.tree.TreePanel({
		root : root,
		border : false,
		useArrows : true,
		autoScroll : true,
		enableDrop : false,
		rootVisible : false,
		bodyStyle : 'filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=#FFFFFF,endColorstr=#B9E3F5);',
		listeners : {// �����˵��¼�.�����Ҷ�ӽڵ�����ӵ�Ŀ���ַ
			click : {
				scope : this,
				fn : function(node, e) {
					if (node.isLeaf()) {
						Ext.MessageBox.wait('ҳ�������,���Ժ�...');
						/*Ext.getDom('main').src = getRootPath() + "/"
								+ node.attributes.url+'&timStamp=' + (new Date()).valueOf();
								alert(Ext.getDom('main').src);*/
						Ext.getDom('main').src = getRootPath() + "/"+convertURL(node.attributes.url);
						setInterval("isComplete(Ext.getDom('main').id)", 100);
					} else {
						node.expand();
					}
				}
			}
		},
		loader : new Ext.tree.TreeLoader({
			url : homeconfig.treeLoadUrl
					|| getRootPath()
					+ '/getNodesByIndentifier.do?method=getAllTreeNodesByUserAuthor',
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
		})
	});
	root.expand(false);
	nav.add(tree);
	layout.doLayout();
};
// ϵͳ��ҳ��ʼ��
var init = function() {
	Ext.QuickTips.init();
	buildImageUrl();
	initData();
	buildLayout();
	buildSetTimeout();
};
Ext.onReady(init);