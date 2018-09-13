<%@page import="com.ysys.www.model.*" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/commons/taglibs.jsp" %>

	<s:hidden id="userId" name="userId" />

<!-- ONGL access static field: @package.class@field or @vs@field -->
	
	<s:textfield label="%{@vs@ALIAS_ROLE_ID}" key="roleId" value="%{model.roleId}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_POS_ID}" key="posId" value="%{model.posId}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_PRO_ID}" key="proId" value="%{model.proId}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_PERMIT_ID}" key="permitId" value="%{model.permitId}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_PERMIT_REFER}" key="permitRefer" value="%{model.permitRefer}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_OPERATOR}" key="operator" value="%{model.operator}" cssClass="" required="false" />
	
	
	<tr>	
		<td class="tdLabel">
			<span class="required">*</span><%=PerUserPermit.ALIAS_UPDATETIME%>:
		</td>	
		<td>
		<input value="${model.updatetimeString}" onclick="WdatePicker({dateFmt:'<%=PerUserPermit.FORMAT_UPDATETIME%>'})" id="updatetimeString" name="updatetimeString"  maxlength="0" class="required " />
		</td>
	</tr>
	
