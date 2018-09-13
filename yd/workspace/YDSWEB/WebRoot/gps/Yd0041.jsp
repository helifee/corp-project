<%--
 * @(#)Yd0041.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *      SubSystem: 社内团购
--%>

<%--
 * 商品信息一览画面
 * 
 * @author pengchuan
 * @version 1.00 2010/10/21
 --%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div class="span-24 margin_top_4">
	<div class="span-24">
		<div class="span-10 text_left margin_top_4">
			<s:label value="计：" />
			<s:label id="goodsCnt" name="goodsCnt" />
			<s:label value="件" />
		</div>
		<div class="span-14 last text_right">
			<input type="button" id="sortBtn" name="creatBtn" value="商品排序"	class="btn span-2" onclick="sortGoods()"/>
			<input type="button" id="plusBtn" name="plusGoods" value="追加商品"	class="btn span-2" onclick="plusGoods()"/>
		</div>

	</div>
	<div class="span-24 box_border margin_top_4 overflow_hd">
		<div class="span-24 ">
			<table id="table_goodsListTitle" class="datagrid2 text_center">
			    <tr>
						<th class="percent_10 ">商品ID</th>
						<th class="" >商品名称</th>
						<th class="percent_10 ">价格（元）</th>
						<th class="percent_40 ">描述</th>
						<th class="percent_8">操作</th>
				</tr>
			</table>
		</div>
		<div class="span-24 overflow_scr_y">
			<div class="span-24 ">
				<table id="table_goodsList" class="datagrid2 text_center ellipsis">
				    <s:if test="goodsList.size > 0">
									<s:iterator value="goodsList" status="stat" >
										<tr>
											<td class="percent_10"><s:property value="goodsId" /></td>
											<td class="text_left">[<s:property value="store" />]<s:property value="goodsName" /></td>
											<td class="percent_10 text_right moneyFont"><s:text name="format.money" ><s:param value="goodsPrice"/></s:text></td>
											<td class="percent_40 text_left"><s:property value="goodsDesc" /></td>
											<td class="percent_8">
												<s:a href="#this" onclick="modifyGoodsInfo('%{goodsId}')">修改</s:a>
												<s:hidden id="dispSeq%{#stat.index}" name="dispSeq[%{#stat.index}].dispSeq" />
												<s:hidden name= "goodsSwitch"></s:hidden>
											</td>
										</tr>
									</s:iterator>
				    </s:if>
	          </table>
		 </div>
			</div>
  </div>
</div>



