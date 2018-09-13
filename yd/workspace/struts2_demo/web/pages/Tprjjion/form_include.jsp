<%@page import="com.ysys.www.model.*" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/commons/taglibs.jsp" %>


<!-- ONGL access static field: @package.class@field or @vs@field -->
	
	<s:textfield label="%{@vs@ALIAS_PRJ_ID}" key="prjId" value="%{model.prjId}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_PRJ_EMPID}" key="prjEmpid" value="%{model.prjEmpid}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_PRJ_FLAG}" key="prjFlag" value="%{model.prjFlag}" cssClass="required " required="true" />
	
	
	<tr>	
		<td class="tdLabel">
			<span class="required">*</span><%=Tprjjion.ALIAS_PRJ_BEGDATE%>:
		</td>	
		<td>
		<input value="${model.prjBegdateString}" onclick="WdatePicker({dateFmt:'<%=Tprjjion.FORMAT_PRJ_BEGDATE%>'})" id="prjBegdateString" name="prjBegdateString"  maxlength="0" class="required " />
		</td>
	</tr>
	
	
	<tr>	
		<td class="tdLabel">
			<span class="required">*</span><%=Tprjjion.ALIAS_PRJ_ENDDATE%>:
		</td>	
		<td>
		<input value="${model.prjEnddateString}" onclick="WdatePicker({dateFmt:'<%=Tprjjion.FORMAT_PRJ_ENDDATE%>'})" id="prjEnddateString" name="prjEnddateString"  maxlength="0" class="required " />
		</td>
	</tr>
	
