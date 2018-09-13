<%--
 * @(#)Yc0040.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 会议室管理
--%>

<%--
 * 会议室预约情况（主页面JSP）
 * 
 * @author xupai
 * @version 1.00 2010/07/21
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
	<link rel="stylesheet" type="text/css" href="<%=basePath%>${session.userTheme}">
	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath%>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/common/commonMessage.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/My97DatePicker/WdatePicker.js"></script>
	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath%>js/meet/Yc0040.js"></script>
	<title>会议室预约情况</title>
</head>

<body onload="initform()">
	<s:include value="../common/commonPage.jsp"></s:include>
	<div id = "div_met_main" class="ydscontainer">
		<div class="span-24 last">
			<s:form id = "metInfoForm" action="yc0040MetEmpLst" namespace="/meet"  method="post" validate ="true" >
				<s:hidden  id="metNm" name = "metNm"/>
				<div class="span-7">
					<s:radio name="yc0040CondA.radioButton" list="metSearchConditionRadioBtn" id ="radiobtn"
					         listKey="key" listValue="value"  onclick = "radioBoxChange(this);"  cssClass="span-1"  ></s:radio>
				</div>
				<div class="span-6">
					<div class="span-2"><s:textfield id="startDate" name="yc0040CondA.startDate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd',onpicked:checkDate})" cssClass="span-2"/></div>
	        		<div class="span-1 text_center"><s:label value="～" /></div>
					<div class="span-2 last"><s:textfield id="endDate" name="yc0040CondA.endDate"  onclick="WdatePicker({dateFmt:'yyyy-MM-dd',onpicked:checkDate})" cssClass="span-2"/> </div>
				</div>
				<div class="span-4 text_left">
					<input type="button" id="Search" name="search" Value="查询" class="btn span-2" onclick="searchMetInfo()"/>
					<s:hidden id="metId" name="metId"></s:hidden>
				</div>
		</s:form>
	</div>
	<!-- 保存检索的会议室id用于 点击分页时的查询参数 -->
	<s:hidden id="oldParam" name="oldParam" value=""/>	
	<div id="div_hy_meetlist"  align="center">
		<s:include value="Yc0041.jsp" />
	</div>
	<!--会议室预约详细弹出层-->
    <div id="myPopContent01" class="none">
		<iframe id="myInnerPage" frameBorder="0"></iframe>
    </div>
	</div>
</body>
</html>
