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
	<title><%=PerPermit.TABLE_ALIAS%>信息</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/PerPermit/list.do" method="get" theme="simple">
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/PerPermit/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<s:hidden name="permitId" id="permitId" value="%{model.permitId}"/>

	<table class="formTable">
		<tr>	
			<td class="tdLabel"><%=PerPermit.ALIAS_NAMESPACE%></td>	
			<td><s:property value="%{model.namespace}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerPermit.ALIAS_ACTION_NAME%></td>	
			<td><s:property value="%{model.actionName}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerPermit.ALIAS_IS_MODULE%></td>	
			<td><s:property value="%{model.isModule}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerPermit.ALIAS_MODULE_NAME%></td>	
			<td><s:property value="%{model.moduleName}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerPermit.ALIAS_PARENT_MODULE%></td>	
			<td><s:property value="%{model.parentModule}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerPermit.ALIAS_DISP_SEQ%></td>	
			<td><s:property value="%{model.dispSeq}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerPermit.ALIAS_IS_MENU%></td>	
			<td><s:property value="%{model.isMenu}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerPermit.ALIAS_DESCRIPTION%></td>	
			<td><s:property value="%{model.description}" /></td>
		</tr>
	</table>
</s:form>

</body>

</html>