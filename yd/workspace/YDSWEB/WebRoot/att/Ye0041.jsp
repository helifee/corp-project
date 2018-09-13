<%--
 * @(#)Ye0041.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 考勤管理
--%>

<%--
 * 
 * 
 * @author lincheng
 * @version 1.00 
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
			<div class="span-24">
				<div class="span-4">总计：<s:property value="count" />件</div>
				<div class="span-20 text_right last">
					<input type="button" value="请假申请" class="btn span-2" onclick="attInfoDetail()"/>
				</div>
			</div>
			<div class="span-24 box_border">
				<div class="span-24">
					<table id="" class="datagrid5">
						<tr>
							<th rowspan="2" class="percent_6">申请人</th>
							<th rowspan="2" class="percent_6">部门</th>
							<th rowspan="2" class="percent_8">项目组</th>
							<th rowspan="2" class="percent_8">休假起始日</th>
							<th rowspan="2" class="percent_8">休假终了日</th>
							<th rowspan="2" class="percent_4">天数</th>
							<th rowspan="2" class="percent_6">休假类型</th>
							<th rowspan="2" class="percent_16">休假理由</th>
							<th colspan="3" class="percent_18">意见</th>
							<th rowspan="2" class="percent_6">结论</th>
							<th rowspan="2" class="percent_12">操作</th>
						</tr>
						<tr>
							<th class="">组长</th>
							<th class="">部长</th>
							<th class="">领导</th>
						</tr>
					</table>
				</div>
				<div class="span-24 overflow_scr_y">
					<div class="span-24">
						<table id="araListTb" class="datagrid2">
						<s:if test="attRestAppList.size > 0">
							<s:iterator value="attRestAppList" status="att">
							<tr>
								<td class="percent_6 text_center"><s:property value="restPerName" /></td>
								<td class="percent_6 text_center"><s:property value="deptNm" /></td>
								<td class="percent_8 text_center"><s:property value="prjNm" /></td>
								<td class="percent_8 text_center"><s:property value="restStartDate" /></td>
								<td class="percent_8 text_center"><s:property value="restEndDate" /></td>
								<td class="percent_4 text_center"><s:property value="restDates" /></td>
								<td class="percent_6 text_center"><s:property value="restTypeText" /></td>
								<td class="percent_16"><s:property value="restReason" /></td>
								<td class="percent_6 text_center">
								<s:if test='leaderSay == "1"'>
									同意
								</s:if>
								<s:elseif test='leaderSay == "0"'>
									不同意
								</s:elseif>
								<s:else>
									<s:if test='ministerSay == "1" || leadershipSay == "1" || ministerSay == "0" || leadershipSay == "0"  || orgType != "prjt"'>
										--
									</s:if>
									<s:else>待审批</s:else>
								</s:else>
								</td>
								<td class="percent_6 text_center">
								<s:if test='ministerSay == "1"'>
									同意
								</s:if>
								<s:elseif test='ministerSay == "0"'>
									不同意
								</s:elseif>
								<s:else>
									<s:if test='exaAppEnd > 1 && (leaderSay == "" && (leadershipSay == "" || leadershipSay == null))'>
										
									</s:if>
									<s:elseif test='exaAppEnd > 1 && leaderSay == "1" && (leadershipSay == "" || leadershipSay == null) || orgType == "dept"'>
										待审批
									</s:elseif>
									<s:else>--</s:else>
								</s:else>
								</td>
								<td class="percent_6 text_center">
								<s:if test='leadershipSay == "1"'>
									同意
								</s:if>
								<s:elseif test='leadershipSay == "0"'>不同意</s:elseif>
								<s:else>
									<s:if test='exaAppEnd > 2 && ministerSay == "" && leaderSay != "0"'>
										
									</s:if>
									<s:elseif test='exaAppEnd > 2 && ministerSay == "1"'>待审批</s:elseif>
									<s:else>--</s:else>
								</s:else>
								</td>
								<td class="percent_6 text_center"><s:property value="appStatus" /></td>
								<td class="percent_12">
									<a href="#this" onclick='attInfoDetail("${appId}")'>查看</a>
									<s:if test="optFlag">
									<a href="#this" onClick="agreeConfirm(true, ${att.index}, '${restPerName}')">同意</a>
									<a href="#this" onClick="agreeConfirm(false, ${att.index}, '${restPerName}')">不同意</a>
									</s:if>
									<s:else>
										
									</s:else>
									<s:hidden value="%{appId}" id="appId%{#att.index}"></s:hidden>
								</td>
							</tr>
							</s:iterator>
						</s:if>	
						</table>
					</div>
				</div>
			</div>
