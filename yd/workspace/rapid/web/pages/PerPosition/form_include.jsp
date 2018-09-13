<%@page import="com.ysys.www.model.*" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/commons/taglibs.jsp" %>

	<s:hidden id="posId" name="posId" />

<!-- ONGL access static field: @package.class@field or @vs@field -->
	
	<s:textfield label="%{@vs@ALIAS_POS_NAME}" key="posName" value="%{model.posName}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_POS_DESC}" key="posDesc" value="%{model.posDesc}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_POS_LEVEL}" key="posLevel" value="%{model.posLevel}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_POS_MODE}" key="posMode" value="%{model.posMode}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_PARENT_POS}" key="parentPos" value="%{model.parentPos}" cssClass="" required="false" />
	
	
	<tr>	
		<td class="tdLabel">
			<span class="required">*</span><%=PerPosition.ALIAS_UPDATETIME%>:
		</td>	
		<td>
		<input value="${model.updatetimeString}" onclick="WdatePicker({dateFmt:'<%=PerPosition.FORMAT_UPDATETIME%>'})" id="updatetimeString" name="updatetimeString"  maxlength="0" class="required " />
		</td>
	</tr>
	
