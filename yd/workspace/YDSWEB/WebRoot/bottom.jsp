<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>大连远东计算机系统有限公司-内部网</title>
<base href="<%=basePath%>">
<link href="<%=basePath%>${session.userTheme}" rel="stylesheet" type="text/css">
</head>
<body>
<div class="bottom" id="bottomBox">
  <div class="bottom_left">版本：2010V1.0</div>
  <div class="bottom_c">大连远东计算机系统 &copy;版权所有</div>
  <div class="bottom_right">如有疑问请与技术人员联系</div>
</div>
</body>
</html>


