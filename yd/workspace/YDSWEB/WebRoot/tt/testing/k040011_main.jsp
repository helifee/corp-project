<%--
 * @(#)k040011_main.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 考试子系统
--%>
<%--
 * 题库检索一览（主页面JSP）
 * 
 * @author liangkezhen
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
	<script type="text/javascript" src="<%=basePath %>js/common/JsInputFilter.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/JsContentFilter.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/JsNameFilter.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/ttManager/ttCommon.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/My97DatePicker/WdatePicker.js"></script>
	
	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/ttTesting/k040011.js"></script>
	
	<title>题库检索一览</title>
</head>
<body onload="initForm()" style="overflow-x:hidden;overflow-y:auto;">
	<div class="container showgrid">
		<s:if test="questionUiModel == 1">	
		<s:include value="../manager/head.jsp" />
		</s:if>
		<div class="span-24 margin_top_2">
		<div class="tt_module padding_bottom_4 overflow_hd">
		<s:if test="questionUiModel == 1">	
		<s:include value="../manager/navigator.jsp" />
		</s:if>
		<div class="span-24 padding_top_8 title_tt">
			<h2>题库检索一览</h2>
		</div>
		<div onclick="resize()">
			<div class="icon font_weight_b">
				<a id="modifyIcon" class="img_opt opt_FillDown"></a>
				<span id="modifyTitle" >检索条件</span>
			</div>
		</div>
		<!--检索条件区域Start-->
		<s:form id="temporaryForm" action="" >
		</s:form>
		<div id="div_k040011_view" >
				<s:include value="k040011_view.jsp" />
		</div>
		<!--检索条件区域End-->
		<!--用户操作区域Start-->
		<div id="div_k040011_body" class="span-24">
			<s:if test="questionUiModel == 1">
				<div class="span-24 margin_top_10">
					<input type="button" id="btnNew" class="span-2 btn" value="新建试题" onclick="newQuestion()"/>
					<input type="button" id="btnInsert" class="span-2 btn none" value="批量录入" onclick="batchDeal(1)"/>
					<input type="button" id="btnUpdate" class="span-2 btn none" value="批量修改" onclick="batchDeal(2)" />
					<input type="button" id="btnDelete" class="span-2 btn none" value="批量删除" onclick="batchDeal(3)"/>
					<input type="button" id="btnCheck" class="span-2 btn none" value="批量核对" onclick="batchDeal(4)"/>
				</div>
			</s:if>
		</div>
		<!-- 用于 点击分页时的查询参数 -->
		<s:hidden id="oldParam" name="oldParam" value=""/>
		<!--检索一览区域Start-->
		<div id="div_k040011_list" class="span-24 margin_top_6">
			<s:include value="k040011_list.jsp" />
		</div>
		<div class="span-24 err">
		<!--error区域-->
		</div>
		</div>
		<s:if test="questionUiModel == 1">	
		<s:include value="../manager/foot.jsp" />
		</s:if>
		</div>
	</div>
	<s:hidden id="mode" name="mode"/>
	<s:hidden id="paperId" name="paperId"/>
</body>
</html>