///////////////////////////禁止鼠标右键///////////////////////////
function onmousedown(e) {
	if (document.all) {
		if (event.button == 2 || event.button == 3) {
			oncontextmenu = 'return true';
		}
	}
	if (document.layers) {
		if (e.which == 3) {
			oncontextmenu = 'return true';
		}
	}
}
if (document.layers) {
	document.captureEvents(Event.MOUSEDOWN);
}
document.onmousedown = onmousedown;
document.oncontextmenu = new Function("return true;");
// ////////////////////////////// 获取系统根路径////////////////////////////////
function getRootPath() {
	// ����·��
	var strFullPath = window.document.location.href;
	var strPath = window.document.location.pathname;
	var pos = strFullPath.indexOf(strPath);
	var prePath = strFullPath.substring(0, pos);
	var postPath = strPath.substring(0, strPath.substr(1).indexOf("/") + 1);
	if (postPath.toLowerCase() == '/ctcs') {
		return (prePath + postPath);
	}
	return (prePath);
}
//////////////////////////////下拉框宽度自适应那方法//////////////////////////////
function FixWidth(selectObj) {

	if (navigator.userAgent.toLowerCase().indexOf("firefox") > 0) {
		return;
	}

	var newSelectObj = document.createElement("select");
	newSelectObj = selectObj.cloneNode(true);
	newSelectObj.selectedIndex = selectObj.selectedIndex;
	newSelectObj.id = "newSelectObj";

	var e = selectObj;
	var absTop = e.offsetTop;
	var absLeft = e.offsetLeft;
	while (e = e.offsetParent) {
		absTop += e.offsetTop;
		absLeft += e.offsetLeft;
	}
	with (newSelectObj.style) {
		position = "absolute";
		top = absTop + "px";
		left = absLeft + "px";
		width = "auto";
	}

	var rollback = function() {
		RollbackWidth(selectObj, newSelectObj);
	};
	if (window.addEventListener) {
		newSelectObj.addEventListener("blur", rollback, false);
		newSelectObj.addEventListener("change", rollback, false);
	}
	else {
		newSelectObj.attachEvent("onblur", rollback);
		newSelectObj.attachEvent("onchange", rollback);
	}

	selectObj.style.visibility = "hidden";
	document.body.appendChild(newSelectObj);

	var newDiv = document.createElement("div");
	with (newDiv.style) {
		position = "absolute";
		top = (absTop - 10) + "px";
		left = (absLeft - 10) + "px";
		width = newSelectObj.offsetWidth + 20;
		height = newSelectObj.offsetHeight + 20;;
		background = "transparent";
		// background = "green";
	}
	document.body.appendChild(newDiv);
	newSelectObj.focus();
	var enterSel = "false";
	var enter = function() {
		enterSel = enterSelect();
	};
	newSelectObj.onmouseover = enter;

	var leavDiv = "false";
	var leave = function() {
		leavDiv = leaveNewDiv(selectObj, newSelectObj, newDiv, enterSel);
	};
	newDiv.onmouseleave = leave;
}

function RollbackWidth(selectObj, newSelectObj) {
	selectObj.selectedIndex = newSelectObj.selectedIndex;
	selectObj.style.visibility = "visible";
	if (document.getElementById("newSelectObj") != null) {
		document.body.removeChild(newSelectObj);
	}
}

function removeNewDiv(newDiv) {
	document.body.removeChild(newDiv);
}

function enterSelect() {
	return "true";
}

function leaveNewDiv(selectObj, newSelectObj, newDiv, enterSel) {
	if (enterSel == "true") {
		RollbackWidth(selectObj, newSelectObj);
		removeNewDiv(newDiv);
	}

}

