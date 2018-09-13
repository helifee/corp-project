function save() {
	if (true){
		var newPassword = $("input[name='newPassword']").eq(0).val();
		var confirmPassword = $("input[name='confirmPassword']").eq(0).val();
		
		if(newPassword != confirmPassword) {
			alert("两次密码输入不一致，请检查！");
			return;
		}
		
		$('body').mask('操作中...');
		$.post('User!updatePassword.do', $('#frm').serialize(), function(data) {
			$('body').unmask();
			if(data.success != null && data.success){
				window.close();
			}else{
				alert(data.errorMsg);
			}
		});
	} else {
		alert("请正确填写信息");
	}
}