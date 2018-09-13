<%--
 * @(#)log_search_table.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 权限管理
--%>

<%--
 * 系统日志检索（一览部分JSP）
 * 
 * @author guozhizhou
 * @version 1.00 2010/02/05
 --%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div class="span-24  margin_top_2">
	<div class="span-24 text_center">		
		<s:include	value="../common/pagerNavigation.jsp" />	          	 
	</div>
	<div class="span-24 box_border">
		<table id="pagerCommonList" class="datagrid2">
			<tr>
				<th class="percent_16">操作时间</th>
				<th class="percent_8">操作人</th>
				<th class="percent_10">操作人IP</th>
				<th class="percent_16">子系统/机能</th>
				<th>日志内容</th>
			</tr>
			<s:if test="sysLogSearchInfoList.size > 0">
				<s:iterator value="sysLogSearchInfoList">
					<tr align="center">
						<td><s:property value="opTime" /></td>
						<td><s:property value="userCnm" /></td>
						<td><s:property value="logIp" /></td>	
						<td><s:property value="diffName" /></td>
						<td><s:property value="logMsg" /></td>
					</tr>
				</s:iterator>
			</s:if>
		</table>
	</div>
	<div class="span-24 text_center">		
		<s:include	value="../common/pagerNavigation.jsp" />	          	 
	</div>
</div>
