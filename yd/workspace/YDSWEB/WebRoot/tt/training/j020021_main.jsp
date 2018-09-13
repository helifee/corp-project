<%--
 * @(#)J020021.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 教育子系统
--%>

<%--
 * 课程检索一览
 * 
 * @author liuyiwei
 * @version 1.00 2010/03/15
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
	<script type="text/javascript" src="<%=basePath %>js/My97DatePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/ttManager/ttCommon.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/JsInputFilter.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/JsNameFilter.js"></script>

	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/ttTraining/j020021.js"></script>

	<title>课程检索一览</title>
</head>
<body onload="initForm()">
	<div class="container">
	<s:include value="../manager/head.jsp" />
		<div class="span-24 margin_top_2">
		<div class="tt_module padding_bottom_4 overflow_hd">
		<s:include value="../manager/navigator.jsp" />
		<div id="div_main"  class="container showgrid">
          <!-- title -->
          <div class="span-24 padding_top_8 title_tt">
          	<h2>课程检索一览</h2>
          </div>
          <!-- 可编辑课程 -->
          <div id="div_tt_training_editable_course" class="span-24">
              	  <!-- 控制div收缩区域 -->
              	  	<div onclick="resize()">
						<div class="icon font_weight_b">
							<a id="courseInfoIcon" class="img_opt opt_FillDown"></a>
							<span >检索条件</span>
						</div>
				   </div>
                  <div id="courseEditable">
	                  <%-- 生成校验js action="getBookListAction" method="post" namespace="/tt/training" validate="true" --%>
					  <%-- 正式运行用   action="" method="post"  --%>
	                  <s:form id="courseEditableInfoForm" name="courseEditableInfoForm" action="j020021GetEditableCourseInfo"
	                  			 validate="true">
		              	  <!-- 课程ID -->
		                  <div class="span-23">
		                      <div class="span-2 text_right"><s:label id="editablecourseidLbl" value="课程ID："/></div>
		                      <div class="span-2"><s:textfield id="courseId" name="courseEditableInfo.courseId" cssClass="span-2" maxlength="8"/></div>
		                      <div class="span-2 text_right"><s:label id="editablecoursenameLbl" value="课程名称："/></div>
		                      <div class="span-5 append-11 last"><s:textfield id="courseName" name="courseEditableInfo.courseName" cssClass="span-5" maxlength="100"/></div>
		                  </div>
		                  <!-- 课程分类 -->
		                  <div class="span-12">
		                      	<div class="span-2 text_right"><s:label id="editablecoursecategoryLbl" value="课程分类："/></div>
								<select class="span-3" id="editableCategory1" name="courseEditableInfo.category1Id" type="category1Id"></select>
								<select class="span-3" id="editableCategory2" name="courseEditableInfo.category2Id" type="category2Id"></select>
								<select class="span-3 last" id="editableCategory3" name="courseEditableInfo.category3Id" type="category3Id"></select>	              
		                  </div>
		                  <div class="span-2">
								<input type="button" id="searcheditableBtn" name="searcheditableBtn" class="span-2 btn" value="检索" onclick="searchEditableCourse()" />
		                  </div>
		              	  <div class="span-2 last">
		                	    <input type="button" id="clearEditableBtn" name="clearEditableBtn" class="span-2 btn" value="清空" onclick="clearSearchCondition(1)" />
		                  </div>
		                  <!-- 更新日期 -->
		                  <!--
		                  <div class="span-23">
		                      <div class="span-2 text_right"><s:label id="editablecourseupdateTimeLbl" value="更新日期："/></div>
		                      <div class="span-5 append-3">
			                      <s:textfield id="updateTimeFrom" name="courseEditableInfo.updateTimeFrom" onclick="WdatePicker()" cssClass="span-2"/>
			                      <s:label id="wavesLineLbl" value="～"/>
			                      <s:textfield id="updateTimeTo" name="courseEditableInfo.updateTimeTo" onclick="WdatePicker()" cssClass="span-2"/>
		                      </div>
		                   </div>
		                   -->
		                   <s:hidden id="oldParam" name="oldParam" value=""/>
	                  </s:form>
	                  </div>
	                  <!-- 新建课程按钮 -->
	                  <s:if test="courseManager == true">
		                  <div class="span-2 prepend-h append-18 margin_top_4">
		                  	<input type="button" id="creatcourseBtn" name="creatcourseBtn" class="span-2 btn" value="新建课程" onclick="creatCourse()" />
		                  </div>
	                  </s:if>
	                  <!-- 可编辑课程一览 -->                  
					  <div class="span-23 prepend-h margin_top_6">
						<table class="datagridtt ellipsis">
							<tr>
								<th class="percent_8">课程ID</th>
								<th class="percent_24">课程名称</th>
								<th class="percent_12">课程分类</th>
								<th class="percent_8">课程状态</th>
								<th class="percent_8">开课状态</th>
								<th class="percent_6">创建者</th>
								<th class="percent_6">更新者</th>
								<th class="percent_8">更新日期</th>
								<th>操作</th>
							</tr>
						</table>
					  </div>
					  <div id='div_editable_course_list' class="span-23 prepend-h last">
	                  	<s:include value="j020021_editablelist.jsp" />	                  
	                  </div>
          </div>
          <!-- 可审批课程 -->
          <%--  风格统一 合并可编辑与可审批 2010/08/17 sundefu comment
          <div id="div_tt_training_confirmable_course" class="span-24">
          	<fieldset class="container span-23">
          	  	<!-- 控制div收缩区域 -->
                <legend class="color_bl font_size_14 font_weight_b" onclick="resize('courseConfirmable','confirmIcon')">
				<a id="confirmIcon" class="img_opt opt_Plus"></a>可审批课程
                </legend>
                <div id="courseConfirmable">
	                <!-- 可审批课程一览 -->
					<div class="span-16 margin_top_6">
						<table class="datagridtt ellipsis">
						    <tr>
						        <th class="span-2">课程ID</th>
						        <th class="span-6">课程名称</th>
						        <th class="span-3">课程分类</th>
						        <th class="span-2">课程状态</th>
						        <th>操作</th>
						    </tr>
						</table>
					</div>
	                <div id='div_confirmable_course_list' class="span-23 last">
	                	<s:include value="j020021_confirmablelist.jsp" />	                  
	                </div>
                </div>
            </fieldset>
          </div>
          --%>
          <!-- 参与课程 -->
          <%-- 同一页面风格，使用需求变更 参与课程一览删除 2010/08/17 sundefu comment
          <div id="div_tt_training_paticipate_course" class="span-24">
              <fieldset class="container span-23">
                  <!-- 控制div收缩区域 -->
                  <legend class="color_bl font_size_14 font_weight_b" onclick="resize('coursePaticipate','paticipateIcon')">
				  <a id="paticipateIcon" class="img_opt opt_Plus"></a>参与课程
                  </legend>
                  <div id="coursePaticipate">

	                  <!-- 参与课程一览 -->
					  <div class="span-23 margin_top_6">
						<table class="datagridtt ellipsis">
							<tr>
								<th class="percent_8">课程ID</th>
								<th class="percent_28">课程名称</th>
								<th class="percent_12">课程分类</th>
						        <th class="percent_8">课程状态</th>
								<th class="percent_24">课程编辑者</th>
								<th>操作</th>
							</tr>
						</table>
					  </div>
	                  <div id='div_paticipate_course_list' class="span-23 last">
	                  	<s:include value="j020021_paticipatelist.jsp" />	                  
	                  </div>
                  </div>
              </fieldset>
          </div>
          --%>
          <div class="clear_both"></div>
	</div>
</div>
	</div>
    
	<s:include value="../manager/foot.jsp" />
	</div>
</body>
</html>