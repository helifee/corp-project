<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
	String path = request.getContextPath();
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<title>�ޱ����ĵ�</title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript" src="<%=path %>/js/systemManager/systemOrganizationManage/addSystemOrganization.js"></script>
		<script language="javascript">
    	function closewin(){
    		window.parent.location.href="<%=path%>/systemManage/systemOrganizationManageAction.do?method=querySystemOrganization";
    	}
    	</script>
	</head>
	<body>
		<html:form  method="post" action="systemManage/systemOrganizationManageAction.do?method=addSystemOrganization">
			<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				
				<tr valign="top">
					<td  ></td>
					<td  >
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
												<div  class="text_title"><span class="text_blue2">����»���</span></div>
											</td>
										</tr>
									</table>
										<table width="95%" height="30" border="0" cellpadding="0"
											cellspacing="0" class="table_body">
											
											<tr>
												<td height="30">
													<div align="center">
														<table width="55%" >
															<tr>
																<td  class="text_tablehead_b">
																	<div align="right">
																		��������:
																	</div>
																</td>
																<td  class="text_list">
																	<div align="left">
																	<html:text property="name" onblur="chinese2py(this)" maxlength="16" style="width:180px"></html:text><span class="STYLE1">*</span>
																		
																	</div>
																</td>
															</tr>
															<tr>
																<td  class="text_tablehead_b">
																	<div align="right">
																		��������:
																	</div>
																</td>
																<td  width="180" class="text_list">
																	<div align="left">
																		<html:text property="namecode" style="width:180px" maxlength="16"></html:text><span class="STYLE1">*</span>
																	</div>
																</td>
															</tr>
															<tr>
																<td  class="text_tablehead_b">
																	<div align="right">
																		����:
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
																	<!--  
																	     <logic:present name="organizationCodeSet">
																  <logic:iterate id="organizationCode" name="organizationCodeSet">
																 
																		        <option value="${organizationCode}"> 
																		      			${organizationCode}
																		        		</option>
																	 </logic:iterate>
																	
																 </logic:present>
																  -->
																	</html:select><span class="STYLE1">*</span>
																		
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
																		<html:text property="bankNumber" style="width:180px" maxlength="14" onkeypress="actkeyPress()" ></html:text><span class="STYLE1">*</span>
																	
																	</div>
																</td>
															</tr>
															<tr>
																<td  class="text_tablehead_b">
																	<div align="right">
																		ƴ����:
																	</div>
																</td>
																<td  class="text_list">
																	<div align="left">
																		<html:text property="phoneticizecode" readonly="true" style="width:180px"></html:text>
																	</div>
																</td>
															</tr>
															<tr>
																<td  class="text_tablehead_b">
																	<div align="right">
																		�ϼ�����:
																	</div>
																</td>
																<td  class="text_list">
																	<div id="brselect1" align="left">
																	<html:select  property="parentidentifier" style="width:180px">
																	 <option value="00001">��������</option>
																  <logic:present name="organizationList">
																  	
																  <logic:iterate id="oranization" name="organizationList">
 																	<option value="${oranization.namecode}">${oranization.name}  	</option>
																	</logic:iterate>
																	 
																 </logic:present>
																	</html:select>
																	</div>
																</td>
																
															</tr>
										
															<tr>
																<td  class="text_tablehead_b">
																	<div align="right">
																		��ַ:
																	</div>
																</td>
																<td  class="text_list">
																	
																	<div align="left">
																		<html:text property="address" style="width:180px"></html:text>
																	</div>
																</td>
																
															</tr>
															<tr>
																<td  class="text_tablehead_b">
																	<div align="right">
																		�绰:
																	</div>
																</td>
																<td  class="text_list">
																	
																	<div align="left">
																		<html:text property="telephone" style="width:180px"></html:text>
																	</div>
																</td>
															</tr>
															
														</table>
														<br />
														<table>
															<tr>
																<td>
																<span class="STYLE1">˵������ɫ*��ע��Ϊ������</span>
										<br />
										<br />
										<input name="saveButton" type="button" class="button"
											value="��  ��" onclick="addSystemOrganization(document.forms[0])" />
										
																</td>
															</tr>
														</table>
														<br />
										<br />
													</div>
												</td>
											</tr>
										</table>
										
										
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
 