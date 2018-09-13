<%--		
 * @(#)k060051.jsp		
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司		
 * All rights reserved.		
 *      Project: 教育考试培训系统
 *    SubSystem: 教育子系统
--%>
<%--
 * 考试检索一览（主页面JSP）
 *
 * @author wangqingzhu
 * @version 1.00 2010/03/29
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
	
	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/ttTesting/k060051.js"></script>
	<title>考试检索一览</title>
</head>
<body class="font_size_12" onload="initForm()">

	<div class="container showgrid">
		<s:include value="../manager/head.jsp" />
		<div class="span-24 margin_top_2">
		<div class="tt_module padding_bottom_4 overflow_hd">
		<s:include value="../manager/navigator.jsp" />　　
	 
		<div class="span-24 padding_top_8 title_tt">
			<h2>考试检索一览</h2>
		</div>
		<s:if test="edShowFlg == true">
		
		<fieldset class="container span-23">
        	<!-- 控制div收缩区域 -->
            <legend class="color_bl font_size_14 font_weight_b" onclick="resize('examineEdit','editIcon')">
				<a id="editIcon" class="img_opt opt_Plus"></a>编辑考试一览
            </legend>
        	<div id="examineEdit" class="span-23 margin_top_6 h_360">
        	
        	    <%-- 生成校验js action="k060051SearchEditInfo" method="post" namespace="/perm" validate="true" --%>
        		<%-- 正式运行用  id="editinfoForm"  --%>
            	<s:form id="editinfoForm" >	
					<div class="span-23">
						<div class="span-2 text_right">考试ID：</div>
						<!--考试ID-->
						<div class="span-3 text_left">
							<s:textfield id="edexamineId" name="k060051EditInfo.examineId" maxlength="8" cssClass="span-2"></s:textfield>
						</div>
						<div class="span-3 text_right">考试名称：</div>
						<!--考试名称-->
						<div class="span-9 text_left">
							<s:textfield id="edexamineNmae" cssClass="span-5" name="k060051EditInfo.examineName" maxlength="200"></s:textfield>
						</div>
					</div>
                 	<div class="span-23">
						<div class="span-2 text_right">考试分类：</div>
						<!--考试分类-->
						<div class="span-12 text_left">
							<select id="sltCategory1" name="category1Id" type="category1Id" Class="span-3"  defaultValue="${category1}" accesskey="${category1Flag}"></select>	
							<select id="sltCategory2" name="category2Id" type="category2Id" Class="span-3"  defaultValue="${category2}" accesskey="${category2Flag}"></select>
							<select id="sltCategory3" name="category3Id" type="category3Id" Class="span-3"  defaultValue="${category3}" accesskey="${category3Flag}"></select>
						</div>
						<div class="span-2 text_left">
					        <input type="button" id="esearchBtn" name="esearchBtn" value="检索" class="span-2 btn" onclick="searchEditExamine()" >
					    </div>
					</div>
				</s:form>
			    <div class="span-3 prepend-h margin_top_4">
			    	<s:if test="crShowFlg == true">
						<input type="button" id="createBtn" name="createBtn" value="新建考试" class="span-2 btn" onclick="examineNew()" >
					</s:if>
			    </div>
			  
			    <div class="clear_both"></div>
				<!-- 用于 点击分页时的查询参数 -->
				<s:hidden id="oldParamed" name="oldParamed" value=""/>
			    <div id="div_edit_list" class="span-23">
					<s:include value="k060051_editlist.jsp" />
				</div>
		    </div>
		    </fieldset>
	    </s:if>
	    <s:hidden id="edShowFlg" name="edShowFlg"></s:hidden>
	    <s:if test="imShowFlg == true">
	    	<fieldset class="container span-23">
        	<!-- 控制div收缩区域 -->
            <legend class="color_bl font_size_14 font_weight_b" onclick="resize('examineImpl','implIcon')">
				<a id="implIcon" class="img_opt opt_Plus"></a>实施考试一览
            </legend>
	   		<div id="examineImpl" class="span-23 margin_top_6">
	        	<%-- 生成校验js action="k060051SearchImplementInfo" method="post" namespace="/perm"  --%>
	        	<%-- 正式运行用   id="ImptinfoForm"  --%>
	        	
	        	<s:form id="ImptinfoForm" >
		            <div class="span-23">
		                <div class="span-2 text_right">考试ID：</div>
		                <!--考试ID-->
		                <div class="span-3 text_left">
		                    <s:textfield id="impexamineId" name="k060051ImplementInfo.examineId" maxlength="8" cssClass="span-2"></s:textfield>
		                </div>
		                <div class="span-3 text_right">考试名称：</div>
		                <!--考试名称-->
		                <div class="span-9 text_left">
		                    <s:textfield id="impexamineNmae" cssClass="span-5" name="k060051ImplementInfo.examineName" maxlength="200"></s:textfield>
		                </div>
		            </div>
		            <div class="span-23">
		                <div class="span-2 text_right">当前状态：</div>
		                <!--当前状态-->
		                <div class="span-3 text_left">
		                	<s:select id="examinests" name="k060051ImplementInfo.examineStatus" list="statusList" listKey="diffNo" 
		                		listValue="diffName" headerKey="" headerValue=""> 
		                	</s:select>
		                </div>
		                <!--考试开始日期-->
		       			<div class="span-3 text_right"><s:label value="考试开始日期：" /></div>
		            	<div class="span-6">
		            	<s:textfield id="examineStartDate" name="k060051ImplementInfo.examineStartDate" cssClass="span-2"
							onclick="WdatePicker()" /> 
						<s:label value="～" /> 
						<s:textfield id="examineEndDate" name="k060051ImplementInfo.examineEndDate"
							cssClass="span-2" onclick="WdatePicker()" /> 
						</div>
		                <div class="span-2 text_left">
		                	<input type="button" id="isearchBtn" name="isearchBtn" value="检索" class="btn span-2" onclick="searchImptExamine()" >
		                </div>
		            </div>
	            </s:form>
	            <div class="clear_both"></div>
	            <!-- 用于 点击分页时的查询参数 -->
				<s:hidden id="oldParamim" name="oldParamedim" value=""/>
	            <div id="div_implement_list" class="span-23">
					<s:include value="k060051_implementlist.jsp" />
				</div>
			</div>
			</fieldset>
		</s:if>
		<s:hidden id="imShowFlg" name="imShowFlg"></s:hidden>
		<div class="span-24 margin_top_10 margin_bottom_10 err">
             	<!--error区域-->
    	</div>
	  </div>
	<s:include value="../manager/foot.jsp" />
	</div>
	</div>
</body>
</html>