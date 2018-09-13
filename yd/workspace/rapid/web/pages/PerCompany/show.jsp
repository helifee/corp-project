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
	<title><%=PerCompany.TABLE_ALIAS%>信息</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/PerCompany/list.do" method="get" theme="simple">
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/PerCompany/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<s:hidden name="companyId" id="companyId" value="%{model.companyId}"/>

	<table class="formTable">
		<tr>	
			<td class="tdLabel"><%=PerCompany.ALIAS_COMPANY_NM%></td>	
			<td><s:property value="%{model.companyNm}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerCompany.ALIAS_UPDATETIME%></td>	
			<td><s:property value="%{model.updatetimeString}" /></td>
		</tr>
	</table>
</s:form>

</body>

</html>