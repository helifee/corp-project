/**
 * 王亮 2010-08-20 用户控制html元素的隐藏于显示
 * 
 * @param {}
 *            x
 * @param {}
 *            y
 */
function display(x, y) {// 00001总行、00004分行
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
