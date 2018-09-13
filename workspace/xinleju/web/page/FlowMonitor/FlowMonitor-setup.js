function save() {
	if(true){
		$('body').mask("数据保存中...");
		$.post('FlowMonitor!save.do', $('#frm').serialize(), function(data) {
			$('body').unmask();
			window.opener.queryOp(0);
			window.close();
		});
	}else{
		alert("请正确填写信息");
	}
}
function initDatas(id0,id1) {
	var datas = $("#"+id0).attr("value");
	if (typeof datas != "undefined") {
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
}

function clickMe(obj) {
	if (obj.checked) {
		$(".suppend").show();
		$("#selectSuspend").attr("dataType","*1-2000");
	} else {
		$("#selectSuspend").removeAttr("dataType");
		$(".suppend").hide();
	}
}