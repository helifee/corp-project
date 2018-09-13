<%@page import="com.ysys.www.model.*" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/commons/taglibs.jsp" %>


<!-- ONGL access static field: @package.class@field or @vs@field -->
	
	<s:textfield label="%{@vs@ALIAS_PRO_ID}" key="proId" value="%{model.proId}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_USER_ID}" key="userId" value="%{model.userId}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_JOB_FLAG}" key="jobFlag" value="%{model.jobFlag}" cssClass="" required="false" />
	
	
	<tr>	
		<td class="tdLabel">
			<span class="required">*</span><%=PerProjectUser.ALIAS_STA_DATE%>:
		</td>	
		<td>
		<input value="${model.staDateString}" onclick="WdatePicker({dateFmt:'<%=PerProjectUser.FORMAT_STA_DATE%>'})" id="staDateString" name="staDateString"  maxlength="0" class="required " />
		</td>
	</tr>
	
	
	<tr>	
		<td class="tdLabel">
			<%=PerProjectUser.ALIAS_END_DATE%>:
		</td>	
		<td>
		<input value="${model.endDateString}" onclick="WdatePicker({dateFmt:'<%=PerProjectUser.FORMAT_END_DATE%>'})" id="endDateString" name="endDateString"  maxlength="0" class="" />
		</td>
	</tr>
	
	
	<s:textfield label="%{@vs@ALIAS_OPERATOR}" key="operator" value="%{model.operator}" cssClass="" required="false" />
	
	
	<tr>	
		<td class="tdLabel">
			<span class="required">*</span><%=PerProjectUser.ALIAS_UPDATETIME%>:
		</td>	
		<td>
		<input value="${model.updatetimeString}" onclick="WdatePicker({dateFmt:'<%=PerProjectUser.FORMAT_UPDATETIME%>'})" id="updatetimeString" name="updatetimeString"  maxlength="0" class="required " />
		</td>
	</tr>
	
