<%@page import="com.ysys.www.model.*" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/commons/taglibs.jsp" %>

	<s:hidden id="id" name="id" />

<!-- ONGL access static field: @package.class@field or @vs@field -->
	
	<s:textfield label="%{@vs@ALIAS_NAME}" key="name" value="%{model.name}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_SN}" key="sn" value="%{model.sn}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_URL}" key="url" value="%{model.url}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_ORDER_NUM}" key="orderNum" value="%{model.orderNum}" cssClass="validate-integer max-value-2147483647" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_PARENT_ID}" key="parentId" value="%{model.parentId}" cssClass="validate-integer max-value-2147483647" required="false" />
	
