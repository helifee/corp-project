<%--
 * @(#)user_role_mgr_role.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 权限管理
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
<%-- 生成校验js s:form action="roleUserSearchAction" method="post" validate="true" --%>
<%-- 正式运行用   s:form action="roleUserSearchAction" method="post" theme="simple"--%>
<s:form action="roleUserSearchAction" method="post" theme="simple">
	<div id="header" class="span-24">
	    <div class="span-4">
			<div class="span-1"><s:label id="lblDeptid" value="部门" /></div>
			<s:select id="selDeptId" name="userRoleMgrSearchInfo.deptId" 
				list="deptList" listKey="deptId" listValue="deptNm" cssClass="span-3" theme="simple"></s:select>
		</div>
		<div class="span-2">
			<s:submit id="search" name="search" value="检索" onclick="return clearUserList()"></s:submit>
			<s:hidden id="Hidden_deptName" name="deptNm" />
		</div>
	</div>
</s:form>
<div class="span-24">
	<input type="button" id="btn_name" value="+" class="span-1 btn" 
	onClick="resize_all('MingXiXiangQing','btn_name')"/><s:label value="全收缩" />
</div>
<div class="span-24">
	<div class="span-14" >
		<table class="span-13 datagrid2">
			<tr>
				<th class="percent_12">角色ID</th>
				<th class="percent_14">角色名名</th>
				<th class="percent_10">用户ID</th>
				<th class="percent_14">用户姓名</th>
				<th class="percent_20">有效期间 start</th>
				<th class="percent_18">有效期间 end</th>
				<th class="percent_10">角色数</th>
			</tr>
		</table>
		<div id="MingXiXiangQing" style="OVERFLOW-Y: scroll;width:525px; OVERFLOW-X:hidden;height:460px;border-bottom:1px solid; border-left:1px solid">
		     <table class="span-13 datagrid2">
				<s:if test="userRoleMgrInfo.size > 0">
					<s:iterator value="userRoleMgrInfo">
						<tr align="center">
							<td class="percent_12"><s:property value="roleId" /></td>
							<td class="percent_14"><s:property value="roleNm" /></td>
							<td class="percent_10"><s:property value="userId" /></td>
							<td class="percent_14"><s:property value="userCnm" /></td>
							<td class="percent_20"><s:property value="permitStaDate" /></td>
							<td class="percent_18"><s:property value="permitEndDate" /></td>
							<td class="percent_10"><s:property value="roleNum" /></td>
						</tr>
					</s:iterator>
				</s:if>
			</table>
		</div>
	</div>
	<s:form id="formliebiao" namespace="" theme="simple" method="post">
		<div class="span-5">
	  		<div class="span-2 text_indent_10">
	       		<s:label id="liebiao" value="用户列表" />
	    	</div>
			<div class="span-5">
				<div class="span-4">
					<div class="span-1 text_left"><s:label value="部门" /></div>
					<s:property value="deptNm" />
				</div>
				<div class="span-5">
					<div class="span-2 text_left"><s:label id="startYearLbl" value="入社年" /></div>
					<s:textfield id="userStartYear" name="perUserInfo.userStartYear" label="入社年"
					cssClass="span-2" theme="simple"/>
				</div>
				<div class="span-5">
					<div class="span-2 text_left"><s:label id="userCnmLbl" value="姓名" /></div>
					<s:textfield id="userNm" name="perUserInfo.userNm" label="姓名"
					cssClass="span-2" theme="simple"/>
				</div>
				<div class="span-5 text_right">
					<input type="button" id="Search" name="search" Value="检索" class="btn" onclick="searchUserList()"/>
					<s:hidden id="deptId" name="deptId"></s:hidden>
				</div>
			</div>
			<div id="perUserList" class="span-5">
				<s:include value="user_role_mgr_role_userlist.jsp" />
			</div>
		</div>
	</s:form>
</div>
<div class="span-14"><strong>调整结果</strong><br></div>
<div class="span-17">
<s:form id="formdeladd" method="post" theme="simple" >
<table class="datagrid2">
	<tr>
		<th class="percent_12">用户ID</th>
		<th>权限区分</th>
		<th>职位/角色ID</th>
		<th>操作人ID</th>
		<th>有效期间 start</th>
		<th>有效期间 end</th>
		<th>flag</th>
		<th>old有效期间 start</th>
	</tr>
	<s:iterator value = "perUserPermitInfo" status="stat" >
	<tr>
		<td class="percent_12"><s:textfield id="perUserPermitInfo[%{#stat.index}].userId" name="perUserPermitInfo[%{#stat.index}].userId" theme="simple"/></td>
		<td><s:textfield id="perUserPermitInfo[%{#stat.index}].permFlag" name="perUserPermitInfo[%{#stat.index}].permFlag" theme="simple"/></td>
		<td><s:textfield id="perUserPermitInfo[%{#stat.index}].posRoleId" name="perUserPermitInfo[%{#stat.index}].posRoleId" theme="simple"/></td>
		<td><s:textfield id="perUserPermitInfo[%{#stat.index}].operatorId" name="perUserPermitInfo[%{#stat.index}].operatorId" theme="simple"/></td>
		<td><s:textfield id="perUserPermitInfo[%{#stat.index}].permitStaDate" name="perUserPermitInfo[%{#stat.index}].permitStaDate" theme="simple"/></td>
		<td><s:textfield id="perUserPermitInfo[%{#stat.index}].permitEndDate" name="perUserPermitInfo[%{#stat.index}].permitEndDate" theme="simple"/></td>
		<td><s:textfield id="perUserPermitInfo[%{#stat.index}].insDelFlag" name="perUserPermitInfo[%{#stat.index}].insDelFlag" theme="simple"/></td>
		<td><s:textfield id="perUserPermitInfo[%{#stat.index}].oldPermitStaDate" name="perUserPermitInfo[%{#stat.index}].oldPermitStaDate" theme="simple"/></td>
	</tr>
	</s:iterator>
</table>
<input type="button" id="submit" value="提交" class="btn" onclick="submitPermitInfo()"/>
</s:form>
</div>
</div>
</body>
</html>