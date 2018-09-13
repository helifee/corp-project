function deleteSystemGroup(indentifier) {
	if (confirm("是否要删除该用户?") == true) {
		document.forms[0].action = getRootPath()
				+ "/systemManage/systemGroupManageAction.do?method=deleteSystemGroup&indentifier="
				+ indentifier;
		document.forms[0].submit();
	}
}
function querySystemGroupByIndentifier(indentifier) {
	document.forms[0].action = getRootPath()
			+ "/systemManage/systemGroupManageAction.do?method=querySystemGroupByIndentifier&indentifier="
			+ indentifier;
	document.forms[0].submit();
}
function querySystemGroup() {
	document.forms[0].action = getRootPath()
			+ "/systemManage/systemGroupManageAction.do?method=querySystemGroup";
	document.forms[0].submit();
}

function systemGroupDetail(indentifier) {
	document.forms[0].action = getRootPath()
			+ "/systemManage/systemGroupManageAction.do?method=systemGroupDetail&indentifier="
			+ indentifier;
	document.forms[0].submit();
}

function addSystemGroupView() {
	document.forms[0].action = getRootPath()
			+ "/systemManage/systemGroupManageAction.do?method=addSystemGroupView";
	document.forms[0].submit();
}

function reset() {
	document.forms[0].reset();
}