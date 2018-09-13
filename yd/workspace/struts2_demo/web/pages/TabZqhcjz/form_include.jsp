<%@page import="com.ysys.www.model.*" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/commons/taglibs.jsp" %>


<!-- ONGL access static field: @package.class@field or @vs@field -->
	
	<s:textfield label="%{@vs@ALIAS_ZQHYID}" key="zqhyid" value="%{model.zqhyid}" cssClass="required validate-integer max-value-2147483647" required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_ZQNHYTS}" key="zqnhyts" value="%{model.zqnhyts}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_CJZID}" key="cjzid" value="%{model.cjzid}" cssClass="required " required="true" />
	
	
	<tr>	
		<td class="tdLabel">
			<%=TabZqhcjz.ALIAS_UPDATETIME%>:
		</td>	
		<td>
		<input value="${model.updatetimeString}" onclick="WdatePicker({dateFmt:'<%=TabZqhcjz.FORMAT_UPDATETIME%>'})" id="updatetimeString" name="updatetimeString"  maxlength="0" class="" />
		</td>
	</tr>
	
