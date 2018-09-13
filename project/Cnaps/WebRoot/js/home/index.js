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
 * 设置Ext.BLANK_IMAGE_URL的默认路径
 */
var buildImageUrl = function() {
	Ext.BLANK_IMAGE_URL = getRootPath()
			+ "/ext2.2.1/resources/images/default/s.gif";
}
/**
 * 设置系统登录后的遮罩效果和遮罩消失时间
 */
var buildSetTimeout = function() {
	setTimeout(function() { // 此函数放在所有组件(显示出来)后, 或放在显示控制函数里.
				Ext.get('loading').remove(); // 删除图片和方字
				Ext.get('loading-mask').fadeOut({ // 淡出效果方式,删除整个遮照层
					remove : true
				});
			}, 300);
}
/**
 * 王亮 用于展示系统首页的三个按钮
 */
var initData = function() {
	if (Ext.get('relogin')) {
		Ext.get('relogin').on('click', function() {// 重新登录
					document.forms[0].submit();
				});
	}

	if (Ext.get("cdtcal")) {
		Ext.get("cdtcal").on('click', function() {// 计算器
					showCalculato();
				});
	}
	if (Ext.get('logout')) {
		Ext.get('logout').on('click', function() {// 退出系统
					if (confirm("确定要退出系统?") == true) {
						document.forms[0].action = getRootPath()
								+ "/system/login.do?method=logout";
						document.forms[0].submit();
						closeWindow();
					}
				});
	}
	if (Ext.get('chgpwd')) {
		Ext.get('chgpwd').on('click', function() {// 修改密码
					Ext.get('main').dom.src = getRootPath()
							+ "/systemManage/systemUserManage/systemUserManageAction.do?method=modifyUserPasswordView";
					document.forms[0].action = getRootPath()
							+ "/system/login.do?method=reLogin";
				});
	}
};
/**
 * 王亮 构建系统首页的布局。结构为经典结构上、左、中.
 */
var buildLayout = function() {
	var layout = new Ext.Viewport({
				layout : 'border',
				items : [{// 系统首页上部
					split : true,
					region : 'north',
					collapsible : true,
					collapseMode : 'mini',
					height : 101,
					maxSize : 101,
					minSize : 101,
					contentEl : homeconfig.northContentEl || 'banner'
				}, {	// 系统首页左部.系统菜单
							split : true,
							layout : 'fit',
							width : 180,
							region : 'west',
							collapsible : true,
							collapseFirst : false,
							margins : '0 0 5 5',
							cmargins : '0 0 0 0',
							collapseMode : 'mini',
							title : homeconfig.title || '系统菜单',
							border : false,
							tools : [{
										id : "refresh",
										qtip : '刷新菜单',
										handler : function() {
											tree.root.reload();
										}
									}]
						}, {// 系统中部。操作区
							region : 'center',
							contentEl : homeconfig.centerContentEl
									|| 'main-div',
							autoScroll : true
						}/*
							 * , {// 系统首页底部 region : 'south', height :
							 * homeconfig.height || 23, contentEl :
							 * homeconfig.northContentEl || 'south' }
							 */]
			});
	// 获取系统左部区域
	var nav = layout.items.get(1);
	var root = new Ext.tree.AsyncTreeNode({
				id : homeconfig.rootId || "0",
				text : homeconfig.rootText || "系统菜单"
			});
	// 创建系统菜单
	var tree = new Ext.tree.TreePanel({
		root : root,
		border : false,
		useArrows : true,
		autoScroll : true,
		enableDrop : false,
		rootVisible : false,
		bodyStyle : 'filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=#FFFFFF,endColorstr=#B9E3F5);',
		listeners : {// 监听菜单事件.如果是叶子节点就连接到目标地址
			click : {
				scope : this,
				fn : function(node, e) {
					if (node.isLeaf()) {
						Ext.MessageBox.wait('页面加载中,请稍后...');
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
// 系统首页初始化
var init = function() {
	Ext.QuickTips.init();
	buildImageUrl();
	initData();
	buildLayout();
	buildSetTimeout();
};
Ext.onReady(init);