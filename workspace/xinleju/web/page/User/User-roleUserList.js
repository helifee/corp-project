function doSearch() {
	 $('#frm').submit();
}

function chooseCheckBox(obj){
	$.each($("input:checkbox") , function() {
		$(this).attr("checked",false); 
	});
	obj.checked=true;
	refreshR();
}

function refreshR(){
	if($("input:checkbox:checked").length==0){
		alert("请先选中一条记录");
	}else{
		$.each($("input:checkbox:checked") , function() {
			var userId = $(this).val();
			Ext.get(document.getElementById("role_frame")).dom.src ="User!userRoleList.do?userId=" + userId;
		});
	}
	
}

function add(parentEntityId,partyStructTypeId){
	sysOpenWindow('User!edit.do?parentEntityId='+parentEntityId+'&partyStructTypeId='+partyStructTypeId);
}


function edit(parentEntityId,partyStructTypeId){
	if($("input:checkbox:checked").length != 1){
		alert("请先选中一条记录");
	}else{
		$.each($("input:checkbox:checked") , function() {
			var userId = $(this).val();
			sysOpenWindow('User!edit.do?id='+userId+'&parentEntityId='+parentEntityId+'&partyStructTypeId='+partyStructTypeId);
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


function removeUser(userId){
	
	if(confirm("确定移除吗")){
		$('body').mask('操作中...');
		var parentEntityId =  $("#parentEntityId").val();
		$.post('PartyStruct!removeUser.do?userId='+userId+'&parentEntityId='+parentEntityId, {}, function(data) {
			$('body').unmask();
			var roleId = $("#roleId").val();
			var start = $("#start").val();
			//alert(pageId);
			document.location="User!roleUserList.do?limit=10&roleId="+roleId+"&start="+start;
		}).error(function(xhr,errorText,errorType){
			//目前没有发现暂时这样处理
			$('body').unmask();
			
		});
	}
	
}
