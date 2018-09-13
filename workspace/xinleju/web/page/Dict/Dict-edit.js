function save() {
	if (true){
		$('body').mask("数据保存中...");
		$.post('Dict!save.do', $('#frm').serialize(), function(data) {
			if(null != data && data.success == 'true'){
				alert("保存成功!");
				window.opener.queryAndRefreshTree();
				window.close();
			} else {
				alert(data.msg);
			}
			$('body').unmask();
		});
	}else{
		alert("请正确填写信息");
	}
}