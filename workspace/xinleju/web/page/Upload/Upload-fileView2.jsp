<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@page import="utils.WebUtils"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/xinyuan_style.css" type="text/css" />
<link href="css/mask.css" rel="stylesheet" type="text/css" />
<script src="${pageContext.request.contextPath}/js/ext/adapter/ext/ext-base.js"></script>
<script src="${pageContext.request.contextPath}/js/ext/ext-all.js"></script>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/js/ext/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/js/ext/resources/css/xtheme-blue.css" />
<script src="${pageContext.request.contextPath}/js/application.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/js/jquery/jquery-1.7.2.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/js/jquery.loadmask.min.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/page/Upload/Upload-fileView.js" type="text/javascript"></script>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<base target="_self" />
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>附件上传</title>
	</head>
	<body>
		<s:if test="uploadList.size>0">
			<ul class="list_ggfj">
				<s:iterator value="uploadList" var="upload">
					<a href='File!download.ajax?id=${upload.id}'><img border="0" align="absmiddle" src="images/download.gif">${upload.fileName }</img></a>
					<s:if test="#upload.note!=null&&#upload.note!=''">(${upload.note})</s:if>
					<br />
				</s:iterator>
			</ul>
		</s:if>
		<s:else>
			<font color="red">无</font>
		</s:else>
	</body>
</html>