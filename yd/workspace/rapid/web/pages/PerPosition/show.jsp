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
	<title><%=PerPosition.TABLE_ALIAS%>信息</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/PerPosition/list.do" method="get" theme="simple">
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/PerPosition/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<s:hidden name="posId" id="posId" value="%{model.posId}"/>

	<table class="formTable">
		<tr>	
			<td class="tdLabel"><%=PerPosition.ALIAS_POS_NAME%></td>	
			<td><s:property value="%{model.posName}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerPosition.ALIAS_POS_DESC%></td>	
			<td><s:property value="%{model.posDesc}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerPosition.ALIAS_POS_LEVEL%></td>	
			<td><s:property value="%{model.posLevel}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerPosition.ALIAS_POS_MODE%></td>	
			<td><s:property value="%{model.posMode}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerPosition.ALIAS_PARENT_POS%></td>	
			<td><s:property value="%{model.parentPos}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerPosition.ALIAS_UPDATETIME%></td>	
			<td><s:property value="%{model.updatetimeString}" /></td>
		</tr>
	</table>
</s:form>

</body>

</html>