<%--
 * @(#)pagerSampleMain.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: sample
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<!-- 共通css -->
	<link href="../css/style.css" rel="stylesheet" type="text/css">

	<!-- 共通js -->
	<script type="text/javascript" src="../js/common/prototype.js"></script>
	<script type="text/javascript" src="../js/common/util.js"></script>
	<script type="text/javascript" src="../js/common/commonMessage.js"></script>
	<script type="text/javascript" src="../js/common/commonPageLock.js"></script>
	<!-- 画面用js -->
	<script type="text/javascript" src="../js/sample/pagerSample.js"></script>
	<title>分页共通</title>
</head>
<body onload="initForm('locked')"> 
<div id="div_dept_main"  class="container showgrid">
<s:form action="" method="post" theme="simple" name="pagerForm" id = "pagerForm">
<s:hidden  name="userNameHide"
id="userNameHide" value="%{pageLockUserName}"/>
<input type="hidden"  name="commonActionPath"
id="commonActionPath" value="<%=basePath%>"/>
</s:form>
</div>
</body>
</html>