<%--
 * @(#)pos_info_main.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 权限管理
--%>
<%--
 * 部门管理画面（一览部分JSP）
 * 
 * @author chenjunshuai
 * @version 1.00 2010/03/15
 --%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<!-- 共通css -->
<link href="../css/style.css" rel="stylesheet" type="text/css">

<!-- 共通js -->
<script type="text/javascript" src="../js/common/prototype.js"></script>
<script type="text/javascript" src="../js/common/util.js"></script>
<script type="text/javascript" src="../js/common/commonMessage.js"></script>

<!-- 画面用js -->	
<script type="text/javascript" src="../js/perm/posInfo.js"></script>
<title>大连远东计算机系统有限公司-内部信息网-职位信息</title>
</head>
<body onload="init();">
<div id ="divPosInfoMain" class="container showgrid">
	<div class="span-24 text_center"><h2>职位信息</h2></div>
	
	<!-- 职位列表画面 -->
	<div id ="divPosInfoList" class="span-24">
	<s:form id ="posInfoListForm" action ="" method ="post" theme="simple">	
	<s:include value="pos_info_list.jsp" />
	</s:form>
	</div>
</div>	
</body>
</html>