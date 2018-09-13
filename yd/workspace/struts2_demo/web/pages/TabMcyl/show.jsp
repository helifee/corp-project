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
	<title><%=TabMcyl.TABLE_ALIAS%>信息</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/TabMcyl/list.do" method="get" theme="simple">
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/TabMcyl/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<s:hidden name="jnid" id="jnid" value="%{model.jnid}"/>
	<s:hidden name="hmid" id="hmid" value="%{model.hmid}"/>
	<s:hidden name="xmid" id="xmid" value="%{model.xmid}"/>
	<s:hidden name="xmsx" id="xmsx" value="%{model.xmsx}"/>

	<table class="formTable">
		<tr>	
			<td class="tdLabel"><%=TabMcyl.ALIAS_JNID%></td>	
			<td><s:property value="%{model.jnid}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabMcyl.ALIAS_HMID%></td>	
			<td><s:property value="%{model.hmid}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabMcyl.ALIAS_XMID%></td>	
			<td><s:property value="%{model.xmid}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabMcyl.ALIAS_XMSX%></td>	
			<td><s:property value="%{model.xmsx}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabMcyl.ALIAS_XMMC%></td>	
			<td><s:property value="%{model.xmmc}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabMcyl.ALIAS_SCQF%></td>	
			<td><s:property value="%{model.scqf}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabMcyl.ALIAS_UPDATETIME%></td>	
			<td><s:property value="%{model.updatetimeString}" /></td>
		</tr>
	</table>
</s:form>

</body>

</html>