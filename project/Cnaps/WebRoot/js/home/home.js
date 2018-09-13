HomeConfig = {
	welcomeUrl : '/login.do?method=gotoWelcome',
	treeUrl : '/getNodesByIndentifier.do?method=getNodesByIndentifier',
	bodyStyle : 'filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=#E3E3E3,endColorstr=#E3E3E3);'
};

function setIconTitle(tapid, text, cls) {
	if ((tapid != null || tapid != '') && (text != null || text != '')
			&& (cls != null || cls != '')) {
		Ext.getCmp(tapid).setTitle(text);
		Ext.getCmp(tapid).setIconClass(cls);
	}
	else {
		alert('参数错误！');
	}
}

function setNodeText(color, node) {
	node.setText("<font style='font-weight: bold;' color=" + color + ">" + node.text + "</font>");
}

initData = function() {
	if (Ext.get('relongin')) {
		Ext.get('relongin').on('click', function() {// 重新登录
					document.forms[0].submit();
				});
	}
	if (Ext.get('logout')) {
		Ext.get('logout').on('click', function() {// 退出系统
					if (confirm("确定要退出系统?") == true) {
						document.forms[0].action = getRootPath()
								+ "/login.do?method=logout";
						document.forms[0].submit();
						closeWindow();
					}
				});
	}
}
MenuTreePanel = function() {
	
	MenuTreePanel.superclass.constructor.call(this, {
		id : 'api-tree',
		region : 'west',
		split : true,
		header : false,
		width : 200,
		minSize : 200,
		maxSize : 300,
		collapsible : true,
		margins : '0 0 5 5',
		cmargins : '0 0 0 0',
		rootVisible : false,
		lines : true,
		autoScroll : true,
		animCollapse : true,
		animate : true,
		collapseFirst : false,
		collapseMode : 'mini',
		bodyStyle : HomeConfig.bodyStyle,
		listeners : {
			click : {
				scope : this,
				fn : function(node, e) {
					
					if (node.isLeaf()) {
						e.stopEvent();
						Ext.mainPanel.loadTabPanel(node);
					} else {
						node.expand();
					}
				}
			}
		},
		root : new Ext.tree.AsyncTreeNode({
					text : 'xiang',
					id : '0',
					expanded : true
					
					}),
		loader : new Ext.tree.TreeLoader({
			clearOnLoad :true,
			url : getRootPath() + HomeConfig.treeUrl,
			listeners : {
				beforeload : {
					scope : this,
					fn : function(loader, node) {
						loader.baseParams = {
							indentifier : node.id
						}
					}
				},
				load : {
					scope : this,
					fn : function(loader, node) {
						if (node.getDepth() == 0 ) {
							node.eachChild(function(nd) {
										if (!nd)
											return;
										setNodeText('#000000', nd);
										nd.getUI().removeClass("x-tree-node-icon");
										nd.getUI().addClass("feeds-node");
									});
						
						}else {
							node.eachChild(function(nd) {
										if (!nd)
											return;
											
										Ext.Element.fly(nd.getUI().getIconEl())
												.removeClass('x-tree-node-icon');
												
									});
						}
					}
				}
			}
		})
	});
	this.getSelectionModel().on('beforeselect', function(sm, node) {
				return node.isLeaf();
			});
};
function hasChild(n,re){ 
			    var str=false;
			    n.cascade(function(n1){
			        if(n1.isLeaf() && re.test(n1.text)){
			                     str=true;
			                     return str;
			             }
			         });
			     return str;
		    }
