<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean"
	prefix="bean"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html"
	prefix="html"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-logic"
	prefix="logic"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
	String path = request.getContextPath();
%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
		<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
		<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
		<META HTTP-EQUIV="Expires" CONTENT="0">
		<title><c:choose>
				<c:when test="${syspara == '0'}">��ͨ���-����</c:when>
				<c:when test="${syspara == '1'}">��ͨ���-ת��</c:when>
			</c:choose></title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet"
			type="text/css" />
		<link rel="stylesheet" type="text/css"
			href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
		<link rel="stylesheet"
			href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css"
			type="text/css" media="screen,projection" />
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js"></script>
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/systemManager/showeditpanel.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/datePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/generalDebitaddRow.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/generalDebit.js"></script>
		
		<script type='text/javascript' src='<%=path%>/dwr/engine.js'></script>
		<script type='text/javascript' src='<%=path%>/dwr/util.js'></script>
		<script type="text/javascript"
			src="<%=path%>/js/common/jquery-1.3.1.js"></script>
		
		<script type="text/javascript"
			src="<%=path%>/js/common/checkIdCardNo.js"></script>
		
		<script type='text/javascript'
			src='<%=path%>/dwr/interface/PubService.js'></script>

		<script language="javascript">
	

	function OnSave() {
	var userMap = {};
	userMap.accountnumber = document.getElementById("dbtracct").value;
	userMap.accountname = document.getElementById("dbtraddr").value;
	userMap.addr = document.getElementById("cdtraddr").value;
	userMap.issuer =document.getElementById("dbtrissuer").value;
	userMap.issuernm =document.getElementById("dbtrissuernm").value;
	userMap.mmbid =document.getElementById("dbtrmmbid").value;
	
	  PubService.saveOthersBankAccountMsg(userMap, function(){
	  
	  }); 
}
		
		
	//�������˻�
		function queryBypaymentGroupNum(paymentGroupNum){
	 			
   			if(isNull(trim(paymentGroupNum))){
					 return;
			}
			var pop = createPopWin("popid",'ϵͳ������...',"<%=request.getContextPath()%>/page/transfer/shouquanCons.jsp");
			pop.show();
        	PubService.queryOthersBankAccountMsg(paymentGroupNum,function(obj){
		    pop.close();
			   
				  if(obj==null||obj.accountnumber==null){
				  
				   return;
				  }else{
			 
			  document.getElementById("dbtracct").value=obj.accountnumber;
		      document.getElementById("dbtrnm").value=obj.accountname==null?"": obj.accountname  ;
			  document.getElementById("dbtraddr").value=obj.addr==null?"": obj.addr  ;
			   document.getElementById("dbtrissuer").value=  obj.issuer==null?"": obj.issuer ;   
			  document.getElementById("dbtrissuernm").value=obj.issuernm==null?"":obj.issuernm ;	
			  
			   document.getElementById("dbtrbrnchid").value=  obj.issuer==null?"": obj.issuer ;   
			  document.getElementById("dbtrbrnchnm").value=obj.issuernm==null?"":obj.issuernm ;	
			   document.getElementById("dbtrmmbid").value=obj.mmbid==null?"":obj.mmbid ;	
		 }
	   	});
}
			
		



//�տ����˻�
function  PubQueryAccount(paymentGroupNum){
	 	clrAmt();
	 	if(isNull(trim(paymentGroupNum))){
							 return;
					}
					var pop = createPopWin("popid",'ϵͳ������...',"<%=request.getContextPath()%>/page/transfer/shouquanCons.jsp");
					pop.show();
					PubService.QueryAccount(paymentGroupNum,function(obj){
					 pop.close();
				
    		 				  if(obj==null||obj.acctid==null){
				 
				  	alert(" �տ�����Ϣ��ѯʧ�ܣ�δ�鵽�������" );
				 
				       
				   return;
				  }else{
						      document.getElementById("cdtrnm").value=obj.mm==null?"": obj.mm;//����
						      document.getElementById("cdtraddr").value=obj.addr==null?"": obj.addr;//��ַ
						      document.getElementById("proposertel").value=obj.tel==null?"": obj.tel;//��ϵ�绰
						      document.getElementById("proposercerttp").value=obj.certip==null?"": obj.certip;//֤������
							  document.getElementById("proposercerttp1").value=obj.certip==null?"": obj.certip;//֤������
						      document.getElementById("proposercertid").value=obj.certid==null?"": obj.certid;//֤����
						      document.getElementById("proposercstmrid").value=obj.cstmrid==null?"": obj.cstmrid;//�����˿ͻ���
						      document.getElementById("proposeraccttp").value=obj.accttp==null?"": obj.accttp;//�����˿ͻ���
						      document.getElementById("cdtrissuer").value=obj.bankcode==null?"": obj.bankcode;//�տ��˿������к�
						      document.getElementById("cdtrissuernm").value=obj.acctissr==null?"": obj.acctissr;//�տ��˿���������
		 }
	   	});
				
			}

