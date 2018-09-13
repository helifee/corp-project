<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page isELIgnored="false"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>节电分析</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link rel="stylesheet" href="common/css/style.css" type="text/css"></link>
  </head>
  
  <body>
     <table width="1200px" border="0" align="center" cellpadding="0" cellspacing="0">
  	<tr><Td><%@include file="/common/jsp/head.jsp"%> </Td></tr>
  	<tr><td>
  	<embed align="middle" src="FLEX-BIN/DSaveElectricAnalysis.swf" width="1200" height="570"></embed>
  	</td></tr>
  </table>
  </body>
</html>
