<%--
 * @(#)G100011.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 管理子系统
--%>

<%--
 * 主画面(提醒一览JSP)
 * 
 * @author liuyiwei
 * @version 1.00 2010/04/30
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!-- 提醒一览 -->
<s:if test="messageRemindingList.size > 0">
	
	<s:iterator value="messageRemindingList">
		<div class="span-5 ellipsis last">
			<ul class="list">
	           <li>
	           	<s:a href="#" onclick="updateLoseTime('%{redirectUrl}','%{informationId}')" title="%{content}">
		   			<s:property value="content" />
		   		</s:a>
	           </li>
			</ul>
	    </div>
	    <div class="span-1 last text_right">
	     	<span  onclick="ignoreInfo(this,'${informationId}')" title="忽略" class="img_opt opt_Delete cur_pointer"></span>
	    </div>
    </s:iterator>
</s:if>