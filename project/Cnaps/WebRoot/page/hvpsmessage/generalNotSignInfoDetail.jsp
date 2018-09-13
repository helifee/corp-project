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
																	   <td  class="text_details_L">序号：				 </td><td  class="text_details_R" >${po.id}</td>
																	   <td  class="text_details_L">支付交易组号：</td><td  class="text_details_R">${po.pmtGrpId}</td>
																	</tr>
																	<tr>
																		<td  class="text_details_L">报文标识号：</td><td  class="text_details_R">${po.msgid}</td>
																	  <td  class="text_details_L">报文发送时间：</td><td  class="text_details_R">	${po.credttm}</td>
																	</tr>
																	<tr>
																		<td  class="text_details_L">回执报文标识号：</td><td  class="text_details_R">${po.resultmsgid}</td>
																	  <td  class="text_details_L">回复报文时间：</td><td  class="text_details_R">	${po.resultdttm}</td>
																	</tr>
																	
																	<tr>
																		<td  class="text_details_L">发起参与机构行号：</td><td  class="text_details_R">${po.instgPty}</td>
																	  <td  class="text_details_L">接收参与机构行号：</td><td  class="text_details_R">	${po.instdPty}</td>
																	</tr>
																	
																	<tr>
																		<td  class="text_details_L">发起直接参与机构：</td><td  class="text_details_R">${po.senddrctpty}</td>
																	  <td  class="text_details_L">接收直接参与机构：</td><td  class="text_details_R">	${po.recvdrctpty}</td>
																	</tr>
																	
																	<tr>
																		<td  class="text_details_L">系统编号：</td><td  class="text_details_R">${po.systemcode}</td>
																	  <td  class="text_details_L">备注：</td><td  class="text_details_R">	${po.remarkinfo}</td>
																	</tr>
																	
																	<tr>
																		<td  class="text_details_L">业务类型编码：</td><td  class="text_details_R">${po.txtpcd}</td>
																	  <td  class="text_details_L">来往标识：</td><td  class="text_details_R">
																	  	<c:if test="${po.txtpcd eq 'O'}">发送</c:if></td>
																	</tr>
																	
																	<tr>
																		<td  class="text_details_L">信息标题：</td><td  class="text_details_R">${po.title}</td>
																	  <td  class="text_details_L">信息内容：</td><td  class="text_details_R">	${po.content}</td>
																	</tr>
																	
																	<tr>
																		<td  class="text_details_L">附件长度：</td><td  class="text_details_R">${po.attachmentlength}</td>
																	  <td  class="text_details_L">附件名称：</td><td  class="text_details_R">	${po.attachmentname}</td>
																	</tr>
																	<tr>
																		<td  class="text_details_L">附件内容：</td><td  class="text_details_R">${po.attachmentcontent}</td>
																	  <td  class="text_details_L">业务状态：</td><td  class="text_details_R">	${po.pmtsts}</td>
																	</tr>
																	<tr>
																		<td  class="text_details_L">业务处理码：</td><td  class="text_details_R">${po.procode}</td>
																	  <td  class="text_details_L">业务拒绝信息：</td><td  class="text_details_R">	${po.rjctdesc}</td>
																	</tr>
																	<tr>
																		<td  class="text_details_L">业务处理参与机构：</td><td  class="text_details_R">${po.rjctedPtyId}</td>
																	  <td  class="text_details_L">工作日期：</td><td  class="text_details_R">	${po.workdate}</td>
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
