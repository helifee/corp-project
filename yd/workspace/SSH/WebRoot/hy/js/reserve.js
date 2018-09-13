
function init() {
	
	var value = 0;
	var radio = window.document.getElementsByName('yuyueinfo.yuyuetype');
	for(i=0; i<radio.length; i++) {
		if(radio[i].checked) {
			value = radio[i].value;
		}
	}
	
	if(value == 0) {
		hidden_enddate();

		//指定周期开始日期，结束日期在Java中指定
		$("startdate2").value = $("startdate1").value;
		
	} else if(value == 1) {
		display_enddate();
	}
}

/*
 * 显示结束日期（周期Radio的onclick事件）
 */
function display_enddate(startdate_cycle) {
	var enddate = $('enddate');
  	enddate.style.display = '';
  	
  	//显示周期预约设置
  	var cycle = $('cycle');
  	cycle.style.display = '';
  	
  	//设置开始日期为周期开始日期
  	var startdate = $("startdate2").value;
  	$("startdate").value = startdate;
  	
  	//默认为每周
	var radioType = document.getElementsByName('yuyueinfo.yuyuetype');
	var radioZhouqi = document.getElementsByName('yuyueinfo.zhouqitype');
	if(radioType[1].checked) {
		
		if(!(radioZhouqi[0].checked || radioZhouqi[1].checked || radioZhouqi[2].checked)) {
			radioZhouqi[1].checked = true;
		}
	}
}

/*
 * 隐藏结束日期
 */
function hidden_enddate(startdate) {
	var enddate = window.$('enddate');
  	enddate.style.display = 'none';
  	
  	//隐藏周期预约设置
  	var cycle = $('cycle');
  	cycle.style.display = 'none';
  	
  	//设置开始日期为单日会议开始日期
  	var startdate = $("startdate1").value;
  	$("startdate").value = startdate;
  	
  	//清空周期内容
  	var radioZhouqi = document.getElementsByName('yuyueinfo.zhouqitype');
  	for(var i = 0; i < radioZhouqi.length; i++) {
  		if(radioZhouqi[i].checked) {
  			radioZhouqi[i].checked = false;
  			break;
  		}
  	}
  	
  	clearWeek();
  	clearMonth();
}

/*
 * 清除周一至周五
 */
function clearWeek() {
	
  	var mon = $("mon");
  	var tue = $("tue");
  	var wen = $("wen");
  	var thu = $("thu");
  	var fri = $("fri");
  	if(mon.checked) {
  		mon.checked = false;
  	}
  	if(tue.checked) {
  		tue.checked = false;
  	}
  	if(wen.checked) {
  		wen.checked = false;
  	}
  	if(thu.checked) {
  		thu.checked = false;
  	}
  	if(fri.checked) {
  		fri.checked = false;
  	}
}

/*
 * 清除每月信息
 */
function clearMonth() {
	
  	var day = $("yuyueinfo.day");
  	day.value = "";
  	
  	var qianhou = document.getElementsByName("yuyueinfo.qianhou");
  	for(var i = 0; i < qianhou.length; i++) {
  		if(qianhou[i].checked) {
  			qianhou[i].checked = false;
  			break;
  		}
  	}
}

/*
 * 选择每月时，默认选择遇休日后延
 */
function selectMonth() {
	var radioZhouqi = document.getElementsByName('yuyueinfo.zhouqitype');
	var qianhou = document.getElementsByName("yuyueinfo.qianhou");
	if(radioZhouqi[2].checked) {
		if(!(qianhou[0].checked || qianhou[1].checked)) {
			qianhou[1].checked = true;
		}
	}
}
 
/*
 * 选择每日，每周，每月时，自动选上周期
 */
function selectZhouqi() {
	 
	// 选上周期
	var radioType = document.getElementsByName('yuyueinfo.yuyuetype');
	if(!radioType[1].checked) {
		radioType[1].checked = true;
	}
	
	//清除其它周期类型的信息
	var radioZhouqi = document.getElementsByName('yuyueinfo.zhouqitype');
	if(radioZhouqi[0].checked) {
	  	clearWeek();
	  	clearMonth();
	} else if(radioZhouqi[1].checked) {
		clearMonth();
	} else {
		clearWeek();
	}
	
	//显示结束日期
	var enddate = window.$('enddate');
  	enddate.style.display = '';
}

/*
 * 自动选择每周
 */
function selectMeiZhou() {
	var radioZhouqi = document.getElementsByName('yuyueinfo.zhouqitype');
	if(!radioZhouqi[1].checked) {
		radioZhouqi[1].checked = true;
	}
	selectZhouqi();
}

/*
* 自动选择每月
*/
function selectMeiYue() {
	var radioZhouqi = document.getElementsByName('yuyueinfo.zhouqitype');
	if(!radioZhouqi[2].checked) {
		radioZhouqi[2].checked = true;
	}
	selectZhouqi();
}

/*
 * 点击每月 的日期
 */
function clickDay() {
	selectMeiYue();
	
	var qianhou = document.getElementsByName("yuyueinfo.qianhou");
	if(!(qianhou[0].checked || qianhou[1].checked)) {
		qianhou[1].checked = true;
	}
}

/*
 * 提交表单
 * @param cmd确定目的Action
 */
