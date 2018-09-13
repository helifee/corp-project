<%--
 * @(#)user_role_mgr_user.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 权限管理
--%>

<%--
 * 用户角色管理画面（编辑部分JSP）
 * 
 * @author fangjiayuan
 * @version 1.00 2010/02/08
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
	<script type="text/javascript" src="../js/perm/userRoleMgr.js"></script>

	<title>用户角色管理</title>
</head>
<body>
<div class="container showgrid">
	<s:form id="formsearch" action=""  theme="simple" method="post">
		<div id="header" class="span-24">
		    <div class="span-4">
				<div class="span-1"><s:label id="deptidLbl" value="部门" /></div>
				<s:select id="deptId" name="userRoleMgrSearchInfo.deptId" list="deptList" listKey="deptId" listValue="deptNm" cssClass="span-3" theme="simple"/>
			</div>
			<div class="span-5">
				<div class="span-2 text_right"><s:label id="startDateLbl" value="入社年" /></div>
				<s:textfield id="startYear" name="userRoleMgrSearchInfo.startYear" label="入社年" cssClass="span-2" theme="simple"/>
			</div>
			<div class="span-4">
				<div class="span-1 text_right"><s:label id="userCnmLbl" value="姓名" /></div>
				<s:textfield name="userRoleMgrSearchInfo.userCnm" id="userCnm" label="姓名" cssClass="span-2" theme="simple"/>
			</div>
			<div class="span-2">
				<input type="button" id="Search" name="search"  class="btn" Value="检索" onclick="searchDeptInfo()"/>
			</div>
		</div>
	</s:form>
	<div class="span-24">
		<input type="button" id="btn_name" onClick="resize_all('MingXiXiangQing','btn_name')" value="+" class="span-1 btn" />
		<s:label id="quanshousuo" value="全收缩" />
	</div>
	<div class="span-24">
		<div id="user_role_mgr_userlist">
			<s:include value="user_role_mgr_userlist.jsp" />
		</div>
		<div id="user_role_mgr_userlistview">
			<s:include value="user_role_mgr_userview.jsp" />
		</div>
	</div>
</div>
</body>
</html>