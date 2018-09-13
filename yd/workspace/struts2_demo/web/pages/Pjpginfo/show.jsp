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
	<title><%=Pjpginfo.TABLE_ALIAS%>信息</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/Pjpginfo/list.do" method="get" theme="simple">
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/Pjpginfo/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<s:hidden name="userid" id="userid" value="%{model.userid}"/>
	<s:hidden name="projectid" id="projectid" value="%{model.projectid}"/>

	<table class="formTable">
		<tr>	
			<td class="tdLabel"><%=Pjpginfo.ALIAS_USERID%></td>	
			<td><s:property value="%{model.userid}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Pjpginfo.ALIAS_PROJECTID%></td>	
			<td><s:property value="%{model.projectid}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Pjpginfo.ALIAS_INTIMESTP%></td>	
			<td><s:property value="%{model.intimestp}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Pjpginfo.ALIAS_UPTIMESTP%></td>	
			<td><s:property value="%{model.uptimestp}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Pjpginfo.ALIAS_CANCELFLAG%></td>	
			<td><s:property value="%{model.cancelflag}" /></td>
		</tr>
	</table>
</s:form>

</body>

</html>