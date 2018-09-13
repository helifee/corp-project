<%--
 * @(#)Yb0060.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem:员工管理
--%>
<%--
 * 职位信息维护主画面
 * 
 * @author pengchuan
 * @version 1.00 2010/07/21
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
	<script type="text/javascript" src="<%=basePath %>/js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>/js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>/js/common/commonMessage.js"></script>
	<script type="text/javascript" src="<%=basePath %>/js/common/formValidation.js"></script>

	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>/js/employee/Yb0060.js"></script>

	<title>职位信息维护</title>
</head>
<body onload="initForm()">
	<jsp:include page="../common/commonPage.jsp"></jsp:include>
	<div id="div_emp_pos_main"  class="ydscontainer">
		<div class="span-24 text_left">
			<div class="span-2  text_right">
    			<s:label id="typeListLbl" value="职位类别"/>
    		</div>
			<s:select id="posTypeId" name="posTypeId" list="posTypeList" listKey="diffNo" listValue="diffName" cssClass="span-3" onchange="getPosInfoList()"/>

		</div>
		
		<!-- 分割线  -->
		<div class="span-24 separator"></div>
		
		<div class="span-24 text_right">
			<!-- 用户拥有该画面的修改权限时，显示按钮 -->
			<s:if test="hasPermit('employee','allEmpPermit')">
				<input type="button" id="sortBtn" name="sortBtn" value="排 序" class="btn span-2" onclick="sortPosInfoList()"  />
				<input type="button" id="creatBtn" name="creatBtn" value="新 建"	class="btn span-2" onclick="creatPosInfo()"/>
			</s:if>
		</div>
		<!-- 子系统职位信息画面 -->
		<div id="div_emp_posList">
			<s:include value="Yb0061.jsp" />
		</div>
		<!-- 职位编辑画面 -->
		<div id="div_pos_info" class="none"></div>
		<!-- 职位排序画面 -->
		<div id="div_pos_sort" class="none"></div>
	</div>
</body>
</html>