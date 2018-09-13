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
                						<div  class="text_title"><span class="text_blue2"> 实时账户明细信息</span></div>
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
			                   <td  class="text_details_L">支付交易组号：</td>
			                   <td  class="text_details_R" >${sap.pmtGrpId}</td>
			                   <td  class="text_details_L">工作日期：</td>
			                   <td  class="text_details_R">${sap.workDt}</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">发起参与机构行号：</td>
			               		<td  class="text_details_R">${sap.instgPty}</td>
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
			                   <td  class="text_details_L">	账户支付类型：</td>
			                   <td  class="text_details_R">
			                   		 
			                   		<c:if test="${sap.acctPmtTp eq 'AT00' }">银行账号</c:if>
			                   		<c:if test="${sap.acctPmtTp eq 'AT01' }">贷记卡</c:if>
			                   		<c:if test="${sap.acctPmtTp eq 'AT02' }">借记卡</c:if>
			                   		<c:if test="${sap.acctPmtTp eq 'AT03' }">其他</c:if>
			                   </td>
			               </tr>
			               
			                <tr>
			               		<td  class="text_details_L">客户账户账号：</td>
			               		<td  class="text_details_R">
			               			  	${sap.cstmrAcctId}
			               		</td>
			                   <td  class="text_details_L">	客户账户名称：</td>
			                   <td  class="text_details_R">
			                   		${sap.cstmrAcctNm}
			                   </td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">密码验证码算法：</td>
			               		<td  class="text_details_R">
			               		<c:if test="${sap.chckMd eq 'CD00' }">支付密码单密码</c:if>
			               		<c:if test="${sap.chckMd eq 'CD01' }">支付密码器密码</c:if>
			               		<c:if test="${sap.chckMd eq 'CD04' }">客户密码</c:if>
			               		<c:if test="${sap.chckMd eq 'CD05' }">授权码</c:if> 
			               			  	 
			               		</td>
			               					                   <td  class="text_details_L">	查询余额或状态：</td>
			                   <td  class="text_details_R">
			                   <c:if test="${sap.qryBalOrStsTp eq 'QT00' }">查询余额</c:if>
			                   <c:if test="${sap.qryBalOrStsTp eq 'QT01' }">查询账户状态</c:if>		 
			                   </td>
			               		
			                  
			               </tr>
			              <!--     <tr>
			               		<td  class="text_details_L">密码验证码值：</td>
			               		<td  class="text_details_R">
			               			  	${sap.chckCdVal}
			               		</td>
			               		 <td  class="text_details_L">	密码验证码长度：</td>
			                   <td  class="text_details_R">
			                   		${sap.chckCdLen}
			                   </td>
			               </tr>
			               -->
			               
			                 <tr>
			               		<td  class="text_details_L">报文标识号：</td>
			               		<td  class="text_details_R">
			               			  	${sap.msgId}
			               		</td>
			                   <td  class="text_details_L">	报文发送时间：</td>
			                   <td  class="text_details_R">
			                   		${sap.creDtTm}
			                   </td>
			               </tr>
			                 <tr>
			               		<td  class="text_details_L">回执报文标识号：</td>
			               		<td  class="text_details_R">
			               			  	${sap.recptMsgId}
			               		</td>
			                   <td  class="text_details_L">回执报文时间：</td>
			                   <td  class="text_details_R">
			                   		${sap.recptDtTm}
			                   </td>
			               </tr>
			               
			                <tr>
			               		<td  class="text_details_L">当前余额：</td>
			               		<td  class="text_details_R">
			               			   
			               			  		<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${sap.crrntBal }"/>
							              			
			               		</td>
			                   <td  class="text_details_L">当前账户状态：</td>
			                   <td  class="text_details_R">
			                    
			                   
			                   <c:if test="${sap.crrntAcctSts eq 'AS01' }">已开户（正常）</c:if>	
			                  <c:if test="${sap.crrntAcctSts eq 'AS06' }">冻结</c:if>			 
			                   </td>
			               </tr>
			                <tr>
			               		<td  class="text_details_L">业务状态：</td>
			               		<td  class="text_details_R">
			               			  <c:if test="${sap.status eq 'PR04' }">已清算</c:if>
													<c:if test="${sap.status eq 'PR09' }">已拒绝</c:if>
													<c:if test="${sap.status eq 'PR08' }">已撤销</c:if>
													<c:if test="${sap.status eq 'PR09' }">已拒绝</c:if>
													<c:if test="${sap.status eq 'PR21' }">已止付</c:if>
													<c:if test="${sap.status eq 'PR22' }">已冲正</c:if>
													<c:if test="${sap.status eq 'PR32' }">已超期</c:if>
													<c:if test="${sap.status eq 'PR05' }">已成功</c:if>
													<c:if test="${sap.status eq 'PR98' }">待确认    </c:if>
													<c:if test="${sap.status eq 'PR90' }">新 建     </c:if>
													<c:if test="${sap.status eq 'PR91' }">待复核    </c:if>
													<c:if test="${sap.status eq 'PR92' }">待审核    </c:if>
													<c:if test="${sap.status eq 'PR93' }">待审批    </c:if>
													<c:if test="${sap.status eq 'PR94' }">已作废    </c:if>
												 
													<c:if test="${sap.status eq 'PR95' }">待组包    </c:if>
													<c:if test="${sap.status eq 'PR96' }">待发送    </c:if>
													<c:if test="${sap.status eq 'PR97' }">已发送    </c:if>
													<c:if test="${sap.status eq 'PR11' }">已轧差排队</c:if> 
													<c:if test="${sap.status eq 'PR12' }">已清算排队</c:if> 
													<c:if test="${sap.status eq 'PR99' }">故 障</c:if>
													<c:if test="${sap.status eq 'PR03' }">已轧差</c:if> 
													<c:if test="${sap.status eq 'PR89' }">待回执 </c:if>
													<c:if test="${sap.status eq 'PR88' }">已回执</c:if>
			               		</td>
			                   <td  class="text_details_L">处理状态：</td>
			                   <td  class="text_details_R">
			                   		${sap.prcSts}
			                   </td>
			               </tr>
			               
			                 <tr>
			               		<td  class="text_details_L">处理码：</td>
			               		<td  class="text_details_R">
			               			  	${sap.prcCd}
			               		</td>
			                   <td  class="text_details_L">拒绝信息：</td>
			                   <td  class="text_details_R">
			                   		${sap.rjctCd}
			                   </td>
			               </tr>
			                  <tr>
			               		<td  class="text_details_L">拒绝业务的参与机构行号：</td>
			               		<td  class="text_details_R">
			               			  	${sap.rjctedPtyId}
			               		</td>
			                   
			               </tr>
			               
			               
							 <tr>
			               	 	<td  class="text_details_L">	备注：</td>
			               	 	<td  class="text_details_R" colspan="3">${sap.ustrd}</td>
			               	  	
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
 