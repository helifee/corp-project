<%--
 * @(#)J030071_content.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 教育子系统
--%>

<%--
 * 教材内容浏览 (教材内容详细JSP)
 *  
 * @author yukunpeng
 * @version 1.00 2010/03/11
 --%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<s:if test="\"\" != chapterInfo.innerIndex">
<s:if test="null != chapterInfo.innerIndex">
	<div class="bgclr_fff overflow_scr_x module" style="height:auto!important;" id="relativeLink">
		<div class="text_center">
			章节内目录
		</div>
		${chapterInfo.innerIndex}
	</div>
</s:if>
</s:if>


