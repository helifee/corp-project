function deleteSystemRole(indentifier) {
	if (confirm("是否要删除该角色?") == true) {
		
		var url = getRootPath()
				+ "/systemManage/systemRoleManageAction.do?method=deleteSystemRole&indentifier="
				+ indentifier;
	 	var i = createWin("wind","删除角色",url);
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
	 	var i = createWin("wind","修改角色",url);
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
	 	var i = createWin("wind","新增角色",url);
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
	 	var i = createWin("wind","查询角色",url);
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
	var i = createWin("wind","角色权限分配",url);
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