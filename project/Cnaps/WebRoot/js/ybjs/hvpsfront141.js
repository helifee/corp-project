function querysapsList(){

	document.forms[0].action=getRootPath()+"/transfer/SAPSAccountQueueManagementAction.do?method=queryList";
	document.forms[0].submit();
	
}
function detailClient(id){
     //alert(id);
	//document.forms[0].action=getRootPath()+"/transfer/RealTimeCreditAction.do?method=CreditDetail&id="+id;
	document.forms[0].action=getRootPath()+id;
	document.forms[0].submit();
}

function detailTransferOfClient(id){
     
	document.forms[0].action=getRootPath()+"/transfer/transferManage/pvpAction.do?method=detailPVPClient&id="+id;
	document.forms[0].submit();
}


function deleteTransferOfClient(id){
if (confirm("do you delete this data?") == true){
     
	document.forms[0].action=getRootPath()+"/transfer/transferManage/transferOfClientAction.do?method=deleteTransferOfClient&id="+id;
	document.forms[0].submit();
	}
}


function queryTranssferOfClientList(){

	document.forms[0].action=getRootPath()+"/transfer/transferManage/pvpAction.do?method=modPVPClient";
	document.forms[0].submit();
	
}

//通过ID查询一条记录
function findTransferOfClientById(id){

document.forms[0].action=getRootPath()+"/transfer/transferManage/transferOfClientAction.do?method=findTransferOfClientById&id="+id;
	document.forms[0].submit();
}


//通过ID查询一条记录 查询待复核的
function checkfindTransferOfClientById(id){

document.forms[0].action=getRootPath()+"/transfer/transferManage/pvpAction.do?method=checkPVP&id="+id;
	document.forms[0].submit();
}
 
//复核
function checkTranssferOfClient(){

	document.forms[0].action=getRootPath()+"/transfer/transferManage/transferOfClientAction.do?method=checkTranssferOfClient&id="+id;
	document.forms[0].submit();
}

//提交修改
function updateTransferOfClient(id){

	document.forms[0].action=getRootPath()+"/transfer/transferManage/pvpAction.do?method=checkPVP&flagmod=update&id="+id;
	document.forms[0].submit();
}
//提交删除
function delTransferOfClient(id){
    
       var result=  confirm("您确定要删除吗？注意：此操作不可恢复，请谨慎操作！"); 
     if(!result){
      return ;
     }
	document.forms[0].action=getRootPath()+"/transfer/transferManage/pvpAction.do?method=delPVP&id="+id;
	document.forms[0].submit();
}







