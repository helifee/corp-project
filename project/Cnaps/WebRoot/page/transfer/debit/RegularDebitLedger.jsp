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
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title>
	<c:choose>
		<c:when test="${syspara == 'RegularDebitLedger'}">���ڽ��-����</c:when>
		<c:when test="${syspara == 'RegularDebitTransfer'}">���ڽ��-ת��</c:when>
	</c:choose>
</title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script type='text/javascript' src='<%=path%>/dwr/interface/CommonServices.js'></script>
	<script type='text/javascript' src='<%=path%>/dwr/interface/DebitService.js'></script>
	  <script type='text/javascript' src='<%=path%>/dwr/engine.js'></script>
	  <script type='text/javascript' src='<%=path%>/dwr/util.js'></script>
  
	  
    
<style type="text/css">
input {width: 150px;}
</style>
 
<script type="text/javascript">
		function queryBypmtgrpid(paymentGroupNum){
		        alert(paymentGroupNum);
		     
		        
			  	 CommonServices.queryRegularDebit(paymentGroupNum,function(obj){
			  	  alert(obj.pmtgrpid);
				  if(obj==null||obj.pmtgrpid==null){
				  alert("֧��������Ų�����11������ʧЧ��δ�鵽�������");
				 
				   return;
				  }
				  }
				  )
			  			
		

			}
	//�����ܶ�
	function summxhzje(obj){
		var totalamount = 0;
		totalamount = parseFloat((this.document.getElementById("servicecharge").value == "")?"0.00":this.document.getElementById("servicecharge").value)+
		parseFloat((this.document.getElementById("postage").value == "")?"0.00":this.document.getElementById("postage").value)+
		parseFloat((this.document.getElementById("outstationcharge").value == "")?"0.00":this.document.getElementById("outstationcharge").value)+
		parseFloat((this.document.getElementById("amount").value == "")?"0.00":this.document.getElementById("amount").value);
		
		obj.value=totalamount;
	}
	
	 

	 
	function ckzfjyzh(){
		if(this.document.getElementById("amount").value != this.document.getElementById("aclmtamt").value){
			alert("�տ��� �� �ۼ�¼���� ������");
		}else{
			if(document.getElementById("pmtgrpid").value.replace(/\s/g,"") != ""){
				window.setTimeout(ckeckwethornull,5000);
			}else{
				ckeckwethornull();
			}
		}
	}
	
	 
	
</script>

</head>
<body>

<!--   
<html     form method="post" action="/regularDebitAction.do?method=sendMsgcreatedetails&syspara=input">-->

