<%@page import="com.ysys.www.model.*" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/commons/taglibs.jsp" %>


<!-- ONGL access static field: @package.class@field or @vs@field -->
	
	<s:textfield label="%{@vs@ALIAS_USERID}" key="userid" value="%{model.userid}" cssClass="required validate-integer max-value-2147483647" required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_PROJECTID}" key="projectid" value="%{model.projectid}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_INTIMESTP}" key="intimestp" value="%{model.intimestp}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_UPTIMESTP}" key="uptimestp" value="%{model.uptimestp}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_CANCELFLAG}" key="cancelflag" value="%{model.cancelflag}" cssClass="required " required="true" />
	
