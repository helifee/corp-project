<%@page import="com.ysys.www.model.*" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/commons/taglibs.jsp" %>


<!-- ONGL access static field: @package.class@field or @vs@field -->
	
	<s:textfield label="%{@vs@ALIAS_USERID}" key="userid" value="%{model.userid}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_TASKFLAG}" key="taskflag" value="%{model.taskflag}" cssClass="required validate-integer max-value-2147483647" required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_TASKID}" key="taskid" value="%{model.taskid}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_CONTENT}" key="content" value="%{model.content}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_LINK}" key="link" value="%{model.link}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_READFLAG}" key="readflag" value="%{model.readflag}" cssClass="required validate-integer max-value-2147483647" required="true" />
	
	
	<tr>	
		<td class="tdLabel">
			<%=TabTask.ALIAS_CREATETIME%>:
		</td>	
		<td>
		<input value="${model.createtimeString}" onclick="WdatePicker({dateFmt:'<%=TabTask.FORMAT_CREATETIME%>'})" id="createtimeString" name="createtimeString"  maxlength="0" class="" />
		</td>
	</tr>
	
	
	<tr>	
		<td class="tdLabel">
			<%=TabTask.ALIAS_UPDATETIME%>:
		</td>	
		<td>
		<input value="${model.updatetimeString}" onclick="WdatePicker({dateFmt:'<%=TabTask.FORMAT_UPDATETIME%>'})" id="updatetimeString" name="updatetimeString"  maxlength="0" class="" />
		</td>
	</tr>
	
