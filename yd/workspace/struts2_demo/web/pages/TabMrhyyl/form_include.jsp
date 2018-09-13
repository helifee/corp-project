<%@page import="com.ysys.www.model.*" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/commons/taglibs.jsp" %>


<!-- ONGL access static field: @package.class@field or @vs@field -->
	
	<tr>	
		<td class="tdLabel">
			<span class="required">*</span><%=TabMrhyyl.ALIAS_HYRQ%>:
		</td>	
		<td>
		<input value="${model.hyrqString}" onclick="WdatePicker({dateFmt:'<%=TabMrhyyl.FORMAT_HYRQ%>'})" id="hyrqString" name="hyrqString"  maxlength="0" class="required " />
		</td>
	</tr>
	
	
	<tr>	
		<td class="tdLabel">
			<span class="required">*</span><%=TabMrhyyl.ALIAS_HYKSSJ%>:
		</td>	
		<td>
		<input value="${model.hykssjString}" onclick="WdatePicker({dateFmt:'<%=TabMrhyyl.FORMAT_HYKSSJ%>'})" id="hykssjString" name="hykssjString"  maxlength="0" class="required " />
		</td>
	</tr>
	
	
	<tr>	
		<td class="tdLabel">
			<span class="required">*</span><%=TabMrhyyl.ALIAS_HYJSSJ%>:
		</td>	
		<td>
		<input value="${model.hyjssjString}" onclick="WdatePicker({dateFmt:'<%=TabMrhyyl.FORMAT_HYJSSJ%>'})" id="hyjssjString" name="hyjssjString"  maxlength="0" class="required " />
		</td>
	</tr>
	
	
	<s:textfield label="%{@vs@ALIAS_HYZT}" key="hyzt" value="%{model.hyzt}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_HYSID}" key="hysid" value="%{model.hysid}" cssClass="required validate-integer max-value-2147483647" required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_YYRID}" key="yyrid" value="%{model.yyrid}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_BMBZ}" key="bmbz" value="%{model.bmbz}" cssClass="validate-integer max-value-2147483647" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_CJZRS}" key="cjzrs" value="%{model.cjzrs}" cssClass="required validate-integer max-value-2147483647" required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_ZQHYQF}" key="zqhyqf" value="%{model.zqhyqf}" cssClass="required validate-integer max-value-2147483647" required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_ZQHYID}" key="zqhyid" value="%{model.zqhyid}" cssClass="validate-integer max-value-2147483647" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_HYSBG}" key="hysbg" value="%{model.hysbg}" cssClass="" required="false" />
	
	
	<tr>	
		<td class="tdLabel">
			<%=TabMrhyyl.ALIAS_UPDATETIME%>:
		</td>	
		<td>
		<input value="${model.updatetimeString}" onclick="WdatePicker({dateFmt:'<%=TabMrhyyl.FORMAT_UPDATETIME%>'})" id="updatetimeString" name="updatetimeString"  maxlength="0" class="" />
		</td>
	</tr>
	
