function save() {
	if(true){
	var parentEntityId = $('#parentEntityId').val();
		$('body').mask("操作中...");
		$.post('PartyEntity!save.do?parentEntityId='+parentEntityId, $('#frm').serialize(), function(data) {
			$('body').unmask();
			window.close();
			window.opener.refreshTree(data.parentEntityId);
		});
	}else{
		alert("请正确填写信息");
	}
}
