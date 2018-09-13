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
		<title>批量代收主表明细</title>
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
			                   <td  class="text_details_L">支付交易组号：</td>
			                   <td  class="text_details_R" >${sap.pmtGrpId}</td>
			                   <td  class="text_details_L">工作日期：</td>
			                   <td  class="text_details_R">${sap.workDt}</td>
			               </tr>
				
				         <tr>
			                   <td  class="text_details_L">报文标识号：</td>
			                   <td  class="text_details_R" >${sap.msgId}</td>
			                   <td  class="text_details_L">报文发送时间：</td>
			                   <td  class="text_details_R">${sap.creDtTm}</td>
			               </tr>
				         <tr>
			                   <td  class="text_details_L">回执报文标识号：</td>
			                   <td  class="text_details_R" >${sap.recptMsgId}</td>
			                   <td  class="text_details_L">回执报文时间：</td>
			                   <td  class="text_details_R">${sap.recptDtTm}</td>
			               </tr>
				         	<tr>
			                   <td  class="text_details_L">发起参与机构行号：</td>
			                   <td  class="text_details_R" >${sap.instgPty}</td>
			                   <td  class="text_details_L">接收参与机构行号：</td>
			                   <td  class="text_details_R">${sap.instdPty}</td>
			               </tr>			
				             <tr>
			               		<td  class="text_details_L">发起直接参与机构：</td>
			               		<td  class="text_details_R">
			               		 ${sap.instgDrctPty}
															 		
			               		</td>
			                   <td  class="text_details_L">接收直接参与机构：</td>
			                   <td  class="text_details_R">
			                     ${sap.instdDrctPty}
			                    											</td>
			               </tr>
				
				       <tr>
			               		<td  class="text_details_L">系统编号：</td>
			               		<td  class="text_details_R">
			               			  	 ${sap.systemCd}
			               		</td>
			                   <td  class="text_details_L">批次序号：</td>
			                   <td  class="text_details_R">
			                   		 	 ${sap.btchNb}
			                   </td>
			               </tr>
				          <tr>
			               		<td  class="text_details_L">付款清算行行号：</td>
			               		<td  class="text_details_R">${sap.dbtrMmbId}</td>
			               		<td  class="text_details_L">收款清算行行号      ：</td>
			               		<td  class="text_details_R">${sap.cdtrMmbId}	</td>
			               </tr>
				          <tr>
			               		<td  class="text_details_L">收款行行号：</td>
			               		<td  class="text_details_R">${sap.cdtrBrnchId}</td>
			               		<td  class="text_details_L">收款人名称      ：</td>
			               		<td  class="text_details_R">${sap.cdtrNm}	</td>
			               </tr>
				          <tr>
			               		<td  class="text_details_L">收款人账号：</td>
			               		<td  class="text_details_R">${sap.cdtrAcct}</td>
			               		<td  class="text_details_L">总金额      ：</td>
			               		<td  class="text_details_R">${sap.ttlAmt}	</td>
			               </tr>
				          <tr>
			               		<td  class="text_details_L">总笔数：</td>
			               		<td  class="text_details_R">${sap.ttlNb}</td>
			               		<td  class="text_details_L">业务类型编码      ：</td>
			               		<td  class="text_details_R">${sap.pmtTp}	</td>
			               </tr>
				
				            <tr>
			               		<td  class="text_details_L">付款人数目：</td>
			               		<td  class="text_details_R">${sap.dbtrNb}</td>
			               		<td  class="text_details_L">回执期限      ：</td>
			               		<td  class="text_details_R">${sap.rcptLtd}	</td>
			               </tr>
				         
			                			               <tr>
			               		<td  class="text_details_L">业务状态：</td>
			               		<td  class="text_details_R">${sap.status}</td>
			               		<td  class="text_details_L">处理状态  ：</td>
			               		<td  class="text_details_R">${sap.prcSts}	</td>
			               </tr>
				              <tr>
			               		<td  class="text_details_L">处理码：</td>
			               		<td  class="text_details_R">${sap.prcCd}</td>
			               		<td  class="text_details_L">拒绝信息      ：</td>
			               		<td  class="text_details_R">${sap.rjctInf}	</td>
			               </tr> 
				                <tr>
			               		<td  class="text_details_L"> 轧差日期：</td>
			               		<td  class="text_details_R">${sap.netgDt}</td>
			               		<td  class="text_details_L">轧差场次      ：</td>
			               		<td  class="text_details_R">${sap.netgRnd}	</td>
			               </tr> 
				              
			              <tr>
			               		<td  class="text_details_L">清算日期：</td>
			               		<td  class="text_details_R">${sap.sttlmDt}</td>
			               		<td  class="text_details_L">	NPC接收时间：</td>
			               		<td  class="text_details_R">${sap.npcRcvDt}	</td>
			               </tr>
			              
				               <tr>
			               		<td  class="text_details_L">NPC转发时间：</td>
			               		<td  class="text_details_R">${sap.npcTrnsmtTm}</td>
			               		<td  class="text_details_L">	成功付款总金额：</td>
			               		<td  class="text_details_R">${sap.rcvgTtlAmt}	</td>
			               </tr>
				          
				               <tr>
			               		<td  class="text_details_L">成功付款总笔数：</td>
			               		<td  class="text_details_R">${sap.rcvgTtlNb}</td>
			               		
			               </tr>
				
				
	
	                      
			              
			              
			               
			              
			              
			               
			                
			              
			              <tr>
			               		<td  class="text_details_L">		备注：</td><td  class="text_details_R">${sap.ustrd}</td>
			               		 
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


 
 