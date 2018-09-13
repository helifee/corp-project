<%--
 * @(#)Yd0072.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 社内团购
--%>

<%--
 * 订单商品一览（一览部分JSP）
 * 
 * @author gaoweiwei
 * @version 1.00 2010/10/21
 --%>
<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!-- 订单商品一览列表画面-->
<s:form id="detailAllListForm" action="yd0070Add" method="post" namespace="/gps" validate="true" disabled="true">
<div class="span-24 margin_top_10">
	<div class="span-24">
		<h4>团购商品一览</h4>
	</div>
	<div class="span-24 box_border overflow_hd margin_top_4">
		<div class="span-24">
			<table id="table_detailAllListHead" class="datagrid2 ellipsis">
				<tr>
					<th class="" locked="1">[店名]商品名称</th>
					<th class="percent_10" locked="1" sorttype="number" source="me.readAttribute('price')">单价（元）</th>
					<th class="percent_10"  locked="1"  nosort="1">订购数量</th>
					<th class="percent_10" locked="1"  nosort="1">金额（元）</th>
					<th class="percent_12" locked="1" sorttype="number" source="me.readAttribute('orderCnt')">已售出份数</th>
					<th class="percent_12" locked="1" nosort="1">操作 </th>
				</tr>
			</table>
		</div>
		<div id="div_detailAllList" class="span-24 overflow_scr_y position_rel">
			<div class="span-24">
				<table id="table_detailAllList" class="datagrid2 ellipsis">
					<tbody>
					<s:if test="detailAllList.size > 0">
						<s:iterator value="detailAllList" status="stat">
							<tr>
								<td class="color_bule_1  font_weight_b" onmouseover="showTip(event, this, '<s:property value="goodsId" />')" onmouseout="msout(this);">
									 [<s:label name="store" />]
									<s:label name="goodsName" title="%{goodsName}" />
									<s:hidden name="detailAllList[%{#stat.index}].goodsName" id="goodsNameTmp%{#stat.index}"></s:hidden>
									<s:hidden name="detailAllList[%{#stat.index}].goodsId" id="goodsIdTmp%{#stat.index}"></s:hidden>
									<s:hidden name="detailAllList[%{#stat.index}].orderId" id="orderIdTmp%{#stat.index}"></s:hidden>
								</td>

								<td class="text_right percent_10 moneyFont" price="${gpsPrice}" >
									<s:text name="format.money" ><s:param value="gpsPrice"/></s:text>&nbsp;
									<s:hidden id="gpsPriceTmp%{#stat.index}" name="gpsPrice"></s:hidden>
								</td>
								
								<td class="text_center percent_10">
									<s:textfield id="buyCnt%{#stat.index}" name="buyCnt%{#stat.index}" value="1" maxlength="3" cssClass="span-2 text_right" onchange="changeTotalPrice(%{#stat.index});"/>&nbsp;份
								</td>
								
								<td class="text_right percent_10 moneyFont">
									<s:label id="totalPrice%{#stat.index}"/>&nbsp;
								</td>
								<td class="text_right percent_12" orderCnt="${orderCnt}">
									已售出&nbsp;&nbsp;<s:label name="orderCnt" cssClass=" moneySmallOut text_right font_size_14 w_30"/>&nbsp;份   
								</td>
								<td class="text_center percent_12 margin_right_15">
									<input type="button" id="buyBtn${stat.index}" name="buyBtn" value="购买" class="btn span-2" onclick="buy(${stat.index});"/>
								</td>
							</tr>
						</s:iterator>
					</s:if>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
</s:form>

<!-- 替换/追加弹出层  -->
<div id="div_repApp_pop" class="none span-6 text_center">
	<div class="span-6 last">
		<span id="stateLabel">已订购商品，替换还是追加？</span>
	</div>
	<div class="span-6 last">
		<s:radio id="radioCheck" name="radioCheck" list="#{'1':'替换','2':'追加'}" listKey="key" listValue="value" value="1"/>
	</div>
	<div class="span-6 last">
		<input type="button" id="popOk" name="popOk" value="确定" class="btn span-2" onclick="popOkClose();" />	
  	    <input type="button" id="popCancel" name="popCancel" value="取消" class="btn span-2" onclick="popCancelClose();" />	
	</div>
</div>

<!-- 订购确认弹出层  -->
<div id="div_buy_pop" class="none span-6 text_center">
	<div class="span-6 last">
		<div class="span-2 text_right">
			<span>购入</span>
		</div>
		<div class="span-4 text_left font_weight_b last">
			<span id="goodsName"></span>
		</div>
	</div>
	<div class="span-6 last">
		<div class="span-2 text_right">
			<span>支出</span>
		</div>
		<div class="span-4 text_left font_weight_b last">
			<span id="totalPrice"></span>
		</div>
	</div>
	<div class="span-6 last">
		<input type="button" id="popBuyOk" name="popBuyOk" value="确定" class="btn span-2" onclick="popBuyOkClose();" />	
  	    <input type="button" id="popBuyCancel" name="popBuyCancel" value="取消" class="btn span-2" onclick="popBuyCancelClose();" />	
	</div>
</div>
<!-- 
 -->

