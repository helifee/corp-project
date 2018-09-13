<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="com.celartem.common.OracleConnection" %>
<%@ page import="java.sql.Connection" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>连接测试</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->

  </head>
  
  <body>
    <% 
    	Connection conn = com.celartem.common.OracleConnection.getConnectionFromLocal();
    	if(conn!=null)
    	{
    		out.println("本地获取连接成功");
    		com.celartem.common.OracleConnection.freeConnection();
    	}
    	
    	 conn = com.celartem.common.OracleConnection.getConnectionFromServer();
    	if(conn!=null)
    	{
    		out.println("服务获取连接成功");
    		com.celartem.common.OracleConnection.freeConnection();
    	}
    
    
     %>
  </body>
</html>
