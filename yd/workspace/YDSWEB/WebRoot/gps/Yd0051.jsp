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
			<div class="span-24 overflow_hd">
				<table id="table_peoListHead" class="datagrid2">
					<tr>
						<th class="percent_8">订单ID</th>
						<th class="">订单标题</th>
						<th class="percent_10">状态</th>
						<th class="percent_8">发布日期</th>
						<th class="percent_8">发布人</th>
						<th class="percent_10">结算方式</th>
						<th class="percent_16">操 作</th>
					</tr>
				</table>
			</div>
			<div class="span-24">
				<table id="table_peoList" class="datagrid2">
					<s:if test="yd0050CondAList.size > 0">
						<s:iterator value="yd0050CondAList">
							<tr <s:if test="switchFlag == \"0\"">class="unactive"</s:if> >
								<td class="text_center percent_8">
									<a href="yd0070Init?fromId=yd0050&orderId=<s:property value="orderId" />"><s:property value="orderId" /></a>
								</td>
								<td class=""><s:property value="orderContent" /></td>
								<td class="text_center percent_10">
									<s:if test="switchFlag == \"1\"">
										<span class="">进行中</span>
									</s:if>
									<s:if test="switchFlag == \"0\"">
										<span>已结束</span>
									</s:if>
								</td>
								<td class="text_center percent_8"><s:property value="createTime" /></td>
								<td class="text_center percent_8"><s:property value="createUser" /></td>
								<td class="text_center percent_10">
									<s:if test="payFlag == \"1\"">
										账户结算
									</s:if>
									<s:if test="payFlag == \"2\"">
										自行结算
									</s:if>
								</td>
								<td class="text_center percent_16">
									<a href="yd0070Init?fromId=yd0050&orderId=<s:property value="orderId" />" 
									<s:if test="switchFlag == \"1\"">class="a_click"</s:if>>进 入</a>&nbsp;
									<s:if test="accFlag">
										<a href="yd0060Init?orderId=<s:property value="orderId" />" 
										<s:if test="switchFlag == \"1\"">class="a_click"</s:if>>管 理</a>&nbsp;
										<a href="yd0030Init?fromId=yd0050&orderId=<s:property value="orderId" />" 
										<s:if test="switchFlag == \"1\"">class="a_click"</s:if>>参照新建</a>
									</s:if>
								</td>
							</tr>
						</s:iterator>
					</s:if>
				</table>
			</div>
			<div class="span-24 text_center">
				<s:include value="/common/pagerNavigation.jsp" />
			</div>




