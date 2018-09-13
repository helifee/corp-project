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
	<title><%=TabZbcyyl.TABLE_ALIAS%>信息</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/TabZbcyyl/list.do" method="get" theme="simple">
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/TabZbcyyl/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<s:hidden name="zbid" id="zbid" value="%{model.zbid}"/>
	<s:hidden name="zcyid" id="zcyid" value="%{model.zcyid}"/>

	<table class="formTable">
		<tr>	
			<td class="tdLabel"><%=TabZbcyyl.ALIAS_ZBID%></td>	
			<td><s:property value="%{model.zbid}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabZbcyyl.ALIAS_ZCYID%></td>	
			<td><s:property value="%{model.zcyid}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabZbcyyl.ALIAS_UPDATETIME%></td>	
			<td><s:property value="%{model.updatetimeString}" /></td>
		</tr>
	</table>
</s:form>

</body>

</html>