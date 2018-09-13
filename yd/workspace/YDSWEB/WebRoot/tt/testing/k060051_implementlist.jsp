<%--		
 * @(#)k060051_implementlist.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司		
 * All rights reserved.		
 *      Project: 教育考试培训系统
 *    SubSystem: 教育子系统
--%>
<%--
 * 考试检索一览（一览部分JSP）
 *
 * @author wangqingzhu
 * @version 1.00 2010/03/29
 --%>

<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<div class="span-23 padding_top_2 padding_bottom_2" >
<div class="span-22 prepend-h margin_top_10">

<table id="table_impList" class="datagridtt ellipsis">
	<tr>
		<th class="percent_8">考试ID</th>
		<th class="percent_24">考试名称</th>
		<th class="percent_12">考试开始时间</th>
		<th class="percent_12">考试结束时间</th>
		<th class="percent_10">考试状态</th>
		<th class="percent_8">公开状态</th>
		<th>操作</th>
	</tr>
	<s:if test="k060051ImplementInfolist.size > 0">
		<s:iterator value="k060051ImplementInfolist" id="k651ImpIn">
			<tr>
				<td class="text_center">
					<!--wanqiuhong 10/28 修改： 删除id链接 
						<s:url	action="k060071InitTestDetailsViewMode" id="k060071Url">
							<s:param name="paramTestId" value="%{#k651ImpIn.examineId}"></s:param>
						</s:url> 
						<s:a href="%{k060071Url}"><s:property value="examineId" />
						</s:a>	 
					-->
					<s:property value="examineId" />			
				</td>
				<td><s:label title="%{examineName}" name="examineName" /></td>
				<td class="text_center"><s:date name="examineStartDate"
					id="examineStartDateFormat" format="yyyy-MM-dd HH:mm" /><s:property
					value="%{examineStartDateFormat}" />
				</td>
				<td class="text_center"><s:date name="examineEndDate"
					id="examineEndDateFormat" format="yyyy-MM-dd HH:mm" /><s:property
					value="%{examineEndDateFormat}" />
				</td>	
				<td class="text_center"><s:property value="examineStatusName" /></td>
				<td class="text_center">
				<s:if test="#k651ImpIn.examineVisibleFlg == 1">
					<s:label value="已发布"></s:label>
				</s:if><s:else>
					<s:label value="未发布"></s:label>				
				</s:else>
				</td>
				<td class="text_center">
				<s:if test="#k651ImpIn.examineStatus == 2">
					<s:url action="k060071InitTestDetailsApproveMode" id="k060071approveUrl">
						<s:param name="paramTestId" value="%{#k651ImpIn.examineId}"></s:param>
					</s:url> <s:a href="%{k060071approveUrl}">审批考试</s:a>
				</s:if>
				<s:elseif test="#k651ImpIn.examineStatus == 3 && #k651ImpIn.timeFlg == 1 && #k651ImpIn.examineVisibleFlg == 1">
					<s:url action="k060071InitTestDetailsApproveMode" id="k060071douapproveUrl">
						<s:param name="paramTestId" value="%{#k651ImpIn.examineId}"></s:param>
					</s:url> <s:a href="%{k060071douapproveUrl}">撤销发布</s:a>
				</s:elseif>
				<s:elseif test="#k651ImpIn.examineStatus == 5">
					<s:url action="k060081ApproveExamApply" id="k060071enrollApproval">
						<s:param name="examineId" value="%{#k651ImpIn.examineId}"></s:param>
						<s:param name="startupId" value="K060051"></s:param>
					</s:url> <s:a href="%{k060071enrollApproval}">报名审批</s:a>
				</s:elseif>
				<s:elseif test="#k651ImpIn.examineStatus == 6"><!--
					<s:url action="k060081ApproveExamApply" id="k060071enrollApproval">
						<s:param name="examineId" value="%{#k651ImpIn.examineId}"></s:param>
						<s:param name="startupId" value="K060051"></s:param>
					</s:url> <s:a href="%{k060071enrollApproval}">继续报名审批</s:a>
						
					--><s:url action="k060151InitCreatePapers" id="k060151Url">
						<s:param name="examineId" value="%{#k651ImpIn.examineId}"></s:param>
					</s:url> <s:a href="%{k060151Url}">生成试卷</s:a>
				</s:elseif>
				<s:elseif test="#k651ImpIn.examineStatus == 7">
					<s:url	action="k060151InitCreatePapers" id="k060151Url">
						<s:param name="examineId" value="%{#k651ImpIn.examineId}"></s:param>
					</s:url> <s:a href="%{k060151Url}">重新生成试卷</s:a>
					<s:url action="k060111InitMarkingAssign" id="k060111InitMarkingAssignUrl">
						<s:param name="examineId" value="%{#k651ImpIn.examineId}"></s:param>
					</s:url> <s:a href="%{k060111InitMarkingAssignUrl}">任务分配</s:a>
				</s:elseif>
				<s:elseif test="#k651ImpIn.examineStatus == 8">
					<s:url action="k060111InitMarkingAssign" id="k060111InitMarkingAssignUrl">
						<s:param name="examineId" value="%{#k651ImpIn.examineId}"></s:param>
					</s:url> <s:a href="%{k060111InitMarkingAssignUrl}">任务重新分配</s:a>
				</s:elseif>
				<s:elseif test="#k651ImpIn.examineStatus == 9 || #k651ImpIn.examineStatus == 10">
					<s:if test="#k651ImpIn.examineStatus == 9">
						<s:a href="#" onclick="gradeCollect('%{examineId}', '%{updateTimepa}')">分数汇总</s:a>
					</s:if>
					<s:if test="#k651ImpIn.examineStatus == 10">
						<s:a href="#" onclick="recordPublish('%{examineId}', '%{updateTimepa}')">成绩发布</s:a>
					</s:if>
					<s:url	action="k060121InitMarkTaskList" id="k060121Url">
						<s:param name="startupId" value="K060051"></s:param>
						<s:param name="examineId" value="%{#k651ImpIn.examineId}"></s:param>
					</s:url> <s:a href="%{k060121Url}">评分</s:a>
				</s:elseif>
				<s:elseif test="#k651ImpIn.examineStatus == 11"><!--
					<s:if test="#k651ImpIn.examineFlg != 2">
						<s:a href="#" onclick="renewGrade('%{examineId}', '%{updateTimepa}', %{examineStatus})">重新评分</s:a>
					</s:if>
					--><s:a href="#" 
						onclick="window.open('k070031InitScoreDetails.action?examineId=%{#k651ImpIn.examineId}')" >
						成绩查看</s:a>
				</s:elseif>
				<s:if test="#k651ImpIn.examineStatus != 2 && #k651ImpIn.timeFlg == 1">
					<s:url	action="k060071InitTestDetailsRepairMode" id="k060071ImpUrl">
						<s:param name="paramTestId" value="%{#k651ImpIn.examineId}"></s:param>
					</s:url> <s:a href="%{k060071ImpUrl}">考试实施修改</s:a>
				</s:if>
				</td>	
			</tr>
		</s:iterator>
	</s:if>
</table>
</div>

<div class="span-23 text_center">
	<s:include value="pagerNavigation1.jsp" />
</div>
</div>
<div class="prepend-2" id="imdiv">
<s:fielderror></s:fielderror>
</div>
