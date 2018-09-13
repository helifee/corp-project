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
    
    <title>用能分析</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">

	<link rel="stylesheet" href="common/css/style.css" type="text/css"></link>

  </head>
  
  <body>
    
    <table align="center">
	  	<tr><td><jsp:include page="/common/jsp/head.jsp"></jsp:include></td></tr>
	  	<tr>
	  		<td>
	  			<a href="ueanalyse/index.jsp">机组运行特性</a>
	  			<a href="ueanalyse/coolHeatEER.jsp">冷热系统能效比</a>
	  			<a href="ueanalyse/energyUsageRegularAnalysis.jsp">用能规律分析</a>
			</td>
		</tr>
  	</table>
  </body>
</html>
