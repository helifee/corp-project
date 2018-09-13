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
					msg += handingCharge.title+"����Ϊ�գ�@";
				}
				if(isNull(trim(postCharge.value))){
					msg += postCharge.title+"����Ϊ�գ�@";
				}
				if(isNull(trim(otherPlaceCharge.value))){
					msg +=otherPlaceCharge.title+"����Ϊ�գ�@";
				}
				if(isNull(trim(totalMoney.value))){
					msg += totalMoney.title+"����Ϊ�գ�@";
				}
				
				
				
				
				
				
				
				
				if(isNull(trim(receBankName.value))){
					msg += receBankName.title+"����Ϊ�գ�@";
				}
				if(isNull(trim(receOpenBankNum.value))){
					msg += receOpenBankNum.title+"����Ϊ�գ�@";
				}
				if(isNull(trim(receOpenBankName.value))){
					msg +=receOpenBankName.title+"����Ϊ�գ�@";
				}
				if(isNull(trim(moneyClassCode.value))){
					msg += moneyClassCode.title+"����Ϊ�գ�@";
				}
				if(isNull(trim(moneyNum.value))){
					msg += moneyNum.title+"����Ϊ�գ�@";
				}
				if(isNull(trim(receBankNum.value))){
					msg += receBankNum.title+"����Ϊ�գ�@";
				}
				if(isNull(trim(receName.value))){
					msg += receName.title+"����Ϊ�գ�@";
				}
				if(validatehh(trim(receNum.value))){
					msg += receNum.title+"������12λ���֣�@";
				}
				if(validatehh(trim(payerNum.value))){
					msg += payerNum.title+"������12λ���֣�@";
				}
				if(isNull(trim(paymentnum.value))){
					msg += paymentnum.title+"����Ϊ�գ�@";
				}
				if(isNull(trim(phone.value))){
					msg += phone.title+"����Ϊ�գ�@";
				}
				if(isNull(trim(address.value))){
					msg += address.title+"����Ϊ�գ�@";
				}
				if(isNull(trim(name.value))){
					msg += name.title+"����Ϊ�գ�@";
				}
				if(isNull(trim(issueState.value))){
					msg += issueState.title+"����Ϊ�գ�@";
				}
				if(isNull(trim(certsize.value))){
					msg += certsize.title+"����Ϊ�գ�@";
				}
				if(validatehh(trim(certnum.value))){
					msg += certnum.title+"������12λ���֣�@";
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
			<!-- ��ֹ�ظ��ύ -->
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
											���ۿ���ͨ��¼��
													
												</h4>
											</th>
											<tr>
												<td>
													
														<table border="1" bordercolor="#BDD#F0" cellspacing="0" cellpadding="0" bgcolor="#f4f8fd">
																	<tr>
																<td  rowspan="2"  width="2" class="text_tablehead_b" align="center">
																	<span style="margin-left: 7px;">��</span>
																	<span style="margin-left: 7px;">��</span>
																	<span style="margin-left: 7px;">��</span>
																	<span style="margin-left: 7px;">Ϣ</span>
																</td>
																<td class="text_tablehead_b" align="right" >
																	ϵͳ��
																</td>
																<td>
																	<select id="xth"  name="systemno" title="ϵͳ��">
																		<option value="BEPS">
																			С��
																		</option>
																		
																	</select>
																	</td>
																<td class="text_tablehead_b" align="right" colspan="2">
																<!--  	���ȼ� -->
																</td>
																<td>
																<!-- 	<select  name="sttlmprty" id="yxj">
																		<option value="0">
																			һ��
																		</option>
																		
																	</select>-->
																</td>
																
															</tr>
															
															<tr>
																
																
																<td class="text_tablehead_b" align="right">
																	ҵ�����ͱ���
																</td>
																<td>
																<select  name="po.businesssizenum" id="businesssizenum" style="width:180px;" title="ҵ�����ͱ���">
																<option value="C102"  selected="selected">���˴���ͨ��ҵ��</option>
																 
																 
																</select>
																</td>
																<td class="text_tablehead_b" align="right"  colspan="2">
																	ҵ���������
																</td>
																<td>
																<select  name="po.businessClassCode" id="businessClassCode" style="width:180px;" title="ҵ���������">
																<option value="03302"  selected="selected">ת��</option>
															
																</select>
																</td>
															</tr>
															<tr>	
															</tr>
																<tr>
																<td  rowspan="3"  width="2" class="text_tablehead_b" align="center">
																	<span style="margin-left: 7px;">��</span>
																	<span style="margin-left: 7px;">��</span>
																	<span style="margin-left: 7px;">��</span>
																	<span style="margin-left: 7px;">��</span>
																	<span style="margin-left: 7px;">Ϣ</span>
																</td>
																<td class="text_tablehead_b" align="right" >
																	֤������
																</td>
																<td>
																
																		<select  name="po.certsize" id="certsize">
																		<option value="01">
																			���֤
																		</option>
																	
																	</select>
																</td>
															
																<td class="text_tablehead_b" align="right"  colspan="2">
																	������֤����
																</td>
																<td >
																	<input name="po.certnum" id="certnum" type="text" size="19"
																		maxlength="19" title="������֤����" />
																		<span name="validate" dataName="appcertno" dataType="Empty" msg="������֤���Ų���Ϊ�գ�" class="STYLE1">*</span>
																</td>
															</tr>
																<tr>
																	
																<td class="text_tablehead_b" align="right" >
																	֤�����й��� 
																</td>
																<td >
																	<input name="po.issueState" id="issueState" type="text"
																		 title="֤�����й���" maxlength="3" />
																</td>

																<td class="text_tablehead_b" align="right"  colspan="2">
																	��������ϵ�绰
																</td>
																<td>
																	<input name="po.phone" id="phone" type="text"
																		 maxlength="15" title="��������ϵ�绰" />
																</td>
																
																</tr>
																
																<!-- zcx -->
																	<tr>
																	
																<td class="text_tablehead_b" align="right" >
																<!-- 	֤�����й���-->
																</td>
																<td >
																<!--	<input name="po.issueState" id="issueState" type="text"
																		 title="֤�����й���" maxlength="3" />-->
																</td>

																<td class="text_tablehead_b" align="right"  colspan="2">
																	����������
																</td>
																<td>
																	<input name="po.name" id="name" type="text"
																		 maxlength="15" title="����������" />
																</td>
																
																</tr>
																<!-- zcx -->
																
														
															<tr>	
															</tr>
															<tr>
																<td rowspan="9" width="2" class="text_tablehead_b" align="center" >
																<span style="margin-left: 7px;">��</span>
																<span style="margin-left: 7px;">��</span>
																<span style="margin-left: 7px;">��</span>
																<span style="margin-left: 7px;">��</span>
																<span style="margin-left: 7px;">Ϣ</span>
																</td>
																<td class="text_tablehead_b" align="right" width="140px">
																	�������˺�
																</td>
																<td>
																	<input name="po.payerNum" id="payerNum" type="text"
																		style="width: 180px;" title="�������˺�" maxlength="32"
																		onKeyPress="actkeyPress()" />
																</td>
																
																<td rowspan="9" width="2" class="text_tablehead_b" align="center" >
																<span style="margin-left: 7px;">��</span>
																<span style="margin-left: 7px;">��</span>
																<span style="margin-left: 7px;">��</span>
																<span style="margin-left: 7px;">��</span>
																<span style="margin-left: 7px;">Ϣ</span>
																</td>
																<td class="text_tablehead_b" align="right" width="140px">
																	�տ����˺�
																</td>
																<td>
																	<input name="po.receNum" id="receNum" type="text"
																		style="width: 180px;" title="�տ����˺�" maxlength="32"
																		onKeyPress="charPress()" />
																</td>
															</tr>
															
																<!-- add by zcx -->
															<tr>
															  
															<td class="text_tablehead_b" align="right" width="140px">�������˻����ͣ�</td>
															<td>
															<select  name="po.payAccountType" id="payAccountType" style="width:180px;" title="�������˻�����">
																<option value="AT01"  selected="selected">���ǿ�</option>
																 
																<option value="AT02">��ǿ�</option>
																</select>
															
															</td>
															<td class="text_tablehead_b" align="right">�տ����˻����ͣ�</td>
															<td>
															   <select  name="po.receAccountType" id="receAccountType" style="width:180px;" title="�տ����˻�����">
																<option value="AT01"  selected="selected">���ǿ�</option>
																 
																<option value="AT02">��ǿ�</option>
																</select>
															</td>
															</tr>
														
															
															<!--  the end add by zcx -->
															
															
															<tr>
																<td class="text_tablehead_b" align="right" width="140px">
																<!-- ����������---��  -->
																</td>
																<td>
																<!-- 	<input name="dbtrnm" id="fkrmc" type="text"
																		style="width: 180px;" title="����������" maxlength="60"
																		onKeyPress="charPress()" /> -->
																</td>
																<td class="text_tablehead_b" align="right" width="140px">
																	�տ�������
																</td>
																<td>
																	<input name="po.receName" id="receName" type="text"
																		style="width: 180px;" title="�տ�������" maxlength="60"
																		onKeyPress="charPress()" />
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" align="right" width="140px">
																	�����˵�ַ
																</td>
																<td>
																	<textarea name="po.address" id="address" 
																		rows="4" onKeyPress="actkeyPress()"  onkeyup="limitLength(value,70,'��ʾ��','address')"></textarea>
																</td>
																<td class="text_tablehead_b" align="right">
																	�տ��˵�ַ
																</td>
																<td>
																	<textarea name="po.receAddress" id="receAddress" 
																		rows="4" onKeyPress="actkeyPress()" onkeyup="limitLength(value,70,'��ʾ��','receAddress')" ></textarea>
																	
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" align="right" width="140px">
																	<!--  �����˿������к�---��-->
																</td>
																<td>
																	<!--<input name="dbtrissr" id="fkrkhhhh" type="text"
																		style="width: 180px;" title="�����˿������к�" maxlength="32"
																		onKeyPress="actkeyPress()" />-->
																</td>
																<td class="text_tablehead_b" align="right">
																	�տ��˿������к�
																</td>
																<td>
																	<input name="po.receOpenBankNum" id="receOpenBankNum" type="text"
																		style="width: 180px;" title="�տ��п������к�" maxlength="32"
																		onKeyPress="actkeyPress()" />
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" align="right" width="140px">
																	<!--�����������к�---��-->
																</td>
																<td>
																	<!--<input name="dbtrmmbid" id="fkqshhh" type="text"
																		style="width: 180px;" title="�����������к�" maxlength="100"
																		onKeyPress="actkeyPress()" />-->
																</td>
																<td class="text_tablehead_b" align="right">
																	<!--  �տ����������к�-->
																</td>
																<td>
																	<!--<input name="cdtrmmbid" id="skhqshhh" type="text"
																		style="width: 180px;" title="�տ����������к�" maxlength="70"
																		onKeyPress="actkeyPress()" />-->
																</td>
															</tr>
															<tr>
																
																<td class="text_tablehead_b" align="right" width="140px">
																	<!-- 	�������к�-->
																</td>
																<td>
																		<!-- <input name="dbtrbrchid" id="fkhhh" type="text"
																		style="width: 180px;" title="�������к�" maxlength="100"
																		onKeyPress="actkeyPress()" />-->
																</td>
																<td class="text_tablehead_b" align="right" width="140px">
																	�տ����к�
																</td>
																<td>
																	<input name="po.receBankNum" id="receBankNum" type="text"
																		style="width: 180px;" title="�տ����к�" maxlength="32"
																		onKeyPress="actkeyPress()" />
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" align="right">
																	<!--  ����������-->
																</td>
																<td>
																	<!-- <input name="" id="skhmc" type="text"
																		style="width: 180px;"  maxlength="60"
																		onKeyPress="actkeyPress()" />-->
																</td>
																<td class="text_tablehead_b" align="right">
																	�տ�������
																</td>
																<td>
																	<input name="po.receBankName" id="receBankName" type="text"
																		style="width: 180px;" title="�տ���������" maxlength="60"
																		onKeyPress="actkeyPress()" />
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" align="right">
																	<!--	������˿��������� -->
																</td>
																<td>
																<!-- 	<input name="" id="skrkhhmc" type="text"
																		style="width: 180px;"  maxlength="32"
																		onKeyPress="actkeyPress()" />-->
																</td>
																
																<td class="text_tablehead_b" align="right">
																	�տ��˿���������
																</td>
																<td>
																	<input name="po.receOpenBankName" id="receOpenBankName" type="text"
																		style="width: 180px;" title="�տ��˿���������" maxlength="32"
																		onKeyPress="actkeyPress()" />
																</td>
															</tr>
															<tr>	
															</tr>
																<tr>
																<td  rowspan="2"  width="2" class="text_tablehead_b" align="center">
																	
																	<span style="margin-left: 7px;">��</span>
																	<span style="margin-left: 7px;">��</span>
																	<span style="margin-left: 7px;">��</span>
																	<span style="margin-left: 7px;">Ϣ</span>
																</td>
																<td class="text_tablehead_b" align="right">
																	���ִ���
																</td>
																<td>
																	<input name="po.moneyClassCode" id="moneyClassCode" type="text"
																		style="width: 180px;" title="���ִ���"  value="CNY" readonly="readonly"
																		onKeyPress="actkeyPress()" />
																</td>
																<td class="text_tablehead_b" align="right" colspan="2">
																	�ܶ�
																</td>
																<td >
																	<input name="po.totalMoney" id="totalMoney" type="text"
																		style="width: 180px;" title="�ܶ�" maxlength="12"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																</td>
																
																</tr>
																<tr>
																	<td class="text_tablehead_b" align="right"  >
																		�����
																	</td>
																	<td colspan="4">
																		<input name="po.moneyNum" id="moneyNum" type="text"
																			style="width: 180px;" title="�����" maxlength="12"
																			onKeyPress="amountPress()"
																			onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																			onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																	</td>
																	
																</tr>
																<tr>	
															</tr>
															<tr>
																<td  rowspan="3"  width="2" class="text_tablehead_b" align="center">
																	
																	<span style="margin-left: 7px;">��</span>
																	<span style="margin-left: 7px;">��</span>
																	<span style="margin-left: 7px;">��</span>
																	<span style="margin-left: 7px;">Ϣ</span>
																</td>
															<!--	<td class="text_tablehead_b" align="right" >
																	���л�
																</td>
																<td colspan="4">
																	<select  name="selfaccount" id="bhh">
																		<option value="Y">
																			��
																		</option>
																		<option value="N">
																			��
																		</option>
																	</select>
																</td>-->
																
															<td class="text_tablehead_b" align="right">
																	���л�
																</td>
																<td>
																<select  name="po.payBankNum" id="payBankNum">
																		<option value="Y">
																			��
																		</option>
																		<option value="N">
																			��
																		</option>
																	</select>	</td>
																<td class="text_tablehead_b" align="right" colspan="2">
																	<!--��ע-->
																</td>
																<td>
																<!--<input name="po.receBankName" id="receBankName" type="text" style="width:180px;" title="�տ�������" maxlength="14"  onKeyPress="actkeyPress()"/>  --></td>
														 						 
															</tr>
															<tr>
															<td class="text_tablehead_b" align="right">
																	������
																</td>
																<td>
																	<input name="po.handingCharge" id="handingCharge" type="text"
																		style="width: 180px;" title="������" maxlength="12"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																</td>
																<td class="text_tablehead_b" align="right" colspan="2">
																	�ʵ��
																</td>
																<td>
																	<input name="po.postCharge" id="postCharge" type="text"
																		style="width: 180px;" title="�ʵ��" maxlength="12"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																</td>
															</tr>
															<tr>
															
															<td class="text_tablehead_b" align="right">
																	��ؼ���
																</td>
																<td>
																	<input name="po.otherPlaceCharge" id="otherPlaceCharge" type="text"
																		style="width: 180px;" title="������" maxlength="12"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																</td>
																<td class="text_tablehead_b" align="right" colspan="2">
																	֧�����
																</td>
																<td>
																	<input name="po.paymentnum" id="paymentnum" type="text"
																		style="width: 180px;" title="������" maxlength="12"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																</td>
															<!--  
																<td class="text_tablehead_b" align="right">
																	��ؼ���
																</td>
																<td colspan="2">
																	<input name="otherchange" id="ydjs" type="text"
																		style="width: 180px;" title="��ؼ���" maxlength="12"
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
																	
																	<span style="margin-left: 7px;">��</span>
																	<span style="margin-left: 7px;">��</span>
																	<span style="margin-left: 7px;">��</span>
																	<span style="margin-left: 7px;">Ϣ</span>
																</td>
																<td class="text_tablehead_b" align="right" >
																	����
																</td>
																<td colspan="4">
																	<textarea name="po.postscript" id="postscript" 
																		rows="4" cols="70" onKeyPress="charPress()" onkeyup="limitLength(value,135,'��ʾ��','fy')"></textarea>
																</td>

															</tr>
															
															<tr>
															<td   width="2" class="text_tablehead_b" align="center">
																	
																	<span style="margin-left: 7px;">��</span>
																	<span style="margin-left: 7px;">��</span>
																	<span style="margin-left: 7px;">��</span>
																	<span style="margin-left: 7px;">Ϣ</span>
																</td>
																<td class="text_tablehead_b" align="right" >
																	��ע
																</td>
																<td colspan="4">
																	<textarea name="po.remarkinfo" id="remarkinfo" 
																		rows="4" cols="70" onKeyPress="charPress()" onkeyup="limitLength(value,135,'��ʾ��','remarkinfo')"></textarea>
																</td>

															</tr>
															
															
															<tr></tr>
															<!-- 
															<tr>
															<td    width="2" class="text_tablehead_b" align="center">
																	
																	<span style="margin-left: 7px;">��</span>
																	<span style="margin-left: 7px;">��</span>
																	<span style="margin-left: 7px;">��</span>
																	<span style="margin-left: 7px;">Ϣ</span>
																</td>
															 <td align="left" colspan="6">
															
															 </td>
															 </tr>-->
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
