// ���س���ִ�з��ز���
document.onkeydown = function keydown() {
	if (window.event.keyCode == 13) {
		if (document.getElementById("backtype").value == "nourl") {// �������ӵ�ַ�ķ���
			fireClick("backbutton");
		}
		else if (document.getElementById("backtype").value == "yesurl") {// �����ӵ�ַ�ķ���
			// goUrl();
			fireClick("backbutton");
		}
		else {
			alert("�������� backtype �ĵ�ֵ���Ϸ�! backtype ��ֵΪ��"
					+ document.getElementById("backtype"))
		}
	}
}
function fireClick(id) {// ������ť����¼�
	document.getElementById(id).focus();
	document.getElementById(id).click();
}
