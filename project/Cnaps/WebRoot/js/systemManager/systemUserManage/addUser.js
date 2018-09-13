// ÃÌº””√ªß
function addUserInfo() {
	 if (VForm.Validate()) {
		document.forms[0].action = getRootPath()
				+ "/systemManage/systemUserManage/systemUserManageAction.do?method=addUser";
		document.forms[0].submit();
	 }
}
config = {
	renderId : 'orgcomrenderid',
	hiddenName : 'organizationindentifier',
	valueField : 'indentifier',
	displayField : 'name',
	url : getRootPath()
			+ '/systemManage/systemOrganizationManageAction.do?method=findOrgByNameCode'
}
