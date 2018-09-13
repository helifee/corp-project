<%--
 * @(#)k070031_details.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 考试子系统
--%>
<%--
 * 成绩查询（主页面JSP）
 * 
 * @author chenjunshuai
 * @version 1.00 2010/10/22
 --%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<div class="span-6 showgrid margin_top_10">
	<div class = "span-6">
		<div class = "span-2">
			<s:property value="examEmployeeInfo.employeesId"/>
		</div>
		<div class = "span-3 last">
			<s:property value="gainPointDetailList[0].employeesName"/>
		</div>
		
	</div>
	<div class = "span-6">
		<table class="datagridtt">
			<tr>
				<th class="span-2">大题标题</th>
				<th class="span-2">得分</th>
				<th class="span-2">总分</th>
			</tr>
		</table>
	</div>
	<div class = "span-6">
		<table class = "datagridtt ellipsis">
			<s:if test="gainPointDetailList.size > 0">
				<s:iterator value = "gainPointDetailList">
					<tr>
						<td class="span-2 text_center"><s:property value="bigquestionTitle"/></td>
						<td class="span-2 text_center"><s:property value="bigquestionScoreSum"/></td>
						<td class="span-2 text_center"><s:property value="bigquestionTotalScore"/></td>
					</tr>
				</s:iterator>
			</s:if>
		</table>
	</div>
</div>				
