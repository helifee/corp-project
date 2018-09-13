<%--		
 * @(#)k060081.jsp		
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司		
 * All rights reserved.		
 *      Project: 教育考试培训系统
 *    SubSystem: 教育子系统
--%>
<%--
 * 考试报名批准（主页面JSP）
 *
 * @author wangqingzhu
 * @version 1.00 2010/03/29
 --%>

<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<!-- 共通css -->
	<link href="<%=basePath%>${session.userTheme}" rel="stylesheet" type="text/css">
	
	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/commonMessage.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/ttManager/ttCommon.js"></script>

	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/ttTesting/k060081.js"></script>

	<title>考试报名批准</title>
</head>
<body onload="initForm()">
<div class="container">
<s:include value="../manager/head.jsp" />
<div class="span-24 margin_top_2">
<div class="tt_module padding_bottom_4 overflow_hd">
<s:include value="../manager/navigator.jsp" />
<div id="div_main"  class="container showgrid">
	<div class="span-24 padding_top_8 title_tt">
		<h2>考试报名批准</h2>
	</div>		
	<s:form id="enrollform"  method="post">			
		<div class="span-24 margin_top_2">
			<div class="span-3 text_right">考试名称：</div>
			<!--考试ID-->
			<s:label id="examineId" name="k060081ExamineInfo.examineId" value="%{k060081ExamineInfo.examineId}" />
			
			<!--考试名称-->
			<s:label id="examineName" name="k060081ExamineInfo.examineName" value="%{k060081ExamineInfo.examineName}" />
		</div>	
		<div class="span-24 margin_top_2">
			<div class="span-3 text_right">考试说明：</div>
			<!--考试说明-->
			<s:label id="examineComment" name="k060081ExamineInfo.examineComment" value="%{k060081ExamineInfo.examineComment}" />
		</div>			
				
		<div class="span-24 margin_top_2">
			<div class="span-3 text_right">考试时间：</div>
			<!--考试开始时间-->
			<s:date name="k060081ExamineInfo.examineStartDate"
			id="examineStartDate" format="yyyy-MM-dd HH:mm"  />
			<!--考试结束时间-->
			<s:date name="k060081ExamineInfo.examineEndDate"
			id="examineEndDate" format="yyyy-MM-dd HH:mm"  />
			<s:property
			value="%{examineStartDate}" /> ～　
			<s:property
			value="%{examineEndDate}" />
		</div>							
		<div class="span-24 margin_top_2">
			<div class="span-3 text_right">考试分类：</div>
			<!--考试分类-->
			<s:label id="k060081ExamineInfo.categoryName" name="k060081ExamineInfo.categoryName" value="%{k060081ExamineInfo.categoryName}"/>
		</div>
		<s:hidden id="examineStatus" name="k060081ExamineInfo.examineStatus"/>
		<s:hidden id="paexamineId" name="k060081ExamineInfo.examineId"/>
		<s:hidden id="parentExamineId" name="k060081ExamineInfo.parentExamineId"/>

		<div class="span-18 margin_top_6 prepend-h">
			<table id="titletable" class="datagridtt">
				<tr>
					<th class="span-4">员工ID</th>
					<th class="span-4">员工姓名</th>
					<th class="span-5">入社年份</th>
					<th class="span-5">审批状态</th>
				</tr>
				<s:hidden id="itemCount" value="%{k060081EnrollList.size}"></s:hidden>
				<s:if test="k060081EnrollList.size > 0">
					<s:iterator value="k060081EnrollList" status="stat" id="enlt">
						<tr class="odd">    
							<td id="itemId${stat.index}" class="text_center">
								<s:property value="userId"/>
								<s:hidden id="userId%{#stat.index}" name="k060081EnrollList[%{#stat.index}].userId"></s:hidden>
							</td>
							<td class="text_center">
								<s:property value="userCnm"/>
								<s:hidden id="startDate%{#stat.userCnm}" name="k060081EnrollList[%{#stat.index}].userCnm"></s:hidden>
							</td>
							<td class="text_center">
								<s:property value="startDate"/>
								<s:hidden id="startDate%{#stat.index}" name="k060081EnrollList[%{#stat.index}].startDate"></s:hidden>
								
							</td>
							<td class="text_center">
								<s:if test="#enlt.diffName == null || #enlt.diffName == ''">
									未报名
								</s:if>
								<s:else>
									<s:property value="diffName"/>
								</s:else>
								
								<s:hidden id="diffName%{#stat.index}" name="k060081EnrollList[%{#stat.index}].diffName"></s:hidden>
								<s:hidden id="diff%{#stat.index}" name="k060081EnrollList[%{#stat.index}].diffNo"></s:hidden>
							</td>
						</tr>
					</s:iterator>
				</s:if>
			</table>
		</div>
		<div class="span-18 text_center last">	
			<s:if test="k060081EnrollList.size == 0">
				 <s:label value="总计:0件"/>
			</s:if> 
			<s:else>
				<s:label value="总计:"/><s:property value="%{k060081EnrollList.size}"/><s:label value="件"/>&nbsp;
			</s:else>
		</div>

		<div class="span-18 text_center margin_top_10 last">
			<s:if test="k060081EnrollList.size == 0">
			<input type="button" id="sanctionBtn" name="sanctionBtn" value="批准" class="btn span-2 disabled" disabled>
			</s:if><s:else>
			<input type="button" id="sanctionBtn" name="sanctionBtn" value="批准" class="btn span-2" onclick="sanctionEnroll()" >
			</s:else>
			<input type="button" id="unsanctionBtn" name="unsanctionBtn" value="不批准" class="btn span-2" onclick="unSanctionEnroll()" >
		</div>
		
		</s:form>
		<div class="clear_both"></div>
</div>
</div>
</div>
<s:include value="../manager/foot.jsp" />
</div>
</body>
</html>
