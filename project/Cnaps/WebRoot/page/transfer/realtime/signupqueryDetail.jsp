<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jstl/fmt_rt" prefix="fmt" %>
<%
	String path = request.getContextPath();
%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
		<title></title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="<%=path %>/js/ybjs/helpUtil.js"></script>
		<script type="text/javascript" src="<%=path %>/js/common/check.js"></script>
		<script type="text/javascript">

			 
		</script>
		
	</head>
	<body >
		<html:form method="post" action="/transfer/SAPSAccountQueueManagementAction.do?method=queryList">
		<input type="hidden" name="token" value="${token}"/>
		  <input id="signval" type="hidden" value="sign0">
		  <input id="id" name="id" type="hidden" value="${pvpform.id}"/>
		   <input id="chnmsgid" name="chnmsgid" type="hidden"  value="${pvpform.chnmsgid}"/>
			
			 
			
			
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
                						<div  class="text_title"><span class="text_blue2">付款签约明细</span></div>
                					</td>
                				</tr>
                			</table>
										<table width="95%" height="30" border="0" cellpadding="0"
											cellspacing="0" class="table_head" >
											
											<tr>
												<td height="30">
													<div align="center">
													<br/><br/><br/>
														<table >
				
	
	<tr>
	<td  class="text_details_L">证件类型：</td><td  class="text_details_R">
			               		 <c:if test="${sap.certsize=='01'}">身份证</c:if>
			               		 <c:if test="${sap.certsize=='02'}">军官证</c:if>
			               		 <c:if test="${sap.certsize=='03'}">学生证</c:if>
			               		
			               		 </td>
			                   <td  class="text_details_L">签约人证件号：</td><td  class="text_details_R" >${sap.certnum}</td>
			                   <!--<td  class="text_details_L">签约人证件发行国家：</td><td  class="text_details_R">${sap.issueState}</td>-->
			               </tr>
			               <tr>
			               		
			                   <td  class="text_details_L">签约姓名：</td><td  class="text_details_R">${sap.name}</td>
			                    <td  class="text_details_L">签约人客户号：</td><td  class="text_details_R">${sap.contractorcstmrid}
								</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">签约人地址：</td><td  class="text_details_R">
			               			  	 ${sap.address}
			               		</td>
			                   <td  class="text_details_L">签约人联系电话：</td><td  class="text_details_R">
			                   		${sap.phone}
			                   </td>
			               </tr>
			               <tr>
			               	 	<td  class="text_details_L">签约人账号类型：</td><td  class="text_details_R">
			               	  	 <c:if test="${sap.payAccountType=='AT00'}">对公账户</c:if>
			               	     <c:if test="${sap.payAccountType=='AT01'}">个人贷记卡账户</c:if>
								 <c:if test="${sap.payAccountType=='AT02'}">个人借记卡</c:if>										 
								<c:if test="${sap.payAccountType=='AT03'}">存在</c:if>										 
									<c:if test="${sap.payAccountType=='AT04'}">其他</c:if>	</td>
			               	 	<td  class="text_details_L">签约人账号：</td><td  class="text_details_R"> ${sap.payAccount}</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">币种代码：</td><td  class="text_details_R">${sap.moneyClassCode}</td>
			               		<td  class="text_details_L">签约类型：</td><td  class="text_details_R">
			               		
			               			 <c:if test="${sap.signUpType=='A'}">通兑</c:if>
                  <c:if test="${sap.signUpType=='B'}">通兑和账户查询</c:if>
                  <c:if test="${sap.signUpType=='C'}">账户查询</c:if>
             	</td>
			               </tr>
			               <tr>
			                   <td  class="text_details_L">签约人开户行行号：</td>
			                   <td  class="text_details_R"  >
			                   ${sap.applyOpenBankNum}
																
			                   </td>
			                    <td  class="text_details_L">签约人开户行名称： </td>
			                   <td  class="text_details_R"  >
			                  ${sap.applyOpenBankName}								
			                   </td>
			               </tr>
			               <tr>
																<td class="text_details_L" >
																	单笔金额上限：
																</td>
																<td >
															<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${sap.singleMoney}" />
																</td>
                                                  				<td class="text_details_L" >
																	累计金额上限：
																</td>
																<td>
																
																<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${sap.totalMoney}" />
																</td>
																
                                                  			</tr>
			               <tr>
			                   <td  class="text_details_L">生效日期：</td><td  class="text_details_R">	${sap.activeDate}</td>
			                   <td  class="text_details_L">失效日期：</td><td  class="text_details_R">${sap.unactiveDate}</td>
			               </tr>
			               <tr>
			               <td  class="text_details_L">签约姓名：</td><td  class="text_details_R">${sap.name}</td>
			                    <td  class="text_details_L">协议状态：</td><td  class="text_details_R">
  <c:if test="${sap.contractSts=='CS00'}">协议生效</c:if> 
  <c:if test="${sap.contractSts=='CS01'}">协议失效</c:if> 
  <c:if test="${sap.contractSts=='CS02'}">协议删除</c:if> 
  <c:if test="${sap.contractSts=='CS03'}">协议未生效</c:if> 
                 
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
	
 

 
			
			
			
			
			
			
			
			
			
		 
			
		 
			
		</html:form>
	</body>
</html>
 