<%--
 * @(#)k070021.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 考试系统
--%>
<%--
 * 成绩一览（主页面JSP）
 * @author tengchanglong
 * @version 1.00 2010/03/22
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
	
	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/ttTesting/k070021.js"></script>
	
	<title>成绩一览</title>
</head>

<body onload="initPage()">
<div class="container">
<s:include value="../manager/head.jsp" />
<div class="span-24 margin_top_2">
<div class="tt_module padding_bottom_4 overflow_hd">
<s:include value="../manager/navigator.jsp" />
<div id="div_main"  class="container showgrid">
	<div class="span-24 padding_top_8 title_tt">
		<h2>成绩一览</h2>
	</div>
			
			<!--保存传入参数-->
			<s:hidden id="examId" name="examId"></s:hidden>
            <div class="span-24">
				<div class="span-23 margin_top_6 prepend-h">									  
					<input type="radio" id="showpart" name="control" value="part" onclick="listPart();">
					<label>显示有效成绩</label>
				</div>
				<div class="clear_both"></div>				
				<div class="span-23 margin_top_6 prepend-h">										 
					<input type="radio" id="showall" name="control" value="all" checked="checked" onclick="listAll();">
					<label>显示全部成绩</label>
				</div>
				<div class="clear_both"></div>
			</div>
	
		    <!-- 成绩信息列表画面 -->
			<s:form action="" method="post"  name="scoreForm" id = "scoreForm">	
			    <div id="div_score_list" class="span-24">
					<s:include value="k070021_list.jsp" />
				</div>
		 	</s:form>	 	
	 	</div>
</div>
</div>
<s:include value="../manager/foot.jsp" />
</div>
</body>

</html>