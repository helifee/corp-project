<%--
 * @(#)ManageGadget.jsp
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
	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/gadget/base.js"></script>

	<!-- 画面用js -->
	<script type="text/javascript">
	function init() {
		if(!$('more') && $$('.text').length>0){
			setHeight($$('.text').length * 26 + 12);
		}else if($$('.text').length==0){
			setHeight(98);
		}else{
			setHeight(164);
		}
	}
	</script>
<base target="main"> 
<title>工作小助理</title>
</head>
<body onload="init();" scroll="no">
<div id="content" class="w_300">
	<div id="Narrow" class="span-7 padding_top_10">
	<ul class="prepend-1">
		<s:if test="leakAttendanceInfoList.size > 0">
			<s:iterator value="leakAttendanceInfoList">
				<li><a href="http://www.yds.yd/kaoqin/TVACMGRS.jsp">${leakNian}年${leakYue}月${leakRi}日您有漏考信息一条。</a><br></li>
			</s:iterator>
		</s:if>
		<s:if test="leakAttendanceInfoList.size == 0">
			暂无待办事项...
		</s:if>
	</ul>
	</div>
	<div id="Wide" class="span-15 padding_top_10">
	</div>
</div>
</body>
</html>