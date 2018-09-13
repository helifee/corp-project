<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>远东公司内网</title>
</head>
<body>
<center>
<h1>用户登陆</h1>
<hr />
	<form action="login" method="post">
		用户ID：<input type="text" name="user.id" />
		用户密码：<input type="password" name="user.password" />
		<input type="submit" value="登陆" />
		<input type="reset" value="重置" />
		<a href="register.jsp" >注册</a>
	</form>
</center>
</body>
</html>