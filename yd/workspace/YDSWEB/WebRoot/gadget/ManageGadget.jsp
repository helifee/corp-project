<%--
 * @(#)ManageGadget.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 活动桌面
--%>

<%--
 * 添加组件（主页面JSP）
 * 
 * @author 远东)yuanjinling
 * @version 1.00 2010/08/20
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

	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/gadget/ManageGadget.js"></script>
	<META HTTP-EQUIV="pragma" CONTENT="no-cache"> 
	<META HTTP-EQUIV="Cache-Control" CONTENT="no-store, must-revalidate"> 
	<META HTTP-EQUIV="expires" CONTENT="0"> 	
	<style type="text/css">
	
	.block{ 
			border-bottom:2px solid #666;
			position:relative;
	}
	.imgArea{ 		  
			  height:68px;	
			  width:68px;	
			  float:left;	
			  margin-left:50px;		 	 
	
	}
	.infoArea{
			  
			  position:absolute !important;
			  top:10px;
			  left:168px;
			  height:68px;	
			  width:270px;
	
	}
	.varArea{
			  
			  position:absolute !important;
			  top:10px;
			  left:480px;
			  height:68px;	
			  width:150px;
	
	}
	.countArea{ 
			  position:absolute !important;
			  top:33px;
			  right:150px;
			  color:#808080;
			 
	}
	.countArea .countSpan{
	          font-size:16px;
	          font-weight:bold;
	}
	
	.button{
	        position:absolute !important;
	        top:30px;
	        right:50px;
	}
	.gdgName{font-size:14px ;
	         font-weight:bold;
	
	}
	.gdgVer{font-size:14px ;
	
	}
	</style>
	<title>添加组件</title>
</head>
<body onload="initForm();">
<jsp:include page="../common/commonPage.jsp"></jsp:include>
<div class="ydscontainer span-24">
<!-- 内容区域 -->
<div id="content" class="span-12"></div>
<!-- 内容区域 -->
</div>
</body>
</html>