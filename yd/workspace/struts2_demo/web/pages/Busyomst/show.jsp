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
	<title><%=Busyomst.TABLE_ALIAS%>信息</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/Busyomst/list.do" method="get" theme="simple">
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/Busyomst/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<s:hidden name="busyoid" id="busyoid" value="%{model.busyoid}"/>

	<table class="formTable">
		<tr>	
			<td class="tdLabel"><%=Busyomst.ALIAS_BUSYOIDNAME%></td>	
			<td><s:property value="%{model.busyoidname}" /></td>
		</tr>
	</table>
</s:form>

</body>

</html>