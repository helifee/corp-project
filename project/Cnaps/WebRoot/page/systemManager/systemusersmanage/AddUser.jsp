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
		<title>添加用户</title>
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
			<input type="hidden" name="token" value="${token}"/><!-- 防止重复提交 -->
			<input type="hidden" name="existValue" id="existValue"/><!-- 判断是否已经存在权限代码 -->
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
												<div  class="text_title"><span class="text_blue2">新增用户信息</span></div>
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
																		<span >用户名称</span>
																	</div>
																</td>
																<td  class="text_list">
																	<div align="left">
																		<html:text property="username"  maxlength="10"></html:text>
																		<span name="validate" dataName="username" class="STYLE1" dataType="EnglishNum" require="true"  msg="用户名称只能由字母或数字组成!">*</span>
																	</div>
																</td>
																</tr>
															<tr>
															<tr>
															<td  class="text_tablehead">
																	<div align="right">
																		<span >真实姓名</span>
																	</div>
																</td>
															<td  class="text_list" >
																	<div align="left">
																		<html:text  property="realname" ></html:text>
																		<span name="validate" dataName="realname" class="STYLE1" require="true" dataType="Empty" msg="真实姓名不能为空!">*</span>
																	</div>
																</td>	
															</tr>
															<tr>
															<td  class="text_tablehead" >
																	<div align="right">
																		<span >角色</span>
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
																		<span >机构代码</span>
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
																		<span >电话号码</span>
																	</div>
																</td>
																<td  class="text_list">
																<div align="left">
																	<html:text property="usertelephone"  maxlength="30"></html:text>
																	<span name="validate" dataName="usertelephone" class="STYLE1" dataType="Phone" require="false" msg="电话号码格式不正确!格式为:区号-7位或8位数字"></span>
																</div>
																</td>
																</tr>
																<tr>	
																<td  class="text_tablehead">
																	<div align="right">
																		<span >手机号</span>
																	</div>
																</td>
																<td  class="text_list">
																<div align="left">
																	<html:text property="usermobile"  maxlength="30"></html:text>
																	<span name="validate" dataName="usermobile" class="STYLE1" dataType="Mobile" require="false" msg="手机号码格式不正确!"></span>
																</div>
																</td>
															</tr>
															
															<!--  
															<tr>
															<td  class="text_tablehead">
																	<div align="right">
																		<span >所属网点:</span>
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
																		<span >性别</span>
																	</div>
															</td>
															<td  class="text_list">
																	<div align="left">
																		<html:select property="usersex" >
																			<html:option value="01">男</html:option>
																			<html:option value="02">女</html:option>
																		</html:select>																		
																	</div>
																</td>
															</tr>
															<tr>
															<td  class="text_tablehead" >
																	<div align="right">
																		<span >身份证号</span>
																	</div>
																</td>
																<td  class="text_list">
																	<div align="left">
																		<html:text property="useridcard" style="width:180px" maxlength="18"></html:text>
																		<span name="validate" dataName="useridcard" class="STYLE1" require="false" dataType="IdCard" msg="身份证号格式不正确!"></span>
																	</div>
																</td>
																</tr>
																	<tr>
															<td  class="text_tablehead" >
																	<div align="right">
																		<span >联系地址</span>
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
																		<span >邮箱地址</span>
																	</div>
																</td>
															<td  class="text_list">
																	<div align="left">
																		<html:text property="useremail"  maxlength="18"></html:text>
																		<span name="validate" dataName="useremail" require="false" class="STYLE1" dataType="Email" msg="电子邮箱地址格式不正确!"></span>
																	</div>
																</td>
															</tr>
															
															<tr>
																<td  class="text_tablehead">
																	<div align="right">
																		<span >状态</span>
																	</div>
																</td>
																<td  class="text_list">
																	<div align="left">
																		<html:select property="userisactivity" >
																			<html:option value="01">激活</html:option>
																			<html:option value="02">冻结</html:option>
																		</html:select>
																		<span class="STYLE1">*</span>
																	</div>
																</td>
															</tr>
															<tr>
															<td  class="text_tablehead">
																	<div align="right">
																		<span >邮政编码</span>
																	</div>
																</td>
															<td  class="text_list" >
																	<div align="left">
																		<html:text property="userpostalcode" ></html:text>
																		<span name="validate" dataName="userpostalcode" require="false" class="STYLE1" dataType="Zip" msg="邮政编码格式不正确!"></span>
																	</div>
																</td>	
															</tr>
															
															<tr>
															<td  class="text_tablehead">
																	<div align="right">
																		<span >备注</span>
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
                                                    			<input name="saveInfo" id="saveInfo" type="button" class="button" style="cursor:pointer"  value="保  存" onclick="addUserInfo()" />
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
