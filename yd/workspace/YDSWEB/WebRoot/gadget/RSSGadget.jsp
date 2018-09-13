<%--
 * @(#)weatherGadget.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 活动桌面
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
	<link href="<%=basePath%>css/gadget.css" rel="stylesheet" type="text/css">
	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/gadget/base.js"></script>

	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/gadget/RSSGadget.js"></script>
	
<base target="main"> 
<title>新闻</title>
</head>
<body scroll="no" onload="init();">
<div id="content" class="w_300 h_150 nTab overflow_hd">
<!-- 内容区域 -->
	<div class="TabTitle">
		<ul id="newsTabs">
			<s:iterator value="content" status="stat">
				<li id="tab_${id}" class="normal"><s:property value="name"/></li>
			</s:iterator>
		</ul>
	</div>
	<div class="font_simsun padding_left_10 padding_right_10 padding_top_10">
		<s:iterator value="content">
			<div id="${id}" class="none nlist">
				<ul>
					<s:iterator value="content" status="stat">
						<s:if test="#stat.index < 8">
							<div class="position_rel h_22">					
								<img src="../images/activeDesk/infoIcon.png">
								<s:a href="%{link}" title="%{description}" target="_blank"><s:property value="title"/></s:a>
							</div>
						</s:if>
					</s:iterator>
				</ul>
				<div class="float_r clear_both"><s:a href="%{moreUrl}" target="_blank" title="更多&gt;&gt;">更多&gt;&gt;</s:a></div>
			</div>
		</s:iterator>
	</div>
</div>
</body>
</html>