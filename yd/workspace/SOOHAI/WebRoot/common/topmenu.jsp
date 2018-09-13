<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>

<table width = "100%" border="0" cellspacing="0" cellpadding="0">
	<tr valign="middle">
		<td ><img src="../common/images/logo.png" width="25" height="25"/>&nbsp;<s:property value="#session.displayfncname" /></td>
		<td align="right"><img src="../common/images/userhead.jpg"  width="25" height="25"/>&nbsp;<s:property value="#session.userinfo.userName" />
		&nbsp;<s:url action="logout" id="logoutUrl"></s:url> <s:a
			href="%{logoutUrl}">注销</s:a></td>
	</tr>
</table>
<br>


