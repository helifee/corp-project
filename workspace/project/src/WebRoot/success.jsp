<%@ page language="java" import="java.util.*" pageEncoding="GB18030"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'success.jsp' starting page</title>
    
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
  
  <table align="center" width="40%" border="1">

				<tr>

					<td>
						username
					</td>

					<td>
						${requestScope.username}
					</td>
				</tr>

				<tr>
					<td>
						password
					</td>

					<td>
						${requestScope.password}
					</td>
				</tr>


				<tr>
					<td>
						age
					</td>

					<td>
						${requestScope.age}
					</td>
				</tr>

				<tr>
					<td>
						birthday
					</td>

					<td>
						${requestScope.birthday}
					</td>
				</tr>

				<tr>
					<td>
						graduation
					</td>

					<td>
						${requestScope.graduation}
					</td>
				</tr>

			</table>
  
  
  
  </body>
</html>
