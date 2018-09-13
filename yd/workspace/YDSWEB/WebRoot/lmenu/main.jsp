<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<html>
<head>
<title>远东公司内部网</title>
</head>
<s:if test="#session.requestUrl == null">
	<%response.sendRedirect("gadget/initActiveDesk.action"); %>
</s:if>
<s:else>
	<%response.sendRedirect((String)session.getAttribute("requestUrl")); %>
	<%session.removeAttribute("requestUrl"); %>
</s:else>
</html>

