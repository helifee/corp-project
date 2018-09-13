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
	<title><%=TabZbyl.TABLE_ALIAS%>信息</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/TabZbyl/list.do" method="get" theme="simple">
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/TabZbyl/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<s:hidden name="zbid" id="zbid" value="%{model.zbid}"/>

	<table class="formTable">
		<tr>	
			<td class="tdLabel"><%=TabZbyl.ALIAS_JLZID%></td>	
			<td><s:property value="%{model.jlzid}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabZbyl.ALIAS_ZBQF%></td>	
			<td><s:property value="%{model.zbqf}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabZbyl.ALIAS_ZZWMC%></td>	
			<td><s:property value="%{model.zzwmc}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabZbyl.ALIAS_UPDATETIME%></td>	
			<td><s:property value="%{model.updatetimeString}" /></td>
		</tr>
	</table>
</s:form>

</body>

</html>