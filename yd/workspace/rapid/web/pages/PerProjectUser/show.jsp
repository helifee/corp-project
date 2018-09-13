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
	<title><%=PerProjectUser.TABLE_ALIAS%>信息</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/PerProjectUser/list.do" method="get" theme="simple">
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/PerProjectUser/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<s:hidden name="proId" id="proId" value="%{model.proId}"/>
	<s:hidden name="userId" id="userId" value="%{model.userId}"/>
	<s:hidden name="staDate" id="staDate" value="%{model.staDate}"/>

	<table class="formTable">
		<tr>	
			<td class="tdLabel"><%=PerProjectUser.ALIAS_PRO_ID%></td>	
			<td><s:property value="%{model.proId}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerProjectUser.ALIAS_USER_ID%></td>	
			<td><s:property value="%{model.userId}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerProjectUser.ALIAS_JOB_FLAG%></td>	
			<td><s:property value="%{model.jobFlag}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerProjectUser.ALIAS_STA_DATE%></td>	
			<td><s:property value="%{model.staDateString}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerProjectUser.ALIAS_END_DATE%></td>	
			<td><s:property value="%{model.endDateString}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerProjectUser.ALIAS_OPERATOR%></td>	
			<td><s:property value="%{model.operator}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerProjectUser.ALIAS_UPDATETIME%></td>	
			<td><s:property value="%{model.updatetimeString}" /></td>
		</tr>
	</table>
</s:form>

</body>

</html>