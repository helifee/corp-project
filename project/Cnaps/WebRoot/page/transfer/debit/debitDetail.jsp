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
		<title>���ڽ����ϸ</title>
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
								<td  class="text_details_L">֧��������ţ�</td><td  class="text_details_R" >${sap.pmtgrpid}</td>
			                   <td  class="text_details_L">ϵͳ�ţ�</td><td  class="text_details_R" >С��</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">ҵ�����ͱ��룺</td><td  class="text_details_R">
			               		  <c:if test="${sap.pmttp=='F100'}">��ͨ���ڽ��ҵ��</c:if>
								  <c:if test="${sap.pmttp=='E102'}">���ڴ���</c:if>
																
								
			               		</td>
			                   <td  class="text_details_L">ҵ��������룺</td><td  class="text_details_R">
			                                                    <c:if test="${sap.pmtkd=='00100'}">���</c:if>
																<c:if test="${sap.pmtkd=='00200'}">ˮů��</c:if>
																<c:if test="${sap.pmtkd=='00300'}">ú����</c:if>
																<c:if test="${sap.pmtkd=='00400'}">�绰��</c:if>	
															    <c:if test="${sap.pmtkd=='00500'}">ͨѶ��</c:if>		
															    <c:if test="${sap.pmtkd=='00600'}">���շ�</c:if>	
															    <c:if test="${sap.pmtkd=='00700'}">���ݹ����</c:if>
															    <c:if test="${sap.pmtkd=='00800'}">��������</c:if>
															    <c:if test="${sap.pmtkd=='00900'}">ѧ�̷�</c:if>	
															    <c:if test="${sap.pmtkd=='01000'}">���ߵ��ӷ�</c:if>	
															    <c:if test="${sap.pmtkd=='01100'}">��ҵ�������</c:if>	
															     <c:if test="${sap.pmtkd=='09001'}">����</c:if>	
																</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">�ͻ��ţ�</td>
			               		<td  class="text_details_R">
			               			  	 ${sap.proposercstmrid}
			               		</td>
			                   <td  class="text_details_L">��ϵ�绰��</td>
			                   <td  class="text_details_R">${sap.proposertel}</td>
			               </tr>
			               <tr>
			              		 <td  class="text_details_L">֤�����ͣ�</td>
			              		 <td  class="text_details_R">
			                   		<c:if test="${sap.proposercerttp=='01'}">���֤</c:if>
			                   		<c:if test="${sap.proposercerttp=='02'}">����֤</c:if>
			                   		<c:if test="${sap.proposercerttp=='03'}">ѧ��֤</c:if>
			                   </td>
			               	 	<td  class="text_details_L">֤���ţ�</td>
			               	 	<td  class="text_details_R">${sap.proposercertid}</td>
			               </tr>
			              
			               <tr>
			               		<td  class="text_details_L">�˺����ͣ�</td><td  class="text_details_R">
			               		
			               	<c:if test="${sap.proposeraccttp=='AT00'}">	�Թ��˻�</c:if>
							<c:if test="${sap.proposeraccttp=='AT01'}">	���˴��ǿ��˻�</c:if>
							<c:if test="${sap.proposeraccttp=='AT02'}">���˽�ǿ�</c:if>	
			               	<c:if test="${sap.proposeraccttp=='AT03'}">����</c:if>	
			               	<c:if test="${sap.proposeraccttp=='AT04'}">����</c:if>		
			               		</td>
			               		 <td  class="text_details_L">���ִ��룺</td>
			               		 <td  class="text_details_R">${sap.proposeracctccy}</td> 
			               </tr>
			                
			              <tr>
			               		<td  class="text_details_L">	�տ����˺ţ�</td><td  class="text_details_R">${sap.cdtracct}</td>
			               		<td  class="text_details_L">	�տ������� ��</td><td  class="text_details_R">${sap.cdtrnm}	</td>
			               </tr>
			              <tr>
			               		<td  class="text_details_L">		�տ��˵�ַ��</td><td  class="text_details_R">${sap.cdtraddr}</td>
			               		 
			               </tr>
			                <tr>
			               		<td  class="text_details_L">		�տ��˿������кţ�</td><td  class="text_details_R">${sap.cdtrissuer}</td>
			               		 <td  class="text_details_L">		�տ��˿�����������</td><td  class="text_details_R">${sap.cdtrissuernm}</td>
			               </tr>
				 <tr>
			               		<td  class="text_details_L">	�տ����к� ��</td><td  class="text_details_R">${sap.cdtrbrnchid}</td>
			               		<td  class="text_details_L">	�տ������� ��</td><td  class="text_details_R">${sap.cdtrbrnchnm}	</td>
			               </tr>
			               
			                <tr>
			               		<td  class="text_details_L">		�տ��������кţ�</td><td  class="text_details_R">${sap.cdtrmmbid}</td>
			               		 
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


 
 