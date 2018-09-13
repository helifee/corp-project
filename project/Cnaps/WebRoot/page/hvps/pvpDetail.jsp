<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="/WEB-INF/tld/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/tld/struts-html.tld" prefix="html" %>
<%@ taglib uri="/WEB-INF/tld/struts-logic.tld" prefix="logic" %>
<%
	String path = request.getContextPath();
%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<title>无标题文档</title>
		<link href="<%=path%>/css/page_color.css" rel="stylesheet" type="text/css" />
		
	</head>
	<body>
		<html:form method="post" action="systemManage/systemOrganizationManageAction.do?method=xxx">
			<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				 <tr>
					<td width="8" height="48" ></td>
					<td >
						<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td  width="194" ></td>
							<td  width="270"  ></td>
						</tr>
						</table>
					</td>
					<td width="8" ></td>
			</tr>
				<tr valign="top">
					<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);" ></td>
					<td
						style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);">
						<br />
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td width="10">
									&nbsp;
								</td>
								<td>
									<div align="center">
										<table width="800" height="30" border="0" cellpadding="0"
											cellspacing="0">
											<tr>
												<td height="40">
													<div align="center">
														<span class="text_blue2">PVP明细业务查看</span>
													</div>
												</td>
											</tr>
											
											
											<table width="820" border="0" cellpadding="1" cellspacing="1" 
		 bordercolor="#F0F0F0" bgcolor="#F0F0F0"
		style="text-align: left; vertical-align: top">
		<tr>
	    <td>
	<fieldset style="width:780px;border:1px #CCCCCC solid; padding:3px;" align=center >
  				<legend >交易信息</legend>
  	<table class="sample">
	<tr>
		<td  class="text_tablehead_b" align="right" class="text1" width="190">交易流水号：</td>
		<td  class="text1" width="150">${pvpform.chnmsgid} </td>
		<td    class="text_tablehead_b" align="right" class="text1" width="190">买入价：</td>
		<td  class="text1" width="150">${pvpform.purchspric}</td>
	</tr>
	<tr>
		<td   class="text_tablehead_b"  align="right" class="text1" width="190">买入外汇数：</td>
		<td  class="text1">${pvpform.buyamt}</td>
		<td   class="text_tablehead_b"  align="right" class="text1" width="190">货币符号：</td>
		<td  class="text1">CNY</td>
	</tr>
	<tr>
		<td  class="text_tablehead_b" align="right" class="text1" width="190">工作日期：</td>
		<td  class="text1" width="150">${pvpform.workdate} </td>
		<td    class="text_tablehead_b" align="right" class="text1" width="190">前台流水号：</td>
		<td  class="text1" width="150">${pvpform.chnmsgid}</td>
	</tr>

	 
	<tr>
		<td   class="text_tablehead_b" align="right" class="text1" width="190">手续费金额：</td>
		<td class="text1">${pvpform.charge}</td>
		<td   class="text_tablehead_b"  align="right" class="text1" width="190">业务状态：</td>
		<td  class="text1">待复核</td>
	</tr>
		<tr>
		<td  class="text_tablehead_b" align="right" class="text1" width="190">系统编号：</td>
		<td  class="text1" width="150">${pvpform.workdate} </td>
		<td    class="text_tablehead_b" align="right" class="text1" width="190"></td>
		<td  class="text1" width="150"></td>
	</tr>
	<tr>
		
		<td   class="text_tablehead_b"  align="right" class="text1" width="190">备注：</td>
		<td  class="text1">${pvpform.remarkinfo}</td>
	</tr>

	
	</table>
	</fieldset>
	
	
	<fieldset style="width:780px;border:1px #CCCCCC solid; padding:3px;" align=center >
  				<legend >发起机构信息</legend>
  	<table class="sample">
	<tr>
		<td  class="text_tablehead_b" align="right" class="text1" width="190">付款清算行行号：</td>
		<td  class="text1" width="150">${pvpform.senddrctpty}</td>
		<td    class="text_tablehead_b" align="right" class="text1" width="190">付款行行号：</td>
		<td  class="text1" width="150">${pvpform.sendindrctpty}</td>
	</tr>
	
	</table>
	</fieldset>
	
	
	<fieldset style="width:780px;border:1px #CCCCCC solid; padding:3px;" align=center >
  				<legend >接收机构信息</legend>
  	<table class="sample">
	<tr>
		<td  class="text_tablehead_b" align="right" class="text1" width="190" >收款清算行行号：</td>
		<td  class="text1" width="150">${pvpform.recvdrctpty}</td>
		<td    class="text_tablehead_b" align="right" class="text1" width="190">收款行行号：</td>
		<td  class="text1" width="150">${pvpform.sendindrctpty}</td>
	</tr>
	
	</table>
	</fieldset>
	
	<fieldset style="width:780px;border:1px #CCCCCC solid; padding:3px;" align=center >
  				<legend >柜员信息</legend>
  	<table class="sample">
	<tr>
		<td  class="text_tablehead_b" align="right" class="text1" width="190" >录入柜员：</td>
		<td  class="text1" width="150">${pvpform.inputteller}</td>
		<td    class="text_tablehead_b" align="right" class="text1" width="190">复核柜员：</td>
		<td  class="text1" width="150">${entity.cbsendbrchbic}</td>
	</tr>
	<tr>
		<td  class="text_tablehead_b" align="right" class="text1" width="190" >锁定定人：</td>
		<td  class="text1" width="150">${hvpsfront141.lockteller}</td>
		<td    class="text_tablehead_b" align="right" class="text1" width="190">锁定状态：</td>
		<td  class="text1" width="150">${hvpsfront141.lockflag}</td>
	</tr>
	<tr>
		<td   class="text_tablehead_b"  align="right" class="text1" width="190">授权柜员：</td>
		<td  class="text1">${entity.cbsendbrchname}</td>
		<td   class="text_tablehead_b"  align="right" class="text1" width="190">网点号：</td>
		<td  class="text1">${entity.cbrecvbrchbic}</td>
	</tr>
	<tr>
		<td   class="text_tablehead_b" align="right" class="text1" width="190">账户所属开户网点号：</td>
		<td class="text1">${entity.cbrecvbrchname}</td>
		<td   class="text_tablehead_b" align="right" class="text1" width="190">终端号：</td>
		<td class="text1">${entity.cbchargecode}</td>
	</tr>
	
	
	</table>
	</fieldset>
	
	</td>
	</tr>
	</table>
		<br />
		<br />
			<input name="backButton" type="button" class="button" value="返  回"
				onclick="history.back();" />
				<br />
				<br />
			
			</table>
		</td>
	<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);" ></td>
					
				</tr>
			</table>
		</html:form>
	</body>
	</html>
 