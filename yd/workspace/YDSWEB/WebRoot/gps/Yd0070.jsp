<%--
 * @(#)Yd0070.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 社内团购
--%>

<%--
 * 订购详细画面（主页面JSP）
 * 
 * @author gaoweiwei
 * @version 1.00 2010/10/21
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>
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
	<script type="text/javascript" src="<%=basePath %>js/common/sortTable.js"></script>

	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/gps/Yd0070.js"></script>
	
	<title>订购详细</title>
</head>
<body onload="initForm()">
<jsp:include page="../common/commonPage.jsp"></jsp:include>
<s:div id="div_detail_main" cssClass="ydscontainer">
	<!--订购详细信息画面 -->
	<s:form id="detailForm" action="yd0070Init" namespace="/gps" validate="true">
		<div id="div_detailView" class="span-24">
			<div class="span-24">
				<!--订单ID -->
				<div class="span-5">
					<div class="span-2 text_right">
						<span>订单ID：</span>
					</div>
					<div class="span-2 last">
        				<s:label id="orderId" name="gpsOrderInfo.orderId"/>
        				<s:hidden id="orderStatus" name="gpsOrderInfo.switchFlag"></s:hidden>
        				<s:hidden id="fromId" value="%{fromId}"></s:hidden>
					</div>
				</div>
				<!--订单标题 -->
				<div class="span-10">
					<div class="span-2 text_right">
						<span>订单标题： </span>
					</div>
					<div class="span-7 last">
        				<s:label id="orderContent" name="gpsOrderInfo.orderContent"/>					
					</div>
				</div>
				<%--结算方式 --%>
				<div class="span-9 last">
					<div class="span-2 text_right">
						<span>结算方式：</span>
					</div>
       				<s:if test="gpsOrderInfo.payFlag == \"1\"">
					<div class="span-2">账户结算</div>
					</s:if>
					<s:if test="gpsOrderInfo.payFlag == \"2\"">
					<div class="span-2">自行结算</div>
					</s:if>
					<div class="span-2 text_right">
						<span>订单状态：</span>
					</div>
					<s:if test="gpsOrderInfo.switchFlag == \"0\"">
					<div class="span-2 last">【已结束】</div>
					</s:if>
					<s:if test="gpsOrderInfo.switchFlag == \"1\"">
					<div class="span-2 last">【进行中】</div>
					</s:if>
				</div>
			</div>
			<div class="span-24">
				<%--备注 --%>
				<div class="span-2 text_right">
					<span>备注：</span>
				</div>
				<div class="span-17">
					
       				<s:label id="orderRemarks" name="gpsOrderInfo.orderRemarks"/>
       				&nbsp;	
				</div>
				<div class="span-2 text_right">
        			账户余额：
				</div>
				<div class="span-3 last">
					<label id="accSum" class="moneySmall"><s:text name="format.money" ><s:param value="gpsAccount.accSum"/></s:text></label>&nbsp;元			
				</div>
			</div>
		</div>
	</s:form>

	<!-- 分割线  -->
	<div class="span-24 separator"></div>
	
	<!--已订购商品一览列表 -->
	<div id="div_detailList_now">
		<s:include value="Yd0071.jsp" />
	</div>
	<div class="span-24 separator"></div>
	<!--订单商品一览列表 -->
	<div id="div_detailList_all">
		<s:include value="Yd0072.jsp" />
	</div>	
</s:div>
<div id="goodsTip" class="span-9 padding_top_2 padding_bottom_2 none" style="background:#FFF; position:absolute; border-right:2px solid #CCC; border-bottom:2px solid #CCC; border-left:1px solid #999; border-top:1px solid #999;filter:alpha(opacity=80);-moz-opacity:.8;opacity:0.8;">

</div>
</body>
</html>