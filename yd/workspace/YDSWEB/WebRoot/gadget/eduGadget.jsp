<%--
 * @(#)ManageGadget.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 活动桌面
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
	<link href="<%=basePath%>css/gadget.css" rel="stylesheet" type="text/css">
	
	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/gadget/base.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/ttManager/ttCommon.js"></script>

	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/gadget/eduGadget.js"></script>

<base target="main"> 
<title>社内学堂</title>
</head>

<body onload="init();" scroll="no" >

<div id="content" class="w_300 h_150 nTab overflow_hd">
<!-- 内容区域 -->
	<div class="TabTitle">
		<ul id="ttTabs">
			<li id="tab_training" class="normal">教育</li>
			<li id="tab_test" class="normal bd_r_1sccc">考试</li>
		</ul>
	</div>
	<div class="font_simsun padding_left_10 padding_right_10 padding_top_10">
		<div id="training" class="none">
			<div style="height:auto!important;min-height:68px;">
				<s:iterator value="courseInfoList" id="courseinfo">
				        <div class="position_rel h_22">
				        	<div class="position_abs">
								<s:url	action="../tt/training/j020041InitStudyMode" id="j020041Url">
									<s:param name="courseId" value="%{#courseinfo.courseId}"></s:param>
								</s:url>
								<s:a href = "%{j020041Url}" target="_blank" title="%{courseName}"><s:property value="courseName" /></s:a>
							</div>
	<!--						<div class="position_abs abs_right">
									<s:if test="necessaryFlag == 1"><s:label value="必修"/></s:if><s:else><s:label value="非必修"/></s:else>
								</div>	-->
						</div>
				</s:iterator>
			</div>
			<div class="float_r clear_both">			
			<!-- 更多课程 -->
			<s:url action="../tt/manager/g100011InitSearchCourseInfo" id="urlMore"></s:url> 
			<s:a href = "%{urlMore}" target="_blank" title=">>更多课程">>>更多课程</s:a>
			<!-- 我关注的课程 -->
<!--		<s:url action="../tt/manager/g100011InitSearchCourseInfo" id="urlMore2">
				<s:param name="courseInfo.attentionFlag" value="1"></s:param>
			</s:url> 
			<s:a href = "%{urlMore2}" target="_blank" title=">>我关注的课程">>>我关注的课程</s:a> -->
			</div>
		</div>
		<div id="test" class="none">
			<div style="height:auto!important;min-height:68px;">
				<s:iterator value="examineInfoList" id="examineinfo">
				        <div class="position_rel h_22">
					        <div class="position_abs">			        
								<s:url	action="../tt/testing/k060021InitTestDetails" id="k060021Url">
									<s:param name="examineId" value="%{#examineinfo.examineId}"></s:param>
								</s:url> 
								<s:a href = "%{k060021Url}" target="_blank"  title="%{examineName}"><s:property value="examineName" /></s:a> 
							</div>	
	<!--					<div class="position_abs abs_right">
								<s:if test="mustExamineFlg == 2"><s:label value="必考"/></s:if><s:else><s:label value="非必考"/></s:else>	
							</div> -->
						</div>
				</s:iterator>
			</div>
			<div class="float_r clear_both">
				<!-- 更多考试 -->
				<s:url action="../tt/manager/g100011InitSearchExamineInfo" id="urlMore">
				</s:url> 
				<s:a href = "%{urlMore}"  target="_blank"  title=">>更多考试">>>更多考试</s:a>
				<!-- 我报名的考试 -->
<!--			<s:url action="../tt/manager/g100011InitSearchExamineInfo" id="urlMore2">
					<s:param name="courseInfo.attentionFlag" value="1"></s:param>
				</s:url> 
				<s:a href = "%{urlMore2}"  target="_blank"  title=">>我报名的考试">>>我报名的考试</s:a> -->
			</div>
		</div>
<!-- 内容区域 -->
	</div>
</div>
<!--[if IE 6]>
	<script type="text/javascript" src="<%=path %>/js/common/fix/IE7.js">IE7_PNG_SUFFIX = "-ie6.png";</script>
<![endif]-->
</body>
</html>