<%--
 * @(#)Yb9012.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 员工管理
--%>

<%--
 * 员工查询结果画面
 * 
 * @author tengchanglong
 * @version 1.00 2010/07/22
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
	<table id="emp_left" class="datagrid2 ellipsis">	
	<tbody>							
		<s:if test="empInfoList.size > 0">
			<s:iterator value="empInfoList">
				<tr id="left_${empId}" onclick="choose(this);">
					<td>
						<s:label name="empCnm" title="%{empCnm}"/>
					</td>
					<td class="percent_18 text_center">
						<s:property value="empSex"/>
					</td>
					<td class="percent_50 overflow_hd">
						<s:label name="orgSnmMngerNm" title="%{orgSnmMngerNm}"/>
					</td>
				</tr>
			</s:iterator>
		</s:if>
	</tbody>										
	</table>
