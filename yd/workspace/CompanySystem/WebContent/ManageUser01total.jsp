<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>  
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>管理者初期画面</title>
</head>
<body background="imag\vb.jpg">
<s:form>
<table border="1" height="100%"　CELLSPACING="0">
<tr>
<td height="15%" colspan="2" width="100%">
<s:include value="Manageruser01head.jsp">
</s:include>
</td>
</tr>
<tr>
	<td height="85%" width="78%">
		<s:include value="ManageUser01.jsp">
		</s:include>
	</td>
	<td height="85%" width="22%">
		<s:include value="right.jsp">
		</s:include>
	</td>
</tr>
</table>
</s:form>
</body>
</html>