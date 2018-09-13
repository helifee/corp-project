/**
 * 王亮 关闭IE浏览器窗口
 */
function closeWindow() {
	window.opener = null;
	window.open(' ', '_self', ' ');
	window.close();
}
/**
 * window.open 弹出新窗口的命令； 'page.html' 弹出窗口的文件名； 'newwindow'
 * 弹出窗口的名字（不是文件名），非必须，可用空''代替； height=100 窗口高度； width=400 窗口宽度； top=0
 * 窗口距离屏幕上方的象素值； left=0 窗口距离屏幕左侧的象素值； toolbar=no 是否显示工具栏，yes为显示；
 * menubar，scrollbars 表示菜单栏和滚动栏。 resizable=no 是否允许改变窗口大小，yes为允许； location=no
 * 是否显示地址栏，yes为允许； status=no 是否显示状态栏内的信息（通常是文件已经打开），yes为允许； 方法一：<body
 * onload="openWindow()"> 浏览器读页面时弹出窗口； 方法二：<body onunload="openWindow()">
 * 浏览器离开页面时弹出窗口； 方法三：用一个连接调用： <a href="#" onclick="openWindow()">打开一个窗口</a>
 * 注意：使用的“#”是虚连接。 方法四：用一个按钮调用： <input type="button" onclick="openWindow()"
 * value="打开窗口">
 * 
 * @param {}
 *            url
 */
function openWindow(url, title) {
	window
			.open(
					getRootPath() + url,
					title,
					'top=0, left=0, ,toolbar=no, menubar=no, scrollbars=no, resizable=yes,location=no, status=no,fullscreen=true');
}
/**
 * 最大化打开窗口
 * 
 * @param {}
 *            url
 * @param {}
 *            title
 */
function openMaxWindow(url) {
	window.open(getRootPath() + url, 'fullscreen',
			'channelmode=yes,fullscreen=yes');// 以最大化模式打开窗口
}
