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
	<title><%=PerPermitOld.TABLE_ALIAS%>信息</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/PerPermitOld/list.do" method="get" theme="simple">
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/PerPermitOld/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<s:hidden name="permitId" id="permitId" value="%{model.permitId}"/>

	<table class="formTable">
		<tr>	
			<td class="tdLabel"><%=PerPermitOld.ALIAS_MODULE_ID%></td>	
			<td><s:property value="%{model.moduleId}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerPermitOld.ALIAS_ACTION_ID%></td>	
			<td><s:property value="%{model.actionId}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerPermitOld.ALIAS_PERMIT_VALUE%></td>	
			<td><s:property value="%{model.permitValue}" /></td>
		</tr>
	</table>
</s:form>

</body>

</html>