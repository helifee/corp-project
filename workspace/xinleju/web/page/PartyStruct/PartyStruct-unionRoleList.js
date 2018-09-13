function deleteRole(roleId){			
	$('body').mask("操作中...");
	$.post('PartyStruct!deleteRole.ajax?roleId='+roleId, function(data) {
			$('body').unmask();
			window.location.reload();
	});
}