<%@page import="com.ysys.www.model.*" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/commons/taglibs.jsp" %>


<!-- ONGL access static field: @package.class@field or @vs@field -->
	
	<s:textfield label="%{@vs@ALIAS_JNID}" key="jnid" value="%{model.jnid}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_HMID}" key="hmid" value="%{model.hmid}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_XMID}" key="xmid" value="%{model.xmid}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_XMSX}" key="xmsx" value="%{model.xmsx}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_XMMC}" key="xmmc" value="%{model.xmmc}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_SCQF}" key="scqf" value="%{model.scqf}" cssClass="" required="false" />
	
	
	<tr>	
		<td class="tdLabel">
			<%=TabMcyl.ALIAS_UPDATETIME%>:
		</td>	
		<td>
		<input value="${model.updatetimeString}" onclick="WdatePicker({dateFmt:'<%=TabMcyl.FORMAT_UPDATETIME%>'})" id="updatetimeString" name="updatetimeString"  maxlength="0" class="" />
		</td>
	</tr>
	
