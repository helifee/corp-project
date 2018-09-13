var selectIframeToCsList = function() {
	var selNodes = document.getElementById("projectListIframe").contentWindow.document.getElementsByName("ids");
	for (var x = 0; x < selNodes.length; x++) {
		if (selNodes[x].checked) {
			jsAddItemToSelect('ftList', $.trim($(selNodes[x]).parent().next(".flowName").text()), selNodes[x].value);
		}
	}

};

var save = function() {
	// Part_910:总经理;Part_911:董事长;User_938:tyx;Part_912:董事长秘书
	var datas = getMSelectValue('ftList');
	//if (datas.length == 0) {
	//	alert("请选择模板!");
	//	return;
	//}
	var names = "";
	if (datas.length > 0) {
		for (var x = 0; x < datas.split(";").length; x++) {
			names += datas.split(";")[x].split(":")[1] + ",";
		}
	}
	if (names.length > 0) {
		names = names.substring(0, names.length - 1);
	}
	opener.document.getElementById("flowTemps").value = datas;
	opener.document.getElementById("selectFlowTemps").value = names;
	alert("保存成功!");
	window.close();
}

var initSelect = function() {
	var datas = $("#datas").attr("value");
	if (datas.length > 0) {
		for (var x = 0; x < datas.split(";").length; x++) {
			jsAddItemToSelect('ftList', datas.split(";")[x].split(":")[1], datas.split(";")[x].split(":")[0]);
		}
	}
}