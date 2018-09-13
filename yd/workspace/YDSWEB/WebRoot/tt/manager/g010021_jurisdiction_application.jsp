<%--
 * @(#)g010021_jurisdiction_application.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 权限管理
--%>

<%--
 * 权限管理画面
 * 
 * @author guozhizhou
 * @version 1.00 2010/03/12
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
<link href="<%=basePath%>${session.userTheme}" rel="stylesheet" type="text/css">
	
<!-- 共通js -->
<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
<script type="text/javascript" src="<%=basePath %>js/common/commonMessage.js"></script>
<!-- 画面用js -->
<script type="text/javascript" src="<%=basePath %>js/ttManager/g010021Application.js"></script>
<title>权限申请一览</title>
</head>
<body onload="G010021applicationForm()">
<div class="container">
<div class="span-21 margin_top_2">
<div class="tt_module padding_bottom_4 overflow_hd">
<s:include value="%{basePath}/tt/manager/operateTip.jsp"></s:include>
<div id="application"  class="container showgrid">
	<div class="span-21 padding_top_8 title_tt">
		<h2>权限申请一览</h2>
	</div>

    <div class="span-20 prepend-h" id ="g010021ApplicationList" >
      	<s:include value="g010021_jurisdiction_application_list.jsp" />
	</div>
</div>
</div>
</div>
</div>
</body>
</html>
