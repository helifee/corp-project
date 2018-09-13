<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html"%>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic"%>
<%
	String path = request.getContextPath();
%>
<%
		response.setHeader("Pragma","No-cache");
		response.setHeader("Cache-Control","no-cache");
		response.setDateHeader("Expires", 0);	
		
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
		<title></title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet"
			type="text/css" />
		<script type="text/javascript" src="<%=path%>/js/ybjs/helpUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/datePicker/WdatePicker.js"></script>

		<script type="text/javascript">
			
			function commitForm(){
			
			  
			  document.forms[0].submit();
				
			}
			
			
			
		</script>
	</head>
	<body>
		<form method="post"
			action="<%=path%>/netDebitLimitWarningSetAction.do?method=sendMessage">
			<input id="signval" type="hidden" value="sign0">
			<input type="hidden" name="token" value="${token}" />
			<!-- 防止重复提交 -->
			<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				<tr>
					<td></td>
					<td><br/><br/>
						<table width="100%"  border="0" cellpadding="0"
							cellspacing="0">
							<tr>
								<td  class="text_tablehead_b">
									<%-- 
								<td width="360" background="<%=path%>/image/content_table_bar_L.jpg">
								--%>
								</td>
								<td width="194"></td>
								<td width="270"></td>
								<%--
								<td width="194" background="<%=path%>/image/content_table_bar_L.jpg"></td>
								<td width="270" background="<%=path%>/image/content_table_bar_R.jpg"></td>
								 --%>
							</tr>
						</table>
					</td>
					<td width="8"></td>
				</tr>
				<tr valign="top">
					<td></td>
					<td>

						<table width="75%" border="0" cellspacing="0" cellpadding="0"
							align="center">
							<tr>
								<td >
									&nbsp;
								</td>
								<td>
									<div align="center">
										<table border="0" cellspacing="0" cellpadding="0">

											<tr>
												<td>
													<div class="text_title">
														<span class="text_blue2">净借记限额可用额度预警值录入</span>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													<div class="table_body">

														<table class="table_content">
															<tr>
																<td colspan="4">
																	&nbsp;
																</td>
															</tr>
															<tr>
																<td colspan="4">
																	<span class="text_tablehead">报文信息</span>
																</td>
															</tr>
															<tr>

																<td class="text_tablehead_b" align="right" >
																	被设置清算行行号：
																</td>
																<td>
																	<input name="memberid" id="bszqshhh" type="text"
																		 maxlength="14" title="被设置清算行行号" />
																</td>
																<td class="text_tablehead_b" align="right" >
																	预警开启关闭类型：
																</td>
																<td>
																	
																	<select name="switchtype" id="yjkqgblx">
																		<option value="ST00">开启</option>
																		<option value="ST01">关闭</option>
																	</select>
																</td>

															</tr>
															<tr>

																<td class="text_tablehead_b" align="right" >
																	可用额度预警值：
																</td>
																<td>
																	<input name="warningvalue" id="kyedyjz" type="text"
																		 maxlength="15" title="可用额度预警值" />
																</td>

															</tr>
															<tr>

																<td class="text_tablehead_b" align="right" >
																	备注：
																</td>
																<td colspan="3">
																<textarea name="rmk" id="bz" class="textarea_msg" cols="69" rows="5"  onKeyPress="charPress()"></textarea>
																</td>

															</tr>

														</table>
											<table>
												<tr>
													<td colspan="4">
														&nbsp;
													</td>
												</tr>
												<tr>

													<td class="text_tablehead_b">
														&nbsp;
													</td>
													<td class="text_tablehead_b">
														&nbsp;
													</td>
													<td>
														<div class="table_content" align="center">
															<input name="addButton" type="button"
																style="cursor: pointer" class="button" value="保  存"
																onclick="commitForm();" />
															
														</div>
														</td>
													<td>
														&nbsp;
													</td>
												</tr>
												<tr>
													<td colspan="4">
														&nbsp;
													</td>
												</tr>
												<tr>
													<td class="text_tablehead_b">
														&nbsp;
													</td>
													<td class="text_tablehead_b">
														&nbsp;
													</td>
													<td>
														<div class="table_content" align="center">
															<span class="STYLE1">说明：红色*标注项为必填项</span>
														</div>
													</td>
													<td>
														&nbsp;
													</td>
												</tr>
												<tr>
													<td colspan="4">
														&nbsp;
													</td>
												</tr>
											</table>

											</div>
											<div class="table_content">

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
		</form>
	</body>
</html>