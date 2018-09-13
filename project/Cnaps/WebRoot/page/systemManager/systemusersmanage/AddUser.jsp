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
		<title>����û�</title>
		<link rel="stylesheet" type="text/css" href="<%=path%>/css/page_color1.css"  />
		<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/systemManager/systemUserManage/addUser.js"></script>
		<script language="javascript">
    	function closewin(){
    		window.parent.location.href="<%=path%>/systemManage/systemUserManage/systemUserManageAction.do?method=queryUserList";
    	}
    </script>
		</head>
	<body>
		<html:form method="post" action="systemManage/systemUserManage/systemUserManageAction.do?method=xxx">
			<input type="hidden" name="token" value="${token}"/><!-- ��ֹ�ظ��ύ -->
			<input type="hidden" name="existValue" id="existValue"/><!-- �ж��Ƿ��Ѿ�����Ȩ�޴��� -->
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
									 <table width="95%" border="0" cellpadding="0" cellspacing="0">
						                 <tr>
											<td  >
												<div  class="text_title"><span class="text_blue2">�����û���Ϣ</span></div>
											</td>
										</tr>
									</table>
										<table width="95%" border="0" cellpadding="0" cellspacing="0" class="table_body">
											
											<tr>
												<td >
													<div align="center" >
														<table width="55%" border="0" >
														
															<tr>
																<td  class="text_tablehead" >
																	<div align="right">
																		<span >�û�����</span>
																	</div>
																</td>
																<td  class="text_list">
																	<div align="left">
																		<html:text property="username"  maxlength="10"></html:text>
																		<span name="validate" dataName="username" class="STYLE1" dataType="EnglishNum" require="true"  msg="�û�����ֻ������ĸ���������!">*</span>
																	</div>
																</td>
																</tr>
															<tr>
															<tr>
															<td  class="text_tablehead">
																	<div align="right">
																		<span >��ʵ����</span>
																	</div>
																</td>
															<td  class="text_list" >
																	<div align="left">
																		<html:text  property="realname" ></html:text>
																		<span name="validate" dataName="realname" class="STYLE1" require="true" dataType="Empty" msg="��ʵ��������Ϊ��!">*</span>
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
																		<html:select property="usergrouptype" >
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
																		<html:select property="organizationindentifier">
																			<logic:present name="organizationList">
																			<logic:iterate id="userOrgn" name="organizationList">
																				<html:option value="${userOrgn.indentifier}">${userOrgn.name}</html:option>
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
																	<html:text property="usertelephone"  maxlength="30"></html:text>
																	<span name="validate" dataName="usertelephone" class="STYLE1" dataType="Phone" require="false" msg="�绰�����ʽ����ȷ!��ʽΪ:����-7λ��8λ����"></span>
																</div>
																</td>
																</tr>
																<tr>	
																<td  class="text_tablehead">
																	<div align="right">
																		<span >�ֻ���</span>
																	</div>
																</td>
																<td  class="text_list">
																<div align="left">
																	<html:text property="usermobile"  maxlength="30"></html:text>
																	<span name="validate" dataName="usermobile" class="STYLE1" dataType="Mobile" require="false" msg="�ֻ������ʽ����ȷ!"></span>
																</div>
																</td>
															</tr>
															
															<!--  
															<tr>
															<td  class="text_tablehead">
																	<div align="right">
																		<span >��������:</span>
																	</div>
																</td>
																<td  class="text_list">
																	<div align="left">
																		<html:select property="latticepoint">
																			
																		</html:select>
																	</div>
																</td>	
																</tr>
																-->
																
																<tr>
															<td  class="text_tablehead">
																	<div align="right">
																		<span >�Ա�</span>
																	</div>
															</td>
															<td  class="text_list">
																	<div align="left">
																		<html:select property="usersex" >
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
																		<html:text property="useridcard" style="width:180px" maxlength="18"></html:text>
																		<span name="validate" dataName="useridcard" class="STYLE1" require="false" dataType="IdCard" msg="���֤�Ÿ�ʽ����ȷ!"></span>
																	</div>
																</td>
																</tr>
																	<tr>
															<td  class="text_tablehead" >
																	<div align="right">
																		<span >��ϵ��ַ</span>
																	</div>
																</td>
															<td  class="text_list">
																	<div align="left">
																		<html:text property="useradress" style="width:180px" maxlength="18"></html:text>
																	</div>
																</td>
															</tr>
															<tr>
															<td  class="text_tablehead" >
																	<div align="right">
																		<span >�����ַ</span>
																	</div>
																</td>
															<td  class="text_list">
																	<div align="left">
																		<html:text property="useremail"  maxlength="18"></html:text>
																		<span name="validate" dataName="useremail" require="false" class="STYLE1" dataType="Email" msg="���������ַ��ʽ����ȷ!"></span>
																	</div>
																</td>
															</tr>
															
															<tr>
																<td  class="text_tablehead">
																	<div align="right">
																		<span >״̬</span>
																	</div>
																</td>
																<td  class="text_list">
																	<div align="left">
																		<html:select property="userisactivity" >
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
																		<html:text property="userpostalcode" ></html:text>
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
																		<html:textarea property="common" style="width:180px"></html:textarea>
																	</div>
																</td>	
															</tr>	
														</table>
														   <table>
                                                    	
                                                    	<tr>
                                                    		<td >
                                                    			<input name="saveInfo" id="saveInfo" type="button" class="button" style="cursor:pointer"  value="��  ��" onclick="addUserInfo()" />
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
