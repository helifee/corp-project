<%--
 * @(#)searchGadget.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 活动桌面
--%>

<%--
 * 社员消息搜索
 * 
 * @author 远东)xupai
 * @version 1.00 2010/09/14
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
	<link href="<%=basePath%>css/gadget.css" rel="stylesheet" type="text/css">
	<link href="<%=basePath%>${session.userTheme}" rel="stylesheet" type="text/css">

	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/gadget/base.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/commonMessage.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/formValidation.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/JsInputFilter.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/JsNameFilter.js"></script>

	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/gadget/searchGadget.js"></script>
	
	<base target="main">
	<title>社内搜索</title>
</head>
<body scroll="no" onload="init();">
<div id="content" class="w_300">
<!-- 内容区域 -->
	<div class="font_simsun padding_left_10 padding_right_10 padding_top_10">
		<div class="position_rel h_22">
			员工ＩＤ：  <input type="text" id="userId" name="idInput"  class = "span-2"/>
			员工姓名： <input type="text" id="userNm" name="nameInput" class = "span-2"/>
		</div>
		<div class="position_rel h_22">
			<input type="button" id="tel" name="search" Value="电话" class="btn span-2" onclick="searchMumInfo()"/>
			<input type="button" id="site" name="search" Value="坐席" class="btn span-2" onclick="searchSeatInfo()"/>
		</div>
		<div class="position_rel h_22" id="div_gd_tel"  align="left" ></div>
	</div>
	<div class="position_rel h_22  separator"/></div>
	<div class="font_simsun padding_left_10 padding_right_10 padding_top_10">
		<div class="prepend-1 position_rel h_22">
			<s:form action="http://www2.yds.yd/wiki/index.php/Special:Search"  method="get"  target="_blank"> 
				<s:textfield id="wikitxt" name="search" cssClass=" span-4"/>
				<input type="submit" id="wikibtn" name="wikibtn" Value="维基百科" class="btn span-2" />
			</s:form>
		</div>
	</div>
</div>
</body>
</html>