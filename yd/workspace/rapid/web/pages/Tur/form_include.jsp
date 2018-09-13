<%@page import="com.ysys.www.model.*" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/commons/taglibs.jsp" %>

	<s:hidden id="id" name="id" />

<!-- ONGL access static field: @package.class@field or @vs@field -->
	
	<s:textfield label="%{@vs@ALIAS_ROLE}" key="role" value="%{model.role}" cssClass="validate-integer max-value-2147483647" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_USER}" key="user" value="%{model.user}" cssClass="validate-integer max-value-2147483647" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_ORDER_NUM}" key="orderNum" value="%{model.orderNum}" cssClass="validate-integer max-value-2147483647" required="false" />
	
