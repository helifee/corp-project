<%--
 * @(#)G100011.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 管理子系统
--%>

<%--
 * 主画面
 * 
 * @author liuyiwei
 * @version 1.00 2010/03/30
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
	<script type="text/javascript" src="<%=basePath %>js/My97DatePicker/WdatePicker.js"></script>

	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/ttManager/g100011.js"></script>

	<title>教育考试培训系统</title>
</head>
<body onload="initForm()">
<div class="container">
  <s:include value="../manager/head.jsp" />
  <div class="span-24 margin_top_2">
    <div class="tt_module bgclr_tt">

      <div class="span-23 last font_weight_b padding_left_6">
		<s:label id="noticeLbl" value="公告："/>
        <marquee width="93%" height="18" scrollamount="2" onmouseover="this.stop()" onmouseout="this.start();" direction="left">
        	<s:property value="messageRemindingMarquee" escape="false" escapeJavaScript="false"/></marquee>
      </div>
      <div class="clear_both"></div>
    </div>
  </div>
  <div class="span-24 margin_top_2" >
    <div class="span-6">
      <div class="tt_module" >
        <div class="tt_module_header"><s:label id="remindingLbl" value="提醒"/></div>
        	<input type="hidden" id="basePathHid" name="basePathHid" value="<%=basePath%>">
	       	<div id="div_message_reminding_list" class="tt_module_body ellipsis margin_right_8" style="height:auto!important;min-height:76px;">
	        	<s:include value="g100011_messagereminding.jsp" />	
	        </div>
      </div>
      <div class="tt_module margin_top_6" >
        <div class="tt_module_header">书签</div>
        <div id="div_book_mark_list" class="tt_module_body" style="height:auto!important;min-height:76px;">
        	<s:include value="g100011_bookmark.jsp" />	
        </div>
      </div>
    </div>
	<div class="span-18 last">
	<div class="tt_module">
        <div class="tt_module_header"><s:label id="courseListLbl" value="课程一览"/></div>
        <div class="tt_module_body margin_left_6" style="height:auto!important;min-height:150px;">
        	<div class="tt_list">
        	
				<s:if test="courseInfoList.size > 0">
				<s:iterator value="courseInfoList" id="courseinfo" status="stat">
					<s:if test="#stat.index<2">
			        <div class="tt_list_header ellipsis">
							<s:url	action="../training/j020041InitStudyMode" id="j020041Url">
								<s:param name="courseId" value="%{#courseinfo.courseId}"></s:param>
							</s:url> <s:a href="%{j020041Url}" title="%{courseName}"><s:property value="courseId" />&nbsp;<s:property value="courseName" />
							</s:a>
					</div>
			        <div class="tt_list_body" style="height:auto!important;min-height:20px;">
						<s:property	value="courseAbstract" />
			        </div>
					<div class="tt_list_footer">
						发布日期：<s:property value="updateTime" />
						&nbsp;分类：<s:property value="categoryName" />
						&nbsp;<s:if test="necessaryFlag == 1"><s:label value="必修"/></s:if><s:else><s:label value="非必修"/>&nbsp;<s:property value="attentionFlag" /></s:else>
					</div>
					</s:if>
				</s:iterator>
				</s:if>	
					
        	</div>
		</div>
		<div class="tt_module_footer">
			<!-- 更多课程 -->
			<s:url action="g100011InitSearchCourseInfo" id="urlMore">
			</s:url> 
			<s:a href="%{urlMore}" title="所有课程一览">>>更多课程</s:a>&nbsp;
		</div>
	</div>
			
	<div class="tt_module margin_top_6">
        <div class="tt_module_header"><s:label id="examineListLbl" value="考试一览"/></div>
        <div class="tt_module_body margin_left_6" style="height:auto!important;min-height:150px;">
        	<div class="tt_list">
        	
				<s:if test="examineInfoList.size > 0">
				<s:iterator value="examineInfoList" id="examineinfo" status="stat">
					<s:if test="#stat.index<2">
			        <div class="tt_list_header ellipsis">
						<s:url	action="../testing/k060021InitTestDetails" id="k060021Url">
							<s:param name="examineId" value="%{#examineinfo.examineId}"></s:param>
						</s:url> 
						<s:a href="%{k060021Url}" title="%{examineName}"><s:property value="examineId" />&nbsp;<s:property value="examineName" /></s:a> 
						- <s:property value="examineFlgName" />&nbsp;<s:property value="examineTime" />分钟
					</div>
			        <div class="tt_list_body" style="height:auto!important;min-height:20px;">
						<s:property	value="examineComment" />
			        </div>
					<div class="tt_list_footer">
						考试状态：<s:property value="examineStatusName" />&nbsp;&nbsp;
						分类：<s:property value="categoryName" />&nbsp;&nbsp;
						<s:if test="mustExamineFlg == 2"><s:label value="必考"/></s:if><s:else><s:label value="非必考"/>&nbsp;<s:property value="attentionFlag" /></s:else>	
						<br>
						我的状态：<s:if test="examineStatus >0"><s:property value="empExamStatusName" /></s:if>
						<s:else>未报名</s:else>	&nbsp;&nbsp;
						<s:date name="applyClosingTime" id="applyClosingTimeFormat" format="yyyy-MM-dd HH:mm" />
						<s:date name="examineStartTime" id="examineStartTimeFormat" format="yyyy-MM-dd HH:mm" />
						报名截止时间：<s:property value="%{applyClosingTimeFormat}" />&nbsp;&nbsp;
						考试开始时间：<s:property value="%{examineStartTimeFormat}" />&nbsp;
						<s:url action="../testing/k060021InitTestDetails" id="enterTestUrl">
							<s:param name="examineId" value="%{#examineinfo.examineId}"></s:param>
						</s:url> 
						<s:a href="%{enterTestUrl}">进入</s:a>
					</div>
					</s:if>
				</s:iterator>
				</s:if>	
					
        	</div>
		</div>
		<div class="tt_module_footer">
			<!-- 更多考试 -->
			<s:url action="g100011InitSearchExamineInfo" id="urlMore">
			</s:url> 
			<s:a href="%{urlMore}" title="所有考试一览">>>更多考试</s:a>&nbsp;
		</div>
	</div>
	
    </div>
  </div>
 <div class="clear_both"></div>
 <s:include value="../manager/foot.jsp" />
</div>
</body>
</html>