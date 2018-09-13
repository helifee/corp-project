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
		<title>	清算账户记账通知明细</title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet"
			type="text/css" />

	</head>
	<body>
	<table>
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
			                   <td  class="text_details_L">	工作日期：</td><td  class="text_details_R" >${entity.workdate}</td>
			                   <td  class="text_details_L">报文标识号：</td><td  class="text_details_R">${entity.msgid}</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">报文发送时间：</td><td  class="text_details_R">	${entity.credttm}</td>
			                   <td  class="text_details_L">发起直接参与机构：</td><td  class="text_details_R">${entity.senddrctpty}</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">发起间接参与机构：</td><td  class="text_details_R">
			               			  	${entity.sendindrctpty}
			               		</td>
			                   <td  class="text_details_L">接收直接参与机构：</td><td  class="text_details_R">
			                   		${entity.recvdrctpty}
			                   </td>
			               </tr>
			               <tr>
			               	 	<td  class="text_details_L">接收间接参与机构：</td><td  class="text_details_R">	${entity.recvindrctpty}</td>
			               	  	<td  class="text_details_L">系统编号：</td><td  class="text_details_R">${entity.systemcode}</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">备注：</td><td  class="text_details_R">${entity.remarkinfo}</td>
			               		<td  class="text_details_L">	原报文标识号：</td><td  class="text_details_R">
			               		${entity.orgnlmsgid}
             	</td>
			               </tr>
			               <tr>
			                   <td  class="text_details_L">原报文类型：</td>
			                   <td  class="text_details_R"  >
			                  ${entity.originalmessagetype}
																
			                   </td>
			                    <td  class="text_details_L">  NPC处理状态： </td>
			                   <td  class="text_details_R"  >
			                	${entity.processstatus}							
			                   </td>
			               </tr>
			               <tr>
			                   <td  class="text_details_L">	NPC处理码：</td><td  class="text_details_R">	${entity.processcode}</td>
			                   <td  class="text_details_L"> NPC拒绝信息：</td><td  class="text_details_R">	${entity.rejectinformation}</td>
			               </tr>
			               
			               <tr>
			                   <td  class="text_details_L">NPC轧差日期：</td><td  class="text_details_R"  >  ${entity.nettingdate} </td> 
			                 <td  class="text_details_L">  NPC轧差场次：</td><td  class="text_details_R"  >${entity.nettinground}</td>
			                 </tr>
				 <tr>
			                   <td  class="text_details_L">	 NPC清算日期：</td><td  class="text_details_R"  > ${entity.settlementdate} </td> 
			                 <td  class="text_details_L">    NPC接收时间：</td><td  class="text_details_R"  >${entity.receivetime}</td>
			                 </tr>
			                 <tr>
			                   <td  class="text_details_L">	 	NPC转发时间：</td><td  class="text_details_R"  > ${entity.transmittime} </td> 
			                 <td  class="text_details_L">    业务类型编码：</td><td  class="text_details_R"  >	${entity.transactiontype}</td>
			                 </tr>
			                 <tr>
			                   <td  class="text_details_L">	 业务种类编码：</td><td  class="text_details_R"  >${entity.categorypurposecode} </td> 
			                 <td  class="text_details_L">    被记账行行号：</td><td  class="text_details_R"  >	${entity.bookingid}</td>
			                 </tr>
			                  <tr>
			                   <td  class="text_details_L">	借贷标识：</td><td  class="text_details_R"  >	${entity.debitcreditid} </td> 
			                 <td  class="text_details_L">    金额：</td><td  class="text_details_R"  >	${entity.amount}</td>
			                 </tr>
			                 <tr>
			                   <td  class="text_details_L">	当前余额：</td><td  class="text_details_R"  >	${entity.balance} </td> 
			                 <td  class="text_details_L">    </td><td  class="text_details_R"  >	 </td>
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
	
			 
			</table>
	
 

 
			
			
			
			
			
			
			
			
			
		 
			
	
	
	
	
	
	
	
	
	
	
	
	 
	 
	</body>
</html>
