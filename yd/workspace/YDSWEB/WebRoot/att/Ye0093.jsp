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
				<th class="percent_10">部门</th>
				<th class="percent_10">项目</th>
				<th class="percent_10">加班日期</th>
				<th class="percent_10">加班开始时刻</th>
				<th class="percent_10">加班结束时刻</th>
				<th class="percent_10">实际加班时间</th>
				<th class="percent_10">法定假日加班</th>
			</tr>
		</table>
	</div>
	<div id="table_peo" class="span-24 overflow_scr_y">
		<div class="span-24 last">
			<table id="table_peoList" class="datagrid2 ellipsis">
				<tbody>
				<s:if test="overtimeReportList.size > 0">
					<s:iterator value="overtimeReportList">
						<tr>
							<td class="text_center percent_10"><s:property value="empName" /></td>
							<td class="text_center percent_10"><s:property value="dpmId" /></td>
							<td class="text_center percent_10"><s:property value="prjName" /></td>
							<td class="text_center percent_10"><s:property value="year" /><s:property value="month" /><s:property value="day" /></td>
							<td class="text_center percent_10"><s:property value="dinnerTimeEnd" /></td>
							<td class="text_center percent_10"><s:property value="rEndTime" /></td>
							<td class="text_center percent_10">4:15:00</td>
							<td class="text_center percent_10 margin_right_15">是</td>
						</tr>
					</s:iterator>
				</s:if>		
		        </tbody>
			</table>
		</div>
	</div>
</div>

