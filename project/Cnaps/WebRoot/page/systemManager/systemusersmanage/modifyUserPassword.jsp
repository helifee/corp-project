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
		<title>�û������޸�</title>
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
														<span class="text_blue2">�޸�����</span>
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
																		�û�����:
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
																		ԭʼ����:
																	</div>
																</td>
																<td  class="text_list">
																	<div align="left">
																		<input type="password" name="ysuserpassword1"
																			 />
																		<span name="validate" dataName="ysuserpassword1"
																			dataType="Empty" class="STYLE1" msg="ԭʼ���벻��Ϊ��!">*</span>
																		<input type="hidden" name="ysuserpassword2"
																			 value="${entity.userpass }" />
																		<span name="validate" dataName="ysuserpassword2"
																			dataType="Repeat" msg="ԭʼ�����������!" to="ysuserpassword1"></span>
																	</div>
																</td>
															</tr>
															<tr>
																<td  class="text_tablehead"
																	>
																	<div align="right">
																		����������
																	</div>
																</td>
																<td  class="text_list">
																	<div align="left">
																		<input type="password" name="newpassword1"
																			 />
																		<span name="validate" dataName="newpassword1"
																			dataType="EnglishNum" msg="�����������ʽ����!ֻ������ĸ��������ɡ�"></span>
																		<span class="STYLE1">*</span>
																	</div>
																</td>
															</tr>
															<tr>
																<td  class="text_tablehead">
																	<div align="right">
																		ȷ��������
																	</div>
																</td>
																<td  class="text_list">
																	<div align="left">
																		<input type="password" name="userpass"/>
																		<span name="validate" dataName="userpass"
																			dataType="Repeat" msg="�����������벻һ��" to="newpassword1"></span>
																		<span class="STYLE1">*</span>
																	</div>
																</td>
															</tr>
														</table>
														   <table>
                                                    	
                                                    	<tr>
                                                    		<td >
                                                    			 <input name="Submit2" type="button" class="button"
														value="�� ��" onClick="modifyUserPassword();" />
														</td>
                                                    		
                                                    	</tr>
                                                    	<tr><td >&nbsp;</td></tr>
                                                    	<tr>
                                                    		
                                                    		<td  >
																<span class="STYLE1">˵������ɫ*��ע��Ϊ������</span>
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
