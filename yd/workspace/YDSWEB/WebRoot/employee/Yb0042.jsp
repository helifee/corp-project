<%--
 * @(#)Yb0042.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 人员管理
--%>

<%--
 * 员工一览画面（一览部分JSP）
 * 
 * @author jinfang
 * @version 1.00 2010/06/17
 --%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!-- 历史职位一览列表画面-->
<div class="span-18 last">
	<label>历史职位一览</label>
</div>
<div class="span-17 box_border overflow_hd margin_top_4 margin_bottom_6">
	<div class="span-17">
		<table id="table_posAllListHead" class="datagrid2">
			<tr>
				<th class="percent_30">职位类别</th>
				<th class="percent_30">职位</th>
				<th class="percent_20">开始时间</th>
				<th class="">结束时间 </th>
			</tr>
		</table>
	</div>
	<div id="table_empPosList" class="span-17 overflow_scr_y">
		<div class="span-17">
			<table id="table_posAllList" class="datagrid2">
				<s:if test="posAllList.size > 0">
					<s:iterator value="posAllList">
						<tr>
							<td class="percent_30"><s:property value="posTypeName" /></td>
							<td class="percent_30"><s:property value="posSName" /></td>
							<td class="percent_20"><s:property value="startTime" /></td>
							<td class=""><s:property value="endTime" /></td>
						</tr>
					</s:iterator>
				</s:if>		
			</table>
		</div>
	</div>
</div>

