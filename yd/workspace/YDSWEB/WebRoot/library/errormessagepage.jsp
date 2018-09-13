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
<script type="text/javascript" src="<%=basePath %>js/library/head.js"></script>
<script type="text/javascript" src="<%=basePath %>js/library/common/commonMessage.js"></script>	
		<script type="text/javascript" src="<%=basePath %>js/library/errormessagepage.js"></script>

<title>远东工会图书馆--错误页面</title>

</head>
<body onload="init()" class="exceptionBody">
	<div class="container">
		<s:include value="head.jsp" />
		
		<div class="text_center margin_top_10 margin_left_20 " >
			<div style="margin-top:80px">
	   			<s:label  name="second" theme="simple" value="30" cssClass="font_size_18 font_weight_b"/>
	   			<s:label id="back" name="back" theme="simple" cssClass="font_size_18 font_weight_b" value="秒钟之后自动退出系统" />
   	  		</div>
   	  		<div class="margin-top:20px" > 
   	  			<a href="#" onclick="$('exceptionMessage').removeClassName('none');"><u>查看异常</u></a> 
   	  		</div>
   	  		<div id="exceptionMessage" class="margin-top:20px none">
   	  			<s:property value="exceptionStack"/> 
   	  		</div>
   	  	</div>
   	  	
	</div>
</body>
</html>