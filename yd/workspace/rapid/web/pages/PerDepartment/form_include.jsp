<%@page import="com.ysys.www.model.*" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/commons/taglibs.jsp" %>

	<s:hidden id="deptId" name="deptId" />

<!-- ONGL access static field: @package.class@field or @vs@field -->
	
	<s:textfield label="%{@vs@ALIAS_DEPT_NM}" key="deptNm" value="%{model.deptNm}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_PARENT_DEPT_ID}" key="parentDeptId" value="%{model.parentDeptId}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_COMPANY_ID}" key="companyId" value="%{model.companyId}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_DEPT_DESC}" key="deptDesc" value="%{model.deptDesc}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_DEPT_ROOM}" key="deptRoom" value="%{model.deptRoom}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_LEADER_ID}" key="leaderId" value="%{model.leaderId}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_LEADER_TEL}" key="leaderTel" value="%{model.leaderTel}" cssClass="validate-integer max-value-2147483647" required="false" />
	
	
	<tr>	
		<td class="tdLabel">
			<span class="required">*</span><%=PerDepartment.ALIAS_UPDATETIME%>:
		</td>	
		<td>
		<input value="${model.updatetimeString}" onclick="WdatePicker({dateFmt:'<%=PerDepartment.FORMAT_UPDATETIME%>'})" id="updatetimeString" name="updatetimeString"  maxlength="0" class="required " />
		</td>
	</tr>
	
