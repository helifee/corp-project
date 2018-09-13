<?xml version="1.0" encoding="UTF-8"?>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>管理系统</title>
<%@ include file="base.jsp" %>
</head>
<body id="indexLayout" class="easyui-layout">
<% %>
	<div region="north" style="height:100px;overflow: hidden;background:url('images/bg.jpg');"></div>
	<div region="center" style="overflow: hidden;" href="${ctx }/layout/center.jsp"></div>
	<div region="west" split="false" style="width:200px;overflow: hidden;" href="${ctx }/layout/west.jsp"></div>
	<div region="south" title="south" style="height:20px;overflow: hidden;"></div>
</body>
</html>