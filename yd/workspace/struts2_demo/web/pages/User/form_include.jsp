<%@page import="com.ysys.www.model.*" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/commons/taglibs.jsp" %>

	<s:hidden id="userId" name="userId" />

<!-- ONGL access static field: @package.class@field or @vs@field -->
	
	<s:textfield label="%{@vs@ALIAS_USER_NAME}" key="userName" value="%{model.userName}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_PASS_WORD}" key="passWord" value="%{model.passWord}" cssClass="required " required="true" />
	
