<%@page import="com.ysys.www.model.*" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/commons/taglibs.jsp" %>

	<s:hidden id="permitId" name="permitId" />

<!-- ONGL access static field: @package.class@field or @vs@field -->
	
	<s:textfield label="%{@vs@ALIAS_MODULE_ID}" key="moduleId" value="%{model.moduleId}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_ACTION_ID}" key="actionId" value="%{model.actionId}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_PERMIT_VALUE}" key="permitValue" value="%{model.permitValue}" cssClass="required " required="true" />
	
