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
		<title>�ռ�͸֧��Ϣ�ۿ�֪ͨ��ѯ</title>
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
                						<div  class="text_title"><span class="text_blue2">	ҵ����Ϣ</span></div>
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
			                   <td  class="text_details_L">���ı�ʶ�ţ�</td><td  class="text_details_R" >${entity.msgId}</td>
			                   <td  class="text_details_L">���ķ���ʱ�䣺</td><td  class="text_details_R">${entity.creDtTm}</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">����ֱ�Ӳ��������</td><td  class="text_details_R">${entity.recvDrctPty}</td>
			                   <td  class="text_details_L">���ռ�Ӳ��������</td><td  class="text_details_R">	${entity.recvIndrctPty}</td>
			               </tr>
			                 <tr>
			               		<td  class="text_details_L">�������ڣ�</td><td  class="text_details_R">
			               				${entity.workDate} 
			               		</td>
			                   <td  class="text_details_L">��Ϣʱ�������</td><td  class="text_details_R">
			                  ${entity.numberOfEntries}
			                   </td>
			               </tr>
			               
			               <tr>
			               		<td  class="text_details_L">	͸֧��Ϣ�ϼƣ�</td><td  class="text_details_R">
			               			 ${entity.totalNetEntryAmount}
			               		</td>
			                   <td  class="text_details_L">	��ע��</td><td  class="text_details_R">
			                  	${entity.detailNetEntryAmount}
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
			</form> 
	

 


 
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	 
	
	
	
	 
		 
	</body>
</html>
