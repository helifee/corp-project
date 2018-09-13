<%--
 * @(#)G100011.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 管理子系统
--%>

<%--
 * 主画面(课程一览部分JSP)
 * 
 * @author liuyiwei
 * @version 1.00 2010/04/26
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div class="span-17">
	<div class="tt_list">

        <span class="font_weight_b margin_left_10 font_size_14">检索结果</span>
      	<s:if test="pager != null">
  			<s:if test="pager.totalPagesCount >= 1">
               	搜索到<s:property value="%{pager.totalCount}"/>个结果。
  			</s:if>
  		</s:if>
		<s:if test="courseInfoList.size > 0">
		<s:iterator value="courseInfoList" id="courseinfo" status="stat">
	        <div class="tt_list_header ellipsis">
					<s:url action="../training/j020041InitStudyMode" id="j020041Url">
						<s:param name="courseId" value="%{#courseinfo.courseId}"></s:param>
					</s:url> <s:a href="%{j020041Url}" title="%{courseName}"><s:property value="courseId" />&nbsp;<s:property value="courseName" />
					</s:a>
			</div>
	        <div class="tt_list_body" style="height:auto!important;min-height:20px;">
				<s:property	value="courseAbstract" />
	        </div>
			<div class="tt_list_footer">
				发布日期：<s:property value="updateTime" />
				&nbsp;分类：<s:property value="categoryName" />
				&nbsp;<s:if test="necessaryFlag == 1"><s:label value="必修"/></s:if><s:else><s:label value="非必修"/>&nbsp;<s:property value="attentionFlag" /></s:else>
			</div>
		</s:iterator>
		</s:if>	
	</div>
</div>

<div class="span-17 text_center last">
<s:include value="g100011_pagerNavigation.jsp" />
</div>
<div id="errorMessage" class="prepend-2" >
	<s:fielderror cssClass="list_reset color_red"/>
</div>