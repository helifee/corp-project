//批量删除
function batchDel() {
	var ids = getCheckBoxValues("dictIds");
	if(!ids) {
		alert("请选择一条记录进行操作！");
		return;
	}
	if(confirm("您确认删除吗？")) {
		$('body').mask("操作中...");
		$.ajax({
			type : "POST",
			url : "ReportSetting!delete.do?retIds="+ids,
			data : {ids:ids,t:(new Date()).getTime()},
			dataType : "json",
			success : function(data, textStatus, jqXHR) {
				$('body').unmask();
				if (data && data.success) {
					alert("操作成功！");
					queryAndRefreshTree();
				} else {
					if (data && data.msg){
						alert(data.msg);
					} else {
						alert("操作失败！");
					}
				}
			},
			error : function(jqXHR, textStatus, errorThrown) {
				$('body').unmask();
				alert("操作失败！");
			}
		});
	}
}
//查询报表
function searchReport(urlPath){
	OpenWin(urlPath);
}

//增加
function addReportSetting(code) {
	OpenWin('ReportSetting!edit.do?code='+code);
}

//修改增加
function editReportSetting() {
 
	if($("input:checkbox:checked").length != 1){
		alert("请先选中一条记录");
	} else if ( $("input:checkbox:checked").length == 1 ) {
		$.each($("input:checkbox:checked") , function() {
			var ReportSettingId = $(this).val();
			if ( ReportSettingId == 'total' ) {
				alert("请先选中一条记录");
			} else {
				OpenWin('ReportSetting!edit.do?reportSetting.id=' + ReportSettingId );
			}
		});
	} else {
		$.each($("input:checkbox:checked") , function() {
			var ReportSettingId = $(this).val();
			OpenWin('ReportSetting!edit.do?reportSetting.id=' + ReportSettingId );
			
		});
	}
}


var query = function(start){
	if (start && start >= 0) {
		document.getElementsByName('start')[0].value = start;
	}
	$('body').mask("数据查询中...");
	$("#frm").submit();
}
var queryAndRefreshTree = function(start){
	this.query(start);
	if (typeof(window.parent) !="undefined" && typeof(window.parent.refreshTree) !="undefined"){
		window.parent.refreshTree();
	}
}
