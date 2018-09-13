<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="sx" uri="/struts-dojo-tags"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>测试画面</title>
<link rel="stylesheet" type="text/css" href="css/underline.css" />
<script language="JavaScript" type="text/javascript"
	src="js/affirmattend.js"></script>

</head>

<body bgcolor="#ecf6ff">
<s:include value="common/topmenu.jsp" />
<br>
<p align="center"><font size="4" COLOR="green"><strong>测试</strong></font></p>
<s:form name="ckform" method="post" action="" theme="ysyshy">
<s:include value="common/grid.jsp" />

</s:form>
</body>
</html>

