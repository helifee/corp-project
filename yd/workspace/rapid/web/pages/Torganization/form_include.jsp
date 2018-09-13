<%@page import="com.ysys.www.model.*" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/commons/taglibs.jsp" %>

	<s:hidden id="id" name="id" />

<!-- ONGL access static field: @package.class@field or @vs@field -->
	
	<s:textfield label="%{@vs@ALIAS_NAME}" key="name" value="%{model.name}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_SN}" key="sn" value="%{model.sn}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_DESCRIPTION}" key="description" value="%{model.description}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_PID}" key="pid" value="%{model.pid}" cssClass="validate-integer max-value-2147483647" required="false" />
	
