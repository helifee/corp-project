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
		<title>查复书录入</title>
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
														<span class="text_blue2">查复书录入</span>
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
																		<span class="text_tablehead">基本信息</span>
																	</td>
																</tr>

																<tr>
																	<td class="text_tablehead_b">
																		接收参与机构：
																	</td>
																	<td>
																		<input type="text" name="po.instdpty" id="instdpty"
																			maxlength="14" onkeyup="fun_number(this)" />
																		<span class="STYLE1"> *</span>

																	</td>
																	<td class="text_tablehead_b">
																		系统编号：
																	</td>
																	<td>
																		<select name="po.systemCd" id="systemCd"
																			style="width: 180px;">
																			<option value="HVPS">
																				大额
																			</option>
																			<option value="BEPS">
																				小额
																			</option>
																		</select>
																		<span class="STYLE1">*</span>
																	</td>

																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		查询类型：
																	</td>
																	<td>
																		<select name="po.querytype" id="querytype"
																			style="width: 180px;">
																			<option value="QT00">
																				整包查询
																			</option>
																			<option value="QT01">
																				单笔查询
																			</option>
																		</select>
																		<span class="STYLE1">*</span>
																	</td>

																	<td class="text_tablehead_b">
																		支付交易组号：
																	</td>
																	<td>
																		<input type="text" name="po.pmtgrpId" id="pmtgrpId" />
																		<span class="STYLE1"> *</span>

																	</td>

																</tr>
																<tr>
																<td class="text_tablehead_b">
																	原报文标识号：
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
																		信息内容：
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
																style="cursor: pointer" class="button" value="保  存"
																onclick="ckeckwethornull();" />
															<br />
															<br />
															<span class="STYLE1">说明：红色*标注项为必填项</span>
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
