<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="sx" uri="/struts-dojo-tags"%>
<html>
<head>
<title>组管理画面</title>
<s:head theme="simple" />
<link rel="stylesheet" type="text/css" href="css/underline.css" />
<script language="JavaScript" type="text/javascript"
	src="js/prototype.js"></script>
<script language="JavaScript" type="text/javascript" src="js/common.js"></script>
<script language="JavaScript" type="text/javascript"
	src="js/application.js"></script>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">

</head>
<body bgcolor="#ecf6ff" onload="InitHumian(0)">
<s:include value="../common/topmenu.jsp" />
<table align="center" width="944" border="0" cellpadding="0"
	cellspacing="0">

	<tr>
		<td align="center" "728" height="53">
		<p align="center"><font size="5" color="green"><strong>组管理画面</strong></font></p>
		</td>
	</tr>
	<tr>
		<td align="center">
		<table width="533" border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td align="left">
				<table width="533" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td>
						<fieldset style="height: 65px; width: 250px"><s:form
							id="form1" name="form1" theme="simple">
							<table width="250px" height="60px" border="0px">
								<tr>
									<td>组名： <s:textfield id="zuname" theme="simple"
										name="zuname" size="18" theme="simple" readonly="false"
										cssStyle="WIDTH: 165px; HEIGHT: 20px; vertical-align:middle"
										onchange="$('xinzuname').value = this.value, check(0)"
										onkeypress="if (event.keyCode == 13) return false" /></td>
								</tr>
								<tr>
									<td><input type="Button" name="xinjian" id="xinjian"
										value="新建" style="width: 65px; height: 25px"
										onclick="addzu('<s:property value="%{#session.userinfo.userID}" />','<s:property value="%{#session.userinfo.userName}" />')">&nbsp;&nbsp;
									<input type="Button" name="xiugai" id="xiugai" value="修改"
										style="width: 65px; height: 25px" onclick="updatezu()">&nbsp;&nbsp;
									<input type="Button" id="shanchu" name="shanchu" value="删除"
										style="width: 65px; height: 25px" onclick="deletezu()"></td>
								</tr>
								<s:hidden id="hiddenzuid" name="hiddenzuid"></s:hidden>
							</table>
						</s:form></fieldset>

						</td>
						<td width="190">
						<table width="181" height="60">
							<tr>
								<td style="vertical-align: text-top"><span id="checkinfo"
									style="display: none"> <s:label theme="simple"
									cssStyle="color:red" id="xinxi" name="xinxi"></s:label> </span></td>
							</tr>
						</table>
						</td>

						<td width="40" align="right" valign="bottom"><s:a href="#"
							onclick="goback(); return false">返回</s:a></td>
					</tr>
				</table>
				</td>

			</tr>
			<tr>
				<td>
				<div id="div_hy_group_manage_zuname"><s:include
					value="hy_group_manage_zuname.jsp" /></div>
				<div id="div_hy_group_manage" align="center"><s:include
					value="hy_group_manage.jsp" /></div>
				</td>
			</tr>
		</table>
		</td>
	</tr>
	<tr>
		<td>
		<table>
			<tr>
				<td style="display: none"><s:select id="hiddenzu"
					name="hiddenzu" label="" theme="simple" list="hiddenzmList" /></td>
			</tr>
		</table>
		</td>
	</tr>

</table>
<s:hidden key="returnUrl" />
<s:hidden key="yyDate" />
<s:hidden id="querenFlg" name="querenFlg"></s:hidden>
<s:hidden id="hiddenzm" name="hiddenzm"></s:hidden>

</body>
</html>