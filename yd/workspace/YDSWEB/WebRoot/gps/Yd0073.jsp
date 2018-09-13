<%--
 * @(#)Yd0073.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 社内团购
--%>

<%--
 * 商品信息展示（部分JSP）
 * 
 * @author lincheng
 * @version 1.00 2010/11/17
 --%>
<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!-- 商品信息展示画面-->
	<div class="span-4 text_center"><img src="../gps/yd0040GetImage.action?fileName=<s:property value="gpsGoodsInfo.goodsImage" />" alt="商品图片" class="goodsImg"></div>
	<div class="span-5 last">
		<div class="span-2 last">商品名称：</div>
		<div class="span-3 last"><s:property value="gpsGoodsInfo.goodsName" /></div>
	</div>
	<div class="span-5 last">
		<div class="span-2 last">商品原价：</div>
		<div class="span-3 last"><s:property value="gpsGoodsInfo.goodsPrice" />元</div>
	</div>
	<div class="span-5 last">
		<div class="span-2 last">商品来源：</div>
		<div class="span-3 last"><s:property value="gpsGoodsInfo.store" /></div>
	</div>
	<div class="span-5 last">
		商品描述：
	</div>
	<div class="span-5 last">
		<s:property value="gpsGoodsInfo.goodsDesc" />
	</div>

