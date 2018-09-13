<%--		
 * @(#)k060051_editlist.jsp	
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司		
 * All rights reserved.		
 *      Project: 教育考试培训系统
 *    SubSystem: 教育子系统
--%>
<%--
 * 编辑考试一览信息(一览部分JSP)
 *
 * @author wangqingzhu
 * @version 1.00 2010/03/29
 --%>

<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div class="span-23 padding_top_2 padding_bottom_2">
<div class="span-22 prepend-h margin_top_4">

<table id="table_edtList" class="datagridtt ellipsis">
	<tr>
		<th class="percent_8">考试ID</th>
		<th class="percent_30">考试名称</th>
		<th class="percent_16">考试分类</th>
		<th class="percent_8">创建者</th>
		<th class="percent_8">更新者</th>
		<th class="percent_10">更新日期</th>
		<th>操作</th>
	</tr>
	<s:if test="k060051EditInfolist.size > 0">
		<s:iterator value="k060051EditInfolist" id="k651EdIn">
			<tr>
				<td class="text_center">
					<!--wanqiuhong 10/28 修改： 删除id链接 
						<s:url	action="k060061InitViewMode" id="k060061Url">
							<s:param name="examineId" value="%{#k651EdIn.examineId}"></s:param>
						</s:url> 
						<s:a href="%{k060061Url}"><s:property value="examineId" />
						</s:a>
					-->
					<s:property value="examineId" />
				</td>
				<td><s:label title="%{examineName}" name="examineName" /></td>
				<td><s:label title="%{categoryName}" name="categoryName" /></td>
				<td class="text_center"><s:property value="createUserId" /></td>
				<td class="text_center"><s:property value="updateUserId" /></td>
				<td class="text_center"><s:date name="updateTime"
					id="updateTimeFormat" format="yyyy-MM-dd" /> <s:property
					value="%{updateTimeFormat}" /></td>
				<td class="text_center">
					<s:if test="#k651EdIn.operate >= 2">
						<s:url	action="k060011InitManageMode" id="k060011ManageUrl">
							<s:param name="examineId" value="%{#k651EdIn.examineId}"></s:param>
						</s:url> <s:a href="%{k060011ManageUrl}">管理</s:a>
						<s:url	action="k060011InitReferenceMode" id="k060011ReferenceUrl">
							<s:param name="examineId" value="%{#k651EdIn.examineId}"></s:param>
						</s:url> <s:a href="%{k060011ReferenceUrl}">参照新建</s:a>
					</s:if>
					<s:url	action="k060061InitEditMode" id="k060061Url">
						<s:param name="examineId" value="%{#k651EdIn.examineId}"></s:param>
					</s:url> <s:a href="%{k060061Url}">编辑</s:a>
					<s:if test="#k651EdIn.operate >= 2">
						<s:url	action="k060061InitDeleteMode" id="k060061Url">
							<s:param name="examineId" value="%{#k651EdIn.examineId}"></s:param>
						</s:url> <s:a href="%{k060061Url}">删除</s:a>
					</s:if>
				</td>
			</tr>
		</s:iterator>
	</s:if>
</table>
</div>

<div class="span-23 text_center">
	<s:include value="../../common/pagerNavigation.jsp" /></div>
</div>
<div class="prepend-2" id="eddiv">
<s:fielderror></s:fielderror>
</div>
