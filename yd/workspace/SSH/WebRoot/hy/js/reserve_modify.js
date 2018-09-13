
/*
 * 提交表单
 * @param cmd 确定目的Action
 * @param changedFlg 周期中是否有修改过的预约
 */
function doSubmit(cmd, changedFlg) {
	if("update" == cmd) {
		
		//输入合法性检查
		var re = check();
		if(re) {
			
			//判断人数是否超员
			var overFlg = getOverFlg();
			if(overFlg) {
				if(confirm("会议室容不下这么多人，您确定要继续吗？")) {
					doUpdate(changedFlg);
				}
			} else {
				doUpdate(changedFlg);
			}
		}
		
	} else if("delete" == cmd){
		if(confirm("您确定要删除预约吗？")) {
			document.forms[0].action = "yuyueDelete.action"
			document.forms[0].submit();
		}
	} else if("select" == cmd) {
		document.forms[0].action = "modify_selectCjr.action";
		document.forms[0].submit();
		
	} else if("writeBg" == cmd) {
		
		//会议报告不能超过30000字
		var maxLength = 30000;
		var hyjl = $("hyjl");
		var num = hyjl.value.length;
		if(num > maxLength) {
			MsgBox.message("您填写的会议报告太长，请修改一下！");
		} else {
			document.forms[0].action = "writeBg.action";
			document.forms[0].submit();
		}
	}
}
/*
 * 执行Update操作
 */
function doUpdate(changedFlg) {
	var value = getRadioChecked();
	if(value == 0) {
		document.forms[0].action = "yuyueModify.action";
		document.forms[0].submit();
		
	} else if(value == 1) {
		
		//修改与否判断
		if(changedFlg) {
			var re = window.confirm("您所修改的周期预约中有已经修改过的"
					+ "单日预约，原周期的会议记录也会被改动，您确定覆盖吗？");
			if(re) {
				document.forms[0].action = "yuyueModify.action";
				document.forms[0].submit();
			}
		} else {
			document.forms[0].action = "yuyueModify.action";
			document.forms[0].submit();
		}
	}
}
 
 /*
  * 取得人数是否溢出Flg
  */
 function getOverFlg () {
 	
	var cjrs = $("yuyueinfo.cjrs").value;
 	var hys = $("yuyueinfo.hys").value;
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
		MsgBox.message("请选择预约类型！");
		return false;
	}

	//如果选择周期
	var radioZhouqi = document.getElementsByName('yuyueinfo.zhouqitype');
	if(radioType[1].checked) {

		//则周期类型必须选择一个
		if(!(radioZhouqi[0].checked || radioZhouqi[1].checked || radioZhouqi[2].checked)) {
			MsgBox.message("请选择周期类型！");
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
			MsgBox.message("请选择星期！");
			return false;
		}
	}

	//如果选择每月，则日期和后延标志必须选择
	if(radioZhouqi[2].checked) {
		var day = $("yuyueinfo.day");
		if(day.value == "") {
			MsgBox.message("请输入日期！");
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
	//周期开始日期必须选择
	var startDate = $('startdate');
	if(startDate.value == "") {
		MsgBox.message("请输入开始日期！");
		return false;
	}
	
	if(radioType[1].checked) {

		//周期结束日期必须选择
		var endDate = $('yuyueinfo.enddate');
		if(endDate.value == "") {
			MsgBox.message("请输入周期结束日期！");
			return false;
		}

		//日期合法性判断
		var startdate = $('startdate').value;
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

	//参加人不能为空
	var cjr = $("yuyueinfo.cjr");
	if(cjr.value == "") {
		MsgBox.message("请选择参加人员！");
		return false;
	}
	
	//会议报告不能超过30000字
	var maxLength = 30000;
	var hyjl = $("hyjl");
	var num = hyjl.value.length;
	if(num > maxLength) {
		MsgBox.message("您填写的会议报告太长，请修改一下！");
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



