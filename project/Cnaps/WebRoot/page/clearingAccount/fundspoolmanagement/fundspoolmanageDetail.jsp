<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="/WEB-INF/tld/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/tld/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/tld/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
	String path = request.getContextPath();
%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<title>资金池管理明细查询</title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet"
			type="text/css" />

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
                						<div  class="text_title"><span class="text_blue2">	业务信息</span></div>
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
			                   <td  class="text_details_L">报文标识号：</td><td  class="text_details_R" >${entity.msgId}</td>
			                   <td  class="text_details_L">报文发送时间：</td><td  class="text_details_R">${entity.creDtTm}</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">渠道报文标识号：</td><td  class="text_details_R">${entity.chnMsgId}</td>
			                   <td  class="text_details_L">渠道报文发送时间：</td><td  class="text_details_R">	${entity.chnDtTm}</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">结果报文标识号：</td><td  class="text_details_R">
			               			  ${entity.resultMsgId}
			               		</td>
			                   <td  class="text_details_L">结果报文发送时间：</td><td  class="text_details_R">
			                   	${entity.resultDtTm}
			                   </td>
			               </tr>
			               <tr>
			               	 	<td  class="text_details_L">	发起直接参与机构：</td><td  class="text_details_R">	${entity.sendDrctPty}</td>
			               	  	 	<td  class="text_details_L">		发起间接参与机构：</td><td  class="text_details_R">		${entity.sendIndrctPty}</td>
			               	  	
			               </tr>
			               
			               
			                 <tr>
			               	 	<td  class="text_details_L">	接收直接参与机构：</td><td  class="text_details_R">	${entity.recvDrctPty}</td>
			               	  	 	<td  class="text_details_L">		接收间接参与机构：</td><td  class="text_details_R">		${entity.recvIndrctPty}</td>
			               	  	
			               </tr>
			               
			                <tr>
			               	 	<td  class="text_details_L">		工作日期：</td><td  class="text_details_R">		${entity.workDate}</td>
			               	  	 	<td  class="text_details_L">	系统编号：</td><td  class="text_details_R">			${entity.systemCode}</td>
			               	  	
			               </tr>
			            
			                <tr>
			               	 	<td  class="text_details_L">		终态日期：</td><td  class="text_details_R">		${entity.proDate}</td>
			               	  	 	<td  class="text_details_L">	资金池管理类型：</td><td  class="text_details_R">		<c:if test="${entity.fundsOfPoolManagementType eq 'MT00'}">设置解救顺序</c:if>
																	<c:if test="${entity.fundsOfPoolManagementType eq 'MT01'}">随机解救顺序</c:if>
																	<c:if test="${entity.fundsOfPoolManagementType eq 'MT02'}">停止资金池功能</c:if>
																	<c:if test="${entity.fundsOfPoolManagementType eq 'MT03'}">撤销设置</c:if></td>
			               	  	
			               </tr>
			                 <tr>
			               	 	<td  class="text_details_L">		生效日期：</td><td  class="text_details_R">		${entity.effectiveDate}</td>
			               	  	 	<td  class="text_details_L">	分支机构数目：</td><td  class="text_details_R">		${entity.branchQuantity }</td>
			               	  	
			               </tr>
			                   <tr>
			               	 	<td  class="text_details_L">	分支机构资金池清单：</td><td  class="text_details_R"></td>
			               	  	 	 
			               </tr>
			                 <tr>
			               	 	<td  class="text_details_L">		业务状态：</td><td  class="text_details_R">		${entity.pmtSts}</td>
			               	  	 	<td  class="text_details_L">		业务处理码：</td><td  class="text_details_R">	${entity.proCode}</td>
			               	  	
			               </tr>
			                 <tr>
			               	 	<td  class="text_details_L">		业务拒绝信息：</td><td  class="text_details_R">		${entity.rjctDesc}</td>
			               	  	  
			               </tr>
			                  <tr>
			               	 	<td  class="text_details_L">	备注：</td><td  class="text_details_R">		${entity.remarkInfo}</td>
			               	  	  
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
