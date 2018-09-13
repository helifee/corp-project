<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean" prefix="bean" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html" prefix="html" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-logic" prefix="logic" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
	String path = request.getContextPath();
%>

<html>
<head>
<%-- 
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<META   HTTP-EQUIV="Pragma"   CONTENT="no-cache">   
<META   HTTP-EQUIV="Cache-Control"   CONTENT="no-cache">   
<META   HTTP-EQUIV="Expires"   CONTENT="0">  
--%> 
<title>
	
		֧Ʊ����
		
	
</title>
<style type="text/css"> 
			#newPreview
			{ 
				filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale); 
			} 
		</style> 

		<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
        <link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
        <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
        <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/jquery-1.3.1.js"></script>
		<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
		<script type="text/javascript" src="<%=path%>/js/zcxjs/zcx.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/checkIdCardNo.js"></script>
				<script type="text/javascript"	src="<%=request.getContextPath()%>/js/common/popup.js"></script>
		<script type='text/javascript' src='<%=path%>/dwr/interface/PubService.js'></script>
	   <script type='text/javascript' src='<%=path%>/dwr/engine.js'></script>
	   <script type='text/javascript' src='<%=path%>/dwr/util.js'></script>
       <script type="text/javascript" src="<%=path%>/js/common/jquery-1.3.1.js"></script>
		
<script language="javascript">
	function OnSave(){
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
				document.getElementById("proposercertid").value=obj.certid==null?"": obj.certid;//֤����
				document.getElementById("proposercstmrid").value=obj.cstmrid==null?"": obj.cstmrid;//�����˿ͻ���
				document.getElementById("cdtrissuer").value=obj.bankcode==null?"": obj.bankcode;//�տ��˿������к�
				document.getElementById("cdtrissuernm").value=obj.acctissr==null?"": obj.acctissr;//�տ��˿���������
				document.getElementById("proposerAcctTp").value=obj.accttp==null?"": obj.accttp;//�˻�����
				document.getElementById("proposerAcctTp1").value=obj.accttp==null?"": obj.accttp;//�˻�����
				 
		  }
	   	});
}

