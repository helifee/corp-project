<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>参加会议人员一览</title>
<link rel="stylesheet" type="text/css" href="css/style.css" />
<script language="JavaScript" type="text/javascript" src="js/applicationAttend.js"></script>
<script language="JavaScript" type="text/javascript" src="js/prototype.js"></script>
<script language="JavaScript" type="text/javascript" src="js/common.js"></script>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<s:head />

</head>
<body>
<div class="container">
<div class="span-24 title">
       <h2>参加会议人员一览</h2>
</div>
<div id="div_hy_attend_list" align="center">
	<s:include value="hy_attend_zi_list.jsp" />
</div>
<div class="none">
	<s:select id="hiddenzu" name="hiddenzu"	label="" theme="simple" list="hiddenzmList" />
</div>
</div>
</body>
</html>