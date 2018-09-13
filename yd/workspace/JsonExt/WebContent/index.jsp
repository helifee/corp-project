<%@ page language="java" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<base href="<%=basePath%>" />
		<link rel="shortcut icon" href="<%=basePath%>images/favicon.ico"
			type="image/x-icon"></link>
		<title>Student</title>
		<meta http-equiv="pragma" content="no-cache" />
		<meta http-equiv="cache-control" content="no-cache" />
		<meta http-equiv="expires" content="0" />
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3" />
		<meta http-equiv="description" content="This is my page" />
			
		<!-- ext -->
		<script type="text/javascript" src="<%=basePath%>/ext2/js/ext-base.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>/ext2/js/ext-all.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>/js/student.js"></script>

		<script type="text/javascript">
			
		</script>
	</head>
	<body>


	</body>
</html>
