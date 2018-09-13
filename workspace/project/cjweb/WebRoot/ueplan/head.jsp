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
    
    <title>My JSP 'head.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link rel="stylesheet" href="common/css/style.css" type="text/css"></link>

  </head>
  
  <body>
    <table align="center">
	  	<tr><td><%@include file="/common/jsp/head.jsp"%> </td></tr>
	  	<tr>
	  		<td>
	  			<a href="ueplan/index.jsp">总计划</a>
	  			<a href="ueplan/yearPlanUsage.jsp">部门年度计划</a>
	  			<a href="ueplan/monthPlanUsage.jsp">部门月度计划</a>
	  			<a href="ueplan/meterPlanUsage.jsp">表计计划</a>
	  			<a href="ueplan/assessManager.do?type=ele">考核管理</a>
	  			<a href="ueplan/totalAdjustmentInit.do?type=ele">总量调整</a>
	  			<a href="ueplan/departmentAdjustmentByEle.jsp">部门调整</a>
			</td>
		</tr>
  	</table>
  </body>
</html>
