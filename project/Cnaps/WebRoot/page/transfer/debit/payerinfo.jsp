<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jstl/fmt_rt" prefix="fmt"%>
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
                						<div  class="text_title"><span class="text_blue2"> 付款人明细信息</span></div>
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
			                   <td  class="text_details_L">付款人账号：</td><td  class="text_details_R" >${poDetails.dbtracct}</td>
			                   <td  class="text_details_L">付款人名称：</td><td  class="text_details_R">${poDetails.dbtrnm}</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">付款人地址 ：</td><td  class="text_details_R">${poDetails.dbtraddr}</td>
			                    
			               </tr>
			               <tr>
			               		<td  class="text_details_L">付款人开户行行号：</td><td  class="text_details_R">
			               			  	${poDetails.dbtrissuer}
			               		</td>
			                   <td  class="text_details_L">付款人开户行行名 ：</td><td  class="text_details_R">
			                   		${poDetails.dbtrissuernm}
			                   </td>
			               </tr>
			               <tr>
			               	 	<td  class="text_details_L">付款行行号：</td><td  class="text_details_R"  >${poDetails.dbtrbrnchid}</td>
			               	  		<td  class="text_details_L">付款行行名：</td><td  class="text_details_R"  >${poDetails.dbtrbrnchnm}</td>
			               </tr>
			                <tr>
			               		<td  class="text_details_L">付款清算行行号：</td><td  class="text_details_R">
			               			  	${poDetails.dbtrmmbid}
			               		</td>
			                   <td  class="text_details_L">	单笔金额：</td><td  class="text_details_R">
			                   	 
			                   	 <fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${poDetails.dtlAmt}"/>
											
			                   </td>
			               </tr>
			                <tr>
			               		<td  class="text_details_L">扣款合同号：</td><td  class="text_details_R">
			               			  	${poDetails.pmtagrmtnb}
			               		</td>
			                  
			               </tr>
			               
							 <tr>
			               	 	<td  class="text_details_L">	附言：</td><td  class="text_details_R" colspan="3">${poDetails.addtlinf}</td>
			               	  		 
			               </tr>									 
			              <%-- 
			                <tr>
			               	  
			               	  		<td  class="text_details_L">	备注：</td><td  class="text_details_R" colspan="3">${poDetails.ustrd}</td>
			               </tr>
			               --%>
			            
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
 