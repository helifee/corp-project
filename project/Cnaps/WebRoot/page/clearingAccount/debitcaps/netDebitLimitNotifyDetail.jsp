<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%
		response.setHeader("Pragma","No-cache");
		response.setHeader("Cache-Control","no-cache");
		response.setDateHeader("Expires", 0);	
		String path = request.getContextPath();
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<title>明细信息</title>
		<link rel="stylesheet" type="text/css" href="<%=path%>/css/page_color1.css"  />
		<script language="javascript">
    </script>
	</head>
	<body>
		<form>
			<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">				
				<tr valign="top">
					<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF;" ><br></td>
					<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF);">
						<br />
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td width="10">
									&nbsp;
								<br></td>
								<td>
									<div align="center">
									<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" >
                				<tr>
                					<td colspan="6">
                						<div  class="text_title"><span class="text_blue2">明细信息</span></div>
                					</td>
                				</tr>
                			</table>
										<table width="95%" height="30" border="0" cellpadding="0"
											cellspacing="0" class="table_head" >
											
											<tr>
												<td height="30">
													<div align="center">
													<br/><br/><br/>
														<table class="tbcolor">
															<tr>
																<td  class="text_details_L" >工作日期：</td>
																<td  class="text_details_R" >${entity.workdate}</td>
																<td  class="text_details_L" >报文标识号：</td>
																<td  class="text_details_R" >${entity.msgid}</td>
															</tr>
															<tr>
																<td   class="text_details_L" >报文发送时间：</td>
																<td class="text_details_R">${entity.credttm}</td>
																<td   class="text_details_L" >发起直接参与机构：</td>
																<td class="text_details_R">${entity.senddrctpty}</td>
															</tr>
															<tr>
																<td   class="text_details_L"  >发起间接参与机构：</td>
																<td  class="text_details_R">${entity.sendindrctpty}</td>
																<td   class="text_details_L"  >接收直接参与机构：</td>
																<td class="text_details_R">${entity.recvdrctpty}</td>
															</tr>
															<tr>
																<td   class="text_details_L" >接收间接参与机构：</td>
																<td  class="text_details_R">${entity.recvindrctpty}</td>
																<td   class="text_details_L"  >系统编号：</td>
																<td class="text_details_R">${entity.systemcode}</td>
															</tr>
															<tr>
																<td   class="text_details_L"  >备注：</td>
																<td  class="text_details_R">${entity.remarkinfo}</td>
																<td   class="text_details_L" >通知类型：</td>
																<td class="text_details_R">${entity.notificationtype}</td>
															</tr>
															<tr>
																<td   class="text_details_L" >通知内容：</td>
																<td  class="text_details_R">${entity.notificationcontent}</td>
															</tr>
														</table>
													 <br />
													</div>
												<br></td>
											</tr>
										</table>
									</div>
								<br></td>
							</tr>
						</table>
					<br></td>
					<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF);"><br></td>
	
				</tr>
			</table>
		</form>		
	</body>
</html>
