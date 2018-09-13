function save() {
	if(true){
		$('body').mask("操作中...");
		$.post('PartyStruct!saveCompany.do', $('#frm').serialize(), function(data) {
			$('body').unmask();
			window.opener.refreshTree(data.parentEntityId);
			window.close();
			//window.opener.location.reload();
		});
	}else{
		alert("请正确填写信息");
	}
}



function partyWindow() {  
	var win = new Ext.Window({ 
		width:305,
		height:425,
		html:'<iframe height=\'360\' width=\'290\' src="PartyStruct!areaTree.do"></iframe>',
		title:"区域",
		buttonAlign: 'center',
		buttons: [
		          { text: '确定', handler: function(){win.close();} }
		          ]
	});  
	win.show(); 
}


function chooseArea(name,nodeId){
	document.getElementById("companyArea").innerHTML=name;
	document.getElementById("companyAreaId").value=nodeId;
}