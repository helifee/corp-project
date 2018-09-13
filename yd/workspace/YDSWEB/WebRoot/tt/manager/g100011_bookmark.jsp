<%--
 * @(#)G100011.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 管理子系统
--%>

<%--
 * 主画面(书签一览JSP)
 * 
 * @author liuyiwei
 * @version 1.00 2010/04/30
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!-- 书签一览 -->
<s:if test="bookMarkList.size > 0">

	<s:iterator value="bookMarkList">
	<div class="span-5 ellipsis last">
		<ul class="list">
           <li>
           	<s:url action="../training/j030071InitByBookmarkerMode2" id="loadPageJ030071Mode2Url">
	           	<s:param name="bookId" value="bookId"></s:param>
           	</s:url>
           	
     			<s:a href="%{loadPageJ030071Mode2Url}" title="%{bookmarkContent}"><s:property value="bookmarkContent"/></s:a>
           </li>
		</ul>
    </div>
    <div class="span-1 last">
     	<s:a href="#" onclick="delBookMark('%{bookId}')" title="删除" cssClass="img_opt opt_Delete"></s:a>
    </div>
    </s:iterator>
</s:if>