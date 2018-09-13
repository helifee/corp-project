<%--
 * @(#)staffSelect.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 共通系统
--%>
<%--
 * 人员选择共通画面
 * 
 * @author zhangdaoqiang
 * @version 1.00 2010/03/31
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
	<base target="_self"/>
	<link href="<%=basePath%>${session.userTheme}" rel="stylesheet" type="text/css">
	<script type="text/javascript" src="../js/common/prototype.js"></script>
	<script type="text/javascript" src="../js/common/userSelect.js"></script>
	<title>人员选择</title>
</head>
<body>
	<div class="container showgrid">
	
		<div class="span-24 text_center"><h2>人员选择</h2></div>
		<div class="span-24">	
			<form action="../common/userSelect.action">
				<div class="span-24">
					<span class="prepend-5 span-3 append-1">检索条件1<s:textfield id="condition1"></s:textfield></span>
					<span class="prepend-1 span-3 append-1">检索条件2<s:textfield></s:textfield></span>
				</div>
				<div class="span-24">
					<span class="prepend-5 span-3 append-1">检索条件3<s:textfield></s:textfield></span>
				</div>
				<div class="span-24">
					<span class="prepend-5 span-3 append-1">检索条件4<s:textfield></s:textfield></span>
					<span class="prepend-1 span-3 append-1 text_right"><input type="submit" value="检索" class="btn w_65"/></span>
				</div>
			</form>
		</div>
		<div class="span-24 margin_top_10">
			<div class="prepend-5 span-6">
				<div>检索结果</div>
				<div>
					<s:if test="users == null">
						<s:select id="user_left" name="staff_left" cssClass="w_190"
						list="{}" listKey="userId" listValue="userName"
						size="30" theme="simple" multiple="true"></s:select>
					</s:if><s:else>
						<s:select id="user_left" name="staff_left" cssClass="w_190"
						list="users" listKey="userId" listValue="userName"
						size="30" theme="simple" multiple="true"></s:select>				
					</s:else>
				</div>
			</div>
			<div class="span-2 append-1">
				<div class="h_122"></div>
				<div>
					<input type="button" id="right" class="btn w_65" value=" > "/><br />
					<input type="button" id="right_all" class="btn w_65" value=" >> " /><br />
					<input type="button" id="left" class="btn w_65" value=" < " /><br />
					<input type="button" id="left_all" class="btn w_65" value=" << " />
				</div>
				<div class="h_122"></div>
				
			</div>
			<div class="span-7">
				<div>选择结果</div>
				<div>
					<s:select id="user_right" name="staff_right" cssClass="w_190" list="{}" size="30"
					theme="simple" multiple="true"></s:select>
				</div>
			</div>
		</div>
		<div class="span-24 margin_top_10 text_center">
			<span class="span-2 append-2">
				<input type="button" id="choose" class="btn w_65" value="选择" />
			</span>
			<span class="span-2">
				<input type="button" id="close" class="btn w_65" value="关闭" />
			</span>
		</div>
	</div>
</body>
</html>