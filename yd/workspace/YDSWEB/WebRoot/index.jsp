<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<s:if test="#session.userinfo == null">
	<script type="text/javascript">
		window.open('login.jsp', '_self');
	</script>
</s:if>
<title>大连远东计算机系统有限公司-内部网</title>
<base href="<%=basePath%>">
<link rel="icon" type="image/x-icon" href="favicon.ico" />
<link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
<script type="text/javascript">
</script>
</head>
<frameset rows="70,*,27" cols="*" frameborder="no" border="0" framespacing="0">
  <frame src="topframe.jsp" name="topFrame" frameborder="0" scrolling="No" noresize="noresize" id="topFrame" title="topFrame" />
  <frame src="center.jsp" name="center" frameborder="0" scrolling="no"  noresize="noresize" id="center" title="center" />
  <frame src="bottom.jsp" name="bottomFrame" frameborder="0" scrolling="No" noresize="noresize" id="bottomFrame" title="bottomFrame" />
</frameset>
<noframes><body>
</body>
</noframes>
</html>


