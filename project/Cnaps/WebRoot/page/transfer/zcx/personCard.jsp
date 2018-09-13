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

		<script type="text/javascript">
			function selectLoad(){
				//var temp = document.getElementById('ywlxbmval').value;
				transferOfClient(temp,'select_input');
				
			}
				function commitForm(){
			   var msg = "@";
				var certnum = document.getElementById("certnum");
				var issueState = document.getElementById("issueState");
				var certsize = document.getElementById("certsize");
				var name = document.getElementById("name");
				var address = document.getElementById("address");
				var phone = document.getElementById("phone");
				var paymentnum = document.getElementById("paymentnum");
				var payerNum = document.getElementById("payerNum");
				var receNum = document.getElementById("receNum");
				var receName = document.getElementById("receName");
				var receBankNum = document.getElementById("receBankNum");
				
				
				
				
				var receBankName = document.getElementById("receBankName");
				var receOpenBankNum = document.getElementById("receOpenBankNum");
				var receOpenBankName = document.getElementById("receOpenBankName");
				var moneyClassCode = document.getElementById("moneyClassCode");
				var moneyNum = document.getElementById("moneyNum");
				var handingCharge = document.getElementById("handingCharge");
				var postCharge = document.getElementById("postCharge");
				var otherPlaceCharge = document.getElementById("otherPlaceCharge");
				var totalMoney = document.getElementById("totalMoney");
				 
				
				
				if(isNull(trim(handingCharge.value))){
					msg += handingCharge.title+"不能为空！@";
				}
				if(isNull(trim(postCharge.value))){
					msg += postCharge.title+"不能为空！@";
				}
				if(isNull(trim(otherPlaceCharge.value))){
					msg +=otherPlaceCharge.title+"不能为空！@";
				}
				if(isNull(trim(totalMoney.value))){
					msg += totalMoney.title+"不能为空！@";
				}
				
				
				
				
				
				
				
				
				if(isNull(trim(receBankName.value))){
					msg += receBankName.title+"不能为空！@";
				}
				if(isNull(trim(receOpenBankNum.value))){
					msg += receOpenBankNum.title+"不能为空！@";
				}
				if(isNull(trim(receOpenBankName.value))){
					msg +=receOpenBankName.title+"不能为空！@";
				}
				if(isNull(trim(moneyClassCode.value))){
					msg += moneyClassCode.title+"不能为空！@";
				}
				if(isNull(trim(moneyNum.value))){
					msg += moneyNum.title+"不能为空！@";
				}
				if(isNull(trim(receBankNum.value))){
					msg += receBankNum.title+"不能为空！@";
				}
				if(isNull(trim(receName.value))){
					msg += receName.title+"不能为空！@";
				}
				if(validatehh(trim(receNum.value))){
					msg += receNum.title+"必须是12位数字！@";
				}
				if(validatehh(trim(payerNum.value))){
					msg += payerNum.title+"必须是12位数字！@";
				}
				if(isNull(trim(paymentnum.value))){
					msg += paymentnum.title+"不能为空！@";
				}
				if(isNull(trim(phone.value))){
					msg += phone.title+"不能为空！@";
				}
				if(isNull(trim(address.value))){
					msg += address.title+"不能为空！@";
				}
				if(isNull(trim(name.value))){
					msg += name.title+"不能为空！@";
				}
				if(isNull(trim(issueState.value))){
					msg += issueState.title+"不能为空！@";
				}
				if(isNull(trim(certsize.value))){
					msg += certsize.title+"不能为空！@";
				}
				if(validatehh(trim(certnum.value))){
					msg += certnum.title+"必须是12位数字！@";
				}
			 
				var boo = msgSplit(msg);
				alert(" boo ="+boo);
				document.forms[0].submit();
				if(boo){
				// document.getElementById("hvps11109").value=rmoney(document.getElementById("hvps11109").value) ;
				//document.getElementById("A10051").value=rmoney(document.getElementById("A10051").value) ;
					//document.forms[0].submit();
				}
				 
		 }
		</script>
	</head>
	<body>
		<form method="post"
			action="<%=path%>/transfer/RealTimeCreditAction.do?method=sendCredit">
			<input id="signval" type="hidden" value="sign0">
			<input type="hidden" name="token" value="${token}" />
			<!-- 防止重复提交 -->
		 <input id="cardcrash" name="cardcrash" type="hidden" value="card">
		
		  
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
											卡折跨行通存录入
													
												</h4>
											</th>
											<tr>
												<td>
													
														<table border="1" bordercolor="#BDD#F0" cellspacing="0" cellpadding="0" bgcolor="#f4f8fd">
																	<tr>
																<td  rowspan="2"  width="2" class="text_tablehead_b" align="center">
																	<span style="margin-left: 7px;">基</span>
																	<span style="margin-left: 7px;">本</span>
																	<span style="margin-left: 7px;">信</span>
																	<span style="margin-left: 7px;">息</span>
																</td>
																<td class="text_tablehead_b" align="right" >
																	系统号
																</td>
																<td>
																	<select id="xth"  name="systemno" title="系统号">
																		<option value="BEPS">
																			小额
																		</option>
																		
																	</select>
																	</td>
																<td class="text_tablehead_b" align="right" colspan="2">
																<!--  	优先级 -->
																</td>
																<td>
																<!-- 	<select  name="sttlmprty" id="yxj">
																		<option value="0">
																			一般
																		</option>
																		
																	</select>-->
																</td>
																
															</tr>
															
															<tr>
																
																
																<td class="text_tablehead_b" align="right">
																	业务类型编码
																</td>
																<td>
																<select  name="po.businesssizenum" id="businesssizenum" style="width:180px;" title="业务类型编码">
																<option value="C102"  selected="selected">个人储蓄通存业务</option>
																 
																 
																</select>
																</td>
																<td class="text_tablehead_b" align="right"  colspan="2">
																	业务种类编码
																</td>
																<td>
																<select  name="po.businessClassCode" id="businessClassCode" style="width:180px;" title="业务种类编码">
																<option value="03302"  selected="selected">转账</option>
															
																</select>
																</td>
															</tr>
															<tr>	
															</tr>
																<tr>
																<td  rowspan="3"  width="2" class="text_tablehead_b" align="center">
																	<span style="margin-left: 7px;">申</span>
																	<span style="margin-left: 7px;">请</span>
																	<span style="margin-left: 7px;">人</span>
																	<span style="margin-left: 7px;">信</span>
																	<span style="margin-left: 7px;">息</span>
																</td>
																<td class="text_tablehead_b" align="right" >
																	证件类型
																</td>
																<td>
																
																		<select  name="po.certsize" id="certsize">
																		<option value="01">
																			身份证
																		</option>
																	
																	</select>
																</td>
															
																<td class="text_tablehead_b" align="right"  colspan="2">
																	申请人证件号
																</td>
																<td >
																	<input name="po.certnum" id="certnum" type="text" size="19"
																		maxlength="19" title="申请人证件号" />
																		<span name="validate" dataName="appcertno" dataType="Empty" msg="申请人证件号不能为空！" class="STYLE1">*</span>
																</td>
															</tr>
																<tr>
																	
																<td class="text_tablehead_b" align="right" >
																	证件发行国家 
																</td>
																<td >
																	<input name="po.issueState" id="issueState" type="text"
																		 title="证件发行国家" maxlength="3" />
																</td>

																<td class="text_tablehead_b" align="right"  colspan="2">
																	申请人联系电话
																</td>
																<td>
																	<input name="po.phone" id="phone" type="text"
																		 maxlength="15" title="申请人联系电话" />
																</td>
																
																</tr>
																
																<!-- zcx -->
																	<tr>
																	
																<td class="text_tablehead_b" align="right" >
																<!-- 	证件发行国家-->
																</td>
																<td >
																<!--	<input name="po.issueState" id="issueState" type="text"
																		 title="证件发行国家" maxlength="3" />-->
																</td>

																<td class="text_tablehead_b" align="right"  colspan="2">
																	申请人姓名
																</td>
																<td>
																	<input name="po.name" id="name" type="text"
																		 maxlength="15" title="申请人姓名" />
																</td>
																
																</tr>
																<!-- zcx -->
																
														
															<tr>	
															</tr>
															<tr>
																<td rowspan="9" width="2" class="text_tablehead_b" align="center" >
																<span style="margin-left: 7px;">付</span>
																<span style="margin-left: 7px;">款</span>
																<span style="margin-left: 7px;">人</span>
																<span style="margin-left: 7px;">信</span>
																<span style="margin-left: 7px;">息</span>
																</td>
																<td class="text_tablehead_b" align="right" width="140px">
																	付款人账号
																</td>
																<td>
																	<input name="po.payerNum" id="payerNum" type="text"
																		style="width: 180px;" title="付款人账号" maxlength="32"
																		onKeyPress="actkeyPress()" />
																</td>
																
																<td rowspan="9" width="2" class="text_tablehead_b" align="center" >
																<span style="margin-left: 7px;">收</span>
																<span style="margin-left: 7px;">款</span>
																<span style="margin-left: 7px;">人</span>
																<span style="margin-left: 7px;">信</span>
																<span style="margin-left: 7px;">息</span>
																</td>
																<td class="text_tablehead_b" align="right" width="140px">
																	收款人账号
																</td>
																<td>
																	<input name="po.receNum" id="receNum" type="text"
																		style="width: 180px;" title="收款人账号" maxlength="32"
																		onKeyPress="charPress()" />
																</td>
															</tr>
															
																<!-- add by zcx -->
															<tr>
															  
															<td class="text_tablehead_b" align="right" width="140px">付款人账户类型：</td>
															<td>
															<select  name="po.payAccountType" id="payAccountType" style="width:180px;" title="付款人账户类型">
																<option value="AT01"  selected="selected">贷记卡</option>
																 
																<option value="AT02">借记卡</option>
																</select>
															
															</td>
															<td class="text_tablehead_b" align="right">收款人账户类型：</td>
															<td>
															   <select  name="po.receAccountType" id="receAccountType" style="width:180px;" title="收款人账户类型">
																<option value="AT01"  selected="selected">贷记卡</option>
																 
																<option value="AT02">借记卡</option>
																</select>
															</td>
															</tr>
														
															
															<!--  the end add by zcx -->
															
															
															<tr>
																<td class="text_tablehead_b" align="right" width="140px">
																<!-- 付款人名称---无  -->
																</td>
																<td>
																<!-- 	<input name="dbtrnm" id="fkrmc" type="text"
																		style="width: 180px;" title="付款人名称" maxlength="60"
																		onKeyPress="charPress()" /> -->
																</td>
																<td class="text_tablehead_b" align="right" width="140px">
																	收款人名称
																</td>
																<td>
																	<input name="po.receName" id="receName" type="text"
																		style="width: 180px;" title="收款人名称" maxlength="60"
																		onKeyPress="charPress()" />
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" align="right" width="140px">
																	申请人地址
																</td>
																<td>
																	<textarea name="po.address" id="address" 
																		rows="4" onKeyPress="actkeyPress()"  onkeyup="limitLength(value,70,'提示：','address')"></textarea>
																</td>
																<td class="text_tablehead_b" align="right">
																	收款人地址
																</td>
																<td>
																	<textarea name="po.receAddress" id="receAddress" 
																		rows="4" onKeyPress="actkeyPress()" onkeyup="limitLength(value,70,'提示：','receAddress')" ></textarea>
																	
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" align="right" width="140px">
																	<!--  付款人开户行行号---无-->
																</td>
																<td>
																	<!--<input name="dbtrissr" id="fkrkhhhh" type="text"
																		style="width: 180px;" title="付款人开户行行号" maxlength="32"
																		onKeyPress="actkeyPress()" />-->
																</td>
																<td class="text_tablehead_b" align="right">
																	收款人开户行行号
																</td>
																<td>
																	<input name="po.receOpenBankNum" id="receOpenBankNum" type="text"
																		style="width: 180px;" title="收款行开户行行号" maxlength="32"
																		onKeyPress="actkeyPress()" />
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" align="right" width="140px">
																	<!--付款清算行行号---无-->
																</td>
																<td>
																	<!--<input name="dbtrmmbid" id="fkqshhh" type="text"
																		style="width: 180px;" title="付款清算行行号" maxlength="100"
																		onKeyPress="actkeyPress()" />-->
																</td>
																<td class="text_tablehead_b" align="right">
																	<!--  收款行清算行行号-->
																</td>
																<td>
																	<!--<input name="cdtrmmbid" id="skhqshhh" type="text"
																		style="width: 180px;" title="收款行清算行行号" maxlength="70"
																		onKeyPress="actkeyPress()" />-->
																</td>
															</tr>
															<tr>
																
																<td class="text_tablehead_b" align="right" width="140px">
																	<!-- 	付款行行号-->
																</td>
																<td>
																		<!-- <input name="dbtrbrchid" id="fkhhh" type="text"
																		style="width: 180px;" title="付款行行号" maxlength="100"
																		onKeyPress="actkeyPress()" />-->
																</td>
																<td class="text_tablehead_b" align="right" width="140px">
																	收款行行号
																</td>
																<td>
																	<input name="po.receBankNum" id="receBankNum" type="text"
																		style="width: 180px;" title="收款行行号" maxlength="32"
																		onKeyPress="actkeyPress()" />
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" align="right">
																	<!--  付款行名称-->
																</td>
																<td>
																	<!-- <input name="" id="skhmc" type="text"
																		style="width: 180px;"  maxlength="60"
																		onKeyPress="actkeyPress()" />-->
																</td>
																<td class="text_tablehead_b" align="right">
																	收款行名称
																</td>
																<td>
																	<input name="po.receBankName" id="receBankName" type="text"
																		style="width: 180px;" title="收款人行名称" maxlength="60"
																		onKeyPress="actkeyPress()" />
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" align="right">
																	<!--	付款款人开户行名称 -->
																</td>
																<td>
																<!-- 	<input name="" id="skrkhhmc" type="text"
																		style="width: 180px;"  maxlength="32"
																		onKeyPress="actkeyPress()" />-->
																</td>
																
																<td class="text_tablehead_b" align="right">
																	收款人开户行名称
																</td>
																<td>
																	<input name="po.receOpenBankName" id="receOpenBankName" type="text"
																		style="width: 180px;" title="收款人开户行名称" maxlength="32"
																		onKeyPress="actkeyPress()" />
																</td>
															</tr>
															<tr>	
															</tr>
																<tr>
																<td  rowspan="2"  width="2" class="text_tablehead_b" align="center">
																	
																	<span style="margin-left: 7px;">金</span>
																	<span style="margin-left: 7px;">额</span>
																	<span style="margin-left: 7px;">信</span>
																	<span style="margin-left: 7px;">息</span>
																</td>
																<td class="text_tablehead_b" align="right">
																	币种代码
																</td>
																<td>
																	<input name="po.moneyClassCode" id="moneyClassCode" type="text"
																		style="width: 180px;" title="币种代码"  value="CNY" readonly="readonly"
																		onKeyPress="actkeyPress()" />
																</td>
																<td class="text_tablehead_b" align="right" colspan="2">
																	总额
																</td>
																<td >
																	<input name="po.totalMoney" id="totalMoney" type="text"
																		style="width: 180px;" title="总额" maxlength="12"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																</td>
																
																</tr>
																<tr>
																	<td class="text_tablehead_b" align="right"  >
																		汇款金额
																	</td>
																	<td colspan="4">
																		<input name="po.moneyNum" id="moneyNum" type="text"
																			style="width: 180px;" title="汇款金额" maxlength="12"
																			onKeyPress="amountPress()"
																			onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																			onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																	</td>
																	
																</tr>
																<tr>	
															</tr>
															<tr>
																<td  rowspan="3"  width="2" class="text_tablehead_b" align="center">
																	
																	<span style="margin-left: 7px;">计</span>
																	<span style="margin-left: 7px;">费</span>
																	<span style="margin-left: 7px;">信</span>
																	<span style="margin-left: 7px;">息</span>
																</td>
															<!--	<td class="text_tablehead_b" align="right" >
																	本行户
																</td>
																<td colspan="4">
																	<select  name="selfaccount" id="bhh">
																		<option value="Y">
																			是
																		</option>
																		<option value="N">
																			否
																		</option>
																	</select>
																</td>-->
																
															<td class="text_tablehead_b" align="right">
																	本行户
																</td>
																<td>
																<select  name="po.payBankNum" id="payBankNum">
																		<option value="Y">
																			是
																		</option>
																		<option value="N">
																			否
																		</option>
																	</select>	</td>
																<td class="text_tablehead_b" align="right" colspan="2">
																	<!--备注-->
																</td>
																<td>
																<!--<input name="po.receBankName" id="receBankName" type="text" style="width:180px;" title="收款行名称" maxlength="14"  onKeyPress="actkeyPress()"/>  --></td>
														 						 
															</tr>
															<tr>
															<td class="text_tablehead_b" align="right">
																	手续费
																</td>
																<td>
																	<input name="po.handingCharge" id="handingCharge" type="text"
																		style="width: 180px;" title="手续费" maxlength="12"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																</td>
																<td class="text_tablehead_b" align="right" colspan="2">
																	邮电费
																</td>
																<td>
																	<input name="po.postCharge" id="postCharge" type="text"
																		style="width: 180px;" title="邮电费" maxlength="12"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																</td>
															</tr>
															<tr>
															
															<td class="text_tablehead_b" align="right">
																	异地加收
																</td>
																<td>
																	<input name="po.otherPlaceCharge" id="otherPlaceCharge" type="text"
																		style="width: 180px;" title="手续费" maxlength="12"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																</td>
																<td class="text_tablehead_b" align="right" colspan="2">
																	支付组号
																</td>
																<td>
																	<input name="po.paymentnum" id="paymentnum" type="text"
																		style="width: 180px;" title="手续费" maxlength="12"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																</td>
															<!--  
																<td class="text_tablehead_b" align="right">
																	异地加收
																</td>
																<td colspan="2">
																	<input name="otherchange" id="ydjs" type="text"
																		style="width: 180px;" title="异地加收" maxlength="12"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																</td>
																-->
															</tr>
															<tr>	
															</tr>
															<tr>
															<td   width="2" class="text_tablehead_b" align="center">
																	
																	<span style="margin-left: 7px;">附</span>
																	<span style="margin-left: 7px;">言</span>
																	<span style="margin-left: 7px;">信</span>
																	<span style="margin-left: 7px;">息</span>
																</td>
																<td class="text_tablehead_b" align="right" >
																	附言
																</td>
																<td colspan="4">
																	<textarea name="po.postscript" id="postscript" 
																		rows="4" cols="70" onKeyPress="charPress()" onkeyup="limitLength(value,135,'提示：','fy')"></textarea>
																</td>

															</tr>
															
															<tr>
															<td   width="2" class="text_tablehead_b" align="center">
																	
																	<span style="margin-left: 7px;">附</span>
																	<span style="margin-left: 7px;">言</span>
																	<span style="margin-left: 7px;">信</span>
																	<span style="margin-left: 7px;">息</span>
																</td>
																<td class="text_tablehead_b" align="right" >
																	备注
																</td>
																<td colspan="4">
																	<textarea name="po.remarkinfo" id="remarkinfo" 
																		rows="4" cols="70" onKeyPress="charPress()" onkeyup="limitLength(value,135,'提示：','remarkinfo')"></textarea>
																</td>

															</tr>
															
															
															<tr></tr>
															<!-- 
															<tr>
															<td    width="2" class="text_tablehead_b" align="center">
																	
																	<span style="margin-left: 7px;">附</span>
																	<span style="margin-left: 7px;">加</span>
																	<span style="margin-left: 7px;">信</span>
																	<span style="margin-left: 7px;">息</span>
																</td>
															 <td align="left" colspan="6">
															
															 </td>
															 </tr>-->
														</table>
													
														
												</td>
											</tr>
										</table>


										<br />
										<span class="STYLE1">说明：红色*标注项为必填项</span>
										<br />
										<br />
										<input name="addButton" type="button" style="cursor: pointer"
											class="button" value="保  存" onclick="commitForm();" />
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
