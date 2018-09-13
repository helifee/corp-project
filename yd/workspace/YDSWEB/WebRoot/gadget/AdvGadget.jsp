<%--
 * @(#)AdvGadget.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 广告
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
	<title>Insert title here</title>
	<!-- 共通css -->
	<link href="<%=basePath%>${session.userTheme}" rel="stylesheet" type="text/css">
	<link href="<%=basePath%>css/gadget.css" rel="stylesheet" type="text/css">
	
	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/scriptaculous/scriptaculous.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/gadget/base.js"></script>
	
	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/gadget/AdvGadget.js"></script>
	
	<style type="text/css">
		#slideDiv{
			z-index:1;
		}
		.w_300 .imgContainer,.w_300 img {
			height: 130px;
			width: 330px;
		}
		.w_600 .imgContainer,.w_600 img {
			height: 265px;
			width: 674px;
		}
		
		#number {
			position: absolute;
			bottom: 5px;
			left: 10px;
			z-index:99;
		}
		
		span {
			border: #666 1px solid;
			margin: 2px ;
			width:17px;
			height:19px;
			color: #fff;
			background:url(../images/activeDesk/numNormal.gif);
			background-position: 50% bottom;
			cursor:pointer;
			float:left;
			text-align:center;
			opacity:0.8;
			filter:alpha(opacity=80);
		}
		.active{
			font-weight:bold;
			color:#fff;
			background:url(../images/activeDesk/numActive.gif);
			opacity:0.95;
			filter:alpha(opacity=95);
		}
	</style>
	<base target="main"> 
</head>
<body scroll="no" onload="init()">
	<div id="content" class="w_300 overflow_hd position_rel">
		<div id="number">
			<s:iterator value="slideList" status="stat" >
				<span id="btn_${stat.index}">${stat.index+1}</span>
			</s:iterator>
		</div>
		<div class="position_rel" id="slideDiv">
			<s:iterator value="slideList" var="value" status="stat">
				<div id="img_${stat.index}" class="imgContainer">
					<a href="${value}.html"><img src="<%=basePath%>images/activeDesk/advPic/${value}.jpg"></a>
				</div>
			</s:iterator>
		</div>
	</div>
</body>
</html>
