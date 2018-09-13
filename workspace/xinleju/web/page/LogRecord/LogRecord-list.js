var query = function(start){
	 if (start && start >= 0) {
		 document.getElementsByName('start')[0].value = start;
     }
	 $('body').mask("数据查询中...");
     $("#frm").submit();
};
//批量删除
function batchDel() {
	var ids = getCheckBoxValues("ids");
	if(!ids) {
		alert("请选择一条记录进行操作！");
		return;
	}
	if(confirm("您确认删除吗？")) {
		$.ajax({
			type : 'POST',
			url : 'LogRecord!deleteLogs.do?retIds='+ ids,
			success : function(data) {
				$('body').unmask();
				if (data && data.success) {
					alert("操作成功！");
					$("#frm").submit();
				} else {
					if (data && data.msg){
						alert(data.msg);
					} else {
						alert("操作失败！");
					}
				}
			}
		});
	}
}