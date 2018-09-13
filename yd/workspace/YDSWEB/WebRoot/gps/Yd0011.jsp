<%--
 * @(#)Yd0011.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *      SubSystem: 社内团购
--%>

<%--
 * 个人账户交易履历一览画面
 * 
 * @author pengchuan
 * @version 1.00 2010/10/29
 --%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div class="span-24">
	<div  class="span-24 margin_top_2 margin_bottom_2">
			<div class="span-22">
				<span>交易总计：</span><s:label name="gpsExchangeSum.ioCnt"/><span>&nbsp;笔</span>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				收入(<s:label name="gpsExchangeSum.inCnt"/>)：<s:label name="gpsExchangeSum.inMoneySum" cssClass="moneySmall font_size_12"/><span>&nbsp;元</span>
				&nbsp;&nbsp;&nbsp;&nbsp;
				支出(<s:label name="gpsExchangeSum.outCnt"/>)：<s:label name="gpsExchangeSum.outMoneySum" cssClass="moneySmallOut font_size_12"/><span>&nbsp;元</span>
			</div>
			<div class="span-2 text_right last"><s:label  value="单位：元"></s:label></div>
	</div>
	<div class="span-24 box_border overflow_hd">

		<div class="span-24 ">
			<table id="table_exChangeHisList" class="datagrid2 text_center">
			    <tr>
						<th class="percent_10 ">交易时间</th>
						<th class="percent_10" >收入</th>
						<th class="percent_10 ">支出</th>
						<th class="percent_10 ">余额</th>
						<th class="percent_10 ">交易类型</th>
						<th class="percent_10">订单号</th>
						<th class="percent_30">备注</th>
				</tr>
				<s:if test="exChangeHisList.size > 0">
									<s:iterator value="exChangeHisList" status="offset" >
										<tr>
										 <td class="percent_20"><s:property value="exTime" /></td>
										 
											<s:if test='ioFlag == "1"'>
											   <td class="percent_10 text_right moneyFont">
											   <s:text name="format.money" ><s:param value="exMoney"/></s:text></td>
											   <td class="percent_10 text_right"></td>
										    </s:if>
										    <s:else>
											   <td class="percent_10 text_right"></td>
											   <td class="percent_10 text_right moneyFont"><s:text name="format.money" ><s:param value="exMoney"/></s:text></td>
										     </s:else>
										    <td class="percent_10 text_right moneyFont"><s:text name="format.money" ><s:param value="balance"/></s:text></td>
											<td class="percent_10 "><s:property value="exType" /></td>
											<td class="percent_10 ">
												<a href="yd0070Init?fromId=yd0010&orderId=<s:property value="orderId" />"><s:property value="orderId" /></a></td>
											<td class="percent_30 text_left"><s:property value="exRemarks" />
											</td>
										</tr>
									</s:iterator>
				</s:if>
			</table>
			<s:hidden id="remain_new" name="accRemain"/>
		</div>
    </div>
	<div class="span-24 text_center">		
		<s:include	value="../common/pagerNavigation.jsp" />	          	 
	</div>
</div>



