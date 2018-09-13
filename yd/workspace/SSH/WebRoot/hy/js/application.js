/*
 * 组名是否存在Check
 */    
function check(querenflg) {
	var checkflg = true;
	var xinzbid = document.getElementById("xinzbid").value;
	var hiddenzm = document.getElementById("hiddenzm").value;
	var zunm = document.getElementById("zuname").value;
	if(querenflg==0){
		document.getElementById("querenFlg").value = 0;
	}else{
		document.getElementById("querenFlg").value = 1;
	}
	// 修改的时候，如果输入的名字和原来的一样，则不进行Check
	if(xinzbid != "" && querenflg == 0){
		if(zunm == hiddenzm){
			checkflg = false;	
		}
	}
	// 从数据库中检索组名是否存在
	if(checkflg){
		//	var pars = Form.Element.serialize($('zuname'));
		var pars = $('form1').serialize()
		var url = 'validateName.action'; //   
	
		if (zunamevalidate()) {
			return false;
		} else {
			var myAjax = new Ajax.Request(url, {
				method : 'post',
				parameters : pars,
				onLoading : showDiv,
				onComplete : showResponse,
				onFailure : reportError
			});  
		}
	}
}
function showResponse(originalRequest) {
	if(originalRequest.responseText != ""){
		document.getElementById("checkinfo").style.display = '';
		// 显示服务器端的msgStr字符串 
		document.getElementById("xinxi").innerHTML = originalRequest.responseText;
		// 移动焦点到给定的表单项目。
		Field.focus($('zuname'));
	}else{
		// 清空提示信息
		cleartishiinfo();
		if(document.getElementById("querenFlg").value ==1){
			affirm();
		}

	}

}
function showDiv() {
}
function reportError() {
	alert('严重故障，请重试！');
}

/*
*  确认按钮按下对画面信息的操作
*/
function affirm() {
	var url = "affirm.action";
	// 校验
	if (validate()) {
		// 选中doubleList中的右边List的成员
		var aryTempTargetOptions = new Array();
		// 把新建和修改组员列表的人都选上（为了传值）
		aryTempTargetOptions = document.getElementById('rightname');
		for ( var i = 0; i < aryTempTargetOptions.length; i++) {
			aryTempTargetOptions.options[i].selected = true;
		}
		// 提交form2的内容
		new Ajax.Updater('div_hy_group_manage', url, {
			parameters : $('form2').serialize(),
			onFailure : function(request) {
				alert("程序有错误");
			},
			onSuccess : function(response) {
				checkSession(response);
			},
			onComplete : ReportComplete()
		});
	}
}
/*
 * 确认的时候校验
 */
function zunamevalidate(){
	var zuname = document.getElementById('zuname').value;
	if (zuname.strip() == "") {
		alert("组名不能为空");
		return true;
	}

	if (zuname.strip().length < 3 || zuname.strip().length > 10) {
		alert("组名长度必须在3和10之间");
		return true;
	}

	var strangCode = "[^'\\]*";
	var temp;
	for ( var i = 0; i < zuname.length; i++) {
		temp = zuname.substring(i, i + 1);
		if (strangCode.indexOf(temp) != -1) {
			alert("组名中含有非法字符[ " + temp + " ]！");
			return true;
		}
	}
}
function validate(){

	var aryTempTargetOptions = new Array();
	aryTempTargetOptions = document.getElementById('rightname');
	if (aryTempTargetOptions.length == 0) {
		alert("新建和修改组员列表不能为空");
		return false;
	}
	return true;
}

/*
 * 组名选中所进行的操作
 * id:组id
 * name:组名字
 */
function showName(id, name) {
	var zuname = document.getElementById("zuname").value;
	var zuid = document.getElementById("xinzbid").value;
	if (zuname == name && id == zuid) {
		//如果组名被单击第二遍，则什么也不做
	} else {
		if (document.getElementById("zuid").disabled == false) {
			// 进行其他操作的时候询问下
			if (confirm("你确信放弃当前操作？")) {
				document.getElementById("zuname").value = name;
				document.getElementById("xinzbid").value = id;
				document.getElementById("hiddenzuid").value = id;
				document.getElementById("hiddenzm").value = name;
				InitHumian(0);
				document.getElementById("xiugai").disabled = false;
				document.getElementById("shanchu").disabled = false;
				clearzuminglist();
				cleartishiinfo();
			}
		} else {
			document.getElementById("zuname").value = name;
			document.getElementById("xinzbid").value = id;
			document.getElementById("hiddenzuid").value = id;
			document.getElementById("hiddenzm").value = name;
			document.getElementById("xiugai").disabled = false;
			document.getElementById("shanchu").disabled = false;
			clearzuminglist();
			cleartishiinfo();
		}
	}
	return true;
}
 
