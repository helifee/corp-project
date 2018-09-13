<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="sx" uri="/struts-dojo-tags"%>
<html>
<head>
<title>参加会议人员一览</title>
<s:head theme="simple" />
<link rel="stylesheet" type="text/css" href="css/underline.css" />
<script language="JavaScript" type="text/javascript"
	src="js/applicationAttend.js"></script>
<script language="JavaScript" type="text/javascript"
	src="js/prototype.js"></script>
<script language="JavaScript" type="text/javascript" src="js/common.js"></script>
<sx:head debug="true" />

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">

</head>
<body bgcolor="#ecf6ff">
<s:include value="../common/topmenu.jsp" />

<br>
<p align="center"><font size="4" COLOR="green"><strong>参加会议人员一览</strong></font></p>
<div id="div_hy_attend_list" align="center"><s:include
	value="hy_attend_zi_list.jsp" /></div>
<br>
<table>
	<tr>
		<td style="display: none"><s:select id="hiddenzu" name="hiddenzu"
			label="" theme="simple" list="hiddenzmList" /></td>
	</tr>
</table>
</body>
</html>