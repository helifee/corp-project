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
		<title>清算账户信息查询明细</title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />

	</head>
	<body>
		<html:form method="post"
			action="systemManage/systemOrganizationManageAction.do?method=xxx">
			
		 
				
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
                						<div  class="text_title"><span class="text_blue2">清算账户信息明细</span></div>
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
			                   <td  class="text_details_L">	工作日期：   </td><td  class="text_details_R" >${entity.workdate}</td>
			                   <td  class="text_details_L">渠道报文标识号：</td><td  class="text_details_R">${entity.chnmsgid}</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">渠道报文接收时间：</td><td  class="text_details_R">${entity.chndttm}</td>
			                   <td  class="text_details_L">报文标识号：</td><td  class="text_details_R">${entity.msgid}</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">报文发送时间：</td><td  class="text_details_R">
			               			  	${entity.credttm}
			               		</td>
			                   <td  class="text_details_L">回复报文标识号：</td><td  class="text_details_R">
			                   		${entity.replymsgid}
			                   </td>
			               </tr>
			               <tr>
			               	 	<td  class="text_details_L">回复报文发送时间：</td><td  class="text_details_R"> ${entity.replydttm}</td>
			               	  	<td  class="text_details_L">发起直接参与机构：</td><td  class="text_details_R">${entity.senddrctpty}</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">发起间接参与机构：</td><td  class="text_details_R">${entity.sendindrctpty}</td>
			               		<td  class="text_details_L">接收直接参与机构：</td><td  class="text_details_R">
			               		
			               			${entity.recvdrctpty}
             	</td>
			               </tr>
			               <tr>
			                   <td  class="text_details_L">接收间接参与机构：</td>
			                   <td  class="text_details_R"  >
			                  	${entity.recvindrctpty}
																
			                   </td>
			                    <td  class="text_details_L">系统编号： </td>
			                   <td  class="text_details_R"  >
			                 ${entity.systemcode}							
			                   </td>
			               </tr>
			               <tr>
			                   <td  class="text_details_L">业务状态：</td><td  class="text_details_R">	${entity.pmtsts}</td>
			                   <td  class="text_details_L">业务处理码：</td><td  class="text_details_R">	${entity.procode}         </td>
			               </tr>
			               
			               <tr>
			                   <td  class="text_details_L">业务拒绝信息：</td><td  class="text_details_R"  >${entity.rjctdesc}</td> 
			                 <td  class="text_details_L">终态日期：</td><td  class="text_details_R"  >${entity.prodate}</td>
			                 </tr>
				<tr>
			                   <td  class="text_details_L">查询方式：</td><td  class="text_details_R"  >${entity.querytype}</td> 
			                 <td  class="text_details_L">被查询清算行行号：</td><td  class="text_details_R"  >${entity.manageridentification}</td>
			                 </tr>
			                 <tr>
			                   <td  class="text_details_L">清算账户明细数：</td><td  class="text_details_R"  >${entity.numberofaccount}</td> 
			                 <td  class="text_details_L">账户信息：</td><td  class="text_details_R"  >${entity.accountinformation}</td>
			                 </tr>
	 								<tr>
			                   <td  class="text_details_L">备注：</td><td  class="text_details_R"  >${entity.remarkinfo}</td> 
			                 <td  class="text_details_L"> </td><td  class="text_details_R"  > </td>
			                 </tr>	</table>
													  
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
	
 

 
			
			
			
			
			
			
			
			s
			
			
			
			
			
			
		 
		   
													 
														 
															
					 
			
		</html:form>
	</body>
</html>
