var query = function(start){
	if (start && start >= 0) {
		document.getElementsByName('start')[0].value = start;
	}
	$('body').mask("数据查询中...");
	$("#frm").submit();
};

var updateOpGroup = function(isdisabled) {
	var dealName = "";
	if (isdisabled == 1){
		dealName = "禁用";
	} else {
		dealName = "启用";
	}
	var dt = new Date();
	var ids = getCheckBoxValues("ids");
	if(!ids) {
		alert("请选择一条记录进行操作！");
		return;
	}
	if(window.confirm("确认要" + dealName + "吗？")) {
		$('body').mask(dealName + "中...");
		$.ajax({
			type : "POST",
			url : "OpGroup!updateOpGroup.do",
			data : {ids:ids, isdisabled : isdisabled,t:dt.getTime()},
			dataType : "json",
			success : function(data, textStatus, jqXHR) {
				$('body').unmask();
				if (data && data.success) {
					alert(dealName + "成功！");
					query();
				} else {
					alert(dealName + "失败！");
				}
			},
			error : function(jqXHR, textStatus, errorThrown) {
				$('body').unmask();
				alert(dealName + "失败！");
			},
			dataType : "json"
		});
	}
};
var newOpGroup = function() {
	var dt = new Date();
	window.open('OpGroup!edit.do?act=create', 'flow_' + dt.getTime(),isNotEmpty(opts) ? opts.replace("scrollbars=no", "scrollbars=yes") : "");
};

var editOpGroup = function() {
	var dt = new Date();
	var ids = getCheckBoxValues("ids");
	if(!ids) {
		alert("请选择一条记录进行操作！");
		return false;
	} else if (ids.indexOf(';') > 0){
		alert("请选择一条记录进行操作！");
		return false;
	} else {
		window.open('OpGroup!edit.do?id=' + ids, 'flow_' + dt.getTime(),isNotEmpty(opts) ?  opts.replace("scrollbars=no", "scrollbars=yes") : "");
	}
};