<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@page import="com.cnaps.hvps.persistence.info.Queryreplybook"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean"
	prefix="bean"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html"
	prefix="html"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-logic"
	prefix="logic"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%
	String path = request.getContextPath();
%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
		<title>�鸴��¼��</title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet"
			type="text/css" />
		<link rel="stylesheet" type="text/css"
			href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js"></script>
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript">

</script>
	</head>
	<body>

		<html:form method="post"
			action="/queryreplybookAction.do?method=sendMsg&business=${business}">
			<input id="business_name" type="hidden" value="queryreplybook">
			<input id="repeatmark" type="hidden" value="0" />




			<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">



				<tr valign="top">

					<td></td>
					<td>
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td width="10">
									&nbsp;
								</td>
								<td>
									<div align="center">
										<br />
										<table width="689" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td>
													<div class="text_title">
														<span class="text_blue2">�鸴��¼��</span>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													<div class="table_body">
														<div class="table_content">
															<table>
																<tr>


																	<td colspan="4">
																		<span class="text_tablehead">������Ϣ</span>
																	</td>
																</tr>

																<tr>
																	<td class="text_tablehead_b">
																		���ղ��������
																	</td>
																	<td>
																		<input type="text" name="po.instdpty" id="instdpty"
																			maxlength="14" onkeyup="fun_number(this)" />
																		<span class="STYLE1"> *</span>

																	</td>
																	<td class="text_tablehead_b">
																		ϵͳ��ţ�
																	</td>
																	<td>
																		<select name="po.systemCd" id="systemCd"
																			style="width: 180px;">
																			<option value="HVPS">
																				���
																			</option>
																			<option value="BEPS">
																				С��
																			</option>
																		</select>
																		<span class="STYLE1">*</span>
																	</td>

																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		��ѯ���ͣ�
																	</td>
																	<td>
																		<select name="po.querytype" id="querytype"
																			style="width: 180px;">
																			<option value="QT00">
																				������ѯ
																			</option>
																			<option value="QT01">
																				���ʲ�ѯ
																			</option>
																		</select>
																		<span class="STYLE1">*</span>
																	</td>

																	<td class="text_tablehead_b">
																		֧��������ţ�
																	</td>
																	<td>
																		<input type="text" name="po.pmtgrpId" id="pmtgrpId" />
																		<span class="STYLE1"> *</span>

																	</td>

																</tr>
																<tr>
																<td class="text_tablehead_b">
																	ԭ���ı�ʶ�ţ�
																</td>
																
																<td>
																	<input type="text" name="po.ornglmsgId" id="ornglmsgId" />
																	<span class="STYLE1"> *</span>

																</td>
																<td class="text_tablehead_b">
																	&nbsp;&nbsp;
																</td>
																<td>
																	&nbsp;&nbsp;
																</td>

																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		��Ϣ���ݣ�
																	</td>
																	<td colspan="3">
																		<textarea name="po.replycontent" class="textarea_msg"
																			cols="69" rows="5" id="replycontent"
																			onKeyPress="charPress()"></textarea>
																		<span class="STYLE1">*</span>
																	</td>
																</tr>
															
															</table>
														</div>
														<div class="table_content" align="center">
															<br />
															<input name="addButton" type="button"
																style="cursor: pointer" class="button" value="��  ��"
																onclick="ckeckwethornull();" />
															<br />
															<br />
															<span class="STYLE1">˵������ɫ*��ע��Ϊ������</span>
															<br />
															<br />
														</div>
													</div>
												</td>
											</tr>
										</table>
									</div>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</html:form>
	</body>
</html>
