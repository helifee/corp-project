function save() {
	if(true){
		$('body').mask("操作中...");
		$.post('PartyStruct!saveGroup.do', $('#frm').serialize(), function(data) {
			$('body').unmask();
			window.opener.refreshTree(data.parentEntityId);
			window.close();
		});
	}else{
		alert("请正确填写信息");
	}

}

function partyWindow() {  
	var win = new Ext.Window({ 
		width:305,
		height:425,
		html:'<iframe height=\'360\' width=\'290\'  src="PartyStruct!roleTree.do"></iframe>',
		title:"角色",
		buttonAlign: 'center',
		buttons: [
		          { text: '确定', handler: function(){win.close();} }
		          ]
	});  
	win.show(); 
}


function chooseRole(name,nodeId){
	document.getElementById("upGroupRole").innerHTML=name;
	document.getElementById("upGroupRoleId").value=nodeId;
}