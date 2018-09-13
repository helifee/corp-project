var setCurrentVersion = function(id) {
	$('body').mask("数据保存中...");
	$.ajax({
		type : "POST",
		url : "FormDefine!setCurrentVersion.do",
		data : {id:id},
		dataType : "json",
		success : function(data, textStatus, jqXHR) {
			$('body').unmask();
			if (data && data.success) {
				$("#frm").submit();
			} else {
				alert(data.msg);
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {
			$('body').unmask();
			// $.parseJSON(jqXHR.responseText).data.error.message;
			alert("网络故障！");
		},
		dataType : "json"
	});
}