<%--
 * @(#)Yb0070.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 人员管理
--%>
<%--
 * 员工选择画面
 * 
 * @author tengchanglong
 * @version 1.00 2010/07/29
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
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<!-- 共通css -->
	<link href="<%=basePath%>${session.userTheme}" rel="stylesheet" type="text/css">
	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/formValidation.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/orgMap.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/common/JsNameFilter.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/common/JsInputFilter.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/common/commonMessage.js"></script>
	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/employee/Yb0050.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/employee/Yb0051.js"></script>
	
	<title>组织结构图</title>
</head>
<body>
<jsp:include page="../common/commonPage.jsp"></jsp:include>
	<div class="ydscontainer">
		<div class="span-24">		
			<div id="orgMapContainer" class="font_mono"></div>
			<div id="buttonDiv" class="prepend-22 span-2 float_l margin_top_10 text_right">
				<input type="button" value="返回上级" onclick="funcReturn();" class="span-2 btn"/>
			</div>
			<!-- 部门信息弹出层  -->
			<div id="DeptInfoPage"></div> 
			<!-- 人员选择弹出层  -->
			<div id="empSelect" class="none">
				<iframe id="empSelectPage" frameBorder=0 class="overflow_hd"></iframe>  
			</div> 

		</div>
	</div>
</body>
</html>