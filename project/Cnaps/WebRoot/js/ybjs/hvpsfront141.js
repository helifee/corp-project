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

//ͨ��ID��ѯһ����¼
function findTransferOfClientById(id){

document.forms[0].action=getRootPath()+"/transfer/transferManage/transferOfClientAction.do?method=findTransferOfClientById&id="+id;
	document.forms[0].submit();
}


//ͨ��ID��ѯһ����¼ ��ѯ�����˵�
function checkfindTransferOfClientById(id){

document.forms[0].action=getRootPath()+"/transfer/transferManage/pvpAction.do?method=checkPVP&id="+id;
	document.forms[0].submit();
}
 
//����
function checkTranssferOfClient(){

	document.forms[0].action=getRootPath()+"/transfer/transferManage/transferOfClientAction.do?method=checkTranssferOfClient&id="+id;
	document.forms[0].submit();
}

//�ύ�޸�
function updateTransferOfClient(id){

	document.forms[0].action=getRootPath()+"/transfer/transferManage/pvpAction.do?method=checkPVP&flagmod=update&id="+id;
	document.forms[0].submit();
}
//�ύɾ��
function delTransferOfClient(id){
    
       var result=  confirm("��ȷ��Ҫɾ����ע�⣺�˲������ɻָ��������������"); 
     if(!result){
      return ;
     }
	document.forms[0].action=getRootPath()+"/transfer/transferManage/pvpAction.do?method=delPVP&id="+id;
	document.forms[0].submit();
}







