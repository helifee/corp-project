<%@page import="com.ysys.www.model.*" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/commons/taglibs.jsp" %>

	<s:hidden id="id" name="id" />

<!-- ONGL access static field: @package.class@field or @vs@field -->
	
	<s:textfield label="%{@vs@ALIAS_PRINCIPAL_TYPE}" key="principalType" value="%{model.principalType}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_PRINCIPAL_SN}" key="principalSn" value="%{model.principalSn}" cssClass="required validate-integer max-value-2147483647" required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_RESOURCE_SN}" key="resourceSn" value="%{model.resourceSn}" cssClass="required validate-integer max-value-2147483647" required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_ACL_STATE}" key="aclState" value="%{model.aclState}" cssClass="required validate-integer max-value-2147483647" required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_EXTENDS_STATE}" key="extendsState" value="%{model.extendsState}" cssClass="required validate-integer max-value-2147483647" required="true" />
	