function fileselect(imgFile){ 
	if(isNull(trim(imgFile.value))){
		alert("�����ϴ�ͼƬ,��Ԥ��");
			return;
	}
	imageshow('winid','Ԥ��',imgFile);
}
function imageScan(){
	var path ='<%=path%>/ImageAction.do?method=imageDeal'
	viewDetails(path,"ͼ��ɨ��");
}

 
	//�������кŲ�ѯ
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
		 
		 //���������Ѳ�ѯ
			function addchange(paymentGroupNum){
				var url ="<%=request.getContextPath()%>";
				var beginamt = "<%=request.getSession().getAttribute("beginamt").toString()%>";
 				var endamt = "<%=request.getSession().getAttribute("endamt").toString()%>";
				 var obj ={
				 	hkje:document.getElementById('amount'),
				 	transno:'7127',
				 	pmttp:document.getElementById('pmttp'),
				    sxf : document.getElementById('sxf'),
				    ydf : document.getElementById('ydf'),
				    ydjs : document.getElementById('ydjs'),
				    ze : document.getElementById('totalamt'),
				    yxj:document.getElementById('yxj'),
				    xth: document.getElementById('xth'),
				    xth1: document.getElementById('xth1'),
				  	bepssxf: document.getElementById("bepssxf"),
				  	bepsydf: document.getElementById("bepsydf"),
				  	bepsydjs: document.getElementById("bepsydjs"),
				  	hvpssxf: document.getElementById("hvpssxf"),
				  	hvpsydf: document.getElementById("hvpsydf"),
				  	hvpsydjs: document.getElementById("hvpsydjs")
				  };
				 calcharge(url,beginamt,endamt,obj);
			}
		 	
			function clrAmt(){
				document.getElementById('amount').value="0.00";
				document.getElementById('sxf').value="0.00";
				document.getElementById('ydf').value="0.00";
				document.getElementById('ydjs').value="0.00";
				document.getElementById('totalamt').value="0.00";
				document.getElementById("xth").value="";
				document.getElementById("xth1").value="";
			}
		 
	 	 function zcx(val){
				if(val.value=='Y'){
					$("#serviceCharge").val("");//������
					$("#postage").val("");//�ʵ��
					$("#outstationcharge").val("");//��ؼ���
					$("#agncycharge").val("");//������������
					$("#serviceCharge").attr("readonly",true);
					$("#postage").attr("readonly",true);
					$("#outstationcharge").attr("readonly",true);
					$("#agncycharge").attr("readonly",true);
					jisuan();
				}else{
				 
					$("#serviceCharge").attr("readonly",false);
					$("#postage").attr("readonly",false);
					$("#outstationcharge").attr("readonly",false);
					$("#agncycharge").attr("readonly",false);
				}
			}
 
			function jisuan(){
				var sxf = $("#serviceCharge").val();
				var ydf = $("#postage").val();
				var ydjs = $("#outstationcharge").val();
				var hkje = $("#amount").val();//�����
			 var agent = $("#agncycharge").val();//�����
				document.getElementById("totalamt").value = fmoney(rmoney(sxf)+rmoney(ydf)+rmoney(ydjs)+rmoney(hkje)+rmoney(agent), 2);
			}
			 		 
	
			 function namezcx(val){
			  if(val.value>99) {
			  	alert('����ֵ������Χ��');
			  	return ;
			  }
			 var tb = document.getElementById('gkzjgzdfjjhb_mx');
		     var rowNum=tb.rows.length;
		     for (i=0;i<rowNum;i++)
		     {
		         tb.deleteRow(i);
		         rowNum=rowNum-1;
		         i=i-1;
		     }
			 for(var i=0;i < val.value;i++){
			  
					  var newTr = this.document.getElementById("gkzjgzdfjjhb_mx").insertRow();
					var newTd1 = newTr.insertCell();
				    var newTd2 = newTr.insertCell();
			   var newTd3 = newTr.insertCell();
			   
			   newTd1.className="text_tablehead_b";
				newTd1.innerHTML = "����������";
				
				newTd2.className="text_tablehead_b";
				newTd2.innerHTML = "<div align='left'><input type='text' name='po.endrsrNm' id='gz_cptlcd' style='width: 90px;' maxlength='12'/>";
				newTd3.className="text_tablehead_b";
				newTd3.innerHTML = "<input type='button' value='ɾ��'  class='button' onclick='fundelmxgz(this)'/>";
		
			 }
			
			}
			
			function fundelmxgz(obj){
		 
				var rowidx = obj.parentNode.parentNode.rowIndex; // ��ȡ�������ڱ���е��е�λ�ã���ɾ����ǰ�к���һ��
				this.document.getElementById("gkzjgzdfjjhb_mx").deleteRow(rowidx);
			
		    	var length= this.document.getElementById("gkzjgzdfjjhb_mx").rows.length	;//�õ���ɾ��ǰ��ֵ
		    		// alert(length);
				 this.document.getElementById("numOfEndrsr").value=length;
			}
			
			
				function commitForm(){
				  
	
			   var msg = "@";
			
			var rcptLtd = document.getElementById("rcptLtd");
			var proposerCertId = document.getElementById("proposerCertId");
			 
		    var proposerCstmrId = document.getElementById("proposerCstmrId");
			var proposerAcctTp = document.getElementById("proposerAcctTp");
			var dbtrbrnchid = document.getElementById("dbtrbrnchid");
			var dbtracct = document.getElementById("dbtracct");
			var dbtrissuer = document.getElementById("dbtrissuer");
			var dbtrmmbid = document.getElementById("dbtrmmbid");
			
			var cdtrbrnchid = document.getElementById("cdtrbrnchid");
			var cdtrbrnchnm = document.getElementById("cdtrbrnchnm");
			var cdtracct = document.getElementById("cdtracct");
			
			var dbtracct = document.getElementById("dbtracct");
			var dbtrnm = document.getElementById("dbtrnm");
			var currencycd = document.getElementById("currencycd");
			var totalamt = document.getElementById("totalamt");
			var amount = document.getElementById("amount");
			var issueDt = document.getElementById("issueDt");
			var payDt = document.getElementById("payDt");
			var notesNo = document.getElementById("notesNo");
			var numOfEndrsr = document.getElementById("numOfEndrsr");
			
			var imageBackDt = document.getElementById("imageBackDt");
			var name = document.getElementById("name");
			var dbtrbrnchnm = document.getElementById("dbtrbrnchnm");
			var xth = document.getElementById("xth");
			var xth1 = document.getElementById("xth1");
			if(isNull(trim(xth.value))){
			msg += "������Ϣ����Ϊ�գ�@";
		    }
			if(isNull(trim(xth1.value))){
			msg += "������Ϣ����Ϊ�գ�@";
		    }


			if(isNull(trim(dbtrbrnchnm.value))){
			msg += "���������Ʋ���Ϊ�գ�@";
		    }
			if(isNull(trim(dbtracct.value))){
			msg += "�������˺Ų���Ϊ�գ�@";
		    }
		    			if(isNull(trim(dbtrnm.value))){
			msg += "���������Ʋ���Ϊ�գ�@";
		    }
		    			if(isNull(trim(currencycd.value))){
			msg += "���ҷ��Ų���Ϊ�գ�@";
		    }
		    			if(isNull(trim(totalamt.value))){
			msg += "�ܶ��Ϊ�գ�@";
		    }
		    			if(isNull(trim(amount.value))){
			msg += "���׽���Ϊ�գ�@";
		    }
		    			if(isNull(trim(issueDt.value))){
			msg += "��Ʊ���ڲ���Ϊ�գ�@";
		    }
		    			if(isNull(trim(payDt.value))){
			msg += "��ʾ�������ڲ���Ϊ�գ�@";
		    }
		    			if(isNull(trim(notesNo.value))){
			msg += "Ʊ�ݺ��벻��Ϊ�գ�@";
		    }
		    			if(isNull(trim(numOfEndrsr.value))){
			msg += "������������Ϊ�գ�@";
		    }
		    			
		    		

		    	    
			 
		    if(isNull(trim(rcptLtd.value))){
					msg += rcptLtd.title+"����Ϊ�գ�@";
				    }
			 
				var boo = msgSplit(msg);
		  		if(boo){
		  			OnSave();
				 	document.getElementById("sxf").value=rmoney(document.getElementById("sxf").value) ;
			        document.getElementById("ydf").value=rmoney(document.getElementById("ydf").value) ;
			          document.getElementById("ydjs").value=rmoney(document.getElementById("ydjs").value) ;
					// document.getElementById("agncycharge").value=rmoney(document.getElementById("agncycharge").value) ;
					 document.getElementById("amount").value=rmoney(document.getElementById("amount").value) ;
					 document.getElementById("totalamt").value=rmoney(document.getElementById("totalamt").value) ;
					 document.forms[0].submit();
	        }
				 
		 }
		 
