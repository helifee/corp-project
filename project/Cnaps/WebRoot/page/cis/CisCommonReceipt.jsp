<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html"%>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic"%>
<%
	String path = request.getContextPath();
%>

<html> 
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
		<title>CISͨ�û�ִǩ��</title>
		
		
		<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
        <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
        <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
       <link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
        <script type="text/javascript" src="<%=path%>/js/common/checkIdCardNo.js"></script>
			
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/transferOfCash.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/addRow.js"></script>
		<script type="text/javascript" src="<%=path%>/js/ybjs/helpUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
		<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="<%=path%>/js/zcxjs/zcx.js"></script>	
	<script type="text/javascript"	src="<%=request.getContextPath()%>/js/common/popup.js"></script>
	<script type='text/javascript' src='<%=path%>/dwr/interface/PubService.js'></script>
	<script type='text/javascript' src='<%=path%>/dwr/engine.js'></script>
	<script type='text/javascript' src='<%=path%>/dwr/util.js'></script>
	<script type="text/javascript" src="<%=path%>/js/common/jquery-1.3.1.js"></script>
	
	   <script type="text/javascript">
	   		

	function OnSave() {
	var userMap = {};
	 
	userMap.accountnumber = document.getElementById("receNum").value;
	userMap.accountname = document.getElementById("receName").value;
	userMap.addr = document.getElementById("receAddress").value;
	userMap.issuer =document.getElementById("receBankNum").value;
	userMap.issuernm =document.getElementById("receBankName").value;
	userMap.mmbid =document.getElementById("cdtrMmbId").value;
	userMap.accttp =document.getElementById("receAccountType").value;
  PubService.saveOthersBankAccountMsg(userMap, function(data){
  	
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
				  alert(" ��ѯ��Ϣ�����ڣ�δ�鵽�������" );
						  	 return;
			}else{
			 
			  document.getElementById("cdtrAcct").value=obj.accountnumber;
		      document.getElementById("cdtrNm").value=obj.accountname==null?"": obj.accountname  ;
			   document.getElementById("cdtrIssuer").value=  obj.issuer==null?"": obj.issuer ;   
			    document.getElementById("cdtrMmbId").value=obj.mmbid==null?"":obj.mmbid ;//�������к�
			  document.getElementById("cdtrAddr").value=obj.addr==null?"": obj.addr  ; //�˵�ַ
			   document.getElementById("cdtrIssuer").value= obj.issuer==null?"": obj.issuer ;   //�к�
			  document.getElementById("cdtrIssuerNm").value=obj.issuernm==null?"":obj.issuernm ; //����
			    document.getElementById("cdtrMmbId").value=obj.mmbid==null?"":obj.mmbid ;//�������к�
			    document.getElementById("cdtrBrnchId").value= obj.issuer==null?"": obj.issuer ;   //�к�
			  document.getElementById("receBankName").value=obj.issuernm==null?"":obj.issuernm ; //����
			   	
			    
		 }
	   	});
				
			}
			//��ѯ��������Ϣ  ʵʱ����
			
			function  PubQueryAccount(paymentGroupNum){
	 
			if(isNull(trim(paymentGroupNum))){
						return;
					}
				var pop = createPopWin("popid",'ϵͳ������...',"<%=request.getContextPath()%>/page/transfer/shouquanCons.jsp");
						pop.show();
						PubService.QueryAccount(paymentGroupNum,function(obj){
							pop.close();
					if(obj==null||obj.acctid==null){
						alert("�տ�����Ϣ��ѯʧ�ܣ�δ�鵽�����Ϣ" );
					return;
					}else{
								document.getElementById("dbtrNm").value=obj.mm==null?"": obj.mm;//����
								document.getElementById("dbtrAddr").value=obj.addr==null?"": obj.addr;//��ַ
								document.getElementById("phone").value=obj.tel==null?"": obj.tel;//��ϵ�绰
								 document.getElementById("certsize").value=obj.certip==null?"": obj.certip;//֤������
								 document.getElementById("certsize1").value=obj.certip==null?"": obj.certip;//֤������
								document.getElementById("certnum").value=obj.certid==null?"": obj.certid;//֤����
								//document.getElementById("proposercstmrid").value=obj.cstmrid==null?"": obj.cstmrid;//�����˿ͻ���
						      	//document.getElementById("proposerAcctTp").value=obj.accttp==null?"": obj.accttp;//�˻�����
								//document.getElementById("proposerAcctTp1").value=obj.accttp==null?"": obj.accttp;//�˻�����    
			}
			});
	   	}
		
	 
	   </script>
	
		<script language="javascript">
			//�տ����кŲ�ѯ
