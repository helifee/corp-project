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
	<title><%=Tur.TABLE_ALIAS%>信息</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/Tur/list.do" method="get" theme="simple">
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/Tur/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<s:hidden name="id" id="id" value="%{model.id}"/>

	<table class="formTable">
		<tr>	
			<td class="tdLabel"><%=Tur.ALIAS_ROLE%></td>	
			<td><s:property value="%{model.role}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tur.ALIAS_USER%></td>	
			<td><s:property value="%{model.user}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tur.ALIAS_ORDER_NUM%></td>	
			<td><s:property value="%{model.orderNum}" /></td>
		</tr>
	</table>
</s:form>

</body>

</html>