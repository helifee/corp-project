function save() {

    $('body').mask("数据保存中...");

    $.post('Ct!save.do', $('#frm').serialize(), function(data) {
        $('body').unmask();
        if (window.opener) {
            window.opener.refreshTree( $("#frm_ct_parentId").attr("value") );
            
        }
       
        window.close();
    });
}