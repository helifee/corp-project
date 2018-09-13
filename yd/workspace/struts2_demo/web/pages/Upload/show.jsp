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
	<title><%=Upload.TABLE_ALIAS%>信息</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/Upload/list.do" method="get" theme="simple">
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/Upload/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<s:hidden name="id" id="id" value="%{model.id}"/>

	<table class="formTable">
		<tr>	
			<td class="tdLabel"><%=Upload.ALIAS_FILENAME%></td>	
			<td><s:property value="%{model.filename}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Upload.ALIAS_UPFILEDATE%></td>	
			<td><s:property value="%{model.upfiledateString}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Upload.ALIAS_UPFILEDIR%></td>	
			<td><s:property value="%{model.upfiledir}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Upload.ALIAS_UPFILEUSER%></td>	
			<td><s:property value="%{model.upfileuser}" /></td>
		</tr>
	</table>
</s:form>

</body>

</html>