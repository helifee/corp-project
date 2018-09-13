function save() {
	if(true){
		$('body').mask("数据保存中...");
		$.ajax({
			type : "POST",
			url : "Role!save.do",
			data : $('#frm').serialize(),
			dataType : "json",
			success : function(data, textStatus, jqXHR) {
				$('body').unmask();
				if (data && data.success) {
					window.opener.doSearchRefreshParentTree();
					window.close();
				} else {
					alert(data.msg);
				}
			},
			error : function(jqXHR, textStatus, errorThrown) {
				$('body').unmask();
				alert("网络故障！");
			}
		});
	}else{
		alert("请正确填写信息");
	}
}