function modifySystemGroup(groupform) {
	var teamName = getObjectByName(groupform, "teamname").value;
	var nameCode = getObjectByName(groupform, "namecode").value;

	if (teamName == "" || nameCode == "") {
		alert("��ɫ*������Ϊ�գ�����д��");
		return false;
	}

	if (teamName == "" || teamName == null) {
		alert("�û������Ʋ���Ϊ�գ�(Ҳ����Ϊnull)");
		return false;
	}

	if (nameCode == "" || nameCode == null) {
		alert("���ƴ��벻��Ϊ�գ�(Ҳ����Ϊnull)");
		return false;
	}
	groupform.submit();

}