 <%--
 * @(#)Ya0042.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 权限管理
--%>

<%--
 * 角色一览画面（一览部分JSP）
 * 
 * @author yuchenglin
 * @version 1.00 2010/08/18
 --%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div id="div_emp_adv_search"  class="span-9 last">
	<s:form id="roleLstForm" action="ya0040InsertRoleLst" namespace="/perm" method="post">
		<div class="prepend-1 span-8 last">
			<s:checkboxlist id="perRoleIdInfos" name="perRoleIdInfos" list="perRoleInfoList" listKey="roleId" listValue="roleName" cssClass="span-4 last" value="%{result}"></s:checkboxlist>
		</div>
	</s:form>
	<div class="span-9 text_center last margin_bottom_4 margin_top_6">
		<input type="button" id="search" name="search" value="保存" class="span-2 btn" onclick="ok_btn();"/>	
	</div>	
	<div class="clear_both"></div>	
</div>

