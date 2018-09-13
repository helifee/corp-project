<%--
 * @(#)k060061_create_model_set.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 考试子系统
--%>

<%--
 * 考试生成方式设定
 * 
 * @author qiliqiang
 * @version 1.00 2010/05/04
 * @update 2010/06/28 zhanghaibo
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<div id="setExamine" class="bgclr_fff span-20 ">
<s:form id="examineSetForm" name="examineSetForm" action="k060061UpdateExamineCreateStyle" validate="true">
	 <s:hidden id="examineId" name="examineId"/>
	<!-- 考试方式选择DIV -->
	<div id="modelSelectDiv" class="span-20">
		<div class="span-20 text_center">
			<h2>考试方式选择</h2>
		</div>
		<div class="span-20">
			<div class="span-2 prepend-4">
				<s:label value="考试方式："/>
			</div>
			<div class="span-2">
				<!-- wanqiuhong 10/27 修改：将list中的   '4':'试验考试'  删除 -->
				<s:radio id="createModelSelect" name="createModelSelect" list="#{'1':'单次考试','2':'循环考试','3':'随时考试 '}" value="1" />
			</div>
			<div class="span-8 last">
				<div class="span-8">
					<s:label value="(生成一个单次的考试)"/>
				</div>
				<div class="span-8">
					<s:label value="(按日期循环生成多个单次的考试)"/>
				</div>
				<div class="span-8">
					<s:label value="(生成一个随时可以进行的考试)"/>
				</div>
				<div class="span-8 none">
					<s:label value="(生成一个试验的考试，用于测试考试难度和用时)"/>
				</div>
			</div>
			<div class="span-20 text_center margin_top_6">
				<input type="button" class="span-2 btn" value="下一步" onClick="examineDetailSet()"/>
			</div>
		</div>
	</div>
	<!-- 单次考试DIV -->
	<div id="singleExamineDiv" class="span-20">
		<div class="span-20 text_center">
			<h2>单次考试详细设定</h2>
		</div>
		<div class="span-20">
			<div class="span-3 prepend-3 text_right">
				<s:label value="考试日期："/>
			</div>
			<div class="span-2">
				<s:textfield  cssClass="span-2" name="examineStartDate1" 
				id="examineStartDate1" maxlength="10" onclick="WdatePicker({minDate:'%y-%M-{%d+3}'});setDate()" />
			</div>
		</div>
		<div class="span-20">
			<div class="span-3 prepend-3 text_right">
				<s:label value="考试开始时刻："/>
			</div>
			<div class="span-2">
				<s:textfield onclick="WdatePicker({dateFmt:'HH:mm'})" 
				cssClass="span-2" name="examineStartTime1" id="examineStartTime1" maxlength="5" />
			</div>
			<div class="span-3">
				<s:label value="(不填默认为00:00)"/>
			</div>
			<div class="span-3  text_right">
				<s:label value="考试结束时刻："/>
			</div>
			<div class="span-2">
				<s:textfield cssClass="span-2 disabled"  readonly="true" name="examineEndTime1" id="examineEndTime1" maxlength="5" />
			</div>
			<div class="span-3">
				<s:label value="(不填)"/>
			</div>
		</div>
		<div class="span-20">
			<div class="span-3 prepend-3 text_right">
				<s:label value="报名截止日期："/>
			</div>
			<div class="span-2">
				<s:textfield  cssClass="span-2" name="applyClosingDate1" 
				id="applyClosingDate1" maxlength="10" onclick="WdatePicker({minDate:'%y-%M-{%d+2}',maxDate:g_maxDate_applyClosing});setDate()" />
			</div>
			<div class="span-3 prepend-3 text_right">
				<s:label value="报名截止时刻："/>
			</div>
			<div class="span-2">
				<s:textfield  onclick="WdatePicker({dateFmt:'HH:mm'})"
				 cssClass="span-2" name="applyClosingTime1" id="applyClosingTime1" maxlength="5" />
			</div>
			<div class="span-3">
				<s:label value="(不填默认为23:59)"/>
			</div>
		</div>
		<div class="span-20">
			<div class="span-3 prepend-3 text_right">
				<s:label value="通知提醒日期："/>
			</div>
			<div class="span-2">
				<s:textfield  cssClass="span-2" name="examineNotifyDate1" 
				id="examineNotifyDate1" maxlength="10" onclick="WdatePicker({minDate:'%y-%M-{%d+1}',maxDate:g_maxDate_Notify})" />
			</div>
		</div>
	</div>
	<!-- 循环考试DIV -->
	<div id="loopExamineDiv" class="span-20">
		<div class="span-20 text_center">
			<h2>循环考试详细设定</h2>
		</div>
		<div class="span-20">
			<div class="span-3 prepend-2 text_right">
				<s:label value="循环考试开始日期："/>
			</div>
			<div class="span-2">
				<s:textfield  cssClass="span-2" name="examineStartDate2" 
				id="examineStartDate2" maxlength="10" onclick="WdatePicker({minDate:'%y-%M-{%d+3}'});setDate()" />
			</div>
			<div class="span-3 prepend-3 text_right">
				<s:label value="循环考试结束日期："/>
			</div>
			<div class="span-2">
				<s:textfield  cssClass="span-2" name="examineEndDate2" 
				id="examineEndDate2" maxlength="10" onclick="WdatePicker({minDate:g_minDate_ExamineEnd2})"/>
			</div>
		</div>
		<div class="span-20">
			<div class="span-3 prepend-2 text_right">
				<s:label value="循环考试方式："/>
			</div>
			<div class="span-2">
				<s:select id="loopExamineModelSel" list="loopExamineModelList" listKey="diffNo" listValue="diffName" onchange="examineDateControl()"/>
			</div>
			<div class="span-3 prepend-3 text_right">
				<s:label value="考试日期："/>
			</div>
			<!-- 按年循环考试日期(月) -->
			<div id="yearLoopMonthDiv">
				<div class="span-2 text_right">
					<s:select id="yearLoopMonthSel" name="yearLoopMonthSel" list="yearLoopMonthList" listKey="diffNo" listValue="diffName" onchange="yearLoopDayControl()"/>
				</div>
				<div class="span-1">
					<s:label value="月"/>
				</div>
			</div>
			<!-- 按年循环考试日期(日) -->
			<div id="yearLoopDayDiv" class="span-3">
				<div class="span-1">
					<s:select id="yearLoopDaySel" name="yearLoopDaySel" list="#{}"/>
				</div>
				<div class="span-1">
					<s:label value="日"/>
				</div>
			</div>
			
			<!-- 按月循环考试日期(日) -->
			<div id="monthLoopDayDiv">
				<div class="span-2 text_right">
					<s:select id="moonLoopDaySel" name="moonLoopDaySel" list="monthLoopDayList" listKey="diffNo" listValue="diffName"/>
				</div>
				<div class="span-1">
					<s:label value="日"/>
				</div>
			</div>
			<!-- 按周循环考试日期 -->
			<div id="weekLoopDiv">
				<div class="span-1 text_right">
					<s:label value="星期"/>
				</div>
				<div class="span-1">
					<s:select id="weekLoopDaySel" name="weekLoopDaySel" list="weekLoopList" listKey="diffNo" listValue="diffName"/>
				</div>
			</div>
		</div>
		<div class="span-20">
			<div class="span-3 prepend-2 text_right">
				<s:label value="考试开始时刻："/>
			</div>
			<div class="span-2">
				<s:textfield  onclick="WdatePicker({dateFmt:'HH:mm'})" 
				cssClass="span-2" name="examineStartTime2" id="examineStartTime2" maxlength="5" />
			</div>
			<div class="span-3">
				<s:label value="(不填默认为00:00)"/>
			</div>
			<div class="span-3 text_right">
				<s:label value="考试结束时刻："/>
			</div>
			<div class="span-2">
				<s:textfield  cssClass="span-2 disabled"  readonly="true" name="examineEndTime2" id="examineEndTime2" maxlength="5" />
			</div>
			<div class="span-3">
				<s:label value="(不填)"/>
			</div>
		</div>
		<div class="span-20">
			<div class="span-3 prepend-2 text_right">
				<s:label value="报名截止日期："/>
			</div>
			<div class="span-1 text_right">
				<s:label value="提前"/>
			</div>
			<div class="span-1">
				<s:textfield  cssClass="span-1" name="applyClosingDay" id="applyClosingDay" maxlength="3"/>
			</div>
			<div class="span-1">
				<s:label value="天"/>
			</div>
			<div class="span-3 prepend-2 text_right">
				<s:label value="报名截止时刻："/>
			</div>
			<div class="span-2">
				<s:textfield  onclick="WdatePicker({dateFmt:'HH:mm'})" 
				cssClass="span-2" name="applyClosingTime2" id="applyClosingTime2" maxlength="5" />
			</div>
			<div class="span-3">
				<s:label value="(不填默认为23:59)"/>
			</div>
		</div>
		<div class="span-20">
			<div class="span-3 prepend-2 text_right">
				<s:label value="通知提醒日期："/>
			</div>
			<div class="span-1 text_right">
				<s:label value="提前"/>
			</div>
			<div class="span-1">
				<s:textfield  cssClass="span-1" name="examineNotifyDay" id="examineNotifyDay" maxlength="3"/>
			</div>
			<div class="span-1">
				<s:label value="天"/>
			</div>
		</div>
	</div>
	<!-- 随时考试DIV -->
	<div id="anytimeExamineDiv" class="span-20">
		<div class="span-20 text_center">
			<h2>随时考试详细设定</h2>
		</div>
		<div class="span-20">
			<div class="span-3 prepend-8 text_right">
				<s:label value="随时考试开始日期："/>
			</div>
			<div class="span-2 last">
				<s:textfield  cssClass="span-2" name="examineStartDate3" 
				id="examineStartDate3" maxlength="10" onclick="WdatePicker({minDate:'%y-%M-{%d+2}'});setDate()"/>
			</div>
		</div>
		<div class="span-20">
			<div class="span-3 prepend-8 text_right">
				<s:label value="随时考试结束日期："/>
			</div>
			<div class="span-2 last">
				<s:textfield  cssClass="span-2" name="examineEndDate3" 
				id="examineEndDate3" maxlength="10" onclick="WdatePicker({minDate:g_minDate_ExamineEnd3})"/>
			</div>
		</div>
		<div class="span-20">
			<div class="span-3 prepend-8 text_right">
				<s:label value="通知提醒日期："/>
			</div>
			<div class="span-2 last">
				<s:textfield  cssClass="span-2" name="examineNotifyDate3" 
				id="examineNotifyDate3" maxlength="10" onclick="WdatePicker({minDate:'%y-%M-{%d+1}',maxDate:g_maxDate_Notify3})"/>
			</div>
		</div>
	</div>
	<!-- 试验考试DIV -->
	<div id="testExamineDiv" class="span-20">
		<div class="span-20 text_center">
			<h2>试验考试详细设定</h2>
		</div>
		<div class="span-20">
			<div class="span-3 prepend-3 text_right">
				<s:label value="试验考试日期："/>
			</div>
			<div class="span-2">
				<s:textfield  cssClass="span-2" name="examineStartDate4" 
				id="examineStartDate4" maxlength="10" onclick="WdatePicker({minDate:'%y-%M-{%d+1}'})" />
			</div>
		</div>
		<div class="span-20">
			<div class="span-3 prepend-3 text_right">
				<s:label value="试验考试开始时刻："/>
			</div>
			<div class="span-2">
				<s:textfield  onclick="WdatePicker({dateFmt:'HH:mm'})" cssClass="span-2" name="examineStartTime4" id="examineStartTime4" maxlength="5" />
			</div>
			<div class="span-3">
				<s:label value="(不填默认为00:00)"/>
			</div>
			<div class="span-3 text_right">
				<s:label value="试验考试结束时刻："/>
			</div>
			<div class="span-2">
				<s:textfield cssClass="span-2 disabled"  readonly="true" name="examineEndTime4" id="examineEndTime4" maxlength="5" />
			</div>
			<div class="span-3">
				<s:label value="(不填)"/>
			</div>
		</div>
	</div>
	<div id="btndiv" class="span-20 margin_top_6">
		<div class="span-2 prepend-8">
			<input type="button" class="span-2 btn" value="上一步" onClick="goBack()"/>
		</div>
		<div class="span-2 prepend-2">
			<input type="button" class="span-2 btn " value="确定" onClick="saveChildExamine()"/>
		</div>
	</div>
	<div class="clear_both">
	</div>
</s:form>
</div>

