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
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<title>�ޱ����ĵ�</title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
		<script language="javascript">
    	function closewin(){
    		window.parent.location.href="<%=path%>/systemManage/systemOrganizationManageAction.do?method=querySystemOrganization";
    	}
    	</script>
	</head>
	<body>
		<html:form method="post" action="systemManage/systemOrganizationManageAction.do?method=xxx">
			<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				
				<tr valign="top">
					<td></td>
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
														<span class="text_blue2">������Ϣ</span>
													</div>
												</td>
											</tr>
										</table>
										<table width="95%"  border="0" cellpadding="0"
											cellspacing="0" class="table_body">
											
											<tr>
												<td height="30">
													<div align="center" class="table_content">
														<table style="width:400px" border="0" cellpadding="1"
															cellspacing="1" class="tbdetails">
															
															<tr>
																<td  class="text_tablehead_b" width="100">
																	<div align="right">
																		ID��
																	</div>
																</td>
																<td  width="180" class="text_list">
																	<div align="left">
																		<html:text property="indentifier" value="${entity.indentifier}" style="width:180px" maxlength="12" readonly="true"></html:text>
																	</div>
																</td>
															</tr>
															<tr>
																<td  class="text_tablehead_b" width="100">
																	<div align="right">
																		����
																	</div>
																</td>
																<td  width="180" class="text_list">
																	<div align="left">
																		<html:text property="namecode" value="${entity.namecode}" style="width:180px" maxlength="5" readonly="true"></html:text>
																	</div>
																</td>
															</tr>
															<tr>
																<td  class="text_tablehead_b" width="100">
																	<div align="right">
																		����
																	</div>
																</td>
																<td  class="text_list">
																	<div align="left">
																	<html:text property="levelCode" value="${entity.levelCode}" style="width:180px" readonly="true"></html:text>
																	</div>
																</td>
															</tr>
															<tr>
																<td  class="text_tablehead_b" width="100">
																	<div align="right">
																		����
																	</div>
																</td>
																<td  class="text_list">
																	<div align="left">
																	<html:text property="name" value="${entity.name}" style="width:180px" readonly="true"></html:text>
																	</div>
																</td>
															</tr>
															<tr>
																<td  class="text_tablehead_b" width="100">
																	<div align="right">
																		ƴ����
																	</div>
																</td>
																<td  class="text_list">
																	<div align="left">
																		<html:text property="phoneticizecode" value="${entity.phoneticizecode}" style="width:180px" readonly="true"></html:text>
																	</div>
																</td>
															</tr>
															<tr>
																<td  class="text_tablehead_b" width="100">
																	<div align="right">
																		�ϼ�����
																	</div>
																</td>
																<td  class="text_list">
																	<div id="brselect1" align="left">
																<html:text property="parentidentifier" value="${entity.parentidentifier}" style="width:180px" readonly="true"></html:text>
																	
																	</div>
																</td>
																
															</tr>
															<tr>
																<td  class="text_tablehead_b" width="100">
																	<div align="right">
																		��ַ
																	</div>
																</td>
																<td  class="text_list">
																	<div align="left">
																		<html:text property="address" value="${entity.address}" style="width:180px" readonly="true"></html:text>
																	</div>
																</td>
																
															</tr>
															<tr>
																<td  class="text_tablehead_b" width="100">
																	<div align="right">
																		�绰
																	</div>
																</td>
																<td  class="text_list">
																	<div align="left">
																		<html:text property="telephone" value="${entity.telephone}" style="width:180px" readonly="true"></html:text>
																	</div>
																</td>
															</tr>
															
														</table>
														 <table>
                                                    	
                                                    	<tr>
                                                    		<td >
                                                    		<input name="backButton" type="button" class="button" value="��  ��"
											onclick="closewin();" />
										<br />		
                                                    	</td>
                                                    		
                                                    	</tr>
                                                    	
                                                    </table>
														<br />
													</div>
												</td>
											</tr>
										</table>
										<br />
										<br />
										
										<br />
									</div>
								</td>
							</tr>
						</table>
					</td>
					<td ></td>
					
				</tr>
			</table>
		</html:form>
	</body>
	</html>
 