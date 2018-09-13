<%--
 * @(#)Ye0020.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 
--%>

<%--
 * 
 * 
 * @author liuyiwei
 * @version 1.00 
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<!-- 共通css -->
	<link href="<%=basePath%>${session.userTheme}" rel="stylesheet" type="text/css">

	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/commonMessage.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/formValidation.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/My97DatePicker/WdatePicker.js"></script>

	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/att/Ye0020.js"></script>	
	<title>个人休假申请</title>
</head>
<body onload="init();">
	<div class="span-11 position_rel last">
	<s:form id="ye0020InfoForm" action="">
	<!--画面模式-->
	<s:hidden id="mode" name="ye0020AttInfo.mode" />
	<s:hidden id="appId" name="ye0020AttInfo.appId" />
	<div class="span-11 margin_top_6 last">
    	<div class="span-2">申请人</div>
        <div class="span-3">
        	<s:textfield id="userId" name="ye0020AttInfo.userId" cssClass="span-3" disabled="true"/>
        </div>
    	<div class="span-6 last">
    		<s:textfield id="userName" name="ye0020AttInfo.userName" cssClass="span-3" disabled="true"/>
       	</div>
    </div>
	<div class="span-11 last">
    	<div class="span-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="color_red">*</span></div>    	
       	<div class="bd_1sccc span-7" id="divrestDayType">
        	<s:radio name="ye0020AttInfo.restDayType" list="#{'H':'半天','S':'一天','M':'多天'}" cssClass="margin_right_6 bd_none" listKey="key" listValue="value" onclick="restDayTypeClick(this.value)"/>
        </div>
    </div>
	<div class="span-11 margin_top_6 last">
    	<div class="span-2"><span id="startdate">请假日期</span><span class="color_red">*</span></div>
    	<div class="span-4">
			<s:textfield id="restStartDate" name="ye0020AttInfo.restStartDate" onclick="WdatePicker()" />
       	</div>
        <div class="span-5 last none" id="divhalf">
            <s:radio id="restHalfDayType" name="ye0020AttInfo.restHalfDayType" list="#{'S':'上午','X':'下午'}" cssClass="margin_right_6 bd_none" listKey="key" listValue="value"/>
        </div>
    </div>
	<div class="span-11 margin_top_6 last none" id="divenddate">
    	<div class="span-2">终止日期<span class="color_red">*</span></div>
    	<div class="span-4">
    		<s:textfield id="enddate" name="ye0020AttInfo.restEndDate" onclick="WdatePicker()" />
       	</div>
       	<div class="span-4" id="divleaveDays">
       		<s:label id="leaveDays" name="ye0020AttInfo.leaveDays" cssClass="span-2 color_green"/><s:hidden id="leaveDaysHid" />
        	<s:label id="ptoDays" name="ye0020AttInfo.ptoDays" cssClass="span-2 color_green"/><s:hidden id="ptoDaysHid" />
			<s:label id = "exrestTime" name="ye0020AttInfo.exrestTime" cssClass="span-2 color_green"/><s:hidden id="exrestTimeHid" />
       	</div>
    </div>
	<div class="span-11 margin_top_6 last">
    	<div class="span-2">休假类型<span class="color_red">*</span></div>
    	<div class="bd_1sccc span-8" id="divrestType">
        	<div class="span-8">
	           	<s:radio name="ye0020AttInfo.restType" list="#{'G':'公出','H':'换休','B':'病假','S':'事假'}" cssClass="margin_right_6 bd_none" listKey="key" listValue="value" onclick="countDays(this.value)"/>
            </div>
        	<div class="span-8" id="divtyperadio">
        		<s:radio name="ye0020AttInfo.restType" list="#{'C':'出差','N':'年休','T':'特休','W':'婚假','M':'产假','F':'丧假'}" cssClass="margin_right_6 bd_none" listKey="key" listValue="value" onclick="countDays(this.value)"/>
            </div>
        </div>
    </div>
	<div class="span-11 margin_top_6 last">
    	<div class="span-2">休假理由<span class="color_red">*</span></div>
    	<div class="span-9 last">
        	<s:textarea cssClass="h_50 span-8" id="restReason" name="ye0020AttInfo.restReason"/>
       	</div>
    </div>
    <div id="divsuggestion" class="span-11 margin_top_6 last none">
    <s:if test="ye0020AttInfo.exaSuggestion != ''">
    	<div class="span-2">审批意见</div>
    	<div class="span-9 last">
        	<s:textarea cssClass="span-8" id="exaSuggestion" name="ye0020AttInfo.exaSuggestion" disabled="true"/>
       	</div>
    </s:if>
    </div>
    <div class="span-11 margin_top_6 last">  
    	<div class="span-2">审批流程</div>
        <div class="span-8">
        	<s:if test="ye0020AttInfo.mode== 1 || ye0020AttInfo.mode== 4">
        		<s:select id="flowForLeave" name="ye0020AttInfo.flowForLeave" list="flowForLeaveList" 
        			listKey="flowForLeaveId" listValue="flowForLeaveName" cssClass="span-8"/>
			</s:if>
			<s:else>
				<s:textfield id="flowForLeave" name="ye0020AttInfo.flowForLeaveName" cssClass="span-8" disabled="true"/>
			</s:else>
        </div>
    </div> 
    <div class="span-11 margin_top_6 margin last">
    	<input type="button" id="btnSubmit" value="提交" class="btn span-2" onClick="submitAttRestApp();"/>&nbsp;&nbsp;
    	<input type="button" id="btnCancel" value="撤销" class="btn span-2" onClick="cancelAttRestApp();"/>
    </div>
	</s:form>
	<div id="errormsgDiv" class="span-10 text_center color_red last margin_top_6">
		<s:property value="errormsg"/>
		<s:fielderror />
	</div>
</div>
</body>
</html>
