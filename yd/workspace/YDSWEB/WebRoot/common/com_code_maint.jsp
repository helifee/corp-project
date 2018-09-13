<%--
 * @(#)com_code_maint.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 
--%>

<%--
 * 子系统参数维护
 * 
 * @author renlong
 * @version 1.00 2010/06/09
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>  
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<!-- 共通css -->
	<link href="<%=basePath%>${session.userTheme}" rel="stylesheet" type="text/css">

	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>/js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>/js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>/js/common/commonMessage.js"></script>
	<script type="text/javascript" src="<%=basePath %>/js/common/formValidation.js"></script>

	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>/js/common/comCodeMaint.js"></script>

	<title>共通子系统参数维护</title>
</head>
<body onload="initForm()">
<jsp:include page="../common/commonPage.jsp"></jsp:include>
	<div id="div_dept_main"  class="ydscontainer">
		<div class="span-24 text_left">
			<div class="span-2  text_right">
    			<s:label id="typeListLbl" value="区分类型"/>
    		</div>	
			<s:select id="typeId" name="typeId" list="typeInfoList" listKey="typeId" 
				listValue="typeName" value="typeId" cssClass="span-3" onchange="getDiffInfoList()"/>
		</div>
		
		<!-- 分割线  -->
		<div class="span-24 separator"></div>
		
		<div class="span-24 text_right">
			<input type="button" id="sortBtn" name="sortBtn" value="排 序"
				class="btn span-2" onclick="sortDiffInfoList()" />
			<input type="button" id="creatBtn" name="creatBtn" value="新 建"
				class="btn span-2" onclick="creatDiffInfo()" />
		</div>
		<!-- 子系统参数列表画面 -->
		<div id="div_com_code_maintList">
			<s:include value="com_code_list.jsp" />
		</div>
		<!-- 区分信息 -->
		<div id="div_diff_info" class="none"></div>
		<!-- 区分信息排序 -->
		<div id="div_diff_sort" class="none"></div>
	</div>
</body>
</html>