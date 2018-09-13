<%@page import="com.ysys.www.model.*" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/commons/taglibs.jsp" %>

	<s:hidden id="actionId" name="actionId" />

<!-- ONGL access static field: @package.class@field or @vs@field -->
	
	<s:textfield label="%{@vs@ALIAS_ACTION_NAME}" key="actionName" value="%{model.actionName}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_ACTION_VALUE}" key="actionValue" value="%{model.actionValue}" cssClass="required " required="true" />
	
