<%@page import="com.ysys.www.model.*" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/commons/taglibs.jsp" %>

	<s:hidden id="cityid" name="cityid" />

<!-- ONGL access static field: @package.class@field or @vs@field -->
	
	<s:textfield label="%{@vs@ALIAS_CITYNAME}" key="cityname" value="%{model.cityname}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_FLAG}" key="flag" value="%{model.flag}" cssClass="required validate-integer max-value-2147483647" required="true" />
	
	
	<tr>	
		<td class="tdLabel">
			<%=Mcity.ALIAS_UPDATETIME%>:
		</td>	
		<td>
		<input value="${model.updatetimeString}" onclick="WdatePicker({dateFmt:'<%=Mcity.FORMAT_UPDATETIME%>'})" id="updatetimeString" name="updatetimeString"  maxlength="0" class="" />
		</td>
	</tr>
	
