 <!-- 无导航栏的情况下导入该文件 -->
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
 	<!-- 操作状态消息 -->
 	<s:hidden id="operateTip" value="%{#session.operateTip}"></s:hidden>
	<%session.removeValue("operateTip");%>