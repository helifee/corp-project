<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";	
			
%>
<%@ page language="java" pageEncoding="gbk"%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<title>�ޱ����ĵ�</title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript" src="<%=path %>/js/systemManager/systemOrganizationManage/modifySystemOrganization.js"></script>
		<script language="javascript">
    	function closewin(){
    		window.parent.location.href="<%=path%>/systemManage/systemOrganizationManageAction.do?method=querySystemOrganization";
    	}
    	</script>
	</head>
	<body>
		<html:form method="post"
			action="systemManage/systemOrganizationManageAction.do?method=modifySystemOrganization">
			<table width="100%"  border="0" cellpadding="0"
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
									<table width="95%"  border="0" cellpadding="0"
											cellspacing="0">
											<tr>
												<td >
													<div class="text_title">
														<span class="text_blue2">������Ϣ�޸�</span>
													</div>
												</td>
											</tr>
										</table>
										<table width="95%"  border="0" cellpadding="0"
											cellspacing="0" class="table_body">
											
											<tr>
												<td height="30">
													<div align="center" class="table_content">
														<table width="70%" border="0" cellpadding="1"
															cellspacing="1" >
															<tr>
																<td  class="text_tablehead_b" >
																	<div align="right">
																		ID��
																	</div>
																</td>
																<td  width="180" class="text_list">
																	<div align="left">
																		<html:text property="indentifier" value="${entity.indentifier}" style="width:180px" maxlength="12" readonly="true"></html:text><span class="STYLE1">*</span>
																	</div>
																</td>
															</tr>
															<tr>
																<td  class="text_tablehead_b">
																	<div align="right">
																		����
																	</div>
																</td>
																<td  class="text_list">
																	<div align="left">
																	<html:text property="name" onblur="chinese2py(this)" value="${entity.name}" style="width:180px"></html:text>
																		<span class="STYLE1">*</span>
																	</div>
																</td>
															</tr>
															<tr>
																<td  class="text_tablehead_b">
																	<div align="right">
																		����
																	</div>
																</td>
																<td  width="180" class="text_list">
																	<div align="left">
																		<html:text property="namecode" value="${entity.namecode}" style="width:180px" maxlength="16"></html:text><span class="STYLE1">*</span>
																	</div>
																</td>
															</tr>
															<tr>
																<td  class="text_tablehead_b">
																	<div align="right">
																		����
																	</div>
																</td>
																<td  class="text_list">
																	<div align="left">
																	<html:select property="levelCode" style="width:180px" >
																	   <c:if test="${orgentity.levelCode eq '01'}">
																		 	<option value="02"> 
																		      			����
																		        		</option>
																		    <option value="03"> 
																		      			֧��
																		        		</option>
																		</c:if>
																		<c:if test="${orgentity.levelCode eq '02'}">
																		 	
																		    <option value="03"> 
																		      			֧��
																		        		</option>
																		</c:if>
																	</html:select>
																		<span class="STYLE1">*</span>
																	</div>
																</td>
															</tr>
															<tr>
																<td  class="text_tablehead_b">
																	<div align="right">
																		ƴ����
																	</div>
																</td>
																<td  class="text_list">
																	<div align="left">
																		<html:text property="phoneticizecode" readonly="true" value="${entity.phoneticizecode}" style="width:180px"></html:text>
																	</div>
																</td>
															</tr>
															<tr>
																<td  class="text_tablehead_b">
																	<div align="right">
																		�ϼ�����
																	</div>
																</td>
																<td  class="text_list">
																	<div id="brselect1" align="left">
																<html:select property="parentidentifier" style="width: 180px">
																                <option value="00001">��������</option>
                                                                                 <logic:present name="organizationList">
																					<logic:iterate id="organization" name="organizationList">
																							<logic:equal name="organization" property="namecode" value="${entity.parentidentifier}">
																							<option
																								value="${organization.namecode }" selected="selected">
																								${organization.name }
																							</option>
																							</logic:equal>
																							<logic:notEqual name="organization" property="namecode" value="${entity.parentidentifier}">
																							<option
																								value="${organization.namecode }">
																								${organization.name }
																							</option>
																							</logic:notEqual>
																						</logic:iterate>
																				</logic:present>
																			</html:select>
																	<span class="STYLE1">*</span>
																	</div>
																</td>
																
															</tr>
										<tr>
																<td  class="text_tablehead_b">
																	<div align="right">
																		��������к�:
																	</div>
																</td>
																<td  width="180" class="text_list">
																	<div align="left">
																		<html:text property="bankNumber" style="width:180px" maxlength="14" onkeypress="actkeyPress()" value="${entity.bankNumber}"  ></html:text><span class="STYLE1">*</span>
																	
																	</div>
																</td>
															</tr>
															<tr>
																<td  class="text_tablehead_b">
																	<div align="right">
																		��ַ
																	</div>
																</td>
																<td  class="text_list">
																	
																	<div align="left">
																		<html:text property="address" value="${entity.address}" style="width:180px"></html:text>
																	</div>
																</td>
																
															</tr>
															<tr>
																<td  class="text_tablehead_b">
																	<div align="right">
																		�绰
																	</div>
																</td>
																<td  class="text_list">
																	
																	<div align="left">
																		<html:text property="telephone" value="${entity.telephone}" style="width:180px"></html:text>
																	</div>
																</td>
															</tr>
															
														</table>
														 <table>
                                                    	
                                                    	<tr>
                                                    		<td >
                                                    			 <input name="modifyButton" type="button" class="button"
											value="��  ��" onclick="modifySystemOrganization(document.forms[0])" />
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