//�������кŲ�ѯ
function selectBankInfo(){
				 var url ="<%=request.getContextPath()%>";
				var dbtrbrnchid= document.getElementById("dbtrbrnchid");
				var dbtrbrnchnm=document.getElementById("dbtrbrnchnm");
				var dbtrmmbid=document.getElementById("dbtrmmbid");
				var dbtrissuer= document.getElementById("dbtrissuer");
				var dbtrissuernm=document.getElementById("dbtrissuernm");
				selectkhhBank(url,dbtrbrnchid,dbtrbrnchnm,dbtrmmbid,dbtrissuer,dbtrissuernm);
								 
				
				
			}
			 		//�����˿������кŲ�ѯ
			function selectBankInfoOfFkk(){
				var url ="<%=request.getContextPath()%>";
				var payOpenBankNum= document.getElementById("dbtrissuer");
				var payOpenBankName=document.getElementById("dbtrissuernm");
				selectBank(url,payOpenBankNum,payOpenBankName,"");
			}
			//�տ��˿������кŲ�ѯ
			function selectBankInfoOfSkk(){
				var url ="<%=request.getContextPath()%>";
				var cdtrissuer= document.getElementById("cdtrissuer");
				var cdtrissuernm=document.getElementById("cdtrissuernm");
				selectBank(url,cdtrissuer,cdtrissuernm,"");
			}
		
	
	
			  function zcx(val){
				if(val.value=='Y'){
					$("#servicecharge").val("");//������
					$("#postage").val("");//�ʵ��
					$("#outstationcharge").val("");//��ؼ���
					//$("#agncycharge").val("");//������������
					$("#servicecharge").attr("readonly",true);
					$("#postage").attr("readonly",true);
					$("#outstationcharge").attr("readonly",true);
					//$("#agncycharge").attr("readonly",true);
					jisuan();
				}else{
				 $("#servicecharge").attr("readonly",false);
					$("#postage").attr("readonly",false);
					$("#outstationcharge").attr("readonly",false);
					//$("#agncycharge").attr("readonly",false);
				 
				}
			}
			
				function arrayIsNull(arrObj){
					var flag=false;
					for(var i=0;i<arrObj.length;i++){
						if(isNull(trim(arrObj[i].value))){
							flag=true;
						}
					}
					return flag;
				}
			
				function commitForm(){
				
			   var msg = "@";
				
		              
		             var rcptltd = document.getElementById("rcptltd");
		             var dbtracct= document.getElementById("dbtracct");
		             var dbtrnm= document.getElementById("dbtrnm");
		             
		             var dbtrbrnchid= document.getElementById("dbtrbrnchid");
		              
		             
                    var cdtracct= document.getElementById("cdtracct");
                    var cdtrissuer= document.getElementById("cdtrissuer");
                    
				 
                   
                    var amount  = document.getElementById("amount");
					 
					  if(isNull(trim(amount.value))){
					msg += amount.title+"����Ϊ�գ�@";
				    }
					 if(isNull(trim(cdtrissuer.value))){
					msg += cdtrissuer.title+"����Ϊ�գ�@";
				    }
					 
					if(isNull(trim(cdtracct.value))){
					msg += cdtracct.title+"����Ϊ�գ�@";
				    }
					 
					 
					 if(isNull(trim(dbtrbrnchid.value))){
					msg += dbtrbrnchid.title+"����Ϊ�գ�@";
				    } 
					 
					 if(isNull(trim(dbtrnm.value))){
					msg += dbtrnm.title+"����Ϊ�գ�@";
				    }  
					 
					 if(isNull(trim(dbtracct.value))){
					msg += dbtracct.title+"����Ϊ�գ�@";
				    } 
					 if(isNull(trim(rcptltd.value))){
					msg += rcptltd.title+"����Ϊ�գ�@";
				    }
				    
				    var gk_dtlsmmryamt=document.getElementById("gk_dtlsmmryamt"); //��ϸ���ܽ��
				    var gk_rprtcd=document.getElementById("gk_rprtcd"); //�ϱ��������
				    var gk_flowno=document.getElementById("gk_flowno"); //��Ϣ��ˮ��
				    var gk_RcvCd=document.getElementById("gk_RcvCd"); //���չ������
				    var gk_rprtforms=document.getElementById("gk_rprtforms"); //��������
				    var gk_rprtnum=document.getElementById("gk_rprtnum"); //�������
				    var gk_budgetlevel=document.getElementById("gk_budgetlevel"); //Ԥ�㼶��
				    var gk_indicator=document.getElementById("gk_indicator"); //�����ڱ�־
				    var gk_budgettp=document.getElementById("gk_budgettp"); //Ԥ������
				    var gk_numoftrnsctns=document.getElementById("gk_numoftrnsctns"); //��ϸ����
				    var gk_typecds=document.getElementsByName("po.gk_typecd"); 
				    var gk_sbjctcds=document.getElementsByName("po.gk_sbjctcd"); 
				    var gk_occrrdamts=document.getElementsByName("po.gk_occrrdamt"); 
				    var pmttp=document.getElementById("pmttp").value;
				   
				    if(pmttp=="B104"){
					    if(isNull(trim(gk_rprtcd.value))){
						msg += "�ϱ�������벻��Ϊ�գ�@";
					    }
					     if(isNull(trim(gk_flowno.value))){
						msg += "��Ϣ��ˮ�Ų���Ϊ�գ�@";
					    }
					    if(isNull(trim(gk_RcvCd.value))){
						msg += "���չ�����벻��Ϊ�գ�@";
					    }
					    if(isNull(trim(gk_rprtforms.value))){
						msg += "�������ڲ���Ϊ�գ�@";
					    }
					    if(isNull(trim(gk_rprtnum.value))){
						msg += "������Ų���Ϊ�գ�@";
					    }
					    if(isNull(trim(gk_budgetlevel.value))){
						msg += "Ԥ�㼶�β���Ϊ�գ�@";
					    }
					    if(isNull(trim(gk_indicator.value))){
						msg += "�����ڱ�־����Ϊ�գ�@";
					    }
					    if(isNull(trim(gk_budgettp.value))){
						msg += "Ԥ�����಻��Ϊ�գ�@";
					    }
					    if(isNull(trim(gk_numoftrnsctns.value))){
						msg += "��ϸ��������Ϊ�գ�@";
					    }
					    if(arrayIsNull(gk_typecds)){
					    	msg += "���ջ��ش�����벻��Ϊ�գ�@";
					    }
					    if(arrayIsNull(gk_sbjctcds)){
					    	msg += "Ԥ���Ŀ���벻��Ϊ�գ�@";
					    }
					    if(arrayIsNull(gk_occrrdamts)){
					    	msg += "�������Ϊ�գ�@";
					    }
				    }
				    
				    var gz_dtlsmmryamt=document.getElementById("gz_dtlsmmryamt"); //��ϸ���ܽ��
				    var gz_rprtcd=document.getElementById("gz_rprtcd"); //�ϱ��������
				    var gz_flowno=document.getElementById("gz_flowno"); //��Ϣ��ˮ��
				    var gz_rcvcd=document.getElementById("gz_rcvcd"); //���չ������
				    var gz_rprtforms=document.getElementById("gz_rprtforms"); //��������
				    var gz_rprtnum=document.getElementById("gz_rprtnum"); //�������
				    var gz_numoftrnsctns=document.getElementById("gz_numoftrnsctns"); //��ϸ����
				    
				    var gz_typecds=document.getElementsByName("po.gz_typecd"); 
				    var gz_cptlcds=document.getElementsByName("po.gz_cptlcd"); 
				    var gz_cptlamts=document.getElementsByName("po.gz_cptlamt"); 
				    var gz_accrlcds=document.getElementsByName("po.gz_accrlcd"); 
				    var gz_accrlamts=document.getElementsByName("po.gz_accrlamt"); 
				    
				    if(pmttp=="B307"){
				    	if(isNull(trim(gz_dtlsmmryamt.value))){
						msg += "��ϸ���ܽ���Ϊ�գ�@";
					    }
					    if(isNull(trim(gz_rprtcd.value))){
						msg += "�ϱ�������벻��Ϊ�գ�@";
					    }
					    if(isNull(trim(gz_flowno.value))){
						msg += "��Ϣ��ˮ�Ų���Ϊ�գ�@";
					    }
					    if(isNull(trim(gz_rcvcd.value))){
						msg += "���չ�����벻��Ϊ�գ�@";
					    }
					    if(isNull(trim(gz_rprtforms.value))){
						msg += "�������ڲ���Ϊ�գ�@";
					    }
					    if(isNull(trim(gz_rprtnum.value))){
						msg += "������Ų���Ϊ�գ�@";
					    }
					    if(isNull(trim(gz_numoftrnsctns.value))){
						msg += "��ϸ��������Ϊ�գ�@";
					    }
					     if(arrayIsNull(gz_typecds)){
					    	msg += "�Ҹ���ծ���д��಻��Ϊ�գ�@";
					    }
					     if(arrayIsNull(gz_cptlcds)){
					    	msg += "������벻��Ϊ�գ�@";
					    }
					     if(arrayIsNull(gz_cptlamts)){
					    	msg += "�������Ϊ�գ�@";
					    }
					     if(arrayIsNull(gz_accrlcds)){
					    	msg += "��Ϣ���벻��Ϊ�գ�@";
					    }
					     if(arrayIsNull(gz_accrlamts)){
					    	msg += "��Ϣ����Ϊ�գ�@";
					    }
					    
				    }
				    
				    

				
				
				var boo = msgSplit(msg);
				if(boo){
					 OnSave();
			    	 document.getElementById("servicecharge").value=rmoney(document.getElementById("servicecharge").value);
				    document.getElementById("postage").value=rmoney(document.getElementById("postage").value);//�����
				     document.getElementById("counterfoil").value=rmoney(document.getElementById("counterfoil").value) ;
				     document.getElementById("gk_dtlsmmryamt").value=rmoney(document.getElementById("gk_dtlsmmryamt").value);//��ϸ�ܽ��
				     document.getElementById("gz_dtlsmmryamt").value=rmoney(document.getElementById("gz_dtlsmmryamt").value);//��ϸ�ܽ��
				     var gk_occrrdamts=document.getElementsByName("po.gk_occrrdamt");
				     for(var i=0;i<gk_occrrdamts.length;i++){
				     	gk_occrrdamts[i].value=rmoney(gk_occrrdamts[i].value);
				     }
				     var gz_cptlamts=document.getElementsByName("po.gz_cptlamt");
				     for(var i=0;i<gz_cptlamts.length;i++){
				     	gz_cptlamts[i].value=rmoney(gz_cptlamts[i].value);
				     }
				     var gz_accrlamts=document.getElementsByName("po.gz_accrlamt");
				     for(var i=0;i<gz_accrlamts.length;i++){
				     	gz_accrlamts[i].value=rmoney(gz_accrlamts[i].value);
				     }
				    
				  
				   // document.getElementById("agncycharge").value=rmoney(agncycharge.value);
				    document.getElementById("outstationcharge").value=rmoney(document.getElementById("outstationcharge").value);
				     document.getElementById("amount").value=rmoney(document.getElementById("amount").value);
				    if(document.getElementById("waiven").checked!=""){
					open3("<%=request.getContextPath()%>");
				}
				else{
					document.forms[0].submit();
				}
					//document.forms[0].submit();
					 
				}
		 }
		 
		 
			
		 function jisuan(){
				var sxf = document.getElementById("servicecharge").value; 
				var ydf = document.getElementById("postage").value;
				var ydjs =document.getElementById("outstationcharge").value;
				var gbf = document.getElementById("outstationcharge").value;  
				var hkje = document.getElementById("amount").value;  
				var n=0;
				var aa=document.getElementById('pmttp').value;
				
				if(aa=='B104'){
					var amts = document.getElementsByName("po.gk_occrrdamt");
					
					for(var i=0;i<amts.length;i++){
					   n+=parseFloat(rmoney(amts[i].value));
					}
					
						document.getElementById("amount").value=fmoney(n,2);
						document.getElementById("gk_dtlsmmryamt").value=fmoney(n,2);
						document.getElementById("totalamt").value = fmoney(rmoney(sxf)+rmoney(ydf)+rmoney(ydjs)+rmoney(gbf)+n, 2);
				}else if(aa=='B307'){
					var amts = document.getElementsByName("po.gz_cptlamt");
					for(var i=0;i<amts.length;i++){
					   n+=parseFloat(rmoney(amts[i].value));
					}
					var amts1 = document.getElementsByName("po.gz_accrlamt");
					for(var i=0;i<amts1.length;i++){
					   n+=parseFloat(rmoney(amts1[i].value));
					}
					
						document.getElementById("amount").value=fmoney(n,2);
						document.getElementById("gz_dtlsmmryamt").value=fmoney(n,2);
						document.getElementById("totalamt").value = fmoney(rmoney(sxf)+rmoney(ydf)+rmoney(ydjs)+rmoney(gbf)+n, 2);
				}else{
						document.getElementById("totalamt").value = fmoney(rmoney(sxf)+rmoney(ydf)+rmoney(ydjs)+rmoney(gbf)+rmoney(hkje)+n, 2);
				}
		}
			
		 
		 function addchange(paymentGroupNum){
		  		jisuan();
				var url ="<%=request.getContextPath()%>";
				var beginamt = "<%=request.getSession().getAttribute("beginamt").toString()%>";
 				var endamt = "<%=request.getSession().getAttribute("endamt").toString()%>";
				 var obj ={
				 	hkje:document.getElementById('amount'),
				 	transno:'7127',
				 	pmttp:document.getElementById('pmttp'),
				    sxf : document.getElementById('servicecharge'),
				    ydf : document.getElementById('postage'),
				    ydjs : document.getElementById('outstationcharge'),
				    gbf: document.getElementById('counterfoil'),
				    ze : document.getElementById('totalamt'),
				    yxj:document.getElementById('yxj'),
				    xth: document.getElementById('xth'),
				    xth1: document.getElementById('xth1'),
				  	bepssxf: document.getElementById("bepssxf"),
				  	bepsydf: document.getElementById("bepsydf"),
				  	bepsydjs: document.getElementById("bepsydjs"),
				  	hvpssxf: document.getElementById("hvpssxf"),
				  	hvpsydf: document.getElementById("hvpsydf"),
				  	hvpsydjs: document.getElementById("hvpsydjs"),
				  	waiven: document.getElementById("waiven")
				  };
				  if(obj.hkje.value==""||obj.hkje.value=="0.00"){
				  	clrAmt();
				  }
				  else{
					calcharge(url,beginamt,endamt,obj);				  
				  }
				 //calcharge(url,beginamt,endamt,obj);
			}
			function funpmttp(flag){
				if(flag=='B104'){//�����ʽ��ǻ���
					document.getElementById("amount").readOnly="readonly";
					document.getElementById("gkzjjjhbdetails").style.display="block";
					document.getElementById("gkzjgzdfjjhbdetails").style.display="none";
				}else if(flag=='B307'){//�����ʽ��ծ�Ҹ���ǻ���
					document.getElementById("gkzjjjhbdetails").style.display="none";
					document.getElementById("gkzjgzdfjjhbdetails").style.display="block";
					document.getElementById("amount").readOnly="readonly";
				}else{
					document.getElementById("amount").readOnly="";
					document.getElementById("gkzjjjhbdetails").style.display="none";
					document.getElementById("gkzjgzdfjjhbdetails").style.display="none";
				}
				clrContent();
			}
			function clrAmt0(){
				document.getElementById('servicecharge').value="0.00";
				document.getElementById('postage').value="0.00";
				document.getElementById('outstationcharge').value="0.00";
				document.getElementById('counterfoil').value="0.00";
				document.getElementById('totalamt').value=document.getElementById('amount').value;
			}
			function clrAmt(){
				document.getElementById('amount').value="";
				document.getElementById('servicecharge').value="0.00";
				document.getElementById('postage').value="0.00";
				document.getElementById('outstationcharge').value="0.00";
				document.getElementById('counterfoil').value="0.00";
				document.getElementById('totalamt').value="";
				document.getElementById("xth").value="";
				document.getElementById("xth1").value="";
				
			}
			function clrContent(){
				var flag = document.getElementById('pmttp').value;
				clrAmt();
				if(flag=='B307'){
					
					document.getElementById("gk_dtlsmmryamt").value=""; //��ϸ���ܽ��
				   document.getElementById("gk_rprtcd").value=""; //�ϱ��������
				   document.getElementById("gk_flowno").value=""; //��Ϣ��ˮ��
				   document.getElementById("gk_RcvCd").value=""; //���չ������
				   document.getElementById("gk_rprtforms").value=""; //��������
				   document.getElementById("gk_rprtnum").value=""; //�������
				  document.getElementById("gk_budgetlevel").value=""; //Ԥ�㼶��
				  document.getElementById("gk_indicator").value=""; //�����ڱ�־
				   document.getElementById("gk_budgettp").value=""; //Ԥ������
				  	var typecd = document.getElementsByName("po.gk_typecd");
					for(var i=0;i<typecd.length;i++){
						typecd[i].value="";
					}
					
					var sbjctcd = document.getElementsByName("po.gk_sbjctcd");
					for(var i=0;i<sbjctcd.length;i++){
						sbjctcd[i].value="";
					}
					var occrrdamt = document.getElementsByName("po.gk_occrrdamt");
					for(var i=0;i<occrrdamt.length;i++){
						occrrdamt[i].value="";
					}
				   
				}else if(flag=='B104'){
				  document.getElementById("gz_dtlsmmryamt").value="0.00"; //��ϸ���ܽ��
				  document.getElementById("gz_rprtcd").value=""; //�ϱ��������
				  document.getElementById("gz_flowno").value=""; //��Ϣ��ˮ��
				  document.getElementById("gz_rcvcd").value=""; //���չ������
				  document.getElementById("gz_rprtforms").value=""; //��������
				  document.getElementById("gz_rprtnum").value=""; //�������
				  var cptlcd = document.getElementsByName("po.gz_cptlcd");
					for(var i=0;i<cptlcd.length;i++){
						cptlcd[i].value="";
					}
					
					var cptlamt = document.getElementsByName("po.gz_cptlamt");
					for(var i=0;i<cptlamt.length;i++){
						cptlamt[i].value="";
					}
					var accrlcd = document.getElementsByName("po.gz_accrlcd");
					for(var i=0;i<accrlcd.length;i++){
						accrlcd[i].value="";
					}
					var accrlamt = document.getElementsByName("po.gz_accrlamt");
					for(var i=0;i<accrlamt.length;i++){
						accrlamt[i].value="";
					}
				}else{
					document.getElementById("gk_dtlsmmryamt").value=""; //��ϸ���ܽ��
					   document.getElementById("gk_rprtcd").value=""; //�ϱ��������
					   document.getElementById("gk_flowno").value=""; //��Ϣ��ˮ��
					   document.getElementById("gk_RcvCd").value=""; //���չ������
					   document.getElementById("gk_rprtforms").value=""; //��������
					   document.getElementById("gk_rprtnum").value=""; //�������
					  document.getElementById("gk_budgetlevel").value=""; //Ԥ�㼶��
					  document.getElementById("gk_indicator").value=""; //�����ڱ�־
					   document.getElementById("gk_budgettp").value=""; //Ԥ������
					   document.getElementById("gz_dtlsmmryamt").value="0.00"; //��ϸ���ܽ��
					  document.getElementById("gz_rprtcd").value=""; //�ϱ��������
					  document.getElementById("gz_flowno").value=""; //��Ϣ��ˮ��
					  document.getElementById("gz_rcvcd").value=""; //���չ������
					  document.getElementById("gz_rprtforms").value=""; //��������
					  document.getElementById("gz_rprtnum").value=""; //�������
					  var typecd = document.getElementsByName("po.gk_typecd");
					for(var i=0;i<typecd.length;i++){
						typecd[i].value="";
					}
					
					var sbjctcd = document.getElementsByName("po.gk_sbjctcd");
					for(var i=0;i<sbjctcd.length;i++){
						sbjctcd[i].value="";
					}
					var occrrdamt = document.getElementsByName("po.gk_occrrdamt");
					for(var i=0;i<occrrdamt.length;i++){
						occrrdamt[i].value="";
					}
					 var cptlcd = document.getElementsByName("po.gz_cptlcd");
					for(var i=0;i<cptlcd.length;i++){
						cptlcd[i].value="";
					}
					
					var cptlamt = document.getElementsByName("po.gz_cptlamt");
					for(var i=0;i<cptlamt.length;i++){
						cptlamt[i].value="";
					}
					var accrlcd = document.getElementsByName("po.gz_accrlcd");
					for(var i=0;i<accrlcd.length;i++){
						accrlcd[i].value="";
					}
					var accrlamt = document.getElementsByName("po.gz_accrlamt");
					for(var i=0;i<accrlamt.length;i++){
						accrlamt[i].value="";
					}
				}
				
			}
			
			function selectLoad(){
				var temp = document.getElementById('pmttp').value;
				transferOfClient(temp,'pmtkd');
			

			}	
			
