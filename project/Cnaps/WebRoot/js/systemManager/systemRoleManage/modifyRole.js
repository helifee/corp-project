function modifySystemRole(organizationForm) {
	var name = getObjectByName(organizationForm, "name").value;
	//var nameCode = getObjectByName(organizationForm, "namecode").value;
	/*if (name == ""||nameCode == "") {
			alert("红色*标记项不能为空，请填写！");
		return false;
	}*/
	if (name == "") {
			alert("角色名称不能为空值！");
		return false;
	}
	/*if (nameCode == "") {
		alert("名称代码不能为空值！");
		return false;
	}*/
		document.forms[0].submit();
}