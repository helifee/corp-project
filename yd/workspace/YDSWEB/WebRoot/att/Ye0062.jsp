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
 * @version 1.00 2010/12/24
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<div class="span-1 last">
	<s:hidden id="dateTypeFlag" name="attOvertime.dateTypeFlag"></s:hidden>
	<div class="span-11 margin_top_6 last">
	   	<div class="span-2 text_right">受益<span class="color_red">*</span></div>
	   	<div class="bd_1sccc span-4 ">
	       	<div class="span-4">
				<s:radio id="benefitFlag_new" name="attOvertime.benefitFlag" list="benefitFlagList" listKey="diffNo" listValue="diffName"/>
			</div>
	   	</div>
	</div>
	<div class="span-11 margin_top_6 last">
		<div class="span-2 text_right">加班人</div>
		<div id="overtimeEmp_new" class="none span-9 last"><s:label name="attOvertime.empName"></s:label></div>
		<s:hidden id="applyOvertimeEmpId_new" name="attOvertime.empId"></s:hidden>
		<div id="overtimeEmpList_new" class="none span-9 overflow_scr_y h_112 last">
			<div>
			<s:optiontransferselect doubleId = "applyEmpListObj"
				name="prjEmpStringList" list="prjEmpList" listKey="userId" listValue="userName"
			   	doubleName="applyEmpStringList" doubleList="applyOvertimeEmpList" doubleListKey="userId" doubleListValue="userName"
			   	leftTitle="未选择" rightTitle="已选择"
			cssClass="span-3" size="8" buttonCssClass="span-1 btn color_blue" doubleSize="8" doubleCssClass="span-3" allowSelectAll="false" allowUpDownOnLeft="false" allowUpDownOnRight="false">
			</s:optiontransferselect>
			</div>
		</div>
	</div>
</div>