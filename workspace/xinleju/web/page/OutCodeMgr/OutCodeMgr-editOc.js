function save() {
    $('body').mask("数据保存中...");
    $.post('OutCodeMgr!saveOc.do', $('#frm').serialize(), function(data) {
        $('body').unmask();
        
        if(window.opener){
        	window.opener.parent.queryOc();
        }
        
        window.close();
    });
}