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
		<title></title>
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
			                   <td  class="text_details_L">系统编号：</td><td  class="text_details_R" >小额</td>
			                   <td  class="text_details_L">支付交易序号：</td><td  class="text_details_R">${sap.paymentGroupNum}</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">业务类型：</td><td  class="text_details_R">
			               		  <c:if test="${sap.businessSizeCode=='E100'}">普通定期贷记业务</c:if>
																<c:if test="${sap.businessSizeCode=='C210'}">薪金报酬</c:if>
																<c:if test="${sap.businessSizeCode=='A101'}">公益性资金汇划</c:if>
								
			               		</td>
			                   <td  class="text_details_L">业务种类：</td><td  class="text_details_R">
			                     <c:if test="${sap.businessClassCode=='00100'}">电费</c:if>
								<c:if test="${sap.businessClassCode=='00200'}">水暖费</c:if>
								<c:if test="${sap.businessClassCode=='00300'}">煤气费</c:if>
								<c:if test="${sap.businessClassCode=='00400'}">电话费</c:if>	
								 <c:if test="${sap.businessClassCode=='00500'}">通讯费</c:if>
								<c:if test="${sap.businessClassCode=='00600'}">保险费</c:if>
								<c:if test="${sap.businessClassCode=='00700'}">房屋管理费</c:if>
								<c:if test="${sap.businessClassCode=='00800'}">代理服务费</c:if>	
								<c:if test="${sap.businessClassCode=='00900'}">学教费</c:if>
								<c:if test="${sap.businessClassCode=='01000'}">有线电视费</c:if>
								<c:if test="${sap.businessClassCode=='09001'}">其他</c:if>	
								<c:if test="${sap.businessClassCode=='01100'}">企业管理费</c:if>	
								<c:if test="${sap.businessClassCode=='01200'}">薪金报酬</c:if>
								<c:if test="${sap.businessClassCode=='01300'}">慈善捐款</c:if>								
							 </td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">客户号：</td><td  class="text_details_R">
			               			  	 ${sap.proposerCstmrId}
			               		</td>
			                   <td  class="text_details_L">账号类型：</td><td  class="text_details_R">
			               		
			               	<c:if test="${sap.payAccountType=='AT00'}">	对公账户</c:if>
							<c:if test="${sap.payAccountType=='AT01'}">	个人贷记卡账户</c:if>
							<c:if test="${sap.payAccountType=='AT02'}">个人借记卡</c:if>	
			               	<c:if test="${sap.payAccountType=='AT03'}">存在</c:if>	
			               	<c:if test="${sap.payAccountType=='AT04'}">其他</c:if>		
			               		</td>
			               </tr>
			               <tr>
			               	 	<td  class="text_details_L">证件类型：</td><td  class="text_details_R">
			                   		<c:if test="${sap.certsize=='01'}">身份证</c:if>
			                   		<c:if test="${sap.certsize=='02'}">军官证</c:if>
			                   		<c:if test="${sap.certsize=='03'}">学生证</c:if>
			                   </td>
			               	  	<td  class="text_details_L">证件号：</td><td  class="text_details_R">${sap.certnum}</td>
			               </tr>
			               <tr>
			               		
			               		<td  class="text_details_L">联系电话：</td><td  class="text_details_R">${sap.phone}</td>
			               	  <td  class="text_details_L">币种代码：</td><td  class="text_details_R">${sap.proposerAcctCcy}</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">	付款人账号：</td><td  class="text_details_R">${sap.payerAcount}</td>
			               		<td  class="text_details_L">	付款人名称 ：</td><td  class="text_details_R">${sap.dbtrNm}	</td>
			               </tr>
			              <tr>
			               		<td  class="text_details_L">付款人开户行名称：</td><td  class="text_details_R">${sap.applyOpenBankName}</td>
			               		<td  class="text_details_L">付款人开户行行号：</td><td  class="text_details_R">${sap.applyOpenBankNum}	</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">		付款人地址：</td><td  class="text_details_R">${sap.dbtrAddr}</td>
			               		 
			               </tr>
			              
			              
				 <tr>
			               		<td  class="text_details_L">	付款行行号 ：</td><td  class="text_details_R">${sap.dbtrBrnchId}</td>
			               		<td  class="text_details_L">	付款行行名 ：</td><td  class="text_details_R">${sap.dbtrBrnchNm}	</td>
			               </tr>
			                <tr>
			               		<td  class="text_details_L">		付款清算行行号：</td><td  class="text_details_R">${sap.dbtrMmbId}</td>
			               		 
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


 
 