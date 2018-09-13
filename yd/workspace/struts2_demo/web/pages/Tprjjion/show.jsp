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
	<title><%=Tprjjion.TABLE_ALIAS%>信息</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/Tprjjion/list.do" method="get" theme="simple">
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/Tprjjion/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<s:hidden name="prjId" id="prjId" value="%{model.prjId}"/>
	<s:hidden name="prjEmpid" id="prjEmpid" value="%{model.prjEmpid}"/>
	<s:hidden name="prjBegdate" id="prjBegdate" value="%{model.prjBegdate}"/>

	<table class="formTable">
		<tr>	
			<td class="tdLabel"><%=Tprjjion.ALIAS_PRJ_ID%></td>	
			<td><s:property value="%{model.prjId}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tprjjion.ALIAS_PRJ_EMPID%></td>	
			<td><s:property value="%{model.prjEmpid}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tprjjion.ALIAS_PRJ_FLAG%></td>	
			<td><s:property value="%{model.prjFlag}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tprjjion.ALIAS_PRJ_BEGDATE%></td>	
			<td><s:property value="%{model.prjBegdateString}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tprjjion.ALIAS_PRJ_ENDDATE%></td>	
			<td><s:property value="%{model.prjEnddateString}" /></td>
		</tr>
	</table>
</s:form>

</body>

</html>