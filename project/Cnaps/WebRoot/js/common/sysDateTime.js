/**
 * ���� ������ʾϵͳ�ĵ�ǰʱ��
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
		day = " ������"
	if (today.getDay() == 1)
		day = " ����һ"
	if (today.getDay() == 2)
		day = " ���ڶ�"
	if (today.getDay() == 3)
		day = " ������"
	if (today.getDay() == 4)
		day = " ������"
	if (today.getDay() == 5)
		day = " ������"
	if (today.getDay() == 6)
		day = " ������"
	// time
	var amOrPm = "����";
	if (hours > 11)
		amOrPm = "����";
	if (hours > 17)
		amOrPm = "����";
	if (hours > 23)
		amOrPm = "�賿";
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
	sysdate = "ϵͳʱ�䣺" + (today.getYear()) + "��" + (today.getMonth() + 1) + "��"
			+ today.getDate() + "��" + day + " " + systime;
	document.getElementById("homedatetime").innerText = sysdate;
}
setInterval("showDateTime()", 1000);