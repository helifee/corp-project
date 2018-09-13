function save() {
	if (true){
		$('body').mask('操作中...');
		$.post('User!save.do', $('#frm').serialize(), function(data) {
			$('body').unmask();
			if(data.success){
				window.opener.location="User!structUserList.do?limit=10&start="+$("#frm_start").attr("value")+"&parentEntityId="+data.parentEntityId+"&partyStructTypeId="+data.partyStructTypeId+"&isAdd=true&userId="+$("#id").attr("value");
				window.close();
			}else{
				alert("用户数目已超过许可数量！");
			}

		});
	} else {
		alert("请正确填写信息");
	}
}

window.onload=function(){
	//checkLoginName();
}

function chooseRole(name,nodeId){
	document.getElementById("mainRole").innerHTML=name;
	document.getElementById("mainRoleId").value=nodeId;
	
	if (win!= null) {
		win.close();
	}
	
}
var win;
function partyWindow() {  
	if(win!=null){
		win.close(); 
	}
	var partyStructTypeId = $("#partyStructTypeId").val();
	win = new Ext.Window({ 
		width:305,
		height:430,
		resizable:false,
		html:'<iframe height=\'360\' width=\'290\' src="PartyStruct!roleTree.do?partyStructTypeId='+partyStructTypeId+'"></iframe>',
		title:"角色" ,
		buttonAlign: 'center',
		buttons: [
		          { text: '确定', handler: function(){win.close();} }
		          ]
	});  
	win.show(); 
}

function clearParty(){
	$('#mainRoleId').val('');
	$('#mainRole').html('');
}
//兼职角色
function jobWindow(userId) { 
	if(win!=null){
		win.close(); 
	}
	var partyStructTypeId = $("#partyStructTypeId").val();
	win = new Ext.Window({ 
		width:550,
		height:470,
		resizable:false,
		html:'<iframe height=\'420\' width=\'530\' src=\"Role!commList.do?partyStructTypeId='+partyStructTypeId+'&userId='+userId+'\"></iframe>',
		title:"角色" 
	});  
	win.show(); 
}