</script>

	</head>
	<body onload="selectLoad()">
		<html:form method="post" 
			action="/generalDebitAction.do?method=sendMsg">
			<input id="business_name" type="hidden" value="generalDebit">
			<input id="repeatmark" type="hidden" value="0">
			<input type="hidden" name="token" value="${token }" />
			<input  id="hvpsydf" name="hvpsydf" type="hidden"  maxlength="19"  />
			<input  id="hvpsydjs" name="hvpsydjs" type="hidden" maxlength="19" />
			<input  id="bepssxf" name="bepssxf" type="hidden"  maxlength="19" />
			<input  id="bepsydf" name="bepsydf" type="hidden"  maxlength="19"  />
			<input  id="bepsydjs" name="bepsydjs" type="hidden" maxlength="19" />
			<input  id="bepsgbf" name="bepsgbf" type="hidden" maxlength="19" />
			<input  id="hvpsgbf" name="hvpsgbf" type="hidden" maxlength="19" />
			<input id="contrperson" name="po.warrantyId" type="hidden" ><!-- ��Ȩ��Ա(������) -->
			
			<table id="querybook" width="100%" height="100%" border="0"
				cellpadding="0" cellspacing="0">
				<tr valign="top">
					<td></td>
					<td>
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td width="10">
									&nbsp;
								</td>
								<td>
									<div align="center">
										<br />
										<table width="689" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td>
													<c:choose>
														<c:when test="${syspara == '0'}">
															<div class="text_title">
																<span class="text_blue2">��ͨ���-����</span>
															</div>
														</c:when>
														<c:when test="${syspara == '1'}">
															<div class="text_title">
																<span class="text_blue2">��ͨ���-ת��</span>
															</div>
														</c:when>
													</c:choose>
												</td>
											</tr>
											<tr>
												<td>
													<div class="table_body">

														<div class="table_content">
															<table>
																<tr>
																	<td colspan="4">
																		<span class="text_tablehead">������Ϣ</span>
																		<c:choose>
																			<c:when test="${syspara == '0'}">
																				<input type="hidden" name="po.signmd" value="04" />
																			</c:when>
																			<c:when test="${syspara == '1'}">
																				<input type="hidden" name="po.signmd" value="03" />
																			</c:when>
																		</c:choose>
																		<input type="hidden" name="po.systemcd" value="BEPS" />
																	</td>
																</tr>
																<tr>

																	<td class="text_tablehead_b">
																		֧���������
																	</td>
																	<td colspan="4">
																		<input type="text" name="po.pmtgrpid" id="pmtgrpid"
																			readonly="readonly" maxlength="20" value="${transId}" />
																		<font color="#FF0000">*</font>
																	</td>
																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		ҵ�����ͱ���
																	</td>
																	<td>
																		<select name="po.pmttp" id="pmttp"
																			onchange="funpmttp(this.value);selectLoad();" title="ҵ�����ͱ���">

																			<option value="B100">
																				��ͨ���ҵ��
																			</option>
																			<option value="B104">
																				�����ʽ��ǻ���
																			</option>
																			<option value="B307">
																				�����ʽ��ծ�Ҹ���ǻ���
																			</option>
																		</select>
																		<span class="STYLE1">*</span>
																	</td>
																	<td class="text_tablehead_b">
																		ҵ���������
																	</td>
																	<td>
																		<select name="po.pmtkd" id="pmtkd" title="ҵ���������">

																		</select>
																		<span class="STYLE1">*</span>
																	</td>
																</tr>

																<tr>
																	<td class="text_tablehead_b">
																		��ͬЭ���
																	</td>
																	<td>
																		<input type="text" name="po.agrmtnb" id="agrmtnb"
																			maxlength="60" title="��ͬЭ���" />

																	</td>
																	<td class="text_tablehead_b">
																		��ִ����
																	</td>
																	<td>
																		<input type="text" name="po.rcptltd" id="rcptltd"
																			title="��ִ����" style="width: 100px" maxlength="2"
																			onkeyup="fun_number(this)" onblur="fun_number(this)" />
																		��
																		<font color="#FF0000">*</font>
																	</td>
																</tr>
															</table>
														</div>


														<div class="table_content">
															<table>
																<tr>
																	<td>
																		<span class="text_tablehead">��������Ϣ</span>
																	</td>
																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		�������˺�
																	</td>
																	<td>
																		<input type="text" name="po.dbtracct" id="dbtracct"
																			maxlength="32" title="�������˺�"
																			onblur="queryBypaymentGroupNum(this.value)" />
																		<font color="#FF0000">*</font>
																	</td>
																	<td class="text_tablehead_b">
																		����������
																	</td>
																	<td>
																		<input type="text" name="po.dbtrnm" id="dbtrnm"
																			maxlength="60" title="����������" />
																		<font color="#FF0000">*</font>
																	</td>
																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		�����˵�ַ
																	</td>
																	<td colspan="3">

																		<input name="po.dbtraddr" id="dbtraddr"
																			class="text_tablehead_b_addr"
																			onKeyPress="actkeyPress()"
																			onkeyup="limitLength(value,70,'��ʾ��','dbtraddr')" />
																	</td>
																</tr>
