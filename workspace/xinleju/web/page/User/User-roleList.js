function doSearch() {
	 $('#frm').submit();
}


function chooseCheckBox(id){
	$.each($("input:checkbox") , function() {
		$(this).attr("checked",false); 
	});
//	obj.checked=true;
	$("#"+id).attr("checked", true);
	refreshU();
}

function refreshU(){
 
	if($("input:checkbox:checked").length==0){
		alert("请先选中一条记录");
	}else{
		$.each($("input:checkbox:checked") , function() {
			var roleId = $(this).val();
			Ext.get(document.getElementById("userr_frame")).dom.src ="User!roleUserList.do?limit=10&roleId=" + roleId;
			var iframe = document.getElementById("userr_frame");
			if (iframe.attachEvent) {
				iframe.attachEvent("onload", function() {
					setAutoHeight('userr_frame', 0);
					window.parent.autoH();
				});
			} else {
				iframe.onload = function() {
					setAutoHeight('userr_frame', 0);
					window.parent.autoH();
				};
			} 
		});
	}
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

function refreshUser(){
	if($("input:checkbox:checked").length==0){
		alert("请先选中一条记录");
	}else{
		$.each($("input:checkbox:checked") , function() {
			var roleId = $(this).val();
			var iframe = document.getElementById("userr_frame");
			Ext.get(iframe).dom.src ="User!roleUserList.do?limit=10&roleId="+roleId;
			if (iframe.attachEvent){ 
				iframe.attachEvent("onload", function(){ 
					window.parent.setAutoHeight('user_frame',0);
				}); 
			} else { 
				iframe.onload = function(){ 
					setAutoHeight('user_frame',0);
				}; 
			} 
		});
	}
}


function edit(parentEntityId,partyStructTypeId){
	
	if($("input:checkbox:checked").length==0){
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
 