<%--
 * @(#)Yc0041.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 会议室管理
--%>

<%--
 * 会议室预约情况（一览部分JSP）
 * 
 * @author xupai
 * @version 1.00 2010/07/23
 --%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!-- 会议室预约情况一览 -->
<div class="span-24 text_center">
	<s:include	value="/common/pagerNavigation.jsp" />
</div>
<div class="span-24 bd_1s000 overflow_hd margin_top_4">
	<div class="span-24 ">
			<table id="table_peoListHead" class="datagrid2 ">
				<tr>
					<th class="percent_18">日期</th>
					<th class="percent_12">时间</th>
					<th class="percent_10">申请者</th>
					<th class="percent_8">参加人数</th>
					<th class="percent_40">会议主题</th>
					<th>详细</th>
				</tr>
			</table>
		</div>
	<div id="table_peo" class="span-24 overflow_scr_y">
	<div class="span-24">
		<table id="table_peoList" class="datagrid2">
			<s:if test="metDaymetInfoLst.size > 0">
				<s:iterator value="metDaymetInfoLst"   id = "metDaymetInfoLst">
				<tr>
					<td class="text_center percent_18"><s:property value="metDate" />（<s:property value="metWeekDay" />）</td>
					<td class="text_center percent_12"><s:property value="metStaTime.substring(0,5)" />~<s:property value="metEndTime.substring(0,5)" /></td>
					<td class="text_center percent_10"><s:property value="applyUserNm" /></td>
					<td class="text_right percent_8"><s:property value="joinUserCnt" /></td>
					<td class="text_left percent_40"><s:label name="metTopic" title="%{metTopic}"/></td>
					<td class="text_center">
						<s:if test="applyUserId == yc0040CondA.loginUserId || permitFlg == 1">
								<s:url action="yc0030Init" id="yc0030InitUrl">	
									<s:param name="fromId" value="'yc0040'"></s:param>
									<s:param name="viewMode" value="1"></s:param>
									<s:param name="yc0030MetInfo.metId" value="metId"></s:param>
									<s:param name="yc0030MetInfo.startDate"><s:date name="metDate"/></s:param>
									<s:param name="yc0030MetInfo.startHour" value="startHhTime"></s:param>
									<s:param name="yc0030MetInfo.startMinute" value="startMmTime"></s:param>
								</s:url>
								<s:a href="#this" onclick="popMetReserve('%{yc0030InitUrl}');">详细</s:a>
						</s:if>
						<s:else>详细
						</s:else> 
						 
 					</td>
				</tr>
			</s:iterator>
		</s:if>		
		</table>
	</div>
	</div>	
</div>