function doSubmit(cmd){
	
	//预约会议
	if("reserve" == cmd) {
		
		//输入合法性检查
		var re = check();
		if(re) {
			var overFlg = getOverFlg();
			if(overFlg) {
				if(confirm("会议室装不下这么多人，您确定要继续吗？")) {
					textToHidden();
					document.forms[0].action = "saveYuyueData.action";
					document.forms[0].submit();
				}
			} else {
				textToHidden();
				document.forms[0].action = "saveYuyueData.action";
				document.forms[0].submit();
			}
		}
		//选择参加人员
	} else if("select" == cmd) { 
		textToHidden();
		document.forms[0].action = "reserve_selectCjr.action";
		document.forms[0].submit();
	}
}
 
 /*
 * 取得人数是否溢出Flg
 */
 function getOverFlg () {
 	
	var cjrs = $("yuyueinfo.cjrs").value;
 	var hys = $("yuyueinfo.hys").selectedIndex;
 	var rsString = $("rsString").value;
 	
 	var rsArray = new Array();
 	rsArray = rsString.split(",");
 	var index = parseInt(hys);
 	var max = parseInt(rsArray[index - 1]);
 	var choice = parseInt(cjrs);
 	
 	if(choice > max) {
 		return true;
 	}
 	return false;
 }

/*
 * 输入合法性检查
 */
function check() {

	//单日与周期必须选择一个
	var radioType = document.getElementsByName('yuyueinfo.yuyuetype');
	if(!(radioType[0].checked || radioType[1].checked)) {
		MsgBox.message('请选择预约类型!');
		return false;
	}

	//如果选择周期
	var radioZhouqi = document.getElementsByName('yuyueinfo.zhouqitype');
	if(radioType[1].checked) {

		//则周期类型必须选择一个
		if(!(radioZhouqi[0].checked || radioZhouqi[1].checked || radioZhouqi[2].checked)) {
			MsgBox.message('请选择周期类型!');
			return false;
		}
	}

	//如果选择每周，则周一至周五必须选择一个
	var mon = $("mon");
	var tue = $("tue");
	var wen = $("wen");
	var thu = $("thu");
	var fri = $("fri");
	var checked = mon.checked || tue.checked || wen.checked || thu.checked || fri.checked;

	if(radioZhouqi[1].checked) {
		if(!checked) {
			MsgBox.message('请选择星期！');
			return false;
		}
	}

	//如果选择每月，则日期和后延标志必须选择
	if(radioZhouqi[2].checked) {
		var day = $("yuyueinfo.day");
		if(day.value == "") {
			MsgBox.message('请输入日期!');
			return false;
		}

		//判断输入日期的合法性
		var floatValue = parseFloat(day.value);
		var intValue = parseInt(day.value);
		if(floatValue != intValue) {
			MsgBox.message("请输入合法的日期！");
			return false;
		} else {
			if((intValue < 1) || (intValue >31)) {
				MsgBox.message("请输入合法的日期！");
				return false;
			}
		}

		var qianhou = document.getElementsByName("yuyueinfo.qianhou");
		if(!(qianhou[0].checked || qianhou[1].checked)) {
			MsgBox.message("请选择遇休日类型！");
			return false;
		}
	}

	//周期日期判断
	if(radioType[1].checked) {

		//周期日期必须选择
		var startDate = $('startdate');
		if(startDate.value == "") {
			MsgBox.message("请输入周期开始日期！");
			return false;
		}
		
		var endDate = $('yuyueinfo.enddate');
		if(endDate.value == "") {
			MsgBox.message("请输入周期结束日期！");
			return false;
		}

		//日期合法性判断
		var startdate = startDate.value;
		var enddate = endDate.value;
		if(startdate > enddate) {
			MsgBox.message("请输入合法的日期！");
			return false;
		}
	}
	
	//会议室不能为空
	var hys = $('yuyueinfo.hys');
	if(hys.value == "0") {
		MsgBox.message("请选择会议室！");
		return false;
	}

	//必须输入主题
	var zt = $("yuyueinfo.hyzt");
	if(zt.value == "") {
		MsgBox.message("请输入会议主题！");
		zt.focus();
		return false;
	}

	//判断时间合法性
	var startHour = $("yuyueinfo.start_hour");
	var startMinute = $("yuyueinfo.start_minute");
	var endHour = $("yuyueinfo.end_hour");
	var endMinute = $("yuyueinfo.end_minute");

	var starthour = startHour.value;
	var endhour = endHour.value
	var shead = starthour.substring(0, 1);
	var ehead = endhour.substring(0, 1);
	if(shead == "0") {	//去除开头的0
		starthour = starthour.substring(1, 2);
	}
	if(ehead == "0") {
		endhour = endhour.substring(1, 2);
	}
	
	var sh = parseInt(starthour);
	var eh = parseInt(endhour);
	if(sh < 8 || sh > 22 || eh < 8 || eh > 22) {
		MsgBox.message("请输入合法时间！");
		return false;
	} else {
		if(sh > eh) {
			MsgBox.message("请输入合法的时间！");
			return false;
			
		} else if(sh == eh){
			var sm = parseInt(startMinute.value);
			var em = parseInt(endMinute.value);
			if(sm >= em) {
				MsgBox.message("请输入合法的时间！");
				return false;
			}
		}
	}

	//参加人不能为空
	var cjr = $("yuyueinfo.cjr");
	if(cjr.value == "") {
		MsgBox.message("请选择参加人员！");
		return false;
	}
	
	return true;
}

/*
 * 取得所选Radio的值
 */
function getRadioChecked() {
	var value = 0;
	var radio = document.getElementsByName('yuyueinfo.yuyuetype');
	
	for(i=0; i<radio.length; i++) {
		if(radio[i].checked) {
			value = radio[i].value;
		}
	}
	return value;
}

/*
 * 将开始日期存入两个Hidden中（与单日会议开始日期和周期会议开始日期对应）
 */
function textToHidden() {
	var value = getRadioChecked();
	if(value == 0) {
		$("startdate1").value = $("startdate").value;
	} else if(value == 1) {
		$("startdate2").value = $("startdate").value;
	}
}

