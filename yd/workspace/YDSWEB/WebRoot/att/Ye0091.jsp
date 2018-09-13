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
				<th class="percent_10" rowspan="2">姓名</th>
				<th class="percent_10" rowspan="2">考勤不完整(日)</th>
				<th class="percent_50" colspan="5">待审批事项(件)</th>
			</tr>
			<tr>
				<th class="percent_10">请假申请</th>
				<th class="percent_10">考勤更正</th>
				<th class="percent_10">加班申请</th>
				<th class="percent_10">年休延期</th>
				<th class="percent_10">换休延期</th>
			</tr>
		</table>
	</div>
	<div id="table_peo" class="span-24 overflow_scr_y">
		<div class="span-24 last">
			<table id="table_peoList" class="datagrid2 ellipsis">
				<tbody>
				<s:if test="attInfoUncorList.size > 0">
					<s:iterator value="attInfoUncorList">
						<tr>
							<td class="text_center percent_10"><s:property value="attperName" /></td>
							<td class="text_center percent_10"><s:property value="cnt1" /></td>
							<td class="text_center percent_10"><s:property value="cnt3" /></td>
							<td class="text_center percent_10"><s:property value="cnt2" /></td>
							<td class="text_center percent_10"><s:property value="cnt4" /></td>
							<td class="text_center percent_10">0</td>
							<td class="text_center percent_10">0</td>
						</tr>
					</s:iterator>
				</s:if>		
		        </tbody>
			</table>
		</div>
	</div>
</div>

