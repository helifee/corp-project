<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html"%>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic"%>
<%
	String path = request.getContextPath();
%>
<%
		response.setHeader("Pragma","No-cache");
		response.setHeader("Cache-Control","no-cache");
		response.setDateHeader("Expires", 0);	
		
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
		<title>������λȫ�������Բ�ѯ¼��</title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet"
			type="text/css" />
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/ybjs/helpUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/datePicker/WdatePicker.js"></script>

		<script type="text/javascript">
			
			function commitForm(){
			
			 var flag=0;
			  if(document.getElementById("bszqshhh").value=="") flag=1;
			  if(document.getElementById("bcxqshhh").value=="") flag=1;
			  if(flag==1){
			  	alert("Ҫ�����벻������");
			  }
			  else{
			  	document.forms[0].submit();
			  }
				
			}
			
			
			
		</script>
	</head>
	<body >
	
	
	
	
	
	
	
	
	
	
	
	
	
	
		<form method="post"
			action="<%=path%>/sapsAccountTotalQueryAction.do?method=sendMessage">
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
						                  	<div  class="text_title"><span class="text_blue2">������λȫ�������Բ�ѯ¼��</span></div>
						                  </td>
						                </tr>
                                         <tr>
                                           <td>
                                           		 
                                                <div class="table_body">
                                                   <div class="table_content">
                                                   
                                                 	<table>
                                                 			 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">������Ϣ</span></td>
                                                      </tr>
                                                 		<tr>
															<td class="text_tablehead_b"  >
																	��ѯ��ʽ��
																</td>
																<td>
																	<select name="querytype" id="bszqshhh" onchange="">
																			<option value="QT00">��ѯָ�������˻�</option>
																			<option value="QT01">��ѯָ������Ͻ�������˻�</option>
																		</select>
																</td>
															
																<td class="text_tablehead_b" >
																			����ѯ�������кţ�
																</td>
																<td >
																<input name="manageridentification" id="bcxqshhh" type="text"
																		style="width: 180px;" maxlength="15" title="����ѯ��������" /><span  class="STYLE1">*</span>	</td>
															</tr>
															
															<tr>
				                  	<td  class="text_tablehead_b">
				                  		��ע
				                  	</td>
				                  	<td colspan="3" >
				                   		<textarea name="rmk" class="textarea_msg" cols="69" rows="3" id="rmk" onKeyPress="charPress()"></textarea>
				                   	<br/><br/>
				                   	</td>
				                  </tr>
									<tr>
										<td colspan="4">&nbsp;</td>
									</tr>							 
									<tr>
										<td colspan="4" align="center">
											<span class="STYLE1">˵������ɫ*��ע��Ϊ������</span>
										</td>
									</tr>							 
									<tr>
										<td colspan="4" align="center">
											<input name="addButton" type="button" style="cursor: pointer"
											class="button" value="��  ��" onclick="commitForm();" />
										</td>
									</tr>
									</table>
									<br />
										<br />
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
