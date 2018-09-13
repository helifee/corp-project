<%--
 * @(#)k050011.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 考试子系统
--%>

<%--
 * 
 * 
 * @author jiaosunquan
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
	<script type="text/javascript" src="<%=basePath %>js/common/JsInputFilter.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/JsNameFilter.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/ttManager/ttCommon.js"></script>	

	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/ttTesting/k050011.js"></script>
	
	<title>试卷新建及权限分配</title>
</head>
<body onload="initForm()" style="overflow-x:hidden;overflow-y:auto;">
<div class="container">
<s:if test="mode != 10">
<s:include value="../manager/head.jsp" />
</s:if>
<div class="span-24 margin_top_2">
<div class="tt_module padding_bottom_4 overflow_hd">
<s:if test="mode != 10">
<s:include value="../manager/navigator.jsp" />
</s:if>
<div id="div_main" class="container showgrid">
	<div class="span-24 padding_top_8 title_tt">
		<h2>试卷新建及权限分配</h2>
	</div>
			
<s:form id="k050011Form" validate="true" action="k050011UpdatePaper">
	<!--画面模式-->
	<s:hidden id="mode" name="mode" />	
	<!-- 创建对象 -->
	<s:hidden id="belongId" name="testPaperInfo.belongId" />
	<!-- 试卷版本号 -->
	<s:hidden id="paperVersionNo" name="testPaperInfo.paperVersionNo" />
	<!-- 试卷ID -->
	<s:hidden id="paperId" name="testPaperInfo.paperId" />	
	<!-- 试卷标题 -->
    <div class="span-24 ">
        <div class="span-3 text_right">
			<s:label value="试卷标题：" />	        	        
        </div>
        <div class="span-12 append-9 last">
        <s:textfield id="paperTitle" name="testPaperInfo.paperTitle" maxlength="50" cssClass="span-10"/>
        </div>
    </div>
    <!-- 试卷分类 -->
    <div class="span-24 ">
        <div class="span-3 text_right">
       		<s:label value="试卷分类：" />	  	        
        </div>
        <div class="span-3"><select id="sltCategory1" name="category1Id" type="category1Id" class="span-3" defaultValue="${sltCategory1}" accesskey="${sltCategory1Enable}"></select></div>
        <div class="span-3"><select id="sltCategory2" name="category2Id" type="category2Id" class="span-3" defaultValue="${sltCategory2}" accesskey="${sltCategory2Enable}"></select></div>
        <div class="span-3 append-12 last">
        	<select id="sltCategory3" name="category3Id" type="category3Id" class="span-3" defaultValue="${sltCategory3}" accesskey="${sltCategory3Enable}"></select></div>
    	</div>
	<!--审批者-->
	<div class="span-24 ">
        <div class="span-3 text_right">
       		<s:label value="审批者：" />	  	        
        </div>
        <div class="span-2">	        
     	<s:textfield id="approverUserId" name="approverInfo.userId"
				maxlength="6" cssClass="span-2" />
        </div>
        <div class="span-2 append-17 last">
        <s:textfield id="approverUserNM" name="approverInfo.userName" cssClass="span-2" />
        </div>
    </div>
	<!-- 编辑人员一览 -->
    <div class="span-24 ">
        <div class="span-3 append-21 text_right">
       		<s:label value="编辑人员一览：" />	  	        
        </div>
 	   	<!-- include:编辑人员一览共通(jsp) -->
		<s:include value="../manager/editorList.jsp" />
    </div>
	    
	<div class="span-14 text_right margin_top_4">
		<s:if test="mode == 1">
			<input type="button" id="btnOK" name="refer" class="span-2 btn" value="确定"
				onclick="submitInsert();"/>	      
		</s:if>	
		<s:if test="mode == 2">
			<input type="button" id="btnOK" name="refer" class="span-2 btn" value="确定"
				onclick="submitUpdate();"/>	      
		</s:if>	
		<s:if test="mode == 9">
			<input type="button" id="btnOK" name="refer" class="span-2 btn" value="确定"
				onclick="submitInsertCopy();"/>	      
		</s:if>	
		<s:if test="mode == 10">
			<input type="button" id="btnOK" name="refer" class="span-2 btn" value="确定"
				onclick="submitInnerInsert();"/>	      
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
<s:if test="mode != 10">
<s:include value="../manager/foot.jsp" />
</s:if>	
</div>
</body>
</html>
