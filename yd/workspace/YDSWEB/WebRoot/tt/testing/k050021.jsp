<%--
 * @(#)k050021.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 考试子系统
--%>

<%--
 * 试卷一览画面（主页面JSP）
 * 
 * @author yinfuyan
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
	<script type="text/javascript" src="<%=basePath %>js/common/formValidation.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/commonMessage.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/JsInputFilter.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/JsNameFilter.js"></script>	
	<script type="text/javascript" src="<%=basePath %>js/My97DatePicker/WdatePicker.js"></script>
	
	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/ttManager/ttCommon.js"></script>	
	<script type="text/javascript" src="<%=basePath %>js/ttTesting/k050021.js"></script>
	
	<title>试卷一览</title>
</head>

<body onload="initPage();" style="overflow-x:hidden;overflow-y:auto;">
<div id="div_main" class="container">
  	<s:if test="modeKbn == 1">
		<s:include value="../manager/head.jsp" />
	</s:if>
	<div class="span-24 margin_top_2">
	<div class="tt_module padding_bottom_4 overflow_hd">
	<s:if test="modeKbn == 1">
		<s:include value="../manager/navigator.jsp" />
	</s:if>
	<div id="div_paperListInfo" class="container showgrid">
	<div class="span-24 padding_top_8 title_tt">
		<h2>试卷一览</h2>
	</div>
	<div onclick="resize()">
		<div class="icon font_weight_b">
			<a id="modifyIcon" class="img_opt opt_FillDown"></a>
			<span >检索条件</span>
		</div>
	</div>				   
    <!-- 试卷一览检索条件画面 -->
	<%-- 生成校验js action="k050021GetPaperList" method="post" namespace="/tt/testing" validate="true" --%>
	<%-- 正式运行用   action="" method="post"  --%>
    <s:form id="searchForm" action="k050021GetPaperList" method="post"  validate="true">
    	<div id="div_paperList_view" class="span-23">
			<!--检索条件部分-->
			<div class="span-23 ">
            	<!--试卷ID-->
				<div class="span-2 text_right">
					<s:label id="paperId" value="试卷ID："/>
				</div>
				<div class="span-2 text_left">
					<s:textfield id="txtPaperId" name="paperListInfo.paperId" maxlength="8" cssClass="span-2 im_disabled"/>
				</div>
				<!--试卷标题-->
				<div class="span-2 text_right">
					<s:label id="paperTitle" value="试卷标题："/>
				</div>
				<div class="span-4 text_left">
					<s:textfield id="txtPaperTitle" name="paperListInfo.paperTitle" maxlength="50" cssClass="span-4"/>
				</div>
				<!--创建者-->
				<div class="span-6">
					<div class="span-2 text_right">
						<s:label id="approvUser" value="创建者："/>
					</div>
					<s:textfield id="txtCreateUserId" name="paperListInfo.createUserId" maxlength="6" cssClass="span-2 im_disabled"/>
					<s:textfield id="txtCreateUserName" name="paperListInfo.createUserName" maxlength="30" cssClass="span-2"/>
				</div>
				<!--更新者-->
				<div class="span-6">
					<div class="span-2 text_right">
						<s:label id="updateUser" value="更新者："/>
					</div>
					<s:textfield id="txtUpdateUserId" name="paperListInfo.updateUserId" maxlength="6" cssClass="span-2 im_disabled"/>
					<s:textfield id="txtUpdateUserName" name="paperListInfo.updateUserName" maxlength="30" cssClass="span-2"/>
			    </div>
			</div>
			<div class="span-23 ">
				<!--试卷状态-->
				<div class="span-2 text_right">
					<s:label id="paperStatus" value="试卷状态："/>
				</div>
				<div class="span-2">
					<s:select id="sltPaperStatusList" name="paperListInfo.paperStatus" list="paperStatusList" listKey="diffNo" listValue="diffName" cssClass="span-2"/>
				</div>
				<!--试卷分类-->
				<div class="span-2 text_right">
					<s:label id="paperType" value="试卷分类："/>
				</div>
				<div class="span-9">
					<select class="span-3" name="category1Id" id="sltCategory1" type="category1Id" defaultValue="${category1}" accesskey="${sltCategory1Enable}">
					</select>
					<select class="span-3" name="category2Id" id="sltCategory2" type="category2Id" defaultValue="${category2}" accesskey="${sltCategory2Enable}">
					</select>
					<select class="span-3" name="category3Id" id="sltCategory3" type="category3Id" defaultValue="${category3}" accesskey="${sltCategory3Enable}">
					</select>
				</div>
				<div class="text_right span-5">
					<input type="button" id="btnSearch" name="search" value="检索" class="btn span-2" onclick="getPaperListInfo();" >
                    <input type="button" id="btnClear" name="clear" value="清空" class="btn span-2" onclick="resetCondition();" >
      			</div>
			</div>
		</div>
		<!-- 画面模式 -->
		<s:hidden id="modeKbn" name="modeKbn"/>
		<!-- 考试标志 -->
		<s:hidden id="examineFlg" name="examineFlg"/>
		<!-- 考试管理者区分 -->
		<s:hidden id="testManager" name="paperListInfo.testManager"/>
    </s:form>
    <!-- 保存检索的条件用于 点击分页时的查询参数 -->
    <s:hidden id="oldParam" name="oldParam" value=""/>
    <s:if test="modeKbn == 1 && paperListInfo.testManager == true">
	    <div class="span-23 prepend-h margin_top_4">
			<input type="button" value="新建试卷" id="btnCreatNewPaper" class="btn span-2" onclick="createNewPaper()" >
		</div>
    </s:if>
    <!-- 试卷一信息列表画面 -->
	<div id="div_pagerCommonAjax" class="span-23 prepend-h margin_top_4">
		<s:include value="k050021_list.jsp" />
	</div>
	<s:if test="modeKbn == 2">
		<div class="span-23 text_center">
 			<input type="button" class="btn span-2" value="选择" id="btnChoosePaper" onclick="returnChosenPaper()" >
		</div>
	</s:if>
	</div>
    </div>
  	</div>
  	<s:if test="modeKbn == 1">
		<s:include value="../manager/foot.jsp" />
	</s:if>
</div>
</body>
</html>