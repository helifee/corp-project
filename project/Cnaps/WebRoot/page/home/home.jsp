<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%
	String path = request.getContextPath();
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<title></title>
		<link rel="stylesheet"
			href="<%=path%>/ext-3.2.1/resources/css/ext-all.css" type="text/css"
			media="screen,projection" />
		<link rel="stylesheet" type="text/css" href="<%=path%>/css/home.css" />
		<!-- GC -->
		<script src="<%=path%>/ext-3.2.1/ext-base.js" type="text/javascript"></script>
		<script src="<%=path%>/ext-3.2.1/ext-all.js" type="text/javascript"></script>
		<script src="<%=path%>/js/common/pathUtil.js" type="text/javascript"></script>
		<script src="<%=path%>/js/common/sysDateTime.js" defer="true" type="text/javascript"></script>
		<script src="<%=path%>/ext-3.2.1/ux/TabCloseMenu.js" type="text/javascript"></script>
		<script type="text/javascript" src="<%=path%>/js/home/home.js"></script>
	</head>
	<body scroll="no">
		
		<div id="loading-mask" style=""></div>
		<div id="loading">
			<div class="loading-indicator">
				<img src="<%=path%>/image/extanim32.gif" width="32" height="32"
					style="margin-right: 8px;" align="absmiddle" />
				Loading...
			</div>
		</div>
		<div id="header">
			<div id="user">姓名：${userentity.realname} 所属行：${userentity.systemorganizationsmanage.namecode}</div> 
			<div id="homedatetime"></div>
			<div id="sysoper">
				<a href="#" style="padding: 5px">修改密码</a> |
				<a href="#" style="padding: 5px">重新登录</a>
			</div>
		</div>
		<div id="classes"></div>
		<div id="main"></div>
	</body>
</html>
