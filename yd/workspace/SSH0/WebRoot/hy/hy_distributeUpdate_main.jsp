<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>

<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="sx" uri="/struts-dojo-tags"%>
<jsp:include page="/hy/logincheck.jsp" />
<html>
<head>
<title>会议室详细信息</title>
<link href="css/generdistribute.css" rel="stylesheet" type="text/css" />
<script type="text/javascript"
	src="js/common.js"></script>
<script type="text/javascript"
	src="js/prototype.js"></script>
<script type="text/javascript"
	src="js/applicationDU.js"></script>

<sx:head debug="true" />
</head>
<body bgcolor="#ecf6ff">
<s:include value="../common/topmenu.jsp" />
<table width="972" border="0" cellpadding="0" cellspacing="0"
	align="center">
	<tr>
		<td width="37" height="72"></td>
		<td width="898">
		<p align="center"><font size="5" color="green"><strong>变更会议室</strong></font></p>
		</td>
		<td width="37"></td>
	</tr>
	<tr>
		<td></td>
		<td><s:form action="" theme="simple" method="post"
			id="distributeUpdateForm">
			<div id="div_hy_distributeUpdate" align="center"><s:include
				value="hy_distributeUpdate.jsp" /></div>
		</s:form></td>
		<td></td>
	</tr>
	<tr>
		<td></td>
		<td></td>
		<td></td>
	</tr>
</table>
</body>
</html>
