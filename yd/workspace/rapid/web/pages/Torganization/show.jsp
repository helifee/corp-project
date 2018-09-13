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
	<title><%=Torganization.TABLE_ALIAS%>信息</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/Torganization/list.do" method="get" theme="simple">
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/Torganization/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<s:hidden name="id" id="id" value="%{model.id}"/>

	<table class="formTable">
		<tr>	
			<td class="tdLabel"><%=Torganization.ALIAS_NAME%></td>	
			<td><s:property value="%{model.name}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Torganization.ALIAS_SN%></td>	
			<td><s:property value="%{model.sn}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Torganization.ALIAS_DESCRIPTION%></td>	
			<td><s:property value="%{model.description}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Torganization.ALIAS_PID%></td>	
			<td><s:property value="%{model.pid}" /></td>
		</tr>
	</table>
</s:form>

</body>

</html>