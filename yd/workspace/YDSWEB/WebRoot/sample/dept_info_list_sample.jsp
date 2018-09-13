<%--
 * @(#)dept_info_list_sample.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: SAMLPE
--%>

<%--
 * 页面按钮显示与否画面
 * 
 * @author lincheng
 * @version 1.00 2010/06/22
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<table id="table_deptList" class="datagrid2 ellipsis">
	<tr>
		<th class="percent_6">部门ID</th>
		<th class="percent_14">部门名称</th>
		<th class="percent_10">部门略称</th>
		<th class="percent_10">部门主管ID</th>
		<th class="percent_8">部门主管</th>
		<th class="percent_12">上级部门</th>
		<th>部门描述</th>
		<th class="percent_8">操作</th>
	</tr>
	<s:if test="departmentInfos.size > 0">
		<s:iterator value="departmentInfos">
			<tr>
				<td class="text_center"><s:property value="deptId" /></td>
				<td><s:property value="deptNm" /></td>
				<td><s:property value="deptSnm" /></td>
				<td class="text_center"><s:property value="leaderId" /></td>
				<td class="text_center"><s:property value="leaderNm" /></td>
				<td class="text_center"><s:property value="parentDeptNm" /></td>
				<td><s:property value="deptDesc" /></td>
				<td class="text_center">
					<!-- 用户拥有该画面的查询和修改权限时，显示修改按钮 -->
					<s:if test="hasPermit('sample','getDeptInfosSampleAction')">
						<s:a href="#this" onclick="addDepart();">添加</s:a> 
					</s:if>
					<!-- 用户拥有该画面的删除权限时，显示删除按钮 -->
					<s:if test="hasPermit('perm','getDeptInfosSampleAction')">
						<s:a href="#this">删除</s:a>
					</s:if>
				</td>
			</tr>
		</s:iterator>
	</s:if>
</table>