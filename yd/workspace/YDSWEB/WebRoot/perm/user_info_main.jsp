<%--
 * @(#)user_info_main.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 权限管理
--%>

<%--
 * 部门管理画面（主页面JSP）
 * 
 * @author chenyuer
 * @version 1.00 2010/01/07
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

	<!-- 共通css -->
	<link href="../css/style.css" rel="stylesheet" type="text/css">

	<!-- 共通js -->
	<script type="text/javascript" src="../js/common/prototype.js"></script>
	<script type="text/javascript" src="../js/common/util.js"></script>
	<script type="text/javascript" src="../js/common/commonMessage.js"></script>
	<script type="text/javascript" src="../js/My97DatePicker/WdatePicker.js"></script>

	<!-- 画面用js -->
	<script type="text/javascript" src="../js/perm/userInfo.js"></script>
	
</head>
<body onload="initForm()">
<div id="div_main" class="container showgrid" >
	<div class="span-24 text_center">
		<h2>用户基本信息</h2>
	</div>
	<!-- 新建/修改用户基本信息画面 -->
	<%-- 生成校验js action="insertUserInfoAction" method="post" namespace="/perm" validate="true" --%>
	<%-- 正式运行用   action="" method="post" theme="simple" --%>
	<s:form id="userInfoUpdForm" action="insertUserInfoAction" method="post" theme="simple" >
		<div class="span-24 module">
	    	<div class="module_header" onclick="resize('div_perm_userInfoUptView')">
				<div class="icon">
					<a id="modifyIcon" class="img_opt opt_FillDown"></a>
					<span id="modifyTitle" >新建/修改用户基本信息</span>
				</div>
			</div>	
			<div id="div_perm_userInfoUptView" class="module_body">
				<s:include value="user_info_upd_view.jsp"/>
			</div>
		</div>
	</s:form>

	<!-- 检索用户基本信息画面 -->
	<%-- 生成校验js action="searchUserInfoAction" method="post" namespace="/perm" validate="true" --%>
	<%-- 正式运行用   action="" method="post" theme="simple" --%>
	<s:form id="userInfoSltForm" name="userInfoSltForm" action="" method="post" theme="simple">
		<div class="span-24 module">
			<div class="module_header" onclick="resize('div_perm_userInfoSltView')">
				<div class="icon">
					<a id="searchIcon" class="img_opt opt_FillRight"></a>
					<span id="searchTitle" >检索用户基本信息</span>
				</div>
			</div>
			<div id="div_perm_userInfoSltView" class="module_body">
				<s:include value="user_info_slt_view.jsp" />
			</div>
		</div>
	</s:form>

	<!-- 用户基本信息列表画面 -->
	<s:form id="userInfoListForm" action="" method="post" theme="simple">
		<div id="div_perm_userInfoList">
		<s:include value="user_info_list.jsp" /></div>
	</s:form>
</div>
</body>
</html>