<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%
	String path = request.getContextPath();
%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
		<title></title>
		<link href="<%=path%>/css/page_color.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="<%=path %>/js/ybjs/helpUtil.js"></script>
		<script type="text/javascript" src="<%=path %>/js/common/check.js"></script>
	<script type="text/javascript">
	
		function commitForm(){
				//return document.forms[0].submit();
				
				var msg = "@";
				var purchspric = document.getElementById("purchspric");
				var buyamt = document.getElementById("buyamt");
				var charge = document.getElementById("charge");
				var remarkinfo = document.getElementById("remarkinfo");
				
				var senddrctpty = document.getElementById("senddrctpty");
				var sendindrctpty = document.getElementById("sendindrctpty");
				var recvdrctpty = document.getElementById("recvdrctpty");
				var recvindrctpty = document.getElementById("recvindrctpty");
				if(isNull(trim(purchspric.value))){
					msg += purchspric.title+"����Ϊ�գ�@";
				}
				if(isNull(trim(buyamt.value))){
					msg += buyamt.title+"����Ϊ�գ�@";
				}
				if(isNull(trim(charge.value))){
					msg += charge.title+"����Ϊ�գ�@";
				}
				if(isNull(trim(remarkinfo.value))){
					msg += remarkinfo.title+"����Ϊ�գ�@";
				}
				
				if(validatehh(trim(senddrctpty.value))){
					msg += senddrctpty.title+"������12λ���֣�@";
				}
				if(validatehh(trim(sendindrctpty.value))){
					msg += sendindrctpty.title+"������12λ���֣�@";
				}
				if(validatehh(trim(recvdrctpty.value))){
					msg += recvdrctpty.title+"������12λ���֣�@";
				}
				if(validatehh(trim(recvindrctpty.value))){
					msg += recvindrctpty.title+"������12λ���֣�@";
				}	
				document.getElementById("purchspric").value=rmoney(purchspric.value) ;
				var boo = msgSplit(msg);
				if(boo){
					document.forms[0].submit();
				} 
			}
		</script>
		
	</head>
	<body >
		<form method="post" action="<%=path%>/transfer/transferManage/pvpAction.do?method=updatePVP">
		  <input id="signval" type="hidden" value="sign0">
		  <input id="id" name="id" type="hidden" value="${pvpform.id}"/>
		   <input id="chnmsgid" name="chnmsgid" type="hidden"  value="${pvpform.chnmsgid}"/>
			<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				<tr>
					<td width="8" height="48" ></td>
					<td >
						<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
							<tr>
							<td  width="360" class="text_tablehead_b">
							<%-- 
								<td width="360" background="<%=path%>/image/content_table_bar_L.jpg">
								--%>
									<h5 align="left">���֧��ϵͳ&nbsp;->&nbsp;PVP��������&nbsp;->PVP���������޸�</h5>
								</td>
								<td  width="194" ></td>
								<td  width="270"  ></td>
					<%--
								<td width="194" background="<%=path%>/image/content_table_bar_L.jpg"></td>
								<td width="270" background="<%=path%>/image/content_table_bar_R.jpg"></td>
								 --%>
							</tr>
						</table>
					</td>
					<td width="8" ></td>
				</tr>
				<tr valign="top">
				<%-- 
					<td background="<%=path%>/image/content_table_line_L.jpg"></td>
					--%>
					<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);" ></td>
					<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);">
						<br />
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td width="10">
									&nbsp;
								</td>
								<td>
									<div align="center">
										<table border="0" cellspacing="0" cellpadding="0">
											<th class="text_tablehead_b" ><h4 align="center">PVP���������޸�</h4></th>
											<tr>
												<td>
													<fieldset style="width:700px;border:1px #CCCCCC solid; padding:3px;" align=center >
							  			  			<legend >������Ϣ</legend> 
													<table border="0" cellspacing="0" cellpadding="0">
														<tr>
															<td class="text_tablehead_b" align="right" width="180px">����ۣ�</td>
															<td><input name="purchspric" id="purchspric" value="${pvpform.purchspric}" type="text" style="width:180px;" maxlength="21" title="�����" onKeyPress="amountPress()"
															onkeyup="value=value.replace(/[^\d.,]/g,'')  "
															onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" /></td>
															 
															<td class="text_tablehead_b" align="right" width="180px">�����������</td>
															<td><input name="buyamt" id="buyamt" value="${pvpform.buyamt}" type="text" style="width:180px;" title="���������" maxlength="21" onKeyPress="numPress()" /></td>
															
														</tr>
													
														
														<tr>
															
															<td class="text_tablehead_b" align="right">���ҷ��ţ�</td>
															<td><input name="currency" id="currency" type="text" style="width:180px;" title="���ҷ���" value="RMB" readonly="readonly"   /> </td>
															
															<td class="text_tablehead_b" align="right">�����ѽ�</td>
															<td><input name="charge" id="charge" type="text" style="width:180px;" title="�����ѽ��" value="${pvpform.charge}" onKeyPress="amountPress()"
															onkeyup="value=value.replace(/[^\d.,]/g,'')  "
															onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';"/></td>
														</tr>
														<tr>
													 
															<td class="text_tablehead_b" align="right">��ע��</td>
																<td><textarea  name="remarkinfo" id="remarkinfo" style="width:180px" rows="4" title="��ע"  >${pvpform.remarkinfo}</textarea></td>
														</tr>
													</table>
													</fieldset>
													<fieldset style="width:700px;border:1px #CCCCCC solid; padding:3px;" align="center" >
							  			  			<legend >���������Ϣ</legend> 
													<table border="0" cellspacing="0" cellpadding="0">
													
														<tr>
														<td class="text_tablehead_b" align="right" style="width:180px;">�����������кţ�</td>
															<td><input name="senddrctpty" id="senddrctpty" value="${pvpform.senddrctpty}" type="text" style="width:180px;" title="�����������к�" maxlength="12" /></td>
														
															<td class="text_tablehead_b" align="right" style="width:180px;">�������кţ�</td>
															<td><input name="sendindrctpty" id="sendindrctpty" value="${pvpform.sendindrctpty}"  type="text" style="width:180px;" title="�������к�" maxlength="12" /></td>
															
														</tr>
														
													</table>
													</fieldset>
													<fieldset style="width:700px;border:1px #CCCCCC solid; padding:3px;" align="center" >
							  			  			<legend >���ջ�����Ϣ</legend> 
													<table border="0" cellspacing="0" cellpadding="0">
													
														<tr>
															<td class="text_tablehead_b" align="right" style="width:180px;">�տ��������кţ�</td>
															<td><input name="recvdrctpty" id="recvdrctpty" value="${pvpform.recvdrctpty}"  type="text" style="width:180px;" title="�տ��������к�" maxlength="12" /></td>
															<td class="text_tablehead_b" align="right" style="width:180px;">�տ����кţ�</td>
															<td><input name="recvindrctpty" id="recvindrctpty" value="${pvpform.recvindrctpty}" type="text" style="width:180px;" title="�տ����к�" maxlength="12"  /></td>
														</tr>
													
													</table>
													</fieldset>
													<fieldset style="width:700px;border:1px #CCCCCC solid; padding:3px;" align="center" >
							  			  		 
													<table border="0" cellspacing="0" cellpadding="0">
												 
													 			 
													</table>
												
											
										</table>
										<br />
										<span class="STYLE1">˵������ɫ*��ע��Ϊ������</span>
										<br />
										<br />
										<input name="addButton" type="button" style="cursor: pointer" class="button" value="�޸�" onclick="commitForm();" />
										&nbsp;
										<input name="backButton" style="cursor: pointer" type="button" class="button" value="��  ��" onclick="history.back();" />
										<br />
										<br />
									</div>
								</td>
							</tr>
						</table>
					</td>
					<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);" ></td>
					
					<%--
					<td background="<%=path%>/image/content_table_line_R.jpg"></td> --%>
				</tr>
			</table>
			
		</form>
	</body>
</html>
 