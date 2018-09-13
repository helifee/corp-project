<%--
 * @(#)Yd0071.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 社内团购
--%>

<%--
 * 已订购商品一览（一览部分JSP）
 * 
 * @author gaoweiwei
 * @version 1.00 2010/10/21
 --%>
<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!-- 已订购商品一览列表-->
<div class="span-24 margin_bottom_10">
	<div class="span-24">
		<div class="span-4">
			<h4>我订购的商品</h4>
		</div>
		<div class="span-14 text_right last">
			合计：<label class="moneySmallOut font_size_14" id="buySum">0.00</label>&nbsp;元
		</div>
	</div>
	<div class="span-18 box_border overflow_hd last">
		<div class="span-18 last">
			<table id="table_detailNowListHead" class="datagrid2">
				<tr>
					<th class="percent_30">商品名称</th>
					<th class="percent_18">数量</th>
					<th class="percent_18">单价（元）</th>
					<th class="percent_18">实付款（元）</th>
					<th class="">操作 </th>
				</tr>
			</table>
		</div>
		<div id="div_detailNowList" class="span-18 overflow_scr_y last">
			<div class="span-18 last">
				<table id="table_detailNowList" class="datagrid2 ellipsis">
					<tbody>
					<s:if test="detailNowList.size > 0">
						<s:iterator value="detailNowList"  status="st">
							<tr>
								<td class="percent_30">
									[<s:label name="store" />]
									<s:label name="goodsName" title="%{goodsName}" />
								</td>
								<td class="text_right percent_18">
									<s:property value="orderCnt" /> 份
								</td>
								<td class="text_right percent_18 moneyFont" >
									<s:text name="format.money" ><s:param value="closeUnitPrice"/></s:text>
								</td>
								<td class="text_right percent_18 moneyFont">
									<s:text name="format.money" ><s:param value="totalPrice"/></s:text>
									<s:hidden id="buyTotalPrice%{#st.index}" name="totalPrice" ></s:hidden>
								</td>
								<td class="text_center percent_16 margin_right_15">
									<input type="button" value="删 除" class="btn span-2" onclick="del('${orderId}','${customerId}','${goodsId}');" />
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

