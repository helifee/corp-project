var restart=function(id) {
    $('body').mask("启动中...");
    $.ajax({
		type : "POST",
		url : "Designer!restart.do",
		data : {id:id},
		dataType : "json",
		success : function(data, textStatus, jqXHR) {
			$('body').unmask();
			if (data && data.success) {
				queryList();
			} else {
				alert(data.msg);
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {
			$('body').unmask();
			alert("网络故障！");
		},
	});
}



var queryList = function(){
	frm.submit();
}
