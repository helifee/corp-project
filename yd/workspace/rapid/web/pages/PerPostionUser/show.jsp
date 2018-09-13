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
	<title><%=PerPostionUser.TABLE_ALIAS%>信息</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/PerPostionUser/list.do" method="get" theme="simple">
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/PerPostionUser/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<s:hidden name="positionId" id="positionId" value="%{model.positionId}"/>
	<s:hidden name="empId" id="empId" value="%{model.empId}"/>

	<table class="formTable">
		<tr>	
			<td class="tdLabel"><%=PerPostionUser.ALIAS_POSITION_ID%></td>	
			<td><s:property value="%{model.positionId}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerPostionUser.ALIAS_EMP_ID%></td>	
			<td><s:property value="%{model.empId}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerPostionUser.ALIAS_UPDATETIME%></td>	
			<td><s:property value="%{model.updatetimeString}" /></td>
		</tr>
	</table>
</s:form>

</body>

</html>