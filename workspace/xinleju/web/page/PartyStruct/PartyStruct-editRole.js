function partyWindow() {  
	var win = new Ext.Window({ 
		width:305,
		height:425,
		html:'<iframe height=\'360\' width=\'290\' src="PartyStruct!roleTree.do"></iframe>',
		title:"岗位",
		buttonAlign: 'center',
		buttons: [{ text: '确定', handler: function(){win.close();} }]
	});
	win.show(); 
}


function roleWindow() {  
	var win = new Ext.Window({ 
		width:305,
		height:425,
		html:'<iframe height=\'360\' width=\'290\' src="PartyStruct!roleStandardTree.do"></iframe>',
		title:"角色",
		buttonAlign: 'center',
		buttons: [{ text: '确定', handler: function(){win.close();} }]
	});
	win.show(); 
}

function roleStandard(name,nodeId){
	document.getElementById("roleName").innerHTML=name;
	document.getElementById("parentId").value=nodeId;
}

function chooseRole(name,nodeId){
	document.getElementById("leaderRole").innerHTML=name;
	document.getElementById("leaderRoleId").value=nodeId;
}

function delLeaderRole(){
	document.getElementById("leaderRole").innerHTML='';
	document.getElementById("leaderRoleId").value='';
}
function save() {
	var partyStructTypeId = $('#partyStructTypeId').val();
	var parentEntityId = $('#parentEntityId').val();
	if(true){
		$('body').mask("数据保存中...");
		$.ajax({
			type : "POST",
			url : 'PartyStruct!saveRole.do?partyStructTypeId='+partyStructTypeId+'&parentEntityId='+parentEntityId,
			data : $('#frm').serialize(),
			dataType : "json",
			success : function(data, textStatus, jqXHR) {
				$('body').unmask();
				if (data && data.success) {
					window.opener.doSearch();
					window.close();
				} else {
					alert(data.msg);
				}
			},
			error : function(jqXHR, textStatus, errorThrown) {
				$('body').unmask();
				alert("网络故障！");
			}
		});
	} else {
		alert("请正确填写信息");
	}
}