<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
    <%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<s:form id="k070011PostionForm" action="k070011GetPostionExamineList" method ="post" validate="true">
<div id="divSearch1" class="span-24">
	<div class="span-2 padding_top_8 padding_bottom_8 prepend-4">
		<s:label value="检索条件1:"/>
	</div>
	<div class="span-14">
		<div class="span-14">
			<s:label value="考试信息:"/>
			<s:textfield id="examine1Id" name="searchPostionList[0].examineId" maxlength="8" cssClass="span-3 im_inactive" 
			onchange="getExamineNameLevel('examine1Id', 'resultlevel1Id', 'examine1Name')"/>
			<s:label id="examine1Name" name="examine1Name" cssClass="span-3"/>
			<select id="resultlevel1Id" name="searchPostionList[0].resultlevelId" class="span-3 none">
			</select>
			<s:hidden id="flag" value="0"/>
		</div>
		<div class="span-14 margin_top_6">
			<s:label value="考试分类:"/>
			<select class="span-3" id="sltCategoryA1" type="category1Id" name="searchPostionList[0].category1Id"></select>
			<select class="span-3" id="sltCategoryA2" type="category2Id" name="searchPostionList[0].category2Id"></select>
			<select class="span-3" id="sltCategoryA3" type="category3Id" name="searchPostionList[0].category3Id"></select>
			<input id="addButtonA" type="button" class="span-2 btn" onclick="addSearchA()" value="追加>>">		
		</div>
	</div>
</div>
<div id="divSearch2" class="span-24  margin_top_6 none">
	<div class="span-2 padding_top_8 padding_bottom_8 prepend-4">
		<s:label value="检索条件2:"/>
	</div>
	<div class="span-14">
		<div class="span-14">
			<s:label value="考试信息:"/>
			<s:textfield id="examine2Id" name="searchPostionList[1].examineId" maxlength="8" cssClass="span-3 im_inactive" 
			onchange="getExamineNameLevel('examine2Id', 'resultlevel2Id', 'examine2Name')"/>
			<s:label id="examine2Name" name="examine2Name" cssClass="span-3"/>
			<select id="resultlevel2Id" name="searchPostionList[1].resultlevelId" class="span-3 none">
			</select>
		</div>
		<div class="span-14 margin_top_6">
			<s:label value="考试分类:"/>
			<select class="span-3" id="sltCategoryB1" type="category1Id" name="searchPostionList[1].category1Id"></select>
			<select class="span-3" id="sltCategoryB2" type="category2Id" name="searchPostionList[1].category2Id"></select>
			<select class="span-3" id="sltCategoryB3" type="category3Id" name="searchPostionList[1].category3Id"></select>
			<input id="addButtonB" type="button" class="span-2 btn" onclick="addSearchB()" value="追加>>">	
			<input id="removeButtonB" type="button" class="span-2 btn" onclick="removeSearchB()" value="移除">			
		</div>
	</div>
</div>
<div id="divSearch3" class="span-24 margin_top_6 none">
	<div class="span-2 padding_top_8 padding_bottom_8 prepend-4">
		<s:label value="检索条件3:"/>
	</div>
	<div class="span-14">
		<div class="span-14">
			<s:label value="考试信息:"/>
			<s:textfield id="examine3Id" name="searchPostionList[2].examineId" maxlength="8" cssClass="span-3 im_inactive" 
			onchange="getExamineNameLevel('examine3Id', 'resultlevel3Id', 'examine3Name')"/>
			<s:label id="examine3Name" name="examine3Name" cssClass="span-3"/>
			<select id="resultlevel3Id" name="searchPostionList[2].resultlevel3Id" class="span-3 none">
			</select>
		</div>
		<div class="span-14 margin_top_6">
			<s:label value="考试分类:"/>
			<select class="span-3" id="sltCategoryC1" type="category1Id" name="searchPostionList[2].category1Id"></select>
			<select class="span-3" id="sltCategoryC2" type="category2Id" name="searchPostionList[2].category2Id"></select>
			<select class="span-3" id="sltCategoryC3" type="category3Id" name="searchPostionList[2].category3Id"></select>
			<input id="removeBouttonC" type="button" class="span-2 btn" onclick="removeSearchC()" value="移除">
		</div>
	</div>
</div>
<div id="divRelation" class="span-24 margin_top_6 none">
	<div class="span-4  prepend-3">
		<s:label value="上述条件的结合关系:"/>
	</div>
	<div class="span-6">
		<s:radio id="postionRadioValue" list="#{1:'AND', 2:'OR'}" name="postionRadioValue" value="1" />
	</div>
</div>
<div class="span-23 margin_top_6 text_right">
	<input type="button" class="span-2 btn" onclick="selectPostionExamine()" value="检索">
	<input type="button" class="span-2 btn" onclick="clearAll()"  value="清空">
</div>
</s:form>