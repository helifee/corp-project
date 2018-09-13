formAjaxSubmitConfig = {
	waitmsg : '���ڴ�������,���Ժ�...',
	submiturl : getRootPath()
			+ '/picp/reportForms/PicpDayreportAction.do?method=DaliyRate'
}
/*
 * ���� 20101020 form Ajax��ʽ�ύ
 */
function formAjaxSubmit(formid) {
	Ext.MessageBox.wait(formAjaxSubmitConfig.waitmsg);
	Ext.Ajax.request({
				method : formAjaxSubmitConfig.method || 'post',
				scope : this,
				url : formAjaxSubmitConfig.submiturl,
				params : {
					ExtJsRPB : Ext.util.JSON.encode(Ext.encode(Ext
							.urlDecode(Ext.lib.Ajax.serializeForm(formid))))
				},
				success : function(response, options) {
					var response = Ext.decode(response.responseText);
					if (response.success) {
						Ext.MessageBox.hide();
						showMsgInfo(response.msginfo);
					}
					else {
						showMsgInfo(response.msginfo);
					}
				},
				failure : function(response, options) {
					showMsgInfo("���������Ӵ��� ������Ϣ����" + response.statusText
							+ "�� ������룺��" + response.status + "��");
				}
			});
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

/*
 * ���� 20101020 ���ñ�
 */
function resetForm() {
	form = document.forms[0];
	for (var i = 0; i < form.elements.length; i++) {
		var field = form.elements[i];
		var fieldType = form.elements[i].type.toLowerCase();
		if (fieldType != "submit" && fieldType != "reset"
				&& fieldType != "button") {
			if (fieldType == "radio" || fieldType == "checkbox") {
				field.checked = false;
			}
			else if (fieldType == "select") {
				field.selected = false;
			}
			else {
				field.value = "";
			}
		}
	}
}