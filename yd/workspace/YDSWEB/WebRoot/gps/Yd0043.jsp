<%--
 * @(#)Yd0043.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 社内团购
--%>
<%--
 * 商品排序画面
 * 
 * @author pengchuan
 * @version 1.00 2010/10/21
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div id="div_diff_info_sort"  class="span-7 last">
	<div class="span-7 margin_top_8 last">
		<div class="prepend-h span-5">
			<s:select id="goodsSort" name="goodsSort" 
				list="goodsSortList" listKey="goodsId" listValue="goodsName"
		         size="15"  multiple="true" cssClass="span-5">
			 </s:select>
		</div>
		<div class="span-1 text_center last">
			<input type="button" id="moveUp" name="moveUp" value="上移"
			class="btn span-1" onclick="moveUp()" />
			<br>
			<input type="button" id="moveDown" name="moveDown" value="下移"
				class="btn span-1 margin_top_4" onclick="moveDown()" />
		</div>
	</div>
	<div class="span-7 text_center margin_top_8 last">
		<input type="button" id="refer" name="refer" value="保存"
			class="btn span-2" onclick="submitGoodsSort()" />
	</div>
</div>