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
	<title><%=PerPostionPermit.TABLE_ALIAS%>信息</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/PerPostionPermit/list.do" method="get" theme="simple">
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/PerPostionPermit/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<s:hidden name="posId" id="posId" value="%{model.posId}"/>

	<table class="formTable">
		<tr>	
			<td class="tdLabel"><%=PerPostionPermit.ALIAS_PERMIT_ID%></td>	
			<td><s:property value="%{model.permitId}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerPostionPermit.ALIAS_OPERATOR%></td>	
			<td><s:property value="%{model.operator}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerPostionPermit.ALIAS_UPDATETIME%></td>	
			<td><s:property value="%{model.updatetimeString}" /></td>
		</tr>
	</table>
</s:form>

</body>

</html>