<%--
 * @(#)diff_info_view.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 共通系统
--%>
<%--
 * 区分修改画面
 * 
 * @author renlong
 * @version 1.00 2010/06/11
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div id="div_diff_info_view"  class="span-15 margin_top_8 show_grid container last">
	<s:form id="diffInfoForm" action="" method="post">
		<s:hidden id="typeName" name="typeName" />
		<div class="span-15 last">
			<div class="span-8 ">
				<div class="span-2 text_right">
					<s:label id="diffNoLbl" value="区分NO" />
					<span class="color_red">*</span>
				</div>
				<s:textfield id="diffNo" name="comCodeMaint.diffNo"
			 		maxlength="15" cssClass="span-5"/>
			 </div>
			 <div class="span-7 last">
			 	<div class="span-2 text_right">
			 		<s:label  value="停用标识" />
				</div>
				<s:checkbox id="delFlg" name="comCodeMaint.delFlg" value="comCodeMaint.dispDelFlg" fieldValue="1"></s:checkbox>
			</div>
		</div>
		<div class="span-15 last">
			<div class="span-8 ">
				<div class="span-2 text_right">
					<s:label id="diffNameLbl" value="区分名称" />
					<span class="color_red">*</span>
				</div>
				<s:textfield id="diffName" name="comCodeMaint.diffName"
			 		maxlength="100" cssClass="span-5" />
			 </div>
			<div class="span-7 last">
				<div class="span-2 text_right">
					<s:label id="diffShortNameLbl" value="区分略称" />
				</div>
				<s:textfield id="diffShortName" name="comCodeMaint.diffShortName"
			 		maxlength="20" cssClass="span-4" />
			 </div>
		</div>
		<!-- 分割线  -->
		<div class="span-15 separator"></div>
		<!-- 动态属性区域-->
		<s:if test="comCodeConfList.size > 0">
			<s:iterator value="comCodeConfList" var="element">
				<div class="span-15">
					<div class="span-2 text_right">
						<s:label value="%{dispCaption}" />
					</div>
					<s:if test="tagTypeFlg == 1">
						<s:textfield id="%{propertySeq}" name="%{tagName}" value="%{tagValue}"
				 		maxlength="%{dataLength}" cssClass="span-12" tooltip="%{inputDiscription}"
				 		errormessage="${element.errorMessage}" notnull="${element.notNullFlg}" regular="${element.dispCondition}"/>
					</s:if>
					<s:if test="tagTypeFlg == 5">
						<s:textarea id="%{propertySeq}" name="%{tagName}" value="%{tagValue}" cssClass="span-12 margin_bottom_4"
						tooltip="%{inputDiscription}" errormessage="${element.errorMessage}" notnull="${element.notNullFlg}" regular="${element.dispCondition}"/>
					</s:if>
					<s:if test="tagTypeFlg == 2">
						<s:radio id="%{propertySeq}" name="%{tagName}"  list="%{itemList}" listKey="itemId"
							listValue="itemName" value="%{tagValue}"></s:radio>
					</s:if>
					<s:if test="tagTypeFlg == 3">
						<s:checkboxlist id="%{propertySeq}" name="%{tagName}" list="%{itemList}"
							listKey="itemId" listValue="itemName" theme="simple" value="%{tagValueList}"/>
					</s:if>
					<s:if test="tagTypeFlg == 4">
						<s:select id="%{propertySeq}" name="%{tagName}" list="%{itemList}" listKey="itemId" 
							listValue="itemName" value="%{tagValue}" cssClass="span-3"/>
					</s:if>
				</div>
			</s:iterator>
		</s:if>
		<div class="span-15">
			<div class="span-2 text_right">
				<s:label id="referLbl" value="备注" />
			</div>
			<s:textfield id="referTxt" name="comCodeMaint.refer"
		 		maxlength="1000" cssClass="span-12" />
		</div>
		<div class="span-14 margin_top_8 text_center last">
				<input type="button" id="refer" name="refer" value="提交"
					class="btn span-2" onclick="submitDiffInfo()" />
		</div>
	</s:form>
</div>