function save() {
	if(true){
		$('body').mask("数据保存中...");
		$.post('Op!save.do', $('#frm').serialize(), function(data) {
			$('body').unmask();
			window.opener.queryOp(0);
			window.close();
		});
	}else{
		alert("请正确填写信息");
	}
}