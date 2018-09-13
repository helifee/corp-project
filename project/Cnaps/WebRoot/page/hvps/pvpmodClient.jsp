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
					msg += purchspric.title+"不能为空！@";
				}
				if(isNull(trim(buyamt.value))){
					msg += buyamt.title+"不能为空！@";
				}
				if(isNull(trim(charge.value))){
					msg += charge.title+"不能为空！@";
				}
				if(isNull(trim(remarkinfo.value))){
					msg += remarkinfo.title+"不能为空！@";
				}
				
				if(validatehh(trim(senddrctpty.value))){
					msg += senddrctpty.title+"必须是12位数字！@";
				}
				if(validatehh(trim(sendindrctpty.value))){
					msg += sendindrctpty.title+"必须是12位数字！@";
				}
				if(validatehh(trim(recvdrctpty.value))){
					msg += recvdrctpty.title+"必须是12位数字！@";
				}
				if(validatehh(trim(recvindrctpty.value))){
					msg += recvindrctpty.title+"必须是12位数字！@";
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
									<h5 align="left">大额支付系统&nbsp;->&nbsp;PVP结算申请&nbsp;->PVP结算申请修改</h5>
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
											<th class="text_tablehead_b" ><h4 align="center">PVP结算申请修改</h4></th>
											<tr>
												<td>
													<fieldset style="width:700px;border:1px #CCCCCC solid; padding:3px;" align=center >
							  			  			<legend >交易信息</legend> 
													<table border="0" cellspacing="0" cellpadding="0">
														<tr>
															<td class="text_tablehead_b" align="right" width="180px">买入价：</td>
															<td><input name="purchspric" id="purchspric" value="${pvpform.purchspric}" type="text" style="width:180px;" maxlength="21" title="买入价" onKeyPress="amountPress()"
															onkeyup="value=value.replace(/[^\d.,]/g,'')  "
															onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" /></td>
															 
															<td class="text_tablehead_b" align="right" width="180px">买入外汇数：</td>
															<td><input name="buyamt" id="buyamt" value="${pvpform.buyamt}" type="text" style="width:180px;" title="买入外汇数" maxlength="21" onKeyPress="numPress()" /></td>
															
														</tr>
													
														
														<tr>
															
															<td class="text_tablehead_b" align="right">货币符号：</td>
															<td><input name="currency" id="currency" type="text" style="width:180px;" title="货币符号" value="RMB" readonly="readonly"   /> </td>
															
															<td class="text_tablehead_b" align="right">手续费金额：</td>
															<td><input name="charge" id="charge" type="text" style="width:180px;" title="手续费金额" value="${pvpform.charge}" onKeyPress="amountPress()"
															onkeyup="value=value.replace(/[^\d.,]/g,'')  "
															onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';"/></td>
														</tr>
														<tr>
													 
															<td class="text_tablehead_b" align="right">备注：</td>
																<td><textarea  name="remarkinfo" id="remarkinfo" style="width:180px" rows="4" title="备注"  >${pvpform.remarkinfo}</textarea></td>
														</tr>
													</table>
													</fieldset>
													<fieldset style="width:700px;border:1px #CCCCCC solid; padding:3px;" align="center" >
							  			  			<legend >发起机构信息</legend> 
													<table border="0" cellspacing="0" cellpadding="0">
													
														<tr>
														<td class="text_tablehead_b" align="right" style="width:180px;">付款清算行行号：</td>
															<td><input name="senddrctpty" id="senddrctpty" value="${pvpform.senddrctpty}" type="text" style="width:180px;" title="付款清算行行号" maxlength="12" /></td>
														
															<td class="text_tablehead_b" align="right" style="width:180px;">付款行行号：</td>
															<td><input name="sendindrctpty" id="sendindrctpty" value="${pvpform.sendindrctpty}"  type="text" style="width:180px;" title="付款行行号" maxlength="12" /></td>
															
														</tr>
														
													</table>
													</fieldset>
													<fieldset style="width:700px;border:1px #CCCCCC solid; padding:3px;" align="center" >
							  			  			<legend >接收机构信息</legend> 
													<table border="0" cellspacing="0" cellpadding="0">
													
														<tr>
															<td class="text_tablehead_b" align="right" style="width:180px;">收款清算行行号：</td>
															<td><input name="recvdrctpty" id="recvdrctpty" value="${pvpform.recvdrctpty}"  type="text" style="width:180px;" title="收款清算行行号" maxlength="12" /></td>
															<td class="text_tablehead_b" align="right" style="width:180px;">收款行行号：</td>
															<td><input name="recvindrctpty" id="recvindrctpty" value="${pvpform.recvindrctpty}" type="text" style="width:180px;" title="收款行行号" maxlength="12"  /></td>
														</tr>
													
													</table>
													</fieldset>
													<fieldset style="width:700px;border:1px #CCCCCC solid; padding:3px;" align="center" >
							  			  		 
													<table border="0" cellspacing="0" cellpadding="0">
												 
													 			 
													</table>
												
											
										</table>
										<br />
										<span class="STYLE1">说明：红色*标注项为必填项</span>
										<br />
										<br />
										<input name="addButton" type="button" style="cursor: pointer" class="button" value="修改" onclick="commitForm();" />
										&nbsp;
										<input name="backButton" style="cursor: pointer" type="button" class="button" value="返  回" onclick="history.back();" />
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
 