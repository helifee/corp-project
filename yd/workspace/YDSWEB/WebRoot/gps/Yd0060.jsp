<%--
 * @(#)Yd0060.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 社内团购
--%>

<%--
 * 订单管理画面（主页面JSP）
 * 
 * @author pengchuan
 * @version 1.00 2010/11/08
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
	<link rel="stylesheet" type="text/css" href="<%=basePath %>js/tafelTree/css/tree.css" />

	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/commonMessage.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/formValidation.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/JsInputFilter.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/common/JsNameFilter.js"></script>

	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/gps/Yd0060.js"></script>
	
	<title>订单管理</title>
</head>
<body onload="initForm()">
<jsp:include page="../common/commonPage.jsp"></jsp:include>
<div id="div_order_manage"  class="ydscontainer">
	<div class="span-24 margin_top_8">
		<div class="span-6 text_right">
			<div class="span-2 text_right">
				<s:label  value="订单ID"></s:label>
			</div>
			<div class="span-2 text_left">
				<s:label id="orderId" name="yd0060OrderInfo.orderId"  cssClass="span-2"/>
			</div>
		</div>
		<div class="span-6 text_right">
			<div class="span-2 text_right">
				<s:label  value="订单标题"></s:label>
			</div>
			<div class="span-3 text_left">
				<s:label id="orderContent" name="yd0060OrderInfo.orderContent"  cssClass="span-2"/>
			</div>
		</div>
		<div class="span-6 text_right">
			<div class="span-2 text_right">
				<s:label  value="结算方式"></s:label>
			</div>
			<div class="span-2 text_left">
				<s:label  name="yd0060OrderInfo.payFlag"  cssClass="span-2"/>
			</div>
		</div>
		<div id="modify" class="span-6 last">
			<s:a href="#this" onclick="modifyOrderInfo('%{orderId}')">修改信息</s:a>
		</div>
	</div>
	<div class="span-24 margin_top_8">
	   
		<div class="span-2 text_right">
			<s:label  value="订单状态"></s:label>
		</div>
		<div class="span-20 last">
			<s:label  name="yd0060OrderInfo.switchName"  cssClass="span-2"/>
			<s:hidden id="switchFlag" name="yd0060OrderInfo.switchFlag" ></s:hidden>
		</div>
	</div>
	<div class="span-24 margin_top_8">
   
		<div class="span-2 text_right">
			<s:label  value="备注"></s:label>
		</div>
		<div class="span-22 last">
			<s:label  name="yd0060OrderInfo.orderRemarks"  cssClass="span-2"/>
		</div>
	</div>
	
	
	<!-- 分割线  -->
	<div class="span-24 separator"></div>
	
	
	<div class="span-24 margin_top_4">
		<div class="span-2 text_left">
			&nbsp;<s:label  value="单位："/>元
		</div>
		<div class="prepend-17 span-3 text_right">
			<s:label  value="总计："></s:label>
			<s:label  name="yd0060OrderInfo.orderCnt"></s:label>份
		</div>
		<div class="span-2 text_right last">
			<s:label id="totalPrice" name="yd0060OrderInfo.totalPrice"></s:label>元
			<s:hidden id="payFlag" name="yd0060OrderInfo.payFlag"></s:hidden>
			<s:hidden id="goodsCateId" name="yd0060OrderInfo.goodsCateId"></s:hidden>
		</div>
	</div>
	<div  class="span-24 box_border overflow_hd">
		<div class="span-24">
			<table id="table_orderInfoListHead" class="datagrid2 text_center">
			    <tr>
		            <th class="percent_0" >商品ID</th>
					<th class="percent_20" >商品名称</th>
					<th class="percent_60">订购者(份数)</th>
					<th class="percent_6 text_right">单价</th>
					<th class="percent_6 text_right">数量</th>
					<th class="text_right">总额</th>
				</tr>
			</table>
		</div>
	 <div class="span-24 overflow_scr_y">
		<div class="span-24 ">
			<table id="table_orderInfoList" class="datagrid2 text_center ">	
				<s:if test="yd0060OrderInfo.yd0060OrderDetail.size > 0">
					<s:iterator value="yd0060OrderInfo.yd0060OrderDetail" status="st" >
						<tr>
						    <td class="percent_0"><s:property value="goodsId" /></td>
							<td class="percent_20 text_left vertical_mid">
								【<s:property value="store" />】<s:property value="goodsName" /></td>
							<td class="percent_52 vertical_mid">
								<s:if test="customerList.size > 0">
								<div class="padding_left_10">
							    	<s:iterator value="customerList" status="customeroffset">
							    			<div class="checkSpan-2 text_left">
								    		<input type="checkbox"  id="customId"  value="<s:property value="customerId"></s:property>"/>
								    		<label class="checkboxLabel"><s:property value="customerNm"></s:property></label>
								    		<s:if test="orderCnt > 1">
								    			(<label class="checkboxLabel"><s:property value="orderCnt"></s:property></label>)
								    		</s:if>
								    		</div>
							    	</s:iterator>
							    </div>
						    	</s:if>
						    </td>
							 <td class="percent_8 vertical_mid">
							   <s:if test="yd0060OrderInfo.switchFlag == 0&&manager">
									    <s:a href="#this" onclick="plusOrder(this)" >追加</s:a>
										<s:a href="#this" onclick="deleteOrder(this)">删除</s:a>
								</s:if>
								<s:else>
									    <s:label value="追加"></s:label>
										<s:label value="删除"></s:label>
								</s:else>
							 </td>
							 <td class="percent_6 text_right vertical_mid moneyFont"><s:text name="format.money" ><s:param value="gpsPrice"/></s:text></td>
							 <td class="percent_6 text_right vertical_mid"><s:property value="orderCnt" /></td>
							 <td class="padding_left_10 moneyFont"><s:text name="format.money" ><s:param value="totalPrice"/></s:text></td>
						</tr>
					</s:iterator>			
				</s:if>
			</table>
		 </div>
		</div>
	</div>
	
	
	<div class="span-24 text_right margin_top_8">
		<div class="span-2 text_right margin_top_8">
		<s:if test="manager">
  			<input type="button" value="作废订单" class="btn span-2" onclick="cancelOrder()"/>
  		</s:if>
  			<s:hidden id="cancelFlag" name="cancelFlag"/>
		</div>
		<div id="endAndPrint" class="span-22 text_right last margin_top_8">
			<input type="button" value="结束订单" class="btn span-2" onclick="endAndPrintOrder()"/>
		</div>
		<div id="print"  class="span-22 text_right last none">
			<input type="button" value="打印订单" class="btn span-2" onclick="endAndPrintOrder()"/>
		</div>
	</div>
	
	<s:form id="endMoneyForm">
		<div class="span-10">
			<s:hidden id="exMoney" name="tansferCondA.exMoney"/>
			<s:hidden id="order" name="order"></s:hidden>
			<s:hidden id="orderId2" name="gpsOrderDetail.orderId"></s:hidden>
			<s:hidden id="goodsId2" name="gpsOrderDetail.goodsId"></s:hidden>
			<s:hidden id="closeUnitPrice2" name="gpsOrderDetail.closeUnitPrice"></s:hidden>
		</div>
	</s:form>
    <!-- 修改信息弹出层 -->
	<div id="div_modify_orderInfo" class="none">
		<s:include value="Yd0062.jsp" />
	</div>
	
	
	<!-- 追加订购者弹出层 -->
	<div id="div_plus_order" class="none">
		<s:include value="Yd0061.jsp" />
	</div>
</div>
</body>
</html>