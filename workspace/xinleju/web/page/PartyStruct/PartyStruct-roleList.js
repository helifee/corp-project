function doSearch() {
	$('#frm').submit();
}

function chooseCheckBox(obj){
	$.each($("input:checkbox") , function() {
		$(this).attr("checked",false); 
	});
	obj.checked=true;
}

function chooseThisRow( id ) {
	$("#"+id).attr("checked", !$("#"+id).attr("checked"));
}

function editShortName(){
	if($("input:checkbox:checked").length != 1){
		alert("请只选中一条记录");
	}else{
		$.each($("input:checkbox:checked") , function() {
			var partyStructTypeId = $('#partyStructTypeId').val();
			var parentId = $('#parentId').val();
			var roleId = $(this).val();
			OpenWin('PartyStruct!editRole.do?roleId='+roleId+'&parentId='+parentId+'&partyStructTypeId='+partyStructTypeId);
		});
	}
}

function deleteRole(parentId,partyStructTypeId){
	if(confirm("删除后,授权和组织架构相关数据都会删除")){
		if($("input:checkbox:checked").length==0){
			alert("请先选中一条记录");
		}else{
			$.each($("input:checkbox:checked") , function() {
				var roleId = $(this).val();
				$('body').mask("操作中...");
				$.post('PartyStruct!deleteRole.ajax?roleId='+roleId, $('#frm').serialize(), function(data) {
					$('body').unmask();
					window.location.reload();
				});
			});
		}
	}
}

//引入标准角色
function unionRole(parentId,partyStructTypeId){
	OpenWin('PartyStruct!unionRole.do?parentId='+parentId+'&partyStructTypeId='+partyStructTypeId);
}
//添加岗位
function addRole(parentId,partyStructTypeId){
	OpenWin("PartyStruct!editRole.do?partyStructTypeId="+partyStructTypeId+"&parentId="+parentId);
}
function searchUser(roleId){
	var partyStructTypeId = $('#partyStructTypeId').val();
	$.post('PartyEntity!getEntityId.ajax?roleId='+roleId, $('#frm').serialize(), function(data) {
		window.parent.searchUser(partyStructTypeId,data.partyEntityId);
	});
}

function openEditWindow(partyType,ifOnlyEntity){
	var currentNodeId = document.getElementById("parentId").value;
	var currentStructTypeId = document.getElementById("partyStructTypeId").value;
	if(currentNodeId == 0){
		alert("请先选择在哪个节点下添加");
	}else{
		var parentEntityId = document.getElementById("parentId").value;
		var currentStructTypeId = document.getElementById("partyStructTypeId").value;
		var refId = $('#refId').val();
		if(partyType=='company'){
			window.parent.openwindow("PartyStruct!editCompany.do?id="+refId+"&partyStructTypeId="+currentStructTypeId+"&parentEntityId="+parentEntityId+"&partyType="+partyType);
		}else if(partyType=='department'){
			window.parent.openwindow("PartyStruct!editDept.do?id="+refId+"&partyStructTypeId="+currentStructTypeId+"&parentEntityId="+parentEntityId+"&partyType="+partyType);
		}else if(partyType=='group'){
			window.parent.openwindow("PartyStruct!editGroup.do?id="+refId+"&partyStructTypeId="+currentStructTypeId+"&parentEntityId="+parentEntityId+"&partyType="+partyType);
		}else if(partyType=='zb'){
			window.parent.openwindow("PartyEntity!edit.do?id="+currentNodeId+"&partyStructTypeId="+currentStructTypeId+"&parentEntityId=&partyType="+partyType);
		}else{
			alert("此节点不可修改");
		}
	}

}

function openAddWindow(partyType,ifOnlyEntity){
	var currentNodeId = document.getElementById("parentId").value;
	var currentStructTypeId = document.getElementById("partyStructTypeId").value;
	if(currentNodeId == 0){
		alert("请先选择在哪个节点下添加");
	}else{
		if(ifOnlyEntity=='yes'||isEmpty(ifOnlyEntity)){
			window.parent.openwindow("PartyEntity!edit.do?parentEntityId="+currentNodeId+"&partyStructTypeId=" + currentStructTypeId+"&partyType="+partyType);  
		}else{
			if(partyType=='company'){
				window.parent.openwindow("PartyStruct!editCompany.do?partyStructTypeId="+currentStructTypeId+"&parentEntityId="+currentNodeId+"&partyType="+partyType);
			}
			if(partyType=='department'){
				window.parent.openwindow("PartyStruct!editDept.do?partyStructTypeId="+currentStructTypeId+"&parentEntityId="+currentNodeId+"&partyType="+partyType);
			}
			if(partyType=='group'){
				window.parent.openwindow("PartyStruct!editGroup.do?partyStructTypeId="+currentStructTypeId+"&parentEntityId="+currentNodeId+"&partyType="+partyType);
			}
		}
	}

}