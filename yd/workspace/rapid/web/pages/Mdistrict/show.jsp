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
	<title><%=Mdistrict.TABLE_ALIAS%>信息</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/Mdistrict/list.do" method="get" theme="simple">
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/Mdistrict/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<s:hidden name="cityid" id="cityid" value="%{model.cityid}"/>
	<s:hidden name="distid" id="distid" value="%{model.distid}"/>

	<table class="formTable">
		<tr>	
			<td class="tdLabel"><%=Mdistrict.ALIAS_CITYID%></td>	
			<td><s:property value="%{model.cityid}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Mdistrict.ALIAS_DISTID%></td>	
			<td><s:property value="%{model.distid}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Mdistrict.ALIAS_UDFLAG%></td>	
			<td><s:property value="%{model.udflag}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Mdistrict.ALIAS_DISTNAME%></td>	
			<td><s:property value="%{model.distname}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Mdistrict.ALIAS_FLAG%></td>	
			<td><s:property value="%{model.flag}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Mdistrict.ALIAS_UPDATETIME%></td>	
			<td><s:property value="%{model.updatetimeString}" /></td>
		</tr>
	</table>
</s:form>

</body>

</html>