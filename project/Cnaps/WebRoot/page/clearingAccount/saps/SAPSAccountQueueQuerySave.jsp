<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
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
		<title></title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="<%=path %>/js/ybjs/helpUtil.js"></script>
		<script type="text/javascript" src="<%=path %>/js/common/check.js"></script>
<script type="text/javascript">
          function commitForm(){
			return document.forms[0].submit();
				}
			 
		</script>
		
	</head>
	<body >
		<html:form method="post" action="/transfer/SAPSAccountQueueQueryAction.do?method=querySave">
		<input type="hidden" name="token" value="${token}"/>
		  <input id="signval" type="hidden" value="sign0">
		  <input id="id" name="id" type="hidden" value="${pvpform.id}"/>
		   <input id="chnmsgid" name="chnmsgid" type="hidden"  value="${pvpform.chnmsgid}"/>
		    
		   
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
						                  	<div  class="text_title"><span class="text_blue2"> ��ѯ����¼��</span></div>
						                  </td>
						                </tr>
                                         <tr>
                                           <td>
                                           		 
                                                 <div class="table_body">
                                                   <div class="table_content">
                                                   
                                                 	<table>
                                                 			 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">ҵ����Ϣ</span></td>
                                                      </tr>
                                                 		<tr>
															<td class="text_tablehead_b"  style="width:400px;" colspan="2">
																	����ѯ�����к�/����ѯ�������кţ� 
																</td>
																<td>	<input name="po.managerIdentification" id="managerIdentification" type="text" style="width:180px;" title="����ѯ�����к�/����ѯ�������к�"  /><font color="#FF0000">*</font>
														
																</td>
															</tr>
														<tr>
															<td class="text_tablehead_b" colspan="2">
																	��ѯ��ʽ�� 
																</td>
																<td >
																		<select name="po.queryType" id="queryType" onchange="">
																			<option value="QT00">��ѯָ�������˻�</option>
																			<option value="QT01">��ѯָ������Ͻ�������˻�</option>
																		</select>
																	<select name="po.queryType" id="queryType">
																		<option value="QT00">��ѯָ�������˻�</option>
																		<option value="QT01">��ѯָ������Ͻ�������˻�</option>
																	</select>
																 		</td>
														</tr>
															<tr>
				                  	<td  class="text_tablehead_b" colspan="2" >
				                  		��ע
				                  	</td>
				                  	<td >
				                   		<textarea name="po.rmk" class="textarea_msg" cols="69" rows="5" id="rmk" onKeyPress="charPress()"></textarea>
				                   		<span  class="STYLE1">*</span>
				                   		<br/>
				                   		<br/>
				                   	</td>
				                  </tr>	
																
										<tr>
											<td colspan="4">&nbsp;</td>
										</tr>					
										<tr>
											<td colspan="4" align="center"><span class="STYLE1">˵������ɫ*��ע��Ϊ������</span></td>
										</tr>							
										<tr>
											<td colspan="4" align="center">
												<input name="addButton" type="button" style="cursor: pointer"
											class="button" value="��  ��"  onclick="commitForm();" />
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
		  
		  
		  
		   
		   
		   
		   
		   
		   
		   
		   
		   
		   
		   
		   
		  
			
		</html:form>
	</body>
</html>
 