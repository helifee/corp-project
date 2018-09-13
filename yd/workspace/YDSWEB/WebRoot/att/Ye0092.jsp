<%--
 * @(#)Ye0092.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 考勤系统
--%>

<%--
 * 考勤月报画面（一览部分JSP）
 * 
 * @author zhangdaoqiang
 * @version 1.00 2010/05/17
 --%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<!-- 员工一览列表画面 -->
<div class="span-24 bd_1s000 overflow_hd margin_top_4">
	<div class="span-24">
		<table id="table_peoListHead" class="datagrid2 ellipsis">
			<tr>
				<th class="percent_10">姓名</th>
				<th class="percent_10">出勤</th>
				<th class="percent_10">欠勤</th>
				<th class="percent_10">事假</th>
				<th class="percent_10">病假</th>
				<th class="percent_10">旷工</th>
				<th class="percent_10">特休</th>
				<th class="percent_10">年休</th>
			</tr>
		</table>
	</div>
	<div id="table_peo" class="span-24 overflow_scr_y">
		<div class="span-24 last">
			<table id="table_peoList" class="datagrid2 ellipsis">
				<tbody>
				<s:if test="attMonReportList.size > 0">
					<s:iterator value="attMonReportList">
						<tr>
							<td class="text_center percent_10"><s:property value="empName" /></td>
							<td class="text_center percent_10" ><s:property value="attendDays" /></td>
							<td class="text_center percent_10">5</td>
							<td class="text_center percent_10"><s:property value="perDays" /></td>
							<td class="text_center percent_10"><s:property value="sickDays" /></td>
							<td class="text_center percent_10"><s:property value="outDays" /></td>
							<td class="text_center percent_10"><s:property value="specialDays" /></td>
							<td class="text_center percent_10"><s:property value="annRestDays" /></td>
						</tr>
					</s:iterator>
				</s:if>	
		        </tbody>
			</table>
		</div>
	</div>
</div>

