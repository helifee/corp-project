<%--
 * @(#)Yb0031.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 人员管理
--%>

<%--
 * 员工状态一览画面（一览部分JSP）
 * 
 * @author mengqingyang
 * @version 1.00 2010/06/17
 --%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!-- 员工状态一览列表画面 -->
<div class="span-24">
	<div class="span-8 text_left">
		<s:label value="员工状态一览：" />
	</div>
	<div class="span-2">
		<input type="button" id="addEmpState" name="addEmpState" 
			value="添加" class="btn span-2" onclick="popEmpStateSet();"/>
	</div>
</div>
<div class="span-10 box_border overflow_hd margin_top_4">

	<div class="span-10">
		<table id="table_peoListHead" class="datagrid2">
			<tr>
				<th class="percent_14">时效</th>
				<th class="percent_20">员工状态</th>
				<th class="">状态期间</th>
				<th class="percent_20">操作 </th>
			</tr>
		</table>
	</div>
	<div class="span-10 overflow_scr_y">
		<div class="span-10 last">
		    <s:hidden id="listCnt" value="%{empStateList.size}"></s:hidden>
		    <s:form id="empStateListForm" namespace="/employee" >
		    <s:hidden id="empInfoUpdTime" name="empInfoUpdTime"></s:hidden>
			<table id="table_peoList" class="datagrid2">
					<s:if test="empStateList.size > 0">
						<s:iterator value="empStateList" status="st">
							<s:if test="modFlg != -1">
							<tr>
								<td class="none"><s:property value="%{#st.index}"/></td>
								<td class="none">
								<!-- ListBean的隐藏 项目 -->
								<s:hidden name="empStateList[%{#st.index}].empId"></s:hidden>
								<s:hidden name="empStateList[%{#st.index}].empState"></s:hidden>
								<s:hidden name="empStateList[%{#st.index}].updateUser"></s:hidden>
								<s:hidden name="empStateList[%{#st.index}].updateTime"></s:hidden>
								<s:hidden name="empStateList[%{#st.index}].operableFlg"></s:hidden>
								<s:hidden name="empStateList[%{#st.index}].modFlg"></s:hidden>
								<s:hidden name="empStateList[%{#st.index}].delFlg"></s:hidden>
								<s:hidden name="empStateList[%{#st.index}].startTimeBeforeUpdate"></s:hidden>
								</td>
								<td	class="percent_14 text_center">
								<s:label id="empStateList[%{#st.index}].prescription" name="prescription" keep="1"></s:label>
								</td>
								<td class="percent_20 text_left">
								<s:label id="empStateList[%{#st.index}].stateNm" name="stateNm" keep="1"></s:label>
								</td>
								<td class="text_left">
									<s:label id="empStateList[%{#st.index}].startTime" name="startTime" keep="1" >
									</s:label>
									<span>&nbsp;~</span>
									<s:label class="w_65" id="empStateList[%{#st.index}].endTime" name="endTime" keep="1">
									</s:label>
								</td>
								<td class="percent_20 text_center">
									<div  <s:if test="operableFlg == 0">class=""</s:if>
										 <s:else> class="none"</s:else>	>
										<s:a href="#this" onclick="popEmpStateSet(this);">修改</s:a>
										<s:a href="#this" onclick="del1Row(this);">取消</s:a>
									</div>
	 							</td>
							</tr>
							</s:if>
						</s:iterator>
					</s:if>		
				</table>
				</s:form>
		</div>
	</div>
	<!-- 给JS增加行时提供<tr>模板 -->
	<table class="none" id="tmpForAddTbl">
		<tr>
		<td class="none"></td>
		<td class="none">
			<s:hidden name="tmpForAddTbl.empId"></s:hidden>
			<s:hidden name="tmpForAddTbl.empState"></s:hidden>
			<s:hidden name="tmpForAddTbl.updateUser"></s:hidden>
			<s:hidden name="tmpForAddTbl.updateTime"></s:hidden>
			<s:hidden name="tmpForAddTbl.operableFlg"></s:hidden>
			<s:hidden name="tmpForAddTbl.modFlg"></s:hidden>
			<s:hidden name="tmpForAddTbl.delFlg"></s:hidden>
			<s:hidden name="tmpForAddTbl.startTimeBeforeUpdate"></s:hidden>
		</td>
		<td	class="percent_14 text_center">
		<s:label id="tmpForAddTbl.prescription" keep="1"></s:label>
		</td>
		<td class="percent_20 text_left">
			<s:label id="tmpForAddTbl.stateNm"  keep="1"></s:label>
		</td>
		<td class="text_left">
			<s:label id="tmpForAddTbl.startTime" keep="1">
			</s:label>
			<span>&nbsp;~</span>
			<s:label id="tmpForAddTbl.endTime" keep="1">
			</s:label>
		</td>
		<td class="percent_20 text_center">
			<div class="">
				<s:a href="#this" onclick="popEmpStateSet(this);">修改</s:a>
				<s:a href="#this" onclick="del1Row(this);">取消</s:a>
			</div>
		</td>
		</tr>
	</table>
</div>