Ext.extend(MenuTreePanel, Ext.tree.TreePanel, {
			initComponent : function() {
				this.hiddenPkgs = [];
				Ext.apply(this, {
							tbar : [' ', new Ext.form.TextField({
										width : 80,
										emptyText : '查找',
										enableKeyEvents : true,
										listeners : {
											render : function(f) {
												this.filter = new Ext.tree.TreeFilter(
														this, {
															clearBlank : true,
															autoClear : true
														});
											},
											blur : {
												fn : this.filterTree,
												buffer : 500,
												scope : this
											},
											keydown : {
												fn : function (){
													this.root.expand(true);
												},
												scope : this
											},
											scope : this
										}
									}),' ', {
								iconCls : 'icon-expand-all',
								tooltip : '全部展开',
								handler : function() {
									this.root.expand(true);
								},
								scope : this
							}, '-', {
								iconCls : 'icon-collapse-all',
								tooltip : '全部关闭',
								handler : function() {
									this.root.collapse(true);
								},
								scope : this
							},
							 '-',
									
									new Ext.form.TextField({
										width : 60,
										emptyText : '跳转',
										enableKeyEvents : true,
										listeners : {
											render : function(f) {
												this.filter = new Ext.tree.TreeFilter(
														this, {
															clearBlank : true,
															autoClear : true
														});
											},
											blur : {
												fn : this.filterTree1,
												buffer : 500,
												scope : this
											},
											keydown : {
												fn : function (){
													
													this.root.expand(true);
												},
												buffer : 500,
												scope : this
											},
											scope : this
										}
									})
									
									
							]
						})
				MenuTreePanel.superclass.initComponent.call(this);
			},
			filterTree : function(t, e) {
			
				var text = t.getValue();
				Ext.each(this.hiddenPkgs, function(n) {
							n.ui.show();
						});
				if (!text) {
					this.filter.clear();
					return;
				}
				this.expandAll();
				var re = new RegExp(Ext.escapeRe(text), 'i');
				this.filter.filterBy(function(n) {
						if((!n.isLeaf()) || re.test(n.text)){
							
							return true;
						}else{
							return false;
						}
						
				});
				
				this.hiddenPkgs = [];
				var me = this;
				
				
				this.root.cascade(function(n) {
							if (!n.isLeaf() && n.ui.ctNode.offsetHeight < 3) {
								n.ui.hide();
								me.hiddenPkgs.push(n);
							}
							
							if(n.id!='0'){
							   if(!n.isLeaf() && n.ui.ctNode.offsetHeight >= 3 && hasChild(n,re)==false){
				                      n.ui.hide();
				                      me.hiddenPkgs.push(n);
				               }
				         	}
				        
 				});
			},
			filterTree1 : function(t, e) {
			
				var text = t.getValue();
				var num=/^[\d][\d][\d][\d]$/;
				if(num.test(text)){
					var re = new RegExp(Ext.escapeRe(text), 'i');
					var node = null;
					var i=0;
					
					this.filter.filterBy(function(n) {
							if((!n.isLeaf()) || re.test(n.text)){
								
								if(i==0&&n.attributes.url!=null){
									node =n;
								}
								return true;
							}else{
								return true;
							}
							i++;	
					});
					if(node!=null){
						Ext.mainPanel.loadTabPanel(node);
					}
					this.root.collapse(true);
				}
				
 				
			},
			
			showMsgInfo : function(msg) {
				Ext.Msg.show({
							title : "信息",
							msg : msg,
							fixCursor : true,
							icon : Ext.Msg.INFO,
							buttons : Ext.Msg.OK,
							minWidth : 300
						});
			}
		});
