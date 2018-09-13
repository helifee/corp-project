<%@page import="com.ysys.www.model.*" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/commons/taglibs.jsp" %>


<!-- ONGL access static field: @package.class@field or @vs@field -->
	
	<s:textfield label="%{@vs@ALIAS_ZQHYID}" key="zqhyid" value="%{model.zqhyid}" cssClass="required validate-integer max-value-2147483647" required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_ZQNHYTS}" key="zqnhyts" value="%{model.zqnhyts}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_ZQLX}" key="zqlx" value="%{model.zqlx}" cssClass="required validate-integer max-value-2147483647" required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_HYBZ}" key="hybz" value="%{model.hybz}" cssClass="validate-integer max-value-2147483647" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_ZQHYZT}" key="zqhyzt" value="%{model.zqhyzt}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_BMBZ}" key="bmbz" value="%{model.bmbz}" cssClass="validate-integer max-value-2147483647" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_HYSID}" key="hysid" value="%{model.hysid}" cssClass="required validate-integer max-value-2147483647" required="true" />
	
	
	<tr>	
		<td class="tdLabel">
			<span class="required">*</span><%=TabZqhyyl.ALIAS_HYKSRQ%>:
		</td>	
		<td>
		<input value="${model.hyksrqString}" onclick="WdatePicker({dateFmt:'<%=TabZqhyyl.FORMAT_HYKSRQ%>'})" id="hyksrqString" name="hyksrqString"  maxlength="0" class="required " />
		</td>
	</tr>
	
	
	<tr>	
		<td class="tdLabel">
			<span class="required">*</span><%=TabZqhyyl.ALIAS_HYJSRQ%>:
		</td>	
		<td>
		<input value="${model.hyjsrqString}" onclick="WdatePicker({dateFmt:'<%=TabZqhyyl.FORMAT_HYJSRQ%>'})" id="hyjsrqString" name="hyjsrqString"  maxlength="0" class="required " />
		</td>
	</tr>
	
	
	<tr>	
		<td class="tdLabel">
			<span class="required">*</span><%=TabZqhyyl.ALIAS_HYKSSJ%>:
		</td>	
		<td>
		<input value="${model.hykssjString}" onclick="WdatePicker({dateFmt:'<%=TabZqhyyl.FORMAT_HYKSSJ%>'})" id="hykssjString" name="hykssjString"  maxlength="0" class="required " />
		</td>
	</tr>
	
	
	<tr>	
		<td class="tdLabel">
			<span class="required">*</span><%=TabZqhyyl.ALIAS_HYJSSJ%>:
		</td>	
		<td>
		<input value="${model.hyjssjString}" onclick="WdatePicker({dateFmt:'<%=TabZqhyyl.FORMAT_HYJSSJ%>'})" id="hyjssjString" name="hyjssjString"  maxlength="0" class="required " />
		</td>
	</tr>
	
	
	<s:textfield label="%{@vs@ALIAS_YYRID}" key="yyrid" value="%{model.yyrid}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_XMZID}" key="xmzid" value="%{model.xmzid}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_CJZRS}" key="cjzrs" value="%{model.cjzrs}" cssClass="required validate-integer max-value-2147483647" required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_GGBZ}" key="ggbz" value="%{model.ggbz}" cssClass="validate-integer max-value-2147483647" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_DELFLG}" key="delflg" value="%{model.delflg}" cssClass="validate-integer max-value-2147483647" required="false" />
	
	
	<tr>	
		<td class="tdLabel">
			<%=TabZqhyyl.ALIAS_UPDATETIME%>:
		</td>	
		<td>
		<input value="${model.updatetimeString}" onclick="WdatePicker({dateFmt:'<%=TabZqhyyl.FORMAT_UPDATETIME%>'})" id="updatetimeString" name="updatetimeString"  maxlength="0" class="" />
		</td>
	</tr>
	
