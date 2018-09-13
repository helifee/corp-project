<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html"%>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
	String path = request.getContextPath();
%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
		<title></title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
        <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
        <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
        <script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>	
		<script type="text/javascript"	src="<%=request.getContextPath()%>/js/common/popup.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/transferOfCash.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/addRow.js"></script>
		<script type="text/javascript" src="<%=path%>/js/ybjs/helpUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
		<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
 <link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
		<script type="text/javascript">
	//�����˿������кŲ�ѯ
			function selectBankInfoOfFkk(){
				var url ="<%=request.getContextPath()%>";
				var payOpenBankNum= document.getElementById("applyOpenBankNum");
				var payOpenBankName=document.getElementById("applyOpenBankName");
			 
				selectBank(url,payOpenBankNum,payOpenBankName,"");
			}
			function selectLoad(){
				//var temp = document.getElementById('ywlxbmval').value;
				transferOfClient(temp,'select_input');
				
			}
			 function open2(){
    			
			    var pop=new Popup({ contentType:1,scrollType:'yes',isReloadOnClose:false,width:360,height:200});
			    pop.setContent("contentUrl","<%=request.getContextPath()%>/page/transfer/realtime/authorization.jsp");
			    pop.setContent("title","��Ȩ");
			    pop.build();
			    pop.show();
			 }
				function commitForm(){
			   var msg = "@";
					var activeDate = document.getElementById("activeDate");
					var payAccount = document.getElementById("payAccount");
					var name = document.getElementById("name");
					var payAccount = document.getElementById("payAccount");
					var certnum = document.getElementById("certnum");
					
					
					
						if(isNull(trim(certnum.value))){
					msg += certnum.title+"����Ϊ�գ�@";
				}
					if(isNull(trim(payAccount.value))){
					msg += payAccount.title+"����Ϊ�գ�@";
				}
			 if(isNull(trim(activeDate.value))){
					msg += activeDate.title+"����Ϊ�գ�@";
				}
					if(isNull(trim(name.value))){
					msg += name.title+"����Ϊ�գ�@";
				}
			 
				var boo = msgSplit(msg);
				 
				
				if(boo){
				 document.forms[0].submit();
				}
				 
		 }
		</script>
	</head>
	<body> 
	<!--  	<form method="post" action="<%=path%>/transfer/RealTimeCreditAction.do?method=sendCredit">-->
			<form method="post" name="form1"
			action="<%=path%>/transfer/PaySignupCreateAction.do?method=modify">
			<input id="signval" type="hidden" value="sign0">
			<input type="hidden" name="token" value="${token}" />
			<!-- ��ֹ�ظ��ύ -->
				<input id="id" name="id" type="hidden" value="${sap.id}">
			<input id="cardcrash" name="cardcrash" type="hidden" value="crash">
		  <input id="contrperson" name="contrperson" type="hidden" >
		  
		  <input type="hidden" value="CN" title="CN-�л����񹲺͹�" name="po.issueState"/>
		   <input type="hidden" value="CNY" title="���ִ���" name="po.moneyClassCode"/>
		   <input type="hidden" value="BEPS" title="ϵͳ��" name="systemno" id='xth'/>
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
						                  	<div  class="text_title"><span class="text_blue2">ʵʱ����ǩԼά��</span></div>
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
																	 ǩԼ����
																</td>
																<td >
																	<select  name="po.signUpType" id="signUpType">
																		<option value="A">
																			 ͨ��
																		</option>
																		<option value="B">
																			ͨ�Һ��˻���ѯ
																		</option>
																		<option value="C">
																			 �˻���ѯ
																		</option>
																	</select>
																	<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b"  >
																		��Ч����
																</td>
																<td >
																		 <input name="po.activeDate" id="activeDate" type="text"  value="${sap.activeDate}"  readonly="readonly" title="��Ч����" style="width: 180px;"
									
								                        Class="Wdate"	  onclick="WdatePicker()"> <span  class="STYLE1">*</span>
																 
																</td>
															</tr>
															<tr>
															
																<td class="text_tablehead_b" >
																	ʧЧ����
																</td>
																<td >
																	 <input type="text" name="po.unactiveDate"  id="unactiveDate"  value="${sap.unactiveDate}" onclick="WdatePicker()" readonly="readonly" style="width: 180px;" class="Wdate" title="ʧЧ����">
																</td>
																
															</tr>
															</table>
                                                 </div>
                                                 
                                                   <div class="table_content">
                                                   
                                                 	<table>
                                                 			 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">ǩԼ����Ϣ</span></td>
                                                      </tr>
                                                 		<tr>
															<td class="text_tablehead_b"  >
																	֤������
																</td>
																<td>
																		<select   name="po.certsize" id="certsize">
																		<option value="01" >
																			���֤
																		</option>
																		<option value="02">
																			����֤
																		</option>
																		<option value="03">
																			ѧ��֤
																		</option>
																	
																	</select>
																	 
																</td>
																<td class="text_tablehead_b">
																	ǩԼ��֤����
																</td>
																<td >
																	<input name="po.certnum" id="certnum" type="text" value="${sap.certnum}" 
																		 title="ǩԼ��֤����" maxlength="32" /><span  class="STYLE1">*</span>
																</td>
															</tr>
																<tr>
																</tr>
																<tr>
																<td class="text_tablehead_b"  >
																	ǩԼ���˺�
																</td>
																<td >
																	<input name="po.payAccount" id="payAccount" type="text" value="${sap.payAccount}"
																		 title="ǩԼ���˺�" maxlength="32" />
																</td>
															 <td class="text_tablehead_b" >
																		ǩԼ������
																</td>
																<td>
																		 <input name="po.name" id="name" type="text" value="${sap.name}"
																		 maxlength="15" title="ǩԼ������" />			<span  class="STYLE1">*</span>
															
																</td>
																</tr>
																<tr>
																<td class="text_tablehead_b" >
																	ǩԼ����ϵ�绰
																</td>
																<td>
																	<input name="po.phone" id="phone" type="text" value="${sap.phone}"  maxlength="15" title="ǩԼ����ϵ�绰" />
																	 
																</td>
																<td class="text_tablehead_b" >
																	ǩԼ�˵�ַ
																</td>
																<td >
																	<input name="po.address" id="address" type="text"  value="${sap.address}"
																		style="width: 180%" title="ǩԼ�˵�ַ"  	onKeyPress="actkeyPress()" onkeyup="limitLength(value,70,'��ʾ��','address')" />
																</td>
																</tr>
																<tr>
																<td class="text_tablehead_b" >
																	ǩԼ�˿ͻ���
																</td>
																<td >
																	 <input type="text"  maxlength="30" name="po.proposerCstmrId" title="�տ��˿ͻ���" id="proposerCstmrId" value="${sap.contractorcstmrid}">
																</td>
																<td class="text_tablehead_b" >
																	ǩԼ���˻�����
																</td>
																<td>
																		 <select  name="po.contractoraccttp" title="ǩԼ���˻�����" id="contractoraccttp" >
																		   <option value="" <c:if test="${sap.payAccountType eq ''}">selected</c:if> >��ѡ��</option>
																		  <option value="AT01" <c:if test="${sap.payAccountType eq 'AT01'}">selected</c:if> >���˴��ǿ��˻�</option>
																		   <option value="AT02" <c:if test="${sap.payAccountType eq 'AT02'}">selected</c:if> >���˽�ǿ��˻�</option>
																		 </select>
																		 <span  class="STYLE1">*</span> 
																</td>
                                                  			</tr>
                                                  			<tr>
                                                  			<td class="text_tablehead_b">
																	ǩԼ�˿������к�
																</td>
																<td>
																	<input name="po.applyOpenBankNum" id="applyOpenBankNum" type="text"  value="${sap.applyOpenBankNum}"
																		  title="�ܶ�" maxlength="12" style="width: 80px;"
																		 /><input type="button" class="button"   value="����" onclick="selectBankInfoOfFkk()">
																</td>
                                                  				<td class="text_tablehead_b" >
																	ǩԼ�˿���������
																</td>
																<td>
																	<input name="po.applyOpenBankName" id="applyOpenBankName" type="text"  value="${sap.applyOpenBankName }"  readonly="readonly"
																			style="width: 180px;" title="ǩԼ�˿���������" maxlength="22"
																			/>
																</td>
																
                                                  			</tr>
                                                  			<tr>
                                                  			<td class="text_tablehead_b">
																	���ʽ������
																</td>
																<td>
																	<input name="po.singleMoney" id="singleMoney" type="text"  value="${sap.singleMoney}"
																		  title="���ʽ������" maxlength="12" style="width: 80px;"
																		 />
																</td>
                                                  				<td class="text_tablehead_b" >
																	���ۼƽ������
																</td>
																<td>
																	<input name="po.totalMoney" id="totalMoney" type="text"  value="${sap.totalMoney }"  
																			style="width: 180px;" title="���ۼƽ������" maxlength="22"
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
																	����
																</td>
																<td colspan="3">
																	<textarea name="po.postscript" id="postscript" 
																		rows="2" cols="68" onKeyPress="charPress()" onkeyup="limitLength(value,135,'��ʾ��','postscript')"> ${sap.postscript}</textarea>
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
                                          
                                             
										 <td style="width:49%;">
										 </td>
										         <td style="width:26%;" align="center">
										       <input name="addButton" type="button" style="cursor: pointer"
											class="button" value="��  ��" onclick="commitForm();" />
										         
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
		  
		  
	 
		  
		  
		  
		  
	 
		  
		  
	 
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
 
		  
		  
		  
		  
		  
			