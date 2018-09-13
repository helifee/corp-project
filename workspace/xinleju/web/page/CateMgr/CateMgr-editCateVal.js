function save() {
	$('body').mask("数据保存中...");
	$.post('CateMgr!saveCateVal.do', $('#frm').serialize(), function(data) {
		$('body').unmask();
		if(window.opener){
			window.opener.query();
		}
		window.close();
	});
}