<tr>
																	<td class="text_tablehead_b">
																		�������к�
																	</td>
																	<td>
																		<input type="text" name="po.dbtrbrnchid" readonly="readonly"
																			id="dbtrbrnchid" maxlength="14" title="�������к�"
																			style="width: 100px;" />
																		<input type="button" class="button" value="����"
																			onclick="selectBankInfo()">
																		<font color="#FF0000">*</font>
																	</td>
																	<td class="text_tablehead_b">
																		����������
																	</td>
																	<td>
																		<input type="text" name="po.dbtrbrnchnm" readonly="readonly"
																			id="dbtrbrnchnm" title="����������" maxlength="60"
																			value="" />
																		<font color="#FF0000">*</font>
																	</td>
																</tr>
																
																<tr>
																	<td class="text_tablehead_b">
																		<!--  �����˿������к�-->
																	</td>
																	<td>
																		<input type="hidden" name="po.dbtrissuer"
																			id="dbtrissuer" maxlength="14" title="�����˿������к�"
																			style="width: 100px;" />
																	</td>
																	<td class="text_tablehead_b">
																		<!-- 	�����˿���������-->
																	</td>
																	<td>
																		<input type="hidden" name="po.dbtrissuernm"
																			id="dbtrissuernm" title="�����˿���������" maxlength="60" />
																	</td>
																</tr>

																<tr>
																	<td class="text_tablehead_b">
																		<!--�����������к�-->
																	</td>
																	<td>
																		<input type="hidden" name="po.dbtrmmbid"
																			id="dbtrmmbid" title="�����������к�" maxlength="14"
																			readonly="readonly" />
																		<!--  <font color="#FF0000">*</font>-->
																	</td>
																</tr>
															</table>
														</div>
														<div class="table_content">
															<table>
																<tr>
																	<td>
																		<span class="text_tablehead">�տ�����Ϣ</span>
																	</td>
																</tr>
																<tr>

																	<td class="text_tablehead_b">
																		�տ����˺�
																	</td>
																	<td>
																		<input type="text" name="po.cdtracct" id="cdtracct"
																			title="�տ����˺�" maxlength="32"
																			onblur="PubQueryAccount(this.value)" />
																		<font color="#FF0000">*</font>
																	</td>
																	<td class="text_tablehead_b">
																		�տ�������
																	</td>
																	<td>
																		<input type="text" name="po.cdtrnm" id="cdtrnm"
																			title="�տ�������" maxlength="60" readonly="readonly" />
																		<font color="#FF0000">*</font>
																	</td>
																</tr>


																<tr>
																	<td class="text_tablehead_b">
																		֤������
																	</td>
																	<td>
																	<input name="po.proposercerttp" id="proposercerttp1" type="hidden"  readonly="readonly"/>
																		<select name="po.proposercerttp" id="proposercerttp"
																			title="֤������" disabled="disabled">
																			<option value="01">
																				���֤
																			</option>
																			<option value="02">
																				����֤
																			</option>
																			<option value="03">
																				ѧ��֤
																			</option>
																			<c:if test="${syspara == '0'}">
																			<option value="04">
																				Ӫҵִ��
																			</option>
																			<option value="05">
																				��֯��������
																			</option>
																			</c:if>
																		</select>
																	</td>
																	<td class="text_tablehead_b">
																		�տ���֤����
																	</td>
																	<td>
																		<input type="text" name="po.proposercertid"
																			id="proposercertid" readonly="readonly"
																			onblur="checkIdCardNo(this.value,'proposercertid')"
																			title="�տ���֤����" maxlength="32" />

																	</td>
																</tr>

																<tr>
																	<td class="text_tablehead_b">
																		�տ��˿ͻ���
																	</td>
																	<td>
																		<input type="text" name="po.proposercstmrid"
																			readonly="readonly" title="�տ��˿ͻ���"
																			id="proposercstmrid" maxlength="30" />

																	</td>
																	<td class="text_tablehead_b">
																		�տ����˻�����
																	</td>
																	<td>
																		<select name="po.proposeraccttp" id="proposeraccttp"
																			title="�տ����˻�����" disabled="disabled">
																			<option value="">
																				��ѡ��
																			</option>
																			<option value="AT00">
																				�Թ��˻�
																			</option>
																			<option value="AT01">
																				���˴��ǿ��˻�
																			</option>
																			<option value="AT02">
																				���˽�ǿ�
																			</option>
																			<option value="AT03">
																				����
																			</option>
																			<option value="AT04">
																				����
																			</option>
																		</select>
																	</td>
																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		<!-- �տ����˻����� -->
																	</td>
																	<td>
																		<input type="hidden" name="po.proposeracctccy"
																			id="proposeracctccy" title="�տ����˻�����" maxlength="3"
																			value="CNY" readonly />
																	</td>
																	<td>
																	</td>
																	<td>
																	</td>
																</tr>
																<tr>

																	<td class="text_tablehead_b">
																		<!--  �տ����к� -->
																	</td>
																	<td>
																		<input type="hidden" name="po.cdtrbrnchid"
																			id="cdtrbrnchid" title="�տ����к�" maxlength="14"
																			readonly="readonly" value="${bankInfo.bankcode }" />

																	</td>
																	<td class="text_tablehead_b">
																		<!--	�տ�������  -->
																	</td>
																	<td>
																		<input type="hidden" name="po.cdtrbrnchnm"
																			id="cdtrbrnchnm" title="�տ�������" readonly="readonly"
																			maxlength="60" value="${bankInfo.participantname }" />

																	</td>
																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		�տ�����ϵ�绰
																	</td>
																	<td>
																		<input type="text" name="po.proposertel"
																			readonly="readonly" title="�տ�����ϵ�绰" id="proposertel"
																			maxlength="20" />
																	</td>
																	
																</tr>


																<tr>

																	<td class="text_tablehead_b">
																		�տ��˵�ַ
																	</td>
																	<td colspan="3">


																		<input name="po.cdtraddr" id="cdtraddr"
																			class="text_tablehead_b_addr" readonly="readonly"
																			onKeyPress="actkeyPress()"
																			onkeyup="limitLength(value,70,'��ʾ��','cdtraddr')" />

																	</td>
																</tr>
																<tr>

																	<td class="text_tablehead_b">
																		<%-- �տ��˿������к�  --%>
																	</td>
																	<td>
																		<input type="hidden" name="po.cdtrissuer"
																			id="cdtrissuer" maxlength="14" title="�տ��˿������к�"
																			readonly="readonly" style="width: 100px;"
																			value="${bankInfo.bankcode }" />
																		<%--
								                   		<input type="button" class="button"  value="����" onclick="selectBankInfoOfSkk()"><font color="#FF0000">*</font>
								                   		--%>
																	</td>
																	<td class="text_tablehead_b">
																		<%-- �տ��˿���������--%>
																	</td>
																	<td>
																		<input type="hidden" name="po.cdtrissuernm"
																			id="cdtrissuernm"
																			value="${bankInfo.participantname }" title="�տ��˿���������"
																			maxlength="60" readonly="readonly" />
																	</td>
																</tr>

																<tr>

																	<td class="text_tablehead_b">
																		<!-- 	�տ��������к� -->
																	</td>
																	<td>
																		<input type="hidden" name="po.cdtrmmbid"
																			id="cdtrmmbid" title="�տ��������к�"
																			value="${bankInfo.directbankcode }" maxlength="14"
																			readonly="readonly" />

																	</td>
																</tr>
																<tr></tr>
															</table>
														</div>

														<div class="table_content">
															<table>
																<tr>
																	<td>
																		<span class="text_tablehead">�����Ϣ</span>
																	</td>
																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		���ҷ���
																	</td>
																	<td>
																		<input type="text" name="po.currencycd"
																			id="currencycd" value="CNY" readonly="readonly"
																			maxlength="3" />
																		<font color="#FF0000">*</font>
																	</td>
																	<td class="text_tablehead_b">
																		�ܶ�
																	</td>
																	<td>
																		<input type="text" name="po.totalamt" id="totalamt"
																			maxlength="19" readonly="readonly"
																			onKeyPress="amountPress()"
																			onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																			onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																		<font color="#FF0000">*</font>
																	</td>
																</tr>
																<tr>

																	<td class="text_tablehead_b">
																		���׽��
																	</td>
																	<td colspan="4">
																		<input type="text" name="po.amount" id="amount"
																			title="���׽��" maxlength="9" onKeyPress="amountPress()"
																			onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																			onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';addchange(); " />
																		<font color="#FF0000">*</font>
																	</td>
																</tr>
															</table>
														</div>

														<div class="table_content">
															<table>
																<tr>
																	<td colspan="4">
																		<span class="text_tablehead">�Ʒ�/������Ϣ</span>
																	</td>
																</tr>
																<tr>												  	 
					<td class="text_tablehead_b" >
						��ȡ����
					</td>
					<td >					
						<input type="radio" class="text_tablehead_b_rad" name="po.waive" id="waivey" value="Y" checked="checked" onclick="addchange('this.value');">��ȡ
						<input type="radio" class="text_tablehead_b_rad" name="po.waive" id="waiven" value="N"  onclick="clrAmt0()">����ȡ
					</td>
				</tr>
																<tr>
																	<td class="text_tablehead_b">
																		������
																	</td>
																	<td>
																		<input type="text" name="po.servicecharge"
																			id="servicecharge" maxlength="19" readonly="readonly" />






																	</td>
																	<td class="text_tablehead_b">
																		������Ϣ
																	</td>
																	<td>
																		<input name="systemcd" id="xth" type="hidden"
																			title="ϵͳ��" maxlength="12" value="" />
																		<select id="xth1" name="systemcd1" title="ϵͳ��"
																			disabled="disabled">
																			<option value="">
																			</option>
																			<option value="HVPS">
																				���
																			</option>
																			<option value="BEPS">
																				С��
																			</option>
																		</select>
																	</td>
																</tr>
																<tr>

																	<td class="text_tablehead_b">
																		�ʵ��
																	</td>
																	<td>
																		<input type="text" name="po.postage" id="postage"
																			maxlength="19" readonly="readonly" />
																	</td>
																	<td class="text_tablehead_b">
																		��ؼ���
																	</td>
																	<td>
																		<input type="text" name="po.outstationcharge"
																			id="outstationcharge" maxlength="19"
																			readonly="readonly" />


																	</td>
																	<%--
																	<td class="text_tablehead_b" colspan="2">
																		<!--   ������������-->
																	</td>
																	<td>
																		<input type="text" name="po.agncycharge"
																			id="agncycharge" maxlength="19"
																			onKeyPress="amountPress()"
																			onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																			onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; jisuan();" />

																	</td>
 																		--%>
																</tr>
																<tr>
																<td class="text_tablehead_b" >
																	������
																</td>
																<td>
																	<input name="counterfoil" id="counterfoil" type="text" readonly="readonly"
																		title="������" maxlength="19"  />
																</td>
															</tr>
																
															</table>
														</div>

														<div class="table_content">
															<table>
																<tr>
																	<td>
																		<span class="text_tablehead">������Ϣ</span>
																	</td>
																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		����
																	</td>
																	<td colspan="4">
																		<textarea name="po.addtlinf" id="addtlinf" cols="60"
																			rows="3" onKeyPress="charPress()"
																			onkeyup="limitLength(value,256,'��ʾ��','addtlinf')"></textarea>
																	</td>
																</tr>
															</table>
														</div>

														<div class="table_content">
															
															<table>
																<tr>
																	<td>
																		<span class="text_tablehead">������Ϣ</span>
																	</td>
																</tr>
																<tr>
																	<td colspan="5">
																		<div id="gkzjjjhbdetails" style="display: none;">
																		<table id="gkzjjjhb_mx" border="0" cellpadding="0" cellspacing="0">
																			<tr>
																				<td class="text_tablehead_b">
																					��ϸ���ܽ��
																				</td>
																				<td>
																					<input type="text" name="po.gk_dtlsmmryamt"
																						id="gk_dtlsmmryamt" readonly="readonly" />
																					<font color="#FF0000">*</font>
																				</td>
																				<td class="text_tablehead_b">
																					�ϱ��������
																				</td>
																				<td>
																					<input type="text" name="po.gk_rprtcd"
																						id="gk_rprtcd" maxlength="10"
																						 />
																					<font color="#FF0000">*</font>
																				</td>

																			</tr>
																			<tr>

																				<td class="text_tablehead_b">
																					��Ϣ��ˮ��
																				</td>
																				<td>
																					<input type="text" name="po.gk_flowno"
																						id="gk_flowno" maxlength="10" />
																					<font color="#FF0000">*</font>
																				</td>
																			</tr>
																			<tr>
																				<td class="text_tablehead_b">
																					���չ������
																				</td>
																				<td>
																					<input type="text" name="po.gk_rcvcd" id="gk_RcvCd"
																						maxlength="10" />
																					<font color="#FF0000">*</font>
																				</td>
																				<td class="text_tablehead_b">
																					��������
																				</td>
																				<td>
																					<input type="text" name="po.gk_rprtforms"
																						id="gk_rprtforms" readonly="readonly"
																						class="Wdate" onclick="WdatePicker()" />
																					<font color="#FF0000">*</font>
																				</td>
																			</tr>
																			<tr>
																				<td class="text_tablehead_b">
																					�������
																				</td>
																				<td>
																					<input type="text" name="po.gk_rprtnum"
																						id="gk_rprtnum" maxlength="10"
																						onkeyup="fun_number(this)"
																						onblur="fun_number(this)" />
																					<font color="#FF0000">*</font>
																				</td>
																				<td class="text_tablehead_b">
																					Ԥ�㼶��
																				</td>
																				<td>
																					<select name="po.gk_budgetlevel"
																						id="gk_budgetlevel">
																						<option value="">
																							��ѡ��
																						</option>
																						<option value="BL00">
																							���뼶Ԥ��
																						</option>
																						<option value="BL01">
																							ʡ��Ԥ��
																						</option>
																					</select>
																					<font color="#FF0000">*</font>
																				</td>
																			</tr>
																			<tr>
																				<td class="text_tablehead_b">
																					�����ڱ�־
																				</td>
																				<td>
																					<select name="po.gk_indicator" id="gk_indicator">
																						<option value="">
																							��ѡ��
																						</option>
																						<option value="ID00">
																							����
																						</option>
																						<option value="ID01">
																							������
																						</option>
																					</select>
																					<font color="#FF0000">*</font>
																				</td>
																				<td class="text_tablehead_b">
																					Ԥ������
																				</td>
																				<td>
																					<select name="po.gk_budgettp" id="gk_budgettp">
																						<option value="">
																							��ѡ��
																						</option>
																						<option value="BT00">
																							Ԥ����
																						</option>
																						<option value="BT01">
																							Ԥ����
																						</option>
																					</select>
																					<font color="#FF0000">*</font>
																				</td>
																			</tr>
																			<tr>
																				<td class="text_tablehead_b">
																					��ϸ����
																				</td>
																				<td>
																					<input type="text" name="po.gk_numoftrnsctns"
																						id="gk_numoftrnsctns" value="1"
																						readonly="readonly" />
																					<font color="#FF0000">*</font>
																				</td>
																				<td class="text_tablehead_b" colspan="2">
																					<input type="button" class="button" value="��  ��"
																						onclick="AddRow()" />
																				</td>
																			</tr>
																			<tr>
																				<td colspan="4"></td>
																			</tr>
																			<tr>
																				<td colspan="4">
																					<div align="center">
																						<table id="gkzjjjhb_mxadd">
																							<tr>
																								<td>
																							<tr>

																								<td class="text_tablehead_b">
																									���ջ��ش������
																									<font color="#FF0000">*</font>
																								</td>
																								<td class="text_tablehead_b">
																									Ԥ���Ŀ����
																									<font color="#FF0000">*</font>
																								</td>
																								<td class="text_tablehead_b">
																									������
																									<font color="#FF0000">*</font>
																								</td>
																							</tr>
																							<tr>
																								<td>
																								<input type="hidden" value="1"
																									style='width: 90px;' name="po.xh" id="xh"
																									readonly="readonly" />
																									<select name="po.gk_typecd" id="gk_typecd">
																										
																										<option value="1111111111">
																											��˰
																										</option>
																										<option value="2222222222">
																											��˰
																										</option>
																										<option value="3333333333">
																											����
																										</option>
																										<option value="4444444444">
																											����
																										</option>
																										<option value="5555555555">
																											����
																										</option>
																									</select>
																								</td>
																								<td>
																									<input type="text" name="po.gk_sbjctcd"
																										id="gk_sbjctcd" maxlength="20" />
																								</td>
																								<td>
																									<input type="text" name="po.gk_occrrdamt"
																										id="gk_occrrdamt" maxlength="19"
																										onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; addchange();"  />
																								</td>
																								<td>
																									&nbsp;
																								</td>
																							</tr>

																						</table>
																					</div>
																				</td>
																			</tr>

																		</table>
																		</div>
																		<div id="gkzjgzdfjjhbdetails" style="display: none;">
																		<table id="gz_mx" border="0" cellpadding="0"
																			cellspacing="0">
																			<tr>

																				<td class="text_tablehead_b">
																					��ϸ���ܽ��
																				</td>
																				<td>
																					<input type="text" name="po.gz_dtlsmmryamt"
																						id="gz_dtlsmmryamt" readonly="readonly" />
																					<font color="#FF0000">*</font>
																				</td>
																				<td class="text_tablehead_b">
																					�ϱ��������
																				</td>
																				<td>
																					<input type="text" name="po.gz_rprtcd"
																						id="gz_rprtcd" maxlength="10"
																						onkeyup="fun_number(this)"
																						onblur="fun_number(this)" />
																					<font color="#FF0000">*</font>
																				</td>
																			</tr>
																			<tr>

																				<td class="text_tablehead_b">
																					��Ϣ��ˮ��
																				</td>
																				<td>
																					<input type="text" name="po.gz_flowno"
																						id="gz_flowno" maxlength="10" />
																					<font color="#FF0000">*</font>
																				</td>
																			</tr>
																			<tr>
																				<td class="text_tablehead_b">
																					���չ������
																				</td>
																				<td>
																					<input type="text" name="po.gz_rcvcd" id="gz_rcvcd"
																						maxlength="10" onkeyup="fun_number(this)"
																						onblur="fun_number(this)" />
																					<font color="#FF0000">*</font>
																				</td>
																				<td class="text_tablehead_b">
																					��������
																				</td>
																				<td>
																					<input type="text" name="po.gz_rprtforms"
																						id="gz_rprtforms" readonly="readonly"
																						class="Wdate" onclick="WdatePicker()" />
																					<font color="#FF0000">*</font>
																				</td>
																			</tr>
																			<tr>
																				<td class="text_tablehead_b">
																					�������
																				</td>
																				<td>
																					<input type="text" name="po.gz_rprtnum"
																						id="gz_rprtnum" maxlength="10"
																						onkeyup="fun_number(this)"
																						onblur="fun_number(this)" />
																					<font color="#FF0000">*</font>
																				</td>
																				<td class="text_tablehead_b">
																					��ϸ����
																				</td>
																				<td>
																					<input type="text" value="1"
																						name="po.gz_numoftrnsctns" id="gz_numoftrnsctns"
																						readonly="readonly" />
																					<font color="#FF0000">*</font>
																				</td>
																			</tr>
																			<tr>
																				<td class="text_tablehead_b" colspan="4">
																					<div>
																						<input type="button" class="button" value="��  ��"
																							onclick="AddRowgz();" />
																				</td>
																			</tr>
																			<tr>
																				<td colspan="4">
																					<table id="gkzjgzdfjjhb_mx" border="0"
																						cellpadding="0" cellspacing="0">
																						<tr  align="center">
																							<td class="text_tablehead_b">
																								�Ҹ���ծ���д���
																								<font color="#FF0000">*</font>
																							</td>
																							<td class="text_tablehead_b">
																								�������
																								<font color="#FF0000">*</font>
																							</td>
																							<td class="text_tablehead_b">
																								������
																								<font color="#FF0000">*</font>
																							</td>
																							<td class="text_tablehead_b">
																								��Ϣ����
																								<font color="#FF0000">*</font>
																							</td>
																							<td class="text_tablehead_b">
																								��Ϣ���
																								<font color="#FF0000">*</font>
																							</td>
																							<td>
																								&nbsp;
																							</td>
																						</tr>
																						<tr align="center">
																							<td class="text_tablehead_b">
																								<select name="po.gz_typecd" id="gz_typecd"
																									style="width: 140px;">
																									
																									<option value="111111111111">
																										����
																									</option>
																									<option value="222222222222">
																										����
																									</option>
																									<option value="333333333333">
																										ũ��
																									</option>
																									<option value="444444444444">
																										����
																									</option>
																									<option value="555555555555">
																										����
																									</option>
																									<option value="666666666666">
																										����
																									</option>
																									<option value="777777777777">
																										����
																									</option>
																								</select>
																							</td>
																							<td class="text_tablehead_b">
																								<input type="text" name="po.gz_cptlcd"
																									id="gz_cptlcd" style="width: 90px;"
																									maxlength="12" />
																							</td>
																							<td class="text_tablehead_b">
																								<input type="text" name="po.gz_cptlamt"
																									id="gz_cptlamt" style="width: 90px;"
																									maxlength='19' onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; addchange();" />
																							</td>
																							<td class="text_tablehead_b">
																								<input type="text" name="po.gz_accrlcd"
																									id="gz_accrlcd" style="width: 90px;"
																									maxlength="12" />
																							</td>
																							<td class="text_tablehead_b">
																								<input type="text" name="po.gz_accrlamt"
																									id="gz_accrlamt" style="width: 90px;"
																									maxlength='19' onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; addchange();" />
																							</td>
																							<td class="text_tablehead_b">
																								&nbsp;
																							</td>
																						</tr>
																					</table>
																				</td>
																			</tr>
																		</table>
																		</div>
																		<div id="noaddinfo" style="display: none;">
																		</div>
																	<td>
																</tr>
															</table>
														</div>


														<div class="table_content">
															<table>

																<tr>
																	<td class="text_tablehead_b">
																		&nbsp;
																	</td>
																	<td class="text_tablehead_b">
																		&nbsp;
																	</td>
																	<td>
																		<input id="saveButton" type="button"
																			style="cursor: pointer" class="button" value="��  ��"
																			onclick="commitForm();" />
																		<input id="saveButton" type="reset"
																			style="cursor: pointer" class="button" value="��  ��" />
																	</td>
																	<td>
																		&nbsp;
																	</td>
																</tr>
															</table>
														</div>
														<div class="table_content" align="center">
															<br />
															<span class="STYLE1">˵������ɫ*��ע��Ϊ������</span>
														</div>


													</div>
												</td>
											</tr>
										</table>

									</div>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			<br />
			<br />
			<br />
		</html:form>
		
	</body>
</html>
