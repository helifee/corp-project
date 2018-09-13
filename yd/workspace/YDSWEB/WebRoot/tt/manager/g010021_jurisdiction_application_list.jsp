<%--
 * @(#)g010021_jurisdiction_application_list.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 权限管理
--%>

<%--
 * 权限管理画面
 * 
 * @author guozhizhou
 * @version 1.00 2010/03/12
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<s:form id="jurisdictionApplicationForm" action="" method="post" >		
		<table id="g010021_applicationList" class="datagridtt ellipsis last">
			<tr>
				<th class="percent_8">申请人ID</th>
				<th class="percent_9">申请人姓名</th>
				<th class="percent_10">申请权限</th>
				<th class="percent_13">权限分类</th>
				<th class="percent_20">有效期间</th>
				<th class="percent_18">申请时间</th>
				<th class="percent_16">理由</th>
				<th>操作</th>
			</tr>
			<s:if test="g010021ApplicationInfoList.size > 0">
				<s:iterator status="stat" value="g010021ApplicationInfoList">
					<tr align="center">
						<td><s:property value="userIdNum" /></td>
						<td><s:property value="userCnm" /></td>
						<td><s:property value="authority" /></td>
						<td><s:label title="%{categoryName}" name="categoryName"/></td>
						<td><s:date name="startTimeNm" id="startTimeNm"/>
							 <s:property value="%{startTimeNm}" />～
						<s:date name="endTimeNm" id="endTimeNm" />
						<s:property value="%{endTimeNm}" /></td>
						<td><s:div id="applyTime%{#stat.index}" cssClass="">
							<s:date name="applyTime" id="applyTimeFormat" format="yyyy-MM-dd HH:mm:ss" />
							<s:property value="%{applyTimeFormat}" />
						</s:div></td>
						<td><s:label title="%{applyReason}" name="applyReason"/></td>
						<td><s:a id="delete%{#stat.index}" cssClass="" href="#"
							onclick="deleteApplicationInfo(this, '%{userIdNum}','%{applyTimeFormat}');">删除</s:a>
						</td>
					</tr>
				</s:iterator>
			</s:if>
		</table>
	<div class="span-20 text_center">		
		<s:include	value="../../common/pagerNavigation.jsp" />	          	 
	</div>
	<div class="span-20" id = "div_err">
		<s:fielderror></s:fielderror>
	</div>
</s:form>
