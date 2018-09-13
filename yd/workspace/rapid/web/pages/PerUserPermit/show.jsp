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
	<title><%=PerUserPermit.TABLE_ALIAS%>信息</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/PerUserPermit/list.do" method="get" theme="simple">
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/PerUserPermit/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<s:hidden name="userId" id="userId" value="%{model.userId}"/>

	<table class="formTable">
		<tr>	
			<td class="tdLabel"><%=PerUserPermit.ALIAS_ROLE_ID%></td>	
			<td><s:property value="%{model.roleId}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerUserPermit.ALIAS_POS_ID%></td>	
			<td><s:property value="%{model.posId}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerUserPermit.ALIAS_PRO_ID%></td>	
			<td><s:property value="%{model.proId}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerUserPermit.ALIAS_PERMIT_ID%></td>	
			<td><s:property value="%{model.permitId}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerUserPermit.ALIAS_PERMIT_REFER%></td>	
			<td><s:property value="%{model.permitRefer}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerUserPermit.ALIAS_OPERATOR%></td>	
			<td><s:property value="%{model.operator}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerUserPermit.ALIAS_UPDATETIME%></td>	
			<td><s:property value="%{model.updatetimeString}" /></td>
		</tr>
	</table>
</s:form>

</body>

</html>