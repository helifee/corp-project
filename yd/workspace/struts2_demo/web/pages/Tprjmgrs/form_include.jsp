<%@page import="com.ysys.www.model.*" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/commons/taglibs.jsp" %>

	<s:hidden id="prjId" name="prjId" />

<!-- ONGL access static field: @package.class@field or @vs@field -->
	
	<s:textfield label="%{@vs@ALIAS_PRJ_NAME}" key="prjName" value="%{model.prjName}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_PRJ_DESCRIBE}" key="prjDescribe" value="%{model.prjDescribe}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_PRJ_CUSNAME}" key="prjCusname" value="%{model.prjCusname}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_PRJ_CUSCONTACT}" key="prjCuscontact" value="%{model.prjCuscontact}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_PRJ_ENVIR}" key="prjEnvir" value="%{model.prjEnvir}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_PRJ_DPTID}" key="prjDptid" value="%{model.prjDptid}" cssClass="required " required="true" />
	
	
	<tr>	
		<td class="tdLabel">
			<span class="required">*</span><%=Tprjmgrs.ALIAS_PRJ_PBDATE%>:
		</td>	
		<td>
		<input value="${model.prjPbdateString}" onclick="WdatePicker({dateFmt:'<%=Tprjmgrs.FORMAT_PRJ_PBDATE%>'})" id="prjPbdateString" name="prjPbdateString"  maxlength="0" class="required " />
		</td>
	</tr>
	
	
	<tr>	
		<td class="tdLabel">
			<span class="required">*</span><%=Tprjmgrs.ALIAS_PRJ_PEDATE%>:
		</td>	
		<td>
		<input value="${model.prjPedateString}" onclick="WdatePicker({dateFmt:'<%=Tprjmgrs.FORMAT_PRJ_PEDATE%>'})" id="prjPedateString" name="prjPedateString"  maxlength="0" class="required " />
		</td>
	</tr>
	
	
	<tr>	
		<td class="tdLabel">
			<%=Tprjmgrs.ALIAS_PRJ_TBDATE%>:
		</td>	
		<td>
		<input value="${model.prjTbdateString}" onclick="WdatePicker({dateFmt:'<%=Tprjmgrs.FORMAT_PRJ_TBDATE%>'})" id="prjTbdateString" name="prjTbdateString"  maxlength="0" class="" />
		</td>
	</tr>
	
	
	<tr>	
		<td class="tdLabel">
			<%=Tprjmgrs.ALIAS_PRJ_TEDATE%>:
		</td>	
		<td>
		<input value="${model.prjTedateString}" onclick="WdatePicker({dateFmt:'<%=Tprjmgrs.FORMAT_PRJ_TEDATE%>'})" id="prjTedateString" name="prjTedateString"  maxlength="0" class="" />
		</td>
	</tr>
	
	
	<tr>	
		<td class="tdLabel">
			<span class="required">*</span><%=Tprjmgrs.ALIAS_PRJ_DATE%>:
		</td>	
		<td>
		<input value="${model.prjDateString}" onclick="WdatePicker({dateFmt:'<%=Tprjmgrs.FORMAT_PRJ_DATE%>'})" id="prjDateString" name="prjDateString"  maxlength="0" class="required " />
		</td>
	</tr>
	
	
	<s:textfield label="%{@vs@ALIAS_PRJ_REF}" key="prjRef" value="%{model.prjRef}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_PRJ_CNAME}" key="prjCname" value="%{model.prjCname}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_PRJ_ENAME}" key="prjEname" value="%{model.prjEname}" cssClass="" required="false" />
	
