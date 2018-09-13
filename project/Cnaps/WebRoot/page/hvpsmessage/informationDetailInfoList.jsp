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
														 
					<c:choose>
						<c:when test="${cnaps2jydm =='15101000'}">
							<tr><td  class="text_details_L" >序号<br></td><td  class="text_list_L" >${po.id }</td>
								<td  class="text_details_L" >渠道报文标识号</td><td  class="text_details_R" style="width: 180px;">${po.chnmsgid }</td></tr>
							<tr><td  class="text_details_L">报文发送时间</td><td  class="text_details_R">${po.chncredttm }</td>
								<td  class="text_details_L">报文标识号</td><td  class="text_details_R">${po.msgid }</td></tr>
							<tr><td  class="text_details_L">报文发送时间</td><td  class="text_details_R">${po.credttm }</td>
								<td  class="text_details_L">返回报文标识号</td><td  class="text_details_R">${po.resultmsgid }</td></tr>
							<tr><td  class="text_details_L">返回报文时间</td><td  class="text_details_R">${po.resultdttm }</td>
								<td  class="text_details_L">发起直接参与机构</td><td  class="text_details_R">${po.sendbranch }</td></tr>
							<tr><td  class="text_details_L">接收直接参与机构</td><td  class="text_details_R">${po.recvbranch }</td>
								<td  class="text_details_L">发起参与机构行号</td><td  class="text_details_R">${po.instgpty }</td></tr>
							<tr><td  class="text_details_L">接收参与机构行号</td><td  class="text_details_R">${po.instdpty }</td>
								<td  class="text_details_L">信息内容</td><td  class="text_details_R">${po.msgcnt }</td></tr>
							<tr><td  class="text_details_L">业务状态</td><td  class="text_details_R">${po.pmtsts }</td>
								<td  class="text_details_L">工作日期</td><td  class="text_details_R">${po.workdate }</td></tr>
							<tr><td  class="text_details_L">终态日期</td><td  class="text_details_R">${po.prodate }</td>
								<td  class="text_details_L">处理码</td><td  class="text_details_R">${po.procode }</td></tr>
							<tr><td  class="text_details_L">业务拒绝信息</td><td  class="text_details_R">${po.rjctdesc }</td>
								<td  class="text_details_L">业务拒绝吗</td><td  class="text_details_R">${po.rjctrsn }</td></tr>
							<tr><td  class="text_details_L">来往标识</td><td  class="text_details_R">${po.direction }</td>
								<td  class="text_details_L">系统编号</td><td  class="text_details_R">${po.systemcd }</td></tr>
							<tr><td  class="text_details_L">报文类型</td><td  class="text_details_R">${po.msgtpcd }</td></tr>
						</c:when>
					</c:choose>
							

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
