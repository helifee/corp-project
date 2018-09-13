<%--
 * @(#)k060061_child_list.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试系统
 *    SubSystem: 考试子系统
--%>

<%--
 * 考试总体设计及生成（子考试一览页面）
 * 
 * @author zhanghaibo
 * @version 1.00 2010/07/02
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>	
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<s:if test="childExamineInfoList.size > 0">
	<div class="span-3 text_left font_weight_b">
		<s:label value="生成考试一览："/>
	</div>
	<div class="span-22">
		<table class="datagridtt">
			<tr>
				<th class="span-2">考试ID</th>
				<th class="span-4">考试名称</th>
				<th class="span-3">通知提醒日期</th>
				<th class="span-3">报名截止时间</th>
				<th class="span-3">考试开始时间</th>
				<th class="span-3">考试方式</th>
				<th class="span-3">状态</th>
				<th>操作</th>
			</tr>
		</table>
	</div>
</s:if>
<div class="span-22">
<table id="childExamineInfoTb" class="datagridtt ellipsis">
<s:if test="childExamineInfoList.size > 0">
	<s:iterator value="childExamineInfoList" status="sta">
	<tr>
		<td id="childExamineId${sta.index}" class="span-2 text_center">
			<s:url action="k060071InitTestDetailsViewMode?paramTestId=%{examineId}" id="getK060071Url"></s:url>
			<s:a id="childExamineIdA%{#sta.index}" href="%{getK060071Url}"><s:property value="examineId" /></s:a>
			<label id="childExamineIdLb${sta.index}"><s:property value="examineId" /></label>
		</td>
		<td class="span-4">
			<s:label title="%{examineName}" name="examineName" />
		</td>
		<td class="span-3 text_center">
			<s:if test="examineNotifyDate != null">
			<s:date name="examineNotifyDate" id="examineNotifyDateFormat" format="yyyy-MM-dd" />
			<s:property value="%{examineNotifyDateFormat}" />
			</s:if>
		</td>
		<td class="span-3 text_center">
			<s:if test="applyClosingDate != null">
			<s:date name="applyClosingDate" id="applyClosingDateFormat" format="yyyy-MM-dd HH:mm" />
			<s:property value="%{applyClosingDateFormat}" />
			</s:if>
		</td>
		<td class="span-3 text_center">
			<s:if test="examineStartDate != null">
			<s:date name="examineStartDate" id="examineStartDateFormat" format="yyyy-MM-dd HH:mm" />
			<s:property value="%{examineStartDateFormat}" />
			</s:if>
		</td>
		<td class="span-3 text_center">
			<s:if test="examineEndDate != null">
			<s:label id="examineFlgNM" name="examineFlgNM" />
			<s:property value="%{examineEndDateFormat}" />
			</s:if>
		</td>
		<td class="span-3 text_center">
			<s:property value="examineStatusName"/>
			<s:hidden id="examineStatus%{#sta.index}" name="childExamineInfoList[%{#sta.index}].examineStatus"></s:hidden>
		</td>
		<td class="text_center">
			<s:url action="k060071InitTestDetailsEditMode?paramTestId=%{examineId}" id="getK060071Url"></s:url>
			<s:a id="modifyChildExamineA%{#sta.index}" href="%{getK060071Url}">编辑</s:a>
			<label id="modifyChildExamineLb${sta.index}">编辑</label>
			<s:url action="k060071InitTestDetailsDeleteMode?paramTestId=%{examineId}" id="deleteChildExamineUrl"></s:url>
			<s:a id="deletaChildExamineA%{#sta.index}" href="%{deleteChildExamineUrl}" >删除</s:a>
			<label id="deletaChildExamineLb${sta.index}">删除</label>
		</td>
	</tr>
	</s:iterator>
</s:if>

</table>
</div>
