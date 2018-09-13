<%--
 * @(#)Yb0062.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 员工管理
--%>
<%--
 * 职位编辑画面
 * 
 * @author pengchuan
 * @version 1.00 2010/07/23
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div id="div_pos_info_view"  class="span-8 show_grid container last">
	<s:form id="posInfoForm" action="yb0060AddPosInfo" method="post" namespace="/employee" validate="true">
		<div id="errorMessage" class="prepend-2 span-5 last">
			<s:fielderror></s:fielderror>
		</div>
		<s:hidden id="posId2" name="empPos.posId" />
		<div class="span-8 last">
			<div class="span-8 last">
				<div class="span-2 text_right">
					<s:label id="posNameLbl" value="职位名称" />
					<span class="color_red">*</span>
				</div>
				<s:textfield id="posName" name="empPos.posName"
			 		maxlength="20" cssClass="span-4" />
			 </div>
		</div>
		<div class="span-8 last">
	        <div class="span-8 last">
				<div class="span-2 text_right">
					<s:label id="posSNameLbl" value="职位略称" />
					<span class="color_red">*</span>
				</div>
				<s:textfield id="posSName" name="empPos.posSName"
			 		maxlength="10" cssClass="span-4" />
			</div>
		</div>
		<div class="span-8 last">
			<div class="span-8 last">
			 	<div class="span-2 text_right">
			 		<s:label  value="启用标识" />
				</div>
				<s:checkbox id="posState" name="empPos.posState" fieldValue="%{empPos.posState}"></s:checkbox>
			</div>
		</div>
		<div class="span-8 margin_top_8 text_center last">
			<input type="button" id="refer" name="refer" value="保存"
				class="btn span-2" onclick="submitPosInfo()" />
<!--			<input type="button" id="cancle" name="cancle" value="关闭"-->
<!--				class="btn span-2" onclick="cancel()" />-->
		</div>
	</s:form>
</div>