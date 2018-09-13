function modifySystemGroup(groupform) {
	var teamName = getObjectByName(groupform, "teamname").value;
	var nameCode = getObjectByName(groupform, "namecode").value;

	if (teamName == "" || nameCode == "") {
		alert("红色*标记项不能为空，请填写！");
		return false;
	}

	if (teamName == "" || teamName == null) {
		alert("用户组名称不能为空！(也不能为null)");
		return false;
	}

	if (nameCode == "" || nameCode == null) {
		alert("名称代码不能为空！(也不能为null)");
		return false;
	}
	groupform.submit();

}