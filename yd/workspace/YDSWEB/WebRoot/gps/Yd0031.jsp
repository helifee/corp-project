<%--
 * @(#)Yd0031.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *      SubSystem: 社内团购
--%>

<%--
 * 商品一览画面
 * 
 * @author lincheng
 * @version 1.00 2010/10/29
 --%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
					<s:if test="goodsInfoList.size > 0">
						<div class="padding_left_6 padding_top_6">
						<s:iterator value="goodsInfoList" status="goodsList">
							<div class="span-6 margin_top_p1  margin_left_p1 bd_sun box_special_bc last padding_right_2">
								<div class="span-4 ellipsis" title="<s:property value="goodsName" />[<s:property value="store" />]">
									&nbsp;
									<s:checkbox  name="goodsInfoList[%{#goodsList.index}].goodsId" value="%{goodsFlag}" fieldValue="%{goodsId}"></s:checkbox>
									<s:property value="goodsName" />[<s:property value="store" />]
								</div>
								<div class="span-2 text_right last">
									<input type="hidden"  name="goodsInfoList[${goodsList.index}].goodsPrice" value="<s:text name="format.money" ><s:param value="goodsPrice"/></s:text>"/>
									<s:a href="#this" cssClass="text_decoration_no a_click moneyFont"  onclick="setMoney(this)" > <s:text name="format.money" ><s:param value="goodsPrice"/></s:text> </s:a>&nbsp;元
								</div>
							</div>
						</s:iterator>
						</div>
					</s:if>



