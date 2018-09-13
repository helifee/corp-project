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
	<title><%=PerAction.TABLE_ALIAS%>信息</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/PerAction/list.do" method="get" theme="simple">
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/PerAction/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<s:hidden name="actionId" id="actionId" value="%{model.actionId}"/>

	<table class="formTable">
		<tr>	
			<td class="tdLabel"><%=PerAction.ALIAS_ACTION_NAME%></td>	
			<td><s:property value="%{model.actionName}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerAction.ALIAS_ACTION_VALUE%></td>	
			<td><s:property value="%{model.actionValue}" /></td>
		</tr>
	</table>
</s:form>

</body>

</html>