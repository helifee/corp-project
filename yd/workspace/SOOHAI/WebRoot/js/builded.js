/*
 * 城市名List变化的操作
 */
function getnewmdnm() {
	// 取得画面的信息保存下来
	var cityid = document.getElementById("cityId").value;
	var url = "getnewmdnm.action?cityId=" + cityid;
	// 利用Ajax实现画面的无刷新效果
	new Ajax.Updater('div_buildedit', url, {
		onLoading : function() {
		},
		onSuccess : function(response) {
			checkSession(response);
		},
		onFailure : function(request) {
			alert("程序有错误");
		},
		onComplete : function(request) {
		}
	});
}

/*
 * 删除楼盘信息
 * buildid:楼盘id
 */
function buildingdel(buildid) {
	if (confirm("真的要删除这条数据吗？")) {
		var url = "buildingdel.action?buildId=" + buildid;
		new Ajax.Updater('div_buildingdel', url, {
			onLoading : function() {
			},
			onSuccess : function(response) {
				checkSession(response);
			},
			onFailure : function(request) {
				alert("程序有错误");
			},
			onComplete : function(request) {
			}
		});
	}
}

 /*
  * 添加或者修改楼盘信息
  */
function buildSubmit() {
	if (buildcheck()) {
		// 当服务器端校验有错误消息时，画面中"区"的显示
		document.getElementById("hiddenqu").value = document
				.getElementById('distId').value;
		// 取得楼盘id，为"0"时，操作为新建，不为"0"时，操作为更新
		var buildid = document.getElementById('buildId').value;
		targetForm = document.forms[0];
		targetForm.action = "buildEdit.action?buildId=" + buildid;
		targetForm.submit();
	}
}

/*
 * 客户端校验输入信息（只写了一个为例）
 */
function buildcheck() {
	var buildname = document.getElementById('buildName').value;
	if (buildname == "") {
		alert("楼盘信息不能为空！");
		return false;
	}
	return true;

}

/**
 * checkbox 全选选择框 选中时/未选中时的画面设定
 */
function allselect() {
	var objForm = document.buildedit;
	var objLen = objForm.length;

	// 全选选择框 选中时
	if (objForm.elements[0].checked == true) {
		for ( var elcount = 1; elcount < objLen; elcount++) {
			if (objForm.elements[elcount].type == "checkbox") {
				objForm.elements[elcount].checked = true;
			}
		}

	} else {
		// 全选选择框 未选中时
		for ( var i = 1; i < objLen; i++) {
			if (objForm.elements[i].type == "checkbox") {
				objForm.elements[i].checked = false;
			}
		}
	}

	return true;

}

/**
 * 检查checkbox列表，去过list中check全部选择，
 * 自动把“全选”设置为true
 * @param keyinfos
 * @return true
 */
function checkselect(keyinfos) {
	var objForm = document.buildedit;
	var objLen = objForm.length;
	var ckflg = true;
	for ( var elcount = 1; elcount < objLen; elcount++) {
		if (objForm.elements[elcount].type == "checkbox") {
			if (objForm.elements[elcount].checked == false) {
				ckflg = false;
			}
		}
	}
	if (ckflg == true && objForm.elements[0].type == "checkbox") {
		objForm.elements[0].checked = true;
	} else {
		objForm.elements[0].checked = false;
	}

	return true;
}

/**
 * 确认按钮
 */
function makedat() {

	var objForm = document.buildedit;
	var objLen = objForm.length;
	objTargetElement = document.getElementById('temporaryinfos');
	var count = 0;
	objTargetElement.length = 0;
	var ckflg = true;

	// 全选选择框 选中时
	if (objForm.elements[0].checked == true) {
		for ( var elcount = 1; elcount < objLen; elcount++) {
			if (objForm.elements[elcount].type == "checkbox") {
				objTargetElement.length = objTargetElement.length + 1;
				objTargetElement.options[objTargetElement.length - 1].value = objForm.elements[elcount].id;
				objTargetElement.options[objTargetElement.length - 1].selected = true;
				objForm.elements[elcount].checked = true;
			}
		}
		targetForm = document.forms[0];
		targetForm.action = "makedat.action"
		targetForm.submit();

	} else {
		for ( var elcount = 1; elcount < objLen; elcount++) {
			if (objForm.elements[elcount].type == "checkbox") {
				if (objForm.elements[elcount].checked == true) {
					objTargetElement.length = objTargetElement.length + 1;
					objTargetElement.options[objTargetElement.length - 1].value = objForm.elements[elcount].id;
					objTargetElement.options[objTargetElement.length - 1].selected = true;
					objForm.elements[elcount].checked = true;
					ckflg = false;
				}
			}
		}

		if (ckflg) {
			alert("请至少选择一个会议！")
		} else {
			targetForm = document.forms[0];
			targetForm.action = "makedat.action"
			targetForm.submit();
		}
	}
}

