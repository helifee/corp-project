<%--
 * @(#)user_role_mgr_role_userlist.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 权限管理
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div class="span-5 last">
<table  class="datagrid2">
	<tr>
		<th class="percent_12">用户ID</th>
		<th class="percent_14">用户姓名</th>
	</tr>
</table>
</div>
<div class="span-5 overflow_scr_y last" style="height:336px;border-bottom:1px solid; border-left:1px solid">
<table class="datagrid2">
<!--<table class="datagrid2" style="OVERFLOW-Y: scroll;width:525px; OVERFLOW-X:hidden;height:336px;border-bottom:1px solid; border-left:1px solid">-->
<s:if test="perUserInfos.size > 0">
	<s:iterator value="perUserInfos" status="staInfo">
	<tr>
			<td  class="percent_2"><s:checkbox name="userId"
				fieldValue="%{userId}" id="%{userId}" theme="simple"/> </td>
			<td  class="percent_10" ><s:property value="userId" /></td>
			<td  class="percent_14" ><s:property  value="userNm" /></td>
			</tr>
	</s:iterator>
</s:if>
</table>
</div>
