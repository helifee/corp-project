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
		<title></title>
		<link href="<%=path%>/css/page_color.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="<%=path %>/js/ybjs/helpUtil.js"></script>
		<script type="text/javascript" src="<%=path %>/js/common/check.js"></script>
		<script type="text/javascript">
function commitForm(){
			return document.forms[0].submit();
				}
			 
		</script>
		
	</head>
	<body >
		<form method="post" action="<%=path %>/transfer/SAPSAccountQueueManagementAction.do?method=querySave">
		<input type="hidden" name="token" value="${token}"/>
		  <input id="signval" type="hidden" value="sign0">
		  		<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				<tr>
					<td width="8" height="48" ></td>
					<td >
						<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
							<tr>
							<td  width="360" class="text_tablehead_b">
									<h5 align="left"> &nbsp; &nbsp; </h5>
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
										<table border="0" cellspacing="0" cellpadding="0">
											<th class="text_tablehead_b" ><h4 align="center">������Ȩ</h4></th>
											<tr>
												<td>
													<fieldset style="width:700px;border:1px #CCCCCC solid; padding:3px;" align=center >
							  			  			<legend >��Ȩ��Ϣ</legend> 
													<table border="0" cellspacing="0" cellpadding="0">
													
															<tr>
														<!--
															<td class="text_tablehead_b" align="right" width="180px">ԭҵ�����ͱ��룺</td>
															<td style="width:180px;" >	
																<input name="po.originalTransactionTypeCode" id="originalTransactionTypeCode" type="text" style="width:180px;" title="ԭҵ�����ͱ���"  />
														
															
															</td>
													-->
															<td class="text_tablehead_b" align="right" width="180px">��Ȩ�ˣ�</td>
																<td style="width:180px;" >			
																<input name="authorization" id="authorization" type="text" style="width:180px;" title="���е�������"  />
															
																</td>
														</tr>
														
													</table>
													</fieldset>
													<fieldset style="width:700px;border:1px #CCCCCC solid; padding:3px;" align="center" >
							  			  			<!--  <legend >���������Ϣ</legend> 
													<table border="0" cellspacing="0" cellpadding="0">
													
														<tr>
														<td class="text_tablehead_b" align="right" style="width:180px;">����ֱ�Ӳ��������</td>
															<td style="width:180px;" > 
																<input name="po.sendDrctPty" id="sendDrctPty" type="text" style="width:180px;" title="���ķ���ʱ��"  />
															
															</td>
														
															<td class="text_tablehead_b" align="right" style="width:180px;" >�����Ӳ��������</td>
															<td style="width:180px;" >
															<input name="po.sendIndrctPty" id="sendIndrctPty" type="text" style="width:180px;" title="���ķ���ʱ��"  />
															
															</td>
															
														</tr>
														
													</table>
													</fieldset>
													<fieldset style="width:700px;border:1px #CCCCCC solid; padding:3px;" align="center" >
							  			  			<legend >���ջ�����Ϣ</legend> 
													<table border="0" cellspacing="0" cellpadding="0">
													
														<tr>
															<td class="text_tablehead_b" align="right" style="width:180px;">����ֱ�Ӳ��������</td>
															<td style="width:180px;" >
															<input name="po.recvDrctPty" id="recvDrctPty" type="text" style="width:180px;" title="���ķ���ʱ��"  />
															
															</td>
															<td class="text_tablehead_b" align="right" style="width:180px;">���ռ�Ӳ��������</td>
															<td style="width:180px;" > 
															<input name="po.recvIndrctPty" id="recvIndrctPty" type="text" style="width:180px;" title="���ķ���ʱ��"  />
															
															</td>		
															</tr>
													
													</table>
													</fieldset>
													<fieldset style="width:700px;border:1px #CCCCCC solid; padding:3px;" align="center" >-->
							  			  		 
													 
											
										</table>
										<br />
										<span class="STYLE1">˵������ɫ*��ע��Ϊ������</span>
										<br />
										<br />
										<input name="addButton" type="button" style="cursor: pointer" class="button" value="${pvpform==null ?  "¼��":"����"}" onclick="commitForm();" />
										&nbsp;
										<input name="backButton" style="cursor: pointer" type="button" class="button" value="��  ��" onclick="history.back();" />
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
			
		</form>
	</body>
</html>
 