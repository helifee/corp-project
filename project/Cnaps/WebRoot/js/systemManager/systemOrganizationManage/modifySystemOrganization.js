function modifySystemOrganization(organizationForm) {

	// var bankNumber = getObjectByName(organizationForm, "bankNumber").value;
	var nameCode = getObjectByName(organizationForm, "namecode").value;
	var levelCode = getObjectByName(organizationForm, "levelCode").value;
	var organizationName = getObjectByName(organizationForm, "name").value;
	// var parentIdentifier = getObjectByName(organizationForm,
	// "parentidentifier").value;
	var brcode = /^([0-9]{12})/;
	/*
	 * if (!brcode.exec(bankNumber)) { alert("��������кų��Ȳ������зǷ��ַ���"); return false; }
	 */
	if (levelCode == "") {
		alert("��ѡ���������");
		return false;
	}
	if (nameCode == "") {
		alert("��ѡ���������");
		return false;
	}
	if (organizationName == "") {
		alert("�������Ʋ���Ϊ��");
		return false;
	}
	//
	// if (parentIdentifier == "") {
	// alert("��ѡ�񸸼�������");
	// return false;
	// }
	organizationForm.submit();
}