function selectBankInfo(){
				 var url ="<%=request.getContextPath()%>";
				var receBankNum= document.getElementById("cdtrBrnchId");//�տ��к�
				var receBankName=document.getElementById("receBankName");//�տ�����
				var cdtrMmbId=document.getElementById("cdtrMmbId");//�������к�
				var receOpenBankNum= document.getElementById("cdtrIssuer");//�����к�
				var receOpenBankName=document.getElementById("cdtrIssuerNm");//��������
				selectkhhBank(url,receBankNum,receBankName,cdtrMmbId,receOpenBankNum,receOpenBankName);
								 
				
				
			}

			//�տ��˿�������Ϣ��ѯ
			function selectBankInfoOfSkk(){
				var url ="<%=request.getContextPath()%>";
				var skhkhhhh= document.getElementById("receOpenBankNum");
				var skrkhhmc=document.getElementById("receOpenBankName");
				selectBank(url,skhkhhhh,skrkhhmc,"");
			}
			//�����˿�������Ϣ��ѯ
			function selectBankInfoOfFkk(){
				var url ="<%=request.getContextPath()%>";
				var fkhkhhhh= document.getElementById("dbtrIssuer");
				var fkrkhhmc=document.getElementById("dbtrIssuerNm");
				selectBank(url,fkhkhhhh,fkrkhhmc,"");
			}
	  
				function commitForm(){
			   	var msg = "@";
			   	var answerStatus=document.getElementById("answerStatus");
				var checkNums=document.getElementsByName("checkNums");
				var txrjctinf=document.getElementById("txrjctinf");
				var valStr="";
				var checkedNum=0;
				if(answerStatus.value=='PR09'){
					for(var i=0;i<checkNums.length;i++){
						if(checkNums[i].value!=''&&checkNums[i].checked){
						checkedNum+=1;
						valStr+=checkNums[i].value;					
						}
					}
					if(checkedNum==0){
						msg +="��Ӧ��״̬Ϊ�Ѿܾ�����Ʊ��ʱ���ܾ���Ϊ�����@"
					}
					else if(checkedNum>5){
						msg +="�����д5����Ʊ���룡@";
					}
					else{
						document.getElementById("refuseNo").value=valStr;
					}
					if(txrjctinf.value==""){
						msg+="��Ӧ��״̬Ϊ�Ѿܾ�����Ʊ��ʱ���ܾ���ϢΪ�����@";
					}
				}
				var dbtrAcct = document.getElementById("dbtrAcct");
				var moneyNum = document.getElementById("ntryAmt");
				 var dbtrNm = document.getElementById("dbtrNm");
				msg=isMonNull(moneyNum,msg);
				if(isNull(trim(dbtrAcct.value))){
					msg += dbtrAcct.title+"����Ϊ�գ�@";
				}
				 if(isNull(trim(dbtrNm.value))){
					msg += dbtrAcct.title+"����Ϊ�գ�@";
				}
				 
				 
				 
				 
			 
				var boo = msgSplit(msg);
			 
				if(boo){
					//	OnSave();
		  			 document.getElementById("ntryAmt").value=rmoney(document.getElementById("ntryAmt").value );
				  	document.forms[0].submit();
				}
				  
				 
		 }
		
			
			function isMonNull(moneyNum,msg){
			 
		 	if(moneyNum.value==''||moneyNum.value==0.00||moneyNum.value==0||moneyNum.value=='0.00'||moneyNum.value=='0'){
		 		msg += moneyNum.title+"����Ϊ�գ�@";
		 		return msg;
		 	}
		 	return "@";
		 }
		 
		 
		</script>
		
		
		<SCRIPT language="javaScript">
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
                     
		                   document.forms[0].txid.value=http_request.responseText;
	                }
         ����   } else {
                   alert(http_request.status);
                   document.form1.sss.disabled=false;
             ����     alert("���������ҳ�����쳣��");
         ����  }
     ����}
 ����}
     
      
      
     
			
	 
			function changePKD(){
				var pmttp=this.document.getElementById('pmttp');
				var pmkdVal=(pmttp.value)=="A308" ? '05301' : '05302';
				var pmkdText=pmkdVal=='05301' ? 'CIS֧Ʊҵ���ִ' : 'CISͨ��Ʊ��ҵ���ִ';
				var obj=this.document.getElementById('popmtkd');
				obj.innerHTML="<select  name='po.pmtkd' id='pmtkd' style='width:180px;' title='ҵ���������'>"+
				"<option value='"+pmkdVal+"'  selected='selected'>"+pmkdText+"</option></select><span  class='STYLE1'>*</span>";
			}
			
     </script>
	
	</head>
	<body onload="sendDate()"> 
 
			<form method="post" 
			action="<%=path%>/CisCommonReceiptAction.do?method=create">
			<input id="signval" type="hidden" value="sign0">
			<!--  <input type="hidden" name="token" value="${token}" />-->
		 
			<!-- ��ֹ�ظ��ύ -->
			 
		  
		  
		  <input name="po.resuseNo" id="refuseNo" type="hidden" value="">
		  
		  
		 
			<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				
				
				
				<tr valign="top">
					
					<td>
					<input type="hidden" name="po.currencyCd" id="currencyCd" value="CNY"/>
					
					
					
					</td>
					<td>
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td width="10">
									&nbsp;
								</td>
								<td>
									<div align="center">
									<br/>
						               <table width="689" border="0" cellspacing="0" cellpadding="0" >
                                          <tr>
						                  <td  >
						                  	<div  class="text_title"><span class="text_blue2">CISͨ�û�ִǩ��</span></div>
						                  </td>
						                </tr>
                                         <tr>
                                           <td>
                                           	<div class="table_body">
                                                     <div class="table_content">
                                                      <table >
																 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">������Ϣ</span></td>
                                                      </tr>
															<tr>
															<td class="text_tablehead_b"  >
																	��ϸ��ʶ��
																</td>
																<td >
																		<input name="po.txid" id="txid" type="text" readonly="readonly"
																		style="width: 180px;" title="��ϸ��ʶ��" maxlength="22"
																		  /><span  class="STYLE1">*</span>
																 
																</td>
																<td class="text_tablehead_b" >
																	<!--   �˵��˱�ʶ��-->
																</td>
																<td >
																	<input name="po.endToEndId" id="endToEndId" type="hidden"  value="123"
																		maxlength="19" title="�˵��˱�ʶ��"  />
																
																	<!--<span  class="STYLE1">*</span>-->
																</td>
																
															</tr>
															<tr>
																<td class="text_tablehead_b" >
																	ҵ�����ͱ���
																</td>
																<td>
																	<select  name="po.pmttp" id="pmttp" style="width:180px;" title="ҵ�����ͱ���" onChange="changePKD();">
																	<option value="A308"  selected="selected">CIS֧Ʊҵ���ִ</option>
																	 <option value="A309"  >CISͨ��Ʊ��ҵ���ִ</option>
																</select>
																	<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	ҵ���������
																</td>
																<td id="popmtkd">
																	<select  name='po.pmtkd' id='pmtkd' style='width:180px;' title='ҵ���������'>
																			<option value='05301'  selected='selected'>CIS֧Ʊҵ���ִ</option></select>
																			<span  class='STYLE1'>*</span>
																</td>
															</tr>
															
															</table>
                                                 </div>
                                                
                                               
                                               
                                                    <div class="table_content">
                                                    
                                                  		<table>
                                                  		 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">��������Ϣ</span></td>
                                                      </tr>
                                                      	<tr>
                                                  				<td class="text_tablehead_b" >
																	�������˺�
																</td>
																<td>
																	  <input name="po.dbtrAcct" id="dbtrAcct" type="text" onblur="PubQueryAccount(this.value)"
																		 title="�������˺�" maxlength="32"
																		onKeyPress="actkeyPress()" /> 
																			<span  class="STYLE1">*</span>
																		 
																</td>
																<td class="text_tablehead_b" >
																	����������
																</td>
																<td>
																	<input name="po.dbtrNm" id="dbtrNm" type="text"  
																		title="����������" maxlength="60"
																		onKeyPress="charPress()" />
																		<span  class="STYLE1">*</span>
																</td>
																 
                                                  			</tr>
                                                          <tr>
															<td class="text_tablehead_b"  >
																	֤������
																</td>
																<td> <input type="hidden" id="certsize1" name="po.certsize"/>
																		<select   name="po.certsize" id="certsize" disabled="disabled">
																		<option value="01">
																			���֤
																		</option>
																		<option value="02">
																			����֤
																		</option>
																		<option value="03">
																			ѧ��֤
																		</option>
																	<option value="04">
																			Ӫҵִ��
																		</option>
																		<option value="05">
																			��֯��������
																		</option>
																	</select>
																 <span  class="STYLE1">*</span>
																</td>
															
																<td class="text_tablehead_b" >
																	������֤����
																</td>
																<td >
																	<input name="po.certnum" id="certnum" type="text" size="19"  readonly="readonly"
																		maxlength="32" title="������֤����"    />
																		 <span  class="STYLE1">*</span>
																 	 		 </td>
																 	 		
															</tr>
																<tr>
																

																<td class="text_tablehead_b" >
																	��������ϵ�绰
																</td>
																<td>
																	<input  name="po.phone" id="phone" type="text" readonly="readonly"
																		 maxlength="20" title="��������ϵ�绰" />  
																		 <span  class="STYLE1">*</span>
																</td>
																
																</tr>
															
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																<!-- �������к� -->
																</td>
																<td>
																	<input name="po.dbtrBrnchId" id='fkhhh' type="hidden" type="text" readonly="readonly"
																		 title="�������к�"  maxlength="12"  value="${bankInfo.bankcode }"
																		onKeyPress="actkeyPress()" />  
																</td>
																<td class="text_tablehead_b">
																 <!-- ����������  -->
																</td>
																<td>
																	<input name="po.dbtrbrnchnm" id="fkhmc" type="hidden" title="����������" value="${bankInfo.participantname }"
																		  maxlength="60" readonly="readonly"
																		onKeyPress="actkeyPress()" />
																		 
																</td>
                                                  			</tr>
                                                  			
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	�����˵�ַ
																</td>
																<td colspan="3">
																	<input name="po.dbtrAddr" id="dbtrAddr" class="text_tablehead_b_addr" 
																		 onKeyPress="actkeyPress()"  onkeyup="limitLength(value,70,'��ʾ��','dbtrAddr')"/>
																
																</td>
                                                  			</tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																<!--   �����˿������к� -->
																</td>
																<td>
																	<input name="po.dbtrIssuer" id="dbtrIssuer" type="hidden" class="text_tablehead_b_c"
																		 title="�����˿������к�" maxlength="12"   readonly="readonly" value="${bankInfo.bankcode }"
																		/>
																	<!--	<input type="button" class="button"   value="����" onclick="selectBankInfoOfFkk()">-->
																		
																</td>
																<td class="text_tablehead_b">
																<!--  �����˿��������� -->
																</td>
																<td>

																	<input name="po.dbtrIssuerNm" id="dbtrIssuerNm"  value="${bankInfo.participantname }" type="hidden" title="�����˿���������"
																		  maxlength="60" readonly="readonly"
																		/>
																</td>
                                                  			</tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																  <!-- �����������к� -->
																</td>
																<td>
																	<input name="po.dbtrMmbId" id="fkqshhh" type="hidden" readonly="readonly"
																		 title="�����������к�" maxlength="12" value="${bankInfo.directbankcode }"
																		 />
																</td>
                                                  			</tr>
                                                  		</table>
                                                 </div>
                                                   
                                                    <div class="table_content">
                                                    
                                                  		<table>
                                                  		 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">�տ�����Ϣ</span></td>
                                                      </tr>
															<tr>
																<td class="text_tablehead_b" >
																	�տ����˺�
																</td>
																<td>
																	<input name="po.cdtrAcct" id="cdtrAcct" type="text"
																		 title="�տ����˺�" maxlength="32" onblur="queryBypaymentGroupNum(this.value)"
																		onKeyPress="charPress()" />
																		<span  class="STYLE1">*</span>
																</td>
															
																<td class="text_tablehead_b" >
																	�տ�������
																</td>
																<td>
																	<input name="po.cdtrNm" id="cdtrNm" type="text" 
																		title="�տ�������" maxlength="60"
																		onKeyPress="charPress()" />
																		<span  class="STYLE1">*</span>
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" >
																	�տ��˵�ַ
																</td>
																<td colspan="3">
																	<input type="text" class="text_tablehead_b_addr" name="po.cdtrAddr" id="cdtrAddr" 
																		onKeyPress="actkeyPress()" onkeyup="limitLength(value,70,'��ʾ��','cdtrAddr')" />
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" >
																  <!-- �տ��˿������к� -->
																</td>
																<td>
																	<input name="po.cdtrIssuer" id="cdtrIssuer" type="hidden" class="text_tablehead_b_c"
																		 title="�տ��п������к�" maxlength="12"  readonly="readonly"
																		onKeyPress="actkeyPress()" />
																	<!--<input type="button" class="button"  value="����" onclick="selectBankInfoOfSkk()">-->	
																</td>
															
																<td class="text_tablehead_b">
																	 <!-- �տ��˿��������� -->
																</td>
																<td>
																	<input name="po.cdtrIssuerNm" id="cdtrIssuerNm" type="hidden" readonly="readonly"
																		title="�տ��˿���������" maxlength="60"
																		onKeyPress="actkeyPress()" />
																</td>
															</tr>
																<tr>
																 
																 
																<td class="text_tablehead_b">
																	<!-- �տ��������к�-->
																</td>
																<td>
																	<input name="po.cdtrMmbId" id="cdtrMmbId" type="hidden" readonly="readonly"
																		title="�տ��������к�" maxlength="12" 
																		 onKeyPress="actkeyPress()" />
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" >
																	�տ����к�
																</td>
																<td>
																	<input name="po.cdtrBrnchId" id="cdtrBrnchId"  type="text" class="text_tablehead_b_dd"
																		 title="�տ����к�" maxlength="12"  readonly="readonly"
																		onKeyPress="actkeyPress()" />
																		<input type="button" class="button"  value="����" onclick="selectBankInfo()">
																		<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	�տ�������
																</td>
																<td>
																	<input name="po.receBankName" readonly="readonly" id="receBankName" type="text"
																		style="width: 180px;" title="�տ���������" maxlength="60" readonly="readonly"
																		onKeyPress="actkeyPress()" />
																		<span  class="STYLE1">*</span>
																</td>
															</tr>
                                                  		</table>
                                                 
                                                    <div class="table_content">
                                                   		<table>
                                                  		 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">�����Ϣ</span></td>
                                                      </tr>
                                                  			<tr>
																
																<td class="text_tablehead_b" >
																	���ִ���
																</td>
																<td>
																	<input name="po.currencyCd" id="currencyCd" type="text"
																		 title="���ִ���"  value="CNY" readonly="readonly"
																		onKeyPress="actkeyPress()" />
																</td>
																<td class="text_tablehead_b" >
																	 ������
																</td>
																<td >
																	 <input name="po.ntryAmt" id="ntryAmt" type="text"
																		 title=" ������"  
																		 onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';  "
																		 />
																</td>
																
																</tr>
																 
                                                  		</table>
                                                  	</div>
                                                  	 
                                                    <div class="table_content">
                                                    
                                                  	
                                                    		<table>
                                                    		 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">������Ϣ</span></td>
                                                      </tr>
															<tr>
															<td class="text_tablehead_b" >
																	ԭcisί������
																</td>
																<td>
																<input type="text" name="po.ornglCisCnsgnDt" id="ornglCisCnsgnDt"  title="ԭcisί������"  
																readonly="readonly" class="Wdate"  onclick="WdatePicker()"/><font color="#FF0000">*</font>
																</td>
																<td class="text_tablehead_b" >
																	ԭcis�������
																</td>
																<td>
																	<input name="po.ornglCisTxId" id="ornglCisTxId" type="text" 
																		title="ԭcis�������" maxlength="12"  />
																
																</td>
															</tr>
															<tr>
															
																<td class="text_tablehead_b" >
																	 ԭcisƱ�ݺ���
																</td>
																<td>
																	<input name="po.ornglCisNotesNo" id="ornglCisNotesNo" type="text"
																		title="ԭcisƱ�ݺ���" maxlength="12"   />
																
																</td>
																	
																<td class="text_tablehead_b" >
																	 Ӧ��״̬
																</td>
																
																<td >
																	 <select   name="po.answerStatus" id="answerStatus" >
																		<option value="PR02">
																			�Ѹ���
																		</option>
																		<option value="PR09">
																			�Ѿܾ�����Ʊ��
																		</option>
																	</select>
																</td>
																
															</tr>
															 <tr>
															 <td class="text_tablehead_b" >
																	 �ܾ���
																</td>
																<td colspan="4" id="checkTd">
																	<input type="checkbox" class="text_tablehead_b_rad" value="RJ21" name="checkNums">��Сд����<br />
																	<input type="checkbox" class="text_tablehead_b_rad" value="RJ22" name="checkNums">֧Ʊ������ص����ȫ<br />
																	<input type="checkbox" class="text_tablehead_b_rad" value="RJ23" name="checkNums">��Ʊ��ǩ����Ԥ������ǩ�²���<br />
																	<input type="checkbox" class="text_tablehead_b_rad" value="RJ24" name="checkNums">Լ��ʹ��֧������ģ�֧������δ��д�����<br />
																	<input type="checkbox" class="text_tablehead_b_rad" value="RJ25" name="checkNums">��Ʊ��δ��ί���տ��<br />
																	<input type="checkbox" class="text_tablehead_b_rad" value="RJ26" name="checkNums">����������Ϣ��֧ƱӰ�����<br />
																	<input type="checkbox" class="text_tablehead_b_rad" value="RJ27" name="checkNums">��Ʊ���˺š���������<br />
																	<input type="checkbox" class="text_tablehead_b_rad" value="RJ28" name="checkNums">��Ʊ���˺�������֧��Ʊ�ݿ���<br />
																	<input type="checkbox" class="text_tablehead_b_rad" value="RJ29" name="checkNums">�ظ���ʾ����<br />
																	<input type="checkbox" class="text_tablehead_b_rad" value="RJ30" name="checkNums">�Ǳ���Ʊ��<br />
																	<input type="checkbox" class="text_tablehead_b_rad" value="RJ31" name="checkNums">��Ʊ��������<br />
																	<input type="checkbox" class="text_tablehead_b_rad" value="RJ32" name="checkNums">��Ʊ���˻�����������<br />
																	<input type="checkbox" class="text_tablehead_b_rad" value="RJ33" name="checkNums">��Ʊ���Ѱ����ʧֹ�������յ���Ժֹ��֪ͨ��<br />
																	<input type="checkbox" class="text_tablehead_b_rad" value="RJ34" name="checkNums">��Ʊ�˿���������ֹ��<br />
																	<input type="checkbox" class="text_tablehead_b_rad" value="RJ35" name="checkNums">����ǩ����֤���<br />
																</td>
															 </tr>
															 <tr>
															 <td class="text_tablehead_b" >
																	�ܾ���Ϣ
																</td>
																<td colspan="3">
																	<textarea name="po.txrjctinf" id="txrjctinf" 
																		rows="2" cols="70" onKeyPress="charPress()" onkeyup="limitLength(value,135,'��ʾ��','txrjctinf')"></textarea>
																</td>
															 </tr>
                                                    		</table>
                                                   </div>
                                                   
                                                    <div class="table_content">
                                                    
                                                   		<table>
                                                    		 
																 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">������Ϣ</span></td>
                                                      </tr>
                                                       <tr>
																<td class="text_tablehead_b" >
																	����
																</td>
																<td colspan="3">
																	<textarea name="po.addtlInf" id="addtlInf" 
																		rows="2" cols="70" onKeyPress="charPress()" onkeyup="limitLength(value,135,'��ʾ��','addtlInf')"></textarea>
																</td>

															</tr>
                                                    		</table>
                                                   </div>
                                                    
                                                    <div class="table_content">
                                                    
                                                    		<table>
                                                    			 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">��ע��Ϣ</span></td>
                                                      </tr>
                                                    		<tr>
															
																<td class="text_tablehead_b" >
																	��ע
																</td>
																<td colspan="3">
																	<textarea name="po.ustrd" id="ustrd" 
																		rows="2" cols="70" onKeyPress="charPress()" onkeyup="limitLength(value,135,'��ʾ��','ustrd')"></textarea>
																</td>

															</tr>
                                                    		</table>
                                                     </div>
                                                     
                                                     
                                                      <div class="table_content">
                                                    <table>  
                                              <tr >
                                          
                                             
										 <td style="width:49%;">
										 </td>
										         <td style="width:26%;" align="center"><font color=red>˵������ɫ*��ע��Ϊ������</font></td>
										  <td style="width:25%;">&nbsp;</td>
									           </tr>                    
                                                   <tr >
                                          
                                             
										 <td style="width:40%;">
										 </td>
										         <td style="width:26%;" align="center">
										       <input name="addButton" type="button" onclick="commitForm();"  style="cursor: pointer"
											class="button" value="��  ��"  />
										         <input id="saveButton" type="reset" style="cursor: pointer" class="button" value="��  ��"   />
										         </td>
										  <td style="width:25%;">&nbsp;</td>
									           </tr>      
                                                    	
                                                    	</table>
                                                    </div>
                                                    
                                           </td>
                                         </tr>
                                      </table>
						              <!--
										<br />
										<span class="STYLE1">˵������ɫ*��ע��Ϊ������</span>
										<br />
										<br />  
										<input name="addButton" type="button" style="cursor: pointer"
											class="button" value="��  ��" onclick="commitForm();" />
										&nbsp;
										<input name="backButton" style="cursor: pointer" type="button"
											class="button" value="��  ��" onclick="history.back();" />-->
										
									</div>
								</td>
							</tr>
						</table>
					</td>
					<td></td>

					
				</tr>
			</table>

 
		  
		  
	 
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		    	 	 
		</form>
	</body>
</html>
 