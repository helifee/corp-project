
function deleteSystemOrganization(indentifier){
	if (confirm("�Ƿ�Ҫɾ���û���?")==true){
	    var url =getRootPath()+"/systemManage/systemOrganizationManageAction.do?method=deleteSystemOrganization&indentifier="+indentifier;
		var i = createWin("wind","ɾ������",url);
		i.on("beforedestroy",function(){
	 		window.location.href=getRootPath()
				+ "/systemManage/systemOrganizationManageAction.do?method=querySystemOrganization";
			return true;
	 	});
 		i.show();
	}
}

function querySystemOrganizationByIndentifier(indentifier){
	
	var url = getRootPath()+"/systemManage/systemOrganizationManageAction.do?method=querySystemOrganizationByIndentifier&indentifier="+indentifier;
	
 	var i = createWin("wind","�޸Ļ���",url);
 	i.on("beforedestroy",function(){
	 		window.location.href=getRootPath()
				+ "/systemManage/systemOrganizationManageAction.do?method=querySystemOrganization";
			return true;
	 	});
 	i.show();
}

function querySystemOrganization(){
	document.forms[0].action=getRootPath()+"/systemManage/systemOrganizationManageAction.do?method=querySystemOrganization";
	document.forms[0].submit();
}
function systemOrganizationDetail(indentifier){
	var url = getRootPath()+"/systemManage/systemOrganizationManageAction.do?method=systemOrganizationDetail&indentifier="+indentifier;
	
 	var i = createWin("wind","������ϸ",url);
 	i.on("beforedestroy",function(){
	 		window.location.href=getRootPath()
				+ "/systemManage/systemOrganizationManageAction.do?method=querySystemOrganization";
			return true;
	 	});
 	i.show();
}
function addSystemOrganizationView(){
	
	var url = getRootPath()+"/systemManage/systemOrganizationManageAction.do?method=addSystemOrganizationView";
	
 	var i = createWin("wind","��������",url);
 	i.on("beforedestroy",function(){
	 		window.location.href=getRootPath()
				+ "/systemManage/systemOrganizationManageAction.do?method=querySystemOrganization";
			return true;
	 	});
 	i.show();
}
function reset(organizationForm){
organizationForm.reset();
}