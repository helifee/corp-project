<%--
 * @(#)Yd0062.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 社内团购
--%>
<%--
 * 追加订购者画面
 * 
 * @author pengchuan
 * @version 1.00 2010/11/08
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div id="div_plus_order"  class="span-10 show_grid container last">
	<s:form id="orderPlusForm" action="yd0060submitPlus" method="post" namespace="/gps" validate="true">
		<div id="errorMessage" class="prepend-2 span-5 last">
			<s:fielderror></s:fielderror>
		</div>
		<div class="span-10 last">
				<div class="span-10 last">
					<div class="span-2 text_right">
						<s:label value="员工编号" />
						<span class="color_red">*</span>
					</div>
					<div class="span-2">
					     <s:textfield id="empId" name="gpsOrderDetail.customerId" maxlength="20" cssClass="span-2" onchange="getPerRemain()"/>
					     <s:hidden id="orderDetailId" name="gpsOrderDetail.orderId"></s:hidden>
					     <s:hidden id="goodsId" name="gpsOrderDetail.goodsId"></s:hidden>
					     <s:hidden id="closeUnitPrice" name="gpsOrderDetail.closeUnitPrice"></s:hidden>
					     <s:hidden id="cateName" name="gpsOrderDetail.cateName"></s:hidden>
				    </div>
				    <div class="span-2 text_right">
						<s:label value="员工姓名" />
					</div>
					<div class="span-2  last">
					    <s:textfield id="empNm" maxlength="20" cssClass="span-2" onblur="getPerRemain()" />
					</div>
				</div>
		</div>
		<div class="span-10 last">
			<div id="remain" class="span-10  last none">
				<div class="span-2 text_right">
					<s:label value="可用余额：" />
				</div>
			    <s:label id="enableRemain"></s:label> <span>元</span>
			</div>
		</div>
		<div class="span-10 last">

			<div class="span-2 text_right">
				<s:label value="订购份数" />
				<span class="color_red">*</span>
			</div>
			<s:textfield id="orderCnt" name="gpsOrderDetail.orderCnt" maxlength="3"  cssClass="span-2"/>
		    <s:label value="份"></s:label>
		</div>
	    <div class="span-10 margin_top_8 text_center last">
			<input type="button" id="refer" name="refer" value="保存" class="btn span-2" onclick="submitPlusOrder()" />
	    </div>
  </s:form>
</div>
