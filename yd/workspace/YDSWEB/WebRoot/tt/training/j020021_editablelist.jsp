<%--
 * @(#)J020021.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 教育子系统
--%>

<%--
 * 课程检索一览（可编辑课程一览子页面JSP）
 * 
 * @author liuyiwei
 * @version 1.00 2010/03/15
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!-- 可编辑课程一览 -->
<div class="span-23 last">
	<div id="errorMessage" class="prepend-2" >
		<s:fielderror cssClass="list_reset color_red"/>
	</div>
	<table id="table_courseEditableList" class="datagridtt ellipsis">
		<s:if test="courseEditableInfoList.size > 0">
			<s:iterator value="courseEditableInfoList" id="courseEditableInfo">
				<tr>
					<td class="text_center percent_8">
						<s:url action="j020041InitManageMode" id="initModelViewURL">
							<s:param name="courseId" value="%{#courseEditableInfo.courseId}"></s:param>
						</s:url>
						<s:url action="j020031InitApproveMode" id="initApproveCourseDetailsMURL">
							<s:param name="paramCourseId" value="%{#courseEditableInfo.courseId}"></s:param>
						</s:url>
						<s:a href="%{initModelViewURL}">
							<s:property value="courseId" />
						</s:a>
					</td>
					<td class="text_left percent_24">
						<s:label title="%{courseName}" name="courseName"/>
					</td>
					<td class="text_left percent_12">
						<s:label title="%{categoryName}" name="categoryName"/>
					</td>
					<td class="text_center percent_8"><s:property value="courseConfirmStatusNm" /></td>
					<td class="text_center percent_8"><s:property value="coursePublishStatusNm" /></td>
					<td class="text_center percent_6"><s:property value="createUserName" /></td>
					<td class="text_center percent_6"><s:property value="updateUserName" /></td>
					<td class="text_center percent_8"><s:property value="updateTime" /></td>
					<td class="text_center">
						<s:if test="manageFlag == 1">
							<s:a href="j020011InitManageMode.action?courseInfo.courseId=%{courseId}" onclick="">管理</s:a>
						</s:if>
						<s:else>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						</s:else>
						<s:if test="editFlag == 1">
	                    	<s:if test="coursePublishStatusNm != '已开课'">
								<s:a href="j020031InitEditMode.action?paramCourseId=%{courseId}" onclick="">编辑</s:a>
							</s:if>
							<s:else>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							</s:else>
	                    </s:if>
	                    <s:else>
	                    	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	                    </s:else>
						<s:if test="approveFlag == 1">
							<s:a href="%{initApproveCourseDetailsMURL}">审批</s:a>
						</s:if>
						<s:elseif test="approveFlag == 0">
							<s:a href="%{initModelViewURL}">查看</s:a>
						</s:elseif>
						<s:else>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						</s:else>
						<s:if test="manageFlag == 1">
							<s:a href="j020041InitDelMode.action?courseId=%{courseId}" onclick="">删除</s:a>
						</s:if>
						<s:else>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						</s:else>
					</td>
				</tr>
			</s:iterator>
		</s:if>
	</table>
    <div class="span-23 text_center">
		<s:include	value="../../common/pagerNavigation.jsp" />
	</div>
</div>