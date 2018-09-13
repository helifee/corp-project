<%--
 * @(#)com_code_list.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 共通管理
--%>

<%--
 * 子系统参数维护画面（一览部分JSP）
 * 
 * @author renlong
 * @version 1.00 2010/06/07
 --%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div class="span-24 margin_top_4 box_border overflow_hd">
	<table id="table_diffList" class="datagrid2">
		<tr>
			<th class="percent_6">区分NO</th>
			<th class="percent_8">区分名称</th>
			<th class="percent_8">区分略称</th>
			<th class="percent_0">停用标识</th>
			<s:if test="dispNameList == null">
				<th class="percent_8">附加属性1</th>
				<th class="percent_8">附加属性2</th>
				<th class="percent_8">附加属性3</th>
				<th class="percent_8">附加属性4</th>
				<th class="percent_8">附加属性5</th>
				<th class="percent_8">附加属性6</th>
				<th class="percent_8">附加属性7</th>
				<th class="percent_8">附加属性8</th>
			</s:if>
			<s:else>
				<s:if test="dispNameList.size > 0">
					<s:iterator value="dispNameList">
						<th class="percent_8"><s:property value="dispCaption" /></th>
					</s:iterator>
				</s:if>
			</s:else>
			<th>备注</th>
			<th class="percent_6">操作</th>
		</tr>
		<s:if test="comCodeMaintList.size > 0">
			<s:iterator value="comCodeMaintList">
				<tr>
					<td class="text_center"><s:property value="diffNo" /></td>
					<td><s:property value="diffName" /></td>
					<td><s:property value="diffShortName" /></td>
					<td class="text_center"><s:property value="delFlg" /></td>
					<s:if test="dispNameList.size >= 1">
					<td class="text_center"><s:property value="pro1" /></td>
					</s:if>
					<s:if test="dispNameList.size >= 2">
					<td class="text_center"><s:property value="pro2" /></td>
					</s:if>
					<s:if test="dispNameList.size >= 3">
					<td class="text_center"><s:property value="pro3" /></td>
					</s:if>
					<s:if test="dispNameList.size >= 4">
					<td class="text_center"><s:property value="pro4" /></td>
					</s:if>
					<s:if test="dispNameList.size >= 5">
					<td class="text_center"><s:property value="pro5" /></td>
					</s:if>
					<s:if test="dispNameList.size >= 6">
					<td class="text_center"><s:property value="pro6" /></td>
					</s:if>
					<s:if test="dispNameList.size >= 7">
					<td class="text_center"><s:property value="pro7" /></td>
					</s:if>
					<s:if test="dispNameList.size == 8">
					<td class="text_center"><s:property value="pro8" /></td>
					</s:if>
					<td><s:property value="refer" /></td>
					<td class="text_center">
						<s:a href="#this" onclick="modifyDiffInfo('%{diffNo}')">修改</s:a> 
					</td>
				</tr>
			</s:iterator>
		</s:if>
	</table>
</div>