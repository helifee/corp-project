function loginSystem() {
	if (VForm.Validate()) {
		Ext.MessageBox.wait("正在登录,请稍后...");
		setTimeOut('系统登陆超时 ! ', 30000);
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
							document.forms[0].submit();// 登录方式1：验证成功传统模式登录
							Ext.MessageBox.hide();
						}
						else {
							showMsgInfo(response.msginfo);
						}
					},
					failure : function(response, options) {
						Ext.MessageBox.hide();
						showMsgInfo("服务器连接错误！ 错误信息：【" + response.statusText
								+ "】 错误代码：【" + response.status + "】");
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
				title : "信息",
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
