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
	<title><%=Tperson.TABLE_ALIAS%>信息</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/Tperson/list.do" method="get" theme="simple">
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/Tperson/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<s:hidden name="id" id="id" value="%{model.id}"/>

	<table class="formTable">
		<tr>	
			<td class="tdLabel"><%=Tperson.ALIAS_NAME%></td>	
			<td><s:property value="%{model.name}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tperson.ALIAS_SEX%></td>	
			<td><s:property value="%{model.sex}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tperson.ALIAS_ADDRESS%></td>	
			<td><s:property value="%{model.address}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tperson.ALIAS_DUTY%></td>	
			<td><s:property value="%{model.duty}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tperson.ALIAS_PHONE%></td>	
			<td><s:property value="%{model.phone}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tperson.ALIAS_DESCRIPTION%></td>	
			<td><s:property value="%{model.description}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tperson.ALIAS_ORG%></td>	
			<td><s:property value="%{model.org}" /></td>
		</tr>
	</table>
</s:form>

</body>

</html>