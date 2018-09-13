function deletezu() {//利用对话框返回的值 （true 或者 false）
	if (confirm("你确信要删除这个组吗？")) {//如果是true ，那么就把页面转向thcjp.cnblogs.com
		var id = document.getElementById("textfield2").name;
		var url = "deletezu.action?zbid=" + id;
		new Ajax.Updater('div_hy_group_manage', url, {
			onLoading : function() {
			},
			onSuccess : function(request) {
				alert('删除成功');
			},
			onFailure : function(request) {
				alert("服务器故障，请稍候重试");
			}
		});

		//targetForm = document.forms[0];
		//targetForm.action = "deletezu.action?zbid=" +id;
		//targetForm.submit();
	} else {
	}
}
function showName(id, name) {
	document.getElementById("textfield2").value = name;
	document.getElementById("textfield2").name = id;
	if (document.forms[0].textfield2.disabled == false) {
		document.forms[0].textfield2.disabled = true;
		InitHumian();
	}
	document.forms[0].textfield2.disabled = true;

	document.forms[0].xiugai.disabled = false;
	document.forms[0].shanchu.disabled = false;
	return false;
}

function updatezu() {//利用对话框返回的值 （true 或者 false）
	if (confirm("你确信要更新这个组吗？")) {//如果是true ，那么就把页面转向thcjp.cnblogs.com
		var id = document.getElementById("textfield2").name;
		document.forms[0].textfield2.disabled = false;
		targetForm = document.forms[0];
		targetForm.action = "updatezu.action?zbid=" + id;
		targetForm.submit();
	} else {
	}

	document.forms[0].textfield2.disabled = false;
	document.forms[0].zuid.disabled = false;
	document.forms[0].renming.disabled = false;
	document.forms[0].xiugai.disabled = false;
	document.forms[0].form_leftname.disabled = false;
	document.forms[0].shanchu.disabled = false;
	document.forms[0].form_rightname.disabled = false;
	document.forms[0].form_siyou1.disabled = false;
	document.forms[0].form_siyou2.disabled = false;
	document.forms[0].form_siyou3.disabled = false;
	return false;
}

function InitHumian() {
	document.forms[0].textfield2.disabled = true;
	document.forms[0].zuid.disabled = true;
	document.forms[0].renming.disabled = true;
	document.forms[0].xiugai.disabled = true;
	document.forms[0].form_leftname.disabled = true;
	document.forms[0].shanchu.disabled = true;
	document.forms[0].form_rightname.disabled = true;
	document.forms[0].form_siyou1.disabled = true;
	document.forms[0].form_siyou2.disabled = true;
	document.forms[0].form_siyou3.disabled = true;
	document.getElementsByTagName("input").item(8).diabled = true;
	document.getElementsByTagName("input").item(9).diabled = true;
	document.getElementsByTagName("input").item(10).diabled = true;
	document.getElementsByTagName("input").item(11).diabled = true;
	document.getElementsByTagName("input").item(12).diabled = true;

	return false;
}