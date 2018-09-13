<%@page import="com.ysys.www.model.*" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/commons/taglibs.jsp" %>

	<s:hidden id="id" name="id" />

<!-- ONGL access static field: @package.class@field or @vs@field -->
	
	<s:textfield label="%{@vs@ALIAS_USERNAME}" key="username" value="%{model.username}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_PASSWORD}" key="password" value="%{model.password}" cssClass="required " required="true" />
	
	
	<tr>	
		<td class="tdLabel">
			<%=Tuser.ALIAS_CREATE_TIME%>:
		</td>	
		<td>
		<input value="${model.createTimeString}" onclick="WdatePicker({dateFmt:'<%=Tuser.FORMAT_CREATE_TIME%>'})" id="createTimeString" name="createTimeString"  maxlength="0" class="" />
		</td>
	</tr>
	
	
	<tr>	
		<td class="tdLabel">
			<%=Tuser.ALIAS_EXPIRE_TIME%>:
		</td>	
		<td>
		<input value="${model.expireTimeString}" onclick="WdatePicker({dateFmt:'<%=Tuser.FORMAT_EXPIRE_TIME%>'})" id="expireTimeString" name="expireTimeString"  maxlength="0" class="" />
		</td>
	</tr>
	
	
	<s:textfield label="%{@vs@ALIAS_PERSON}" key="person" value="%{model.person}" cssClass="validate-integer max-value-2147483647" required="false" />
	
