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
				var temp = document.getElementById('ywlxbmval').value;
				transferOfClient(temp,'select_input');
				
			}
			function commitForm(){
			 /* if(VForm.Validate()){
			  
			  }*/
				var msg = validate();
				
				var boo = msgSplit(msg);
				if(boo){
				// document.getElementById("hvps11109").value=rmoney(document.getElementById("hvps11109").value) ;
				//document.getElementById("A10051").value=rmoney(document.getElementById("A10051").value) ;
					document.forms[0].submit();
				}
			}
			
			
		</script>
	</head>
	<body onload="selectLoad();">
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
												 ��ѯ�鷢��
													
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
																	��ѯ���к�
																</td>
																<td>
																	<input type="text" name="" value=""/>
																</td>
																<td class="text_tablehead_b" align="right" colspan="2">
																	�鸴���к�
																</td>
																<td>
																	<input type="text" name="" value=""/>
																</td>
																
															</tr>
															
															<tr>
																
																
																<td class="text_tablehead_b" align="right">
																	ҵ�����ͱ���
																</td>
																<td>
																	<select name="pmttp" id="ywlxbmval"
																		onChange="transferOfClient(this.value,'select_input');">

																		<option value="A108">
																			�ֽ���
																		</option>
																		<option value="A109">
																			ί���տ�(����)
																		</option>
																		<option value="A110">
																			���ճи�(����)
																		</option>
																		
																		<option value="A101">
																			�������ʽ�㻮
																		</option>
																		<option value="A102">
																			������
																		</option>
																		<option value="A104">
																			�����ʽ���ǻ���
																		</option>
																		<option value="A301">
																			�ɷ�ҵ��
																		</option>
																	</select>
																	<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" align="right"  colspan="2">
																	ҵ���������
																</td>
																<td>
																	<select name="pmtkd" id="select_input"
																		onchange="isDisplayToInline(this.value);">
																	</select>
																	<span  class="STYLE1">*</span>
																</td>
															</tr>
															<tr>	
															</tr>
																<tr>
																<td  rowspan="2"  width="2" class="text_tablehead_b" align="center">
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
																
																		<select  name="certtype" id="zjlx">
																		<option value="01">
																			���֤
																		</option>
																	
																	</select>
																	<span  class="STYLE1">*</span>
																</td>
															
																<td class="text_tablehead_b" align="right"  colspan="2">
																	������֤����
																</td>
																<td >
																	<input name="appcertno" id="sgrzjh" type="text" size="19"
																		maxlength="19" title="������֤����" />
																		<span name="validate" dataName="appcertno" dataType="Empty" msg="������֤���Ų���Ϊ�գ�" class="STYLE1">*</span>
																</td>
															</tr>
																<tr>
																	
																<td class="text_tablehead_b" align="right" >
																	֤�����й���
																</td>
																<td >
																	<input name="certcountry" id="zjfxgj" type="text"
																		 title="֤�����й���" maxlength="3" />
																		 <span  class="STYLE1">*</span>
															
																</td>

																<td class="text_tablehead_b" align="right"  colspan="2">
																	��������ϵ�绰
																</td>
																<td>
																	<input name="appphone" id="sqrlxdh" type="text"
																		 maxlength="15" title="��������ϵ�绰" />
																		 <span  class="STYLE1">*</span>
																</td>
																
																</tr>
														
															<tr>	
															</tr>
															<tr>
																<td rowspan="8" width="2" class="text_tablehead_b" align="center" >
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
																	<input name="dbtracctid" id="fkrzh" type="text"
																		style="width: 180px;" title="�������˺�" maxlength="32"
																		onKeyPress="actkeyPress()" />
																		 <span  class="STYLE1">*</span>
																</td>
																<td rowspan="8" width="2" class="text_tablehead_b" align="center" >
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
																	<input name="cdtracctid" id="skrzh" type="text"
																		style="width: 180px;" title="�տ����˺�" maxlength="32"
																		onKeyPress="charPress()" />
																		<span  class="STYLE1">*</span>
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" align="right" width="140px">
																	����������
																</td>
																<td>
																	<input name="dbtrnm" id="fkrmc" type="text"
																		style="width: 180px;" title="����������" maxlength="60"
																		onKeyPress="charPress()" />
																		<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" align="right" width="140px">
																	�տ�������
																</td>
																<td>
																	<input name="cdtrnm" id="skrmc" type="text"
																		style="width: 180px;" title="�տ�������" maxlength="60"
																		onKeyPress="charPress()" />
																		<span  class="STYLE1">*</span>
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" align="right" width="140px">
																	�����˵�ַ
																</td>
																<td>
																	<textarea name="dbtraddr" id="fkrdz" 
																		rows="4" onKeyPress="actkeyPress()"  onkeyup="limitLength(value,70,'��ʾ��','fkrdz')"></textarea>
																
																</td>
																<td class="text_tablehead_b" align="right">
																	�տ��˵�ַ
																</td>
																<td>
																	<textarea name="cdtraddr" id="skrdz" 
																		rows="4" onKeyPress="actkeyPress()" onkeyup="limitLength(value,70,'��ʾ��','skrdz')" ></textarea>
																	
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" align="right" width="140px">
																	�����˿������к�
																</td>
																<td>
																	<input name="dbtrissr" id="fkrkhhhh" type="text"
																		style="width: 180px;" title="�����˿������к�" maxlength="32"
																		onKeyPress="actkeyPress()" />
																		<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" align="right">
																	�տ��п������к�
																</td>
																<td>
																	<input name="cdtrissr" id="skhkhhhh" type="text"
																		style="width: 180px;" title="�տ��п������к�" maxlength="32"
																		onKeyPress="actkeyPress()" />
																		<span  class="STYLE1">*</span>
																</td>
															</tr>
															
															<tr>
																<td class="text_tablehead_b" align="right">
																	�����˿���������
																</td>
																<td>
																	<input name="" id="skrkhhmc" type="text" title="�����˿���������"
																		style="width: 180px;"  maxlength="32"
																		onKeyPress="actkeyPress()" />
																		<span  class="STYLE1">*</span>
																</td>
																
																<td class="text_tablehead_b" align="right">
																	�տ��˿���������
																</td>
																<td>
																	<input name="cdtrissrnm" id="skrkhhmc" type="text"
																		style="width: 180px;" title="�տ��˿������к�" maxlength="32"
																		onKeyPress="actkeyPress()" />
																		<span  class="STYLE1">*</span>
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" align="right" width="140px">
																	�����������к�
																</td>
																<td>
																	<input name="dbtrmmbid" id="fkqshhh" type="text"
																		style="width: 180px;" title="�����������к�" maxlength="100"
																		onKeyPress="actkeyPress()" />
																		<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" align="right">
																	�տ����������к�
																</td>
																<td>
																	<input name="cdtrmmbid" id="skhqshhh" type="text"
																		style="width: 180px;" title="�տ����������к�" maxlength="70"
																		onKeyPress="actkeyPress()" />
																		<span  class="STYLE1">*</span>
																</td>
															</tr>
															<tr>
																
																<td class="text_tablehead_b" align="right" width="140px">
																	�������к�
																</td>
																<td>
																	<input name="dbtrbrchid" id="fkhhh" type="text"
																		style="width: 180px;" title="�������к�" maxlength="100"
																		onKeyPress="actkeyPress()" />
																		<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" align="right" width="140px">
																	�տ����к�
																</td>
																<td>
																	<input name="cdtrbrchid" id="skhhh" type="text"
																		style="width: 180px;" title="�տ����к�" maxlength="32"
																		onKeyPress="actkeyPress()" />
																		<span  class="STYLE1">*</span>
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" align="right">
																	����������
																</td>
																<td>
																	<input name="" id="skhmc" type="text" title="����������"
																		style="width: 180px;"  maxlength="60"
																		onKeyPress="actkeyPress()" />
																		<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" align="right">
																	�տ�������
																</td>
																<td>
																	<input name="cdtracctnm" id="skhmc" type="text"
																		style="width: 180px;" title="�տ���������" maxlength="60"
																		onKeyPress="actkeyPress()" />
																		<span  class="STYLE1">*</span>
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
																	<input name="currency" id="bzdm" type="text"
																		style="width: 180px;" title="���ִ���"  value="CNY" readonly="readonly"
																		onKeyPress="actkeyPress()" />
																</td>
																<td class="text_tablehead_b" align="right" colspan="2">
																	�ܶ�
																</td>
																<td >
																	<input name="allchange" id="ze" type="text"
																		style="width: 180px;" title="�ܶ�" maxlength="12"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																<span  class="STYLE1">*</span>
																</td>
																
																</tr>
																<tr>
																	<td class="text_tablehead_b" align="right"  >
																		�����
																	</td>
																	<td colspan="4">
																		<input name="ntryamt" id="hkje" type="text"
																			style="width: 180px;" title="�����" maxlength="12"
																			onKeyPress="amountPress()"
																			onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																			onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																	<span  class="STYLE1">*</span>
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
																<td class="text_tablehead_b" align="right" >
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
																	<span  class="STYLE1">*</span>
																</td>
																
															</tr>
															<tr>
															<td class="text_tablehead_b" align="right">
																	������
																</td>
																<td>
																	<input name="charge" id="sxf" type="text"
																		style="width: 180px;" title="������" maxlength="12"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" align="right" colspan="2">
																	�ʵ��
																</td>
																<td>
																	<input name="postage" id="ydf" type="text"
																		style="width: 180px;" title="�ʵ��" maxlength="12"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																<span  class="STYLE1">*</span>
																</td>
															</tr>
															<tr>
																
																<td class="text_tablehead_b" align="right">
																	��ؼ���
																</td>
																<td colspan="4">
																	<input name="otherchange" id="ydjs" type="text"
																		style="width: 180px;" title="��ؼ���" maxlength="12"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																<span  class="STYLE1">*</span>
																</td>
																
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
																	<textarea name="remarkinfo" id="fy" 
																		rows="4" cols="70" onKeyPress="charPress()" onkeyup="limitLength(value,135,'��ʾ��','fy')"></textarea>
																</td>

															</tr>
															<tr></tr>
															
															<tr>
															<td    width="2" class="text_tablehead_b" align="center">
																	
																	<span style="margin-left: 7px;">��</span>
																	<span style="margin-left: 7px;">��</span>
																	<span style="margin-left: 7px;">��</span>
																	<span style="margin-left: 7px;">Ϣ</span>
																</td>
															 <td align="left" colspan="6">
															<table border="1" cellspacing="0" cellpadding="0" bordercolor="#BDD#F0">

															<!-- ��ҵ�����ͱ���ѡ��A109(ί���տ�(����))��ʱ��ʾdiv -->
															<tr id="A1091" style="display: none;">

																<td class="text_tablehead_b" align="right" width="140px">
																	Ʊ������
																</td>
																<td>
																	<input name="collectiondate" id="pjrq109" class="Wdate" type="text"
																		readonly="readonly" title="Ʊ������" style="width: 180px;"
																		class="Wdate" onclick="WdatePicker()" />
																		<span  class="STYLE1">*</span>
																</td>
																
																<td class="text_tablehead_b" align="right" style="width: 180px;" colspan="2">
																	Ʊ������
																</td>
															
																<td>
																	<select  title="Ʊ������" id="pjzl109" name="collectiontype" style="width: 180px;">
																		<option value="TP00">
																			���гжһ�Ʊ
																		</option>
																		<option value="TP01">
																			���ڴ浥
																		</option>
																		<option value="TP02">
																			ƾ֤ʽ��ծ
																		</option>
																		<option value="TP03">
																			��ػ��ڴ���
																		</option>
																		<option value="TP04">
																			����
																		</option>
																	</select>
																	<span  class="STYLE1">*</span>
																</td>
															</tr>
															<tr id="A1092" style="display: none;">
																<td class="text_tablehead_b" align="right">
																	Ʊ�ݺ���
																</td>
																<td>
																	<input name="collectionno" id="pjhm109" type="text"
																		style="width: 140px;" title="Ʊ�ݺ���" maxlength="32"
																		onKeyPress="actkeyPress()" />
																		<span  class="STYLE1">*</span>
																</td>
																<td colspan="3">&nbsp;</td>
															</tr>


															<!-- ��ҵ�����ͱ���ѡ��A110(-���ճи������أ�)����ʾDIV -->
															<tr id="A1101" style="display: none;">
																<td class="text_tablehead_b" align="right" width="140px">
																	Ʊ������
																</td>
																<td>
																	<input id="pjrq110" type="text" style="width: 180px;" name="honourdate"
																		class="Wdate" title="Ʊ������" maxlength="16"
																		onclick="WdatePicker()" />
																		<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" align="right" width="180px">
																	Ʊ�ݺ���
																</td>
																<td>
																	<input id="pjhm110" type="text" style="width: 180px;" name="honourno"
																		title="Ʊ�ݺ���" maxlength="32" onKeyPress="charPress()" />
																		<span  class="STYLE1">*</span>
																</td>
															</tr>

															<tr id="A1102" style="display: none;">
																<td class="text_tablehead_b" align="right" width="180px">
																	�⳥����
																</td>
																<td>
																	<input name="damages" id="pcjje110" type="text"
																		style="width: 180px;" title="�⳥����"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																<span  class="STYLE1">*</span>
																</td>

																<td class="text_tablehead_b" align="right">
																	�ܸ�����
																</td>
																<td>
																	<input id="jfjje110" type="text" style="width: 180px;" name="refusechange"
																		title="�ܸ�����" onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																<span  class="STYLE1">*</span>
																</td>

															</tr>

															<!-- ��ҵ�����ͱ���ѡ��A201(֧Ʊ)��ҵ���������ѡ��03401(֧Ʊ)ʱ��ʾdiv -->


															<tr id="A2011" style="display: none;">
																<td class="text_tablehead_b" align="right" width="140px">
																	Ʊ������
																</td>
																<td>
																	<input name="chkdate" id="pjrq201" type="text"
																		style="width: 180px;"  title="Ʊ������"
																		onclick="WdatePicker()" />
																		<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" align="right" width="140px">
																	��Ʊ������
																</td>
																<td>
																	<input name="chknm" id="cprmc201" type="text" style="width: 180px;"
																		title="��Ʊ������" onKeyPress="actkeyPress()"
																		maxlength="60" />
																		<span  class="STYLE1">*</span>
																</td>
															</tr>

															<tr id="A2012" style="display: none;">
																<td class="text_tablehead_b" align="right">
																	Ʊ�ݽ��
																</td>
																<td>
																	<input name="chkamt" id="pjje201" type="text"
																		style="width: 180px;" title="Ʊ�ݽ��"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																<span  class="STYLE1">*</span>
																</td>

																<td class="text_tablehead_b" align="right">
																	�Ƽ�
																</td>
																<td>
																	<input name="chkprice" id="pj201" type="text"
																		style="width: 180px;" title="�Ƽ�"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																<span  class="STYLE1">*</span>
																</td>

															</tr>
															<tr id="A2013" style="display: none;">
																<td class="text_tablehead_b" align="right">
																	Ʊ������
																</td>
																<td>
																	<input name="chkCount" id="pjzs201" type="text"
																		style="width: 180px;" title="Ʊ������" maxlength="4" />
															<span  class="STYLE1">*</span>
																</td>
															</tr>


															<!-- ��ҵ������ҵ������ΪA301-(�ɷ�ҵ��)��ʱ��ʾdiv -->

															<tr id="A3011" style="display: none;">

																<td class="text_tablehead_b" align="right" width="140px">
																	�շѵ�λ��ˮ��
																</td>
																<td>
																	<input name="jfmsgid" id="sfdwlsh301" type="text"
																		style="width: 180px;" title="�շѵ�λ��ˮ��"
																		onKeyPress="actkeyPress()" maxlength="20" />
																<span  class="STYLE1">*</span>
																</td>

																<td class="text_tablehead_b" align="right" width="180px">
																	�����ڼ�
																</td>
																<td>
																	<input name="jfdate" id="ssqj301" type="text"
																		style="width: 180px;" maxlength="16" title="�����ڼ�" />
																<span  class="STYLE1">*</span>
																</td>
															</tr>
															<tr id="A3012" style="display: none;">
																<td class="text_tablehead_b" align="right" width="140px">
																	�ɷ�����
																</td>
																<td>
																	<select name="jftype" style="width: 180px;" id="jflx301">
																		<option value="TP00" selected="selected">
																			�ֽ�
																		</option>

																	</select>
																	<span  class="STYLE1">*</span>
																</td>

																<td class="text_tablehead_b" align="right"  style="width: 180px;">
																	�շѸ���
																</td>
																<td>
																	<textarea name="jfremarkinfo" id="sfyy301" type="text" rows="4"
																		style="width: 180px;" title="�շѸ���"></textarea>
																</td>
															</tr>


															<!-- ��ҵ������ A104-�����ʽ���ǻ���  ��ʾDIV-->

															<tr id="A1041" style="display: none;">

																<td class="text_tablehead_b" align="right" width="140px">
																	��ϸ���ܽ��
																</td>
																<td>
																	<input name="gkallchange" id="mxhzje104" type="text" style="width: 180px;"
																		title="��ϸ���ܽ��" onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																
																<span  class="STYLE1">*</span>
																</td>

																<td class="text_tablehead_b" align="right" width="180px">
																	�ϱ��������
																</td>
																<td>
																	<input name="gksendcode" id="sbgkdm104" type="text"
																		style="width: 180px;" title="�ϱ��������" maxlength="10" />
																<span  class="STYLE1">*</span>
																</td>
															</tr>

															<tr id="A1042" style="display: none;">

																<td class="text_tablehead_b" align="right" width="140px">
																	���չ������
																</td>
																<td>
																	<input name="gkreceivecode" id="jsgkdm104" type="text" style="width: 180px;"
																		title="���չ������" maxlength="10" />
																<span  class="STYLE1">*</span>
																</td>

																<td class="text_tablehead_b" align="right" width="180px">
																	��������
																</td>
																<td>
																	<input name="gktabledate" id="bbrq104" type="text"
																		style="width: 180px;" class="Wdate" title="��������"
																		onclick="WdatePicker()" />
																<span  class="STYLE1">*</span>
																</td>
															</tr>

															<tr id="A1043" style="display: none;">

																<td class="text_tablehead_b" align="right" width="140px">
																	�������
																</td>
																<td>
																	<input name="gktableid" id="bbxh104" type="text" style="width: 180px;"
																		title="�������" onKeyPress="actkeyPress()" maxlength="10" />
																<span  class="STYLE1">*</span>
																</td>

																<td class="text_tablehead_b" align="right" width="180px">
																	Ԥ�㼶��
																</td>
																<td>
																	<select name="gkbudgetlevel" id="ysjb104" style="width: 180px;">
																		<option value="BL00">
																			����
																		</option>
																		<option value="BL01">
																			ʡ��
																		</option>
																	</select>
																<span  class="STYLE1">*</span>
																</td>
															</tr>

															<tr id="A1044" style="display: none;">
																<td class="text_tablehead_b" align="right" width="140px">
																	�����ڱ�־
																</td>
																<td>
																	<select name="gkadjustsign" style="width: 180px;" id="tzqbz104">
																		<option value="ID00">
																			����
																		</option>
																		<option value="ID01">
																			������
																		</option>
																	</select>
																<span  class="STYLE1">*</span>
																</td>

																<td class="text_tablehead_b" align="right" width="180px">
																	Ԥ������
																</td>
																<td>
																	<select name="gkbudgettype" style="width: 180px;" id="yszl104">
																		<option value="BT00">
																			Ԥ����
																		</option>
																		<option value="BT01">
																			Ԥ����
																		</option>
																	</select>
																<span  class="STYLE1">*</span>
																</td>
															</tr>

															<tr id="A1045" style="display: none;">
																<td class="text_tablehead_b" align="right" width="140px">
																	��ϸ����
																</td>
																<td>
																	<input name="gkcount" id="listnum1" type="text"
																		style="width: 180px;" value="1" />
																<span  class="STYLE1">*</span>
																</td>

																<td class="text_tablehead_b" align="right" width="180px">
																	��ϸ�б�
																</td>
																<td class="text_tablehead_b" align="right" width="140px">
																	<input type=button value="���" onclick="AddRow();" />
																<span  class="STYLE1">*</span>
																</td>
															</tr>


															<tr id="A1046" style="display: none;">
																<td colspan="4" >
																	<div>
																		<table id="mytable" border="1" cellpadding="0"
																			cellspacing="0" bordercolor="#BDD#F0"
																			style="text-align: center; vertical-align: top">

																			<tr id="gr1">
																				<td class="text_tablehead_b"   width="250px">
																					���ջ��ش������&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																				</td>
																				<td class="text_tablehead_b"  width="250px">
																					Ԥ���Ŀ����&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																				</td>
																				<td class="text_tablehead_b"  width="250px" colspan="2">
																					������&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																				</td>

																			</tr>
																			<tr>
																			
																				<td>
																					<select name="collcode">
																						<option value="1111111111">
																							��˰
																						</option>
																						<option value="2222222222">
																							��˰
																						</option>
																						<option value="3333333333">
																							����
																						</option>
																						<option value="4444444444">
																							����
																						</option>
																						<option value="5555555555">
																							����
																						</option>
																					</select>
																				</td>
																				

																				<td>
																					<input type="text" name="amt" id="amt" value=""
																						onKeyPress="amountPress()"
																						onkeyup="value=value.replace(/[^\d.]/g,'')" />
																				</td>
																				
																				<td >
																				<input type="text" name="amt" id="amt" value=""/>
																				</td>
																				<td>&nbsp;</td>
																			</tr>

																		</table>
																	</div>
																</td>
															</tr>
															<tr id="A0000" style="display: none;">
																<td colspan="4" width="700px" align="center">
																	<span class="STYLE1">û�и�����д��</span>
																</td>
															</tr>
															<tr></tr>
														</table>
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
