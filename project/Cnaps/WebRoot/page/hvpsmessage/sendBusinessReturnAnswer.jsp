<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean" prefix="bean" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html" prefix="html" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-logic" prefix="logic" %>
<%
	String path = request.getContextPath();
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title> 业务退回应答录入 </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript">

	
</script>
</head>
<body>

<html:form method="post" action="/businessReturnAnswerAction.do?method=sendMsg">
	<input id="business_name" type="hidden" value="businessReturnAnswer">
	<input id="repeatmark" type="hidden" value="0" />

 


	<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				
				
				
				<tr valign="top">
					
					
					<td>
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td width="10">
									&nbsp;
								</td>
								<td>
									<div align="center">
									<br/><br/>
						               <table width="689" border="0" cellspacing="0" cellpadding="0" >
                                          <tr>
						                  <td  >
						                  	<div  class="text_title"><span class="text_blue2">业务退回应答录入</span></div>
						                  </td>
						                </tr>
                                         <tr>
                                           <td>
                                           		<div class="table_body">
                                                     <div class="table_content">
                                                      <table >
																 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">基本信息</span></td>
                                                      </tr>
															
															<tr>
																<td class="text_tablehead_b" >
																		原报文标识号：
																</td>
																<td>
																		<input type="text" name="po.orgnlMsgId" id="orgnlMsgId" maxlength="35" onkeyup="fun_number(this)" onblur="fun_number(this)" /><span  class="STYLE1"> *</span>
				               
																</td>
																<td class="text_tablehead_b" >
																		原业务类型：
																</td>
																<td >
																	<input type="text" name="po.mmbId" id="mmbId" maxlength="4" onkeyup="fun_number(this)" onblur="fun_number(this)" /><span  class="STYLE1"> *</span>
																	
																</td>
																<td> </td>
															</tr>
															
															<tr>
																<td class="text_tablehead_b" >
																		退回应答状态：
																</td>
																<td>
																		<input type="text" name="po.addtlInff" id="addtlInff" maxlength="35" onkeyup="fun_number(this)" onblur="fun_number(this)" /><span  class="STYLE1"> *</span>
				               
																</td>
															</tr>
															
															
															<tr>
				                  	<td  class="text_tablehead_b">
				                  		附言
				                  	</td>
				                  	<td colspan="3" >
				                   		<textarea name="po.addtlInf" class="textarea_msg" cols="69" rows="5" id="addtlInf" onKeyPress="charPress()"></textarea>
				                   		<span  class="STYLE1"> *</span>
				                   	</td>
				                  </tr>
															
														</table>
														
                                                 </div>
                                                	 
                                                   
                                                    
                                                     <div class="table_content" align="center">
                                                     <br />
										
										<input name="addButton" type="button" style="cursor: pointer"
											class="button" value="保  存" onclick="ckeckwethornull();" />
										<br />
										<br />
										<span class="STYLE1">说明：红色*标注项为必填项</span>
										<br />
										<br />
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
					<td>2</td>

					
				</tr>
			</table> 
	 
</html:form>
</body>
</html>

