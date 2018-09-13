<%--
 * @(#)J020011.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 教育子系统
--%>

<%--
 * 新建课程及权限分配（主页面JSP）
 * 
 * @author qianguorong
 * @version 1.00 2010/03/11
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
	<script type="text/javascript" src="<%=basePath %>js/common/JsInputFilter.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/JsNameFilter.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/ttManager/ttCommon.js"></script>	
	
	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/ttTraining/j020011.js"></script>

	<title>新建课程及权限分配</title>
</head>
<body onload="initForm()">
<div class="container">
<s:include value="../manager/head.jsp" />
<div class="span-24 margin_top_2">
<div class="tt_module padding_bottom_4 overflow_hd">
<s:include value="../manager/navigator.jsp" />
<div id="div_main"  class="container showgrid">
	<div class="span-24 padding_top_8 title_tt">
		<h2>新建课程及权限分配</h2>
	</div>

	<s:form id="courseInfoForm" validate="true"
		action="%{mode==1?'j020011InsertCourse':(mode==2?'j020011UpdateCourse':'')}" >
		<!--画面模式-->
 		<s:hidden id="mode" name="mode" />
 		<!--开课状态-->
		<s:hidden id="coursePublishStatus" name="courseInfo.coursePublishStatus" />
	    <!-- 状态 -->
	    <s:if test="mode == 2">
	    <div class="span-24">
	        <div class="span-3 text_right">
				<s:label value="状态：" />	        
	        </div>
	        <div class="span-2">
				<s:label id="courseInfo.coursePublishStatusNm" name="courseInfo.coursePublishStatusNm" keep="1"/>
	        </div>
	        <div class="span-2">
	        	<s:if test="courseInfo.courseConfirmStatus == 3 && courseInfo.coursePublishStatus != 2">
		        	<input type="button" id="courseStart" name="refer" value="开课" class="span-2 btn"
						onclick="submitCourseStart()"/>
				</s:if>
				<s:if test="courseInfo.courseConfirmStatus != 3 || courseInfo.coursePublishStatus == 2">
		        	<input type="button" id="courseStart" name="refer" value="开课" class="span-2 btn disabled"/>
				</s:if>
	        </div>
	        <div class="span-2 append-13 last">
	        	<s:if test="courseInfo.coursePublishStatus==2">
		        	<input type="button" id="courseStop" name="refer" value="停课" class="span-2 btn"
						onclick="submitCourseStop()"/>	 
				</s:if>   
				<s:if test="courseInfo.coursePublishStatus!=2">
		        	<input type="button" id="courseStop" name="refer" value="停课" class="span-2 btn disabled"/>	 
				</s:if>    
	        </div>
	    </div>
	    </s:if>
		<!-- 课程ID -->
		<s:hidden id="courseId" name="courseInfo.courseId"></s:hidden>
	    <!-- 课程名称 -->
	    <div class="span-24 ">
	        <div class="span-3 text_right">
				<s:label value="课程名称：" />	        	        
	        </div>
	        <div class="span-12 append-9 last">
	        <s:textfield id="courseName" name="courseInfo.courseName" maxlength="100" cssClass="span-10"/>
	        </div>
	    </div>
	    <!-- 课程分类 -->
	    <div class="span-24 ">
	        <div class="span-3 text_right">
	       		<s:label value="课程分类：" />	  	        
	        </div>
	        <div class="span-3"><select id="sltCategory1" name="category1Id" type="category1Id" class="span-3" defaultValue="${sltCategory1}" accesskey="${sltCategory1Enable}"></select></div>
	        <div class="span-3"><select id="sltCategory2" name="category2Id" type="category2Id" class="span-3" defaultValue="${sltCategory2}" accesskey="${sltCategory2Enable}"></select></div>
	        <div class="span-3 append-12 last">
	        					<select id="sltCategory3" name="category3Id" type="category3Id" class="span-3" defaultValue="${sltCategory3}" accesskey="${sltCategory3Enable}"></select></div>
	    </div>
	    <!-- 审批者 -->
	    <div class="span-24 ">
	        <div class="span-3 text_right">
	       		<s:label value="审批者：" />	  	        
	        </div>
	        <div class="span-2">	        
	     	<s:textfield id="approverUserId" name="approverInfo.userId"
					maxlength="6" cssClass="span-2 im_disabled" />
	        </div>
	        <div class="span-2 append-17 last">
	        <s:textfield id="approverUserNM" name="approverInfo.userName" cssClass="span-2" />
	        </div>
	    </div>
		<!-- 必修 -->
	    <div class="prepend-3 span-2 append-19 last">
	    	<s:checkbox id="necessaryFlag" name="necessaryFlag" fieldValue="true" value="necessaryFlag" /><s:label value="必修" />
	    </div>	    
	
	    <!-- 针对对象 -->
	    <div class="span-24 ">
	        <div class="span-3 text_right">
	       		<s:label value="针对对象：" />	  	        
	        </div>
	      	<!-- 针对对象 -->
	        <div class="span-3" id="div_objectType">
	     		<s:select id="objectTypeList" name="courseInfo.objectType" list="targetList" 
					listKey="diffNo" listValue="diffName" cssClass="span-3" onchange="showSelectDiv()"/>
	        </div>
	     	<!-- 针对项目组 -->
	        <div class="span-3 append-15 display_block last none" id="div_project">
				<s:select id="obj2" name="objectValue2" list="orgList" 
					listKey="orgId" listValue="orgNm" cssClass="span-3 display_none"/>
	        </div>
	    	<!--针对工龄 -->
	        <div class="span-6 append-12 display_none last none" id="div_year">
	            <div class="span-2 text_right">
	            	<label id="txtShow">入社不满：</label>
	           	</div> 	            
	            <div class="span-3 last" >
	      			<s:select id="yearList" name="courseInfo.objectValue" list="joinYearList" 
						listKey="diffNo" listValue="diffName" cssClass="span-3"/>          
	            </div>
	        </div>
			<!-- 针对个人 -->
			<div class="span-3 last none" id="div_person_button">
              	<div>
              		<input type="button" value="选择人员" id="btnSelectUser" class="span-2 btn"
	                 onClick="userSelect(1,'div_person')"/>
	            </div>
          	</div>
        	<div class="span-18 prepend-6 none" id="div_person">
				<s:hidden id="userIdList" name="strUserIdList"/>
				<s:label id="strUserNameList" name="strUserNameList" keep="1"/>
			</div>
	    </div>
	    <!-- 编辑人员一览 -->
	    <div class="span-24 ">
	        <div class="span-3 append-21 text_right">
	       		<s:label value="编辑人员一览：" />	  	        
	        </div>
	       	<!-- include:编辑人员一览共通Jsp -->
			<s:include value="../manager/editorList.jsp" />
	    </div>
	    <div class="span-14  text_right margin_top_4">
			<s:if test="mode == 1">
		 		<input type="button" id="btnOK" name="refer" value="确定" class="span-2 btn"
					onclick="submitNewCourse();"/>	    
			</s:if>
		    <s:if test="mode== 2">
		 		<input type="button" id="btnOK" name="refer" value="确定" class="span-2 btn"
					onclick="submitUpdCourse();"/>	    
			</s:if>
		</div>
		<br>
		<!-- 错误信息 -->
		<div class="prepend-2 span-20">
			<s:fielderror></s:fielderror>
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