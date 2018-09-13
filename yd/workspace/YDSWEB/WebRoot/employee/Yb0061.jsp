<%--
 * @(#)Yb0061.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *      SubSystem: 员工管理
--%>

<%--
 * 职位一览画面
 * 
 * @author pengchuan
 * @version 1.00 2010/07/21
 --%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div class="span-24 margin_top_4">
	<div class="span-24 bd_1s000 overflow_hd">
		<div class="span-24 ">
			<table id="table_posList" class="datagrid2 text_center">
			    <tr>
						<th class="percent_20">职位ID</th>
						<th class="percent_30">职位名称</th>
						<th class="percent_30">职位略称</th>
						<th class="percent_0">启用标识</th>
						<th>操作</th>
				</tr>
	     	<s:if test="posList.size > 0">
								<s:iterator value="posList" status="stat" >
									<tr>
										<td class="percent_20"><s:property value="posId" /></td>
										<td class="percent_30"><s:property value="posName" /></td>
										<td class="percent_30"><s:property value="posSName" /></td>
										<td ><s:property value="posState" /></td>
										<td>
										<!-- 用户拥有该画面的修改权限时，显示链接 -->
										<s:if test="hasPermit('employee','allEmpPermit')">
											<s:a href="#this" onclick="modifyPosInfo('%{posId}')">修改</s:a> 
											<s:hidden id="dispSeq%{#stat.index}" name="dispSeq[%{#stat.index}].dispSeq" />
										</s:if>
										</td>
									</tr>
								</s:iterator>
							</s:if>
					
					</table>
			</div>
		</div>
</div>



