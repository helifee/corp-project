<%--
 * @(#)selectList_sample.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: SAMLPE
--%>

<%--
 * checkbox sample
 * 
 * @author zhaodong
 * @version 1.00 2010/04/16
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
String path = request.getContextPath();
%>
<html>
<head>
	<!-- 共通css -->
	<link rel="stylesheet" type="text/css" href="<%=path %>/css/style.css">
	
	<!-- 共通js -->
	<script type="text/javascript" src="<%=path %>/js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=path %>/js/common/util.js"></script>
	<script type="text/javascript" src="<%=path %>/js/common/commonMessage.js"></script>

	<!-- 画面用js -->
	
	<title>checkbox_sample</title>
</head>
<body ">
	<div id="div_main"  class="container showgrid">
		<s:form id="itemForm" action="checkboxSampleSubmit.action" method="post" theme="simple" namespace="/sample">
			<div class="span-23">
				<!-- 初值定义在jsp中，选中时向后台传值为1，未选中时为false -->
				<s:checkbox id="check1"  name="testValue1" fieldValue="1" value="true"/>
				<s:label for="check1"  value="测试1" cssClass="checkboxLabel"/>
				<!-- 初值定义在action的testValue2中，选中时向后台传值为true，未选中时为false -->
				<s:checkbox  id="check2"  name="testValue2" fieldValue="true" value="testValue2" label="测试checkbox2"/>
				<s:label for="check2" value="测试2" />
			</div>
			<div class="span-23">
				<!-- 一组checkbox，checkbox的内容来自testlist，是否选中由result决定，提交到后台也由result取得 -->
				<s:checkboxlist cssClass="span-3"  name="result" list="testList" listKey="id" listValue="name"  value="%{result}"/>
			</div>
			<div class="span-23">
				<!-- 一组radio，radio的内容来自testlist，是否选中由result决定，提交到后台也由result取得 -->
				<s:radio name="result"  list="testList" listKey="id" listValue="name"  value="%{result}"></s:radio>
			</div>
		<div class="span-17 text_right last">
			<input type="submit" id="createBtn" name="createBtn" value="提交"
				class="btn" />
		</div>
		</s:form>
	</div>
</body>
</html>