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
		<title>�Զ�������������ϸ��ѯ</title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet"
			type="text/css" />

	</head>
	<body>
	
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
                						<div  class="text_title"><span class="text_blue2">��ϸ��Ϣ</span></div>
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
			                   <td  class="text_details_L">���ı�ʶ�ţ�</td><td  class="text_details_R" >	${entity.msgId}</td>
			                   <td  class="text_details_L">	���ķ���ʱ�䣺</td><td  class="text_details_R">${entity.creDtTm}</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">�������ı�ʶ�ţ�</td><td  class="text_details_R">${entity.chnMsgId}</td>
			                   <td  class="text_details_L">�������ķ���ʱ�䣺</td><td  class="text_details_R">	 ${entity.chnDtTm}</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">������ı�ʶ�ţ�</td><td  class="text_details_R">
			               			 ${entity.resultMsgId}
			               		</td>
			                   <td  class="text_details_L">������ķ���ʱ�䣺</td><td  class="text_details_R">
			                   	${entity.resultDtTm} 
			                   </td>
			               </tr>
			              
			               
			               <tr>
			               		<td  class="text_details_L">�ظ����ı�ʶ�ţ�</td><td  class="text_details_R">
			               			${entity.replyMsgId}
			               		</td>
			                   <td  class="text_details_L">	�ظ����ķ���ʱ�䣺</td><td  class="text_details_R">
			                   ${entity.replyDtTm}
			                   </td>
			               </tr>
			              
			                 <tr>
			               		<td  class="text_details_L">����ֱ�Ӳ��������</td><td  class="text_details_R">
			               				${entity.sendDrctPty}
			               		</td>
			                   <td  class="text_details_L">�����Ӳ��������</td><td  class="text_details_R">
			                 ${entity.sendIndrctPty}
			                   </td>
			               </tr>
			              <tr>
			               		<td  class="text_details_L"> ����ֱ�Ӳ��������</td><td  class="text_details_R">
			               				${entity.recvDrctPty}
			               		</td>
			                   <td  class="text_details_L">	���ռ�Ӳ��������</td><td  class="text_details_R">
			                 	${entity.recvIndrctPty}
			                   </td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">�������ڣ�</td><td  class="text_details_R">
			               			${entity.workDate}
			               		</td>
			                   <td  class="text_details_L">	ϵͳ��ţ�</td><td  class="text_details_R">
			                 	${entity.systemCode}
			                   </td>
			               </tr>
			                 <tr>
			               		<td  class="text_details_L">	������ʶ��</td><td  class="text_details_R">
			               			<c:if test="${entity.sendRecvFlag eq 'SR00'}">����</c:if>
																	<c:if test="${entity.sendRecvFlag eq 'SR01'}">����</c:if>
			               		</td>
			                   <td  class="text_details_L">��̬���ڣ�</td><td  class="text_details_R">
			              ${entity.proDate}
			                   </td>
			               </tr>
			                <tr>
			               		<td  class="text_details_L">	���Э��ţ�</td><td  class="text_details_R">
			               			${entity.protocolNumber }
			               		</td>
			                   <td  class="text_details_L">	�Զ����������ͣ� </td><td  class="text_details_R">
			                	<c:if test="${entity.interbankLoanManagementType eq 'PC00'}">ǩԼ</c:if>
																	<c:if test="${entity.interbankLoanManagementType eq 'PC01'}">����</c:if>
																	<c:if test="${entity.interbankLoanManagementType eq 'PC02'}">��Ȼָ�</c:if>
															
			                   </td>
			               </tr>
			                <tr>
			               		<td  class="text_details_L">	�����������кţ�</td><td  class="text_details_R">
			               			 ${entity.creditor}
			               		</td>
			                   <td  class="text_details_L">����������кţ�</td><td  class="text_details_R">
			               ${entity.debtor }
			                   </td>
			               </tr>
			                  <tr>
			               		<td  class="text_details_L">	��������ޣ�</td><td  class="text_details_R">
			               				${entity.interbankLoanUpperlimit}
			               		</td>
			                   <td  class="text_details_L"> ��������ޣ�</td><td  class="text_details_R">
			                	${entity.interbankLoanLowerlimit}
			                   </td>
			               </tr>
			                 <tr>
			               		<td  class="text_details_L">	���Э����Ч���ڣ�</td><td  class="text_details_R">
			               				${entity.protocolEffectiveDate}
			               		</td>
			                   <td  class="text_details_L"> 	���Э����ֹ���ڣ�</td><td  class="text_details_R">
			                		${entity.protocolExpirationDate}
			                   </td>
			               </tr>
			                <tr>
			               		<td  class="text_details_L">	�ָ���</td><td  class="text_details_R">
			               				${entity.amount}
			               		</td>
			                   <td  class="text_details_L"> 	ҵ������������</td><td  class="text_details_R">
			                			${entity.processParty}
			                   </td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">	ҵ��״̬��</td><td  class="text_details_R">
			               				${entity.pmtSts}
			               		</td>
			                   <td  class="text_details_L"> 	ҵ�����룺</td><td  class="text_details_R">
			                		${entity.proCode}
			                   </td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">	ҵ��ܾ���Ϣ��</td><td  class="text_details_R">
			               				${entity.rjctDesc}
			               		</td>
			                    
			               </tr>
	 							 <tr>
			               		<td  class="text_details_L">	��ע��</td><td  class="text_details_R">
			               			${entity.remarkInfo}
			               		</td>
			                    
			               </tr>		</table>
													  
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
