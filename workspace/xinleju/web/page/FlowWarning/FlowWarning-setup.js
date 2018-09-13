function save() {
	document.frm.submit();
}

function initDatas(id0,id1) {
	var datas = $("#"+id0).attr("value");
	var names = "";
	if (datas.length > 0) {
		for (var x = 0; x < datas.split(";").length; x++) {
			names += datas.split(";")[x].split(":")[1] + ",";
		}
	}
	if (names.length > 0) {
		names = names.substring(0,names.length-1);
		$("#"+id1).val(names);
	}
}