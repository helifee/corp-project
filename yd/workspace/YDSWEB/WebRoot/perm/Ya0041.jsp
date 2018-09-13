<%--
 * @(#)Ya0041.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 权限管理
--%>

<%--
 * 用户角色一览画面（一览部分JSP）
 * 
 * @author yuchenglin
 * @version 1.00 2010/08/17
 --%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!-- 角色一览列表画面 -->
<div class="span-24">
	<div class="span-2 text_left">
		<s:label value="总计：" />
		<s:label id="roleInfosCnt" name="roleInfosCnt" />
		<s:label value="件" />
	</div>
	<div class="span-2 prepend-10 text_right last">
		<input type="button" id="insertUserRole" name="insertUserRole" value=" 新 建 " onclick="newUesrRole()" class="btn span-2" />
	</div>
</div>
<div class="span-14 box_border overflow_hd margin_top_4">
	<div class="span-14">
		<table id="table_peoListHead" class="datagrid2 ellipsis">
			<tr>
				<th class="percent_24">角色</th>
				<th class="percent_50">有效时间</th>
				<th class="percent_24">操作 </th>
			</tr>
		</table>
	</div>
	<div id="table_peo" class="span-14 overflow_scr_y">
		<div class="span-14 last">
			<table id="table_peoList" class="datagrid2">
				<tbody>
				<s:if test="perUserPermitInfoList.size > 0">
					<s:iterator value="perUserPermitInfoList" status="stat">
						<tr>
							<td class="none"><s:property value="%{#stat.index}"/></td>
							<td class="none"><s:label id="perUserPermitInfoList[%{#stat.index}].userId" name="userId" /></td>
							<td class="none"><s:label id="perUserPermitInfoList[%{#stat.index}].posRoleId" name="posRoleId"/></td>
							<td class="text_center percent_24">
								<div class="text_center span-3 margin_top_4 padding_left_10">
									<s:label id="perUserPermitInfoList[%{#stat.index}].posRoleNm" name="posRoleNm" />
								</div>
							</td>
							<td class="text_center percent_50">
								<div class="text_right span-3 last margin_top_4">
									<s:label id="perUserPermitInfoList[%{#stat.index}].permitStaDate" name="permitStaDate" />
								</div>
								<div class="text_center span-1 last margin_top_4">~</div>
								<div class="text_left span-3 last margin_top_4">
									<s:label id="perUserPermitInfoList[%{#stat.index}].permitEndDate" name="permitEndDate" />
								</div>
								  
							</td>
							<td class="text_center percent_24">
								<div class="text_center span-3 padding_left_10 last margin_top_4">	
									<s:a href="#" onclick="permitDataUpdate(this)">修改</s:a>&nbsp
									<s:a href="#" onclick="deletePermitData(this)">删除</s:a>
								</div>
 							</td>
						</tr>
					</s:iterator>
				</s:if>		
		        </tbody>
			</table>
		</div>
	</div>
</div>

