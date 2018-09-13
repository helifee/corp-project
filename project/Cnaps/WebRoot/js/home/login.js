function loginSystem() {
	if (VForm.Validate()) {
		Ext.MessageBox.wait("���ڵ�¼,���Ժ�...");
		setTimeOut('ϵͳ��½��ʱ ! ', 30000);
		Ext.Ajax.request({
					method : 'POST',
					url : getRootPath()
							+ '/login.do?method=loginValidate',
					params : {
						ExtJsRPB : Ext.util.JSON.encode({
									username : document.forms[0].username.value,
									password : document.forms[0].password.value
								})
					},
					success : function(response, options) {
						var response = Ext.decode(response.responseText);
						if (response.success) {
							document.forms[0].submit();// ��¼��ʽ1����֤�ɹ���ͳģʽ��¼
							Ext.MessageBox.hide();
						}
						else {
							showMsgInfo(response.msginfo);
						}
					},
					failure : function(response, options) {
						Ext.MessageBox.hide();
						showMsgInfo("���������Ӵ��� ������Ϣ����" + response.statusText
								+ "�� ������룺��" + response.status + "��");
					}
				});
	}
}
function setTimeOut(msg, time) {
	setTimeout(function() {
				showMsgInfo(msg);
			}, time);
}
function showMsgInfo(msg) {
	Ext.Msg.show({
				title : "��Ϣ",
				msg : msg,
				fixCursor : true,
				icon : Ext.Msg.INFO,
				buttons : Ext.Msg.OK,
				minWidth : 300
			});
}
function cancel() {
	document.forms[0].reset();
}
document.onkeydown = function keydown() {
	if (window.event.keyCode == 13) {
		loginSystem();
	}
}
