function save() {
	if (true){
		$('body').mask("数据保存中...");
		$.post('CateMgr!saveCate.do', $('#frm').serialize(), function(data) {
			$('body').unmask();
			if(null != data){
				window.opener.queryAndRefreshTree();
			} else {
				window.opener.queryAndRefreshTree();
			}
			window.close();
		});
	}else{
		alert("请正确填写信息");
	}
}