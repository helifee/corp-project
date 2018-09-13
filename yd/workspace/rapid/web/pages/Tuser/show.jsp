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
	<title><%=Tuser.TABLE_ALIAS%>信息</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/Tuser/list.do" method="get" theme="simple">
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/Tuser/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<s:hidden name="id" id="id" value="%{model.id}"/>

	<table class="formTable">
		<tr>	
			<td class="tdLabel"><%=Tuser.ALIAS_USERNAME%></td>	
			<td><s:property value="%{model.username}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tuser.ALIAS_PASSWORD%></td>	
			<td><s:property value="%{model.password}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tuser.ALIAS_CREATE_TIME%></td>	
			<td><s:property value="%{model.createTimeString}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tuser.ALIAS_EXPIRE_TIME%></td>	
			<td><s:property value="%{model.expireTimeString}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tuser.ALIAS_PERSON%></td>	
			<td><s:property value="%{model.person}" /></td>
		</tr>
	</table>
</s:form>

</body>

</html>