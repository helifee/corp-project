<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
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
		<title>大额报文登记查询</title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet"
			type="text/css" />


		<link rel="stylesheet" type="text/css"
			href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
		<link rel="stylesheet"
			href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css"
			type="text/css" media="screen,projection" />
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js"></script>
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/datePicker/WdatePicker.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/systemManager/showeditpanel.js"></script>
	</head>
	<body>
		<html:form method="post"
			action="/hvpsMSGRGSTRAction.do?method=querySendMsg">
			<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				<tr valign="top">
					<td>
					<td>
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td colspan="6">
									&nbsp;
								</td>
							</tr>
							<tr>
								<td>
									&nbsp;
								</td>
								<td>
									<table width="95%" border="0" align="center" cellpadding="0"
										cellspacing="0">
										<tr>
											<td colspan="6">
												<div class="text_title">
													<span class="text_blue2">大额报文登记查询</span>
												</div>
											</td>
										</tr>
									</table>
									<table width="95%" border="0" align="center" cellpadding="0"
										class="table_head">
										<tr>
											<td colspan="4">
												&nbsp;
											</td>
										</tr>
										<tr>
											<td class="text_tablehead_b">
												报文标识号
											</td>
											<td>
												<html:text property="po.msgid" maxlength="35" />
											</td>
											<td class="text_tablehead_b">
												工作日期
											</td>
											<td>
												<html:text property="po.workdt" styleClass="Wdate"
													onclick="WdatePicker()" />
											</td>
										</tr>
										<tr>
											<td class="text_tablehead_b">
												来往标识
											</td>
											<td>
											<html:select property="po.direction" >
				                   			<html:option value="">请选择</html:option>
				                   			<html:option value="I">来账</html:option>
				                   			<html:option value="O">往账</html:option>
				                   		</html:select>
											</td>
											<td class="text_tablehead_b">
												&nbsp;
											</td>
											<td>
												<input name="query" type="button" class="button" value="查 询"
													onclick="submit()" />
											</td>
										</tr>
										<tr>
											<td colspan="4">
												&nbsp;
											</td>
										</tr>
									</table>
									<br>
									<div align="center">
										<table width="95%" class="tbcolor">
											<tr class="text_listhead">
												<td>
													报文标识号
												</td>
												<td>
													发起参与机构
												</td>
												<td>
													支付交易组号
												</td>
												<td>
													清算日期
												</td>
												<td>
													业务状态
												</td>
												<td>
													来往标识
												</td>
											</tr>
											<logic:present name="hvpsMsgList">
												<logic:iterate id="hvpsMsg" name="hvpsMsgList">
													<tr class="text_list" onmouseover="this.bgColor='#CE4C56'"
														onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;"
														bgcolor="E6E6E6">
														<td class="text_list">
															${hvpsMsg.msgId }
														</td>
														<td class="text_list">
															${hvpsMsg.instgPty }
														</td>
														<td class="text_list">
															${hvpsMsg.pmtGrpId }
														</td>
														<td class="text_list">
															${hvpsMsg.sttlmDt }
														</td>
														<td class="text_list">
															${hvpsMsg.prcSts }
														</td>
														<td class="text_list">
															${hvpsMsg.direction }
														</td>
												</logic:iterate>
											</logic:present>
										</table>
									</div>
								</td>
							</tr>
							<tr>
								<td></td>
								<td>
									<table width="100%" border="0" cellpadding="0" cellspacing="0">
										<tr>
											<td><jsp:include page="/page/common/Page.jsp" /></td>
										</tr>
									</table>
								</td>
								<td></td>
							</tr>
						</table>
					</td>
					<td>
				</tr>
			</table>
		</html:form>
	</body>
</html>
