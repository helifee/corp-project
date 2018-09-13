<%--
 * @(#)j030011.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 教育子系统
--%>

<%--
 * 新建教材及权限分配
 * 
 * @author wanqiuhong
 * @version 1.00 2010/03/12
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

	<!-- 画面用js-->
	<script type="text/javascript" src="<%=basePath %>js/ttManager/ttCommon.js"></script>	
	<script type="text/javascript" src="<%=basePath %>js/ttTraining/j030011.js"></script>
		
	<title>新建教材及权限分配</title>
</head>
<body onload="initForm()">
<div class="container">
<s:include value="../manager/head.jsp" />
<div class="span-24 margin_top_2">
<div class="tt_module padding_bottom_4 overflow_hd">
<s:include value="../manager/navigator.jsp" />
<div class="container showgrid">
	<!-- title -->
	<div class="span-24 padding_top_8 title_tt">
		<h2>新建教材及权限分配</h2>
	</div>
	
	<s:form id="bookInfoForm" validate="true" action="j030011NewBookToBook" method="post">        
		<!--画面模式-->
		<s:hidden id="mode" name="mode" />
		<!-- 状态 -->
	    <s:if test="mode == 3||mode == 4">
       	<!-- 教材状态 -->
		<div class="span-24">
            <div class="span-3 text_right"><s:label value="教材状态：" /></div>
			<div class="span-21 last"><s:label id="bookInfo.bookStatusName" name="bookInfo.bookStatusName" keep="1"/></div>
       	</div>
       	</s:if>               
       	<!-- 教材名称 -->
       	<div class="span-24">
       	   	<s:hidden id="bookId" name="bookInfo.bookId" />
           	<div class="span-3 text_right"><s:label value="教材名称：" /></div>
           	<div class="span-21 last"><s:textfield id="bookName" name="bookInfo.bookName" cssClass="span-10" maxlength = "100" /></div>
       	</div>
       	<!-- 教材分类 -->
       	<div class="span-24">
           	<div class="span-3 text_right"><s:label value="教材分类：" /></div>
           	<div class="span-21 last">
               	<div class="span-3"><select id="sltCategory1" name="category1Id" type="category1Id" Class="span-3"  defaultValue="${category1}" accesskey="${category1Flag}"></select></div>
               	<div class="span-3"><select id="sltCategory2" name="category2Id" type="category2Id" Class="span-3"  defaultValue="${category2}" accesskey="${category2Flag}"></select></div>
               	<div class="span-3"><select id="sltCategory3" name="category3Id" type="category3Id" Class="span-3"  defaultValue="${category3}" accesskey="${category3Flag}"></select></div>
           	</div>
       	</div>
       	<!-- 审批者 -->
       	<div class="span-24 ">
	   		<div class="span-3 text_right"><s:label value="审批者：" /></div>
	   		<div class="span-2"><s:textfield id="approverUserId" name="bookInfo.approverUserId" maxlength="6" cssClass="span-2" /></div>
 	   		<div class="span-2 append-17 last"> <s:textfield id="approverUserName" name="bookInfo.approverUserName" cssClass="span-2" /> </div>
 		</div>
       	<!-- 编辑号 -->
       	<s:hidden id="editNo" name="bookInfo.editNo" />
       	<!-- 创建课程 -->
       	<s:hidden id="belongCourseId" name="bookInfo.belongCourseId" />
       	<div class="prepend-3 span-21"><s:checkbox name="quoteFlag" fieldValue="true" id="quoteFlag" /><s:label value="可以被其他课程引用" /></div>
    	<!-- 编辑人员一览 -->
		<div class="span-24 ">
    		<div class="span-3 append-21 text_right">
   				<s:label value="编辑人员一览：" />	  	        
   			</div>
  			<!-- include:编辑人员一览共通Jsp -->
			<s:include value="../manager/editorList.jsp" />
		</div>
 		<div class="span-24 text_center">
 			<input type="button" id="btnOk" name="btnOk" value="确定" onclick="submitBookInfo()" class="btn span-2"/>
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