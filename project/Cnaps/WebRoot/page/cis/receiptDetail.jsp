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
                						<div  class="text_title"><span class="text_blue2"> Ʊ����ִҵ����ϸ</span></div>
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
			                   <td  class="text_details_L">�ϼ��ڵ㣺</td>
			                   <td  class="text_details_R" >${sap.parented}</td>
			                    
			               </tr>
	
	<tr>
			                   <td  class="text_details_L">�˶Զ˱�ʶ�ţ�</td><td  class="text_details_R" >${sap.endToEndId}</td>
			                   <td  class="text_details_L">��ϸ��ʶ�ţ�</td><td  class="text_details_R">${sap.txId}</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">ҵ�����ͱ��룺</td><td  class="text_details_R">${sap.pmtTp}</td>
			                    
			               </tr>
			               <tr>
			               		<td  class="text_details_L">���ҷ��ţ�</td><td  class="text_details_R">
			               			  	${sap.currencyCd}
			               		</td>
			                   <td  class="text_details_L">��� ��</td><td  class="text_details_R">
			                   		${sap.amount}
			                   </td>
			               </tr>
			               <tr>
			               	 	<td  class="text_details_L">�������û�����</td><td  class="text_details_R"  >${sap.dbtrNm}</td>
			               	  		<td  class="text_details_L">�������ʺţ�</td><td  class="text_details_R"  >${sap.dbtrAcct}</td>
			               </tr>
			                <tr>
			               		<td  class="text_details_L">�����˿������кţ�</td><td  class="text_details_R">
			               			  	${sap.dbtrIssuer}
			               		</td>
			                   <td  class="text_details_L">	�����������кţ�</td><td  class="text_details_R">
			                   		${sap.dbtrMmbId}
			                   </td>
			               </tr>
						 								 
			               <tr>
			               		<td  class="text_details_L">�������кţ�</td><td  class="text_details_R">
			               			  	${sap.dbtrBrnchId}
			               		</td>
			                   <td  class="text_details_L">	�տ��������кţ�</td><td  class="text_details_R">
			                   		${sap.cdtrMmbId}
			                   </td>
			               </tr>
			               
			               
			               <tr>
			               		<td  class="text_details_L">�տ����кţ�</td><td  class="text_details_R">
			               			  	${sap.cdtrBrnchId}
			               		</td>
			                   <td  class="text_details_L">	�տ������ƣ�</td><td  class="text_details_R">
			                   		${sap.cdtrNm}
			                   </td>
			               </tr>
			               
			               <tr>
			               		<td  class="text_details_L">�տ����ʺţ�</td><td  class="text_details_R">
			               			  	${sap.cdtrAcct}
			               		</td>
			                   <td  class="text_details_L">	�տ��˿������кţ�</td><td  class="text_details_R">
			                   		${sap.cdtrIssuer}
			                   </td>
			               </tr>
			               
			               
			               <tr>
			               		<td  class="text_details_L">ҵ��������룺</td><td  class="text_details_R">
			               			  	${sap.pmtKd}
			               		</td>
			                   <td  class="text_details_L">	ԭCISί�����ڣ�</td><td  class="text_details_R">
			                   		${sap.ornglCisCnsgnDt}
			                   </td>
			               </tr>
			               
			                   <tr>
			               		<td  class="text_details_L">ԭcis������ţ�</td><td  class="text_details_R">
			               			  	${sap.ornglCisTxId}
			               		</td>
			                   <td  class="text_details_L">	ԭcisƱ�ݺ��룺</td><td  class="text_details_R">
			                   		${sap.ornglCisNotesNo}
			                   </td>
			               </tr>
			                 <tr>
			               		<td  class="text_details_L">��ִ״̬��</td><td  class="text_details_R">
			               			  	${sap.rcptSts}
			               		</td>
			                   <td  class="text_details_L">	ҵ��ܾ������룺</td><td  class="text_details_R">
			                   		${sap.txRjctCd}
			                   </td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">ҵ��ܾ���Ϣ��</td><td  class="text_details_R">
			               			  	${sap.txRjctInf}
			               		</td>
			                   <td  class="text_details_L">	npc����״̬��</td><td  class="text_details_R">
			                   		${sap.prcSts}
			                   </td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">npc�������ڣ�</td><td  class="text_details_R">
			               			  	${sap.netgDt}
			               		</td>
			                   <td  class="text_details_L">	npc����Σ�</td><td  class="text_details_R">
			                   		${sap.netgRnd}
			                   </td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">npc��������/��̬���ڣ�</td><td  class="text_details_R">
			               			  	${sap.sttlmDt}
			               		</td>
			                  
			               </tr>
			                <tr>
			               	  
			               	  		<td  class="text_details_L">	��ע��</td><td  class="text_details_R" colspan="3">${sap.ustrd}</td>
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
 