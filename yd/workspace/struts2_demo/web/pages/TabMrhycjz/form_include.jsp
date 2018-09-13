<%@page import="com.ysys.www.model.*" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/commons/taglibs.jsp" %>


<!-- ONGL access static field: @package.class@field or @vs@field -->
	
	<tr>	
		<td class="tdLabel">
			<span class="required">*</span><%=TabMrhycjz.ALIAS_HYRQ%>:
		</td>	
		<td>
		<input value="${model.hyrqString}" onclick="WdatePicker({dateFmt:'<%=TabMrhycjz.FORMAT_HYRQ%>'})" id="hyrqString" name="hyrqString"  maxlength="0" class="required " />
		</td>
	</tr>
	
	
	<tr>	
		<td class="tdLabel">
			<span class="required">*</span><%=TabMrhycjz.ALIAS_HYKSSJ%>:
		</td>	
		<td>
		<input value="${model.hykssjString}" onclick="WdatePicker({dateFmt:'<%=TabMrhycjz.FORMAT_HYKSSJ%>'})" id="hykssjString" name="hykssjString"  maxlength="0" class="required " />
		</td>
	</tr>
	
	
	<s:textfield label="%{@vs@ALIAS_HYSID}" key="hysid" value="%{model.hysid}" cssClass="required validate-integer max-value-2147483647" required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_CJZID}" key="cjzid" value="%{model.cjzid}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_HZQR}" key="hzqr" value="%{model.hzqr}" cssClass="required validate-integer max-value-2147483647" required="true" />
	
	
	<tr>	
		<td class="tdLabel">
			<%=TabMrhycjz.ALIAS_UPDATETIME%>:
		</td>	
		<td>
		<input value="${model.updatetimeString}" onclick="WdatePicker({dateFmt:'<%=TabMrhycjz.FORMAT_UPDATETIME%>'})" id="updatetimeString" name="updatetimeString"  maxlength="0" class="" />
		</td>
	</tr>
	
