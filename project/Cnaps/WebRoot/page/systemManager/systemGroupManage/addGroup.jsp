<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%
	String path = request.getContextPath();
%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
		<title>无标题文档</title>
		<link href="<%=path%>/css/page_color.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript" src="<%=path %>/js/systemManager/systemGroupManage/addGroup.js"></script>
	</head>
	<body>
		<html:form method="post" action="systemManage/systemGroupManageAction.do?method=addSystemGroup">
			<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				<tr>
					<td width="8" height="48" ></td>
					<td >
						<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td  width="360" class="text_tablehead_b">
								<h5 align="left">&nbsp;系统管理&nbsp;->&nbsp;用户组管理&nbsp;->&nbsp;添加系统用户组</h5>
							</td>
							<td  width="194" ></td>
							<td  width="270"  ></td>
						</tr>
						</table>
					</td>
					<td width="8" ></td>
			</tr>
				<tr valign="top">
					<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);" ></td>
	<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);">
						<br />
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td width="10">
									&nbsp;
								</td>
								<td>
									<div align="center">
										<table width="800" height="30" border="0" cellpadding="0"
											cellspacing="0">
											<tr>
												<td height="40">
													<div align="center">
														<span class="text_blue2">添加新用户组</span>
													</div>
												</td>
											</tr>
											<tr>
												<td height="30">
													<div align="center">
														<table style="width:450px" border="0" cellpadding="1"
															cellspacing="1" class="tbcolor">
															
															<tr>
																<td  class="text_tablehead_b" >
																	<div align="right">
																		组名称:
																	</div>
																</td>
																<td  class="text_list">
																	<div align="left">
																		<html:text property="teamname" onblur="chinese2py(this)" style="width:280px" maxlength="12"></html:text><span class="STYLE1">*</span>
																	</div>
																</td>
															</tr>
															
															<tr>
																<td  class="text_tablehead_b">
																	<div align="right">
																		用户组级别:
																	</div>
																</td>
																<td  class="text_list">
																	<div align="left">
																	 <html:select property="namecode" style="width:280px">
																		<html:option value="00">支行</html:option>
																		<html:option value="01">分行</html:option>
																		<html:option value="02">省行(总部)</html:option>
																	</html:select><span class="STYLE1">*</span>
																	</div>
																</td>
															</tr>
															 <logic:equal value="admin" name="user" property="englishname">
                        <tr>
															<td  class="text_tablehead" style="width:100px">
																	<div align="right">
																		<span class="text_tablehead_b">用户组类别:</span>
																	</div>
															</td>
															<td  class="text_list">
																	<div align="left">
																		<html:select property="englishname" style="width:280px">
																		<html:option value="admin">管理员</html:option>
																			<html:option value="cdt">存贷通</html:option>
																			<html:option value="znt">智能通</html:option>
																		</html:select>																		
																	</div>
																</td>
															</tr>   
							</logic:equal>	
															<tr>
																<td  class="text_tablehead_b">
																	<div align="right">
																		拼音码:
																	</div>
																</td>
																<td  class="text_list">
																	<div align="left">
																		<html:text property="phoneticizecode" readonly="true" style="width:280px"/>
																	</div>
																</td>
															</tr>
															<tr>
															<td  class="text_tablehead">
																	<div align="right">
																		<span class="text_tablehead_b">用户角色:</span>
																	</div>
																</td>
																<td  class="text_list">
																	<div align="left">
																	<html:select property="roleindentifier" style="width: 280px">
																		<logic:present name="roleList">
																			<logic:iterate id="role" name="roleList">
																					<option value="${role.identifier}">
																		                  	${role.name}															                  	
																						</option>
																			</logic:iterate>
																		</logic:present>
																		</html:select>
																	</div>
																</td>
															</tr>
															<tr>
																<td  class="text_tablehead_b">
																	<div align="right">
																		备注:
																	</div>
																</td>
																<td  class="text_list">
																	<div align="left">
																		<html:textarea property="common" style="width:280px" rows="4" style="width:280px"></html:textarea>
																	</div>
																</td>
															</tr>
														</table>
														<br />
													</div>
												</td>
											</tr>
										</table>
										<span class="STYLE1">说明：红色*标注项为必填项</span>
										<br />
										<br />
										<input name="addButton" type="button" style="cursor: pointer" class="button"
											value="保  存" onclick="addGroup(document.forms[0])" />
										&nbsp;
										<input name="backButton" style="cursor: pointer" type="button" class="button" value="返  回"
											onclick="history.back();" />
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
 