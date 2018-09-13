<%@page import="com.ysys.www.model.*" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/commons/taglibs.jsp" %>
<%
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/";
%>
<html>

<head>
	<%@ include file="/commons/meta.jsp" %>
	<base href="<%=basePath%>">
	<title><%=TabTask.TABLE_ALIAS%>信息</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/TabTask/list.do" method="get" theme="simple">
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/TabTask/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<s:hidden name="userid" id="userid" value="%{model.userid}"/>
	<s:hidden name="taskflag" id="taskflag" value="%{model.taskflag}"/>
	<s:hidden name="taskid" id="taskid" value="%{model.taskid}"/>

	<table class="formTable">
		<tr>	
			<td class="tdLabel"><%=TabTask.ALIAS_USERID%></td>	
			<td><s:property value="%{model.userid}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabTask.ALIAS_TASKFLAG%></td>	
			<td><s:property value="%{model.taskflag}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabTask.ALIAS_TASKID%></td>	
			<td><s:property value="%{model.taskid}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabTask.ALIAS_CONTENT%></td>	
			<td><s:property value="%{model.content}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabTask.ALIAS_LINK%></td>	
			<td><s:property value="%{model.link}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabTask.ALIAS_READFLAG%></td>	
			<td><s:property value="%{model.readflag}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabTask.ALIAS_CREATETIME%></td>	
			<td><s:property value="%{model.createtimeString}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabTask.ALIAS_UPDATETIME%></td>	
			<td><s:property value="%{model.updatetimeString}" /></td>
		</tr>
	</table>
</s:form>

</body>

</html>