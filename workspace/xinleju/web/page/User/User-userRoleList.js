function doSearch() {
	 $('#frm').submit();
}


function chooseCheckBox(obj){
	$.each($("input:checkbox") , function() {
		$(this).attr("checked",false); 
	});
	obj.checked=true;
}

function addR( partyStructTypeId){
	
	if($("input:checkbox:checked").length != 1){
		alert("请先选中一条记录");
	}else{
		$.each($("input:checkbox:checked") , function() {
			var roleId = $(this).val();
			openwindow('User!unionUser.do?roleId='+roleId+'&partyStructTypeId='+partyStructTypeId);
		});
	}
	
	
}



function edit(parentEntityId,partyStructTypeId){
	if($("input:checkbox:checked").length != 1){
		alert("请先选中一条记录");
	}else{
		$.each($("input:checkbox:checked") , function() {
			var userId = $(this).val();
			openwindow('User!edit.do?id='+userId+'&parentEntityId='+parentEntityId+'&partyStructTypeId='+partyStructTypeId);
			
		});
	}
	
}



function disable(){
	if($("input:checkbox:checked").length==0){
		alert("请先选中一条记录");
	}else{
		$.each($("input:checkbox:checked") , function() {
			var roleId = $(this).val();
			$('body').mask('操作中...');
			$.post('User!disable.do?userId='+roleId, $('#frm').serialize(), function(data) {
				$('body').unmask();
				window.location.reload();
			 
			});
			
		});
	}
}


function enable(){
	if($("input:checkbox:checked").length==0){
		alert("请先选中一条记录");
	}else{
		$.each($("input:checkbox:checked") , function() {
			var roleId = $(this).val();
			$('body').mask('操作中...');
			$.post('User!enable.do?userId='+roleId, $('#frm').serialize(), function(data) {
				$('body').unmask();
				window.location.reload();
			});
		});
	}
}

//移除兼职岗位
function removeRole(roleId){
	var userId = $("#userId").val();
	$('body').mask('操作中...');
	$.post('User!removeRole.do?roleId='+roleId+'&userId='+userId, function(data) {
		$('body').unmask();
		window.location.reload(); 
	});
	
}


