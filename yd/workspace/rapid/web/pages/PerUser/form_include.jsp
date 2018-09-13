<%@page import="com.ysys.www.model.*" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/commons/taglibs.jsp" %>

	<s:hidden id="empId" name="empId" />

<!-- ONGL access static field: @package.class@field or @vs@field -->
	
	<s:textfield label="%{@vs@ALIAS_EMP_PNM}" key="empPnm" value="%{model.empPnm}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_EMP_CNM}" key="empCnm" value="%{model.empCnm}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_EMP_JNM}" key="empJnm" value="%{model.empJnm}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_PASSWORD}" key="password" value="%{model.password}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_DEPT_ID}" key="deptId" value="%{model.deptId}" cssClass="required " required="true" />
	
	
	<tr>	
		<td class="tdLabel">
			<span class="required">*</span><%=PerUser.ALIAS_START_DATE%>:
		</td>	
		<td>
		<input value="${model.startDateString}" onclick="WdatePicker({dateFmt:'<%=PerUser.FORMAT_START_DATE%>'})" id="startDateString" name="startDateString"  maxlength="0" class="required " />
		</td>
	</tr>
	
	
	<s:textfield label="%{@vs@ALIAS_EMP_PWDASK}" key="empPwdask" value="%{model.empPwdask}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_EMP_PWDASW}" key="empPwdasw" value="%{model.empPwdasw}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_EMP_COOKIE}" key="empCookie" value="%{model.empCookie}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_EMP_WORKID}" key="empWorkid" value="%{model.empWorkid}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_EMP_WORKPWD}" key="empWorkpwd" value="%{model.empWorkpwd}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_HIGHER_ID}" key="higherId" value="%{model.higherId}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_OHIGHER_ID}" key="ohigherId" value="%{model.ohigherId}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_CONTRACT_ID}" key="contractId" value="%{model.contractId}" cssClass="" required="false" />
	
	
	<tr>	
		<td class="tdLabel">
			<%=PerUser.ALIAS_END_DATE%>:
		</td>	
		<td>
		<input value="${model.endDateString}" onclick="WdatePicker({dateFmt:'<%=PerUser.FORMAT_END_DATE%>'})" id="endDateString" name="endDateString"  maxlength="0" class="" />
		</td>
	</tr>
	
	
	<s:textfield label="%{@vs@ALIAS_YX_NO}" key="yxNo" value="%{model.yxNo}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_YX_CONTRACT_ID}" key="yxContractId" value="%{model.yxContractId}" cssClass="" required="false" />
	
	
	<tr>	
		<td class="tdLabel">
			<%=PerUser.ALIAS_YJSR%>:
		</td>	
		<td>
		<input value="${model.yjsrString}" onclick="WdatePicker({dateFmt:'<%=PerUser.FORMAT_YJSR%>'})" id="yjsrString" name="yjsrString"  maxlength="0" class="" />
		</td>
	</tr>
	
	
	<s:textfield label="%{@vs@ALIAS_EMP_DESP}" key="empDesp" value="%{model.empDesp}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_EMP_FLAG}" key="empFlag" value="%{model.empFlag}" cssClass="" required="false" />
	
	
	<tr>	
		<td class="tdLabel">
			<span class="required">*</span><%=PerUser.ALIAS_UPDATETIME%>:
		</td>	
		<td>
		<input value="${model.updatetimeString}" onclick="WdatePicker({dateFmt:'<%=PerUser.FORMAT_UPDATETIME%>'})" id="updatetimeString" name="updatetimeString"  maxlength="0" class="required " />
		</td>
	</tr>
	
