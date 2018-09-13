<%--
 * @(#)Yd0050.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 团购系统
--%>

<%--
 * 订单一览（主页面JSP）
 * 
 * @author 远东)lincheng
 * @version 1.00 2010/11/05
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

	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/gps/Yd0050.js"></script>
	
	<title>团购订单一览</title>
</head>
<body onload="initForm();">
<jsp:include page="../common/commonPage.jsp" />
<div class="ydscontainer">
<!-- 内容区域 -->
	<s:form id="getOrderList" action="yd0050GetOrderList" namespace="/gps" validate="true">
		<div class="span-24 margin_bottom_4">
			<div class="span-2 text_right">订单标题:</div>
			<div class="span-7">
				<s:textfield id="orderContent" name="yd0050CondA.orderContent" cssClass="span-6"></s:textfield>&nbsp;<s:fielderror />
				<s:hidden id="orderContentH" name="yd0050CondA.orderContent"></s:hidden>
			</div>
			<div class="span-2 text_right">发布日期:</div>
			<div class="span-5">
				<s:textfield id="sTime" name="yd0050CondA.createTime" cssClass="span-2" onfocus="WdatePicker()"></s:textfield> ～
				<s:hidden id="sTimeH"></s:hidden>
				<s:textfield id="eTime" name="yd0050CondA.createTime2" cssClass="span-2" onfocus="WdatePicker()"></s:textfield>
				<s:hidden id="eTimeH"></s:hidden>
			</div>
			<div class="span-3"><s:checkbox name="myOrder" id="myOrder"></s:checkbox><s:label for="myOrder" value="我的订单"></s:label></div>
			<div class="span-3 text_left"><input type="button" class="btn span-2" value="查 询" onclick="searchOrder()"/></div>
		</div>
		<%-- 分割线 --%>
		<div class="span-24 separator"></div>
		<!-- 订单一览 -->
		<div class="span-24 text_right"><input type="button" class="btn span-2" value="发起团购" onclick="window.open('yd0030Init?fromId=yd0050','_self')"/></div>
		<div id="table_peo" class="span-24 box_border margin_top_4">
			<s:include value="Yd0051.jsp" />
		</div>
	</s:form>
<!-- 内容区域 -->
</div>
</body>
</html>