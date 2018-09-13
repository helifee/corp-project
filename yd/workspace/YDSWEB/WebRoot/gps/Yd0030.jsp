<%--
 * @(#)Yd0030.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 社内团购系统
--%>

<%--
 * 发布订单（主页面JSP）
 * 
 * @author 远东)lincheng
 * @version 1.00 2010/10/22
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
	<script type="text/javascript" src="<%=basePath %>js/gps/Yd0030.js"></script>
	
	<title>发布订单</title>
</head>
<body onload="initForm();">
<jsp:include page="../common/commonPage.jsp"></jsp:include>
<div class="ydscontainer span-24">
<!-- 内容区域 -->
	<s:form id="dealForm" action="yd0030IssueOrder" namespace="/gps" validate="true">
	<div class="bigSize">
		<div class="span-24">
			<div class="span-2 text_right"><s:label value="订单标题："/></div>
			<div class="span-20 last">
				<s:hidden name="orderInfo.orderId"></s:hidden>
				<s:textfield id="orderContent"  name="orderInfo.orderContent" cssClass="span-5"></s:textfield><s:fielderror />
			</div>
		</div>
		<s:if test="hasPermit('gps', 'gpsManager')">
		<div class="span-24">
			<div class="span-2 text_right"><s:label value="业务类型："/></div>
			<div class="span-20 last">
				<s:radio name="orderInfo.bussFlag" list="bussFlagList" listKey="diffNo" listValue="diffName" value="orderInfo.bussFlag" onclick="bussFlag()"></s:radio>
			</div>
		</div>
		<div class="span-24">
			<div class="span-2 text_right"><s:label value="结算方式："/></div>
			<div class="span-20 last">
				<s:radio name="orderInfo.payFlag" list="payFlagList" listKey="diffNo" listValue="diffName" value="orderInfo.payFlag"></s:radio>
			</div>
		</div>
		</s:if>
		<div class="span-24">
			<div class="span-2 text_right"><s:label value="商品分类："/></div>
			<div class="span-15">
				<s:select list="goodsCateList" cssClass="span-3" listKey="goodsCateId" listValue="cateName" name="orderInfo.goodsCateId" id="goodsCate" onchange="chooseCate()"></s:select>
			</div>
			<div class="span-3 text_right last">
				<input type="button" class="btn span-2" value="商品管理" onclick="gotoGoodsM()"/>
				<s:hidden id="fromId" value="%{fromId}"></s:hidden>
				<s:hidden id="goodsCateId" name="goodsCateId" value="%{orderInfo.goodsCateId}"></s:hidden>
			</div>
		</div>
		<div class="span-24 margin_top_2">
			<div class="span-2 text_right">&nbsp;</div>
			<div class="span-20 last">
				<div class="span-18 box_border padding_bottom_4" id="goodsList">
					<s:include value="Yd0031.jsp" />
				</div>
			</div>
		</div>
		<div class="span-24 margin_top_6">
			<div class="span-2 text_right"><s:label value="备          注："/></div>
			<div class="span-20 last">
				<s:textarea name="orderInfo.orderRemarks" cssClass="span-18" value="%{orderInfo.orderRemarks}" rows="8"></s:textarea>
			</div>
		</div>
		<div class="span-24 margin_top_6">
			<div class="span-20 text_right">
				<input type="button" class="btn span-2" value="发布订单" onclick="checkGoods();"/>
			</div>
			<div class="span-4 last"></div>
		</div>
	</div>
	</s:form>
<!-- 内容区域end -->
</div>

<!-- 修改价格弹出层 start-->
<div class="span-4 none" id="editePrice">
<s:form id="dealForm2" action="yd0030IssueOrder" namespace="/gps" validate="true">
	<s:textfield id="exchange" name="exchange" cssClass="span-2 text_right"  tagtype="money"/>
	<input type="button" value="修改" class="btn span-2" onclick="setMoneyDo();"/>
	</s:form>
</div>
<input type="hidden" value="" id="targGoods" />
<!-- 修改价格弹出层 end-->

</body>
</html>