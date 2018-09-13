<%--
 * @(#)j030121_main.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 教育
--%>

<%--
 * 插入练习画面（主页面JSP）
 * 
 * @author shiyanyan
 * @version 1.00 2010/05/14
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
	<!--[if IE]>
		<link rel="stylesheet" href="../../css/ie.css" type="text/css" media="screen, projection" />
	<![endif]-->
	<link href="<%=basePath%>${session.userTheme}" rel="stylesheet" type="text/css">

	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/commonMessage.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/ttManager/ttCommon.js"></script>

	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/ttTraining/j030121.js"></script>
	
	<title>插入练习</title>
</head>

<body style="overflow-x:hidden;overflow-y:auto;">
<div class="span-20 showgrid">
	<s:form id="creatNewTestForm" method="post"  >	
    	<!-- title -->
        <div class="span-20 padding_top_8 title_tt"><h2>插入练习</h2></div>
        <!--插入练习画面--> 
        <div class="span-20">
            <div class="span-3 text_right"><s:label value="练习链接文字："/></div>
            <div class="last"><s:textfield cssClass="span-8" id="linkWord" maxlength="20"/></div>
        </div>
        <div>
        	<input class="btn" type="button" id="doCreate" name="doCreate" value="新建练习" onclick="createNewTest()"/>
        </div>
		<s:hidden id="bookId" name="bookId"/>
		<s:hidden id="editNo" name="editNo"/>
	</s:form>	
    <div id="div_update_list" class="span-20">
		<s:include value="j030121_testlist.jsp" />
	</div>
</div>  
</body>
</html>