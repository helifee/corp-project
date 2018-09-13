<%@ page language="java" contentType="text/html; charset=GB18030"
    pageEncoding="GB18030"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GB18030">
<title>Insert title here</title>
</head>
<body>

<form action="/struts2/UploadServlet" method="post" enctype="multipart/form-data">

username: <input type="text" name="username"><br>

password: <input type="password" name="password"><br>

file1: <input type="file" name="file1"><br>

file2: <input type="file" name="file2"><br>

<input type="submit" value="submit">

</form>


</body>
</html>