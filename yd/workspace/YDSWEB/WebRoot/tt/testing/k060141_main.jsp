<%--
 * @(#) k060141_main.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试系统
 *    SubSystem: 考试子系统
--%>

<%--
 * 课程选择（主页面JSP）
 * 
 * @author liyanrui
 * @version 1.00 2010/03/30
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
	<!-- 共通css -->
	<link href="<%=basePath%>${session.userTheme}" rel="stylesheet" type="text/css">
	
	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/commonMessage.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/My97DatePicker/WdatePicker.js"></script>
	
	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>/js/ttTesting/k060141.js"></script>
	<script type="text/javascript" src="<%=basePath %>/js/ttManager/ttCommon.js"></script>
	
	<title>课程选择</title>
</head>
<body onload="k060141initForm();" style="overflow-x:hidden;overflow-y:auto;">
	<div id="div_main" class="container showgrid">
		<div class="span-18 padding_top_8 title_tt">
			<h2>课程选择</h2>
		</div>
		<s:form id="k060141searchForm" action="k060141GetCourseList" method="post"  validate="true">
			<div class="span-20">
				<div class="span-20">
					<div class="span-2 text_right">课程ID：</div>
					<div class="span-2 text_left">
						<s:textfield id="courseId" name="searchInfo.courseId" maxlength="8" cssClass="span-2" />
					</div>
					<div class="span-2 text_right">课程名：</div>
					<div class="span-7 text_left">
						<s:textfield id="courseName" name="searchInfo.courseName" cssClass="span-7" />
					</div>
				</div>
				<div class="span-20">
					<div class="span-2 text_right">课程分类：</div>
					<div class="span-12 text_left">
						<select class="span-3 text_left" type="category1Id" id="sltCategory1" name="category1Id"></select>
						<select class="span-3 text_left" type="category2Id" id="sltCategory2" name="category2Id"></select>
						<select class="span-3 text_left" type="category3Id" id="sltCategory3" name="category3Id"></select>		
					</div>
					<div class="span-2 text_right">
					<input type="button"  value="检索" 
						class="btn span-2" onclick="searchInfoList()" />
					</div>
				</div>
				<s:hidden id="parenetId" name="parenetId"></s:hidden>
				<s:hidden id="IdName" name="idName"></s:hidden>
			</div>
		</s:form>
		<s:hidden id="oldParam" name="oldParam" value=""/>
		<div id="div_pagerCommon" class="prepend-h span-19">
			<s:include value="k060141_list.jsp" />
		</div>
	</div>
</body>
</html>