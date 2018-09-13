<%@page import="com.ysys.www.model.*" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/commons/taglibs.jsp" %>

	<s:hidden id="moduleId" name="moduleId" />

<!-- ONGL access static field: @package.class@field or @vs@field -->
	
	<s:textfield label="%{@vs@ALIAS_MODULE_NAME}" key="moduleName" value="%{model.moduleName}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_MODULE_VALUE}" key="moduleValue" value="%{model.moduleValue}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_LINK_URL}" key="linkUrl" value="%{model.linkUrl}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_PARENT_MODULE}" key="parentModule" value="%{model.parentModule}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_MODULE_DESC}" key="moduleDesc" value="%{model.moduleDesc}" cssClass="" required="false" />
	