/*
 * 清空提示信息
 */
function cleartishiinfo(){
	document.getElementById("checkinfo").style.display = 'none';
}

/*
 * 新建按钮按下时，进行的操作
 * ryid:登录者的id
 * ryname:登录者的名字
 */
function addzu(ryid, ryname) {
	if (document.getElementById("zuid").disabled == true) {
		InitHumian(1);
	}
	document.getElementById("xiugai").disabled = true;
	document.getElementById("shanchu").disabled = true;
	// 组名可以输入
	zuNzmeuse(0);
	// 组名清空
	document.getElementById("xinzbid").value = "";
	document.getElementById("zuname").value = "";
	document.getElementById("hiddenzuid").value = "";
	// 组名存在消息清空
	cleartishiinfo();
	var url = "addzu.action";
	new Ajax.Updater('div_hy_group_manage_zuname', url, {
		onLoading : function() {
		},
		onSuccess : function(response) {
			checkSession(response);
		},
		onFailure : function(request) {
			alert("程序有错误");
		},
		onComplete : function(request) {
			// 组管理画面的组名画面的初始化
		clearinfo();
		if (ryid != null) {
			// doubleList中的右边List的赋值，
		// 添加登录者自己的名字
		var objSourceElement = document.getElementById('rightname');
		objSourceElement.length = 1;
		objSourceElement.options[0].text = ryname;
		objSourceElement.options[0].value = ryid;
	}
}
	});
	return true;

}

/*
 * 组管理画面的组名画面的初始化
 */
function clearinfo() {
	document.getElementById("renming").value = "";
	// 属性默认为为私有
	document.getElementById("zuattribute0").checked = true;
	document.getElementById("zuattribute1").checked = false;
	document.getElementById("zuattribute2").checked = false;
}

/*
 *  修改按钮按下时的操作
 */
function updatezu() {
	if (document.getElementById("zuid").disabled == true) {
		zuNzmeuse(0);
		// 组名Text里有名字的时候才可以修改
		if (document.getElementById("zuname").value != "") {
			InitHumian(1);
			var id = document.getElementById("xinzbid").value;
			var zuid = document.getElementById("xinzbid").value;
			var url = "updatezu.action?zbid=" + id;
			new Ajax.Updater('div_hy_group_manage_zuname', url, {
				onLoading : function() {
				},
				onSuccess : function(response) {
					checkSession(response);
				},
				onFailure : function(request) {
					alert("程序有错误");
				},
				onComplete : function(request) {
					// 为了提交的时候把组名字和id一起提交上去
					document.getElementById("xinzuname").value = document
							.getElementById("zuname").value;
					document.getElementById("xinzbid").value = zuid;
				}
			});
		}
	}
	return true;
}

/*
 * 组名Text可用与否
 */
function zuNzmeuse(useflg) {
	if (useflg == 1) {
		if (document.getElementById("zuname").disabled == false) {
			document.getElementById("zuname").disabled = true;
		}
	} else {
		if (document.getElementById("zuname").disabled == true) {
			document.getElementById("zuname").disabled = false;
		}
	}
}

/*
 *  删除按钮按下时的操作
 */
