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
		<title>	�����˻�����֪ͨ��ϸ</title>
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
			                   <td  class="text_details_L">	�������ڣ�</td><td  class="text_details_R" >${entity.workdate}</td>
			                   <td  class="text_details_L">���ı�ʶ�ţ�</td><td  class="text_details_R">${entity.msgid}</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">���ķ���ʱ�䣺</td><td  class="text_details_R">	${entity.credttm}</td>
			                   <td  class="text_details_L">����ֱ�Ӳ��������</td><td  class="text_details_R">${entity.senddrctpty}</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">�����Ӳ��������</td><td  class="text_details_R">
			               			  	${entity.sendindrctpty}
			               		</td>
			                   <td  class="text_details_L">����ֱ�Ӳ��������</td><td  class="text_details_R">
			                   		${entity.recvdrctpty}
			                   </td>
			               </tr>
			               <tr>
			               	 	<td  class="text_details_L">���ռ�Ӳ��������</td><td  class="text_details_R">	${entity.recvindrctpty}</td>
			               	  	<td  class="text_details_L">ϵͳ��ţ�</td><td  class="text_details_R">${entity.systemcode}</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">��ע��</td><td  class="text_details_R">${entity.remarkinfo}</td>
			               		<td  class="text_details_L">	ԭ���ı�ʶ�ţ�</td><td  class="text_details_R">
			               		${entity.orgnlmsgid}
             	</td>
			               </tr>
			               <tr>
			                   <td  class="text_details_L">ԭ�������ͣ�</td>
			                   <td  class="text_details_R"  >
			                  ${entity.originalmessagetype}
																
			                   </td>
			                    <td  class="text_details_L">  NPC����״̬�� </td>
			                   <td  class="text_details_R"  >
			                	${entity.processstatus}							
			                   </td>
			               </tr>
			               <tr>
			                   <td  class="text_details_L">	NPC�����룺</td><td  class="text_details_R">	${entity.processcode}</td>
			                   <td  class="text_details_L"> NPC�ܾ���Ϣ��</td><td  class="text_details_R">	${entity.rejectinformation}</td>
			               </tr>
			               
			               <tr>
			                   <td  class="text_details_L">NPC�������ڣ�</td><td  class="text_details_R"  >  ${entity.nettingdate} </td> 
			                 <td  class="text_details_L">  NPC����Σ�</td><td  class="text_details_R"  >${entity.nettinground}</td>
			                 </tr>
				 <tr>
			                   <td  class="text_details_L">	 NPC�������ڣ�</td><td  class="text_details_R"  > ${entity.settlementdate} </td> 
			                 <td  class="text_details_L">    NPC����ʱ�䣺</td><td  class="text_details_R"  >${entity.receivetime}</td>
			                 </tr>
			                 <tr>
			                   <td  class="text_details_L">	 	NPCת��ʱ�䣺</td><td  class="text_details_R"  > ${entity.transmittime} </td> 
			                 <td  class="text_details_L">    ҵ�����ͱ��룺</td><td  class="text_details_R"  >	${entity.transactiontype}</td>
			                 </tr>
			                 <tr>
			                   <td  class="text_details_L">	 ҵ��������룺</td><td  class="text_details_R"  >${entity.categorypurposecode} </td> 
			                 <td  class="text_details_L">    ���������кţ�</td><td  class="text_details_R"  >	${entity.bookingid}</td>
			                 </tr>
			                  <tr>
			                   <td  class="text_details_L">	�����ʶ��</td><td  class="text_details_R"  >	${entity.debitcreditid} </td> 
			                 <td  class="text_details_L">    ��</td><td  class="text_details_R"  >	${entity.amount}</td>
			                 </tr>
			                 <tr>
			                   <td  class="text_details_L">	��ǰ��</td><td  class="text_details_R"  >	${entity.balance} </td> 
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