<html:form method="post" action="/RegularDebitTurnAction.do?method=sendturn" > 
	<input id="business_name" type="hidden" value="RegularDebitLdeger">
	<input id="repeatmark" type="hidden" value="0">
	
	<c:choose>
											<c:when test="${syspara == 'RegularDebitLedger'}"><input type="hidden" name="po.signmd" value="04"/></c:when>
											<c:when test="${syspara == 'RegularDebitTransfer'}"><input type="hidden" name="po.signmd" value="03"/></c:when>
										</c:choose>
	
	
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
						                  	<div  class="text_title"><span class="text_blue2">
						                 <c:choose>
								<c:when test="${syspara == 'RegularDebitLedger'}">���ڽ��-����</c:when>
								<c:when test="${syspara == 'RegularDebitTransfer'}">���ڽ��-ת��</c:when>
							</c:choose>
						                  	</span></div>
						                  </td>
						                </tr>
                                         <tr>
                                           <td>
                                           	<div class="table_content"><hr/></div>
                                                     <div class="table_content">
                                                      <table >
																 
													<tr>
                                                      	<td colspan="4"><span class="text_tablehead">������Ϣ</span></td>
                                                      </tr>			
															<tr>
																<td class="text_tablehead_b" >
																	֧���������
																</td>
																<td>	
													<input type="text" style="width: 180px;" name="po.pmtgrpid"  id="pmtgrpid" maxlength="20"  onblur="queryBypmtgrpid(this.value)"/>																	<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																ҵ�����ͱ���
																</td>
																<td >
																	<select name="po.pmttp" id="pmttp" style="width: 180px;">
				                   			<option value="F100">���ڽ��ҵ��</option>
				                   		</select>
																</td>
															</tr>
															
															 
															
															
															
															<tr>
															<td class="text_tablehead_b"  >
																	��ٻ�ִ����
																</td>
																<td >
																		<input type="text" name="po.rcptltd" style="width: 180px;" id="rcptltd" maxlength="2" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
				                  	<font color="#FF0000">*</font>
																</td>
																<td class="text_tablehead_b" >
																	<!--�˵��˱�ʶ��-->
																</td>
																<td >
																	<!--<input name="endtoendid" id="dddbsh" type="text" 
																		maxlength="19" title="�˵��˱�ʶ��"  />
																
																	<span  class="STYLE1">*</span>-->
																</td>
																
															</tr>
															</table>
                                                 </div>
                                                 <div class="table_content"><hr/></div>
                                                   <div class="table_content">
                                                 	<table>
                                                 	 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">��������Ϣ</span></td>
                                                      </tr>
                                                 		<tr>
															<td class="text_tablehead_b"  >
																	֤������
																</td>
																<td>
																	<input type="text" readonly="readonly" id="proposercerttp" style="width: 180px;"/>
																</td>
															
																<td class="text_tablehead_b" >
																	������֤����
																</td>
																<td >
																	<input type="text" readonly="readonly" id="proposercertid" style="width: 180px;"/>	</td>
															</tr>
																<tr>
																	
																<td class="text_tablehead_b">
																		֤�����й���
																</td>
																<td >
																		<input type="text" readonly="readonly" id="proposercertissued" style="width: 180px;"/>
															
																</td>

																<td class="text_tablehead_b" >
																	��������ϵ�绰
																</td>
																<td>
																	<input type="text" readonly="readonly" id="proposertel" style="width: 180px;"/>
																</td>
																</tr>
																
																
																<tr>
																<td class="text_tablehead_b" >
																	�����˿ͻ���
																</td>
																<td >
																	<input type="text" readonly="readonly" id="proposercstmrid" style="width: 180px;"/>
																</td>

																<td class="text_tablehead_b" >
																	�������˻�����
																</td>
																<td>
																			<select id="proposeraccttp" style="width: 180px;">
				                   			<option value="">��ѡ��</option>
				                   			<option value="AT00">�Թ��˻�</option>
				                   			<option value="AT01">���˴��ǿ��˻�</option>
				                   			<option value="AT02">���˽�ǿ�</option>
				                   			<option value="AT03">����</option>
				                   			<option value="AT04">����</option>
				                   		</select>
																</td>
																
																</tr>
																<tr>
																	
																<td class="text_tablehead_b"  >
																	�������˻�����
																</td>
																<td >
																	<input type="text" readonly="readonly" id="proposeracctccy" style="width: 180px;"/>
															
																</td>
																</tr>
                                                 	</table>
                                              </div>
                                                    <div class="table_content"><hr/></div>
                                                    <div class="table_content">
                                                  		<table>
                                                  		 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">��������Ϣ</span></td>
                                                      </tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	�տ����˺�
																</td>
																<td>
																		<input type="text" name="po.cdtracct" style="width: 180px;" id="cdtracct" maxlength="32"/>
				                   		<font color="#FF0000">*</font>
																</td>
																<td class="text_tablehead_b">
																	�տ�������
																</td>
																<td>
																	<input type="text" name="po.cdtrnm" id="cdtrnm" style="width: 180px;" maxlength="60"/>
				                   		<font color="#FF0000">*</font>
																</td>
                                                  			</tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	�տ����к�
																</td>
																<td>
																	<input type="text" name="po.cdtrbrnchid" id="cdtrbrnchid" style="width: 180px;" maxlength="14"/>
				                   		<font color="#FF0000">*</font> 
																</td>
																<td class="text_tablehead_b" >
																		�տ�������
																</td>
																<td>
																	<input type="text" name="po.cdtrbrnchnm" id="cdtrbrnchnm" style="width: 180px;" maxlength="60"/>
				                   		<font color="#FF0000">*</font>
																</td>
                                                  			</tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	  		�տ��˿������к�
																</td>
																<td colspan="3">
																		<input type="text" name="po.cdtrissuer" id="cdtrissuer" style="width: 180px;" maxlength="14"/>
				                   		<font color="#FF0000">*</font>
																</td>
                                                  			</tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	�տ��˿���������
																</td>
																<td>
																	<input type="text" name="po.cdtrissuernm" id="cdtrissuernm" style="width: 180px;" maxlength="60"/>
				               
																</td>
																<td class="text_tablehead_b">
																	�տ��������к�
																</td>
																<td>

																	<input type="text" name="po.cdtrmmbid" id="cdtrmmbid" style="width: 180px;" maxlength="14"/>
				                   		<font color="#FF0000">*</font>
																</td>
                                                  			</tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	�տ��˵�ַ
																</td>
																<td colspan="4">
																	<textarea name="po.cdtraddr" id="cdtraddr"  style="width: 180px;" 
																		rows="4" onKeyPress="actkeyPress()"  onkeyup="limitLength(value,70,'��ʾ��','address')"></textarea>
																</td>
                                                  			</tr>
                                                  		</table>
                                                </div>
                                                  
                                                   <div class="table_content"><hr/></div>
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
																		<input type="text" name="po.currencycd" style="width: 180px;" id="currencycd" readonly="readonly" value="CNY"/>
				                  	<font color="#FF0000">*</font>
																</td>
																<td class="text_tablehead_b" >
																	�ܶ�
																</td>
																<td >
																		<input type="text" name="po.totalamt" style="width: 180px;" id="totalamt" maxlength="19" readonly="readonly"/>
				                
																</td>
																
																</tr>
																<tr>
																	<td class="text_tablehead_b" >
																		�տ���
																	</td>
																	<td colspan="4">
																	<input type="text" id="amount" readonly="readonly" style="width: 180px;"/>
																	</td>
																	
																</tr>
                                                  		</table>
                                                  	</div>
                                                  	<div class="table_content"><hr/></div>
                                                    <div class="table_content">
                                                    		<table>
                                                    					 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">�Ʒ���Ϣ</span></td>
                                                      </tr>
                                                    			<tr>
																<td class="text_tablehead_b" align="right">
																��ϸ����
																</td>
																<td>
																 
																	
																	<input type="text" id="nboftxs" readonly="readonly" style="width: 180px;"/>
																<td class="text_tablehead_b" align="right" >
																	�ۼ�¼����
																</td>
																<td>
															<input type="text" id="aclmtamt" readonly="readonly" style="width: 180px;"/>
															</tr>
															<tr>
															<td class="text_tablehead_b" >
																	������
																</td>
																<td>
																		<input type="text" name="po.servicecharge" id="servicecharge" style="width: 180px;"
				                   		 maxlength="19" onkeyup="fun_kd(this)" onblur="amountformat(this)"/>
				                 
																</td>
																<td class="text_tablehead_b" >
																	�ʵ��
																</td>
																<td>
																	<input type="text" name="po.postage" id="postage" maxlength="19" style="width: 180px;"
				                   		onkeyup="fun_kd(this)" onblur="amountformat(this)"/>
																</td>
															</tr>
															<tr>
																
																<td class="text_tablehead_b" >
																	��ؼ���
																</td>
																<td  >
																	<input type="text" name="po.outstationcharge" id="outstationcharge" style="width: 180px;"
				                   		maxlength="19" onkeyup="fun_kd(this)" onblur="amountformat(this)"/>
																</td>
																	 
																<td class="text_tablehead_b" >
																	����
																</td>
																<td >
																<select name="po.waive" id="waive" style="width: 180px;">
				                   			<option value="N">������</option>
				                   			<option value="Y">����</option>
				                   		</select>
																</td>
															</tr>
                                                    		</table>
                                                    </div>
                                                  
                                                   
                                           </td>
                                         </tr>
                                      </table>
						              
										<br />
										<span class="STYLE1">˵������ɫ*��ע��Ϊ������</span>
										<br />
										<br />
										<input name="addButton" type="button" style="cursor: pointer"
											class="button" value="��  ��"  onclick="ckeckwethornull();" />
										&nbsp;
										<input name="backButton" style="cursor: pointer" type="button"
											class="button" value="��  ��" onclick="history.back();" />
										<br />
										<br />
									</div>
								</td>
							</tr>
						</table>
					</td>
					<td></td>

					
				</tr>
			</table>

 
		  
		  
	  
		  
		  
		  
		    

	 	
			
			
			
			
			
			
			
			
			
			
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
 	
	<!--
	<table id="querybook" width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
		
	  	<tr valign="top">
	    	<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);">
	    	<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);">
	      		<br/>
	      		<table width="100%" border="0" cellspacing="0" cellpadding="0" >
	        		<tr>
	        		<td width="10">&nbsp;</td>
	        		<td>
	        			<div align="center">
						<table border="0" cellspacing="0" cellpadding="0">
							<th class="text_tablehead_b" >
			        		<h4 align="center">
			        		<c:choose>
								<c:when test="${syspara == 'RegularDebitLedger'}">���ڽ��-����</c:when>
								<c:when test="${syspara == 'RegularDebitTransfer'}">���ڽ��-ת��</c:when>
							</c:choose>
							</h4>
			        </th>
	        		
	        		<tr>
	          			<td>
		          			<table border="1" bordercolor="#BDD#F0" cellspacing="0" cellpadding="0" bgcolor="#f4f8fd" >	          			
                				<tr>
                					<td class="text_tablehead_b" width="2" rowspan="3" align="center">
                						<span style="margin-left: 7px;">��</span>
																	<span style="margin-left: 7px;">��</span>
																	<span style="margin-left: 7px;">��</span>
																	<span style="margin-left: 7px;">Ϣ</span>
                						<c:choose>
											<c:when test="${syspara == 'RegularDebitLedger'}"><input type="hidden" name="po.signmd" value="04"/></c:when>
											<c:when test="${syspara == 'RegularDebitTransfer'}"><input type="hidden" name="po.signmd" value="03"/></c:when>
										</c:choose>
										<input type="hidden" name="po.systemcd" value="BEPS"/>
                					</td>
                					<td class="text_tablehead_b" align="right" >
				                   	֧���������
				                   	</td>
				                  	<td colspan="4">
				                   		<input type="text" style="width: 180px;" name="po.pmtgrpid"  id="pmtgrpid" maxlength="20" onblur="return startmethod('<%=path %>/regularDebitAction.do?method=sendMsgDebit&syspara=cxzfjyzh&pmtgrpid='+this.value,'0',this.value)"/>
				                  		<font color="#FF0000">*</font>
				                   	</td>
				                </tr>
				                <tr>
				                   	<td  class="text_tablehead_b" align="right" >
				                  	ҵ�����ͱ���
				                  	</td>
				                  	<td >
				                   		<select name="po.pmttp" id="pmttp" style="width: 180px;">
				                   			<option value="F100">���ڽ��ҵ��</option>
				                   		</select>
				                  
				                 </tr>
				                 <tr>
				                   <td  class="text_tablehead_b" align="right">
				                  	��ٻ�ִ����
				                  	</td>
				                  	<td >
				                   		<input type="text" name="po.rcptltd" style="width: 180px;" id="rcptltd" maxlength="2" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
				                  	<font color="#FF0000">*</font>
				                  	</td>
				                 </tr>
				                 <tr></tr>
				                 <tr>
				                  	<td class="text_tablehead_b" width="2" rowspan="4"  align="center">
                						<span style="margin-left: 7px;">��</span>
										<span style="margin-left: 7px;">��</span>
										<span style="margin-left: 7px;">��</span>
										<span style="margin-left: 7px;">��</span>
										<span style="margin-left: 7px;">Ϣ</span>
                					</td>
                					<td class="text_tablehead_b" align="right">
				                  		֤������
				                  	</td>
				                  	<td>
				                   		<input type="text" readonly="readonly" id="proposercerttp" style="width: 180px;"/>
				                  	</td>
                					<td  class="text_tablehead_b" align="right"  colspan="2">

				                		������֤����
				                	</td>
				                  	<td >
				                   		<input type="text" readonly="readonly" id="proposercertid" style="width: 180px;"/>
				                  	</td>
				                 </tr>
				                 <tr>
				                	 <td class="text_tablehead_b" align="right">
				                  		֤�����й���
				                  	</td>
				                  	<td>
				                   		<input type="text" readonly="readonly" id="proposercertissued" style="width: 180px;"/>
				                  	</td>
				                 	<td class="text_tablehead_b" align="right"  colspan="2">
				                   		��������ϵ�绰
				                   	</td>
				                  	<td>
				                   		<input type="text" readonly="readonly" id="proposertel" style="width: 180px;"/>
				                    </td>
				                 </tr>
				                 <tr>
				                  	<td  class="text_tablehead_b" align="right">
				                  		�����˿ͻ���
				                  	</td>
				                  	<td >
				                   		<input type="text" readonly="readonly" id="proposercstmrid" style="width: 180px;"/>
				                  	</td>
				                  	<td class="text_tablehead_b" align="right"  colspan="2">
				                  		�������˻�����
				                  	</td>
				                  	<td>
				                   		<select id="proposeraccttp" style="width: 180px;">
				                   			<option value="">��ѡ��</option>
				                   			<option value="AT00">�Թ��˻�</option>
				                   			<option value="AT01">���˴��ǿ��˻�</option>
				                   			<option value="AT02">���˽�ǿ�</option>
				                   			<option value="AT03">����</option>
				                   			<option value="AT04">����</option>
				                   		</select>
				                  	</td>
				                  </tr>
				                  <tr>
				                  	<td class="text_tablehead_b" align="right">
				                  		�������˻�����
				                  	</td>
				                  	<td colspan="4">
				                   		<input type="text" readonly="readonly" id="proposeracctccy" style="width: 180px;"/>
				                  	</td>
				                  	
				                  </tr>
				                 
				                   <tr></tr>
				                 <tr>
				                  	<td  width="2" rowspan="5"  width="2" class="text_tablehead_b" align="center">
                						<span style="margin-left: 7px;">��</span>
																<span style="margin-left: 7px;">��</span>
																<span style="margin-left: 7px;">��</span>
																<span style="margin-left: 7px;">��</span>
																<span style="margin-left: 7px;">Ϣ</span>
                					</td>
                					<td  class="text_tablehead_b" align="right">
				                		�տ����˺�
				                	</td>
				                  	<td >
				                   		<input type="text" name="po.cdtracct" style="width: 180px;" id="cdtracct" maxlength="32"/>
				                   		<font color="#FF0000">*</font>
				                  	</td>
				                  	<td  class="text_tablehead_b" align="right"  colspan="2">
				                  		�տ�������
				                  	</td>
				                  	<td >
				                   		<input type="text" name="po.cdtrnm" id="cdtrnm" style="width: 180px;" maxlength="60"/>
				                   		<font color="#FF0000">*</font>
				                  	</td>
				                 </tr>
				                  <tr>
				                  	<td class="text_tablehead_b" align="right">
				                  		�տ����к�
				                  	</td>
				                  	<td>
				                   		<input type="text" name="po.cdtrbrnchid" id="cdtrbrnchid" style="width: 180px;" maxlength="14"/>
				                   		<font color="#FF0000">*</font>                  		
				                  	</td>
				                  	<td class="text_tablehead_b" align="right"  colspan="2">
				                  		�տ�������
				                  	</td>
				                  	<td>
				                   		<input type="text" name="po.cdtrbrnchnm" id="cdtrbrnchnm" style="width: 180px;" maxlength="60"/>
				                   		<font color="#FF0000">*</font>
				                    </td>
				                  </tr>
				                  <tr>
				                  	<td class="text_tablehead_b" align="right" width="140px">
				                  		�տ��˿������к�
				                  	</td>
				                  	<td>
				                   		<input type="text" name="po.cdtrissuer" id="cdtrissuer" style="width: 180px;" maxlength="14"/>
				                   		<font color="#FF0000">*</font>
				                  	</td>
				                  	<td class="text_tablehead_b" align="right"  colspan="2" width="140px">
				                  		�տ��˿���������
				                  	</td>
				                  	<td >
				                   		<input type="text" name="po.cdtrissuernm" id="cdtrissuernm" style="width: 180px;" maxlength="60"/>
				                   	</td>
				                   </tr>
				                   <tr>
				                   <td class="text_tablehead_b" align="right">
				                  		�տ��������к�
				                  	</td>
				                  	<td colspan="4">
				                   		<input type="text" name="po.cdtrmmbid" id="cdtrmmbid" style="width: 180px;" maxlength="14"/>
				                   		<font color="#FF0000">*</font>	                   		
				                  	</td>
				                  </tr>
				                  <tr>
				                  	<td class="text_tablehead_b" align="right">�տ��˵�ַ</td>
				                  	<td colspan="4">
				                   		<textarea name="po.cdtraddr" id="cdtraddr"  style="width: 180px;" 
																		rows="4" onKeyPress="actkeyPress()"  onkeyup="limitLength(value,70,'��ʾ��','address')"></textarea>
				                  	</td>
				                  </tr>
				                  <tr></tr>
				                 <tr>
				                 <td  rowspan="3"  width="2" class="text_tablehead_b" align="center">
																	<span style="margin-left: 7px;">��</span>
																	<span style="margin-left: 7px;">��</span>
																	<span style="margin-left: 7px;">��</span>
																	<span style="margin-left: 7px;">Ϣ</span>
																</td>
				                 	<td class="text_tablehead_b">
				                  		���ִ���
				                  	</td>
				                  	<td>
				                   		<input type="text" name="po.currencycd" style="width: 180px;" id="currencycd" readonly="readonly" value="CNY"/>
				                  	<font color="#FF0000">*</font>
				                  	</td>
				                  	 	<td class="text_tablehead_b" align="right"  colspan="2">
				                  		�ܶ�
				                  	</td>
				                  	<td>
				                   		<input type="text" name="po.totalamt" style="width: 180px;" id="totalamt" maxlength="19" readonly="readonly"/>
				                  	</td>
				                 </tr>
				                 
				                  <tr>
				                  	<td class="text_tablehead_b">
				                  		�տ���
				                  	</td>
				                  	<td colspan="4">
				                   		<input type="text" id="amount" readonly="readonly" style="width: 180px;"/>
				                  	</td>
				                  </tr>
				                   <tr>
				                  	<td class="text_tablehead_b">
				                  		�ۼ�¼����
				                  	</td>
				                  	<td>
				                   		<input type="text" id="aclmtamt" readonly="readonly" style="width: 180px;"/>
				                  	</td>
				                  	<td class="text_tablehead_b" align="right"  colspan="2">
				                  		�ۼ�¼�����
				                  	</td>
				                  	<td>
				                   		<input type="text" id="nboftxs" readonly="readonly" style="width: 180px;"/>
				                  	</td>
				                  </tr>
				                  <tr></tr>
				                  <tr>
				                 <td  rowspan="4"  width="2" class="text_tablehead_b" align="center">
																	<span style="margin-left: 7px;">��</span>
																	<span style="margin-left: 7px;">��</span>
																	<span style="margin-left: 7px;">��</span>
																	<span style="margin-left: 7px;">��</span>
																	<span style="margin-left: 7px;">Ϣ</span>
																</td>
																</tr>
				                  <tr>
				                  	<td class="text_tablehead_b">
				                  		����
				                  	</td>
				                  	<td colspan="4">
				                   		<select name="po.waive" id="waive" style="width: 180px;">
				                   			<option value="N">������</option>
				                   			<option value="Y">����</option>
				                   		</select>
				                  	</td>
				                  </tr>
				                  <tr>
				                  	<td class="text_tablehead_b">
				                  		������
				                  	</td>
				                  	<td>
				                   		<input type="text" name="po.servicecharge" id="servicecharge" style="width: 180px;"
				                   		 maxlength="19" onkeyup="fun_kd(this)" onblur="amountformat(this)"/>
				                  	</td>
				                  	<td class="text_tablehead_b" align="right"  colspan="2">
				                  		�ʵ��
				                  	</td>
				                  	<td>
				                   		<input type="text" name="po.postage" id="postage" maxlength="19" style="width: 180px;"
				                   		onkeyup="fun_kd(this)" onblur="amountformat(this)"/>
				                  	</td>
				                  </tr>
				                  <tr>
				                  	<td class="text_tablehead_b" align="right" >
				                  		��ؼ���
				                  	</td>
				                  	<td>
				                   		<input type="text" name="po.outstationcharge" id="outstationcharge" style="width: 180px;"
				                   		maxlength="19" onkeyup="fun_kd(this)" onblur="amountformat(this)"/>
				                  	</td>
				                  </tr>
				                 <tr>
				                 		 
															</tr>
								<tr></tr>
				               </table>
					       
	            		 </td>
	        		</tr>
	    		</table>
	    		<div align="center">
	    		<br />
				<span class="STYLE1">˵������ɫ*��ע��Ϊ������</span>
				<br />
				<br />
				<input id="saveButton" type="button" style="cursor: pointer" class="button" value="��  ��" onclick="ckeckwethornull();" />
				&nbsp;
				<input id="backButton" style="cursor: pointer" type="button" class="button" value="��  ��" onclick="history.back();" />
				</div>
				
	    	</td>
	    	<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);"></td>
	  	</tr>
	</table>
	
	
	-->
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
</html:form>
</body>
</html>
