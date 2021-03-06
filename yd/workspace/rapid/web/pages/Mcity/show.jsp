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
	<title><%=Mcity.TABLE_ALIAS%>信息</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/Mcity/list.do" method="get" theme="simple">
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/Mcity/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<s:hidden name="cityid" id="cityid" value="%{model.cityid}"/>

	<table class="formTable">
		<tr>	
			<td class="tdLabel"><%=Mcity.ALIAS_CITYNAME%></td>	
			<td><s:property value="%{model.cityname}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Mcity.ALIAS_FLAG%></td>	
			<td><s:property value="%{model.flag}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Mcity.ALIAS_UPDATETIME%></td>	
			<td><s:property value="%{model.updatetimeString}" /></td>
		</tr>
	</table>
</s:form>

</body>

</html>