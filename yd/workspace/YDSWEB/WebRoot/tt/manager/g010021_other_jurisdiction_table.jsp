<%--
 * @(#)g010021_other_jurisdiction_table.jsp
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
<s:form id="otherJurisdictionListForm" action="g010021UpdOtherPerm" method="post" validate="true">
<table id="g010021_otherJurisdictionList" class="datagridtt">
<tbody>
	<tr>
		<th class="percent_10">员工ID</th>
           <th class="percent_10">员工名</th>
           <th class="percent_20">权限</th>
           <th class="percent_25">开始日期</th>
           <th class="percent_25">结束日期</th>
           <th class="percent_10">操作</th>
	</tr>
	<s:if test="g010021OtherInfoList.size > 0">
		<s:iterator  status="stat"  value="g010021OtherInfoList">
			<tr align="center">
				<td>
					<s:div id="userIdNumOther%{#stat.index}" >
						<s:label name="userIdNum"/>
					</s:div>
					<s:div id="relatedobjectIdOther%{#stat.index}" cssClass="none" >
						<s:label name="relatedobjectId"/>
					</s:div>
				</td>
				<td>
					<s:div id="userCnm%{#stat.index}" >
					<s:label name="userCnm"/>
					</s:div>
					<s:div id="sltCategory1Other%{#stat.index}" cssClass="none" >
					<s:label name="sltCategory1"/>
					</s:div>
					<s:div id="sltCategory2Other%{#stat.index}" cssClass="none" >
					<s:label name="sltCategory2"/>
					</s:div>
					<s:div id="sltCategory3Other%{#stat.index}" cssClass="none" >
					<s:label name="sltCategory3"/>
					</s:div>
				</td>
				<td>
					<s:div id="authorityOther%{#stat.index}" >
					<s:label name="authority"/>
					</s:div>
					<s:div id="authorityIdOther%{#stat.index}" cssClass="none" >
					<s:label name="authorityId"/>
					</s:div>
				</td>	
				<td>
					<s:div id="startTimeOther%{#stat.index}"  cssClass="">
						<s:label name="startTimeNm" id="startTimeNm"/>
					</s:div>
					<s:div id="startOther%{#stat.index}" cssClass="none">
						<s:textfield id ="startOtherId%{#stat.index}" 
							name="g010021aInfo.startTimeNm" value="%{startTimeNm}" 
							 onclick="WdatePicker()" cssClass="span-2" />
					</s:div>
				</td>
				<td>
					<s:div id="mOther%{#stat.index}"  cssClass="">
						<s:date name="endTimeNm" id="endTimeNm" />
						<s:property value = "%{endTimeNm}"/>
					</s:div>
					<s:div id="endOther%{#stat.index}" cssClass="none">
						<s:textfield id ="endOtherId%{#stat.index}" 
							name="g010021aInfo.endTimeNm" value="%{endTimeNm}" 
							 onclick="WdatePicker()" cssClass="span-2" />
					</s:div>
				</td>
				<td class="text_center">
					<s:a id="modOther%{#stat.index}"  cssClass="" href="#"  onclick="modifyOtherInfo('%{#stat.index}');">修改</s:a>
					<s:a id="saveOther%{#stat.index}"   cssClass="none" href="#" onclick="saveModifyOther('%{#stat.index}');">保存</s:a> 
					<s:a id="deleteOther%{#stat.index}"  cssClass="" href="#" onclick="deleteOtherInfo(this,'%{userIdNum}','%{authorityId}','%{sltCategory1}','%{sltCategory2}','%{sltCategory3}','%{startTimeNm}','%{relatedobjectId}');">删除</s:a>
					<s:a id="cancelOther%{#stat.index}"   cssClass="none" href="#" onclick="cancelOther('%{#stat.index}');">取消</s:a> 
				</td>
			</tr>
		</s:iterator>
	</s:if>
</tbody>
</table>
</s:form>
	<div class="span-24 text_center">		
		<s:include	value="../../common/pagerNavigation.jsp" />	          	 
	</div>
</div>
