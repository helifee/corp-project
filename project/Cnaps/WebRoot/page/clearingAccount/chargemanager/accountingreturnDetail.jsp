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
		<title>�Ʒ��뷵��֪ͨ��ѯ</title>
		<link href="<%=path%>/css/page_color.css" rel="stylesheet"
			type="text/css" />

	</head>
	<body>
		<form method="post" action="">
			<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				<tr>
					<td width="8" height="48"></td>
					<td>
						<table width="100%" height="48" border="0" cellpadding="0"
							cellspacing="0">
							<tr>
								<td width="194"></td>
								<td width="270"></td>
							</tr>
						</table>
					</td>
					<td width="8"></td>
				</tr>
				<tr valign="top">
					<td
						style="FILTER:progid:DXImageTransform.Microsoft.Gradient(gradientType = 0, startColorStr = #FFFFFF, endColorStr = #99bbe8);"></td>
					<td
						style="FILTER:progid:DXImageTransform.Microsoft.Gradient(gradientType = 0, startColorStr = #FFFFFF, endColorStr = #99bbe8);">
						<br />
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td width="10">
									&nbsp;
								</td>
								<td>
									<div align="center">
										<table width="800" height="30" border="0" cellpadding="0"
											cellspacing="0" bgcolor="#f4f8fd">
											<tr>
															<td >&nbsp;</td>
														</tr>
											<th class="text_tablehead_b">
												<h4 align="center">
													�Ʒ��뷵����ѯ��ϸ
												</h4>
											</th>


											<tr>
												<td>
													<fieldset
														style="width: 780px; border: 1px #CCCCCC solid; padding: 3px;"
														align=center>
														<legend>
															ҵ����Ϣ
														</legend>
														<table class="sample">
															<tr>
																
																<td class="text_tablehead_b" align="right" class="text1"
																	width="190">
																	���ı�ʶ�ţ�
																</td>
																<td class="text1">
																	${entity.msgId}
																</td>
																<td class="text_tablehead_b" align="right" class="text1"
																	width="190">
																	���ķ���ʱ�䣺
																</td>
																<td class="text1">
																	${entity.creDtTm}
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" align="right" class="text1"
																	width="190">
																	����ֱ�Ӳ��������
																</td>
																<td class="text1">
																	${entity.sendDrctPty}
																</td>
																<td class="text_tablehead_b" align="right" class="text1"
																	width="190">
																	���ͼ�Ӳ��������
																</td>
																<td class="text1">
																	${entity.sendIndrctPty}
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" align="right" class="text1"
																	width="190">
																	����ֱ�Ӳ��������
																</td>
																<td class="text1">
																	${entity.recvDrctPty}
																</td>
																<td class="text_tablehead_b" align="right" class="text1"
																	width="190">
																	���ռ�Ӳ��������
																</td>
																<td class="text1">
																	${entity.recvIndrctPty}
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" align="right" class="text1"
																	width="190">
																	ϵͳ��ţ�
																</td>
																<td class="text1" width="150">
																	${entity.systemCode}
																</td>
																<td class="text_tablehead_b" align="right" class="text1"
																	width="190">
																	�������ڣ�
																</td>
																<td class="text1" width="150">
																	${entity.workDate}
																</td>
																
															</tr>

															<tr>
																<td class="text_tablehead_b" align="right" class="text1"
																	width="190">
																	�Ʒ��뷵�����ͣ�
																</td>
																<td class="text1">
																	${entity.chargeType}
																</td>
																<td class="text_tablehead_b" align="right" class="text1"
																	width="190">
																	�Ʒ�ֱ�Ӳ����ߣ�
																</td>
																<td class="text1">
																	${entity.chargeParticipant}
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" align="right" class="text1"
																	width="190">
																	�Ʒѿ�ʼ���ڣ�
																</td>
																<td class="text1">
																	${entity.startDate}
																</td>
																<td class="text_tablehead_b" align="right" class="text1"
																	width="190">
																	�Ʒѽ������ڣ�
																</td>
																<td class="text1">
																	${entity.endDate}
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" align="right" class="text1"
																	width="190">
																	�Ʒ��·ݣ�
																</td>
																<td class="text1">
																	${entity.chargeMonth}
																</td>
																<td class="text_tablehead_b" align="right" class="text1"
																	width="190">
																	�Ʒ�/�����ܽ�
																</td>
																<td class="text1">
																	${entity.totalAmount}
																</td>
															</tr>
															
															<tr>
																<td class="text_tablehead_b" align="right" class="text1"
																	width="190">
																	�Ʒ��·ݣ�
																</td>
																<td class="text1">
																	${entity.chargeMonth}
																</td>
																<td class="text_tablehead_b" align="right" class="text1"
																	width="190">
																	�Ʒ�/�����ܽ�
																</td>
																<td class="text1">
																	${entity.totalAmount}
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" align="right" class="text1"
																	width="190">
																	�Ʒ�/�����ܽ��(���)��
																</td>
																<td class="text1">
																	${entity.hvpsTotalAmount}
																</td>
																<td class="text_tablehead_b" align="right" class="text1"
																	width="190">
																	�Ʒ�/�����ܽ��(С��)��
																</td>
																<td class="text1">
																	${entity.bepsTotalAmount}
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" align="right" class="text1"
																	width="190">
																	�Ʒ�/�����ܽ��(IBPS)��
																</td>
																<td class="text1">
																	${entity.ibpsTotalAmount}
																</td>
																
															</tr>
															
															<tr>
																
																<td class="text_tablehead_b" align="right" class="text1"
																	width="190">
																	��ע��
																</td>
																<td class="text1">
																	${entity.remarkInfo}
																</td>
															</tr>
															
															
														</table>
														
													</fieldset>


												</td>
												
											</tr>
											<tr>
												<td>&nbsp;</td>
											</tr>
										</table>
										

										
						</table>
						<br />
					</td>
					<td
						style="FILTER:progid:DXImageTransform.Microsoft.Gradient(gradientType = 0, startColorStr = #FFFFFF, endColorStr = #99bbe8);"></td>

				</tr>
			</table>
			
		</form>
	</body>
</html>
