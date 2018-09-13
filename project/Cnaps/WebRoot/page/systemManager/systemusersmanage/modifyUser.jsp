<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<%
		response.setHeader("Pragma","No-cache");
		response.setHeader("Cache-Control","no-cache");
		response.setDateHeader("Expires", 0);	
		String path = request.getContextPath();
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<title>�޸��û�</title>
		<link rel="stylesheet" type="text/css" href="<%=path%>/css/page_color1.css"  />
		<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
		<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css">
    <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js"></script>
    <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
    <script language="javascript">
    	function colsewin(){
    		window.parent.location.href="<%=path%>/systemManage/systemUserManage/systemUserManageAction.do?method=queryUserList";
    	}
    </script>
	</head>
	<body>
		<html:form method="post" action="/systemManage/systemUserManage/systemUserManageAction.do?method=modifyUser">
			<input type="hidden" name="token" value="${token}"/><!-- ��ֹ�ظ��ύ -->
			<input type="hidden" name="userindetifier" id="userindetifier" value="${systemusersmanage.userindetifier }"/>
			<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				
				<tr valign="top">
					<td ></td>
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
												<td >
													<div align="center"  class="text_title">
														<span class="text_blue2">�޸��û�</span>
													</div>
												</td>
											</tr>
											</table>
										<table width="75%"  border="0" cellpadding="0"
											cellspacing="0" class="table_body">
											
											<tr>
												<td >
													<div align="center">
														<table width="55%" border="0" >
															<tr>
																<td  class="text_tablehead" >
																	<div align="right">
																		<span >�û�����</span>
																	</div>
																</td>
																<td  class="text_list">
																	<div align="left">
																		<html:text property="username"  maxlength="10"  value="${systemusersmanage.username}"/>
																		<span name="validate" dataName="username" class="STYLE1" dataType="EnglishNum" require="true"  msg="�û�����ֻ������ĸ���������!">*</span>
																	</div>
																</td>
																</tr>
																<tr>
															<td  class="text_tablehead">
																	<div align="right">
																		<span >��ʵ����</span>
																	</div>
																</td>
															<td  class="text_list" >
																	<div align="left">
																		<html:text property="realname"  value="${systemusersmanage.realname}"></html:text>
																		<span name="validate" dataName="realname" require="true" class="STYLE1" dataType="Empty" msg="��ʵ��������Ϊ��!">*</span>
																	</div>
																</td>	
															</tr>
															<tr>
															<td  class="text_tablehead" >
																	<div align="right">
																		<span >��ɫ</span>
																	</div>
																</td>
															<td  class="text_list">
																	<div align="left">
																		<html:select property="usergrouptype" value="${systemrole.identifier}">
																			
																			<logic:present name="groupList">
																				<logic:iterate id="userGroup" name="groupList">
																					<html:option value="${userGroup.identifier}">${userGroup.name}</html:option>
																				</logic:iterate>
																			</logic:present>
																		</html:select>
																	</div>
																</td>
															</tr>
															<tr>
															<td  class="text_tablehead">
																	<div align="right">
																		<span >��������</span>
																	</div>
																</td>
															<td  class="text_list" >
																	<div align="left">
																		<html:select property="organizationindentifier" value="${systemuserorganizationrelation.id.organizationindentifier}">
																	
																			<logic:present name="organizationList">
																			<bean:define id="temp" value="0"></bean:define>
																			<bean:define id="temp1" value="0"></bean:define>
																			<bean:define id="temp2" value="0"></bean:define>
																			<logic:iterate id="organization" name="organizationList">
																				<html:option value="${organization.indentifier}">
																				${organization.name}
																				</html:option>
																			</logic:iterate>
																			</logic:present>
																		</html:select>		
																	</div>
																</td>	
															</tr>
															
															
															
															
															<tr>
															<td  class="text_tablehead">
																	<div align="right">
																		<span >�绰����</span>
																	</div>
																</td>
																<td  class="text_list">
																<div align="left">
																	<html:text property="usertelephone"  maxlength="30" value="${systemusersmanage.usertelephone}"/>
																<span name="validate" dataName="usertelephone" require="false" class="STYLE1" dataType="Phone" require="false" msg="�绰�����ʽ����ȷ!��ʽΪ:����-7λ��8λ����"></span>
																</div>
																</td>
																</tr>
																<tr>	
																<td  class="text_tablehead">
																	<div align="right">
																		<span >�ֻ���:</span>
																	</div>
																</td>
																<td  class="text_list">
																<div align="left">
																	<html:text property="usermobile"  maxlength="30" value="${systemusersmanage.usermobile}"/>
																<span name="validate" dataName="usermobile" require="false" class="STYLE1" dataType="Mobile" require="false" msg="�ֻ������ʽ����ȷ!"></span>
																</div>
																</td>
															</tr>
																<tr>
															<td  class="text_tablehead" >
																	<div align="right">
																		<span >�Ա�</span>
																	</div>
															</td>
															<td  class="text_list">
																	<div align="left">
																		<html:select property="usersex"  value="${systemusersmanage.usersex}" >
																			<html:option value="">ȫ��</html:option>
																			<html:option value="01">��</html:option>
																			<html:option value="02">Ů</html:option>
																		</html:select>																		
																	</div>
																</td>
															</tr>
															<tr>
															<td  class="text_tablehead" >
																	<div align="right">
																		<span >���֤��</span>
																	</div>
																</td>
																<td  class="text_list">
																	<div align="left">
																		<html:text property="useridcard" style="width:180px" maxlength="18" value="${systemusersmanage.useridcard}"/>
																	<span name="validate" dataName="useridcard" require="false" class="STYLE1" dataType="IdCard" msg="���֤�Ÿ�ʽ����ȷ!"></span>
																	</div>
																</td>
																</tr>
															<tr>
															<td  class="text_tablehead" style="width:100px">
																	<div align="right">
																		<span >�����ַ</span>
																	</div>
																</td>
															<td  class="text_list">
																	<div align="left">
																		<html:text property="useremail"  maxlength="18" value="${systemusersmanage.useremail}"/>
																	<span name="validate" dataName="useremail" require="false" class="STYLE1" dataType="Email" msg="���������ַ��ʽ����ȷ!"></span>
																	</div>
																</td>
															</tr>
															<tr>
																<td  class="text_tablehead">
																	<div align="right">
																		<span >�Ƿ���Ч</span>
																	</div>
																</td>
																<td  class="text_list">
																	<div align="left">
																		<html:select property="userisactivity"  value="${systemusersmanage.userisactivity}">
																			<html:option value="">��ѡ��</html:option>
																			<html:option value="01">����</html:option>
																			<html:option value="02">����</html:option>
																		</html:select>
																		<span class="STYLE1">*</span>
																	</div>
																</td>
															</tr>
															<tr>
															<td  class="text_tablehead">
																	<div align="right">
																		<span >��������</span>
																	</div>
																</td>
															<td  class="text_list" >
																	<div align="left">
																		<html:text property="userpostalcode"  value="${systemusersmanage.userpostalcode}"></html:text>
																	<span name="validate" dataName="userpostalcode" require="false" class="STYLE1" dataType="Zip" msg="���������ʽ����ȷ!"></span>
																	</div>
																</td>	
															</tr>
															
															<tr>
															<td  class="text_tablehead">
																	<div align="right">
																		<span >��ע</span>
																	</div>
																</td>
															<td  class="text_list" colspan="3">
																	<div align="left">
																		<html:textarea property="common"  value="${systemusersmanage.common}"></html:textarea>
																	</div>
																</td>	
															</tr>
														</table>
														   <table>
                                                    	
                                                    	<tr>
                                                    		<td >
                                                    			<input name="saveInfo" id="saveInfo" type="submit" class="button" style="cursor:pointer"  value="��  ��"  />
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
														<br />
													</div>
												</td>
											</tr>
										</table>
										<br />
										<br />
									</div>
								</td>
							</tr>
						</table>
					</td>
						<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);" ></td>
	
				</tr>
			</table>
		</html:form>
	</body>
</html>
