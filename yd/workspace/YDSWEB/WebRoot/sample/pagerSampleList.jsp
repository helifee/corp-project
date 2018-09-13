<%--
 * @(#)pagerSampleList.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem:sample
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<s:hidden  name="userNameHide"
id="userNameHide" value="%{pageLockUserName}"/>
<div  class="span-24 ">
  <div class="span-24 text_center">
	<s:include	value="../common/pagerNavigation.jsp" />
  </div>
	<table id="pagerCommonList" class="datagrid2">
		 <tr>
			<th>部门ID</th>
			<th>部门名称</th>
			<th>部门略称</th>
			<th>部门主管ID</th>
			<th>部门主管</th>
			<th>上级部门</th>
			<th>部门描述</th>
			<th>操作</th>
		</tr>
			<s:if test="departmentInfos.size > 0">
				<s:iterator value="departmentInfos">
				
					<tr>
						<td class="text_center"><s:property value="deptId" /></td>
						<td><s:property value="deptNm" /></td>
						<td><s:property value="deptSnm" /></td>
						<td class="text_center"><s:property value="leaderId" /></td>
						<td class="text_center"><s:property value="leaderNm" /></td>
						<td class="text_center"><s:property value="parentDeptNm" /></td>
						<td><s:property value="deptDesc" /></td>
						<td class="text_center">
							<s:a href="#this" onclick="modifyDeptInfo('%{deptId}')">修改</s:a> 
							<s:a href="#this" onclick="deleteDeptInfo('%{deptId}')">删除</s:a>
						</td>
					</tr>
			
				</s:iterator>
			
			</s:if>
	</table>        
  <div class="span-24 text_center">
    <s:include	value="../common/pagerNavigation.jsp" />
  </div>
</div>
 		