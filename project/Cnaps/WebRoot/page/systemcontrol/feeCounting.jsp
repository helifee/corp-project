<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean"
	prefix="bean"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html"
	prefix="html"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-logic"
	prefix="logic"%>
<%
	String path = request.getContextPath();
%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
		<title>手续费统计</title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet"
			type="text/css" />
		<link rel="stylesheet" type="text/css"
			href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js"></script>
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/datePicker/WdatePicker.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/systemManager/showeditpanel.js"></script>
		<script language="javascript">
	function viewbykeyXq(indentifier,business){
		var newurl = "<%=path%>/returnquestAction.do?method=querysendMsgXq&business="+business+"&msgid=" 
			+ indentifier;
		viewDetails(newurl);
	}
	function viewbykeyMx(indentifier,business){
		var newurl = "<%=path%>/returnquestAction.do?method=querysendMsgMx&business="+business+"&detailid=" 
			+ indentifier;
		viewDetails(newurl);
	}
</script>
	</head>
	<body>
		<form>
			<input id="repeatmark" type="hidden" value="0" />
			<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				<tr>
					<td width="8" height="48"></td>
					<td>
						<table width="100%" height="48" border="0" cellpadding="0"
							cellspacing="0">
							<tr>
								<td width="360" class="text_tablehead_b">
									<h5 align="left">
										&nbsp;
									</h5>
								</td>
								<td width="194"></td>
								<td width="270"></td>
							</tr>
						</table>
					</td>
					<td width="8"></td>
				</tr>
				<tr valign="top">
					<td
						style="FILTER: progid : DXImageTransform . Microsoft . Gradient(gradientType = 0, startColorStr = #FFFFFF, endColorStr = #FFFFFF);"></td>
					<td
						style="FILTER: progid : DXImageTransform . Microsoft . Gradient(gradientType = 0, startColorStr = #FFFFFF, endColorStr = #FFFFFF);">
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td width="10">
									&nbsp;
								</td>
								<td>
									<div align="center">
										<table width="95%" height="22" border="0" cellpadding="0"
											cellspacing="0">
											<tr>
												<td width="134"
													style="background-image: url('<%=path%>/image/psimage.jpg');">
													<div align="left">
														<span class="text_blue2">手续费统计</span>
													</div>
												</td>
												<td width="781"></td>
											</tr>
										</table>
										<table width="95%" border="0" cellpadding="0" cellspacing="0"
											style="border: 1px #B3B3B3 solid; padding: 3px; background: #F2F2F2;">
											<tr>

												<td width="120" height="40" class="text_tablehead_b">
													系统编号：
												</td>
												<td width="120">
													<div align="left">
														<select name="po.rtrnTp" id="rtrnTp"
															onchange="changethlx()">
															<option value="">
																请选择
															</option>
															<option value="RP00">
																大额
															</option>
															<option value="RP01">
																小额
															</option>
														</select>
												</td>

												<td width="120" height="40" class="text_tablehead_b">
													发起参与机构：
												</td>
												
												<td width="120">
													<div align="left">
															<input type="text" name="pommm" 
															 />
												</td>
												</tr><tr>
												<td width="120" height="40" class="text_tablehead_b">
													工作日期：
												</td>
												<td width="120">
													<div align="left">
														<input type="text" name="po.enddate" class="Wdate"
															onclick="WdatePicker()"  />
												</td>
												<td width="120" height="40" class="text_tablehead_b">
													业务类型：
												</td>
												<td width="120">
													<div align="left">
														<select name="po.rtrnTp" id="rtrnTp"
															onchange="changethlx()">
															<option value="">
																请选择
															</option>
															<option value="RP00">
																普通汇兑
															</option>
															<option value="RP01">
																现金汇款
															</option>
															<option value="RP01">
																委托收款(划回)
															</option>
															<option value="RP01">
																支票
															</option>
															<option value="RP01">
																跨境支付
															</option>
															<option value="RP01">
																商业汇票
															</option>
															<option value="RP01">
																国库汇款
															</option>
														</select>
												</td>
												</tr><tr>
												<td></td><td></td><td></td>
												<td colspan="1" align="center">
													<input name="query" type="button" class="button"
														value="查 询" onclick="" />
												</td>
											</tr>
										</table>
										<table width="761" height="23" border="0" cellpadding="0"
											cellspacing="0">
											<tr>
												<td width="41"></td>
												<td width="41" align="center"></td>
												<td width="414">
													<div align="right">
													</div>
												</td>
											</tr>
										</table>

										<table width="95%" border="0" cellpadding="0" cellspacing="0"
											class="tbcolor">
											<tr>
												

												<td align="center" class="text_listhead">
													发起参与机构
												</td>
												<td align="center" class="text_listhead">
													业务类型
													<br>
												</td>
												<td align="center" class="text_listhead">
													手续费
													<br>
												</td>
												<td align="center" class="text_listhead">
													工作日期
													<br>
												</td>

											</tr>

											<tr class="text_list" onmouseover="this.bgColor='#CE4C56'"
												onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;"
												bgcolor="E6E6E6">
												
												<td class="text_list">
													<div class="gridCell_standard">
														32132132131
												</td>
												<td class="text_list">
													<div class="gridCell_standard">
														普通汇兑
												</td>
												<td class="text_list">
													<div class="gridCell_standard">
														20.00
												</td>
												<td class="text_list">
													<div class="gridCell_standard">
														2011-05-01
												</td>
											</tr>
											<tr class="text_list" onmouseover="this.bgColor='#CE4C56'"
												onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;"
												bgcolor="E6E6E6">
												
												<td class="text_list">
													<div class="gridCell_standard">
														32132132121
												</td>
												<td class="text_list">
													<div class="gridCell_standard">
														现金汇款
												</td>
												<td class="text_list">
													<div class="gridCell_standard">
														17.89
												</td>
												<td class="text_list">
													<div class="gridCell_standard">
														2011-06-01
												</td>
											</tr>
											<tr class="text_list" onmouseover="this.bgColor='#CE4C56'"
												onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;"
												bgcolor="E6E6E6">
											
												<td class="text_list">
													<div class="gridCell_standard">
														12121233221
												</td>
												<td class="text_list">
													<div class="gridCell_standard">
														委托收款(划回)
												</td>
												<td class="text_list">
													<div class="gridCell_standard">
														10.00
												</td>
												<td class="text_list">
													<div class="gridCell_standard">
														2011-06-13
												</td>
											</tr>
											<tr class="text_list" onmouseover="this.bgColor='#CE4C56'"
												onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;"
												bgcolor="E6E6E6">
											
												<td class="text_list">
													<div class="gridCell_standard">
														4003212333
												</td>
												<td class="text_list">
													<div class="gridCell_standard">
														支票
												</td>
												<td class="text_list">
													<div class="gridCell_standard">
														89.00
												</td>
												<td class="text_list">
													<div class="gridCell_standard">
														2011-06-14
												</td>
											</tr>
											<tr class="text_list" onmouseover="this.bgColor='#CE4C56'"
												onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;"
												bgcolor="E6E6E6">
											
												<td class="text_list">
													<div class="gridCell_standard">
														5543230021
												</td>
												<td class="text_list">
													<div class="gridCell_standard">
														普通汇兑
												</td>
												<td class="text_list">
													<div class="gridCell_standard">
														10.00
												</td>
												<td class="text_list">
													<div class="gridCell_standard">
														2011-06-23
												</td>
											</tr>
											<tr class="text_list" onmouseover="this.bgColor='#CE4C56'"
												onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;"
												bgcolor="E6E6E6">
											
												<td class="text_list">
													<div class="gridCell_standard">
														32135555131
												</td>
												<td class="text_list">
													<div class="gridCell_standard">
														跨境支付
												</td>
												<td class="text_list">
													<div class="gridCell_standard">
														19.00
												</td>
												<td class="text_list">
													<div class="gridCell_standard">
														2011-07-28
												</td>
											</tr>
											<tr class="text_list" onmouseover="this.bgColor='#CE4C56'"
												onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;"
												bgcolor="E6E6E6">
										
												<td class="text_list">
													<div class="gridCell_standard">
														32132136789
												</td>
												<td class="text_list">
													<div class="gridCell_standard">
														商业汇票
												</td>
												<td class="text_list">
													<div class="gridCell_standard">
														100.00
												</td>
												<td class="text_list">
													<div class="gridCell_standard">
														2011-08-01
												</td>
											</tr>
											<tr class="text_list" onmouseover="this.bgColor='#CE4C56'"
												onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;"
												bgcolor="E6E6E6">
										
												<td class="text_list">
													<div class="gridCell_standard">
														1287439876
												</td>
												<td class="text_list">
													<div class="gridCell_standard">
														国库汇款
												</td>
												<td class="text_list">
													<div class="gridCell_standard">
														34.00
												</td>
												<td class="text_list">
													<div class="gridCell_standard">
														2011-07-02
												</td>
											</tr>

										</table>
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
					<td
						style="FILTER: progid : DXImageTransform . Microsoft . Gradient(gradientType = 0, startColorStr = #FFFFFF, endColorStr = #FFFFFF);"></td>

				</tr>
			</table>































		</form>
	</body>
</html>
