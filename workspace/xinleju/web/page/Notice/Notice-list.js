var editNotice = function(id){
	var dt = new Date();
	var url = 'Notice!edit.do';
	if(id) {
		url += "?id="+id;
	}
    window.open(url, 'Notice_' + dt.getTime(), opts);
}


var delNotice = function(id) {
	 if(window.confirm("确认要删除吗？")) {
		 $('body').mask("删除中...");
		 $.ajax({
				type : "POST",
				url : "Notice!removeOne.do",
				data : {id:id},
				dataType : "json",
				success : function(data, textStatus, jqXHR) {
					$('body').unmask();
					if (data && data.success) {
						alert("删除成功！");
						queryFrm();
					} else {
						alert("删除失败！");
					}
				},
				error : function(jqXHR, textStatus, errorThrown) {
					$('body').unmask();
					// $.parseJSON(jqXHR.responseText).data.error.message;
					alert("删除失败！");
				},
				dataType : "json"
			});
	 }
}

var publishNotice = function(id) {
	
}

