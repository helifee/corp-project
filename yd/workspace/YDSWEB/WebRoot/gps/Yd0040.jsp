<%--
 * @(#)Yd0040.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司社内网
 *    SubSystem:社内团购
--%>
<%--
 *商品管理主画面
 * 
 * @author pengchuan
 * @version 1.00 2010/10/21
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
    <script type="text/javascript" src="<%=basePath%>/js/common/JsNameFilter.js"></script>

	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>/js/gps/Yd0040.js"></script>

	<title>商品管理</title>
</head>
<body onload="initForm()">
   <jsp:include page="../common/commonPage.jsp"></jsp:include>
      <div id="div_goods_main"  class="ydscontainer">
		<div class="span-24">
			<div class="span-2  text_right">
    			<s:label id="goodsType" value="商品分类："/>
    			<s:hidden id="goodsCateName" name="goodsCateName"/> 
    			<s:hidden id="goodsCateIdPra" name="fromGoodsCateId"/>
    			<s:hidden id="reFlag" name="reFlag"/>
    		</div>
    		
    		<div class="span-22 last text_left">
		       <s:select id="goodsCateId" name="goodsCateId" list="goodsCateList" listKey="categoryKey" listValue="categoryValue" cssClass="span-3" onchange="getGoodsInfoList()"/>
		       &nbsp;&nbsp;<s:a href="#this;" id="cateBtn"  onclick="plusCate()" cssClass="a_click">追加分类</s:a>
		    </div>
		</div>
		<!-- 分割线  -->
		<div class="span-24 separator"></div>
		<!-- 商品信息画面 -->
		<div id="div_goods_infoList">
			<s:include value="Yd0041.jsp" />
		</div>
		<!-- 追加分类画面 -->
		<div id="div_goods_cate" class="none"></div>
		<div id="plusFlag" class="none">
		  <s:label id="flag" value="1"/>
		</div>
		<!-- 商品排序画面 -->
		<div id="div_goods_sort" class="none"></div>
		<!-- 追加商品画面 -->
		<div class="none" id="div_goods_plus">
			<iframe id="myInnerPage" frameBorder="0" style="height:290px;width:510px" class="overflow_hd"></iframe>
        </div>
	</div>
</body>
</html>