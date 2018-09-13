<%@page import="com.ysys.www.model.*" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/commons/taglibs.jsp" %>

	<s:hidden id="permitId" name="permitId" />

<!-- ONGL access static field: @package.class@field or @vs@field -->
	
	<s:textfield label="%{@vs@ALIAS_NAMESPACE}" key="namespace" value="%{model.namespace}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_ACTION_NAME}" key="actionName" value="%{model.actionName}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_IS_MODULE}" key="isModule" value="%{model.isModule}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_MODULE_NAME}" key="moduleName" value="%{model.moduleName}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_PARENT_MODULE}" key="parentModule" value="%{model.parentModule}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_DISP_SEQ}" key="dispSeq" value="%{model.dispSeq}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_IS_MENU}" key="isMenu" value="%{model.isMenu}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_DESCRIPTION}" key="description" value="%{model.description}" cssClass="" required="false" />
	