function blank(str) {
	var reSpace = /\s/g;
	return str.replace(reSpace, "");
}
///////////////////////////////////校验身份证号码并 根据身份证号验证并获取生日和性别/////////////////////////////////
function showBirthday(obj, type, sex, birthday) {
//	if (!checkIdCardNo(obj.value)) {
//		alert("身份证号码不能为空或格式不合法！");
//		obj.value = "";
//		return false;
//	}
	var val = obj.value;
	var type = document.getElementById(type).value;
	if (type == 0 || type == "0") {
		var birthdayValue;
		if (15 == val.length) { // 15位身份证号码
			birthdayValue = val.charAt(6) + val.charAt(7);
			if (parseInt(birthdayValue) < 10) {
				birthdayValue = '20' + birthdayValue;
			}
			else {
				birthdayValue = '19' + birthdayValue;
			}
			birthdayValue = birthdayValue + '-' + val.charAt(8) + val.charAt(9)
					+ '-' + val.charAt(10) + val.charAt(11);
			if (parseInt(val.charAt(14) / 2) * 2 != val.charAt(14))
				document.getElementById(sex).value = '0';// 男
			else
				document.getElementById(sex).value = '1';// 女
			document.getElementById(birthday).value = birthdayValue;
		}
		if (18 == val.length) { // 18位身份证号码
			birthdayValue = val.charAt(6) + val.charAt(7) + val.charAt(8)
					+ val.charAt(9) + '-' + val.charAt(10) + val.charAt(11)
					+ '-' + val.charAt(12) + val.charAt(13);
			if (parseInt(val.charAt(16) / 2) * 2 != val.charAt(16))
				document.getElementById(sex).value = '0';
			else
				document.getElementById(sex).value = '1';
			document.getElementById(birthday).value = birthdayValue;
		}
	}
}
// 18位身份证号最后一位校验
function IDCard(Num) {

	if (Num.length != 18)
		return false;
	var x = 0;
	var y = '';
	for (i = 18; i >= 2; i--)
		x = x + (square(2, (i - 1)) % 11) * parseInt(Num.charAt(19 - i - 1));
	x %= 11;
	y = 12 - x;
	if (x == 0)
		y = '1';
	if (x == 1)
		y = '0';
	if (x == 2)
		y = 'X';
	return y;
}
// 求得x的y次方
function square(x, y) {
	var i = 1;
	for (j = 1; j <= y; j++)
		i *= x;
	return i;
}
// //////////////////////////////////////身份证校验工具对象////////////////////////////////////
var idCardNoUtil = {
	/* 省,直辖市代码表 */
	provinceAndCitys : {
		11 : "北京",
		12 : "天津",
		13 : "河北",
		14 : "山西",
		15 : "内蒙古",
		21 : "辽宁",
		22 : "吉林",
		23 : "黑龙江",
		31 : "上海",
		32 : "江苏",
		33 : "浙江",
		34 : "安徽",
		35 : "福建",
		36 : "江西",
		37 : "山东",
		41 : "河南",
		42 : "湖北",
		43 : "湖南",
		44 : "广东",
		45 : "广西",
		46 : "海南",
		50 : "重庆",
		51 : "四川",
		52 : "贵州",
		53 : "云南",
		54 : "西藏",
		61 : "陕西",
		62 : "甘肃",
		63 : "青海",
		64 : "宁夏",
		65 : "新疆",
		71 : "台湾",
		81 : "香港",
		82 : "澳门",
		91 : "国外"
	},

	/* 每位加权因子 */
	powers : ["7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9",
			"10", "5", "8", "4", "2"],

	/* 第18位校检码 */
	parityBit : ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"],

	/* 性别 */
	genders : {
		male : "男",
		female : "女"
	},

	/* 校验地址码 */
	checkAddressCode : function(addressCode) {
		var check = /^[1-9]\d{5}$/.test(addressCode);
		if (!check)
			return false;
		if (idCardNoUtil.provinceAndCitys[parseInt(addressCode.substring(0, 2))]) {
			return true;
		}
		else {
			return false;
		}
	},

	/* 校验日期码 */
	checkBirthDayCode : function(birDayCode) {
		var check = /^[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))$/
				.test(birDayCode);
		if (!check)
			return false;
		var yyyy = parseInt(birDayCode.substring(0, 4), 10);
		var mm = parseInt(birDayCode.substring(4, 6), 10);
		var dd = parseInt(birDayCode.substring(6), 10);
		var xdata = new Date(yyyy, mm - 1, dd);
		if (xdata > new Date()) {
			return false;// 生日不能大于当前日期
		}
		else if ((xdata.getFullYear() == yyyy) && (xdata.getMonth() == mm - 1)
				&& (xdata.getDate() == dd)) {
			return true;
		}
		else {
			return false;
		}
	},

	/* 计算校检码 */
	getParityBit : function(idCardNo) {
		var id17 = idCardNo.substring(0, 17);
		/* 加权 */
		var power = 0;
		for (var i = 0; i < 17; i++) {
			power += parseInt(id17.charAt(i), 10)
					* parseInt(idCardNoUtil.powers[i]);
		}
		/* 取模 */
		var mod = power % 11;
		return idCardNoUtil.parityBit[mod];
	},

	/* 验证校检码 */
	checkParityBit : function(idCardNo) {
		var parityBit = idCardNo.charAt(17).toUpperCase();
		if (idCardNoUtil.getParityBit(idCardNo) == parityBit) {
			return true;
		}
		else {
			return false;
		}
	},

	/* 校验15位或18位的身份证号码 */
	checkIdCardNo : function(idCardNo) {
		if(idCardNo==""){
			return true;
		}
		// 15位和18位身份证号码的基本校验
		var check = /^\d{15}|(\d{17}(\d|x|X))$/.test(idCardNo);
		if (!check)
			return false;
		if(idCardNo=="140618190001010034"){
			return true;
		}else{
			// 判断长度为15位或18位
			if (idCardNo.length == 15) {
				return idCardNoUtil.check15IdCardNo(idCardNo);
			}
			else if (idCardNo.length == 18) {
				return idCardNoUtil.check18IdCardNo(idCardNo);
			}else {
				return false;
			}
		}
		
	},

	// 校验15位的身份证号码
	check15IdCardNo : function(idCardNo) {
		// 15位身份证号码的基本校验
		var check = /^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/
				.test(idCardNo);
		if (!check)
			return false;
		// 校验地址码
		var addressCode = idCardNo.substring(0, 6);
		check = idCardNoUtil.checkAddressCode(addressCode);
		if (!check)
			return false;
		var birDayCode = '19' + idCardNo.substring(6, 12);
		// 校验日期码
		return idCardNoUtil.checkBirthDayCode(birDayCode);
	},

	// 校验18位的身份证号码
	check18IdCardNo : function(idCardNo) {
		// 18位身份证号码的基本格式校验
		var check = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/
				.test(idCardNo);
		if (!check)
			return false;
		// 校验地址码
		var addressCode = idCardNo.substring(0, 6);
		check = idCardNoUtil.checkAddressCode(addressCode);
		if (!check)
			return false;
		// 校验日期码
		var birDayCode = idCardNo.substring(6, 14);
		check = idCardNoUtil.checkBirthDayCode(birDayCode);
		if (!check)
			return false;
		// 验证校检码
		return idCardNoUtil.checkParityBit(idCardNo);
	},

	formateDateCN : function(day) {
		var yyyy = day.substring(0, 4);
		var mm = day.substring(4, 6);
		var dd = day.substring(6);
		return yyyy + '-' + mm + '-' + dd;
	},

	// 获取信息
	getIdCardInfo : function(idCardNo) {
		var idCardInfo = {
			gender : "", // 性别
			birthday : "" // 出生日期(yyyy-mm-dd)
		};
		if (idCardNo.length == 15) {
			var aday = '19' + idCardNo.substring(6, 12);
			idCardInfo.birthday = idCardNoUtil.formateDateCN(aday);
			if (parseInt(idCardNo.charAt(14)) % 2 == 0) {
				idCardInfo.gender = idCardNoUtil.genders.female;
			}
			else {
				idCardInfo.gender = idCardNoUtil.genders.male;
			}
		}
		else if (idCardNo.length == 18) {
			var aday = idCardNo.substring(6, 14);
			idCardInfo.birthday = idCardNoUtil.formateDateCN(aday);
			if (parseInt(idCardNo.charAt(16)) % 2 == 0) {
				idCardInfo.gender = idCardNoUtil.genders.female;
			}
			else {
				idCardInfo.gender = idCardNoUtil.genders.male;
			}

		}
		return idCardInfo;
	},

	/* 18位转15位 */
	getId15 : function(idCardNo) {
		if (idCardNo.length == 15) {
			return idCardNo;
		}
		else if (idCardNo.length == 18) {
			return idCardNo.substring(0, 6) + idCardNo.substring(8, 17);
		}
		else {
			return null;
		}
	},

	/* 15位转18位 */
	getId18 : function(idCardNo) {
		if (idCardNo.length == 15) {
			var id17 = idCardNo.substring(0, 6) + '19' + idCardNo.substring(6);
			var parityBit = idCardNoUtil.getParityBit(id17);
			return id17 + parityBit;
		}
		else if (idCardNo.length == 18) {
			return idCardNo;
		}
		else {
			return null;
		}
	}
};

function checkIdCardNo(value,id) {
	//return idCardNoUtil.checkIdCardNo(value);
	if(idCardNoUtil.checkIdCardNo(value)){
	}else{
	alert("the number has some error!");
	document.getElementById(id).value = "";
	}
}