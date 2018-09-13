<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%
	String path = request.getContextPath();
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
		<title>中国现代化支付系统</title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet"	type="text/css" />
	<link rel="stylesheet"
			href="<%=path%>/ext2.2.1/resources/css/ext-all.css" type="text/css"
			media="screen,projection" />
		<link rel="stylesheet"
			href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"
			media="screen,projection" />	
		<link rel="stylesheet" type="text/css" href="<%=path%>/css/home.css" />
		<script src="<%=path%>/ext2.2.1/ext-base.js" type="text/javascript"></script>
		<script src="<%=path%>/ext2.2.1/ext-all.js" type="text/javascript"></script>
		<script src="<%=path%>/ext2.2.1/ux/TabCloseMenu.js" type="text/javascript"></script>
		<script src="<%=path%>/js/common/pathUtil.js" type="text/javascript"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<!--  
		<script src="<%=path%>/js/common/sysDateTime.js" defer="true" type="text/javascript"></script>
		-->
		<script type="text/javascript" src="<%=path%>/js/home/home.js"></script>
		<script type="text/javascript">
        window.onbeforeunload=body_onUnload;
        function body_onUnload()
        { 
           if (event.clientY<0||event.altKey)
           {
              document.all.frmList.src ="<%=request.getContextPath()%>/login.do?method=logout";
           }
        } 
        </script>
		
	<style type="text/css">
<!--
a:link {
	color: #000000;
	text-decoration: none;
}
a:visited {
	text-decoration: none;
	color: #000000;
}
a:hover {
	text-decoration: none;
	color: #000000;
}
a:active {
	text-decoration: none;
	color: #000000;
}
-->
</style></head>
	<body scroll="no">
 	<html:form method="post" action="login.do?method=reLogin">
	<input type="hidden" name="promenus" id="promenus" value="${promenus}"/>
		<div id="loading-mask" style=""></div>
		<div id="loading">
			<div class="loading-indicator">
				<img src="<%=path%>/image/extanim32.gif" width="32" height="32"
					style="margin-right: 8px;" align="absmiddle" />
				正在初始化系统配置,请稍后...
			</div>
		</div>
		<div id="header">
			
			<div id="homedatetime" style="height: 10px;">
			</div>
			<div id="sysoper">
			<%-- 系统日期 [${sessionScope.workDate }]--%>&nbsp; &nbsp;&nbsp;机构代码 [${sessionScope.orgcode }]&nbsp; &nbsp;&nbsp;所属参与机构 [${sessionScope.bankInfo.bankcode }]&nbsp;&nbsp;&nbsp;
				所属清算行行号&nbsp;[${sessionScope.bankInfo.directbankcode }]&nbsp;&nbsp;&nbsp;登录人&nbsp;[${sessionScope.username }]&nbsp;&nbsp;&nbsp;
				<a href="#" id="logout" style="padding: 5px">退出系统</a> <%-- 
				<a href="#" id="logout" style="padding: 5px">退出系统</a> |
				<a href="#" id="relongin" style="padding: 5px">重新登录</a>
				--%>
			</div>
		</div>
		<div id="classes"></div>
		<div id="main"></div>
		</html:form>
	</body>
</html>
