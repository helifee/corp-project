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
		<title>修改用户</title>
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
			<input type="hidden" name="token" value="${token}"/><!-- 防止重复提交 -->
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
														<span class="text_blue2">修改用户</span>
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
																		<span >用户名称</span>
																	</div>
																</td>
																<td  class="text_list">
																	<div align="left">
																		<html:text property="username"  maxlength="10"  value="${systemusersmanage.username}"/>
																		<span name="validate" dataName="username" class="STYLE1" dataType="EnglishNum" require="true"  msg="用户名称只能由字母或数字组成!">*</span>
																	</div>
																</td>
																</tr>
																<tr>
															<td  class="text_tablehead">
																	<div align="right">
																		<span >真实姓名</span>
																	</div>
																</td>
															<td  class="text_list" >
																	<div align="left">
																		<html:text property="realname"  value="${systemusersmanage.realname}"></html:text>
																		<span name="validate" dataName="realname" require="true" class="STYLE1" dataType="Empty" msg="真实姓名不能为空!">*</span>
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
																		<span >所属机构</span>
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
																		<span >电话号码</span>
																	</div>
																</td>
																<td  class="text_list">
																<div align="left">
																	<html:text property="usertelephone"  maxlength="30" value="${systemusersmanage.usertelephone}"/>
																<span name="validate" dataName="usertelephone" require="false" class="STYLE1" dataType="Phone" require="false" msg="电话号码格式不正确!格式为:区号-7位或8位数字"></span>
																</div>
																</td>
																</tr>
																<tr>	
																<td  class="text_tablehead">
																	<div align="right">
																		<span >手机号:</span>
																	</div>
																</td>
																<td  class="text_list">
																<div align="left">
																	<html:text property="usermobile"  maxlength="30" value="${systemusersmanage.usermobile}"/>
																<span name="validate" dataName="usermobile" require="false" class="STYLE1" dataType="Mobile" require="false" msg="手机号码格式不正确!"></span>
																</div>
																</td>
															</tr>
																<tr>
															<td  class="text_tablehead" >
																	<div align="right">
																		<span >性别</span>
																	</div>
															</td>
															<td  class="text_list">
																	<div align="left">
																		<html:select property="usersex"  value="${systemusersmanage.usersex}" >
																			<html:option value="">全部</html:option>
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
																		<html:text property="useridcard" style="width:180px" maxlength="18" value="${systemusersmanage.useridcard}"/>
																	<span name="validate" dataName="useridcard" require="false" class="STYLE1" dataType="IdCard" msg="身份证号格式不正确!"></span>
																	</div>
																</td>
																</tr>
															<tr>
															<td  class="text_tablehead" style="width:100px">
																	<div align="right">
																		<span >邮箱地址</span>
																	</div>
																</td>
															<td  class="text_list">
																	<div align="left">
																		<html:text property="useremail"  maxlength="18" value="${systemusersmanage.useremail}"/>
																	<span name="validate" dataName="useremail" require="false" class="STYLE1" dataType="Email" msg="电子邮箱地址格式不正确!"></span>
																	</div>
																</td>
															</tr>
															<tr>
																<td  class="text_tablehead">
																	<div align="right">
																		<span >是否有效</span>
																	</div>
																</td>
																<td  class="text_list">
																	<div align="left">
																		<html:select property="userisactivity"  value="${systemusersmanage.userisactivity}">
																			<html:option value="">请选择</html:option>
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
																		<html:text property="userpostalcode"  value="${systemusersmanage.userpostalcode}"></html:text>
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
																		<html:textarea property="common"  value="${systemusersmanage.common}"></html:textarea>
																	</div>
																</td>	
															</tr>
														</table>
														   <table>
                                                    	
                                                    	<tr>
                                                    		<td >
                                                    			<input name="saveInfo" id="saveInfo" type="submit" class="button" style="cursor:pointer"  value="保  存"  />
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
