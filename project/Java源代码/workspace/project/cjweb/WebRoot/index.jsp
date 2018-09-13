<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
response.setContentType("text/html; charset=UTF-8");
response.sendRedirect("datashow/datashow.do");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
   
    <base href="<%=basePath%>">
    <title>朝教能效管理</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->

  </head>
  <body marginheight="0" >
	  <table width="1200px" border="0" align="center" cellpadding="0" cellspacing="0">
	  	<tr><Td><%@include file="common/jsp/head.jsp"%> </Td></tr>
	  	<tr><Td width="1200px" height="500"><embed align="middle"   src="FLEX-BIN/DataShow.swf" width="1200" height="500"></embed></Td></tr>
	  </table>
  </body>
</html>
