<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
    <%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<s:form id="k070011Form" action="k070011GetExamineList" method ="post" validate="true">
<div class="span-24">
	<div class="span-3 text_right"><s:label value="考试ID:"/></div>
	<div class="span-2 text_left">
	<s:textfield id="examineId" name="examineId" maxlength="8" cssClass="span-2 im_inactive" />
	</div>
	<div class="span-2 text_right"><s:label value="考试名称:"/></div>
	<div class="span-5 text_left">
	<s:textfield id="examineName" name="k070011Info.examineName" maxlength="200" cssClass="span-5" />
	</div>
</div>
<div class="span-24 margin_top_6">
	<div class="span-3 text_right"><s:label value="考试分类:"/></div>
	<div class="span-12 text_left">
	<select class="span-3" id="sltCategory1" type="category1Id" name="k070011Info.category1Id"></select>
	<select class="span-3" id="sltCategory2" type="category2Id" name="k070011Info.category2Id"></select>
	<select class="span-3" id="sltCategory3" type="category3Id" name="k070011Info.category3Id"></select>		
	</div>
	<div class="text_left">
		<input type="button" class="span-2 btn" onclick = "selectExamineList()" value ="检索">
		<input type="button" class="span-2 btn" onclick = "clearExamineInfo()" value ="清空">
	</div>
</div>
<div class="span-23 margin_top_6 append-h">
	<div class="span-3 text_right none"><s:label value="考试时间:"/></div>
	<div class="span-3 text_left none" >
		<s:textfield id = "startDate" name ="k070011Info.examineStartDate" maxLength="10"  cssClass="span-3"  onclick="WdatePicker()"/>
	</div>
	<div class="span-1 text_center none">
		<s:label value = "～"/>
	</div>
	<div class="span-3 text_left none">
		<s:textfield id = "endDate" name ="k070011Info.examineEndDate"  maxLength="10" cssClass="span-3" onclick="WdatePicker()"/>
	</div>
</div>
</s:form>