function save() {
	if(true){
		$('body').mask("操作中...");
		$.post('Setting!save.do?', $('#frm').serialize(), function(data) {
			$('body').unmask();
		});
	}else{
		alert("请正确填写信息");
	}
}
