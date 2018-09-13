/**
 * 王亮 用于显示系统的当前时间
 */
// setInterval("homedatetime.innerHTML=new Date().toLocaleString()", 1000);
function showDateTime() {
	var enabled = 0, today = new Date();;
	var day, date, hours, minutes, seconds;
	hours = today.getHours();
	minutes = today.getMinutes();
	seconds = today.getSeconds();
	// week
	if (today.getDay() == 0)
		day = " 星期日"
	if (today.getDay() == 1)
		day = " 星期一"
	if (today.getDay() == 2)
		day = " 星期二"
	if (today.getDay() == 3)
		day = " 星期三"
	if (today.getDay() == 4)
		day = " 星期四"
	if (today.getDay() == 5)
		day = " 星期五"
	if (today.getDay() == 6)
		day = " 星期六"
	// time
	var amOrPm = "上午";
	if (hours > 11)
		amOrPm = "下午";
	if (hours > 17)
		amOrPm = "晚上";
	if (hours > 23)
		amOrPm = "凌晨";
	if (hours > 12)
		hours = hours - 12;
	if (hours == 0)
		hours = 12;
	if (hours < 10)
		hours = "0" + hours;
	if (minutes < 10)
		minutes = "0" + minutes;
	if (seconds < 10)
		seconds = "0" + seconds
	systime = amOrPm + " " + hours + ":" + minutes + ":" + seconds + "";
	sysdate = "系统时间：" + (today.getYear()) + "年" + (today.getMonth() + 1) + "月"
			+ today.getDate() + "日" + day + " " + systime;
	document.getElementById("homedatetime").innerText = sysdate;
}
setInterval("showDateTime()", 1000);