</script>
	
		<SCRIPT language="javaScript"><!--
  function sendDate(){
  	send_request("<%=path%>/transfer/RealTimeCreditAction.do?method=paymentGroupNumAjax");
  	  }
    var http_request = false;
  function send_request(url) {//��ʼ����ָ������������������ĺ���
   http_request = false;
   if(window.XMLHttpRequest) { 
����http_request = new XMLHttpRequest();
����if (http_request.overrideMimeType) {//����MiME���
 ����http_request.overrideMimeType('text/xml');
����}
   }
   else if (window.ActiveXObject) { // IE�����
����try {
 ����http_request = new ActiveXObject("Msxml2.XMLHTTP");
����} catch (e) {
 ����try {
  ����http_request = new ActiveXObject("Microsoft.XMLHTTP");
 ����} catch (e) {}
����}
   }
   if (!http_request) { // �쳣����������ʵ��ʧ��
����window.alert("���ܴ���XMLHttpRequest����ʵ��.");
����return false;
   }
   http_request.onreadystatechange = processRequest;
   // ȷ����������ķ�ʽ��URL�Լ��Ƿ�ͬ��ִ���¶δ���
   http_request.open("GET", url, true);
   http_request.send(null);
  }
  // ��������Ϣ�ĺ���
 ����function processRequest() {
     ����if (http_request.readyState == 4) { // �ж϶���״̬
         ����if (http_request.status == 200) { // ��Ϣ�Ѿ��ɹ����أ���ʼ������Ϣ
         //Ĭ�Ϸ���01��Ҳ���Ǵ�����Ϣ����ʱע���Ϳ���
                        if(http_request.responseText=='01'){
	                alert("��ȡ֧���������ʧ�ܣ���ˢ��ҳ�����»�ȡ");
	             return false;
	               }
                      else{
                     
		                  document.form1.pmtgrpid.value=http_request.responseText;
	                }
         ����   } else {
                   alert(http_request.status);
                   document.form1.sss.disabled=false;
             ����     alert("���������ҳ�����쳣��");
         ����  }
     ����}
 ����}
      -->
     </script>
     <script>
       	function clrAmt(){
				document.getElementById('amount').value="0.00";
				document.getElementById('totalamt').value="0.00";
				document.getElementById('sxf').value="0.00";
				document.getElementById('ydf').value="0.00";
				document.getElementById('ydjs').value="0.00";
				document.getElementById("xth").value="";
				document.getElementById("xth1").value="";
			}
     </script>
	
