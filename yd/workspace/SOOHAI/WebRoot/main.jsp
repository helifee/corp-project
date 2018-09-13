<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="sx" uri="/struts-dojo-tags"%>
<jsp:include page="logincheck.jsp" />
<html>
<head>
<title>海景楼盘网</title>
<sx:head debug="true" />
</head>


<body>
<s:include value="../common/topmenu.jsp" />
<p>登录成功！</p>

<s:bean name="com.soohai.www.action.LoginAction">

	<p>用户ID：<s:property value="#session.userinfo.userID" /></p>
	<p>用户名：<s:property value="#session.userinfo.userName" /></p>
	<p><s:url action="logout" id="logoutUrl"></s:url> <s:a
		href="%{logoutUrl}">注销</s:a></p>
	<p>
		<s:url action="buildedinfo" id="buildeditUrl"></s:url>
        <s:a href="%{buildeditUrl}">添加楼盘信息</s:a>
	</p>
	<p>
		<s:url action="buildedyl" id="buildedylUrl"></s:url>
        <s:a href="%{buildedylUrl}">楼盘信息一览</s:a>
	</p>
	<p><s:url action="buildingdetail" id="detailUrl">
			<s:param name="buildId" value="2"></s:param>
	   </s:url>
			
	   <s:a href="%{detailUrl}">楼盘详细</s:a>
	</p>
	<p>
	   <s:a href="maptest.html">楼盘新规</s:a>
	</p>
</s:bean>


<s:url action="citysearchAction" id="citysearchUrl"></s:url>
<s:a href="%{citysearchUrl}" >城区检索</s:a> 
<s:url action="buildinglistAction" id="buildinglistUrl"></s:url>
<s:a href="%{buildinglistUrl}" >楼盘一览</s:a> <br/>
</body>
</html>
