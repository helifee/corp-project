/*
 * 组名List变化的操作
 */
function getattendzuname() {
	//取得画面的信息保存下来
	var id = document.getElementById("zuid").value;
	var renname = document.getElementById("renming").value;

	// 把List的信息转移到隐藏控件
	moveAlloneselfOptions(document.getElementById('rightname'), document
			.getElementById('hiddenzu'));
	var url = "getattendzuname.action?zuid=" + id;
	new Ajax.Updater('div_hy_attend_list', url, {
		onLoading : function() {
		},
		onSuccess: function(response){ 
			checkSession(response);
		},
		onFailure : function(request) {
			MsgBox.message("程序有错误");
		},
		onComplete : function(request) {
			//把保存的信息还原回去
			document.getElementById("renming").value = renname;
			moveAlloneselfOptions(document.getElementById('hiddenzu'), document
					.getElementById('rightname'));
		}
	});

}

/*
* 确认的时候校验
*/
function validate() {
	var aryTempTargetOptions = new Array();
	aryTempTargetOptions = document.getElementById('rightname');
	if (aryTempTargetOptions.length == 0) {
		MsgBox.message("参加会议人员列表不能为空");
		return false;
	}
	return true;
}

/*
* 组管理按钮按下
*/
function zuguanli() {
	var aryTempTargetOptions = new Array();
	// 把新建和修改组员列表的人都选上（为了传值）
	aryTempTargetOptions = document.getElementById('rightname');
	for ( var i = 0; i < aryTempTargetOptions.length; i++) {
		aryTempTargetOptions.options[i].selected = true;
	}
	targetForm = document.forms[0];
	targetForm.action = "groupmanage.action";
	targetForm.submit();
}

/*
* 确认按钮按下
*/
function affirm() {
	if (validate()){
		var aryTempTargetOptions = new Array();
		// 把新建和修改组员列表的人都选上（为了传值）
		aryTempTargetOptions = document.getElementById('rightname');
		for ( var i = 0; i < aryTempTargetOptions.length; i++) {
			aryTempTargetOptions.options[i].selected = true;
		}
		targetForm = document.forms[0];
		targetForm.action = "attendaffirm.action";
		targetForm.submit();
	}
}

/*
* 返回按钮按下
*/
function goback() {
	targetForm = document.forms[0];
	targetForm.action = "attendgoback.action";
	targetForm.submit();
}

/*
 * 删除List中相同的Id
 */
function Moveoneselfoptions(objTargetElement) {

	var aryTempTargetOptions = new Array();

	var x = 0;
	var itext = "";
	var jtext = "";
	var flg = 0;
	for ( var i = 0; i < objTargetElement.length; i++) {
		for ( var j = i + 1; j < objTargetElement.length; j++) {
			itext = objTargetElement.options[i].text;
			jtext = objTargetElement.options[j].text;
			if (itext == jtext) {
				flg = 1;
				break;
			}
		}
		if (flg == 0) {
			var objTempValues = new Object();
			objTempValues.text = objTargetElement.options[i].text;
			objTempValues.value = objTargetElement.options[i].value;
			aryTempTargetOptions[x] = objTempValues;
			x++;
		}
		flg = 0;
	}
	objTargetElement.length = aryTempTargetOptions.length;
	for ( var i = 0; i < aryTempTargetOptions.length; i++) {
		objTargetElement.options[i].text = aryTempTargetOptions[i].text;
		objTargetElement.options[i].value = aryTempTargetOptions[i].value;
		objTargetElement.options[i].selected = false;
	}
}
/*
 * List信息的转移
 */
function moveAlloneselfOptions(objSourceElement, objTargetElement) {
	objTargetElement.length = objSourceElement.length;
	for ( var i = 0; i < objSourceElement.length; i++) {
		objTargetElement.options[i].text = objSourceElement[i].text;
		objTargetElement.options[i].value = objSourceElement[i].value;
		objTargetElement.options[i].selected = false;
	}
}

/*
 * 通过人名来检索组员列表
 */
function getppName(nameValue) {

	var firstStr;

	if (nameValue != "") {

		firstStr = nameValue.charAt(0);

		// 中文
		if (isInChinese(firstStr)) {

			searchByChi(nameValue)

			// 拼音
		} else {

			searchByCha(nameValue.toUpperCase())
		}
	} else {
		displayList();
	}

}

/*
 * 判断是否包含汉字
 */
function isInChinese(firstStr) {

	return (firstStr.length != firstStr.replace(/[^\x00-\xff]/g, "**").length);
}

/*
 * 输入的是中文，根据中文找合适的名字
 */
function searchByChi(nameValue) {
	var objSourceElement = document.getElementById('hiddenleft');
	var aryTempTargetOptions = new Array();
	var x = 0;
	for ( var i = 0; i < objSourceElement.length; i++) {

		var zuname = objSourceElement.options[i].text;
		var len = nameValue.length;

		if (nameValue == zuname.substring(0, len)) {
			var objTempValues = new Object();
			objTempValues.text = objSourceElement.options[i].text;
			objTempValues.value = objSourceElement.options[i].value;
			aryTempTargetOptions[x] = objTempValues;
			x++;
		}
	}
	var objTargetElement = document.getElementById('leftname');
	objTargetElement.length = aryTempTargetOptions.length;
	for ( var i = 0; i < aryTempTargetOptions.length; i++) {
		objTargetElement.options[i].text = aryTempTargetOptions[i].text;
		objTargetElement.options[i].value = aryTempTargetOptions[i].value;
		objTargetElement.options[i].selected = false;
	}
}

/*
 * 输入的是拼音，根据拼音找到合适的名字
 */
function searchByCha(nameValue) {

	var objSourceElement = document.getElementById('hiddenleft');
	var objSourceElement1 = document.getElementById('pyinfos');

	var aryTempTargetOptions = new Array();
	var x = 0;
	for ( var i = 0; i < objSourceElement.length; i++) {

		var zunamepinyin = objSourceElement1[i].text.split(",");
		var len = nameValue.length;
		for ( var j = 0; j < zunamepinyin.length; j++) {
			pyName = zunamepinyin[j].strip();
			
			if (nameValue == pyName.substring(0, len)) {

				var objTempValues = new Object();
				objTempValues.text = objSourceElement.options[i].text;
				objTempValues.value = objSourceElement.options[i].value;
				aryTempTargetOptions[x] = objTempValues;
				x++;
				break;
			}
		}
	}
	var objTargetElement = document.getElementById('leftname');
	objTargetElement.length = aryTempTargetOptions.length;
	for ( var i = 0; i < aryTempTargetOptions.length; i++) {
		objTargetElement.options[i].text = aryTempTargetOptions[i].text;
		objTargetElement.options[i].value = aryTempTargetOptions[i].value;
		objTargetElement.options[i].selected = false;
	}
}

/*
 * 把隐藏的组员列表中的值表示出来
 */
function displayList() {
	var objSourceElement = document.getElementById('hiddenleft');
	var objTargetElement = document.getElementById('leftname');
	objTargetElement.length = objSourceElement.length;
	for ( var i = 0; i < objSourceElement.length; i++) {
		objTargetElement.options[i].text = objSourceElement[i].text;
		objTargetElement.options[i].value = objSourceElement[i].value;
		objTargetElement.options[i].selected = false;
	}
}
