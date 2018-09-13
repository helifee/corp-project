<%--
 * @(#)Ya0060.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 权限管理
--%>

<%--
 * 用户权限查看（主页面JSP）
 * 
 * @author liyanrui
 * @version 1.00 2010/02/05
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
<!-- 共通CSS -->
<link href="<%=basePath%>${session.userTheme}" rel="stylesheet" type="text/css">
<!-- 树用css -->
<link rel="stylesheet" type="text/css" href="<%=basePath %>js/tafelTree/css/tree.css" />

<!-- 共通JS -->
<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
<script type="text/javascript" src="<%=basePath %>js/common/commonMessage.js"></script>
<script type="text/javascript" src="<%=basePath %>js/tafelTree/js/scriptaculous.js"></script>
<script type="text/javascript" src="<%=basePath %>js/tafelTree/Tree.js"></script>

<!-- 画面用JS -->
<script type="text/javascript" src="<%=basePath %>js/perm/Ya0060.js"></script>

<title>用户权限查看</title>
</head>

<body onload="initForm();">
<div class="span-14 last">
	<s:fielderror></s:fielderror>
	<div class="prepend-1 span-12 last">
		<div class="span-12  font_weight_b last margin_top_4"> 
			<s:label value="用户:" />
			<s:property value="userInfo.empCnm" />
			<s:label value="(" />
			<s:property value="userInfo.empId" />
			<s:label value=")" />
			<br>
			<s:if test="posNameList.size > 0 || roleNameList.size > 0">
				<s:label value="属于:" />
			</s:if>	
			<s:if test="posNameList.size > 0">
				<s:iterator value="posNameList">
					<s:property value="posName" />
				</s:iterator>
				<s:label value="(职位);" />
			</s:if>
			<s:if test="roleNameList.size > 0">
				<s:iterator value="roleNameList">
					<s:property  value="roleName" />
				</s:iterator>
				<s:label value="（角色）" />
			</s:if>
		</div>
		<div class="span-12 box_border margin_top_6 margin_bottom_10 padding_bottom_10 last">
			<div class="span-12 box_head_bc last">
				该用户全部权限 
			</div>
			<div class="span-12 h_300 overflow_scr_y last">
				<div id="tree" class="span-12 t_auto line_h last"></div>
			</div>
		</div>
		<s:hidden id="userId" name="userInfo.empId" />
	</div>
</div>	
</body>
</html>