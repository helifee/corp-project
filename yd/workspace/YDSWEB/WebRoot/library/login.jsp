<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" type="text/css" href="<%=basePath%>css/ydb.css">
<link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/library/common/commonMessage.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/formValidation.js"></script>
	
	<script type="text/javascript" src="<%=basePath %>js/library/login.js"></script>
<title>远东工会图书馆--系统登录</title>

</head>
<body onload="init(); document.onkeydown();">
	<div class="container">
		<div id="time" class="margin_left_730">
			<s:label id="datetime" name="datetime" theme="simple" cssClass="font_size_14" value="time..."/>
		</div>
		<div class="margin_top_10 padding_top_10"><img src="../images/mark-1.png" class="mark"/></div>
		<div class="margin_top_10 padding_top_10"><img src="../images/title.png" class="title_login"/></div>
		<div class=" margin_left_40 padding_top_10 margin-top-70">  		
			<s:label id="b" name="b" theme="simple" value=""/>	            
		</div>
		<s:form id="loginForm" theme="simple" validate="true">
			<div class="loginWindow">
				<div class="sepr"></div>
				<div class="logo"></div>
				<div class="bttn button" id="btnDiv" > <a onclick="doubleLogin();"><span>Login</span></a> </div>
				<div class="user">
					<label class="span-2 ">用户名:</label>
					<s:textfield id="userId" name="userId" cssClass="span-4" maxlength="6" />
				</div>
				<div class="pwd">
					<label class="span-2 ">密&nbsp;码:</label>
					<s:password id="password" name="password" cssClass="span-4" maxlength="11"/>
				</div>
				<div class="login_error">
					<s:property value="errormsg"/>
					<s:fielderror/>
				</div>
			</div>
		</s:form>
	</div>
</body>
</html>