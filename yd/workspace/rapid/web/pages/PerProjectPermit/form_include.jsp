<%@page import="com.ysys.www.model.*" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/commons/taglibs.jsp" %>

	<s:hidden id="proId" name="proId" />

<!-- ONGL access static field: @package.class@field or @vs@field -->
	
	<s:textfield label="%{@vs@ALIAS_PERMIT_ID}" key="permitId" value="%{model.permitId}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_OPERATOR}" key="operator" value="%{model.operator}" cssClass="" required="false" />
	
	
	<tr>	
		<td class="tdLabel">
			<span class="required">*</span><%=PerProjectPermit.ALIAS_UPDATETIME%>:
		</td>	
		<td>
		<input value="${model.updatetimeString}" onclick="WdatePicker({dateFmt:'<%=PerProjectPermit.FORMAT_UPDATETIME%>'})" id="updatetimeString" name="updatetimeString"  maxlength="0" class="required " />
		</td>
	</tr>
	
