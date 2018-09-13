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
                						<div  class="text_title"><span class="text_blue2"> 票交回执业务明细</span></div>
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
			                   <td  class="text_details_L">上级节点：</td>
			                   <td  class="text_details_R" >${sap.parented}</td>
			                    
			               </tr>
	
	<tr>
			                   <td  class="text_details_L">端对端标识号：</td><td  class="text_details_R" >${sap.endToEndId}</td>
			                   <td  class="text_details_L">明细标识号：</td><td  class="text_details_R">${sap.txId}</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">业务类型编码：</td><td  class="text_details_R">${sap.pmtTp}</td>
			                    
			               </tr>
			               <tr>
			               		<td  class="text_details_L">货币符号：</td><td  class="text_details_R">
			               			  	${sap.currencyCd}
			               		</td>
			                   <td  class="text_details_L">金额 ：</td><td  class="text_details_R">
			                   		${sap.amount}
			                   </td>
			               </tr>
			               <tr>
			               	 	<td  class="text_details_L">付款人用户名：</td><td  class="text_details_R"  >${sap.dbtrNm}</td>
			               	  		<td  class="text_details_L">付款人帐号：</td><td  class="text_details_R"  >${sap.dbtrAcct}</td>
			               </tr>
			                <tr>
			               		<td  class="text_details_L">付款人开户行行号：</td><td  class="text_details_R">
			               			  	${sap.dbtrIssuer}
			               		</td>
			                   <td  class="text_details_L">	付款清算行行号：</td><td  class="text_details_R">
			                   		${sap.dbtrMmbId}
			                   </td>
			               </tr>
						 								 
			               <tr>
			               		<td  class="text_details_L">付款行行号：</td><td  class="text_details_R">
			               			  	${sap.dbtrBrnchId}
			               		</td>
			                   <td  class="text_details_L">	收款清算行行号：</td><td  class="text_details_R">
			                   		${sap.cdtrMmbId}
			                   </td>
			               </tr>
			               
			               
			               <tr>
			               		<td  class="text_details_L">收款行行号：</td><td  class="text_details_R">
			               			  	${sap.cdtrBrnchId}
			               		</td>
			                   <td  class="text_details_L">	收款人名称：</td><td  class="text_details_R">
			                   		${sap.cdtrNm}
			                   </td>
			               </tr>
			               
			               <tr>
			               		<td  class="text_details_L">收款人帐号：</td><td  class="text_details_R">
			               			  	${sap.cdtrAcct}
			               		</td>
			                   <td  class="text_details_L">	收款人开户行行号：</td><td  class="text_details_R">
			                   		${sap.cdtrIssuer}
			                   </td>
			               </tr>
			               
			               
			               <tr>
			               		<td  class="text_details_L">业务种类编码：</td><td  class="text_details_R">
			               			  	${sap.pmtKd}
			               		</td>
			                   <td  class="text_details_L">	原CIS委托日期：</td><td  class="text_details_R">
			                   		${sap.ornglCisCnsgnDt}
			                   </td>
			               </tr>
			               
			                   <tr>
			               		<td  class="text_details_L">原cis交易序号：</td><td  class="text_details_R">
			               			  	${sap.ornglCisTxId}
			               		</td>
			                   <td  class="text_details_L">	原cis票据号码：</td><td  class="text_details_R">
			                   		${sap.ornglCisNotesNo}
			                   </td>
			               </tr>
			                 <tr>
			               		<td  class="text_details_L">回执状态：</td><td  class="text_details_R">
			               			  	${sap.rcptSts}
			               		</td>
			                   <td  class="text_details_L">	业务拒绝处理码：</td><td  class="text_details_R">
			                   		${sap.txRjctCd}
			                   </td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">业务拒绝信息：</td><td  class="text_details_R">
			               			  	${sap.txRjctInf}
			               		</td>
			                   <td  class="text_details_L">	npc处理状态：</td><td  class="text_details_R">
			                   		${sap.prcSts}
			                   </td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">npc轧差日期：</td><td  class="text_details_R">
			               			  	${sap.netgDt}
			               		</td>
			                   <td  class="text_details_L">	npc轧差场次：</td><td  class="text_details_R">
			                   		${sap.netgRnd}
			                   </td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">npc清算日期/终态日期：</td><td  class="text_details_R">
			               			  	${sap.sttlmDt}
			               		</td>
			                  
			               </tr>
			                <tr>
			               	  
			               	  		<td  class="text_details_L">	备注：</td><td  class="text_details_R" colspan="3">${sap.ustrd}</td>
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
 