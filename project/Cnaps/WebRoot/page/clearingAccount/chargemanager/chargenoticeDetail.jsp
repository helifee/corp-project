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
		<title>日间透支计息扣款通知查询</title>
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
			               		<td  class="text_details_L">接收直接参与机构：</td><td  class="text_details_R">${entity.recvDrctPty}</td>
			                   <td  class="text_details_L">接收间接参与机构：</td><td  class="text_details_R">	${entity.recvIndrctPty}</td>
			               </tr>
			                 <tr>
			               		<td  class="text_details_L">工作日期：</td><td  class="text_details_R">
			               				${entity.workDate} 
			               		</td>
			                   <td  class="text_details_L">计息时点个数：</td><td  class="text_details_R">
			                  ${entity.numberOfEntries}
			                   </td>
			               </tr>
			               
			               <tr>
			               		<td  class="text_details_L">	透支利息合计：</td><td  class="text_details_R">
			               			 ${entity.totalNetEntryAmount}
			               		</td>
			                   <td  class="text_details_L">	备注：</td><td  class="text_details_R">
			                  	${entity.detailNetEntryAmount}
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
