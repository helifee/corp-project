function modifySystemRole(organizationForm) {
	var name = getObjectByName(organizationForm, "name").value;
	//var nameCode = getObjectByName(organizationForm, "namecode").value;
	/*if (name == ""||nameCode == "") {
			alert("��ɫ*������Ϊ�գ�����д��");
		return false;
	}*/
	if (name == "") {
			alert("��ɫ���Ʋ���Ϊ��ֵ��");
		return false;
	}
	/*if (nameCode == "") {
		alert("���ƴ��벻��Ϊ��ֵ��");
		return false;
	}*/
		document.forms[0].submit();
}