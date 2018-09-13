<%@page import="com.ysys.www.model.*" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/commons/taglibs.jsp" %>

	<s:hidden id="id" name="id" />

<!-- ONGL access static field: @package.class@field or @vs@field -->
	
	<s:textfield label="%{@vs@ALIAS_NAME}" key="name" value="%{model.name}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_SEX}" key="sex" value="%{model.sex}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_ADDRESS}" key="address" value="%{model.address}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_DUTY}" key="duty" value="%{model.duty}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_PHONE}" key="phone" value="%{model.phone}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_DESCRIPTION}" key="description" value="%{model.description}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_ORG}" key="org" value="%{model.org}" cssClass="validate-integer max-value-2147483647" required="false" />
	
