<%--
 * @(#)J020021.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 教育子系统
--%>

<%--
 * 课程检索一览（可审批课程一览子页面JSP）
 * 
 * @author liuyiwei
 * @version 1.00 2010/03/15
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!-- 可审批课程一览 -->
<div class="span-16 last">
	<div id="errorMessage" class="prepend-2" >
		<s:fielderror cssClass="list_reset color_red"/>
	</div>
	<table id="table_courseConfirmableList" class="datagridtt ellipsis">
		<s:if test="courseConfirmableInfoList.size > 0">
			<s:iterator value="courseConfirmableInfoList" id="courseConfirmableInfo">
				<tr>
					<td class="text_center span-2">
						<s:property value="courseId" />
					</td>
					<td class="text_left span-6">
						<s:label title="%{courseName}" name="courseName"/>
					</td>
					<td class="text_left span-3">
						<s:label title="%{categoryName}" name="categoryName"/>
					</td>
					<td class="text_center span-2"><s:property value="courseConfirmStatusNm" /></td>
					<td class="text_center">
						<s:url action="j020031InitApproveMode" id="initApproveCourseDetailsMURL">
							<s:param name="paramCourseId" value="%{#courseConfirmableInfo.courseId}"></s:param>
						</s:url>
						<s:a href="%{initApproveCourseDetailsMURL}">
							<s:if test="courseConfirmStatus == 2">审批</s:if>
							<s:else>查看</s:else>					
						</s:a>
					</td>
				</tr>
			</s:iterator>
		</s:if>
	</table>
	<div class="span-23 text_center last ">	 
		 总计:<s:property value="%{courseConfirmableInfoList.size}"/>件&nbsp;
	</div>
</div>