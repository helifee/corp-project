
function detailTransferOfClient(id){
     
	document.forms[0].action=getRootPath()+"/transfer/transferManage/transferOfClientAction.do?method=detailTransferOfClient&id="+id;
	document.forms[0].submit();
}


function deleteTransferOfClient(id){
 if (confirm("�Ƿ�ɾ��������?") == true){
     
	document.forms[0].action=getRootPath()+"/transfer/transferManage/transferOfClientAction.do?method=deleteTransferOfClient&id="+id;
	document.forms[0].submit();
	}
}


function queryTranssferOfClientList(){

	document.forms[0].action=getRootPath()+"/transfer/transferManage/transferOfClientAction.do?method=queryTranssferOfClientList";
	document.forms[0].submit();
	
}

//ͨ��ID��ѯһ����¼
function findTransferOfClientById(id){

document.forms[0].action=getRootPath()+"/transfer/transferManage/transferOfClientAction.do?method=findTransferOfClientById&id="+id;
	document.forms[0].submit();
}


//ͨ��ID��ѯһ����¼ ��ѯ�����˵�
function checkfindTransferOfClientById(id){

document.forms[0].action=getRootPath()+"/transfer/transferManage/transferOfClientAction.do?method=checkfindTransferOfClientById&id="+id;
	document.forms[0].submit();
}

//����
function checkTranssferOfClient(){

	document.forms[0].action=getRootPath()+"/transfer/transferManage/transferOfClientAction.do?method=checkTranssferOfClient&id="+id;
	document.forms[0].submit();
}

//�ύ�޸�
function updateTransferOfClient(id){

	document.forms[0].action=getRootPath()+"/transfer/transferManage/transferOfClientAction.do?method=updateTransferOfClient&id="+id;
	document.forms[0].submit();
}







