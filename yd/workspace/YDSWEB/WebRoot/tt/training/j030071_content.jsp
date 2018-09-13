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

	<s:hidden id="curOrder"   name ="chapterInfo.showOrder"/>
	<s:hidden id="bookId"     name ="chapterInfo.bookId"/>
	<s:hidden id="editNo"     name ="chapterInfo.editNo"/>
	<s:hidden id="chapterNo"  name ="chapterInfo.chapterNo"/>
	<div>
	 	<div class="title_1" >
	 		<span class="font_size_16" id="chapterTitle">${chapterInfo.chapterTitle}</span>
	 	</div>
	 	<div class="text_center">
		 	<s:date name="chapterInfo.updateTime" id="updateTimeFormat" format="yyyy-MM-dd HH:mm:ss" />
			<s:property value="%{updateTimeFormat}" />
	 	</div>
		<div class="bgclr_fff overflow_scr_x module" style="height:auto!important;min-height:524px;">${chapterInfo.bookContent}<br></div>   
	</div>
