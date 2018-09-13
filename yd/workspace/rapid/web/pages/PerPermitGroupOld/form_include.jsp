<%@page import="com.ysys.www.model.*" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/commons/taglibs.jsp" %>

	<s:hidden id="groupId" name="groupId" />

<!-- ONGL access static field: @package.class@field or @vs@field -->
	
	<s:textfield label="%{@vs@ALIAS_GROUP_NAME}" key="groupName" value="%{model.groupName}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_PERMIT_ID}" key="permitId" value="%{model.permitId}" cssClass="required " required="true" />
	
