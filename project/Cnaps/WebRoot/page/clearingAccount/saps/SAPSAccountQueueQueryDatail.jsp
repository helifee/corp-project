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
		<title>清算账户查询申请明细</title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="<%=path %>/js/ybjs/helpUtil.js"></script>
		<script type="text/javascript" src="<%=path %>/js/common/check.js"></script>
		<script type="text/javascript">

			 
		</script>
		
	</head>
	<body >
	
	
	 
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
			                   <td  class="text_details_L">工作日期：</td><td  class="text_details_R" >${sap.workDate}</td>
			                   <td  class="text_details_L">渠道报文标识号：</td><td  class="text_details_R">${sap.chnMsgId}</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">渠道报文接收时间：</td><td  class="text_details_R">${sap.chnDtTm}</td>
			                   <td  class="text_details_L">报文标识号：</td><td  class="text_details_R">	${sap.msgId}</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">报文发送时间：</td><td  class="text_details_R">
			               			 ${sap.creDtTm}
			               		</td>
			                   <td  class="text_details_L">回复报文标识号：</td><td  class="text_details_R">
			                   	${sap.replyMsgId}
			                   </td>
			               </tr>
			              
			               
			               <tr>
			               		<td  class="text_details_L">恢复报文发送时间：</td><td  class="text_details_R">
			               			${sap.replyDtTm}
			               		</td>
			                   <td  class="text_details_L">系统编号：</td><td  class="text_details_R">
			                   	${sap.systemCode}
			                   </td>
			               </tr>
			              
			                 <tr>
			               		<td  class="text_details_L">备注：</td><td  class="text_details_R">
			               			${sap.remarkInfo}
			               		</td>
			                   <td  class="text_details_L">业务状态：</td><td  class="text_details_R">
			                 ${sap.pmtSts}
			                   </td>
			               </tr>
			              <tr>
			               		<td  class="text_details_L">业务处理码：</td><td  class="text_details_R">
			               			${sap.proCode}
			               		</td>
			                   <td  class="text_details_L">业务拒绝信息：</td><td  class="text_details_R">
			                 ${sap.rjctDesc}
			                   </td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">终态日期：</td><td  class="text_details_R">
			               			${sap.proDate}
			               		</td>
			                   <td  class="text_details_L">查询方式：</td><td  class="text_details_R">
			                 ${sap.queryType}
			                   </td>
			               </tr>
			                 <tr>
			               		<td  class="text_details_L">被查询人行行号/被查询清算行行号：</td><td  class="text_details_R">
			               			${sap.managerIdentification}
			               		</td>
			                   <td  class="text_details_L">明细数：</td><td  class="text_details_R">
			                ${sap.numberOfTransactions}
			                   </td>
			               </tr>
			                <tr>
			               		<td  class="text_details_L">排队指令信息：</td><td  class="text_details_R">
			               			${sap.queueInstructionInformation}
			               		</td>
			                   <td  class="text_details_L"> </td><td  class="text_details_R">
			                
			                   </td>
			               </tr>
			                <tr>
			               		<td  class="text_details_L">发起直接参与机构：</td><td  class="text_details_R">
			               			 ${sap.sendDrctPty}
			               		</td>
			                   <td  class="text_details_L">发起间接参与机构：</td><td  class="text_details_R">
			                ${sap.sendIndrctPty}
			                   </td>
			               </tr>
			                  <tr>
			               		<td  class="text_details_L">接收直接参与机构：</td><td  class="text_details_R">
			               			${sap.recvDrctPty}
			               		</td>
			                   <td  class="text_details_L"> 接收间接参与机构：</td><td  class="text_details_R">
			                 ${sap.recvIndrctPty}
			                   </td>
			               </tr>
	 									</table>
													  
													 <br />
													 
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
 