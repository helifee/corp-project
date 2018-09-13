<%--
 * @(#)Yc0041.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 会议室管理
--%>

<%--
 * 开发者手册（分页一览部分JSP）
 * 
 * @author xupai
 * @version 1.00 2010/08/13
 --%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!-- 开发者手册分页信息一览 -->
<div class="span-16 text_center">
	<s:include	value="/common/pagerNavigation.jsp" />
</div>
<div class="span-16">
	<div class="span-16 bd_1s000 overflow_hd margin_top_4">
		<table id="table_peoListHead" class="datagrid2">
			<tr>
				<th class="percent_12">ID</th>
				<th class="percent_10 ">作品名</th>
				<th class="percent_12 ">英文名</th>
				<th class="percent_12  ">中文名</th>
				<th class="percent_10 ">昵称</th>
				<th>简介</th>
			</tr>
		</table>
	</div>
	<div id="table_peo" class="span-16 overflow_scr_y">
		<div class="span-16">
			<table id="table_peoList" class="datagrid2">
				<s:if test="paginationCondAList.size > 0">
					<s:iterator value="paginationCondAList">
						<tr>
							<td class="text_center percent_12"><s:property value="id" /></td>
							<td class="text_left percent_10"><s:property value="belongto" /></td>
							<td class="text_left percent_12"><s:property value="ennm" /></td>
							<td class="text_left percent_12"><s:property value="chnm" /></td>
							<td class="text_left percent_10"><s:property value="nicknm" /></td>
							<td><s:property value="introduce" /></td>
						</tr>
					</s:iterator>
				</s:if>
			</table>
		</div>
	</div>
</div>


