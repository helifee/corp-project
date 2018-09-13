sysMsgWinConfig = {
	title : '�����û���Ϣ',
	readerroot : 'recoders',
	readerfields : ['account', 'cname', 'orgcode', 'inputname',
			'currentTotalNum', 'currentTotsequNum'],
	columns : [{
				header : "����˺�",
				menuDisabled : true,
				align : 'center',
				dataIndex : 'account'
			}, {
				header : "�ͻ�����",
				menuDisabled : true,
				align : 'center',
				dataIndex : 'cname'
			}, {
				header : "�������",
				menuDisabled : true,
				align : 'center',
				dataIndex : 'orgcode'
			}, {
				header : "�ͻ�����",
				menuDisabled : true,
				align : 'center',
				dataIndex : 'inputname'
			}, {
				header : "�����ۼ����ڴ���",
				menuDisabled : true,
				align : 'center',
				dataIndex : 'currentTotalNum'
			}, {
				header : "�����������ڴ�",
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
 * ϵͳ��ϢWindow����
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
			title : sysMsgWinConfig.title || '��û�����ñ���,����config������title:title',
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
						text : sysMsgWinConfig.buttonYesText || '�ر�',
						scope : this,
						handler : function() {
							if (sysMsgWinConfig.submiturl) {
								this.sendRequest();
							}
							else {
								this.showMsgInfo("��û�������ύ��Զ�̵�ַ, �������ύ��ַ ! ");
							}
						}
					}]
		})
		Ext.SysMsgWindow.superclass.initComponent.call(this);
	},
	showMsgInfo : function(msg) {
		Ext.Msg.show({
					title : "��Ϣ",
					msg : msg,
					fixCursor : true,
					icon : Ext.Msg.INFO,
					buttons : Ext.Msg.OK,
					minWidth : 300
				});
	},
	sendRequest : function() {
		var window = this;
		Ext.MessageBox.wait("���ڴ�������,���Ժ�...");
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
						window.showMsgInfo("���������Ӵ��� ������Ϣ����"
								+ response.statusText + "�� ������룺��"
								+ response.status + "��");
					}
				});
	}
});
/**
 * ��ǰ�û�(��¼�û�)����������ʱ��������ʾ��Ϣ
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
 * ϵͳ���д���ֵΪ��2ʱ��������ʾ��Ϣ
 */
function showMsgWindow1() {
	Ext.BLANK_IMAGE_URL = getRootPath()
			+ "/ext2.2.1/resources/images/default/s.gif";
	if (!sysMsgWinConfig.window) {
		sysMsgWinConfig.window = new Ext.SysMsgWindow();
	}
	sysMsgWinConfig.window.showMsgInfo("ϵͳ�����쳣 ! ����ϵ��صļ�����Ա���д�����PARAVALֵΪ��"
			+ document.getElementById("runstatuscode").value + "��");
}
if (document.getElementById("runstatuscode")
		&& (document.getElementById("runstatuscode").value == "2"
				|| document.getElementById("runstatuscode").value == 2 || document
				.getElementById("runstatuscode").value == "")) {
	showMsgWindow1();
}

/**
 * ����Ļ���½���ʾϵͳ��Ϣ����Ϣ����
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
