function deleteSystemRole(indentifier) {
	if (confirm("�Ƿ�Ҫɾ���ý�ɫ?") == true) {
		
		var url = getRootPath()
				+ "/systemManage/systemRoleManageAction.do?method=deleteSystemRole&indentifier="
				+ indentifier;
	 	var i = createWin("wind","ɾ����ɫ",url);
	 	i.on("beforedestroy",function(){
	 		window.location.href=getRootPath()
				+ "/systemManage/systemRoleManageAction.do?method=querySystemRole";
			return true;
	 	});
	 	i.show();
	}
}
function querySystemRoleByIndentifier(indentifier) {
	
	var url = getRootPath()
			+ "/systemManage/systemRoleManageAction.do?method=querySystemRoleByIndentifier&indentifier="
			+ indentifier;
	 	var i = createWin("wind","�޸Ľ�ɫ",url);
	 	i.on("beforedestroy",function(){
	 		window.location.href=getRootPath()
				+ "/systemManage/systemRoleManageAction.do?method=querySystemRole";
			return true;
	 	});
	 	i.show();
}
function querySystemRole() {
	document.forms[0].action = getRootPath()
			+ "/systemManage/systemRoleManageAction.do?method=querySystemRole";
	document.forms[0].submit();
}
function addSystemRoleView() {
	
	var url = getRootPath()
			+ "/systemManage/systemRoleManageAction.do?method=addSystemRoleView";
	 	var i = createWin("wind","������ɫ",url);
	 	i.on("beforedestroy",function(){
	 		window.location.href=getRootPath()
				+ "/systemManage/systemRoleManageAction.do?method=querySystemRole";
			return true;
	 	});
	 	i.show();
}
function systemRoleDetail(indentifier) {
	
	var url = getRootPath()
			+ "/systemManage/systemRoleManageAction.do?method=systemRoleDetail&indentifier="
			+ indentifier;
	 	var i = createWin("wind","��ѯ��ɫ",url);
	 	i.on("beforedestroy",function(){
	 		window.location.href=getRootPath()
				+ "/systemManage/systemRoleManageAction.do?method=querySystemRole";
			return true;
	 	});
	 	i.show();
}
function distributionSystemAuthor(identifier, rolename, rolenamecode) {
//	alert("rolename:"+rolename+"rolenamecode:"+rolenamecode)
	/*window.location.href = getRootPath()
			+ "/systemManage/systemRoleManageAction.do?method=distributionSystemAuthor&identifier="
			+ identifier + "&rolename=" + rolename ;*/
	var url = getRootPath()
			+ "/systemManage/systemRoleManageAction.do?method=distributionSystemAuthor&identifier="
			+ identifier ;
			+ "&rolename=" + rolename ;		
	var i = createWin("wind","��ɫȨ�޷���",url);
	i.on("beforedestroy",function(){
	 		window.location.href=getRootPath()
				+ "/systemManage/systemRoleManageAction.do?method=querySystemRole";
			return true;
	 	});
	 	i.show();
}
function reset(roletypeForm) {
	roletypeForm.reset();
}