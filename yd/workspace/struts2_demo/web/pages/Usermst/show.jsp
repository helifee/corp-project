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
	<title><%=Usermst.TABLE_ALIAS%>信息</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/Usermst/list.do" method="get" theme="simple">
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/Usermst/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<s:hidden name="userid" id="userid" value="%{model.userid}"/>

	<table class="formTable">
		<tr>	
			<td class="tdLabel"><%=Usermst.ALIAS_USERNAME%></td>	
			<td><s:property value="%{model.username}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Usermst.ALIAS_BUSYOID%></td>	
			<td><s:property value="%{model.busyoid}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Usermst.ALIAS_USERKINDID%></td>	
			<td><s:property value="%{model.userkindid}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Usermst.ALIAS_PASSWORD%></td>	
			<td><s:property value="%{model.password}" /></td>
		</tr>
	</table>
</s:form>

</body>

</html>