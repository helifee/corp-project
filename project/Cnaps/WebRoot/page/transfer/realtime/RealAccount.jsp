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
		<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
        <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
        <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
       <link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
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
			<script type="text/javascript" src="<%=path%>/js/common/jquery-1.3.1.js"></script>
			<script type="text/javascript"	src="<%=request.getContextPath()%>/js/common/popup.js"></script>
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
		
		
		
		
		
		
		
		
		
		
		
		
		
	
	
	
	
	
		<script type="text/javascript">
			function selectBankInfo(){
				var url ="<%=request.getContextPath()%>";
				var instdPty= document.getElementById("instdPty");
				var instdPtyNm=document.getElementById("instdPtyNm");
				var instdDrctPty=document.getElementById("instdDrctPty");
				selectBank(url,instdPty,instdPtyNm,instdDrctPty);
			}
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
			function selectLoad(){
			 	transferOfClient(temp,'select_input');
				
			}
		 
			 
			 	function zcx(val){
				if(val.value=='Y'){
					$("#handingCharge").val("");//������
					$("#postCharge").val("");//�ʵ��
					$("#otherPlaceCharge").val("");//��ؼ���
					$("#handingCharge").attr("readonly",true);
					$("#postCharge").attr("readonly",true);
					$("#otherPlaceCharge").attr("readonly",true);
					jisuan();
				}else{
					$("#handingCharge").attr("readonly",false);
					$("#postCharge").attr("readonly",false);
					$("#otherPlaceCharge").attr("readonly",false);
				}
			}
 
			function jisuan(){
				var sxf = $("#handingCharge").val();
				var ydf = $("#postCharge").val();
				var ydjs = $("#otherPlaceCharge").val();
				var hkje = $("#moneyNum").val();//�����
			 
				document.getElementById("totalMoney").value = fmoney(rmoney(sxf)+rmoney(ydf)+rmoney(ydjs)+rmoney(hkje), 2);
			}
			 
			 
			 
 
			
			 
			 
			 
			 
			 
			 
			 
			 
			 
			 
			
				function commitForm(){
			   var msg = "@";
				var instdPty = document.getElementById("instdPty");
				 
              var cstmrAcctId = document.getElementById("cstmrAcctId");
                var cstmrAcctNm = document.getElementById("cstmrAcctNm");
               var chckCdVal = document.getElementById("chckCdVal"); 
				if(isNull(trim(instdPty.value))){
					msg += instdPty.title+"����Ϊ�գ�@";
				}
				 if(isNull(trim(cstmrAcctNm.value))){
					msg += cstmrAcctNm.title+"����Ϊ�գ�@";
				}
				 if(isNull(trim(cstmrAcctId.value))){
					msg += cstmrAcctId.title+"����Ϊ�գ�@";
				}
			  if(isNull(trim(chckCdVal.value))){
					msg += chckCdVal.title+"����Ϊ�գ�@";
				}
				var boo = msgSplit(msg);
				 
			  	 
				if(boo){
					   document.forms[0].submit();
					}
				 
		 }
		</script>
	</head>
	<body onload="sendDate()">
		<form method="post" name="form1"
			action="<%=path%>/RealAccountAction.do?method=saveRealAccount">
			<input id="signval" type="hidden" value="sign0">
			<input type="hidden" name="token" value="${token}" />
			<!-- ��ֹ�ظ��ύ -->
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
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
						                  	<div  class="text_title"><span class="text_blue2">ʵʱ�˻���ѯ¼��</span></div>
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
																		<!-- ϵͳ���-->
																</td>
																<td >
																	<input name="systemCd" id="systemCd" type="hidden" 
																	value="BEPS" readonly=readonly	maxlength="19" title="ϵͳ���"  />
																
																	 
																</td>
																<td class="text_tablehead_b"  >
																	<!--  ֧�����-->
																</td>
																<td >
																		<input name="po.pmtGrpId" id="pmtGrpId" type="hidden" readonly="readonly"
																		style="width: 180px;" title="֧���������" maxlength="22"
																		  />
																 
																</td>
															</tr>
                                                      
                                                      
															<tr>
																<td class="text_tablehead_b" >
																	<!--�����������к� -->
																</td>
																<td>
																<input  name="po.instgPty" id="instgPty"   type="hidden" readonly=readonly	
														 	value="${bankInfo.bankcode }"				 maxlength="20" title="�����������к�" />
																	 
																	 
																</td>
																<td class="text_tablehead_b" >
																	<!-- ��������������-->
																</td>
																<td>
																<input  name="po.instgPtyNm" id="instgPtyNm" type="hidden" readonly=readonly	
														 	value="${bankInfo.participantname }"				 maxlength="20" title="��������������" />
																	 
																	 
																</td>
															</tr>
																<tr>
																
																<td class="text_tablehead_b" >
																	�������к�
																</td>
																<td >
																	<input  name="po.instdPty" style="width:80px"  id="instdPty" type="text"
																		 maxlength="20" title="�������к�" />
																	 <input type="button" class="button" value="����"
																			onclick="selectBankInfo()">
																	<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	����������
																</td>
																<td >
																	<input  name="po.instdPtyNm" id="instdPtyNm" type="text"
																		 maxlength="20" title="����������" />
																	 
																	<span  class="STYLE1">*</span>
																</td>
															</tr>
																<tr>
																<td class="text_tablehead_b" >
																	<!-- ����ֱ�Ӳ������ -->
																</td>
																<td>
																<input  name="po.instgDrctPty" id="instgDrctPty" type="hidden"
															readonly=readonly			value="${bankInfo.directbankcode }"				 maxlength="20" title="�����������к�" />
																	 
																	 
																</td>
																<td class="text_tablehead_b" >
																<!--	����ֱ�Ӳ������v -->
																</td>
																<td >
																	<input  name="po.instdDrctPty" id="instdDrctPty" type="hidden"
																		 maxlength="20" title="�������к�" />
																	 
																	 
																</td>
															</tr>
															
															
															<tr>
																<td class="text_tablehead_b" >
																	�˻�֧������
																</td>
																<td>
																	<select  name="po.acctPmtTp" id="acctPmtTp" title="�˻�֧������">
																	 <option value="AT00">�����˺�</option>
																	 <option value="AT01">���ǿ�</option>
																	 <option value="AT02">��ǿ� </option>
																	 <option value="AT03">����</option>
																	   
																	</select>	 
																
																 
																</td>
																<td class="text_tablehead_b" >
																	��ѯ����״̬
																</td>
																<td>
																
																<select  name="po.chckMd" id="chckMd" title="��ѯ����״̬">
																	 <option value="QT00">��ѯ��� </option>
																	  <option value="QT01">��ѯ�˻�״̬</option>
																	   
																	   
																	</select>	 
																 
																</td>
																
															</tr>
															<tr>
															<td class="text_tablehead_b" >
																	�ͻ��˻��˺�
																</td>
																<td >
																	<input  name="po.cstmrAcctId" id="cstmrAcctId" type="text"
																		 maxlength="32" title="�ͻ��˻��˺�" />
																	 
																	<span  class="STYLE1">*</span>
																</td> 
																<td class="text_tablehead_b" >
																	�ͻ��˻�����
																</td>
																<td>
																<input  name="po.cstmrAcctNm" id="cstmrAcctNm" type="text"
																		 maxlength="20" title="�ͻ��˻�����" />
																	 
																	<span  class="STYLE1">*</span>
																</td>
																
															</tr>
															<tr>
															<td class="text_tablehead_b" >
																	 ������֤���㷨 
																</td>
																<td >
																
																<select  name="po.chckMd" id="chckMd" title="������֤���㷨">
																	 <option value="CD00">֧�����뵥����</option>
																	  <option value="CD01">֧������������</option>
																	  <option value="CD04">�ͻ����� </option>
																	  <option value="CD05">��Ȩ��</option>
																	   
																	</select>	 
																	 
																</td>
																<!--  <td class="text_tablehead_b" >
																	������֤�볤��
																</td>
																<td>
																<input  name="po.chckCdLen" id="chckCdLen" type="text"
																		 maxlength="20" title="������֤�볤��" />
																	 
																	<span  class="STYLE1">*</span>
																</td>-->
																<td class="text_tablehead_b" >
																	������֤��ֵ
																</td>
																<td >
																	<input  name="po.chckCdVal" id="chckCdVal" type="password"
																		 maxlength="20" title="������֤��ֵ" />
																	 
																	<span  class="STYLE1">*</span>
																</td>
															</tr>
															<tr>
																
																
															</tr>
															</table>
                                                  </div>
                                                  
                                                          <div class="table_content">
                                                                                                  
                                                                            		<table>
                                                    		
																 
                                                       	 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">��ע��Ϣ</span></td>
                                                      </tr><tr>
																<td class="text_tablehead_b" >
																	��ע
																</td>
																<td colspan="3">
																	<textarea name="poPrint.ustrd" id="ustrd" 
																		rows="2" cols="60" onKeyPress="charPress()" onkeyup="limitLength(value,135,'��ʾ��','ustrd')"></textarea>
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
										       <input name="addButton" type="button" style="cursor: pointer"
											class="button" value="��  ��" onclick="commitForm();" />
										          <input id="saveButton" type="reset" style="cursor: pointer" class="button" value="��  ��"   /> 
										         </td>
										  <td style="width:25%;">&nbsp;</td>
									           </tr>      
                                                    	
                                                    	</table>
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
					<td></td>

					
				</tr>
			</table>

 
		  
		  
	 
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
	
		  
		  
		  
		  
		  
		  
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
														 
													 
		</form>
	</body>
</html>
