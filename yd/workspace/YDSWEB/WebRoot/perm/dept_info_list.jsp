<%--
 * @(#)dept_info_list.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 权限管理
--%>

<%--
 * 部门管理画面（一览部分JSP）
 * 
 * @author renlong
 * @version 1.00 2010/01/07
 --%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<s:token />
<!-- 部门列表画面 -->
<s:hidden id="hideFlg" name="hideFlg" />
<div class="span-24 padding_top_2 padding_bottom_2">
	<div class="span-12 text_left">
		<s:label value="部门总数" />
		<s:label id="deptInfosCnt" name="deptInfosCnt" />
	</div>
	<div class="span-12 text_right last">
		<input type="button" id="createBtn" name="createBtn" value="新建"
			class="btn" onclick="createDeptInfo()"/>
	</div>
</div>
<div class="span-24">
	<table id="table_deptList" class="datagrid2">
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
		<s:if test="departmentInfoList.size > 0">
			<s:iterator value="departmentInfoList">
				<tr>
					<td class="text_center"><s:property value="deptId" /></td>
					<td><s:property value="deptNm" /></td>
					<td><s:property value="deptSnm" /></td>
					<td class="text_center"><s:property value="leaderId" /></td>
					<td class="text_center"><s:property value="leaderNm" /></td>
					<td class="text_center"><s:property value="parentDeptNm" /></td>
					<td><s:property value="deptDesc" /></td>
					<td class="text_center">
						<s:a href="#this" onclick="modifyDeptInfo('%{deptId}')">修改</s:a> 
						<s:a href="#this" onclick="deleteDeptInfo('%{deptId}')">删除</s:a>
					</td>
				</tr>
			</s:iterator>
		</s:if>
	</table>
</div>

