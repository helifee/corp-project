<%@page import="com.ysys.www.model.*" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/commons/taglibs.jsp" %>

	<s:hidden id="userid" name="userid" />

<!-- ONGL access static field: @package.class@field or @vs@field -->
	
	<s:textfield label="%{@vs@ALIAS_USERNAME}" key="username" value="%{model.username}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_BUSYOID}" key="busyoid" value="%{model.busyoid}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_USERKINDID}" key="userkindid" value="%{model.userkindid}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_PASSWORD}" key="password" value="%{model.password}" cssClass="required " required="true" />
	
