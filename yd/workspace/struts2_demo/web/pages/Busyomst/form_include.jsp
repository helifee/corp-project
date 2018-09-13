<%@page import="com.ysys.www.model.*" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/commons/taglibs.jsp" %>

	<s:hidden id="busyoid" name="busyoid" />

<!-- ONGL access static field: @package.class@field or @vs@field -->
	
	<s:textfield label="%{@vs@ALIAS_BUSYOIDNAME}" key="busyoidname" value="%{model.busyoidname}" cssClass="required " required="true" />
	
