<%--
 * @(#)j030041_chapter_list.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 教育
--%>

<%--
 * 教材详细编辑（章节列表JSP）
 * 
 * @author zhanghaibo
 * @version 1.00 2010/07/02
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<s:if test="chapterInfoList.size > 0">
	<ul class="text_left">
		<s:iterator value="chapterInfoList" status="sta">
			<li class="prepend-${showLevel - 1}">
				<s:if test="bookInfo.bookStatus == 1">
					<s:url action="j030051InitBookContentsEdit"
						id="initBookContentsMActionUrl">
						<s:param name="bookContentInfo.bookId" value="%{bookId}"/>
						<s:param name="bookContentInfo.editNo" value="%{editNo}"/>
						<s:param name="bookContentInfo.chapterNo" value="%{chapterNo}"/>
					</s:url>
					<s:a href="%{initBookContentsMActionUrl}" target="_blank">
						<s:property value="chapterTitle" />
					</s:a>
				</s:if> 
				<s:else>
					<s:property value="chapterTitle" />
				</s:else> 
				<s:hidden name="chapterInfoList[%{#sta.index}].bookId"/>
				<s:hidden name="chapterInfoList[%{#sta.index}].editNo"/> 
				<s:hidden name="chapterInfoList[%{#sta.index}].chapterNo"/>
				<s:hidden name="chapterInfoList[%{#sta.index}].chapterTitle"/>
				<s:hidden name="chapterInfoList[%{#sta.index}].showLevel"/>
			</li>
		</s:iterator>
	</ul>
</s:if>