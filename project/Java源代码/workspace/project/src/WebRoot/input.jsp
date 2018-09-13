<%@ page language="java" import="java.util.*" pageEncoding="gbk"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

 

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'input.jsp' starting page</title>
    
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
   
   <h3><font color="red">使用逗号将点的两个坐标分割开</font></h3>
   
   <s:form action="pointConverter">
   
   <s:textfield name="point.x" label="x"></s:textfield>
   <s:textfield name="point.y" label="y"></s:textfield>
   <s:textfield name="age" label="age"></s:textfield>
   <s:textfield name="username" label="username"></s:textfield>
   <s:textfield name="date" label="birthday"></s:textfield>
   
   <s:submit label="submit"></s:submit>
   
   </s:form>
   
  </body>
</html>