</head>
<body onload="sendDate();">
  
<form name="form1" enctype="multipart/form-data" method="post" action="<%=path%>/ChequeholdAction.do?method=chequehold">
	 
	<input id="repeatmark" type="hidden" value="0">
	<input type="hidden" name="token" value="${token }" />
	<input  id="hvpssxf" name="hvpssxf" type="hidden"  maxlength="19" />
			<input  id="hvpsydf" name="hvpsydf" type="hidden"  maxlength="19"  />
			<input  id="hvpsydjs" name="hvpsydjs" type="hidden" maxlength="19" />
			<input  id="bepssxf" name="bepssxf" type="hidden"  maxlength="19" />
			<input  id="bepsydf" name="bepsydf" type="hidden"  maxlength="19"  />
			<input  id="bepsydjs" name="bepsydjs" type="hidden" maxlength="19" />
	
	
	  <table id="querybook" width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
	  	<tr valign="top">
	  		<td></td>
			<td>
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td width="10">&nbsp;</td>
						<td>
							<div align="center">
							<br/>
				      		<table width="689" border="0" cellspacing="0" cellpadding="0" >
				        		<tr>
						        	<td>
						        	 <div class="text_title"><span class="text_blue2">ͨ�û�ִ</span></div> 
									</td>
						        </tr>
						        <tr>
				          			<td><div class="table_body">
						        <div class="table_content">
						          			<table>
				                			    <tr>
								                	<td colspan="4">
				                						<span class="text_tablehead">������Ϣ</span>
				                						 <input type="hidden" name="po.signmd" value="03"/> 
															 
														<input type="hidden" name="po.systemcd" value="BEPS"/>
				                					</td>
				                				 </tr>
				                				 <tr>
								               
								                   	<td  class="text_tablehead_b">
								                   	֧���������
								                   	</td>
								                  	<td colspan="4">
								                   		<input type="text"  name="po.pmtgrpid" id="pmtgrpid"  title="֧���������"  readonly="readonly" maxlength="20" value="${transId}"/><font color="#FF0000">*</font>
								                   	</td>
								                 </tr>
				                				 <tr>
				                					<td class="text_tablehead_b"  >
								                  		�˵��˱�ʶ��
								                  	</td>
								                  	<td>
								                   		<input type="text"  name="EndToEndId" id="EndToEndId"  title="�˵��˱�ʶ��"   maxlength="20" value="${transId}"/>
								                   		<font color="#FF0000">*</font>
								                  	</td>
								                  	<td class="text_tablehead_b" >
								                  	ҵ�����ͱ���
								                  	</td>
								                  	<td >
								                   		<select name="po.pmtKd" id="pmtkd" >
								                   			<option value="">   </option>
								                   		</select>
								                   		<span  class="STYLE1">*</span>
								                  	</td>
								                </tr>
								                <tr>
				                					<td class="text_tablehead_b"  >
								                  		��ϸ��ʶ��
								                  	</td>
								                  	<td>
								                   		<input type="text"  name="txid" id="txid"  title="��ϸ��ʶ��"   maxlength="20" />
								                   		<font color="#FF0000">*</font>
								                  	</td>
								                  	<td class="text_tablehead_b" >
								                  	ҵ���������
								                  	</td>
								                  	<td >
								                   		<select name="po.pmtKd" id="pmtkd" >
								                   			<option value="">   </option>
								                   		</select>
								                   		<span  class="STYLE1">*</span>
								                  	</td>
								                </tr>
							                 </table>
						                </div>
						        
						        
						        
						        
						        
						        
						                <div class="table_content">
						          			<table>
				                			   	<tr >
								                	<td colspan="4">
				                						<span class="text_tablehead">�տ�����Ϣ</span>
				                					</td>
				                				</tr>
				                				<tr>
								                  	<td  class="text_tablehead_b">
								                		�տ����˺�
								                	</td>
								                  	<td >
								                   		<input type="text" name="po.cdtrAcct" id="cdtracct" title="�տ����˺�"  
								                   		maxlength="32" onblur="PubQueryAccount(this.value);clrAmt();"/><font color="#FF0000">*</font>
								                  	</td>
								                  	<td class="text_tablehead_b">
								                  		�տ�������
								                  	</td>
								                  	<td>
								                   		<input type="text" name="po.cdtrNm" id="cdtrnm" title="�տ�������"   maxlength="60" />
								                   		<font color="#FF0000">*</font>
								                  	</td>
								                 </tr>
								                 <tr>
				                					<td class="text_tablehead_b">
								                  		�տ����к�
								                  	</td>
								                  	<td>
								                   		<input type="text" name="po.cdtrBrnchId" id="cdtrbrnchid" title="�տ����к�"    maxlength="14" 
								                   		/>
								                   		                 		
								                  	</td>
								                  	<td class="text_tablehead_b">
								                  		�տ�������
								                  	</td>
								                  	<td>
								                   		<input type="text" name="po.cdtrBrnchNm" id="cdtrbrnchnm"  title="�տ�������" 
								                   		maxlength="60"  />
								                   		 
								                    </td>
								                 </tr>
								                  
								                 
								                     
								                     <tr>
								                  	
								                  	<td class="text_tablehead_b">�տ��˵�ַ</td>
								                  	<td colspan="3">
								                  		<input name="po.cdtrAddr" id="cdtraddr" class="text_tablehead_b_addr"   
																		 onKeyPress="actkeyPress()"  onkeyup="limitLength(value,70,'��ʾ��','cdtraddr')"/>
								                  	
								                  	</td>
								                  </tr>
								                     <tr>      	
								                  
								                  	<td class="text_tablehead_b" >
								                  		�տ��˿������к�
								                  	</td>
								                  	<td>
								                   		<input type="text" name="po.cdtrIssuer" id="cdtrissuer" title="�տ��˿������к�"  maxlength="14" readonly="readonly" style="width:100px;"/>
								                   		<input type="button" class="button"  value="����" onclick="selectBankInfoOfSkk()">
								                   		<font color="#FF0000">*</font>  
								                  	</td>
								                  	<td class="text_tablehead_b">
								                  		�տ��˿���������
								                  	</td>
								                  	<td >
								                   		<input type="text" name="po.cdtrIssuerNm" id="cdtrissuernm" title="�տ��˿���������"   maxlength="60" readonly="readonly"/>
								                   	</td>
								                   </tr>
								                    
								                   <tr>			                  	
								                  
								                  	<td class="text_tablehead_b">
								                  		�տ��������к�
								                  	</td>
								                  	<td>
								                   		<input type="text" name="po.cdtrMmbId" id="cdtrmmbid" 
								                   		maxlength="14"   readonly="readonly"/>	
								                   		            		
								                  	</td>
								                   </tr>
							                       <tr></tr>
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
									                  	<td  class="text_tablehead_b">
									                  		�������˺�
									                  	</td>
									                  	<td >
									                   		<input type="text" name="po.dbtrAcct"  id="dbtracct"  title="�������˺�" maxlength="32" onblur="queryBypaymentGroupNum(this.value)"/>
									                   		<font color="#FF0000">*</font>
									                  	</td>
									                  	<td class="text_tablehead_b">
								                  		����������
								                  	</td>
								                  	<td>
								                   		<input type="text" name="po.dbtrNm" id="dbtrnm" title="����������" maxlength="60" />
								                   		<font color="#FF0000">*</font>
								                  	</td>
								                  	</tr>
								                  	<tr>
								                  		<td class="text_tablehead_b">�����˵�ַ</td>
								                  	<td colspan="3">
															<input name="po.dbtrAddr" id="dbtraddr" class="text_tablehead_b_addr"   
																		 onKeyPress="actkeyPress()"  onkeyup="limitLength(value,70,'��ʾ��','dbtraddr')"/>
															
								                  	</td>
								                  	</tr>
								                  	 <tr>
					          						<td class="text_tablehead_b">
								                  		�������к�
								                  	</td>
								                  	<td>
								                   		<input type="text" name="po.dbtrBrnchId" id="dbtrbrnchid" maxlength="14"  title="�������к�" readonly="readonly" style="width:100px;"/>
								                   		<input type="button" class="button"  value="����" onclick="selectBankInfo()">
								                   		<font color="#FF0000">*</font>
								                  	</td>
								                  		<td class="text_tablehead_b">
								                  		����������
								                  	</td>
								                  	<td>
								                   		<input type="text" name="po.dbtrBrnchNm" id="dbtrbrnchnm"  title="����������" readonly="readonly"
								                   		maxlength="60"  value=""/>
								                   		<font color="#FF0000">*</font>
								                  	</td>
								                  	</tr>
								                  	<tr>
								                  			<td class="text_tablehead_b">
								                  	�����˿������к�
								                  	</td>
								                  	<td>
								                   		<input type="text" name="po.dbtrIssuer" id="dbtrissuer" title="�����˿������к�" maxlength="14" readonly="readonly" style="width:100px;"/>
								                  <input type="button" class="button"  value="����" onclick="selectBankInfoOfFkk()">
								                   		 
								                  	</td>
								                  		<td class="text_tablehead_b">
								                  		�����˿���������
								                  	</td>
								                  	<td>
								                   		<input type="text" name="po.dbtrIssuerNm" id="dbtrissuernm" title="�����˿���������"  maxlength="60" readonly="readonly"/>
								                  	</td>
								                  	</tr>
								                  	<tr>
								                  			<td class="text_tablehead_b">
								                  		  �����������к�
								                  	</td>
								                  	<td>
								                   		<input type="text" name="po.dbtrMmbId" id="dbtrmmbid" title="�����������к�" maxlength="14" readonly="readonly"
								                   		 />
								                   		 
								                  	</td>
								                  	</tr>
								           </table>
							             </div>
						        
						        <div class="table_content">
						                <table>
						               		<tr>
							                	<td colspan="4">
			                						<span class="text_tablehead">������Ϣ</span>
			                					</td>
				                			</tr>
										           	 <tr>
										           	 
											           	<td  class="text_tablehead_b">
										                   ԭCISί������
										                </td>
										                <td >

										                 	<input type="text" name="po.issueDt" id="issueDt"  title="��Ʊ����"  readonly="readonly" class="Wdate"  onclick="WdatePicker()"/>
										                 	<font color="#FF0000">*</font>

										                </td>
										                <td  class="text_tablehead_b" >
										                   	ԭCIS�������
										                </td>
										                <td >

										                 	<input type="text" name="po.payDt" id="payDt"   title="��ʾ��������"  class="Wdate"  onclick="WdatePicker()" />
										                 	<font color="#FF0000">*</font>

										                </td>
										                
										             </tr>
										             <tr>
										             	
										             	 <td class="text_tablehead_b">
										                 ԭCISƱ�ݺ���
										                </td>
										                <td>
										                 	<input type="text" name="po.notesNo" id="notesNo" title="Ʊ�ݺ���" maxlength="32"  onkeypress="amountPress()" />
										                 	<font color="#FF0000">*</font>
										                </td>	
										                  <td class="text_tablehead_b">
										                  ��ִ״̬
										                </td>
										                <td>
										                <select name="po.pmtKd" id="pmtkd" >
								                   			<option value="PR02">�Ѹ���</option>
								                   			<option value="PR09">�Ѿܾ�</option>
								                   		</select>
										                </td>		
										             </tr>
										           
									                 <tr>
											           	
										                  <td class="text_tablehead_b">
										                 ҵ��ܾ�������
										                </td>
										                <td>
										                 	<input type="text" name="po.purpose" id="purpose" title="��;" /> 
										                </td>
										                
									                 </tr>
									              
										             <tr>
										             	 <td class="text_tablehead_b">
										                ҵ��ܾ���Ϣ
										                </td>
										                	<td colspan='4'>
										                
                  								 <textarea name="po.addtlInf" id="addtlInf" cols="60"
																			rows="3" onKeyPress="charPress()"
																			onkeyup="limitLength(value,256,'��ʾ��','addtlInf')"></textarea>
										                </td>
										               <tr>
										               	
										           </table>
										           
										           
												                
										  	</div>        		    
				         
										          
                                                        <div class="table_content">
                                                    	<table>
                                                    	<tr>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    			<td >
                                                    			<span class="STYLE1">˵������ɫ*��ע��Ϊ������</span>
                                                    			</td>
                                                    			<td >&nbsp;
                                                    	 
                                                    			</td>
                                                    		</tr>
                                                    		<tr>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    			<td >
                                                    				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input name="addButton" type="button" style="cursor: pointer"
																		class="button" value="��  ��" onclick="commitForm();" />
																		<input id="saveButton" type="reset" style="cursor: pointer" class="button" value="��  ��"   />
                                                    			</td>
                                                    			<td >&nbsp;
                                                    	 
                                                    			</td>
                                                    		</tr>
                                                    	</table>
                                                    </div>   
				         		       
						        </div></td></tr>
                                 </table>
                                 </div>
                                 </td>
                                 </tr>
                                 </table>
                                 </td>
                                 </tr>
                                 </table>
                                

</form>
		</body>
</html>
