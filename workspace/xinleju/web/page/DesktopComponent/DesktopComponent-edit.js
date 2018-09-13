 var save=function() {
    $('body').mask("数据保存中...");
    $.ajax({
		type : "POST",
		url : "DesktopComponent!save.do",
		data : $('#frm').serialize(),
		dataType : "json",
		success : function(data, textStatus, jqXHR) {
			$('body').unmask();
			if (data && data.success) {
		        window.opener.query(0);
		        window.close();
			} else {
				alert(data.msg);
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {
			$('body').unmask();
			alert("网络故障！");
		},
		dataType : "json"
	});
}
 var query = function(start){
	 if (start && start >= 0) {
		 document.getElementsByName('start')[0].value = start;
     }
	 $('body').mask("数据查询中...");
     $("#frm").submit();
};