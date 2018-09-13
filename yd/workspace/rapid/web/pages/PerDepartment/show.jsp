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
	<title><%=PerDepartment.TABLE_ALIAS%>信息</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/PerDepartment/list.do" method="get" theme="simple">
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/PerDepartment/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<s:hidden name="deptId" id="deptId" value="%{model.deptId}"/>

	<table class="formTable">
		<tr>	
			<td class="tdLabel"><%=PerDepartment.ALIAS_DEPT_NM%></td>	
			<td><s:property value="%{model.deptNm}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerDepartment.ALIAS_PARENT_DEPT_ID%></td>	
			<td><s:property value="%{model.parentDeptId}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerDepartment.ALIAS_COMPANY_ID%></td>	
			<td><s:property value="%{model.companyId}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerDepartment.ALIAS_DEPT_DESC%></td>	
			<td><s:property value="%{model.deptDesc}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerDepartment.ALIAS_DEPT_ROOM%></td>	
			<td><s:property value="%{model.deptRoom}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerDepartment.ALIAS_LEADER_ID%></td>	
			<td><s:property value="%{model.leaderId}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerDepartment.ALIAS_LEADER_TEL%></td>	
			<td><s:property value="%{model.leaderTel}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerDepartment.ALIAS_UPDATETIME%></td>	
			<td><s:property value="%{model.updatetimeString}" /></td>
		</tr>
	</table>
</s:form>

</body>

</html>