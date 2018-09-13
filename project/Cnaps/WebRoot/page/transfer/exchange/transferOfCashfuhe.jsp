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
			<!-- ��ֹ�ظ��ύ -->
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
										&nbsp;���֧��ϵͳ&nbsp;->&nbsp;���ҵ��&nbsp;->&nbsp;���ڿ��ۻ��
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
													�����ֽ��� ����
													
												</h4>
											</th>
											<tr>
												<td>
												
												<fieldset
														style="width: 700px; border: 1px #CCCCCC solid; padding: 3px;"
														align=center>
														<legend>
															��������Ϣ
														</legend>
														<br>
														<table border="0" cellspacing="0" cellpadding="0">
															<tr>
																<td class="text_tablehead_b" align="right" width="140px">
																	������֤���ţ�
																</td>
																<td>
																	<input name="appcertno" id="sgrzjh" type="text"
																		style="width: 180px;" maxlength="19" title="������֤����" value="87213511009" />
																</td>

																<td class="text_tablehead_b" align="right" width="140px">
																	֤�����й��ң�
																</td>
																<td>
																	<input name="certcountry" id="zjfxgj" type="text"
																		style="width: 180px;" title="֤�����й���" maxlength="3" value="101"/>
																</td>

															</tr>
															<tr>
																<td class="text_tablehead_b" align="right" width="140px">
																	֤�����ͣ�
																</td>
																<td>
																		
																		<select id="zjlx" style="width: 180px;" name="certtype" title="���֤">
																		<option selected="selected" value="BEPS">
																			���֤
																		</option>
																		
																	   </select>
																		
																		<span  class="STYLE1">*</span>
																		
																</td>

																<td class="text_tablehead_b" align="right" width="140px">
																	���������ƣ�
																</td>
																<td>
																	<input name="appnm" id="sqrmc" type="text" value="��ҵ��"
																		style="width: 180px;" title="����������" maxlength="60" />
																</td>

															</tr>
															<tr>
																<td class="text_tablehead_b" align="right" width="140px">
																	��������ϵ�绰��
																</td>
																<td>
																	<input name="appphone" id="sqrlxdh" type="text" value="88552455"
																		style="width: 180px;" maxlength="15" title="��������ϵ�绰" />
																</td>

																<td class="text_tablehead_b" align="right" width="140px">
																	֧����ţ�
																</td>
																<td>
																	<input name="paymentno" id="zfzh" type="text"
																		style="width: 180px;" maxlength="20" title="֧�����" value="0988221"/>
																</td>

															</tr>
															</table>
															<br/>
															</fieldset>
															
													<fieldset
														style="width: 700px; border: 1px #CCCCCC solid; padding: 3px;"
														align=center>
														<legend>
															���Ļ�����Ϣ
														</legend>
														<br>
														<table border="0" cellspacing="0" cellpadding="0">
															<tr>
															<td class="text_tablehead_b" align="right">
																	ϵͳ�ţ�
																</td>
																<td>
																	<select id="xth" style="width: 180px;" name="systemno" title="ϵͳ��">
																		<option selected="selected" value="BEPS">
																			С��
																		</option>
																		<option value="HVPS">
																			���
																		</option>
																	</select>
																	</td>
																	<td class="text_tablehead_b" align="right">
																	���ȼ���
																</td>
																<td>
																	<select style="width: 180px;" name="sttlmprty" id="yxj">
																		<option value="0">
																			һ��
																		</option>
																		<option value="1" selected="selected">
																			����
																		</option>
																		<option value="2">
																			�ؼ�
																		</option>
																	</select>
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" align="right" width="140px">
																	ҵ�����ͱ��룺
																</td>
																<td>
																	<select name="pmttp" id="ywlxbmval"
																		onChange="transferOfClient(this.value,'select_input');"
																		style="width: 180px;">

																		<option selected="selected" value="A108">
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
																</td>
																<td class="text_tablehead_b" align="right" width="140px">
																	ҵ��������룺
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
																	���ִ��룺
																</td>
																<td>
																	<input name="currency" id="bzdm" type="text"
																		style="width: 180px;" title="���ִ���"  value="CNY" readonly="readonly"
																		onKeyPress="actkeyPress()" />
																</td>
																<td class="text_tablehead_b" align="right">
																	����
																</td>
																<td>
																	<input name="ntryamt" id="hkje" type="text"
																		style="width: 180px;" title="�����" maxlength="12"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																</td>
															<tr>
																<td class="text_tablehead_b" align="right">
																	�����ѣ�
																</td>
																<td>
																	<input name="charge" id="sxf" type="text"
																		style="width: 180px;" title="������" maxlength="12"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																</td>
																<td class="text_tablehead_b" align="right">
																	�ʵ�ѣ�
																</td>
																<td>
																	<input name="postage" id="ydf" type="text"
																		style="width: 180px;" title="������" maxlength="12"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																</td>
															</tr>
															<tr>
																
																<td class="text_tablehead_b" align="right">
																	��ؼ��գ�
																</td>
																<td>
																	<input name="otherchange" id="ydjs" type="text"
																		style="width: 180px;" title="��ؼ���" maxlength="12"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																</td>
																<td class="text_tablehead_b" align="right">
																	�ܶ
																</td>
																<td>
																	<input name="allchange" id="ze" type="text"
																		style="width: 180px;" title="�ܶ�" maxlength="12"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																</td>
															</tr>

															

															<tr>
																<td class="text_tablehead_b" align="right">
																	���л���
																</td>
																<td>
																	<select style="width: 180px;" name="selfaccount" id="bhh">
																		<option selected="selected" value="Y">
																			��
																		</option>
																		<option value="N">
																			��
																		</option>
																	</select>
																</td>

																<td class="text_tablehead_b" align="right">
																	���ԣ�
																</td>
																<td>
																	<textarea name="remarkinfo" id="fy" style="width: 180px;"
																		rows="4" title="����"></textarea>
																</td>

															</tr>

														</table>
														<br/>
													</fieldset>
													
													<fieldset
														style="width: 700px; border: 1px #CCCCCC solid; padding: 3px;"
														align="center">
														<legend>
															��������Ϣ
														</legend>
															<br>
														<table border="0" cellspacing="0" cellpadding="0">
															<tr>
																<td class="text_tablehead_b" align="right" width="140px">
																	�������˺ţ�
																</td>
																<td>
																	<input name="dbtracctid" id="fkrzh" type="text" value="98230021"
																		style="width: 180px;" title="�������˺�" maxlength="32"
																		onKeyPress="actkeyPress()" />
																</td>
																<td class="text_tablehead_b" align="right" width="140px">
																	���������ƣ�
																</td>
																<td>
																	<input name="dbtrnm" id="fkrmc" type="text"
																		style="width: 180px;" title="����������" maxlength="60"
																		onKeyPress="charPress()" />
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" align="right" width="140px">
																	�����˵�ַ��
																</td>
																<td>
																	<input name="dbtraddr" id="fkrdz" type="text" value="�����к���������Ժ"
																		style="width: 180px;" title="�����˵�ַ" maxlength="100"
																		onKeyPress="actkeyPress()" />
																</td>
																<td class="text_tablehead_b" align="right" width="140px">
																	�����˿������кţ�
																</td>
																<td>
																	<input name="dbtrissr" id="fkrkhhhh" type="text" value="6008980313513"
																		style="width: 180px;" title="�����˿������к�" maxlength="32"
																		onKeyPress="actkeyPress()" />
																</td>
															</tr>
															
															<tr>
																<td class="text_tablehead_b" align="right" width="140px">
																	�����������кţ�
																</td>
																<td>
																	<input name="dbtrmmbid" id="fkqshhh" type="text" value="313452010871"
																		style="width: 180px;" title="�����������к�" maxlength="100"
																		onKeyPress="actkeyPress()" />
																</td>
																<td class="text_tablehead_b" align="right" width="140px">
																	�������кţ�
																</td>
																<td>
																	<input name="dbtrbrchid" id="fkhhh" type="text" value="313452010871"
																		style="width: 180px;" title="�������к�" maxlength="100"
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
															�տ�����Ϣ
														</legend>
														<br>
														<table border="0" cellspacing="0" cellpadding="0">
															<tr>
																<td class="text_tablehead_b" align="right" width="140px">
																	�տ����˺ţ�
																</td>
																<td>
																	<input name="cdtracctid" id="skrzh" type="text" value="920502355352"
																		style="width: 180px;" title="�տ����˺�" maxlength="32"
																		onKeyPress="charPress()" />
																</td>
																<td class="text_tablehead_b" align="right" width="140px">
																	�տ������ƣ�
																</td>
																<td>
																	<input name="cdtrnm" id="skrmc" type="text"
																		style="width: 180px;" title="�տ�������" maxlength="60"
																		onKeyPress="charPress()" />
																</td>
																
															</tr>
															<tr>
																
																<td class="text_tablehead_b" align="right">
																	�տ��˵�ַ��
																</td>
																<td>
																	<input name="cdtraddr" id="skrdz" type="text" value="�����к���������Ժ"
																		style="width: 180px;" title="�տ��˵�ַ" maxlength="70"
																		onKeyPress="actkeyPress()" />
																</td>
																<td class="text_tablehead_b" align="right">
																	�տ����������кţ�
																</td>
																<td>
																	<input name="cdtrmmbid" id="skhqshhh" type="text" value="313452060150"
																		style="width: 180px;" title="�տ����������к�" maxlength="70"
																		onKeyPress="actkeyPress()" />
																</td>
																
																
															</tr>
															<tr>
																<td class="text_tablehead_b" align="right" width="140px">
																	�տ����кţ�
																</td>
																<td>
																	<input name="cdtrbrchid" id="skhhh" type="text" value="145433123"
																		style="width: 180px;" title="�տ����к�" maxlength="32"
																		onKeyPress="actkeyPress()" />
																</td>
																<td class="text_tablehead_b" align="right">
																	�տ������ƣ�
																</td>
																<td>
																	<input name="cdtracctnm" id="skhmc" type="text" value="�ൺ����"
																		style="width: 180px;" title="�տ���������" maxlength="60"
																		onKeyPress="actkeyPress()" />
																</td>
																
															</tr>
															<tr>
																
																<td class="text_tablehead_b" align="right">
																	�տ��п������кţ�
																</td>
																<td>
																	<input name="cdtrissr" id="skhkhhhh" type="text" value="313452010986"
																		style="width: 180px;" title="�տ��п������к�" maxlength="32"
																		onKeyPress="actkeyPress()" />
																</td>
																<td class="text_tablehead_b" align="right">
																	�տ��˿��������ƣ�
																</td>
																<td>
																	<input name="cdtrissrnm" id="skrkhhmc" type="text" value="�ൺ����"
																		style="width: 180px;" title="�տ��˿������к�" maxlength="32"
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
															������д��
														</legend>
															<br>
														<table border="0" cellspacing="0" cellpadding="0">

															<!-- ��ҵ�����ͱ���ѡ��A109(ί���տ�(����))��ʱ��ʾdiv -->
															<tr id="A1091" style="display: none;">

																<td class="text_tablehead_b" align="right" width="140px">
																	Ʊ�����ڣ�
																</td>
																<td>
																	<input name="collectiondate" id="pjrq109" class="Wdate" type="text"
																		readonly="readonly" title="Ʊ������" style="width: 180px;"
																		class="Wdate" onclick="WdatePicker()" />
																</td>
																<td class="text_tablehead_b" align="right">
																	Ʊ�����ࣺ
																</td>
																<td>
																	<select style="width: 180px;" title="Ʊ������" id="pjzl109" name="collectiontype">
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
																</td>
															</tr>
															<tr id="A1092" style="display: none;">
																<td class="text_tablehead_b" align="right">
																	Ʊ�ݺ��룺
																</td>
																<td>
																	<input name="collectionno" id="pjhm109" type="text"
																		style="width: 180px;" title="Ʊ�ݺ���" maxlength="32"
																		onKeyPress="actkeyPress()" />
																</td>
															</tr>


															<!-- ��ҵ�����ͱ���ѡ��A110(-���ճи������أ�)����ʾDIV -->
															<tr id="A1101" style="display: none;">
																<td class="text_tablehead_b" align="right" width="140px">
																	Ʊ�����ڣ�
																</td>
																<td>
																	<input id="pjrq110" type="text" style="width: 180px;" name="honourdate"
																		class="Wdate" title="Ʊ������" maxlength="16"
																		onclick="WdatePicker()" />
																</td>
																<td class="text_tablehead_b" align="right" width="140px">
																	Ʊ�ݺ��룺
																</td>
																<td>
																	<input id="pjhm110" type="text" style="width: 180px;" name="honourno"
																		title="Ʊ�ݺ���" maxlength="32" onKeyPress="charPress()" />
																</td>
															</tr>

															<tr id="A1102" style="display: none;">
																<td class="text_tablehead_b" align="right">
																	�⳥���
																</td>
																<td>
																	<input name="damages" id="pcjje110" type="text"
																		style="width: 180px;" title="�⳥����"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																</td>

																<td class="text_tablehead_b" align="right">
																	�ܸ����
																</td>
																<td>
																	<input id="jfjje110" type="text" style="width: 180px;" name="refusechange"
																		title="�ܸ�����" onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																</td>

															</tr>

															<!-- ��ҵ�����ͱ���ѡ��A201(֧Ʊ)��ҵ���������ѡ��03401(֧Ʊ)ʱ��ʾdiv -->


															<tr id="A2011" style="display: none;">
																<td class="text_tablehead_b" align="right" width="140px">
																	Ʊ�����ڣ�
																</td>
																<td>
																	<input name="chkdate" id="pjrq201" type="text"
																		style="width: 180px;"  title="Ʊ������"
																		onclick="WdatePicker()" />
																</td>
																<td class="text_tablehead_b" align="right" width="140px">
																	��Ʊ�����ƣ�
																</td>
																<td>
																	<input name="chknm" id="cprmc201" type="text" style="width: 180px;"
																		title="��Ʊ������" onKeyPress="actkeyPress()"
																		maxlength="60" />
																</td>
															</tr>

															<tr id="A2012" style="display: none;">
																<td class="text_tablehead_b" align="right">
																	Ʊ�ݽ�
																</td>
																<td>
																	<input name="chkamt" id="pjje201" type="text"
																		style="width: 180px;" title="Ʊ�ݽ��"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																</td>

																<td class="text_tablehead_b" align="right">
																	�Ƽۣ�
																</td>
																<td>
																	<input name="chkprice" id="pj201" type="text"
																		style="width: 180px;" title="�Ƽ�"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																</td>

															</tr>
															<tr id="A2013" style="display: none;">
																<td class="text_tablehead_b" align="right">
																	Ʊ��������
																</td>
																<td>
																	<input name="chkCount" id="pjzs201" type="text"
																		style="width: 180px;" title="Ʊ������" maxlength="4" />
																</td>
															</tr>


															<!-- ��ҵ������ҵ������ΪA301-(�ɷ�ҵ��)��ʱ��ʾdiv -->

															<tr id="A3011" style="display: none;">

																<td class="text_tablehead_b" align="right" width="140px">
																	�շѵ�λ��ˮ�ţ�
																</td>
																<td>
																	<input name="jfmsgid" id="sfdwlsh301" type="text"
																		style="width: 180px;" title="�շѵ�λ��ˮ��"
																		onKeyPress="actkeyPress()" maxlength="20" />
																</td>

																<td class="text_tablehead_b" align="right" width="140px">
																	�����ڼ䣺
																</td>
																<td>
																	<input name="jfdate" id="ssqj301" type="text"
																		style="width: 180px;" maxlength="16" title="�����ڼ�" />
																</td>
															</tr>
															<tr id="A3012" style="display: none;">
																<td class="text_tablehead_b" align="right" width="140px">
																	�ɷ����ͣ�
																</td>
																<td>
																	<select name="jftype" style="width: 180px;" id="jflx301">
																		<option value="TP00" selected="selected">
																			�ֽ�
																		</option>

																	</select>
																</td>

																<td class="text_tablehead_b" align="right">
																	�շѸ��ԣ�
																</td>
																<td>
																	<textarea name="jfremarkinfo" id="sfyy301" type="text" rows="4"
																		style="width: 180px;" title="�շѸ���"></textarea>
																</td>
															</tr>


															<!-- ��ҵ������ A104-�����ʽ���ǻ���  ��ʾDIV-->

															<tr id="A1041" style="display: none;">

																<td class="text_tablehead_b" align="right" width="140px">
																	��ϸ���ܽ�
																</td>
																<td>
																	<input name="gkallchange" id="mxhzje104" type="text" style="width: 180px;"
																		title="��ϸ���ܽ��" onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																</td>

																<td class="text_tablehead_b" align="right" width="140px">
																	�ϱ�������룺
																</td>
																<td>
																	<input name="gksendcode" id="sbgkdm104" type="text"
																		style="width: 180px;" title="�ϱ��������" maxlength="10" />
																</td>
															</tr>

															<tr id="A1042" style="display: none;">

																<td class="text_tablehead_b" align="right" width="140px">
																	���չ�����룺
																</td>
																<td>
																	<input name="gkreceivecode" id="jsgkdm104" type="text" style="width: 180px;"
																		title="���չ������" maxlength="10" />
																</td>

																<td class="text_tablehead_b" align="right" width="140px">
																	�������ڣ�
																</td>
																<td>
																	<input name="gktabledate" id="bbrq104" type="text"
																		style="width: 180px;" class="Wdate" title="��������"
																		onclick="WdatePicker()" />
																</td>
															</tr>

															<tr id="A1043" style="display: none;">

																<td class="text_tablehead_b" align="right" width="140px">
																	������ţ�
																</td>
																<td>
																	<input name="gktableid" id="bbxh104" type="text" style="width: 180px;"
																		title="�������" onKeyPress="actkeyPress()" maxlength="10" />
																</td>

																<td class="text_tablehead_b" align="right" width="140px">
																	Ԥ�㼶�Σ�
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
																</td>
															</tr>

															<tr id="A1044" style="display: none;">
																<td class="text_tablehead_b" align="right" width="140px">
																	�����ڱ�־��
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
																</td>

																<td class="text_tablehead_b" align="right" width="140px">
																	Ԥ�����ࣺ
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
																</td>
															</tr>

															<tr id="A1045" style="display: none;">
																<td class="text_tablehead_b" align="right" width="140px">
																	��ϸ������
																</td>
																<td>
																	<input name="gkcount" id="listnum1" type="text"
																		style="width: 180px;" value="1" />
																</td>

																<td class="text_tablehead_b" align="right" width="140px">
																	��ϸ�б�
																</td>
																<td class="text_tablehead_b" align="right" width="140px">
																	<input type=button value="���" onclick="AddRow();" />
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
																					���ջ��ش������
																				</td>
																				<td class="text_tablehead_b" align="right" width="80px">
																					Ԥ���Ŀ����
																				</td>
																				<td class="text_tablehead_b" align="right" width="80px">
																					������
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
																	<span class="STYLE1">û�и�����д��</span>
																</td>
															</tr>

														</table>
														<br/>
													</fieldset>
														
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
