/**
 * ���� 2010-08-20 �û�����htmlԪ�ص���������ʾ
 * 
 * @param {}
 *            x
 * @param {}
 *            y
 */
function display(x, y) {// 00001���С�00004����
	$(x).style.display = ("${orgentity.parentidentifier}" == "00001" || "${orgentity.parentidentifier}" == "00004")
			? ""
			: "none";
	$(y).style.display = ("${orgentity.parentidentifier}" == "00001" || "${orgentity.parentidentifier}" == "00004")
			? ""
			: "none";
}
function display(y) {
	$(y).style.display = ("${orgentity.parentidentifier}" == "00001" || "${orgentity.parentidentifier}" == "00004")
			? ""
			: "none";
}
function $(s) {
	return document.getElementById(s);
}
