<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<script type="text/javascript" src="../js/common/prototype.js"></script>
	<script type="text/javascript" src="../js/sample/ajaxException.js"></script>
	<script type="text/javascript" src="../js/common/util.js"></script>
	<title>Ajax Exception Sample</title>
	<base href="<%=basePath%>">
</head>
<body>

	<h3>Ajax请求异常处理</h3>
	<p>你可能修改对应的Action, 观察各种异常时的情况！</p>
	
	<input type="button" value="Ajax Request" onclick="launch()"/>
	result:
	<div id="msg" style="width:300px; height:400px; overflow:auto"></div>
	
</body>
</html>