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
		<title></title>
		
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/transferOfCash.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/addRow.js"></script>
		<script type="text/javascript" src="<%=path%>/js/ybjs/helpUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
		<script type="text/javascript"  src="<%=path%>/js/datePicker/WdatePicker.js"></script>
		<script type="text/javascript"	src="<%=request.getContextPath()%>/js/common/popup.js"></script>
		  <script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>	
		<script type="text/javascript" src="/cnaps/js/common/jquery-1.3.1.js"></script>
		    
		<script type="text/javascript">
		
			function commitForm(){
				 
			   var msg = "@";
			var instgInDrctPty = document.getElementById("instgInDrctPty");
			var instgDrctPty = document.getElementById("instgDrctPty");
			 
			 if(isNull(trim(instgInDrctPty.value))){
					msg += instgInDrctPty.title+"����Ϊ�գ�@";
				    }
			 if(isNull(trim(instgDrctPty.value))){
					msg += instgDrctPty.title+"����Ϊ�գ�@";
				    }
			  
			 
				var boo = msgSplit(msg);
				 
					 
			
				 if(boo){
				 	document.getElementById("tradAmt").value=rmoney(document.getElementById("tradAmt").value) ;
			
			  document.forms[0].submit();
				 
				 }
				 
		 }
		 
		
		
	 
	  
	 
			
			
			 
			 
			 
			 
			 
			 
			 
			 
			 
			 
		</script>
		
		
			<SCRIPT language="javaScript"><!--
  function sendDate(){
  //	var name=document.form1.Username.value;
  //	var pass=document.form1.Userpass.value;
  	
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
	                 
		                
		                  document.form1.pmtGrpId.value=http_request.responseText;
	           
		               
	             
	                }
         ����   } else {
                   alert(http_request.status);
                   document.form1.sss.disabled=false;
             ����     alert("���������ҳ�����쳣��");
         ����  }
     ����}
 ����}
      --></script>
		
		
		
		
		
		
		
		
		
		
		
		
	</head>
	<body onload="sendDate()">
		<form  name="form1" method="post"
			action="<%=path%>/ActivePaymentAction.do?method=paymentNotify">
			<input id="signval" type="hidden" value="sign0">
			<input type="hidden" name="token" value="${token}" />
			 
	   
		  
		  
		  
		  
		  
		  
		  
		  
		    
		  <table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				
				
				
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
									<br/>
						               <table width="689" border="0" cellspacing="0" cellpadding="0" >
                                          <tr>
						                  <td  >
						                  	<div  class="text_title"><span class="text_blue2">�����ͻ�ǩԼЭ�����</span></div>
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
																<td class="text_tablehead_b" >
                                                                        �����Ӳ�������к�
																</td>
																<td>
																		<input name="poNotify.instgInDrctPty" id="instgInDrctPty" type="text" 
													readonly=readonly		value="${bankInfo.bankcode }"						maxlength="19" title=" �����Ӳ�������к�"  />
																

																	<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																֧�����
																</td>
																<td >
																<input name="poNotify.pmtGrpId" id="pmtGrpId" type="text" readonly="readonly"
																		style="width: 180px;" title="֧���������" maxlength="22"
																		  />
																		<font color=red>*</font>
																</td>
															</tr>
															
																<tr>
																<td class="text_tablehead_b" >
																		����ֱ�Ӳ������
																</td>
																<td>
																<input name="poNotify.instgDrctPty" id="instgDrctPty" type="text"  
										readonly=readonly			value="${bankInfo.directbankcode }"					style="width: 180px;" title="����ֱ�Ӳ������" maxlength="22"
																		  />
																	<font color=red>*</font>
																</td>
																<td class="text_tablehead_b" >
																	����ֱ�Ӳ������
																</td>
																<td >
																	<input style="width:180px;" name="poNotify.instdDrctPty" id="instdDrctPty" type="text" size="19"
																		maxlength="19" title="����ֱ�Ӳ������" />	<font color=red>*</font>																	
																</td>
															</tr>
															
															
															
															<tr>
															<td class="text_tablehead_b"  >
																	ҵ���������
																</td>
																<td >
																		<select  name="poNotify.pmtKd" id="pmtKd">
																	 <option value="00100">���</option>
																	  <option value="00200">ˮů��</option>
																	  <option value="00300">ú����</option>
																	  <option value="00400">�绰��</option>
																	  <option value="00500">ͨѶ��</option>
																	  <option value="00600">���շ�</option>
																	  <option value="00700">���ݹ����</option>
																	   <option value="00800">��������</option>
																	   <option value="00900">ѧ�̷�</option>
																	    <option value="01000">���ߵ��ӷ�	 </option>
																	     <option value="01100">��ҵ�������	 </option>
																	       <option value="09001">����</option>
																	</select>	 
																</td>
																<td class="text_tablehead_b" >
																	���ñ�ʶ
																</td>
																<td >
																<input style="width:180px;" name="poNotify.chrgId" id="chrgId" type="text" size="19"
																		maxlength="19" title="���ñ�ʶ" />	<font color=red>*</font>																	
																
																</td>
																
															</tr>
															
																<tr>
																<td class="text_tablehead_b" >
																		��ҵ��ʶ
																</td>
																<td>
																<input name="poNotify.corprtnId" id="corprtnId" type="text"  
																		style="width: 180px;" title="��ҵ��ʶ" maxlength="22"
																		  />
																	<font color=red>*</font>
																</td>
																<td class="text_tablehead_b" >
																	�ͻ���ʶ
																</td>
																<td >
																	<input style="width:180px;" name="poNotify.cstmrId" id="cstmrId" type="text" size="19"
																		maxlength="19" title="�ͻ���ʶ" />	<font color=red>*</font>																	
																</td>
															</tr>
															
															
																
																<tr>
																<td class="text_tablehead_b" >
																		�����˻��� 
																</td>
																<td>
																<input name="poNotify.dbtrNm" id="dbtrNm" type="text"  
																		style="width: 180px;" title="�����˻���" maxlength="52"
																		  />
																	<font color=red>*</font>
																</td>
																<td class="text_tablehead_b" >
																	�������˺�
																</td>
																<td >
																	<input style="width:180px;" name="poNotify.dbtrAcct" id="dbtrAcct" type="text" size="19"
																		maxlength="19" title="�������˺�" />	<font color=red>*</font>																	
																</td>
															</tr>
															
																<tr>
																<td class="text_tablehead_b" >
																		�����˿������к�
																</td>
																<td>
																<input name="poNotify.dbtrIssuer" id="dbtrIssuer" type="text"  
																		style="width: 180px;" title="�����˿������к�" maxlength="22"
																		  />
																	<font color=red>*</font>
																</td>
																<td class="text_tablehead_b" >
																	�����������к�
																</td>
																<td >
																	<input style="width:180px;" name="poNotify.dbtrMmbId" id="dbtrMmbId" type="text" size="19"
																		maxlength="19" title="�����������к�" />	<font color=red>*</font>																	
																</td>
															</tr>
															
																<tr>
																<td class="text_tablehead_b" >
																	�������к�
																</td>
																<td>
																<input name="poNotify.dbtrBrnchId" id="dbtrBrnchId" type="text"  
																		style="width: 180px;" title="�������к�" maxlength="22"
																		  />
																	<font color=red>*</font>
																</td>
																
															</tr>
															
																<tr>
																<td class="text_tablehead_b" >
																	�տ�������
																</td>
																<td >
																	<input style="width:180px;" name="poNotify.cdtrNm" id="cdtrNm" type="text" size="19"
																		maxlength="19" title="�տ�������" />	<font color=red>*</font>																	
																 
																 
																</td>
																<td class="text_tablehead_b" >
																	�տ����˺� 
																</td>
																<td >
																	<input style="width:180px;" name="poNotify.cdtrAcct" id="cdtrAcct" type="text" size="19"
																		maxlength="19" title="�տ����˺� " />	<font color=red>*</font>																	
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" >
																	�տ��˿������к�
																</td>
																<td >
																	<input style="width:180px;" name="poNotify.cdtrIssuer" id="cdtrIssuer" type="text" size="19"
																		maxlength="19" title="�տ��˿������к�" />	<font color=red>*</font>																	
															
																	 
																 	</td>
																<td class="text_tablehead_b" >
																	�տ��������к�
																</td>
																<td >
																	<input style="width:180px;" name="poNotify.cdtrMmbId" id="cdtrMmbId" type="text" size="19"
																		maxlength="19" title="�տ��������к�" />	<font color=red>*</font>																	
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" >
															�տ����к�
																</td>
																<td >
																	<input style="width:180px;" name="poNotify.cdtrBrnchId" id="cdtrBrnchId" type="text" size="19"
																		maxlength="19" title="���տ����к�" />	<font color=red>*</font>																	
															 
																 	</td>
																<td class="text_tablehead_b" >
																	 
																</td>
																<td >
																	 		</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" >
																	�ɷѽ��
																</td>
																<td >
																	<input style="width:180px;" name="poNotify.tradAmt" id="tradAmt" type="text" size="19"
																		maxlength="8" title="�ɷѽ��" 
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';"
																		
																		/>	<font color=red>*</font>																	
															
																 
																 	</td>
																<td class="text_tablehead_b" >
																	�ɷ�����
																</td>
																<td >
																	<input style="width:180px;" name="poNotify.tradDt" id="tradDt"     type="text" size="19"
																		maxlength="19" title="�ɷ�����"  Class="Wdate"	  onclick="WdatePicker()" />	<font color=red>*</font>																	
																</td>
															</tr>
															</table>
                                                </div>
                                                 
                                                                                                   
                                                 
                                                         <div class="table_content">
                                                    	 
                                                    	     
                                                   <table>  
                                              <tr align="center">
                                              <td class="text_tablehead_b">&nbsp;</td>
                                               <td class="text_tablehead_b">&nbsp;</td> <td class="text_tablehead_b">&nbsp;</td>
                                              <td class="text_tablehead_b" > 
                                              
										<font color=red>˵������ɫ*��ע��Ϊ������</font>
										 </td>
										 <td class="text_tablehead_b">&nbsp;</td>
                                         <td class="text_tablehead_b">&nbsp;</td>
										 
										 
                                              </tr>                    
                                                   
                                                    		<tr><td class="text_tablehead_b">&nbsp;</td>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    			<td class="text_tablehead_b">
                                                    				<input name="addButton" type="button" style="cursor: pointer"
											class="button" value="��  ��" onclick="commitForm();" />
                                                    			</td>
                                                    			<td  class="text_tablehead_b">&nbsp;</td>
                                                    	 
                                                    			<td  class="text_tablehead_b">&nbsp;</td>
                                                    			<td  class="text_tablehead_b">&nbsp;</td>
                                                    		</tr>
                                                    	</table>
                                                    </div>
                                                 
                                                         </div>
                                                                                        
                                      
                                      </table>
						              
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