function deletezu() {
	//组名和组id都有值的时候可以删除
	if (document.getElementById("zuname").value != ""
			&& document.getElementById("xinzbid").value != "") {
		if (document.getElementById("zuid").disabled == false) {
			if (confirm("你确信放弃当前操作，而删除这个组吗？")) {
				var id = document.getElementById("xinzbid").value;
				InitHumian(0);
				clearzuminglist();
				cleartishiinfo();
				document.getElementById("zuname").value = "";
				var url = "deletezu.action?zbid=" + id;
				new Ajax.Updater('div_hy_group_manage', url, {
					onLoading : function() {
					},
					onSuccess : function(response) {
						checkSession(response);
					},
					onFailure : function(request) {
						alert("服务器故障，请稍候重试");
					},
					onComplete : function(request) {

					}
				});
			}
		} else {
			if (confirm("你确信要删除这个组吗？")) {
				var id = document.getElementById("xinzbid").value;
				InitHumian(0);
				cleartishiinfo();
				document.getElementById("zuname").value = "";
				var url = "deletezu.action?zbid=" + id;
				new Ajax.Updater('div_hy_group_manage', url, {
					onLoading : function() {
					},
					onSuccess : function(response) {
						checkSession(response);
					},
					onFailure : function(request) {
						alert("服务器故障，请稍候重试");
					},
					onComplete : function(request) {

					}
				});
			}
		}

	}
}

/*
 * 画面的可用与否设置
 */
function InitHumian(showflg) {
	var form0 = $('form2');
	if (showflg == 1) {
		form0.enable();
		document.getElementById("queren").disabled = false;
	} else {
		form0.disable();
		document.getElementById("queren").disabled = true;
		document.getElementById("zuname").disabled = true;
		document.getElementById("xiugai").disabled = true;
		document.getElementById("shanchu").disabled = true;
	}

	return false;
}

/*
 * 组名List变化的操作
 */
function getrenyuanmz() {
	//取得画面的信息保存下来

	var id = document.getElementById("zuid").value;
	var zuattribute0 = document.getElementById("zuattribute0").checked;
	var zuattribute1 = document.getElementById("zuattribute1").checked;
	var zuattribute2 = document.getElementById("zuattribute2").checked;
	document.getElementById("renming").value = "";
	var hiddenzu;
	// 把List的信息转移到隐藏控件
	moveAlloneselfOptions(document.getElementById('rightname'), document
			.getElementById('hiddenzu'));
	var url = "getrenyuanmz.action?zuid=" + id;
	new Ajax.Updater('div_hy_group_manage_zuname', url, {
		onLoading : function() {
		},
		onSuccess : function(response) {
			checkSession(response);
		},
		onFailure : function(request) {
			alert("程序有错误");
		},
		onComplete : function(request) {
			// 把保存的信息还原回去
		if (zuattribute0) {
			document.getElementById("zuattribute0").checked = true;
		} else if (zuattribute1) {
			document.getElementById("zuattribute1").checked = true;
		} else if (zuattribute2) {
			document.getElementById("zuattribute2").checked = true;
		}
		//document.getElementById("renming").value = renname;
		moveAlloneselfOptions(document.getElementById('hiddenzu'), document
				.getElementById('rightname'));
		document.getElementById("xinzuname").value = document
				.getElementById("zuname").value;
//		document.getElementById("xinzbid").value = document
//				.getElementById("zuname").name;

	}
	});
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
 * 返回按钮操作
 */
function goback() {
	var returnUrl = document.getElementById("returnUrl").value;
	var yyDate = document.getElementById("yyDate").value;
	targetForm = document.forms[0];
	targetForm.action = "goback.action?returnUrl=" + returnUrl + "&yyDate="
			+ yyDate;
	targetForm.submit();
}
/*
 * / 确认以后的操作
 */
function ReportComplete() {
	
	document.getElementById("checkinfo").style.display = 'none';
	InitHumian(0);
	document.getElementById("zuname").value = "";
	clearzuminglist();
}
/*
 *  清空组名List
 */
function clearzuminglist() {
	clearList(document.getElementById('leftname'));
	clearList(document.getElementById('rightname'));
	document.getElementById("renming").value = "";
	if (document.getElementById("zuattribute0").checked == true) {
		document.getElementById("zuattribute0").checked = false;
	} else if (document.getElementById("zuattribute1").checked == true) {
		document.getElementById("zuattribute1").checked = false;
	} else if (document.getElementById("zuattribute2").checked == true) {
		document.getElementById("zuattribute2").checked = false;
	}
}

/*
 * 清空左右List的值
 */
function clearList(objSourceElement) {
	objSourceElement.length = 1;
	for ( var i = 0; i < objSourceElement.length; i++) {
		objSourceElement.options[i].text = "";
		objSourceElement.options[i].value = objSourceElement[i].value;
		objSourceElement.options[i].selected = false;
	}
}

/*
 * 通过人名来检索组员列表
 */
function getName(nameValue) {

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
