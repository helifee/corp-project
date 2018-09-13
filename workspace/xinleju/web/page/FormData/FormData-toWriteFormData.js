var save = function() {
	$('body').mask("数据保存中...");
	$.ajax({
		type : "POST",
		url : "FormData!saveFormData.do",
		data : $('#frm').serialize(),
		dataType : "json",
		success : function(data, textStatus, jqXHR) {
			$('body').unmask();
			if (data && data.success) {
				window.close();
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