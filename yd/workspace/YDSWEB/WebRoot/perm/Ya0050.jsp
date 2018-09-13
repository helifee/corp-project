<%--
 * @(#)Ya0050.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 权限管理
--%>
<%--
 * 权限查询画面（主页面JSP）
 * 
 * @author liangkezhen
 * @version 1.00 2010/02/05
 --%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
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
	<!-- 树用css -->
	<link href="<%=basePath%>js/tafelTree/css/tree.css" rel="stylesheet" type="text/css"/>
	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath%>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/common/commonMessage.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/common/ydsTree.js"></script>	
	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath%>js/tafelTree/js/scriptaculous.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/tafelTree/Tree.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/perm/Ya0050.js"></script>
	<title>权限查询</title>
</head>
<body onload="init()">
<jsp:include page="../common/commonPage.jsp"></jsp:include>
<div class="ydscontainer">
<!-- 权限查询信息画面 -->
	<div id="tab_main" class="span-24 ">
		<div class="prepend-1 span-5 t_auto line_h">
			<div id="div_permtree"></div>
		</div>
		<div id="div_per_list" class="span-18 last">
			<s:include value="Ya0051.jsp" />
		</div>
	</div>
	<div class="clear_both"></div>
	<!--权限管理弹出层-->
	<div id="myPopContent01" class="none">
		<iframe id="myInnerPage01" frameBorder="0" ></iframe>
	</div>
	<!--角色信息授权弹出层-->
	<div id="myPopContent02" class="none">
		<iframe id="myInnerPage02" frameBorder="0" ></iframe>
	</div>
</div>
</body>
</html>