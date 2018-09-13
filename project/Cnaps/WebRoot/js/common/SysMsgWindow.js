sysMsgWinConfig = {
	title : '冻结用户信息',
	readerroot : 'recoders',
	readerfields : ['account', 'cname', 'orgcode', 'inputname',
			'currentTotalNum', 'currentTotsequNum'],
	columns : [{
				header : "理财账号",
				menuDisabled : true,
				align : 'center',
				dataIndex : 'account'
			}, {
				header : "客户名称",
				menuDisabled : true,
				align : 'center',
				dataIndex : 'cname'
			}, {
				header : "申请机构",
				menuDisabled : true,
				align : 'center',
				dataIndex : 'orgcode'
			}, {
				header : "客户经理",
				menuDisabled : true,
				align : 'center',
				dataIndex : 'inputname'
			}, {
				header : "本次累计逾期次数",
				menuDisabled : true,
				align : 'center',
				dataIndex : 'currentTotalNum'
			}, {
				header : "本次连续逾期次",
				menuDisabled : true,
				align : 'center',
				dataIndex : 'currentTotsequNum'
			}],
	submiturl : getRootPath()
			+ '/picp/overdue/PicpOverdueAction.do?method=modifyPicpOverdues',
	loadurl : getRootPath()
			+ '/picp/overdue/PicpOverdueAction.do?method=quertAllAlertOverdueList',
	maximizable : true,
	resizable : true
}
/**
 * 系统消息Window窗口
 * 
 * @class Ext.SysMsgWindow
 * @extends Ext.Window
 */
Ext.SysMsgWindow = Ext.extend(Ext.Window, {
	submiturl : sysMsgWinConfig.submiturl,
	bodyStyle : 'padding:5px',
	animateTarget : Ext.getBody(),
	initComponent : function() {
		Ext.apply(this, {
			layout : 'fit',
			closeAction : 'hide',
			buttonAlign : 'center',
			width : sysMsgWinConfig.width || 740,
			height : sysMsgWinConfig.height || 410,
			title : sysMsgWinConfig.title || '还没有设置标题,请在config中设置title:title',
			modal : sysMsgWinConfig.modal || false,
			closable : sysMsgWinConfig.closable || false,
			resizable : sysMsgWinConfig.resizable || false,
			maximizable : sysMsgWinConfig.maximizable || false,
			defaults : {
				border : false,
				loadMask : true
			},
			items : [new Ext.grid.GridPanel({
						border : false,
						autoScroll : true,
						ds : new Ext.data.Store({
									autoLoad : true,
									proxy : new Ext.data.HttpProxy({
												url : sysMsgWinConfig.loadurl
											}),
									reader : new Ext.data.JsonReader({
												root : sysMsgWinConfig.readerroot
											}, sysMsgWinConfig.readerfields)
								}),
						cm : new Ext.grid.ColumnModel(sysMsgWinConfig.columns),
						listeners : {
							beforedestroy : function() {
								return false;
							}
						},
						viewConfig : {
							forceFit : true
						}
					})],
			keys : {
				key : [13],
				fn : this.sendRequest,
				scope : this
			},
			buttons : [{
						text : sysMsgWinConfig.buttonYesText || '关闭',
						scope : this,
						handler : function() {
							if (sysMsgWinConfig.submiturl) {
								this.sendRequest();
							}
							else {
								this.showMsgInfo("还没有配置提交的远程地址, 请配置提交地址 ! ");
							}
						}
					}]
		})
		Ext.SysMsgWindow.superclass.initComponent.call(this);
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
	},
	sendRequest : function() {
		var window = this;
		Ext.MessageBox.wait("正在处理数据,请稍后...");
		Ext.Ajax.request({
					method : 'post',
					scope : this,
					url : sysMsgWinConfig.submiturl,
					success : function(response, options) {
						var response = Ext.decode(response.responseText);
						if (response.success) {
							window.hide();
							Ext.MessageBox.hide();
						}
					},
					failure : function(response, options) {
						window.showMsgInfo("服务器连接错误！ 错误信息：【"
								+ response.statusText + "】 错误代码：【"
								+ response.status + "】");
					}
				});
	}
});
/**
 * 当前用户(登录用户)有逾期数据时弹出的提示消息
 */
function showMsgWindow() {
	Ext.BLANK_IMAGE_URL = getRootPath()
			+ "/ext2.2.1/resources/images/default/s.gif";
	if (!sysMsgWinConfig.window) {
		sysMsgWinConfig.window = new Ext.SysMsgWindow();
	}
	sysMsgWinConfig.window.show();
}

if (document.getElementById("isAlertFlag")
		&& (document.getElementById("isAlertFlag").value == "0"
				|| document.getElementById("isAlertFlag").value == 0 || document
				.getElementById("isAlertFlag").value == "")) {
	showMsgWindow();
}
/**
 * 系统运行代码值为：2时弹出的提示消息
 */
function showMsgWindow1() {
	Ext.BLANK_IMAGE_URL = getRootPath()
			+ "/ext2.2.1/resources/images/default/s.gif";
	if (!sysMsgWinConfig.window) {
		sysMsgWinConfig.window = new Ext.SysMsgWindow();
	}
	sysMsgWinConfig.window.showMsgInfo("系统运行异常 ! 请联系相关的技术人员进行处理。【PARAVAL值为："
			+ document.getElementById("runstatuscode").value + "】");
}
if (document.getElementById("runstatuscode")
		&& (document.getElementById("runstatuscode").value == "2"
				|| document.getElementById("runstatuscode").value == 2 || document
				.getElementById("runstatuscode").value == "")) {
	showMsgWindow1();
}

/**
 * 在屏幕右下角显示系统消息的消息窗口
 * 
 * @param {}
 *            msg
 */
function showSysMessage(msg) {
	if (!Ext.Notification && Ext.ux.Notification) {
		Ext.Notification = new Ext.ux.Notification({
					iconCls : 'x-icon-information',
					title : 'information',
					height : 100,
					width : 200,
					hideDelay : 5000,
					autoDestroy : true,
					html : '<b>' + msg + '</b>',
					listeners : {
						'beforerender' : function() {
							Sound.enable();
							Sound.play(getRootPath() + '/sound/notify.wav');
							Sound.disable();
						}
					}
				});
	}
	if (Ext.Notification && Ext.ux.Notification)
		Ext.Notification.show(Ext.getDoc());
}
