
function joinUser(obj,userId,parentEntityId,partyStructTypeId) {
	$('body').mask('操作中...');
	if(obj.checked==true){
		$.post('User!joinUser.do?partyStructTypeId='+partyStructTypeId+'&userId='+userId+'&parentEntityId='+parentEntityId, $('#frm').serialize(), function(data) {
			$('body').unmask();
			window.opener.refreshUser();
		});
	}else{
		$.post('User!removeUser.do?partyStructTypeId='+partyStructTypeId+'&userId='+userId+'&parentEntityId='+parentEntityId, $('#frm').serialize(), function(data) {
			$('body').unmask();
			window.opener.refreshUser();
		});
	}
}

function joinUsers(parentEntityId,partyStructTypeId) {
	$('body').mask('操作中...');
	
	var addUserIds = "";
	var removeUserIds = "";
	
	$.each($("input[name='userIdCk']:checked") , function() {
		
		if(iAddUserIds.indexOf(","+$(this).val()+",")==-1){
			if(addUserIds==""){
				addUserIds += ""+$(this).val();
				
			}else if(addUserIds!=""){
				addUserIds += ","+$(this).val();
			}	
		}

	});
	
	$.each($("input[name='userIdCk']:not(:checked)") , function() {
		
		if(iAddUserIds.indexOf(","+$(this).val()+",")!=-1){
			if(removeUserIds==""){
				removeUserIds += ""+$(this).val();
				
			}else if(removeUserIds!=""){
				removeUserIds += ","+$(this).val();
			}	
		}		

	});
	
	if(addUserIds!=""||removeUserIds!=""){
		$.post('User!joinUsers.do?partyStructTypeId='+partyStructTypeId+'&removeUserIds='+removeUserIds+'&userIds='+addUserIds+'&parentEntityId='+parentEntityId, $('#frm').serialize(), function(data) {
			$('body').unmask();
			window.opener.refreshUser();
			initUnionUser();
			window.close();
			
		});
	}else{
		$('body').unmask();
	}
    
	
}

function doSearch() {
	 $('#frm').submit();
}

$(function($) {
	initUnionUser();
});

var iAddUserIds = ",";
//var iRemoveUserIds = "";

function initUnionUser(){
	iAddUserIds = ",";
	$.each($("input[name='userIdCk']:checked") , function() {
		
			iAddUserIds += $(this).val()+",";
				

	});
	
	
//	$.each($("input[name='userIdCk']:not(:checked)") , function() {
//		if(iRemoveUserIds==""){
//			iRemoveUserIds = ""+$(this).val();
//			
//		}else if(iRemoveUserIds!=""){
//			iRemoveUserIds = ","+$(this).val();
//		}		
//
//	});
	
}
