<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="sx" uri="/struts-dojo-tags"%>
<jsp:include page="logincheck.jsp" />
<html>
<head>
<title>远东公司内部网</title>
<sx:head debug="true" />
</head>


<body>
<s:include value="../common/topmenu.jsp" />
<p>登录成功！</p>

<s:bean name="com.ydsweb.www.action.LoginAction">

	<p>用户ID：<s:property value="#session.userinfo.userID" /></p>
	<p>用户名：<s:property value="#session.userinfo.userName" /></p>
	<p><s:url action="logout" id="logoutUrl"></s:url> <s:a
		href="%{logoutUrl}">注销</s:a></p>
	<p>
		<s:url action="getDeptInfosAction" id="getDeptInfosUrl"></s:url>
        <s:a href="%{getDeptInfosUrl}">部门表管理</s:a>
	</p>
</s:bean>
</body>
</html>
