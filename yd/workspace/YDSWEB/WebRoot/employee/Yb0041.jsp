<%--
 * @(#)Yb0041.jsp
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
<!-- 当前职位一览列表画面-->
<div class="span-18 margin_bottom_6 last">
<div class="span-18 last">
	<label>当前职位一览</label>
</div>
<div class="span-12 box_border overflow_hd margin_top_4">
	<div class="span-12">
		<table id="table_posNowListHead" class="datagrid2">
			<tr>
				<th class="percent_20">第一职位</th>
				<th class="percent_30">职位类别</th>
				<th class="percent_30">职位</th>
				<th class="">操作 </th>
			</tr>
		</table>
	</div>
	<div id="table_empPosList" class="span-12 overflow_scr_y">
		<div class="span-12">
			<table id="table_posNowList" class="datagrid2">
				<s:if test="posNowList.size > 0">
					<s:iterator value="posNowList"  status="st">
						<tr>
							<td class="text_center percent_20">
								<input type="radio" name="mainPosFlg" onclick="setFlg(this)" <s:if test='mainPosFlg == 1'> checked="checked" </s:if> />
							</td>
							<td class="percent_30"><s:property value="posTypeName" /></td>
							<td class="percent_30"><s:property value="posSName" /></td>
							<td class="text_center margin_right_15"><s:a href="#this" onclick="addEndTime(this)">结束</s:a></td>
						</tr>
					</s:iterator>
				</s:if>		
			</table>
		</div>
	</div>
</div>
</div>

