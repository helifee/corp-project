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
		<title>��������������ϸ</title>
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
														<table  >
				
				         <tr>
			                   <td  class="text_details_L">֧��������ţ�</td>
			                   <td  class="text_details_R" >${sap.pmtGrpId}</td>
			                   <td  class="text_details_L">�������ڣ�</td>
			                   <td  class="text_details_R">${sap.workDt}</td>
			               </tr>
				
				         <tr>
			                   <td  class="text_details_L">���ı�ʶ�ţ�</td>
			                   <td  class="text_details_R" >${sap.msgId}</td>
			                   <td  class="text_details_L">���ķ���ʱ�䣺</td>
			                   <td  class="text_details_R">${sap.creDtTm}</td>
			               </tr>
				         <tr>
			                   <td  class="text_details_L">��ִ���ı�ʶ�ţ�</td>
			                   <td  class="text_details_R" >${sap.recptMsgId}</td>
			                   <td  class="text_details_L">��ִ����ʱ�䣺</td>
			                   <td  class="text_details_R">${sap.recptDtTm}</td>
			               </tr>
				         	<tr>
			                   <td  class="text_details_L">�����������кţ�</td>
			                   <td  class="text_details_R" >${sap.instgPty}</td>
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
			                   <td  class="text_details_L">������ţ�</td>
			                   <td  class="text_details_R">
			                   		 	 ${sap.btchNb}
			                   </td>
			               </tr>
				          <tr>
			               		<td  class="text_details_L">�����������кţ�</td>
			               		<td  class="text_details_R">${sap.dbtrMmbId}</td>
			               		<td  class="text_details_L">�տ��������к�      ��</td>
			               		<td  class="text_details_R">${sap.cdtrMmbId}	</td>
			               </tr>
				          <tr>
			               		<td  class="text_details_L">�տ����кţ�</td>
			               		<td  class="text_details_R">${sap.cdtrBrnchId}</td>
			               		<td  class="text_details_L">�տ�������      ��</td>
			               		<td  class="text_details_R">${sap.cdtrNm}	</td>
			               </tr>
				          <tr>
			               		<td  class="text_details_L">�տ����˺ţ�</td>
			               		<td  class="text_details_R">${sap.cdtrAcct}</td>
			               		<td  class="text_details_L">�ܽ��      ��</td>
			               		<td  class="text_details_R">${sap.ttlAmt}	</td>
			               </tr>
				          <tr>
			               		<td  class="text_details_L">�ܱ�����</td>
			               		<td  class="text_details_R">${sap.ttlNb}</td>
			               		<td  class="text_details_L">ҵ�����ͱ���      ��</td>
			               		<td  class="text_details_R">${sap.pmtTp}	</td>
			               </tr>
				
				            <tr>
			               		<td  class="text_details_L">��������Ŀ��</td>
			               		<td  class="text_details_R">${sap.dbtrNb}</td>
			               		<td  class="text_details_L">��ִ����      ��</td>
			               		<td  class="text_details_R">${sap.rcptLtd}	</td>
			               </tr>
				         
			                			               <tr>
			               		<td  class="text_details_L">ҵ��״̬��</td>
			               		<td  class="text_details_R">${sap.status}</td>
			               		<td  class="text_details_L">����״̬  ��</td>
			               		<td  class="text_details_R">${sap.prcSts}	</td>
			               </tr>
				              <tr>
			               		<td  class="text_details_L">�����룺</td>
			               		<td  class="text_details_R">${sap.prcCd}</td>
			               		<td  class="text_details_L">�ܾ���Ϣ      ��</td>
			               		<td  class="text_details_R">${sap.rjctInf}	</td>
			               </tr> 
				                <tr>
			               		<td  class="text_details_L"> �������ڣ�</td>
			               		<td  class="text_details_R">${sap.netgDt}</td>
			               		<td  class="text_details_L">�����      ��</td>
			               		<td  class="text_details_R">${sap.netgRnd}	</td>
			               </tr> 
				              
			              <tr>
			               		<td  class="text_details_L">�������ڣ�</td>
			               		<td  class="text_details_R">${sap.sttlmDt}</td>
			               		<td  class="text_details_L">	NPC����ʱ�䣺</td>
			               		<td  class="text_details_R">${sap.npcRcvDt}	</td>
			               </tr>
			              
				               <tr>
			               		<td  class="text_details_L">NPCת��ʱ�䣺</td>
			               		<td  class="text_details_R">${sap.npcTrnsmtTm}</td>
			               		<td  class="text_details_L">	�ɹ������ܽ�</td>
			               		<td  class="text_details_R">${sap.rcvgTtlAmt}	</td>
			               </tr>
				          
				               <tr>
			               		<td  class="text_details_L">�ɹ������ܱ�����</td>
			               		<td  class="text_details_R">${sap.rcvgTtlNb}</td>
			               		
			               </tr>
				
				
	
	                      
			              
			              
			               
			              
			              
			               
			                
			              
			              <tr>
			               		<td  class="text_details_L">		��ע��</td><td  class="text_details_R">${sap.ustrd}</td>
			               		 
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


 
 