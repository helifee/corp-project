<%--
 * @(#)J020021.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 教育子系统
--%>

<%--
 * 课程检索一览（参与课程一览子页面JSP）
 *
 * @author liuyiwei
 * @version 1.00 2010/03/15
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!-- 参与课程一览 -->
<div class="span-23 last">
	<div id="errorMessage" class="prepend-2" >
		<s:fielderror cssClass="list_reset color_red"/>
	</div>
	<table id="table_coursePaticipateList" class="datagridtt ellipsis">
		<s:if test="coursePaticipateInfoList.size > 0">
			<s:iterator value="coursePaticipateInfoList"  id="coursePaticipateInfo">
				<tr>
					<td class="text_center percent_8">
						<s:property value="courseId" />
					</td>
					<td class="text_left percent_28">
						<s:label title="%{courseName}" name="courseName"/>					
					</td>
					<td class="text_left percent_12">
						<s:label title="%{categoryName}" name="categoryName"/>					
					</td>
					<td class="text_center percent_8"><s:property value="courseConfirmStatusNm" /></td>
					<td class="text_left percent_24">
						<s:label title="%{editorsName}" name="editorsName"/>					
					</td>
					<td class="text_center">
						<s:url action="j020031InitParticipateMode" id="initJoinCourseDetailsMURL">
							<s:param name="paramCourseId" value="%{#coursePaticipateInfo.courseId}"></s:param>
						</s:url>
						<s:a href="%{initJoinCourseDetailsMURL}">
							编辑
						</s:a>
					</td>
				</tr>
			</s:iterator>
		</s:if>
	</table>
	<div class="span-23 text_center last ">	 
		 总计:<s:property value="%{coursePaticipateInfoList.size}"/>件&nbsp;
	</div>
</div>