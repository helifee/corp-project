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
	<script type="text/javascript" src="<%=basePath %>js/common/formValidation.js"></script>	

	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/ttManager/g100011.js"></script>

	<title>课程检索</title>
</head>
<body onload="initSearchCourseInfo()">
<div class="container">
<s:include value="../manager/head.jsp" />
<div class="span-24 margin_top_2" >
<div class="tt_module padding_bottom_4 overflow_hd">
<s:include value="../manager/navigator.jsp" />
<div id="div_main"  class="container showgrid">
	<div class="span-24 padding_top_8 title_tt">
		<h2>课程检索</h2>
	</div>

<div class="span-24 margin_top_2" >
<!-- left area -->
<div class="span-18">
	<!-- 检索条件-->
  	<s:form id="courseInfoForm" action="g100011SearchCourseInfoList.action"  validate="true">
		<div class="span-17">
			<div class="span-2 text_right">	        
              	<s:label id="courseNameLbl" value="课程名称："/>
	        </div>
	        <div class="span-12 append-2 last">
              	<s:textfield id="courseName" name="courseInfo.courseName" cssClass="span-9" maxlength="100"/>
	        </div>
    	</div>
		<div class="span-17">
			<div class="span-2 text_right">	        
               <s:label id="categoryLbl" value="分类："/>
			</div>
		  	<div class="span-12 append-2 last">
				<select class="span-3" id="courseCategory1" name="courseInfo.category1Id" type="category1Id"></select>
				<select class="span-3" id="courseCategory2" name="courseInfo.category2Id" type="category2Id"></select>
				<select class="span-3 last" id="courseCategory3" name="courseInfo.category3Id" type="category3Id"></select>
		  	</div>
		</div>
		<div class="span-17">
	        <div class="span-2 text_right">	        
               	<s:label id="attentionLbl" value="状态："/>
	        </div>
		   	<div class="span-13 append-2 last">
	        	<div class="span-2">
	        		<s:checkbox id="necessaryFlagList[0]"  name="necessaryFlagList[0]"/>
	        		<s:label for="necessaryFlagList[0]" value="必修"/>
	        		<s:hidden id="courseInfo.necessaryFlagList[0]" name="courseInfo.necessaryFlagList[0]"/>
	        	</div>
	        	<div class="span-2 last">
	        		<s:checkbox id="necessaryFlagList[1]"  name="necessaryFlagList[1]" onclick="unselAttention()"/>
	        		<s:label for="necessaryFlagList[1]" value="非必修" onclick="unselAttention()"/>
	        		<s:hidden id="courseInfo.necessaryFlagList[1]" name="courseInfo.necessaryFlagList[1]"/>
	        	</div>
	        	<div class="span-2">
	        		<s:checkbox id="attentionFlagListNew[0]" name="attentionFlagListNew[0]" onclick="selNecessary()"/>
	        		<s:label for="attentionFlagListNew[0]" value="关注" onclick="selNecessary()"/>
	        		<s:hidden id="courseInfo.attentionFlagList[0]" name="courseInfo.attentionFlagList[0]"/>
	        	</div>
	        	<div class="span-2 last">
	        		<s:checkbox id="attentionFlagListNew[1]" name="attentionFlagListNew[1]" onclick="selNecessary()"/>
	        		<s:label for="attentionFlagListNew[1]" value="不关注" onclick="selNecessary()"/>
	        		<s:hidden id="courseInfo.attentionFlagList[1]" name="courseInfo.attentionFlagList[1]"/>
	        	</div>		        		        	
				<input type="button" id="searchcourseinfoBtn" name="searchcourseinfoBtn" 
         			class="span-2 btn" value="检索" onclick="searchCourseInfo()">
			</div>
		</div>	    	
	</s:form>
	<!-- 检索结果-->
	<div id="div_courseInfoList" class="span-17 margin_top_6">
		<s:include value="g100011_courseinfolist.jsp" />
	</div>
	<!-- 保存检索的部门id用于 点击分页时的查询参数 -->
	<s:hidden id="oldParam" name="oldParam" value=""/>
</div>
<!-- right area -->
<div class="span-6 last">
    <div class="tt_module margin_right_8" >
      <div class="tt_module_header">快捷检索条件</div>
      <div id="div_book_mark_list" class="tt_module_body" style="height:auto!important;min-height:200px;">
 
       </div>
    </div>
</div>
</div>

 <div class="clear_both"></div>
 </div>
</div>
</div>
 <s:include value="../manager/foot.jsp" />
</div>
</body>
</html>

