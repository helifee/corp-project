<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html"%>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic"%>
<%
	String path = request.getContextPath();
%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
		<title></title>
		<link href="<%=path%>/css/page_color.css" rel="stylesheet"
			type="text/css" />
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/transfer/transferOfCash.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/addRow.js"></script>
		<script type="text/javascript" src="<%=path%>/js/ybjs/helpUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/datePicker/WdatePicker.js"></script>

	</head>
	<body>
		<form method="post"
			action="<%=path%>/transferOfCashAction.do?method=sendMessage">
			<input id="signval" type="hidden" value="sign0">
			<input type="hidden" name="token" value="${token}" />
			<!-- ��ֹ�ظ��ύ -->
			<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				
				
				
				<tr valign="top">
					<%-- 
					<td background="<%=path%>/image/content_table_line_L.jpg"></td>
					--%>
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
										<table border="0" cellspacing="0" cellpadding="0">
											<th class="text_tablehead_b">
												<h4 align="center">
												�˻�
													
												</h4>
											</th>
											<tr>
												<td>
														<table border="1" bordercolor="#BDD#F0" cellspacing="0" cellpadding="0" bgcolor="#f4f8fd">
															<tr>
																<td class="text_tablehead_b" align="right" width="100">
																	С��֧�����
																</td>
																<td width="100">
																	<input type="text" name="" value=""/>
																</td>
																<td class="text_tablehead_b" align="right" width="100">
																	�������к�
																</td>
																<td width="100">
																	<input type="text" name="" value="${requestScope.entity.cdtrbrnchid}"/>
																</td>
															</tr>
															
															<tr>
																<td class="text_tablehead_b" align="right" width="100">
																	���
																</td>
																<td width="100">
																	<input type="text" name="" value="${requestScope.entity.amount}"/>
																</td>
																<td class="text_tablehead_b" align="right" width="100">
																	�������к�
																</td>
																<td width="100">
																	<input type="text" name="" value="${requestScope.entity.dbtrbrnchid}"/>
																</td>
															</tr>
															
															<tr>
																<td class="text_tablehead_b" align="right" width="100">
																	ԭί������
																</td>
																<td width="100">
																	<input type="text" name="" value="${requestScope.entity.workdt}"/>
																</td>
																<td class="text_tablehead_b" align="right" width="100">
																	ԭҵ�����ͺ�
																</td>
																<td width="100">
																	<input type="text" name="" value="${requestScope.entity.pmttp}"/>
																</td>
															</tr>
															
															<tr>
																<td class="text_tablehead_b" align="right" width="100">
																	ԭ֧���������
																</td>
																<td width="100">
																	<input type="text" name="" value="${requestScope.entity.txid}"/>
																</td>
																<td class="text_tablehead_b" align="right" width="100">
																	ԭ�������ʺ�
																</td>
																<td width="100">
																	<input type="text" name="" value="${requestScope.entity.dbtracct}"/>
																</td>
															</tr>
															
															<tr>
																<td class="text_tablehead_b" align="right" width="100">
																	ԭ����������
																</td>
																<td width="100">
																	<input type="text" name="" value="${requestScope.entity.dbtrnm}"/>
																</td>
																<td class="text_tablehead_b" align="right" width="100">
																	ԭ�տ����ʺ�
																</td>
																<td width="100">
																	<input type="text" name="" value="${requestScope.entity.cdtracct}"/>
																</td>
															</tr>
															
															<tr>
																<td class="text_tablehead_b" align="right" width="100">
																	ԭ�տ�������
																</td>
																<td width="100">
																	<input type="text" name="" value="${requestScope.entity.cdtrnm}"/>
																</td>
																<td class="text_tablehead_b" align="right" width="100">
																	��ȷ�տ�������
																</td>
																<td width="100">
																	<input type="text" name="" value=""/>
																</td>
															</tr>
															
															<tr>
																<td class="text_tablehead_b" align="right" width="100">
																	�˻�ԭ��
																</td>
																<td width="100">
																	<input type="text" name="" value=""/>
																</td>
																<td class="text_tablehead_b" align="right" width="100">
																	�˻㸽��
																</td>
																<td width="100">
																	<input type="text" name="" value=""/>
																</td>
															</tr>
														</table>
													
												</td>
											</tr>
										</table>


										<br />
										<span class="STYLE1">˵������ɫ*��ע��Ϊ������</span>
										<br />
										<br />
										<input name="addButton" type="button" style="cursor: pointer"
											class="button" value="��  ��" onclick="commitForm();" />
										&nbsp;
										<input name="backButton" style="cursor: pointer" type="button"
											class="button" value="��  ��" onclick="history.back();" />
										<br />
										<br />
									</div>
								</td>
							</tr>
						</table>
					</td>
					<td
						style="FILTER:progid:DXImageTransform.Microsoft.Gradient(gradientType = 0, startColorStr = #FFFFFF, endColorStr = #99bbe8);"></td>

					<%--
					<td background="<%=path%>/image/content_table_line_R.jpg"></td> --%>
				</tr>
			</table>

		</form>
	</body>
</html>
