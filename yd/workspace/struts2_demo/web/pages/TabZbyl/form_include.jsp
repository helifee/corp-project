<%@page import="com.ysys.www.model.*" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/commons/taglibs.jsp" %>

	<s:hidden id="zbid" name="zbid" />

<!-- ONGL access static field: @package.class@field or @vs@field -->
	
	<s:textfield label="%{@vs@ALIAS_JLZID}" key="jlzid" value="%{model.jlzid}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_ZBQF}" key="zbqf" value="%{model.zbqf}" cssClass="required validate-integer max-value-2147483647" required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_ZZWMC}" key="zzwmc" value="%{model.zzwmc}" cssClass="required " required="true" />
	
	
	<tr>	
		<td class="tdLabel">
			<%=TabZbyl.ALIAS_UPDATETIME%>:
		</td>	
		<td>
		<input value="${model.updatetimeString}" onclick="WdatePicker({dateFmt:'<%=TabZbyl.FORMAT_UPDATETIME%>'})" id="updatetimeString" name="updatetimeString"  maxlength="0" class="" />
		</td>
	</tr>
	
