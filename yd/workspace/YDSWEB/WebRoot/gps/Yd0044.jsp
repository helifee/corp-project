<%--
 * @(#)Yd0044.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 社内团购
--%>
<%--
 * 追加分类画面
 * 
 * @author pengchuan
 * @version 1.00 2010/10/21
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div id="div_plus_cate"  class="span-8 show_grid container last margin_top_4 last">
	<s:form id="catePlusForm">
		<div class="span-8 last">
			<div class="span-2 text_right">
				<s:label value="分类名称" />
			</div>
			<s:textfield id="cateName" name="gpsGoodsCate.cateName"
		 		maxlength="20" cssClass="span-3" />
		</div>
		<div class="span-8 last">
			<div class="span-2 text_right">
					<s:label value="公开区分" />
			</div>
			<div class="text_left">
				<s:radio id="pubFlag" name="gpsGoodsCate.pubFlg" value="%{pubFlag}"list="pubList" listKey="diffNo" listValue="diffName"/>
			</div>
		</div>
		<div class="span-8 text_center margin_top_10 margin_bottom_10 last">
			    <input type="button"  value="保存" class="btn span-2" onclick="submitPlus()"/>
        </div>
	</s:form>
</div>