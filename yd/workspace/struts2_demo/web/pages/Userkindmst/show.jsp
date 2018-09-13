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
	<title><%=Userkindmst.TABLE_ALIAS%>信息</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/Userkindmst/list.do" method="get" theme="simple">
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/Userkindmst/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<s:hidden name="userkindid" id="userkindid" value="%{model.userkindid}"/>

	<table class="formTable">
		<tr>	
			<td class="tdLabel"><%=Userkindmst.ALIAS_USERKINDNAME%></td>	
			<td><s:property value="%{model.userkindname}" /></td>
		</tr>
	</table>
</s:form>

</body>

</html>