MainPanel = function() {
	MainPanel.superclass.constructor.call(this, {
		id : 'doc-body',
		region : 'center',
		margins : '0 5 5 0',
		resizeTabs : true,
		minTabWidth : 135,
		tabWidth : 135,
		tabPosition : HomeConfig.tabPosition || 'top',
		plugins : new Ext.ux.TabCloseMenu(),
		enableTabScroll : true,
		activeTab : 0,
		listeners : {
			tabchange : {
				scope : this,
				fn : function(tab, newtab) {
					var nodeId = newtab.id.replace('tab-', '');
					var node = Ext.treePanel.getNodeById(nodeId);
						if (node) {
							Ext.treePanel.selectPath(node.getPath())
							Ext.treePanel.getSelectionModel().select(node);
						} else {
							Ext.treePanel.getSelectionModel().clearSelections();
						}
						
					if(nodeId=='welcome-panel'){
						var mgr = new Ext.Updater("welcome-panel");
						mgr.startAutoRefresh(160, convertURL(getRootPath()
									+ (HomeConfig.welcomeUrl ? HomeConfig.welcomeUrl : '/')));
						mgr.on("update", function(){
							
						});
						
					}else{
						if (tab.getActiveTab().id == newtab.id) {
	
							if (window.frames["iframe-bancstone-" + nodeId]) {
								this.tabPanelReloadUrl(node);
							}
						}
					}
				}
			}

		},
		items : [{
			id : 'welcome-panel',
			title : '系统首页',
			iconCls : 'icon-home',
			autoScroll : true,
			autoLoad : {
				url : getRootPath()
						+ (HomeConfig.welcomeUrl ? HomeConfig.welcomeUrl : '/'),
				scope : this,
				scripts : true,
				text : '正在加载,请稍后...'
			}/*
				 * , tbar : [ Ext.getDom(HomeConfig.divUserInfo) ?
				 * Ext.getDom(HomeConfig.divUserInfo).innerText : '用户信息', '->', {
				 * text : '修改密码', pressed : true }, '-', { text : '重新登录',
				 * pressed : true }]
				 */
		}]
	});
};
Ext.extend(MainPanel, Ext.TabPanel, {
	initEvents : function() {
		this.mon(this.strip, 'dblclick', this.onDblClick, this);
		MainPanel.superclass.initEvents.call(this);
	},
	loaderUrl : function(url, nodeId) {
		url = getRootPath() + "/" + url;

		i1frame = "<iframe id='iframe-bancstone-"
				+ nodeId
				+ "' scrolling='auto' frameborder='0' width='100%' height='100%' src=''></iframe>"
		return i1frame;
	},
	tabPanelReloadUrl : function(node) {
		i1frameid = "iframe-bancstone-" + /* nodeId */node.id;
		Ext.MessageBox.wait('页面加载中,请稍后...');

		Ext.getDom(i1frameid).src = getRootPath() + "/" + convertURL(node.attributes.url);
		this.settInterval(i1frameid, 100);
	},

	isLoadComplete : function(i1frameid) {
		if (!window.frames[i1frameid]) {
			Ext.MessageBox.hide();
		} else if (window.frames[i1frameid].document.readyState == "complete") {
			Ext.MessageBox.hide();
		}
	},
	settInterval : function(i1frameid, time) {
		setInterval('Ext.mainPanel.isLoadComplete(i1frameid)', time);
	},
	onDblClick : function(e, target, o) {
		var t = this.findTargets(e);
		if (t.item.id != 'welcome-panel')
			if (t.item.fireEvent('beforeclose', t.item) !== false) {
				t.item.fireEvent('close', t.item);
				this.remove(t.item);
			}
	},

	loadTabPanel : function(node) {
		if (!node.isLeaf()) {
			return false;
		}
		var tabid = 'tab-' + node.id;
		var i1frameid = "iframe-bancstone-" + node.id;
		var tab = this.getComponent(tabid);
		
		if (tab) {
			if(this.getActiveTab().id == tabid) {
				Ext.getDom(i1frameid).src = getRootPath() + "/"+ convertURL(node.attributes.url);
			}
			this.setActiveTab(tab);
			Ext.MessageBox.wait('页面加载中,请稍后...');

			this.settInterval(i1frameid, 100);
		} else {
			
			if (node.attributes.url) {
			//alert(node.attributes.url);
				Ext.MessageBox.wait('页面加载中,请稍后...');
				
				this.createTabPanel(tab, node);
				this.settInterval(i1frameid, 100);
			} else {
				this.requestUrl(tab, node);
			}
		}
	},
	createTabPanel : function(tab, node) {
		
		if (node.attributes.url && node.attributes.url != null
				&& node.attributes.url != 'undefined'
				&& node.attributes.url != '') {
				//alert("333333333333333333"+this.getActiveTab().id);
				var arr = this.items.items;
					for(var i=0;i<arr.length;i++){
						if(arr[i].id!='welcome-panel'){
							this.remove(arr[i]);
						}
					}
				/*if(this.getActiveTab().id!='welcome-panel'){
					this.remove(this.getActiveTab());
				}*/
			
			tab = this.add(new Ext.Panel({
						layout : 'fit',
						border : false,
						closable : true,
						autoScroll : true,
						title : node.text,
						tabTip : node.text,
						id : 'tab-' + node.id,
						html : this.loaderUrl(node.attributes.url, node.id)
					}));
			this.setActiveTab(tab);
		} else {
			this.showMsgInfo('页面加载错误，错误原因：当前页面为【' + node.text + '】当前页面URL【'
					+ node.attributes.url + '】');
		}
	},
	requestUrl : function(tab, node) {
		if (HomeConfig.reqMenuUrl) {
			Ext.MessageBox.wait('页面加载中,请稍后...');

			Ext.Ajax.request({
						method : 'post',
						scope : this,
						url : getRootPath() + HomeConfig.reqMenuUrl,
						params : {
							ExtJsRPB : Ext.encode({
										identifier : node.id
									})
						},
						success : function(response, options) {
							var response = Ext.decode(response.responseText);
							if (response.success) {
								node.attributes.url = response.url;
								this.createTabPanel(tab, node);
								Ext.MessageBox.hide();
							} else {
								this.showMsgInfo(response.msginfo);
							}
						},
						failure : function(response, options) {
							this.showMsgInfo("服务器连接错误！ 错误信息：【"
									+ response.statusText + "】 错误代码：【"
									+ response.status + "】");
						}
					});
		}
	},
	showMsgInfo : function(msg) {
		Ext.Msg.show({
					title : "信息",
					msg : msg,
					fixCursor : true,
					icon : Ext.Msg.INFO,
					buttons : Ext.Msg.OK,
					minWidth : 300
				});
	}
});
var promenus1;
initlayout = function() {
	
	initData();
	Ext.QuickTips.init();
	Ext.BLANK_IMAGE_URL = getRootPath()
			+ '/ext2.2.1/resources/images/default/s.gif';
	if (!Ext.treePanel) {
		Ext.treePanel = new MenuTreePanel();
	}
	if (!Ext.mainPanel) {
		Ext.mainPanel = new MainPanel();
	}
	if (!Ext.mainviewport) {
		Ext.mainviewport = new Ext.Viewport({
					layout : 'border',
					items : [{
								height : 101,
								minSize : 101,
								maxSize : 101,
								split : true,
								region : 'north',
								collapseMode : 'mini',
								contentEl : 'header'
							}, Ext.treePanel, Ext.mainPanel]
				});
		Ext.mainviewport.doLayout();
	}
	setTimeout(function() {
				Ext.get('loading').remove();
				Ext.get('loading-mask').fadeOut({
							remove : true
						});
			}, 300);
};
function convertURL(url) {
	if (url.indexOf("?") >= 0) {
		url = url + '&timStamp=' + (new Date()).valueOf();
	}
	else {
		url = url + '?timStamp=' + (new Date()).valueOf();
	}
	return url;
}

Ext.onReady(initlayout);
Ext.Ajax.on('requestcomplete', function(ajax, xhr, o) {
			if (typeof urchinTracker == 'function' && o && o.url) {
				urchinTracker(o.url);
			}
		});

function closeWindow() {
	window.opener = null;
	window.open('', '_self');
	window.close();
}
