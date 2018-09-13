<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%
		response.setHeader("Pragma","No-cache");
		response.setHeader("Cache-Control","no-cache");
		response.setDateHeader("Expires", 0);	
		String path = request.getContextPath();
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<title>用户明细</title>
		<link rel="stylesheet" type="text/css" href="<%=path%>/css/page_color1.css"  />
		<script language="javascript">
    	function colsewin(){
    		window.parent.location.href="<%=path%>/systemManage/systemUserManage/systemUserManageAction.do?method=queryUserList";
    	}
    </script>
	</head>
	<body>
		<html:form method="post" action="systemManage/systemUserManage/systemUserManageAction.do?method=xxx">
			<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				
				<tr valign="top">
					<td  ></td>
					<td >
						<br />
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td width="10">
									&nbsp;
								</td>
								<td>
									<div align="center">
										<table width="75%"  border="0" cellpadding="0"
											cellspacing="0">
											 <tr>
			                					<td colspan="2">
			                						<div  class="text_title"><span class="text_blue2">用户信息明细</span></div>
			                					</td>
			                				</tr>
               							</table>
               							<table width="75%" class="table_body">
											<tr>
												<td >
													<div align="center" class="table_content">
														<table width="55%" class="tbdetails" >
															
															<tr>
																<td  class="text_details_L" >
																	<div >
																		<span >用户名称</span>
																	</div>
																</td>
																<td  class="text_details_R">
																	<div align="left">${systemusersmanage.username}</div>
																</td>
																</tr>
																<tr>
															<td  class="text_details_L">
																	<div >
																		<span >真实姓名</span>
																	</div>
																</td>
															<td  class="text_details_R" >
																	<div align="left">
																		${systemusersmanage.realname}
																	</div>
																</td>	
															</tr>
																
															<tr>
																<td   class="text_details_L">
																	<div >
																		<span >角色</span>
																	</div>
																</td>
																<td  class="text_details_R">
																	<div align="left">${systemusersmanage.systemRole.name}</div>
																</td>
															</tr>
															 <tr>
															<td  class="text_details_L">
																	<div >
																		<span >所属机构</span>
																	</div>
																</td>
															<td  class="text_details_R" >
																	<div align="left">
																		${systemusersmanage.systemorganizationsmanage.name}
																	</div>
																</td>	
															</tr>
															<tr>
															<td  class="text_details_L">
																	<div >
																		<span >电话号码</span>
																	</div>
																</td>
																<td  class="text_details_R">
																<div align="left">
																	${systemusersmanage.usertelephone}
																</div>
																</td>
																</tr>
																<tr>	
																<td  class="text_details_L">
																	<div >
																		<span >手机号</span>
																	</div>
																</td>
																<td  class="text_details_R">
																<div align="left">
																	${systemusersmanage.usermobile}
																</div>
																</td>
															</tr>
															
																<tr>
															<td  class="text_details_L" >
																	<div >
																		<span >性别</span>
																	</div>
															</td>
															<td  class="text_details_R">
																	<div align="left">
																		${systemusersmanage.usersex}																	
																	</div>
																</td>
															</tr>
															<tr>
															<td  class="text_details_L" >
																	<div >
																		<span >身份证号</span>
																	</div>
																</td>
																<td  class="text_details_R">
																	<div align="left">
																		${systemusersmanage.useridcard}
																	</div>
																</td>
																</tr>
																<tr>
																<td  class="text_details_L" >
																	<div >
																		<span >联系地址</span>
																	</div>
																</td>
																<td  class="text_details_R">
																	<div align="left">
																		${systemusersmanage.useradress}
																	</div>
																</td>
															</tr>
															<tr>
															<td  class="text_details_L" >
																	<div >
																		<span >邮箱地址</span>
																	</div>
																</td>
															<td  class="text_details_R">
																	<div align="left">
																	${systemusersmanage.useremail}
																	</div>
																</td>
															</tr>
															
															
															<tr>
																<td  class="text_details_L">
																	<div >
																		<span >是否有效</span>
																	</div>
																</td>
																<td  class="text_details_R">
																	<div align="left">
																		${systemusersmanage.userisactivity}
																	</div>
																</td>
															</tr>
															<tr>
															<td  class="text_details_L">
																	<div >
																		<span >邮政编码</span>
																	</div>
																</td>
															<td  class="text_details_R" >
																	<div align="center">
																		${systemusersmanage.userpostalcode}
																	</div>
																</td>	
															</tr>
															<tr>
															<td  class="text_details_L">
																	<div >
																		<span >备注</span>
																	</div>
																</td>
															<td  class="text_details_R" colspan="3">
																	<div align="left">
																		${systemusersmanage.common}
																	</div>
																</td>	
															</tr>
															</table>
															
														
													</div>
												</td>
											</tr>
										</table>
										
										<table>
										<tr>
																<td>
																	<input name="Submit" id="Submit" type="button" class="button" style="cursor:pointer"  value="返  回" onclick="colsewin();" />
										
																</td>
															</tr>
														
										</table>
									
									</div>
								</td>
							</tr>
						</table>
					</td>
					<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF);"></td>
	
				</tr>
			</table>
		</html:form>
	</body>
</html>
