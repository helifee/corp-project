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
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>404页面错误-远东社内网</title>
		<base href="<%=basePath%>">
		<link rel="stylesheet" type="text/css" href="<%=basePath %>css/style/layout.css" media="all">
		<!-- 共通js -->
		<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
		<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
		<!-- 画面js -->
		<script type="text/javascript" src="<%=basePath %>js/menu/menu.js"></script>
		<style>
			a:visited{color:#1C79C8;}
		</style>
	</head>
	<body>
		<div class="container">
			<div class="prepend-1 span-23 last" style="background:url(images/404.jpg) no-repeat;height:152px;">
				<div style="font-size:14px;line-height:24px;padding:80px 0 0 180px;color:#1C79C8;">
					<a href="gadget/initActiveDesk.action">我找首页去...</a>
					<br>
					<a href="#this" onclick="parent.advicePop();">我要反馈这个错误!</a>
					<br>
					<a href="javascript:history.back();" onclick="javascript:history.back();">返回上一个页面</a>
				</div>
			</div>
		</div>
	</body>
</html>