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
                						<div  class="text_title"><span class="text_blue2"> ʵʱ�˻���ϸ��Ϣ</span></div>
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
			                   <td  class="text_details_L">֧��������ţ�</td>
			                   <td  class="text_details_R" >${sap.pmtGrpId}</td>
			                   <td  class="text_details_L">�������ڣ�</td>
			                   <td  class="text_details_R">${sap.workDt}</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">�����������кţ�</td>
			               		<td  class="text_details_R">${sap.instgPty}</td>
			                   <td  class="text_details_L">���ղ�������кţ�</td>
			                   <td  class="text_details_R">${sap.instdPty}</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">����ֱ�Ӳ��������</td>
			               		<td  class="text_details_R">
			               			  	${sap.instgDrctPty}
			               		</td>
			                   <td  class="text_details_L">����ֱ�Ӳ��������</td>
			                   <td  class="text_details_R">
			                   		${sap.instdDrctPty}
			                   </td>
			               </tr>
			              
			                <tr>
			               		<td  class="text_details_L">ϵͳ��ţ�</td>
			               		<td  class="text_details_R">
			               			  	${sap.systemCd}
			               		</td>
			                   <td  class="text_details_L">	�˻�֧�����ͣ�</td>
			                   <td  class="text_details_R">
			                   		 
			                   		<c:if test="${sap.acctPmtTp eq 'AT00' }">�����˺�</c:if>
			                   		<c:if test="${sap.acctPmtTp eq 'AT01' }">���ǿ�</c:if>
			                   		<c:if test="${sap.acctPmtTp eq 'AT02' }">��ǿ�</c:if>
			                   		<c:if test="${sap.acctPmtTp eq 'AT03' }">����</c:if>
			                   </td>
			               </tr>
			               
			                <tr>
			               		<td  class="text_details_L">�ͻ��˻��˺ţ�</td>
			               		<td  class="text_details_R">
			               			  	${sap.cstmrAcctId}
			               		</td>
			                   <td  class="text_details_L">	�ͻ��˻����ƣ�</td>
			                   <td  class="text_details_R">
			                   		${sap.cstmrAcctNm}
			                   </td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">������֤���㷨��</td>
			               		<td  class="text_details_R">
			               		<c:if test="${sap.chckMd eq 'CD00' }">֧�����뵥����</c:if>
			               		<c:if test="${sap.chckMd eq 'CD01' }">֧������������</c:if>
			               		<c:if test="${sap.chckMd eq 'CD04' }">�ͻ�����</c:if>
			               		<c:if test="${sap.chckMd eq 'CD05' }">��Ȩ��</c:if> 
			               			  	 
			               		</td>
			               					                   <td  class="text_details_L">	��ѯ����״̬��</td>
			                   <td  class="text_details_R">
			                   <c:if test="${sap.qryBalOrStsTp eq 'QT00' }">��ѯ���</c:if>
			                   <c:if test="${sap.qryBalOrStsTp eq 'QT01' }">��ѯ�˻�״̬</c:if>		 
			                   </td>
			               		
			                  
			               </tr>
			              <!--     <tr>
			               		<td  class="text_details_L">������֤��ֵ��</td>
			               		<td  class="text_details_R">
			               			  	${sap.chckCdVal}
			               		</td>
			               		 <td  class="text_details_L">	������֤�볤�ȣ�</td>
			                   <td  class="text_details_R">
			                   		${sap.chckCdLen}
			                   </td>
			               </tr>
			               -->
			               
			                 <tr>
			               		<td  class="text_details_L">���ı�ʶ�ţ�</td>
			               		<td  class="text_details_R">
			               			  	${sap.msgId}
			               		</td>
			                   <td  class="text_details_L">	���ķ���ʱ�䣺</td>
			                   <td  class="text_details_R">
			                   		${sap.creDtTm}
			                   </td>
			               </tr>
			                 <tr>
			               		<td  class="text_details_L">��ִ���ı�ʶ�ţ�</td>
			               		<td  class="text_details_R">
			               			  	${sap.recptMsgId}
			               		</td>
			                   <td  class="text_details_L">��ִ����ʱ�䣺</td>
			                   <td  class="text_details_R">
			                   		${sap.recptDtTm}
			                   </td>
			               </tr>
			               
			                <tr>
			               		<td  class="text_details_L">��ǰ��</td>
			               		<td  class="text_details_R">
			               			   
			               			  		<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${sap.crrntBal }"/>
							              			
			               		</td>
			                   <td  class="text_details_L">��ǰ�˻�״̬��</td>
			                   <td  class="text_details_R">
			                    
			                   
			                   <c:if test="${sap.crrntAcctSts eq 'AS01' }">�ѿ�����������</c:if>	
			                  <c:if test="${sap.crrntAcctSts eq 'AS06' }">����</c:if>			 
			                   </td>
			               </tr>
			                <tr>
			               		<td  class="text_details_L">ҵ��״̬��</td>
			               		<td  class="text_details_R">
			               			  <c:if test="${sap.status eq 'PR04' }">������</c:if>
													<c:if test="${sap.status eq 'PR09' }">�Ѿܾ�</c:if>
													<c:if test="${sap.status eq 'PR08' }">�ѳ���</c:if>
													<c:if test="${sap.status eq 'PR09' }">�Ѿܾ�</c:if>
													<c:if test="${sap.status eq 'PR21' }">��ֹ��</c:if>
													<c:if test="${sap.status eq 'PR22' }">�ѳ���</c:if>
													<c:if test="${sap.status eq 'PR32' }">�ѳ���</c:if>
													<c:if test="${sap.status eq 'PR05' }">�ѳɹ�</c:if>
													<c:if test="${sap.status eq 'PR98' }">��ȷ��    </c:if>
													<c:if test="${sap.status eq 'PR90' }">�� ��     </c:if>
													<c:if test="${sap.status eq 'PR91' }">������    </c:if>
													<c:if test="${sap.status eq 'PR92' }">�����    </c:if>
													<c:if test="${sap.status eq 'PR93' }">������    </c:if>
													<c:if test="${sap.status eq 'PR94' }">������    </c:if>
												 
													<c:if test="${sap.status eq 'PR95' }">�����    </c:if>
													<c:if test="${sap.status eq 'PR96' }">������    </c:if>
													<c:if test="${sap.status eq 'PR97' }">�ѷ���    </c:if>
													<c:if test="${sap.status eq 'PR11' }">�������Ŷ�</c:if> 
													<c:if test="${sap.status eq 'PR12' }">�������Ŷ�</c:if> 
													<c:if test="${sap.status eq 'PR99' }">�� ��</c:if>
													<c:if test="${sap.status eq 'PR03' }">������</c:if> 
													<c:if test="${sap.status eq 'PR89' }">����ִ </c:if>
													<c:if test="${sap.status eq 'PR88' }">�ѻ�ִ</c:if>
			               		</td>
			                   <td  class="text_details_L">����״̬��</td>
			                   <td  class="text_details_R">
			                   		${sap.prcSts}
			                   </td>
			               </tr>
			               
			                 <tr>
			               		<td  class="text_details_L">�����룺</td>
			               		<td  class="text_details_R">
			               			  	${sap.prcCd}
			               		</td>
			                   <td  class="text_details_L">�ܾ���Ϣ��</td>
			                   <td  class="text_details_R">
			                   		${sap.rjctCd}
			                   </td>
			               </tr>
			                  <tr>
			               		<td  class="text_details_L">�ܾ�ҵ��Ĳ�������кţ�</td>
			               		<td  class="text_details_R">
			               			  	${sap.rjctedPtyId}
			               		</td>
			                   
			               </tr>
			               
			               
							 <tr>
			               	 	<td  class="text_details_L">	��ע��</td>
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
 