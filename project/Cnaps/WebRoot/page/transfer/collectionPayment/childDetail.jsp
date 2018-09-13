 <%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
	String path = request.getContextPath();
%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
		<title>批量客户账户信息查询</title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="<%=path %>/js/ybjs/helpUtil.js"></script>
		 <script type="text/javascript">

			 
		</script>
		
	</head>
	<body >
	
	 
	 
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
                						<div  class="text_title"><span class="text_blue2">账户清单明细信息</span></div>
                					</td>
                				</tr>
                			</table>
										<table width="95%" height="30" border="0" cellpadding="0"
											cellspacing="0" class="table_head" >
											
											<tr>
												<td height="30">
													<div align="center">
													<br/><br/><br/>
														<table  >
				
	
	                       <tr>
			                   <td  class="text_details_L">账户账号(卡号)：</td>
			                   <td  class="text_details_R" >${sap.acctId}</td>
			                   <td  class="text_details_L">账户名称：</td>
			                   <td  class="text_details_R">${sap.acctNm}</td>
			               </tr>
			               <tr>
			                   <td  class="text_details_L">账户状态：</td>
			                   <td  class="text_details_R" >${sap.acctSts}</td>
			                   <td  class="text_details_L">开户行行号：</td>
			                   <td  class="text_details_R">${sap.issuer}</td>
			               </tr>
			               
			               
			               <tr>
			                   <td  class="text_details_L">业务状态：</td>
			                   <td  class="text_details_R" >${sap.status}</td>
			                   <td  class="text_details_L">业务拒绝处理码：</td>
			                   <td  class="text_details_R">${sap.txRjctCd}</td>
			               </tr>
			               
			               
			                 <tr>
			                   <td  class="text_details_L">业务拒绝信息：</td>
			                   <td  class="text_details_R" >${sap.txRjctInf}</td>
			                   <td  class="text_details_L">业务处理参与机构：</td>
			                   <td  class="text_details_R">${sap.rjctedPtyId}</td>
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
			
			
			 
			
			
			
			
			
	

 
</body>
</html>


 
 