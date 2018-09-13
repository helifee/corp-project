<%--
 * @(#)dept_info_main.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 权限管理
--%>

<%--
 * 部门管理画面（主页面JSP）
 * 
 * @author renlong
 * @version 1.00 2010/01/07
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<!-- 共通css -->
	<link rel="stylesheet" type="text/css" href="../css/style.css">

	<!-- 共通js -->
	<script type="text/javascript" src="../js/common/prototype.js"></script>
	<script type="text/javascript" src="../js/common/util.js"></script>
	<script type="text/javascript" src="../js/common/commonMessage.js"></script>

	<!-- 画面用js -->
	<script type="text/javascript" src="../js/perm/deptInfo.js"></script>

	<title>部门信息</title>
</head>
<body onload="initForm()">
<div id="div_dept_main"  class="container showgrid">
	<div class="span-24 text_center">
		<h2>部门信息</h2>
	</div>
	<!-- 部门详细信息画面 -->
	<%-- 生成校验js action="addDeptInfoAction" method="post" namespace="/perm" validate="true" --%>
	<%-- 正式运行用   action="" method="post" theme="simple" --%>
	<s:form id="deptInfoForm" action="" method="post" theme="simple">
		<div class="span-24 module">
			<div class="module_header" onclick="resize()">
				<div class="icon">
					<a id="deptIcon" class="img_opt opt_FillDown"></a>
					<span id="deptModTitle"></span>
				</div>
			</div>
			<div id="div_perm_deptInfoView" class="module_body">
				<s:include value="dept_info_view.jsp" />
			</div>
		</div>
	</s:form>
	<!-- 部门列表画面 -->
	<div id="div_perm_deptInfoList">
		<s:include value="dept_info_list.jsp" />
	</div>
</div>
</body>
</html>