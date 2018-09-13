<%--
 * @(#)Ye0060.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 考勤系统
--%>

<%--
 * 项目加班一览画面
 * 
 * @author sundefu
 * @version 1.00 2010/12/06
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<div class="span-11 margin_top_6 show_grid container last">
	<s:form id="applyOvertime_newForm" action="ye0060overtimeInfoOperate">
	<div class="span-11">
    	<div class="span-2 text_right">项目<span class="color_red">*</span></div>
    	<div class="span-3 last">
			<s:label name="attOvertime.prjName"></s:label>
			<s:hidden name="attOvertime.prjId"></s:hidden>
      	</div>
	</div>
	<div class="span-11 margin_top_6 last">
	    	<div class="span-2 text_right">日期<span class="color_red">*</span></div>
	    	<div class="span-4">
				<s:textfield id="applyOvertimeDate_new" name="attOvertime.applyOvertimeDate" onclick="WdatePicker()" onchange="setOvertimeLimits(this)"/>  
	       	</div>
	</div>
	<div class="span-11 margin_top_6 last">
	   	<div class="span-2 text_right">申请期间<span class="color_red">*</span></div>
	   	<div class="span-2 text_center">
			<s:textfield onclick="WdatePicker({dateFmt:'HH:mm'})" id="applyStartTime_new" name="attOvertime.applyStartTime" cssClass="span-2"/>  
	    </div>
		<div class="span-1 text_center">～</div>
		<div class="span-2 text_center">
			<s:textfield onclick="WdatePicker({dateFmt:'HH:mm'})" id="applyEndTime_new" name="attOvertime.applyEndTime" cssClass="span-2"/>  
	    </div>
	    <div class="span-2 text_center last">
	    	<input type="checkbox" id="checkBoxtomorrowValue" name="checkBoxtomorrowValue"/>
	    	<s:hidden id="tomorrowValue" name="tomorrowValue"/>
	    	翌日
	    </div>
	</div>
	<div class="span-11 margin_top_6 last">
	   	<div class="span-2 text_right">加班内容<span class="color_red">*</span></div>
	   	<div class="span-9 last">
	       	<s:textarea id="overtimeComment_new" name="attOvertime.overtimeComment" cssClass="h_50 span-8"></s:textarea>
	    </div>
	</div>
	<!-- 员工选择列表部分 -->
	<div id="div_ye0060_empListSelect">
		<s:include value="Ye0062.jsp" />
	</div>
	<div id="editButton" class="span-11 margin_top_6 margin text_center last none">
		<input type="button" value="提交" class="btn span-2" onClick="saveApplyOvertimeInfo();"/>&nbsp;&nbsp;
		<input type="button" value="取消" class="btn span-2" onClick="closeOvertimeApply();"/>
	</div>
	</s:form>
</div>