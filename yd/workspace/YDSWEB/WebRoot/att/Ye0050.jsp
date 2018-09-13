<%--
 * @(#)Ye0050.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 考勤 系统
--%>

<%--
 * 考勤更正一览主画面
 * 
 * @author pengchuan
 * @version 1.00 2010/12/01
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>
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
	<link rel="stylesheet" type="text/css" href="<%=basePath %>js/tafelTree/css/tree.css" />

	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/commonMessage.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/formValidation.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/My97DatePicker/WdatePicker.js"></script>

	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/att/Ye0050.js"></script>
	
	<title>考勤更正一览</title>
</head>
<body onload="initForm()">
<jsp:include page="../common/commonPage.jsp"></jsp:include>
<div id="div_emp_main"  class="ydscontainer">
	<s:form id="searchForm">
		<div class="span-20 margin_top_20">
				<div class="span-2 text_center">
					<s:label value="考勤日期"></s:label>
				</div>
				<div class="span-6 text_left">
					<s:radio id="timeType" name="ye0050CondA.timeType" list="timeTypeList" listKey="diffNo" listValue="diffName" value="0" onclick="changeTime(this)"/>
				</div>
			    <div class="span-5">
		          <s:textfield id="startDate" name="ye0050CondA.startTime" maxLength="10" cssClass="span-2" onclick="WdatePicker()"/>
		          <span>～</span>
		          <s:textfield id="endDate" name="ye0050CondA.endTime" maxLength="10" cssClass="span-2" onclick="WdatePicker()"/>
		        </div>
		   		<div class="span-2 text_center"><s:label value="审批状态"/></div>
		   		<s:hidden id="fromId" name="fromId"></s:hidden>
	            <div class="span-4 text_left">
	            	<s:radio id="status" name="ye0050CondA.status" list="#{'1':'待批','2':'已批','3':'全部'}" value="3"/>
	            </div>
		</div>
	</s:form>	
	<div class="span-4 margin_top_20 last text_right">
		<input type="button" value="查询" class="span-2 btn color_blue" onclick="searchAttInfo()" />
	</div>
	<div class="span-24 separator"></div>
	    <!--审批一览画面 -->
		<div id="div_att_infoList">
			<s:include value="Ye0051.jsp" />
		</div>
		<!--不同意理由画面 -->
		<div id="div_att_reason">
			<s:include value="Ye0052.jsp" />
		</div>
		<!--考勤更正画面 -->
		<div class="none" id="div_att_correct">
			<iframe id="myInnerPage" frameBorder="0" class="overflow_hd"></iframe>
   		</div>
</div>
</body>
</html>