<%--
 * @(#)K060031_wait.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 考试子系统
--%>

<%--
 * 考试开始等待
 * 
 * @author chenjunshuai
 * @version 1.00 2010/10/13
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
	<script type="text/javascript" src="<%=basePath %>js/ttTesting/k060031.js"></script>
	<title>考试开始等待</title>
</head>
<body onload="initForm()">
	<div class="container">
	<s:include value="../manager/head.jsp" />
	<div class="span-24 margin_top_2">
	<div class="tt_module padding_bottom_4 overflow_hd">
	<s:include value="../manager/navigator.jsp" />
		<div id ="divK060041Wait" class = "container showgrid">
		<div class="span-24 padding_top_8 title_tt"><h2>考试未开始请耐心等待。。。。。。</h2></div>
		<div class="span-24">
			<!--隐藏项目-->
			<s:hidden id="examineFlg" name="examineInfo.examineFlg"/>
			<s:hidden id="examineTime" name="examineInfo.examineTime"/>
			<s:hidden id="examineStatus" name="examineStatus"/>
			<div class="span-11 text_right">
			<s:label value="考试开始时间:"/>
			</div>
			<div class="span-13 last">
				<s:date name="examineStartTime" id="startTimeFormat" format="yyyy-MM-dd HH:mm:ss" />
				<s:date name="examineStartTime" id="startTimeFormatOut" format="yyyy年MM月dd日 HH:mm:ss" />
				<s:property value="%{startTimeFormatOut}"/>
				<s:hidden id="startTime" value="%{startTimeFormat}" />		
			</div>
		</div>
		<div id="sdiv">
			<s:include value="k060031_wait_sys.jsp"></s:include>
		</div>
		<div class="span-24 margin_top_6">
			<div class="span-11 text_right">
			<s:label value="当前服务的时间:"/>
			</div>		
			<div id="systemTimeDiv" class="span-13 last">
			</div>		
		</div>
		<div class="span-24 margin_top_6">
			<div class="span-11 text_right">
				<s:label value="距离考试开始还有:"/>
			</div>		
			<div class="span-13 last">
				<label id="day"></label><label id="hour"></label><label id="minute"></label><label id="second"></label>
			</div>		
		</div>
		<s:hidden id="examineId" name="examineId"/>
		</div>
	</div>
	</div>
	<s:include value="../manager/foot.jsp" />
</div>			
		
</body>
</html>