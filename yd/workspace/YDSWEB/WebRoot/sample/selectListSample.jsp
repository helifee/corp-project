<%--
 * @(#)selectList_sample.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: SAMLPE
--%>

<%--
 * 下拉列表联动
 * 
 * @author renlong
 * @version 1.00 2010/03/23
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
	<!-- 共通css -->
	<link rel="stylesheet" type="text/css" href="<%=basePath %>css/style.css">
	
	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/commonMessage.js"></script>

	<!-- 画面用js -->
	<script type="text/javascript" src="<%=path %>/js/sample/selectListSample.js"></script>
	
	<title>下拉列表联动</title>
</head>
<body onload="initForm()">
	<div id="div_main"  class="container showgrid">
		<div class="span-24 text_center">
			<h2>下拉列表联动</h2>
		</div>
		<s:form id="itemForm" action="getSelectListAction.action" method="post" theme="simple" namespace="/sample">
			<div id="select_div" class="span-18">
				<div class="span-2 text_right">
					<s:label id="label_nation" value="国家：" />
				</div>
				<div class="span-4">
					<select id="nationId" name="nationId" defaultValue="${nationId}"></select>
					<s:label id="nationIdStatus" name="nationIdStatus" value="　" keep="1"/>
				</div>
				<div class="span-2 text_right">
					<s:label id="label_province" value="省份：" />
				</div>
				<div class="span-4">
					<select id="provinceId" name="provinceId" defaultValue="${provinceId}"></select>
					<s:label id="provinceIdStatus" name="provinceIdStatus" value="　" keep="1"/>
				</div>
				<div class="span-2 text_right">
					<s:label id="label_city" value="城市：" />
				</div>
				<div class="span-4 last">
					<select id="cityId" name="cityId" defaultValue="${cityId}"></select>
					<s:label id="cityIdStatus" name="cityIdStatus" value="　" keep="1"/>
				</div>
			</div>
			<div class="span-18">
				<div class="span-2 text_right">
					<s:label id="label_nation" value="普通List：" />
				</div>
				<div class="span-4">
					<s:select list="normalList"/>
				</div>
			</div>
		</s:form>
		<div class="span-17 text_right last">
		<input type="button" id="createBtn" name="createBtn" value="提交"
			class="btn" onclick="submitInfo()"/>
	</div>
	</div>
</body>
</html>