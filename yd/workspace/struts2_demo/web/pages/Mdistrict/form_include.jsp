<%@page import="com.ysys.www.model.*" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/commons/taglibs.jsp" %>


<!-- ONGL access static field: @package.class@field or @vs@field -->
	
	<s:textfield label="%{@vs@ALIAS_CITYID}" key="cityid" value="%{model.cityid}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_DISTID}" key="distid" value="%{model.distid}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_UDFLAG}" key="udflag" value="%{model.udflag}" cssClass="required validate-integer max-value-2147483647" required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_DISTNAME}" key="distname" value="%{model.distname}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_FLAG}" key="flag" value="%{model.flag}" cssClass="required validate-integer max-value-2147483647" required="true" />
	
	
	<tr>	
		<td class="tdLabel">
			<%=Mdistrict.ALIAS_UPDATETIME%>:
		</td>	
		<td>
		<input value="${model.updatetimeString}" onclick="WdatePicker({dateFmt:'<%=Mdistrict.FORMAT_UPDATETIME%>'})" id="updatetimeString" name="updatetimeString"  maxlength="0" class="" />
		</td>
	</tr>
	
