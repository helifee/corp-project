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
																<td  class="text_details_L" align="right" class="text_details_R" width="190">�������ڣ�</td>
																<td  class="text_details_R" width="150">${entity.workdate}</td>
																<td    class="text_details_L" align="right" class="text_details_R" width="190">�������ı�ʶ�ţ�</td>
																<td  class="text_details_R" width="150">${entity.chnmsgid}</td>
															</tr>
															
															<tr>
																<td   class="text_details_L" align="right" class="text_details_R" width="190">�������Ľ���ʱ�䣺</td>
																<td class="text_details_R">${entity.chndttm}</td>
																<td   class="text_details_L" align="right" class="text_details_R" width="190">���ı�ʶ�ţ�</td>
																<td class="text_details_R">${entity.msgid}</td>
															</tr>
															<tr>
																<td   class="text_details_L"  align="right" class="text_details_R" width="190">���ķ���ʱ�䣺</td>
																<td  class="text_details_R">${entity.credttm}</td>
																<td   class="text_details_L"  align="right" class="text_details_R" width="190">������ı�ʶ�ţ�</td>
																<td class="text_details_R">${entity.resultmsgid}</td>
															</tr>
															
															<tr>
																<td   class="text_details_L"  align="right" class="text_details_R" width="190">������ķ���ʱ�䣺</td>
																<td  class="text_details_R">${entity.resultdttm}</td>
																<td   class="text_details_L"  align="right" class="text_details_R" width="190">����ֱ�Ӳ��������</td>
																<td class="text_details_R">${entity.senddrctpty}</td>
															</tr>
															
															<tr>
																<td   class="text_details_L"  align="right" class="text_details_R" width="190">�����Ӳ��������</td>
																<td  class="text_details_R">${entity.sendindrctpty}</td>
																<td   class="text_details_L"  align="right" class="text_details_R" width="190">����ֱ�Ӳ��������</td>
																<td class="text_details_R">${entity.recvdrctpty}</td>
															</tr>
															
															
															<tr>
																<td   class="text_details_L"  align="right" class="text_details_R" width="190">���ռ�Ӳ��������</td>
																<td  class="text_details_R">${entity.recvindrctpty}</td>
																<td   class="text_details_L"  align="right" class="text_details_R" width="190">ϵͳ��ţ�</td>
																<td class="text_details_R">${entity.systemcode}</td>
															</tr>
															<tr>
																<td   class="text_details_L"  align="right" class="text_details_R" width="190">��ע��</td>
																<td  class="text_details_R">${entity.remarkinfo}</td>
																<td   class="text_details_L"  align="right" class="text_details_R" width="190">ҵ��״̬��</td>
																<td class="text_details_R">${entity.pmtsts}</td>
															</tr>
															<tr>
																<td   class="text_details_L"  align="right" class="text_details_R" width="190">ҵ�����룺</td>
																<td  class="text_details_R">${entity.procode}</td>
																<td   class="text_details_L"  align="right" class="text_details_R" width="190">ҵ��ܾ���Ϣ��</td>
																<td class="text_details_R">${entity.rjctdesc}</td>
															</tr>
															<tr>
																<td   class="text_details_L"  align="right" class="text_details_R" width="190">��̬���ڣ�</td>
																<td  class="text_details_R">${entity.prodate}</td>
																<td   class="text_details_L"  align="right" class="text_details_R" width="190">�������������кţ�</td>
																<td class="text_details_R">${entity.memberid}</td>
															</tr>
															<tr>
																<td   class="text_details_L"  align="right" class="text_details_R" width="190">Ԥ�������ر����ͣ�</td>
																<td  class="text_details_R">${entity.switchtype}</td>
																<td   class="text_details_L"  align="right" class="text_details_R" width="190">���ö��Ԥ��ֵ��</td>
																<td class="text_details_R">${entity.warningvalue}</td>
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
