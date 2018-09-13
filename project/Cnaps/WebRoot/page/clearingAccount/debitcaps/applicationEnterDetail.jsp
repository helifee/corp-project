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
		<title>明细信息</title>
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
									<table  width="95%" border="0" align="center" cellpadding="0" cellspacing="0"  >
                				<tr>
                					<td colspan="6">
                						<div  class="text_title"><span class="text_blue2">明细信息</span></div>
                					</td>
                				</tr>
                			</table>
										<table width="95%" height="30" border="0" cellpadding="0"
											cellspacing="0" class="table_head" >
											
											<tr>
												<td height="30">
													<div align="center">
													<br/><br/><br/>
														
													<fieldset
														
														>
														
														<table class="tbcolor">
														
															<tr>
																<td class="text_details_L"
																	width="190">
																	工作日期：
																</td>
																<td class="text1" width="150">
																	${entity.workdate}
																</td>
																<td class="text_details_L"
																	width="190">
																	渠道报文标识号：
																</td>
																<td class="text1" width="150">
																	${entity.chnmsgid}
																</td>
															</tr>

															<tr>
																<td class="text_details_L"
																	width="190">
																	渠道报文接收时间：
																</td>
																<td class="text1">
																	${entity.chndttm}
																</td>
																<td class="text_details_L"
																	width="190">
																	报文标识号：
																</td>
																<td class="text1">
																	${entity.msgid}
																</td>
															</tr>

															<tr>
																<td class="text_details_L"
																	width="190">
																	报文发送时间：
																</td>
																<td class="text1">
																	${entity.credttm}
																</td>
																<td class="text_details_L"
																	width="190">
																	回复报文标识号：
																</td>
																<td class="text1">
																	${entity.resultmsgid}
																</td>
															</tr>

															<tr>
																<td class="text_details_L"
																	width="190">
																	发起直接参与机构：
																</td>
																<td class="text1">
																	${entity.senddrctpty}
																</td>
																<td class="text_details_L"
																	width="190">
																	发起间接参与机构：
																</td>
																<td class="text1">
																	${entity.sendindrctpty}
																</td>
															</tr>
															<tr>
																<td class="text_details_L"
																	width="190">
																	接收直接参与机构：
																</td>
																<td class="text1">
																	${entity.recvdrctpty}
																</td>
																<td class="text_details_L"
																	width="190">
																	接收间接参与机构：
																</td>
																<td class="text1">
																	${entity.recvindrctpty}
																</td>
															</tr>
															<tr>
																<td class="text_details_L"
																	width="190">
																	系统编号：
																</td>
																<td class="text1">
																	${entity.systemcode}
																</td>
																<td class="text_details_L"
																	width="190">
																	备注：
																</td>
																<td class="text1">
																	${entity.remarkinfo}
																</td>
															</tr>
															<tr>
																<td class="text_details_L"
																	width="190">
																	业务状态：
																</td>
																<td class="text1">
																	${entity.pmtsts}
																</td>
																<td class="text_details_L"
																	width="190">
																	业务处理码：
																</td>
																<td class="text1">
																	${entity.procode}
																</td>
															</tr>
															<tr>
																<td class="text_details_L"
																	width="190">
																	业务拒绝信息：
																</td>
																<td class="text1">
																	${entity.rjctdesc}
																</td>
																<td class="text_details_L"
																	width="190">
																	终态日期：
																</td>
																<td class="text1">
																	${entity.workdate}
																</td>
															</tr>
															<tr>
																<td class="text_details_L"
																	width="190">
																	圈存资金：
																</td>
																<td class="text1">
																	${entity.creditload}
																</td>
																<td class="text_details_L"
																	width="190">
																	质押额度：
																</td>
																<td class="text1">
																	${entity.totalpledgevalue}
																</td>
															</tr>
															<tr>
																<td class="text_details_L"
																	width="190">
																	授信额度：
																</td>
																<td class="text1">
																	${entity.creditextensionlimit}
																</td>
																<td class="text_details_L"
																	width="190">
																	净借记限额：
																</td>
																<td class="text1">
																	${entity.netdebitlimit}
																</td>
															</tr>
															<tr>
																<td class="text_details_L"
																	width="190">
																	当前可用净借记限额：
																</td>
																<td class="text1">
																	${entity.availablenetdebit}
																</td>
															</tr>
															
														</table>
														
													</fieldset>


												
													  
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
					<td><br></td>
	
				</tr>
			</table>
		</form>		
	</body>
</html>
