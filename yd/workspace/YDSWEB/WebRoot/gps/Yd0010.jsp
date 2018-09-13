<%--
 * @(#)Yd0010.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 社内团购
--%>

<%--
 * 个人账户管理画面
 * 
 * @author pengchuan
 * @version 1.00 2010/10/28
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>
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
	<link rel="stylesheet" type="text/css" href="<%=basePath %>js/tafelTree/css/tree.css" />

	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/commonMessage.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/formValidation.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/JsInputFilter.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/common/JsNameFilter.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/My97DatePicker/WdatePicker.js"></script>

	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/gps/Yd0010.js"></script>
	
	<title>个人账户管理</title>
</head>
<body onload="initForm()">
<jsp:include page="../common/commonPage.jsp"></jsp:include>
<div id="div_emp_main"  class="ydscontainer">
	<div id="div_personal_account" class=" span-24">
			<div class="span-10">
				<s:label  value="账户余额："></s:label>
			    <s:label id="remain" name="accRemain" cssClass="money"></s:label>&nbsp;元&nbsp;&nbsp;
			 	<!-- <s:a href="#this" onclick="transAccount()" cssClass="a_click">转账</s:a> 
			       <input type="button" value="转账" class="span-2 btn" onclick="transAccount()" />
				 -->
				 <img alt="转账" class="cur_pointer" src="../images/gps/btnTansfer.png" onclick="transAccount()">
			</div>
	</div>
	
	<s:form id="accountInfoForm" action="yb0010FindEmpLst" namespace="/employee" method="post" validate="true">
			<div class="span-24 margin_top_20">
			
				<div class="span-4"><H4>我的收支明细</H4></div>
				<div class="span-2 text_right">
					<s:label  value="起止日期："></s:label>
				</div>
			    <div class="span-5">
		          <s:textfield id="startDate" name="yd0010CondA.exStartTime" maxLength="10" cssClass="span-2" onclick="WdatePicker()"/>
		          <span>～</span>
		          <s:textfield id="endDate" name="yd0010CondA.exEndTime" maxLength="10" cssClass="span-2" onclick="WdatePicker()"/>
		        </div>
		        <div class="span-2 text_right">
					<s:label  value="交易类型："></s:label>
				</div>
				<div class="span-3">
				  <s:select id="tradeType" name="yd0010CondA.exType" list="tradeTypeList" listKey="diffNo" listValue="diffName"  cssClass="span-2"/>
		        </div>
		        <div class="span-2 text_right">
					<s:label  value="收支区分："></s:label>
					<s:hidden id="oldParam"/>
				</div>
		        <div class="span-4 text_left">
				  <s:radio id="iOType" name="yd0010CondA.ioFlag" list="ioList" listKey="diffNo" listValue="diffName"/>
		        </div>
		        <div class="span-2 last">
					<input type="button" id="search" value="查询" class="span-2 btn color_blue" onclick="searchExchangeHis()" />
				</div>
			</div>
	</s:form>
	<div class="span-24 separator"></div>
	<!--账户交易履历一览画面 -->
		<div id="div_person_accountInfoList">
			<s:include value="Yd0011.jsp" />
		</div>
	
	<!-- 转账弹出层 -->
	<div id="div_transAcc_Info" class="none">
		<s:include value="Yd0012.jsp" />
	</div>
</div>
</body>
</html>