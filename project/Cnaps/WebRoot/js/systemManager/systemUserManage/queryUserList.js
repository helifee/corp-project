
// 查询用户列表
function queryUserList() {
	document.systemusersmanageForm.action = getRootPath()
			+ "/systemManage/systemUserManage/systemUserManageAction.do?method=queryUserList";
	document.systemusersmanageForm.submit();
}
// 准备添加新的用户，打开添加页面
function prepareAddUser() {
	
	var url = getRootPath()
			+ "/systemManage/systemUserManage/systemUserManageAction.do?method=addUserPrepare";
 	var i = createWin("wind","新增用户",url);
 	i.on("beforedestroy",function(){
 		window.location.href=getRootPath()
			+ "/systemManage/systemUserManage/systemUserManageAction.do?method=queryUserList";
		return true;
 	});
 	i.show();
}
// 根据主键，查询数据，准备修改数据
function modifyByKey(indentifier) {
	
	var url = getRootPath()
			+ "/systemManage/systemUserManage/systemUserManageAction.do?method=modifyUserByIndentifierPrepare&indentifier="
			+ indentifier + "&type=modify";
 	var i = createWin("wind","修改用户",url);
 	i.on("beforedestroy",function(){
 		window.location.href=getRootPath()
			+ "/systemManage/systemUserManage/systemUserManageAction.do?method=queryUserList";
		return true;
 	});
 	i.show();
}
// 根据主键查看明细
function viewByKey(indentifier) {
	
	var url =  getRootPath()
			+ "/systemManage/systemUserManage/systemUserManageAction.do?method=modifyUserByIndentifierPrepare&indentifier="
			+ indentifier + "&type=view";
 	var i = createWin("wind","查看明细",url);
 	i.on("beforedestroy",function(){
 		window.location.href=getRootPath()
			+ "/systemManage/systemUserManage/systemUserManageAction.do?method=queryUserList";
		return true;
 	});
 	i.show();
}
// 根据主键修改密码
function modifyPasswordByKey(indentifier) {
	
	var url =  getRootPath()
			+ "/systemManage/systemUserManage/systemUserManageAction.do?method=modifyUserPasswordView&indentifier="
			+ indentifier ;
 	var i = createWin("wind","修改密码",url);
 	i.on("beforedestroy",function(){
 		window.location.href=getRootPath()
			+ "/systemManage/systemUserManage/systemUserManageAction.do?method=queryUserList";
		return true;
 	});
 	i.show();
}
// 根据主键删除数据
function deleteByKey(indentifier) {
	if (confirm("是否要删除该条记录?") == true) {
		
		var url = getRootPath()
				+ "/systemManage/systemUserManage/systemUserManageAction.do?method=deleteUserByIndentifier&indentifier="
				+ indentifier;
	 	var i = createWin("wind","修改用户",url);
	 	i.on("beforedestroy",function(){
 		window.location.href=getRootPath()
			+ "/systemManage/systemUserManage/systemUserManageAction.do?method=queryUserList";
		return true;
 	});
	 	i.show();
	}
}

function resetPasswordByKey(indentifier) {
	if (confirm("确定要重置密码?")) {
		
		var url = getRootPath()
				+ "/systemManage/systemUserManage/systemUserManageAction.do?method=resetPasswordByKey&indentifier="
				+ indentifier;
	 	var i = createWin("wind","修改用户",url);
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
