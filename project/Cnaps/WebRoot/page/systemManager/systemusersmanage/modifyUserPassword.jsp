<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<title>用户密码修改</title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet"
			type="text/css" />
		<script language="javascript"
			src="<%=path%>/js/common/validateUtil.js"></script>
		<script language="javascript"
			src="<%=path%>/js/systemManager/systemUserManage/modifyUserPassword.js"></script>
		<script language="javascript">
	    	function colsewin(){
	    		window.parent.location.href="<%=path%>/systemManage/systemUserManage/systemUserManageAction.do?method=queryUserList";
	    	}
	    </script>
	</head>
	<body>
		<html:form  method="post" action="systemManage/systemUserManage/systemUserManageAction.do?method=modifyUserPassword">
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
								<td align="center">
									<div align="center">
										<table width="90%"  border="0" cellpadding="0"
											cellspacing="0">
											<tr>
												<td >
													<div align="center" class="text_title">
														<span class="text_blue2">修改密码</span>
													</div>
												</td>
											</tr>
										</table>
										<table width="90%" height="30" border="0" cellpadding="0"
											cellspacing="0" class="table_body">
											
											<tr>
												<td  align="center">
													<div align="center" class="table_content">
														<table width="49%" border="0" cellpadding="0"
															cellspacing="0" >
															<tr>
																<td  class="text_tablehead"
																	>
																	<div align="right">
																		用户名称:
																	</div>
																</td>
																<td  class="text_list">
																	<div align="left">
																		<input type="text" name="username"
																			 value="${entity.username }"
																			readonly />
																		<input type="hidden" name="userindetifier"
																			
																			value="${entity.userindetifier }" readonly />
																	</div>
																</td>
															</tr>
															<tr>
																<td  class="text_tablehead"
																	>
																	<div align="right">
																		原始密码:
																	</div>
																</td>
																<td  class="text_list">
																	<div align="left">
																		<input type="password" name="ysuserpassword1"
																			 />
																		<span name="validate" dataName="ysuserpassword1"
																			dataType="Empty" class="STYLE1" msg="原始密码不能为空!">*</span>
																		<input type="hidden" name="ysuserpassword2"
																			 value="${entity.userpass }" />
																		<span name="validate" dataName="ysuserpassword2"
																			dataType="Repeat" msg="原始密码输入错误!" to="ysuserpassword1"></span>
																	</div>
																</td>
															</tr>
															<tr>
																<td  class="text_tablehead"
																	>
																	<div align="right">
																		输入新密码
																	</div>
																</td>
																<td  class="text_list">
																	<div align="left">
																		<input type="password" name="newpassword1"
																			 />
																		<span name="validate" dataName="newpassword1"
																			dataType="EnglishNum" msg="新密码输入格式错误!只能由字母或数字组成。"></span>
																		<span class="STYLE1">*</span>
																	</div>
																</td>
															</tr>
															<tr>
																<td  class="text_tablehead">
																	<div align="right">
																		确认新密码
																	</div>
																</td>
																<td  class="text_list">
																	<div align="left">
																		<input type="password" name="userpass"/>
																		<span name="validate" dataName="userpass"
																			dataType="Repeat" msg="两次密码输入不一致" to="newpassword1"></span>
																		<span class="STYLE1">*</span>
																	</div>
																</td>
															</tr>
														</table>
														   <table>
                                                    	
                                                    	<tr>
                                                    		<td >
                                                    			 <input name="Submit2" type="button" class="button"
														value="保 存" onClick="modifyUserPassword();" />
														</td>
                                                    		
                                                    	</tr>
                                                    	<tr><td >&nbsp;</td></tr>
                                                    	<tr>
                                                    		
                                                    		<td  >
																<span class="STYLE1">说明：红色*标注项为必填项</span>
															</td>
                                                    	</tr>
                                                    	<tr><td colspan="2">&nbsp;</td></tr>
                                                    </table>
													</div>
													
												</td>
											</tr>
										</table>
								</td>

							</tr>
						</table>
					<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);" ></td>
	
				</tr>
			</table>
		</html:form>
	</body>

</html>
