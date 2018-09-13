<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>  
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>一般ユーザー初期画面（李化娟）</title>
</head>
<body background="imag\vb.jpg">
<s:form>
<table border="1" height="100%">
<tr>
<td height="25%" colspan=2 width="100%">
<s:include value="SimpleUser01head.jsp">
</s:include>
</td>
</tr>
<tr>
	<td height="75%" width="82%">
		<s:include value="SimpleUser01left.jsp">
		</s:include>
	</td>
	<td height="75%" width="18%">
		<s:include value="right.jsp">
		</s:include>
	</td>
</tr>
</table>
</s:form>
</body>
</html>