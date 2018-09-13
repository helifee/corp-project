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
		<title>定期借记明细</title>
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
														<table  >
				
	
							<tr>
								<td  class="text_details_L">支付交易组号：</td><td  class="text_details_R" >${sap.pmtgrpid}</td>
			                   <td  class="text_details_L">系统号：</td><td  class="text_details_R" >小额</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">业务类型编码：</td><td  class="text_details_R">
			               		  <c:if test="${sap.pmttp=='F100'}">普通定期借记业务</c:if>
								  <c:if test="${sap.pmttp=='E102'}">定期代收</c:if>
																
								
			               		</td>
			                   <td  class="text_details_L">业务种类编码：</td><td  class="text_details_R">
			                                                    <c:if test="${sap.pmtkd=='00100'}">电费</c:if>
																<c:if test="${sap.pmtkd=='00200'}">水暖费</c:if>
																<c:if test="${sap.pmtkd=='00300'}">煤气费</c:if>
																<c:if test="${sap.pmtkd=='00400'}">电话费</c:if>	
															    <c:if test="${sap.pmtkd=='00500'}">通讯费</c:if>		
															    <c:if test="${sap.pmtkd=='00600'}">保险费</c:if>	
															    <c:if test="${sap.pmtkd=='00700'}">房屋管理费</c:if>
															    <c:if test="${sap.pmtkd=='00800'}">代理服务费</c:if>
															    <c:if test="${sap.pmtkd=='00900'}">学教费</c:if>	
															    <c:if test="${sap.pmtkd=='01000'}">有线电视费</c:if>	
															    <c:if test="${sap.pmtkd=='01100'}">企业管理费用</c:if>	
															     <c:if test="${sap.pmtkd=='09001'}">其他</c:if>	
																</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">客户号：</td>
			               		<td  class="text_details_R">
			               			  	 ${sap.proposercstmrid}
			               		</td>
			                   <td  class="text_details_L">联系电话：</td>
			                   <td  class="text_details_R">${sap.proposertel}</td>
			               </tr>
			               <tr>
			              		 <td  class="text_details_L">证件类型：</td>
			              		 <td  class="text_details_R">
			                   		<c:if test="${sap.proposercerttp=='01'}">身份证</c:if>
			                   		<c:if test="${sap.proposercerttp=='02'}">军官证</c:if>
			                   		<c:if test="${sap.proposercerttp=='03'}">学生证</c:if>
			                   </td>
			               	 	<td  class="text_details_L">证件号：</td>
			               	 	<td  class="text_details_R">${sap.proposercertid}</td>
			               </tr>
			              
			               <tr>
			               		<td  class="text_details_L">账号类型：</td><td  class="text_details_R">
			               		
			               	<c:if test="${sap.proposeraccttp=='AT00'}">	对公账户</c:if>
							<c:if test="${sap.proposeraccttp=='AT01'}">	个人贷记卡账户</c:if>
							<c:if test="${sap.proposeraccttp=='AT02'}">个人借记卡</c:if>	
			               	<c:if test="${sap.proposeraccttp=='AT03'}">存在</c:if>	
			               	<c:if test="${sap.proposeraccttp=='AT04'}">其他</c:if>		
			               		</td>
			               		 <td  class="text_details_L">币种代码：</td>
			               		 <td  class="text_details_R">${sap.proposeracctccy}</td> 
			               </tr>
			                
			              <tr>
			               		<td  class="text_details_L">	收款人账号：</td><td  class="text_details_R">${sap.cdtracct}</td>
			               		<td  class="text_details_L">	收款人名称 ：</td><td  class="text_details_R">${sap.cdtrnm}	</td>
			               </tr>
			              <tr>
			               		<td  class="text_details_L">		收款人地址：</td><td  class="text_details_R">${sap.cdtraddr}</td>
			               		 
			               </tr>
			                <tr>
			               		<td  class="text_details_L">		收款人开户行行号：</td><td  class="text_details_R">${sap.cdtrissuer}</td>
			               		 <td  class="text_details_L">		收款人开户行行名：</td><td  class="text_details_R">${sap.cdtrissuernm}</td>
			               </tr>
				 <tr>
			               		<td  class="text_details_L">	收款行行号 ：</td><td  class="text_details_R">${sap.cdtrbrnchid}</td>
			               		<td  class="text_details_L">	收款行行名 ：</td><td  class="text_details_R">${sap.cdtrbrnchnm}	</td>
			               </tr>
			               
			                <tr>
			               		<td  class="text_details_L">		收款清算行行号：</td><td  class="text_details_R">${sap.cdtrmmbid}</td>
			               		 
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


 
 