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
		<script type="text/javascript"
			src="<%=path%>/js/datePicker/WdatePicker.js"></script>

		<script type="text/javascript">
			function selectLoad(){
				var temp = document.getElementById('ywlxbmval').value;
				transferOfClient(temp,'select_input');
				
			}
			function commitForm(){
			  
				
					document.forms[0].submit();
				
			}
			
			
		</script>
	</head>
	<body onload="selectLoad();">
		<form method="post"
			action="<%=path%>/transferOfCashAction.do?method=sendfuheMessage">
			<input id="signval" type="hidden" value="sign0">
			<input type="hidden" name="token" value="${token}" />
			<!-- 防止重复提交 -->
			<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				<tr>
					<td width="8" height="48"></td>
					<td>
						<table width="100%" height="48" border="0" cellpadding="0"
							cellspacing="0">
							<tr>
								<td width="360" class="text_tablehead_b">
									<%-- 
								<td width="360" background="<%=path%>/image/content_table_bar_L.jpg">
								--%>
									<h5 align="left">
									<!--  
										&nbsp;大额支付系统&nbsp;->&nbsp;汇兑业务&nbsp;->&nbsp;国内卡折汇款
										-->
									</h5>
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
													国内现金汇款 复核
													
												</h4>
											</th>
											<tr>
												<td>
												
												<fieldset
														style="width: 700px; border: 1px #CCCCCC solid; padding: 3px;"
														align=center>
														<legend>
															申请人信息
														</legend>
														<br>
														<table border="0" cellspacing="0" cellpadding="0">
															<tr>
																<td class="text_tablehead_b" align="right" width="140px">
																	申请人证件号：
																</td>
																<td>
																	<input name="appcertno" id="sgrzjh" type="text"
																		style="width: 180px;" maxlength="19" title="申请人证件号" value="87213511009" />
																</td>

																<td class="text_tablehead_b" align="right" width="140px">
																	证件发行国家：
																</td>
																<td>
																	<input name="certcountry" id="zjfxgj" type="text"
																		style="width: 180px;" title="证件发行国家" maxlength="3" value="101"/>
																</td>

															</tr>
															<tr>
																<td class="text_tablehead_b" align="right" width="140px">
																	证件类型：
																</td>
																<td>
																		
																		<select id="zjlx" style="width: 180px;" name="certtype" title="身份证">
																		<option selected="selected" value="BEPS">
																			身份证
																		</option>
																		
																	   </select>
																		
																		<span  class="STYLE1">*</span>
																		
																</td>

																<td class="text_tablehead_b" align="right" width="140px">
																	申请人名称：
																</td>
																<td>
																	<input name="appnm" id="sqrmc" type="text" value="郭业兵"
																		style="width: 180px;" title="申请人名称" maxlength="60" />
																</td>

															</tr>
															<tr>
																<td class="text_tablehead_b" align="right" width="140px">
																	申请人联系电话：
																</td>
																<td>
																	<input name="appphone" id="sqrlxdh" type="text" value="88552455"
																		style="width: 180px;" maxlength="15" title="申请人联系电话" />
																</td>

																<td class="text_tablehead_b" align="right" width="140px">
																	支付组号：
																</td>
																<td>
																	<input name="paymentno" id="zfzh" type="text"
																		style="width: 180px;" maxlength="20" title="支付组号" value="0988221"/>
																</td>

															</tr>
															</table>
															<br/>
															</fieldset>
															
													<fieldset
														style="width: 700px; border: 1px #CCCCCC solid; padding: 3px;"
														align=center>
														<legend>
															报文基本信息
														</legend>
														<br>
														<table border="0" cellspacing="0" cellpadding="0">
															<tr>
															<td class="text_tablehead_b" align="right">
																	系统号：
																</td>
																<td>
																	<select id="xth" style="width: 180px;" name="systemno" title="系统号">
																		<option selected="selected" value="BEPS">
																			小额
																		</option>
																		<option value="HVPS">
																			大额
																		</option>
																	</select>
																	</td>
																	<td class="text_tablehead_b" align="right">
																	优先级：
																</td>
																<td>
																	<select style="width: 180px;" name="sttlmprty" id="yxj">
																		<option value="0">
																			一般
																		</option>
																		<option value="1" selected="selected">
																			紧急
																		</option>
																		<option value="2">
																			特急
																		</option>
																	</select>
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" align="right" width="140px">
																	业务类型编码：
																</td>
																<td>
																	<select name="pmttp" id="ywlxbmval"
																		onChange="transferOfClient(this.value,'select_input');"
																		style="width: 180px;">

																		<option selected="selected" value="A108">
																			现金汇款
																		</option>
																		<option value="A109">
																			委托收款(划回)
																		</option>
																		<option value="A110">
																			托收承付(划回)
																		</option>
																		
																		<option value="A101">
																			公益性资金汇划
																		</option>
																		<option value="A102">
																			国库汇款
																		</option>
																		<option value="A104">
																			国库资金贷记划拨
																		</option>
																		<option value="A301">
																			缴费业务
																		</option>
																	</select>
																</td>
																<td class="text_tablehead_b" align="right" width="140px">
																	业务种类编码：
																</td>
																<td>
																	<select name="pmtkd" id="select_input"
																		style="width: 180px;"
																		onchange="isDisplayToInline(this.value);">
																	</select>
																</td>
															</tr>


															<tr>
																<td class="text_tablehead_b" align="right">
																	币种代码：
																</td>
																<td>
																	<input name="currency" id="bzdm" type="text"
																		style="width: 180px;" title="币种代码"  value="CNY" readonly="readonly"
																		onKeyPress="actkeyPress()" />
																</td>
																<td class="text_tablehead_b" align="right">
																	汇款金额：
																</td>
																<td>
																	<input name="ntryamt" id="hkje" type="text"
																		style="width: 180px;" title="汇款金额" maxlength="12"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																</td>
															<tr>
																<td class="text_tablehead_b" align="right">
																	手续费：
																</td>
																<td>
																	<input name="charge" id="sxf" type="text"
																		style="width: 180px;" title="手续费" maxlength="12"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																</td>
																<td class="text_tablehead_b" align="right">
																	邮电费：
																</td>
																<td>
																	<input name="postage" id="ydf" type="text"
																		style="width: 180px;" title="手续费" maxlength="12"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																</td>
															</tr>
															<tr>
																
																<td class="text_tablehead_b" align="right">
																	异地加收：
																</td>
																<td>
																	<input name="otherchange" id="ydjs" type="text"
																		style="width: 180px;" title="异地加收" maxlength="12"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																</td>
																<td class="text_tablehead_b" align="right">
																	总额：
																</td>
																<td>
																	<input name="allchange" id="ze" type="text"
																		style="width: 180px;" title="总额" maxlength="12"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																</td>
															</tr>

															

															<tr>
																<td class="text_tablehead_b" align="right">
																	本行户：
																</td>
																<td>
																	<select style="width: 180px;" name="selfaccount" id="bhh">
																		<option selected="selected" value="Y">
																			是
																		</option>
																		<option value="N">
																			否
																		</option>
																	</select>
																</td>

																<td class="text_tablehead_b" align="right">
																	附言：
																</td>
																<td>
																	<textarea name="remarkinfo" id="fy" style="width: 180px;"
																		rows="4" title="附言"></textarea>
																</td>

															</tr>

														</table>
														<br/>
													</fieldset>
													
													<fieldset
														style="width: 700px; border: 1px #CCCCCC solid; padding: 3px;"
														align="center">
														<legend>
															付款人信息
														</legend>
															<br>
														<table border="0" cellspacing="0" cellpadding="0">
															<tr>
																<td class="text_tablehead_b" align="right" width="140px">
																	付款人账号：
																</td>
																<td>
																	<input name="dbtracctid" id="fkrzh" type="text" value="98230021"
																		style="width: 180px;" title="付款人账号" maxlength="32"
																		onKeyPress="actkeyPress()" />
																</td>
																<td class="text_tablehead_b" align="right" width="140px">
																	付款人名称：
																</td>
																<td>
																	<input name="dbtrnm" id="fkrmc" type="text"
																		style="width: 180px;" title="付款人名称" maxlength="60"
																		onKeyPress="charPress()" />
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" align="right" width="140px">
																	付款人地址：
																</td>
																<td>
																	<input name="dbtraddr" id="fkrdz" type="text" value="北京市海淀区紫竹院"
																		style="width: 180px;" title="付款人地址" maxlength="100"
																		onKeyPress="actkeyPress()" />
																</td>
																<td class="text_tablehead_b" align="right" width="140px">
																	付款人开户行行号：
																</td>
																<td>
																	<input name="dbtrissr" id="fkrkhhhh" type="text" value="6008980313513"
																		style="width: 180px;" title="付款人开户行行号" maxlength="32"
																		onKeyPress="actkeyPress()" />
																</td>
															</tr>
															
															<tr>
																<td class="text_tablehead_b" align="right" width="140px">
																	付款清算行行号：
																</td>
																<td>
																	<input name="dbtrmmbid" id="fkqshhh" type="text" value="313452010871"
																		style="width: 180px;" title="付款清算行行号" maxlength="100"
																		onKeyPress="actkeyPress()" />
																</td>
																<td class="text_tablehead_b" align="right" width="140px">
																	付款行行号：
																</td>
																<td>
																	<input name="dbtrbrchid" id="fkhhh" type="text" value="313452010871"
																		style="width: 180px;" title="付款行行号" maxlength="100"
																		onKeyPress="actkeyPress()" />
																</td>
															</tr>
															
														</table>
														<br/>
													</fieldset>
													<fieldset
														style="width: 700px; border: 1px #CCCCCC solid; padding: 3px;"
														align="center">
															
														<legend>
															收款人信息
														</legend>
														<br>
														<table border="0" cellspacing="0" cellpadding="0">
															<tr>
																<td class="text_tablehead_b" align="right" width="140px">
																	收款人账号：
																</td>
																<td>
																	<input name="cdtracctid" id="skrzh" type="text" value="920502355352"
																		style="width: 180px;" title="收款人账号" maxlength="32"
																		onKeyPress="charPress()" />
																</td>
																<td class="text_tablehead_b" align="right" width="140px">
																	收款人名称：
																</td>
																<td>
																	<input name="cdtrnm" id="skrmc" type="text"
																		style="width: 180px;" title="收款人名称" maxlength="60"
																		onKeyPress="charPress()" />
																</td>
																
															</tr>
															<tr>
																
																<td class="text_tablehead_b" align="right">
																	收款人地址：
																</td>
																<td>
																	<input name="cdtraddr" id="skrdz" type="text" value="北京市海淀区紫竹院"
																		style="width: 180px;" title="收款人地址" maxlength="70"
																		onKeyPress="actkeyPress()" />
																</td>
																<td class="text_tablehead_b" align="right">
																	收款行清算行行号：
																</td>
																<td>
																	<input name="cdtrmmbid" id="skhqshhh" type="text" value="313452060150"
																		style="width: 180px;" title="收款行清算行行号" maxlength="70"
																		onKeyPress="actkeyPress()" />
																</td>
																
																
															</tr>
															<tr>
																<td class="text_tablehead_b" align="right" width="140px">
																	收款行行号：
																</td>
																<td>
																	<input name="cdtrbrchid" id="skhhh" type="text" value="145433123"
																		style="width: 180px;" title="收款行行号" maxlength="32"
																		onKeyPress="actkeyPress()" />
																</td>
																<td class="text_tablehead_b" align="right">
																	收款行名称：
																</td>
																<td>
																	<input name="cdtracctnm" id="skhmc" type="text" value="青岛银行"
																		style="width: 180px;" title="收款人行名称" maxlength="60"
																		onKeyPress="actkeyPress()" />
																</td>
																
															</tr>
															<tr>
																
																<td class="text_tablehead_b" align="right">
																	收款行开户行行号：
																</td>
																<td>
																	<input name="cdtrissr" id="skhkhhhh" type="text" value="313452010986"
																		style="width: 180px;" title="收款行开户行行号" maxlength="32"
																		onKeyPress="actkeyPress()" />
																</td>
																<td class="text_tablehead_b" align="right">
																	收款人开户行名称：
																</td>
																<td>
																	<input name="cdtrissrnm" id="skrkhhmc" type="text" value="青岛银行"
																		style="width: 180px;" title="收款人开户行行号" maxlength="32"
																		onKeyPress="actkeyPress()" />
																</td>
															</tr>
															
														</table>
														<br/>
													</fieldset>
													




													<fieldset
														style="width: 700px; border: 1px #CCCCCC solid; padding: 3px;"
														align="center">
														<legend>
															附加填写项
														</legend>
															<br>
														<table border="0" cellspacing="0" cellpadding="0">

															<!-- 当业务类型编码选择A109(委托收款(划回))，时显示div -->
															<tr id="A1091" style="display: none;">

																<td class="text_tablehead_b" align="right" width="140px">
																	票据日期：
																</td>
																<td>
																	<input name="collectiondate" id="pjrq109" class="Wdate" type="text"
																		readonly="readonly" title="票据日期" style="width: 180px;"
																		class="Wdate" onclick="WdatePicker()" />
																</td>
																<td class="text_tablehead_b" align="right">
																	票据种类：
																</td>
																<td>
																	<select style="width: 180px;" title="票据种类" id="pjzl109" name="collectiontype">
																		<option value="TP00">
																			银行承兑汇票
																		</option>
																		<option value="TP01">
																			定期存单
																		</option>
																		<option value="TP02">
																			凭证式国债
																		</option>
																		<option value="TP03">
																			异地活期存折
																		</option>
																		<option value="TP04">
																			其他
																		</option>
																	</select>
																</td>
															</tr>
															<tr id="A1092" style="display: none;">
																<td class="text_tablehead_b" align="right">
																	票据号码：
																</td>
																<td>
																	<input name="collectionno" id="pjhm109" type="text"
																		style="width: 180px;" title="票据号码" maxlength="32"
																		onKeyPress="actkeyPress()" />
																</td>
															</tr>


															<!-- 当业务类型编码选择A110(-托收承付（划回）)，显示DIV -->
															<tr id="A1101" style="display: none;">
																<td class="text_tablehead_b" align="right" width="140px">
																	票据日期：
																</td>
																<td>
																	<input id="pjrq110" type="text" style="width: 180px;" name="honourdate"
																		class="Wdate" title="票据日期" maxlength="16"
																		onclick="WdatePicker()" />
																</td>
																<td class="text_tablehead_b" align="right" width="140px">
																	票据号码：
																</td>
																<td>
																	<input id="pjhm110" type="text" style="width: 180px;" name="honourno"
																		title="票据号码" maxlength="32" onKeyPress="charPress()" />
																</td>
															</tr>

															<tr id="A1102" style="display: none;">
																<td class="text_tablehead_b" align="right">
																	赔偿金金额：
																</td>
																<td>
																	<input name="damages" id="pcjje110" type="text"
																		style="width: 180px;" title="赔偿金金额"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																</td>

																<td class="text_tablehead_b" align="right">
																	拒付金金额：
																</td>
																<td>
																	<input id="jfjje110" type="text" style="width: 180px;" name="refusechange"
																		title="拒付金金额" onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																</td>

															</tr>

															<!-- 当业务类型编码选择A201(支票)，业务种类编码选择03401(支票)时显示div -->


															<tr id="A2011" style="display: none;">
																<td class="text_tablehead_b" align="right" width="140px">
																	票据日期：
																</td>
																<td>
																	<input name="chkdate" id="pjrq201" type="text"
																		style="width: 180px;"  title="票据日期"
																		onclick="WdatePicker()" />
																</td>
																<td class="text_tablehead_b" align="right" width="140px">
																	出票人名称：
																</td>
																<td>
																	<input name="chknm" id="cprmc201" type="text" style="width: 180px;"
																		title="出票人名称" onKeyPress="actkeyPress()"
																		maxlength="60" />
																</td>
															</tr>

															<tr id="A2012" style="display: none;">
																<td class="text_tablehead_b" align="right">
																	票据金额：
																</td>
																<td>
																	<input name="chkamt" id="pjje201" type="text"
																		style="width: 180px;" title="票据金额"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																</td>

																<td class="text_tablehead_b" align="right">
																	牌价：
																</td>
																<td>
																	<input name="chkprice" id="pj201" type="text"
																		style="width: 180px;" title="牌价"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																</td>

															</tr>
															<tr id="A2013" style="display: none;">
																<td class="text_tablehead_b" align="right">
																	票据张数：
																</td>
																<td>
																	<input name="chkCount" id="pjzs201" type="text"
																		style="width: 180px;" title="票据张数" maxlength="4" />
																</td>
															</tr>


															<!-- 当业务类型业务类型为A301-(缴费业务)，时显示div -->

															<tr id="A3011" style="display: none;">

																<td class="text_tablehead_b" align="right" width="140px">
																	收费单位流水号：
																</td>
																<td>
																	<input name="jfmsgid" id="sfdwlsh301" type="text"
																		style="width: 180px;" title="收费单位流水号"
																		onKeyPress="actkeyPress()" maxlength="20" />
																</td>

																<td class="text_tablehead_b" align="right" width="140px">
																	所属期间：
																</td>
																<td>
																	<input name="jfdate" id="ssqj301" type="text"
																		style="width: 180px;" maxlength="16" title="所属期间" />
																</td>
															</tr>
															<tr id="A3012" style="display: none;">
																<td class="text_tablehead_b" align="right" width="140px">
																	缴费类型：
																</td>
																<td>
																	<select name="jftype" style="width: 180px;" id="jflx301">
																		<option value="TP00" selected="selected">
																			现金
																		</option>

																	</select>
																</td>

																<td class="text_tablehead_b" align="right">
																	收费附言：
																</td>
																<td>
																	<textarea name="jfremarkinfo" id="sfyy301" type="text" rows="4"
																		style="width: 180px;" title="收费附言"></textarea>
																</td>
															</tr>


															<!-- 当业务类型 A104-国库资金贷记划拨  显示DIV-->

															<tr id="A1041" style="display: none;">

																<td class="text_tablehead_b" align="right" width="140px">
																	明细汇总金额：
																</td>
																<td>
																	<input name="gkallchange" id="mxhzje104" type="text" style="width: 180px;"
																		title="明细汇总金额" onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																</td>

																<td class="text_tablehead_b" align="right" width="140px">
																	上报国库代码：
																</td>
																<td>
																	<input name="gksendcode" id="sbgkdm104" type="text"
																		style="width: 180px;" title="上报国库代码" maxlength="10" />
																</td>
															</tr>

															<tr id="A1042" style="display: none;">

																<td class="text_tablehead_b" align="right" width="140px">
																	接收国库代码：
																</td>
																<td>
																	<input name="gkreceivecode" id="jsgkdm104" type="text" style="width: 180px;"
																		title="接收国库代码" maxlength="10" />
																</td>

																<td class="text_tablehead_b" align="right" width="140px">
																	报表日期：
																</td>
																<td>
																	<input name="gktabledate" id="bbrq104" type="text"
																		style="width: 180px;" class="Wdate" title="报表日期"
																		onclick="WdatePicker()" />
																</td>
															</tr>

															<tr id="A1043" style="display: none;">

																<td class="text_tablehead_b" align="right" width="140px">
																	报表序号：
																</td>
																<td>
																	<input name="gktableid" id="bbxh104" type="text" style="width: 180px;"
																		title="报表序号" onKeyPress="actkeyPress()" maxlength="10" />
																</td>

																<td class="text_tablehead_b" align="right" width="140px">
																	预算级次：
																</td>
																<td>
																	<select name="gkbudgetlevel" id="ysjb104" style="width: 180px;">
																		<option value="BL00">
																			中央
																		</option>
																		<option value="BL01">
																			省级
																		</option>
																	</select>
																</td>
															</tr>

															<tr id="A1044" style="display: none;">
																<td class="text_tablehead_b" align="right" width="140px">
																	调整期标志：
																</td>
																<td>
																	<select name="gkadjustsign" style="width: 180px;" id="tzqbz104">
																		<option value="ID00">
																			正常
																		</option>
																		<option value="ID01">
																			调整期
																		</option>
																	</select>
																</td>

																<td class="text_tablehead_b" align="right" width="140px">
																	预算种类：
																</td>
																<td>
																	<select name="gkbudgettype" style="width: 180px;" id="yszl104">
																		<option value="BT00">
																			预算内
																		</option>
																		<option value="BT01">
																			预算外
																		</option>
																	</select>
																</td>
															</tr>

															<tr id="A1045" style="display: none;">
																<td class="text_tablehead_b" align="right" width="140px">
																	明细条数：
																</td>
																<td>
																	<input name="gkcount" id="listnum1" type="text"
																		style="width: 180px;" value="1" />
																</td>

																<td class="text_tablehead_b" align="right" width="140px">
																	明细列表
																</td>
																<td class="text_tablehead_b" align="right" width="140px">
																	<input type=button value="添加" onclick="AddRow();" />
																</td>
															</tr>


															<tr id="A1046" style="display: none;">
																<td colspan="4" align="center">
																	<div>
																		<table id="mytable" border="1" cellpadding="2"
																			cellspacing="2" bordercolor="#CCCCCC"
																			style="text-align: left; vertical-align: top">

																			<tr id="gr1">
																			
																				<td class="text_tablehead_b" align="right" width="80px">
																					征收机关大类代码
																				</td>
																				<td class="text_tablehead_b" align="right" width="80px">
																					预算科目代码
																				</td>
																				<td class="text_tablehead_b" align="right" width="80px">
																					发生额
																				</td>

																			</tr>
																			<tr>
																			
																				<td>
																					<select name="collcode">
																						<option value="1111111111">
																							国税
																						</option>
																						<option value="2222222222">
																							地税
																						</option>
																						<option value="3333333333">
																							海关
																						</option>
																						<option value="4444444444">
																							财政
																						</option>
																						<option value="5555555555">
																							其他
																						</option>
																					</select>
																				</td>
																				

																				<td>
																					<input type="text" name="amt" id="amt" value=""
																						onKeyPress="amountPress()"
																						onkeyup="value=value.replace(/[^\d.]/g,'')" />
																				</td>
																				
																				<td>
																				<input type="text" name="amt" id="amt" value=""/>
																				</td>
																				
																			</tr>

																		</table>
																	</div>
																</td>
															</tr>


															<tr id="A0000" style="display: none;">
																<td colspan="4" width="700px" align="center">
																	<span class="STYLE1">没有附加填写项</span>
																</td>
															</tr>

														</table>
														<br/>
													</fieldset>
														
												</td>
											</tr>
										</table>


										<br />
										<span class="STYLE1">说明：红色*标注项为必填项</span>
										<br />
										<br />
										<input name="addButton" type="button" style="cursor: pointer"
											class="button" value="复  核" onclick="commitForm();" />
										&nbsp;
										<input name="backButton" style="cursor: pointer" type="button"
											class="button" value="返  回" onclick="history.back();" />
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
