// 按回车键执行返回操作
document.onkeydown = function keydown() {
	if (window.event.keyCode == 13) {
		if (document.getElementById("backtype").value == "nourl") {// 不带连接地址的返回
			fireClick("backbutton");
		}
		else if (document.getElementById("backtype").value == "yesurl") {// 带连接地址的返回
			// goUrl();
			fireClick("backbutton");
		}
		else {
			alert("返回类型 backtype 的的值不合法! backtype 的值为："
					+ document.getElementById("backtype"))
		}
	}
}
function fireClick(id) {// 出发按钮点击事件
	document.getElementById(id).focus();
	document.getElementById(id).click();
}
