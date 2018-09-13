function detailTransferOfClient(id){
     
	document.forms[0].action=getRootPath()+"/transfer/transferManage/pvpDBAction.do?method=detailPVPClient&id="+id;
	document.forms[0].submit();
}