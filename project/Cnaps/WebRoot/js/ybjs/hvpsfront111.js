
function detailTransferOfClient(id){
     
	document.forms[0].action=getRootPath()+"/transfer/transferManage/transferOfClientAction.do?method=detailTransferOfClient&id="+id;
	document.forms[0].submit();
}


function deleteTransferOfClient(id){
 if (confirm("是否删除此数据?") == true){
     
	document.forms[0].action=getRootPath()+"/transfer/transferManage/transferOfClientAction.do?method=deleteTransferOfClient&id="+id;
	document.forms[0].submit();
	}
}


function queryTranssferOfClientList(){

	document.forms[0].action=getRootPath()+"/transfer/transferManage/transferOfClientAction.do?method=queryTranssferOfClientList";
	document.forms[0].submit();
	
}

//通过ID查询一条记录
function findTransferOfClientById(id){

document.forms[0].action=getRootPath()+"/transfer/transferManage/transferOfClientAction.do?method=findTransferOfClientById&id="+id;
	document.forms[0].submit();
}


//通过ID查询一条记录 查询待复核的
function checkfindTransferOfClientById(id){

document.forms[0].action=getRootPath()+"/transfer/transferManage/transferOfClientAction.do?method=checkfindTransferOfClientById&id="+id;
	document.forms[0].submit();
}

//复核
function checkTranssferOfClient(){

	document.forms[0].action=getRootPath()+"/transfer/transferManage/transferOfClientAction.do?method=checkTranssferOfClient&id="+id;
	document.forms[0].submit();
}

//提交修改
function updateTransferOfClient(id){

	document.forms[0].action=getRootPath()+"/transfer/transferManage/transferOfClientAction.do?method=updateTransferOfClient&id="+id;
	document.forms[0].submit();
}







