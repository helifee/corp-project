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
		<title>������λȫ�������Բ�ѯ��ϸ</title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet"
			type="text/css" />

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
			                   <td  class="text_details_L">�������ڣ�</td><td  class="text_details_R" >${entity.workdate}</td>
			                   <td  class="text_details_L">�������ı�ʶ�ţ�</td><td  class="text_details_R">${entity.chnmsgid}</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">	�������Ľ���ʱ�䣺</td><td  class="text_details_R">	${entity.chndttm}</td>
			                   <td  class="text_details_L">���ı�ʶ�ţ�</td><td  class="text_details_R">${entity.msgid}</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">���ķ���ʱ�䣺</td><td  class="text_details_R">
			               			 	${entity.credttm}
			               		</td>
			                   <td  class="text_details_L">�ظ����ı�ʶ�ţ�</td><td  class="text_details_R">
			                   		${entity.replymsgid}
			                   </td>
			               </tr>
			               <tr>
			               	 	<td  class="text_details_L">	�ظ����ķ���ʱ�䣺</td><td  class="text_details_R"> ${entity.replydttm}</td>
			               	  	<td  class="text_details_L">����ֱ�Ӳ��������</td><td  class="text_details_R">${entity.senddrctpty}</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">�����Ӳ��������</td><td  class="text_details_R">${entity.sendindrctpty}</td>
			               		<td  class="text_details_L">	����ֱ�Ӳ��������</td><td  class="text_details_R">
			               		
			               			${entity.recvdrctpty} 
             	</td>
			               </tr>
			               <tr>
			                   <td  class="text_details_L">���ռ�Ӳ��������</td>
			                   <td  class="text_details_R"  >
			                   ${entity.recvindrctpty}
																
			                   </td>
			                    <td  class="text_details_L">	ϵͳ��ţ� </td>
			                   <td  class="text_details_R"  >
			                 	${entity.systemcode}							
			                   </td>
			               </tr>
			               <tr>
			                   <td  class="text_details_L">	ҵ��״̬��</td><td  class="text_details_R">	${entity.pmtsts}</td>
			                   <td  class="text_details_L">ҵ�����룺</td><td  class="text_details_R">${entity.procode}</td>
			               </tr>
			               
			               <tr>
			                   <td  class="text_details_L">ҵ��ܾ���Ϣ��</td><td  class="text_details_R"  >  ${entity.rjctdesc}</td> 
			                 <td  class="text_details_L">�ܾ�ҵ��Ĳ�������кţ�</td><td  class="text_details_R"  >${entity.partyidentification}
			                 </td>
			                 </tr>
			                 
			                 <tr>
			                   <td  class="text_details_L">�������ҵ��ܾ��룺</td><td  class="text_details_R"  > ${entity.partyprocesscode}</td> 
			                 <td  class="text_details_L">��̬���ڣ�</td><td  class="text_details_R"  >${entity.prodate}
			                 </td>
			                 </tr>
			                 <tr>
			                   <td  class="text_details_L">��ѯ��ʽ��</td><td  class="text_details_R"  > ${entity.querytype}</td> 
			                 <td  class="text_details_L">����ѯ�������кţ�</td><td  class="text_details_R"  >${entity.manageridentification}
			                 </td>
			                 </tr>
			                 <tr>
			                   <td  class="text_details_L">�����˻��ͷ������˻��ϼ�����</td><td  class="text_details_R"  > 	${entity.totalaccount}</td> 
			                 <td  class="text_details_L">	ȫ�������Ի����� </td><td  class="text_details_R"  >${entity.totalbalance}
			                 </td>
			                 </tr>
			                   <tr>
			                   <td  class="text_details_L">	ȫ�������Ի��ܿ���ͷ�磺</td><td  class="text_details_R"  > 	 ${entity.totalcurrentamount}</td> 
			                 <td  class="text_details_L">	ȫ�������Ի���Ԥ��ͷ�磺 </td><td  class="text_details_R"  >${entity.totalexpectedamount}
			                 </td>
			                 </tr>
			                   <tr>
			                   <td  class="text_details_L">�����˻�����</td><td  class="text_details_R"  > 	${entity.numberofsettlementaccount}</td> 
			                 <td  class="text_details_L">		�����˻������Ի����� </td><td  class="text_details_R"  >${entity.settlementbalance}
			                 </td>
			                 </tr>
				   <tr>
			                   <td  class="text_details_L">	�����˻����ܿ���ͷ�磺</td><td  class="text_details_R"  > 	${entity.settlementcurrentamount}</td> 
			                 <td  class="text_details_L">		�����˻�����Ԥ��ͷ�磺 </td><td  class="text_details_R"  >${entity.settlementexpectedamount}
			                 </td>
			                 </tr>
			                 <tr>
			                   <td  class="text_details_L">	�����˻���Ϣ��</td><td  class="text_details_R"  > ${entity.settlementaccountinformation}</td> 
			                 <td  class="text_details_L">		��ע�� </td><td  class="text_details_R"  >${entity.remarkinfo}
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
