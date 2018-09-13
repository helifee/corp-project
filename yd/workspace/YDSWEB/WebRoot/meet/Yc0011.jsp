<%--
 * @(#)Yc0010.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 会议室管理
--%>

<%--
 * 会议室管理画面（主页面JSP）
 * 
 * @author mengxiaoyan
 * @version 1.00 2010/07/21
--%>

<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div id="div_metRoom_info_sort"  class="span-6 last">
	<div class="span-6 margin_top_8 last">
		<div class="prepend-1 span-3">
			<s:select id="metRoomSort" name="metRoomSort" cssClass="w_110"
				list="metRoomInfoList" listKey="metId" listValue="metNm"
				size="15" multiple="true"></s:select>
		</div>
		<div class="span-2 text_center last">
			<input type="button" id="moveUp" name="moveUp" value="上移"
			class="btn span-1" onclick="moveUp()" />
			<br>
			<input type="button" id="moveDown" name="moveDown" value="下移"
				class="btn span-1 margin_top_4" onclick="moveDown()" />
		</div>
	</div>
	<div class="span-6 text_center margin_top_8 last">
		<input type="button" id="refer" name="refer" value="保存"
			class="btn span-2" onclick="submitMetRoomSort()" />
	</div>
</div>