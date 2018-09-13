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
	<title><%=Tacl.TABLE_ALIAS%>信息</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/Tacl/list.do" method="get" theme="simple">
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/Tacl/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<s:hidden name="id" id="id" value="%{model.id}"/>

	<table class="formTable">
		<tr>	
			<td class="tdLabel"><%=Tacl.ALIAS_PRINCIPAL_TYPE%></td>	
			<td><s:property value="%{model.principalType}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tacl.ALIAS_PRINCIPAL_SN%></td>	
			<td><s:property value="%{model.principalSn}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tacl.ALIAS_RESOURCE_SN%></td>	
			<td><s:property value="%{model.resourceSn}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tacl.ALIAS_ACL_STATE%></td>	
			<td><s:property value="%{model.aclState}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tacl.ALIAS_EXTENDS_STATE%></td>	
			<td><s:property value="%{model.extendsState}" /></td>
		</tr>
	</table>
</s:form>

</body>

</html>