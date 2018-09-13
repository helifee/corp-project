<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>远东公司内网</title>
</head>
<body>

<h1 align="center">用户注册</h1>
<hr />
<form action="register" method="post">

<table align="center">

<tr>
<td>用户ID：</td>
<td><input type="text" name="user.id"/></td>
</tr>

<tr>
<td>用户昵称：</td>
<td><input type="text" name="user.name"/></td>
</tr>

<tr>
<td>用户密码：</td>
<td><input type="password" name="user.password"/></td>
</tr>

<tr>
<td>密码确认：</td>
<td><input type="password" name="user.password"/></td>
</tr>


<tr>
<td><input type="submit" value="注册" /></td>
<td><input type="reset" value="重置" /></td>
</tr>

</table>

</form>

</body>
</html>