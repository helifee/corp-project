function save() {
	
    $('body').mask("数据保存中...");
    
    $.post('OutCodeMgr!saveOcd.do', $('#frm').serialize(), function(data) {
        $('body').unmask();
        if (window.opener) {
            window.opener.updateTree(data);
        }
        window.close();
    });
}