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
			                   <td  class="text_details_L"> ҵ���������:</td>
			                   <td  class="text_details_R" >${sap.pmtKd}</td>
			                   <td  class="text_details_L">��ϸ��ʶ�ţ�</td>
			                   <td  class="text_details_R">${sap.txId}</td>
			               </tr>
			               <tr>
			                   <td  class="text_details_L">���������ƣ�</td>
			                   <td  class="text_details_R" >${sap.dbtrNm}</td>
			                   <td  class="text_details_L">�������˺ţ�</td>
			                   <td  class="text_details_R">${sap.dbtrAcct}</td>
			               </tr>
			               
			               <tr>
			                   <td  class="text_details_L">�������кţ�</td>
			                   <td  class="text_details_R" >${sap.dbtrBrnchId}</td>
			                   <td  class="text_details_L">���ҷ��ţ�</td>
			                   <td  class="text_details_R">${sap.currencyCd}</td>
			               </tr>
			             <tr>
			                   <td  class="text_details_L">��</td>
			                   <td  class="text_details_R" >${sap.amount}</td>
			                   <td  class="text_details_L">��ͬ��Э�飩�ţ�</td>
			                   <td  class="text_details_R">${sap.agrmtNb}</td>
			               </tr>
			                <tr>
			                   <td  class="text_details_L">�����ʶ��</td>
			                   <td  class="text_details_R" >${sap.chckFlg}</td>
			                   <td  class="text_details_L">ҵ��״̬��</td>
			                   <td  class="text_details_R">${sap.status}</td>
			               </tr>
			                  <tr>
			                   <td  class="text_details_L">ҵ��ܾ������룺</td>
			                   <td  class="text_details_R" >${sap.txRjctCd}</td>
			                   <td  class="text_details_L">ҵ��ܾ���Ϣ��</td>
			                   <td  class="text_details_R">${sap.txRjctInf}</td>
			               </tr>
			                <tr>
			                   <td  class="text_details_L">ҵ������������</td>
			                   <td  class="text_details_R" >${sap.rjctedPtyId}</td>
			                   <td  class="text_details_L">�������ڣ�</td>
			                   <td  class="text_details_R">${sap.netgDt}</td>
			               </tr>
			               <tr>
			                   <td  class="text_details_L">����Σ�</td>
			                   <td  class="text_details_R" >${sap.netgRnd}</td>
			                   <td  class="text_details_L">�������ڣ�</td>
			                   <td  class="text_details_R">${sap.sttlmDt}</td>
			               </tr>
			               <tr>
			                   <td  class="text_details_L"> ��ִ״̬��</td>
			                   <td  class="text_details_R" >${sap.rcptSts}</td>
			                   
			               </tr>
			               
			             
			              			               
			              <tr>
			               		<td  class="text_details_L">		���ԣ�</td><td  class="text_details_R">${sap.addtlInf}</td>
			               		 
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


 
 