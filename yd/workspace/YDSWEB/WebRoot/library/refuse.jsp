<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" type="text/css" href="<%=basePath%>css/ydb.css">
<link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
<script type="text/javascript" src="<%=basePath %>js/library/head.js"></script>
<script type="text/javascript" src="<%=basePath %>js/library/refuse.js"></script>
<script type="text/javascript" src="<%=basePath %>js/library/common/commonMessage.js"></script>	
<title>远东工会图书馆--拒绝访问</title>

</head>
<body onload="init()" class="refuseBody">
	<div class="container">
		<s:include value="head.jsp" />
		
		<div class="text_center">
			<img style="margin-top:50px"  src="<%=basePath %>images/refuse_flag.jpg">
		</div>
	</div>
</body>
</html>