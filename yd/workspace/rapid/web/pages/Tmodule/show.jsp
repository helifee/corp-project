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
	<title><%=Tmodule.TABLE_ALIAS%>信息</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/Tmodule/list.do" method="get" theme="simple">
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/Tmodule/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<s:hidden name="id" id="id" value="%{model.id}"/>

	<table class="formTable">
		<tr>	
			<td class="tdLabel"><%=Tmodule.ALIAS_NAME%></td>	
			<td><s:property value="%{model.name}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tmodule.ALIAS_SN%></td>	
			<td><s:property value="%{model.sn}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tmodule.ALIAS_URL%></td>	
			<td><s:property value="%{model.url}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tmodule.ALIAS_ORDER_NUM%></td>	
			<td><s:property value="%{model.orderNum}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tmodule.ALIAS_PARENT_ID%></td>	
			<td><s:property value="%{model.parentId}" /></td>
		</tr>
	</table>
</s:form>

</body>

</html>