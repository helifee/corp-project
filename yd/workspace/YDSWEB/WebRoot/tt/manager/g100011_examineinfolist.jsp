<%--
 * @(#)G100011.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 管理子系统
--%>

<%--
 * 主画面(考试一览部分JSP)
 * 
 * @author liuyiwei
 * @version 1.00 2010/04/30
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div class="span-17">
        	<div class="tt_list">
        	
        		<span class="font_weight_b margin_left_10 font_size_14">检索结果</span>
        		<s:if test="pager1 != null">
  					<s:if test="pager1.totalPagesCount >= 1">
               			 搜索到<s:property value="%{pager1.totalCount}"/>个结果。
  					</s:if>
  				</s:if>
				<s:if test="examineInfoList.size > 0">
				<s:iterator value="examineInfoList" id="examineinfo" status="stat">
			        <div class="tt_list_header ellipsis">
						<s:url	action="../testing/k060021InitTestDetails" id="k060021Url">
							<s:param name="examineId" value="%{#examineinfo.examineId}"></s:param>
						</s:url> 
						<s:a href="%{k060021Url}" title="%{examineName}"><s:property value="examineId" />&nbsp;<s:property value="examineName" /></s:a> 
						- <s:property value="examineFlgName" />&nbsp;<s:property value="examineTime" />分钟
					</div>
			        <div class="tt_list_body" style="height:auto!important;min-height:20px;">
						<s:property	value="examineComment" />
			        </div>
					<div class="tt_list_footer">
						考试状态：<s:property value="examineStatusName" />&nbsp;&nbsp;
						分类：<s:property value="categoryName" />&nbsp;&nbsp;
						<s:if test="mustExamineFlg == 2"><s:label value="必考"/></s:if><s:else><s:label value="非必考"/>&nbsp;<s:property value="attentionFlag" /></s:else>	
						<br>
						我的状态：<s:if test="examineStatus >0"><s:property value="empExamStatusName" /></s:if>
						<s:else>未报名</s:else>	&nbsp;&nbsp;
						<s:date name="applyClosingTime" id="applyClosingTimeFormat" format="yyyy-MM-dd HH:mm" />
						<s:date name="examineStartTime" id="examineStartTimeFormat" format="yyyy-MM-dd HH:mm" />
						报名截止时间：<s:property value="%{applyClosingTimeFormat}" />&nbsp;&nbsp;
						考试开始时间：<s:property value="%{examineStartTimeFormat}" />&nbsp;<s:a href="%{k060021Url}">进入</s:a>
						<br>
					</div>
				</s:iterator>
				</s:if>	
					
        	</div>

</div>

<div class="span-17 text_center last"><s:include
	value="g100011_pagerNavigation1.jsp" /></div>
<div id="errorMessage" class="prepend-2" >
	<s:fielderror cssClass="list_reset color_red"/>
</div>