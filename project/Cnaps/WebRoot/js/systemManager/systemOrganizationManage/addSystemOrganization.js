function addSystemOrganization(organizationForm) {
	var bankNumber = getObjectByName(organizationForm, "bankNumber").value;
	var nameCode = getObjectByName(organizationForm, "namecode").value;
	var levelCode = getObjectByName(organizationForm, "levelCode").value;
	var organizationName = getObjectByName(organizationForm, "name").value;
	// var parentidentifier = getObjectByName(organizationForm,
	// "parentidentifier").value;
	var brcode = /^([0-9]{12})/;
	/*
	 * if (!brcode.exec(bankNumber)) { alert("您输入的行号长度不够或有非法字符！"); return false; }
	 */
	if (levelCode == "") {
		alert("请选择机构级别");
		return false;
	}
	if (nameCode == "") {
		alert("请选择机构级别");
		return false;
	}
	if (organizationName == "") {
		alert("机构名称不能为空");
		return false;
	}
	if (bankNumber == "") {
		alert("参与机构行号不能为空");
		return false;
	}

	// if (parentidentifier == "") {
	// alert("请选择父级机构！");
	// return false;
	// }
	organizationForm.submit();
}