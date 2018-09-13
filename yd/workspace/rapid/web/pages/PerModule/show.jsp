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
	<title><%=PerModule.TABLE_ALIAS%>信息</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/PerModule/list.do" method="get" theme="simple">
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/PerModule/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<s:hidden name="moduleId" id="moduleId" value="%{model.moduleId}"/>

	<table class="formTable">
		<tr>	
			<td class="tdLabel"><%=PerModule.ALIAS_MODULE_NAME%></td>	
			<td><s:property value="%{model.moduleName}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerModule.ALIAS_MODULE_VALUE%></td>	
			<td><s:property value="%{model.moduleValue}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerModule.ALIAS_LINK_URL%></td>	
			<td><s:property value="%{model.linkUrl}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerModule.ALIAS_PARENT_MODULE%></td>	
			<td><s:property value="%{model.parentModule}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerModule.ALIAS_MODULE_DESC%></td>	
			<td><s:property value="%{model.moduleDesc}" /></td>
		</tr>
	</table>
</s:form>

</body>

</html>