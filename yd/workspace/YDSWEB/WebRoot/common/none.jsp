<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<html>
    <head>
    	<title>远东公司内部网</title>
    </head>
    <body>
    <div align="center">
    	<img src="<%=basePath %>images/error.gif" width="359" height="238"/>
    	<br>
     	<s:label>您没有权限访问该页面，请刷新后重试！</s:label>
    </div>
    </body>

</html>