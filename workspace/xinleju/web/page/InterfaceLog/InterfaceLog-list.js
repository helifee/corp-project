var query = function(start){
	 if (start && start >= 0) {
		 document.getElementsByName('start')[0].value = start;
     }
	 $('body').mask("数据查询中...");
     $("#frm").submit();
};

var resetCount = function(){
	 var ids = getCheckBoxValues("ids");
	 if(!ids) {
		 alert("请选择一条记录进行操作！");
		 return;
	 }
	 if(window.confirm("确认重置吗？")) {
		 $('body').mask("重置中...");
		 $.ajax({
				type : "POST",
				url : "InterfaceLog!resetCount.do",
				data : {ids:ids},
				dataType : "json",
				success : function(data, textStatus, jqXHR) {
					$('body').unmask();
					if (data && data.success) {
						alert("重置成功！");
						query();
					} else {
						alert("重置失败！");
					}
				},
				error : function(jqXHR, textStatus, errorThrown) {
					$('body').unmask();
					// $.parseJSON(jqXHR.responseText).data.error.message;
					alert("重置失败！");
				},
				dataType : "json"
			});
	 }
}