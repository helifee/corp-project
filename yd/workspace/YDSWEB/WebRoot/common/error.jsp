<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<html>
    <head>
    	<title>远东公司内部网</title>
    </head>
    <body>
    <div align="center">
    	<img src="<%=basePath %>images/error.gif" width="359" height="238"/>
    	<br>
    	<s:if test="#session._message_id!=null">
	    	<s:property value="#session._message_id"/>:
	    	<%session.removeAttribute("_message_id");%>
    	</s:if>
    	<s:if test="#session.operateTip!=null">
    		<%session.removeAttribute("operateTip");%>
     	</s:if>
     	<s:label>${session.errType}</s:label>
    	<s:property value="errorMessage"/>
    	<a href="#this" onclick="window.history.back()">返回</a>
    </div>
    </body>

</html>