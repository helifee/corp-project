
// ��ѯ�û��б�
function queryUserList() {
	document.systemusersmanageForm.action = getRootPath()
			+ "/systemManage/systemUserManage/systemUserManageAction.do?method=queryUserList";
	document.systemusersmanageForm.submit();
}
// ׼������µ��û��������ҳ��
function prepareAddUser() {
	
	var url = getRootPath()
			+ "/systemManage/systemUserManage/systemUserManageAction.do?method=addUserPrepare";
 	var i = createWin("wind","�����û�",url);
 	i.on("beforedestroy",function(){
 		window.location.href=getRootPath()
			+ "/systemManage/systemUserManage/systemUserManageAction.do?method=queryUserList";
		return true;
 	});
 	i.show();
}
// ������������ѯ���ݣ�׼���޸�����
function modifyByKey(indentifier) {
	
	var url = getRootPath()
			+ "/systemManage/systemUserManage/systemUserManageAction.do?method=modifyUserByIndentifierPrepare&indentifier="
			+ indentifier + "&type=modify";
 	var i = createWin("wind","�޸��û�",url);
 	i.on("beforedestroy",function(){
 		window.location.href=getRootPath()
			+ "/systemManage/systemUserManage/systemUserManageAction.do?method=queryUserList";
		return true;
 	});
 	i.show();
}
// ���������鿴��ϸ
function viewByKey(indentifier) {
	
	var url =  getRootPath()
			+ "/systemManage/systemUserManage/systemUserManageAction.do?method=modifyUserByIndentifierPrepare&indentifier="
			+ indentifier + "&type=view";
 	var i = createWin("wind","�鿴��ϸ",url);
 	i.on("beforedestroy",function(){
 		window.location.href=getRootPath()
			+ "/systemManage/systemUserManage/systemUserManageAction.do?method=queryUserList";
		return true;
 	});
 	i.show();
}
// ���������޸�����
function modifyPasswordByKey(indentifier) {
	
	var url =  getRootPath()
			+ "/systemManage/systemUserManage/systemUserManageAction.do?method=modifyUserPasswordView&indentifier="
			+ indentifier ;
 	var i = createWin("wind","�޸�����",url);
 	i.on("beforedestroy",function(){
 		window.location.href=getRootPath()
			+ "/systemManage/systemUserManage/systemUserManageAction.do?method=queryUserList";
		return true;
 	});
 	i.show();
}
// ��������ɾ������
function deleteByKey(indentifier) {
	if (confirm("�Ƿ�Ҫɾ��������¼?") == true) {
		
		var url = getRootPath()
				+ "/systemManage/systemUserManage/systemUserManageAction.do?method=deleteUserByIndentifier&indentifier="
				+ indentifier;
	 	var i = createWin("wind","�޸��û�",url);
	 	i.on("beforedestroy",function(){
 		window.location.href=getRootPath()
			+ "/systemManage/systemUserManage/systemUserManageAction.do?method=queryUserList";
		return true;
 	});
	 	i.show();
	}
}

function resetPasswordByKey(indentifier) {
	if (confirm("ȷ��Ҫ��������?")) {
		
		var url = getRootPath()
				+ "/systemManage/systemUserManage/systemUserManageAction.do?method=resetPasswordByKey&indentifier="
				+ indentifier;
	 	var i = createWin("wind","�޸��û�",url);
	 	i.on("beforedestroy",function(){
	 		window.location.href=getRootPath()
				+ "/systemManage/systemUserManage/systemUserManageAction.do?method=queryUserList";
			return true;
	 	});
	 	i.show();
	}
}


config = {
	renderId : 'orgcomrenderid',
	hiddenName : 'organizationindentifier',
	valueField : 'namecode',
	displayField : 'name',
	url : getRootPath()
			+ '/systemManage/systemOrganizationManageAction.do?method=findOrgByNameCode'
}
