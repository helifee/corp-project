
function deleteSystemOrganization(indentifier){
	if (confirm("是否要删除该机构?")==true){
	    var url =getRootPath()+"/systemManage/systemOrganizationManageAction.do?method=deleteSystemOrganization&indentifier="+indentifier;
		var i = createWin("wind","删除机构",url);
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
	
 	var i = createWin("wind","修改机构",url);
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
	
 	var i = createWin("wind","机构明细",url);
 	i.on("beforedestroy",function(){
	 		window.location.href=getRootPath()
				+ "/systemManage/systemOrganizationManageAction.do?method=querySystemOrganization";
			return true;
	 	});
 	i.show();
}
function addSystemOrganizationView(){
	
	var url = getRootPath()+"/systemManage/systemOrganizationManageAction.do?method=addSystemOrganizationView";
	
 	var i = createWin("wind","新增机构",url);
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