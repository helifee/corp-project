<%--
 * @(#)pagerSampleMain.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: sample
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
	<link href="../css/style.css" rel="stylesheet" type="text/css">

	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>/js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>/js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>/js/common/commonMessage.js"></script>
    <script type="text/javascript" src="<%=basePath %>/js/common/commonPageLock.js"></script>
	
	<!-- 
	<script type="text/javascript" src="../js/common/pageAjax.js"></script>
	-->

	<!-- 画面用js -->

	<script type="text/javascript" src="<%=basePath %>/js/sample/pagerSample.js"></script>

	<title>分页共通</title>
</head>
<body onload="initForm('success')"  > 
<div id="div_dept_main"  class="container showgrid">
    <div class="span-24 text_left title">
		<h2>分页共通</h2>
	</div>
<s:form action="" method="get" theme="simple" name="pagerForm" id = "pagerForm">
<div class="span-24">
	<div class="span-2 text_right"><s:label id="deptnmLbl" value="部门ID" /></div>
	<div class="span-4"><s:textfield  name="departmentInfo.deptId"
				  id="departmentInfo.deptId" 
				  cssClass="span-3 text_left" 
				  theme="simple" 
				  value="%{departmentInfo.deptId}"/>
				  </div>
	<div class="span-2 text_right"><s:label id="deptnmLbl" value="部门名称" /></div>
	<div class="span-4"><s:textfield  name="departmentInfo.deptNm"
				  id="departmentInfo.deptNm" 
				  cssClass="span-3 text_left" 
				  theme="simple" 
				  value="%{departmentInfo.deptNm}"/>
				  </div>
	<div class="span-2 text_right"><s:label id="deptnmLbl" value="部门略称" /></div>
	<div class="span-4"><s:textfield  name="departmentInfo.deptSnm"
				  id="departmentInfo.deptSnm" 
				  cssClass="span-3 text_left" 
				  theme="simple" 
				  value="%{departmentInfo.deptSnm}"/>
				  </div>
	<div class="span-6 last">
		<input type="button" id="searchByDeptId" name="searchByDeptId" value="搜索"
			class="span-2 btn" onclick="submitInfo()" /></div>
</div>
</s:form>
<!-- 保存检索的部门id用于 点击分页时的查询参数 -->
<s:hidden id="oldParam" name="oldParam" value=""/>	
<input type="hidden"  name="commonActionPath"
id="commonActionPath" value="<%=basePath%>"/>
<div id="div_pagerCommonAjax"  class="text_center margin_top_10">
    <s:include	value="pagerSampleList.jsp" />
</div>

</div>
</body>
</html>