<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<html>

<head>
<title>会议室预约一览画面</title>
<link rel="stylesheet" type="text/css" href="css/underline.css" />
<script language="JavaScript" type="text/javascript"
	src="js/My97DatePicker/WdatePicker.js"></script>
<script language="JavaScript" type="text/javascript"
src="js/common.js"></script>
<script language="JavaScript" type="text/javascript" src="js/date.js"></script>
<script language="JavaScript" type="text/javascript" src="js/prototype.js"></script>
</head>
<body bgcolor="#ecf6ff" >
<s:include value="../common/topmenu.jsp" />

<br>
<p align="center"><font size="4" COLOR="green"><strong>会议室预约情况一览</strong></font></p>
	<div id="div_hy_reserve_list" align="center"><s:include
		value="hy_reserve_list_zi.jsp" /></div>
<br>

</body>
</html>
