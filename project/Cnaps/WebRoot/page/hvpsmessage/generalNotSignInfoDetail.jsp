<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%		
		response.setHeader("Pragma","No-cache");
		response.setHeader("Cache-Control","no-cache");
		response.setDateHeader("Expires", 0);	
		String path = request.getContextPath();
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<title>��ϸ��Ϣ</title>
		<link rel="stylesheet" type="text/css" href="<%=path%>/css/page_color1.css"  />
		<script language="javascript">
    </script>
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
																	   <td  class="text_details_L">��ţ�				 </td><td  class="text_details_R" >${po.id}</td>
																	   <td  class="text_details_L">֧��������ţ�</td><td  class="text_details_R">${po.pmtGrpId}</td>
																	</tr>
																	<tr>
																		<td  class="text_details_L">���ı�ʶ�ţ�</td><td  class="text_details_R">${po.msgid}</td>
																	  <td  class="text_details_L">���ķ���ʱ�䣺</td><td  class="text_details_R">	${po.credttm}</td>
																	</tr>
																	<tr>
																		<td  class="text_details_L">��ִ���ı�ʶ�ţ�</td><td  class="text_details_R">${po.resultmsgid}</td>
																	  <td  class="text_details_L">�ظ�����ʱ�䣺</td><td  class="text_details_R">	${po.resultdttm}</td>
																	</tr>
																	
																	<tr>
																		<td  class="text_details_L">�����������кţ�</td><td  class="text_details_R">${po.instgPty}</td>
																	  <td  class="text_details_L">���ղ�������кţ�</td><td  class="text_details_R">	${po.instdPty}</td>
																	</tr>
																	
																	<tr>
																		<td  class="text_details_L">����ֱ�Ӳ��������</td><td  class="text_details_R">${po.senddrctpty}</td>
																	  <td  class="text_details_L">����ֱ�Ӳ��������</td><td  class="text_details_R">	${po.recvdrctpty}</td>
																	</tr>
																	
																	<tr>
																		<td  class="text_details_L">ϵͳ��ţ�</td><td  class="text_details_R">${po.systemcode}</td>
																	  <td  class="text_details_L">��ע��</td><td  class="text_details_R">	${po.remarkinfo}</td>
																	</tr>
																	
																	<tr>
																		<td  class="text_details_L">ҵ�����ͱ��룺</td><td  class="text_details_R">${po.txtpcd}</td>
																	  <td  class="text_details_L">������ʶ��</td><td  class="text_details_R">
																	  	<c:if test="${po.txtpcd eq 'O'}">����</c:if></td>
																	</tr>
																	
																	<tr>
																		<td  class="text_details_L">��Ϣ���⣺</td><td  class="text_details_R">${po.title}</td>
																	  <td  class="text_details_L">��Ϣ���ݣ�</td><td  class="text_details_R">	${po.content}</td>
																	</tr>
																	
																	<tr>
																		<td  class="text_details_L">�������ȣ�</td><td  class="text_details_R">${po.attachmentlength}</td>
																	  <td  class="text_details_L">�������ƣ�</td><td  class="text_details_R">	${po.attachmentname}</td>
																	</tr>
																	<tr>
																		<td  class="text_details_L">�������ݣ�</td><td  class="text_details_R">${po.attachmentcontent}</td>
																	  <td  class="text_details_L">ҵ��״̬��</td><td  class="text_details_R">	${po.pmtsts}</td>
																	</tr>
																	<tr>
																		<td  class="text_details_L">ҵ�����룺</td><td  class="text_details_R">${po.procode}</td>
																	  <td  class="text_details_L">ҵ��ܾ���Ϣ��</td><td  class="text_details_R">	${po.rjctdesc}</td>
																	</tr>
																	<tr>
																		<td  class="text_details_L">ҵ������������</td><td  class="text_details_R">${po.rjctedPtyId}</td>
																	  <td  class="text_details_L">�������ڣ�</td><td  class="text_details_R">	${po.workdate}</td>
																	</tr>
							

														</table>
													  
													 <br />
													</div>
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
