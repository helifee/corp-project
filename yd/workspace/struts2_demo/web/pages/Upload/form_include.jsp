<%@page import="com.ysys.www.model.*" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/commons/taglibs.jsp" %>

	<s:hidden id="id" name="id" />

<!-- ONGL access static field: @package.class@field or @vs@field -->
	
	<s:textfield label="%{@vs@ALIAS_FILENAME}" key="filename" value="%{model.filename}" cssClass="required " required="true" />
	
	
	<tr>	
		<td class="tdLabel">
			<span class="required">*</span><%=Upload.ALIAS_UPFILEDATE%>:
		</td>	
		<td>
		<input value="${model.upfiledateString}" onclick="WdatePicker({dateFmt:'<%=Upload.FORMAT_UPFILEDATE%>'})" id="upfiledateString" name="upfiledateString"  maxlength="0" class="required " />
		</td>
	</tr>
	
	
	<s:textfield label="%{@vs@ALIAS_UPFILEDIR}" key="upfiledir" value="%{model.upfiledir}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_UPFILEUSER}" key="upfileuser" value="%{model.upfileuser}" cssClass="required " required="true" />
	
