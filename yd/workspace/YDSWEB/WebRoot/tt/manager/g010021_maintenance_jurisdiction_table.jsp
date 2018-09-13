<%--
 * @(#)g010021_maintenance_jurisdiction_table.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 权限管理
--%>

<%--
 * 权限管理画面
 * 
 * @author guozhizhou
 * @version 1.00 2010/03/12
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div class="span-23 padding_top_2 padding_bottom_2 last">
<s:form id="maintenanceListFrom" action="g010021UpdMaintPerm" method="post" validate="true">
<table id="g010021_maintenanceList" class="datagridtt ellipsis">
<tbody>
	<tr>
		<th class="percent_12">员工ID</th>
		<th class="percent_12">员工名</th>
		<th class="percent_12">不整合</th>
		<th class="percent_12">权限</th>
		<th class="percent_16">权限分类</th>
		<th class="percent_12">开始日期</th>
		<th class="percent_12">结束日期</th>
		<th class="percent_12">操作</th>
	</tr>
	<s:if test="g010021aInfoList.size > 0">
		<s:iterator status="stat" value="g010021aInfoList">
			<tr align="center">
				<td><s:div id="userIdNum%{#stat.index}">
						<s:label name="userIdNum"/>
					</s:div>
				</td>
				<td><s:div id="userCnm%{#stat.index}">
						<s:label name="userCnm"/>
			        </s:div>
			    </td>
				<td><s:div id="categoryStatus%{#stat.index}">
						<s:property value="categoryStatus" />
					</s:div>
					<s:div id="relatedobjectId%{#stat.index}" cssClass="none">
						<s:label name="relatedobjectId"/>
					</s:div>
				</td>
				<td><s:div id="authority%{#stat.index}">
						<s:property value="authority" />
					</s:div>
					<s:div id="authorityId%{#stat.index}" cssClass="none">
						<s:label name="authorityId"/>
					</s:div>
				</td>
				<td><s:div id="categoryName%{#stat.index}">
						<s:label title="%{categoryName}" name="categoryName"/>
					</s:div>
					<s:div id="sltCategory1%{#stat.index}" cssClass="none">
						<s:label name="sltCategory1"/>
					</s:div>
					<s:div id="sltCategory2%{#stat.index}" cssClass="none">
						<s:label name="sltCategory2"/>
					</s:div>
					<s:div id="sltCategory3%{#stat.index}" cssClass="none">
						<s:label name="sltCategory3"/>
					</s:div>
				</td>
				<td><s:div id="startTime%{#stat.index}" cssClass="">
						<s:label name="startTimeNm" id="startTimeNm"/>
					</s:div>
					<s:div id="start%{#stat.index}" cssClass="none">
						<s:textfield id="startId%{#stat.index}"
							name="g010021aInfo.startTimeNm" value="%{startTimeNm}"
							 onclick="WdatePicker()" cssClass="span-2" />
					</s:div>
				</td>
				<td><s:div id="endTime%{#stat.index}" cssClass="">
						<s:date name="endTimeNm" id="endTimeNm" />
						<s:property value="%{endTimeNm}" />
					</s:div>
					<s:div id="end%{#stat.index}" cssClass="none">
						<s:textfield id="endId%{#stat.index}" name="g010021aInfo.endTimeNm"
							value="%{endTimeNm}" 
							onclick="WdatePicker()" cssClass="span-2" />
					</s:div>
				</td>
				<td class="text_center"><s:a id="mod%{#stat.index}" cssClass=""
						href="#" onclick="modifyInfo('%{#stat.index}');">修改</s:a>
					<s:a id="save%{#stat.index}" cssClass="none" href="#"
						onclick="saveModify('%{#stat.index}');">保存</s:a>
					<s:a id="delete%{#stat.index}" cssClass="" href="#"
						onclick="deleteInfo(this,'%{userIdNum}','%{authorityId}','%{sltCategory1}','%{sltCategory2}','%{sltCategory3}','%{startTimeNm}','%{relatedobjectId}');">删除</s:a>
					<s:a id="cancel%{#stat.index}" cssClass="none" href="#"
						onclick="cancel('%{#stat.index}');">取消</s:a>
				</td>
			</tr>
		</s:iterator>
	</s:if>
</tbody>
</table>
</s:form>
	<div class="span-24 text_center"><s:include
		value="../../common/pagerNavigation.jsp" />
	</div>
</div>
