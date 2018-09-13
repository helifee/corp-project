<%--
 * @(#)Ye0010.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 
--%>

<%--
 * 
 * 
 * @author 
 * @version 1.00 
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<div id="div_ye0010_view" class="span-20 show_grid container last">
	<s:form id="ye0010InfoForm" action="ye0010insert" namespace="/att" method="post" validate="true">
		<div id="errorMessage" class="prepend-2 span-5 last">
			<s:fielderror></s:fielderror>
		</div>
		<div class="span-20 last">
			<div class="span-4 text_right">
					<s:label id="EMP_ID" value="EMP_ID" />
					<s:textfield id="empId" name="attInfo.empId"	maxlength="8" cssClass="span-15" />
			</div>
		</div>
		<div class="span-20 last">
			<div class="span-4 text_right">
					<s:label id="YEAR" value="YEAR" />
					<s:textfield id="year" name="attInfo.year"	maxlength="4" cssClass="span-15" />
			</div>
		</div>
		<div class="span-20 last">
			<div class="span-4 text_right">
					<s:label id="MONTH" value="MONTH" />
					<s:textfield id="month" name="attInfo.month"	maxlength="2" cssClass="span-15" />
			</div>
		</div>
		<div class="span-20 last">
			<div class="span-4 text_right">
					<s:label id="DAY" value="DAY" />
					<s:textfield id="day" name="attInfo.day"	maxlength="2" cssClass="span-15" />
			</div>
		</div>
		<div class="span-20 last">
			<div class="span-4 text_right">
					<s:label id="TYPE_FLG" value="TYPE_FLG" />
					<s:textfield id="typeFlg" name="attInfo.typeFlg"	maxlength="1" cssClass="span-15" />
			</div>
		</div>
		<div class="span-20 last">
			<div class="span-4 text_right">
					<s:label id="P_START_TIME" value="P_START_TIME" />
					<s:textfield id="pstartTime" name="attInfo.pstartTime"	maxlength="0" cssClass="span-15" />
			</div>
		</div>
		<div class="span-20 last">
			<div class="span-4 text_right">
					<s:label id="P_END_TIME" value="P_END_TIME" />
					<s:textfield id="pendTime" name="attInfo.pendTime"	maxlength="0" cssClass="span-15" />
			</div>
		</div>
		<div class="span-20 last">
			<div class="span-4 text_right">
					<s:label id="LUNCH_TIME_ST" value="LUNCH_TIME_ST" />
					<s:textfield id="lunchTimeSt" name="attInfo.lunchTimeSt"	maxlength="0" cssClass="span-15" />
			</div>
		</div>
		<div class="span-20 last">
			<div class="span-4 text_right">
					<s:label id="LUNCH_TIME_END" value="LUNCH_TIME_END" />
					<s:textfield id="lunchTimeEnd" name="attInfo.lunchTimeEnd"	maxlength="0" cssClass="span-15" />
			</div>
		</div>
		<div class="span-20 last">
			<div class="span-4 text_right">
					<s:label id="DINNER_TIME_END" value="DINNER_TIME_END" />
					<s:textfield id="dinnerTimeEnd" name="attInfo.dinnerTimeEnd"	maxlength="0" cssClass="span-15" />
			</div>
		</div>
		<div class="span-20 last">
			<div class="span-4 text_right">
					<s:label id="R_START_TIME" value="R_START_TIME" />
					<s:textfield id="rstartTime" name="attInfo.rstartTime"	maxlength="0" cssClass="span-15" />
			</div>
		</div>
		<div class="span-20 last">
			<div class="span-4 text_right">
					<s:label id="R_END_TIME" value="R_END_TIME" />
					<s:textfield id="rendTime" name="attInfo.rendTime"	maxlength="0" cssClass="span-15" />
			</div>
		</div>
		<div class="span-20 last">
			<div class="span-4 text_right">
					<s:label id="FIRST_TIME" value="FIRST_TIME" />
					<s:textfield id="firstTime" name="attInfo.firstTime"	maxlength="0" cssClass="span-15" />
			</div>
		</div>
		<div class="span-20 last">
			<div class="span-4 text_right">
					<s:label id="LAST_TIME" value="LAST_TIME" />
					<s:textfield id="lastTime" name="attInfo.lastTime"	maxlength="0" cssClass="span-15" />
			</div>
		</div>
		<div class="span-20 last">
			<div class="span-4 text_right">
					<s:label id="REST_TYPE" value="REST_TYPE" />
					<s:textfield id="restType" name="attInfo.restType"	maxlength="2" cssClass="span-15" />
			</div>
		</div>
		<div class="span-20 last">
			<div class="span-4 text_right">
					<s:label id="APP_STATUS" value="APP_STATUS" />
					<s:textfield id="appStatus" name="attInfo.appStatus"	maxlength="1" cssClass="span-15" />
			</div>
		</div>
		<div class="span-20 last">
			<div class="span-4 text_right">
					<s:label id="APP_ID" value="APP_ID" />
					<s:textfield id="appId" name="attInfo.appId"	maxlength="14" cssClass="span-15" />
			</div>
		</div>
		<div class="span-20 last">
			<div class="span-4 text_right">
					<s:label id="REST_TYPE_ADDI" value="REST_TYPE_ADDI" />
					<s:textfield id="restTypeAddi" name="attInfo.restTypeAddi"	maxlength="2" cssClass="span-15" />
			</div>
		</div>
		<div class="span-20 last">
			<div class="span-4 text_right">
					<s:label id="APP_STATUS_ADDI" value="APP_STATUS_ADDI" />
					<s:textfield id="appStatusAddi" name="attInfo.appStatusAddi"	maxlength="1" cssClass="span-15" />
			</div>
		</div>
		<div class="span-20 last">
			<div class="span-4 text_right">
					<s:label id="APP_ID_ADDI" value="APP_ID_ADDI" />
					<s:textfield id="appIdAddi" name="attInfo.appIdAddi"	maxlength="14" cssClass="span-15" />
			</div>
		</div>
		<div class="span-20 last">
			<div class="span-4 text_right">
					<s:label id="ATT_STATUS_COR" value="ATT_STATUS_COR" />
					<s:textfield id="attStatusCor" name="attInfo.attStatusCor"	maxlength="1" cssClass="span-15" />
			</div>
		</div>
		<div class="span-20 last">
			<div class="span-4 text_right">
					<s:label id="APP_ID_COR" value="APP_ID_COR" />
					<s:textfield id="appIdCor" name="attInfo.appIdCor"	maxlength="14" cssClass="span-15" />
			</div>
		</div>
		<div class="span-20 last">
			<div class="span-4 text_right">
					<s:label id="ATT_STATUS_OT" value="ATT_STATUS_OT" />
					<s:textfield id="attStatusOt" name="attInfo.attStatusOt"	maxlength="1" cssClass="span-15" />
			</div>
		</div>
		<div class="span-20 last">
			<div class="span-4 text_right">
					<s:label id="OT_ST_TIME" value="OT_ST_TIME" />
					<s:textfield id="otStTime" name="attInfo.otStTime"	maxlength="0" cssClass="span-15" />
			</div>
		</div>
		<div class="span-20 last">
			<div class="span-4 text_right">
					<s:label id="OT_ED_TIME" value="OT_ED_TIME" />
					<s:textfield id="otEdTime" name="attInfo.otEdTime"	maxlength="0" cssClass="span-15" />
			</div>
		</div>
		<div class="span-20 last">
			<div class="span-4 text_right">
					<s:label id="OT_BENEFIT" value="OT_BENEFIT" />
					<s:textfield id="otBenefit" name="attInfo.otBenefit"	maxlength="1" cssClass="span-15" />
			</div>
		</div>
		<div class="span-20 last">
			<div class="span-4 text_right">
					<s:label id="ORG_ID" value="ORG_ID" />
					<s:textfield id="orgId" name="attInfo.orgId"	maxlength="10" cssClass="span-15" />
			</div>
		</div>
		<div class="span-20 last">
			<div class="span-4 text_right">
					<s:label id="UPDATE_USER" value="UPDATE_USER" />
					<s:textfield id="updateUser" name="attInfo.updateUser"	maxlength="8" cssClass="span-15" />
			</div>
		</div>
		<div class="span-20 last">
			<div class="span-4 text_right">
					<s:label id="UPDATE_TIME" value="UPDATE_TIME" />
					<s:textfield id="updateTime" name="attInfo.updateTime"	maxlength="0" cssClass="span-15" />
			</div>
		</div>
			<input type="button" id="refer" name="refer" value="保存"
				class="btn span-2" onclick="submitForm()" />
	</s:form>
</div>
