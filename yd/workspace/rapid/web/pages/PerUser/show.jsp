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
	<title><%=PerUser.TABLE_ALIAS%>信息</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/PerUser/list.do" method="get" theme="simple">
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/PerUser/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<s:hidden name="empId" id="empId" value="%{model.empId}"/>

	<table class="formTable">
		<tr>	
			<td class="tdLabel"><%=PerUser.ALIAS_EMP_PNM%></td>	
			<td><s:property value="%{model.empPnm}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerUser.ALIAS_EMP_CNM%></td>	
			<td><s:property value="%{model.empCnm}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerUser.ALIAS_EMP_JNM%></td>	
			<td><s:property value="%{model.empJnm}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerUser.ALIAS_PASSWORD%></td>	
			<td><s:property value="%{model.password}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerUser.ALIAS_DEPT_ID%></td>	
			<td><s:property value="%{model.deptId}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerUser.ALIAS_START_DATE%></td>	
			<td><s:property value="%{model.startDateString}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerUser.ALIAS_EMP_PWDASK%></td>	
			<td><s:property value="%{model.empPwdask}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerUser.ALIAS_EMP_PWDASW%></td>	
			<td><s:property value="%{model.empPwdasw}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerUser.ALIAS_EMP_COOKIE%></td>	
			<td><s:property value="%{model.empCookie}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerUser.ALIAS_EMP_WORKID%></td>	
			<td><s:property value="%{model.empWorkid}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerUser.ALIAS_EMP_WORKPWD%></td>	
			<td><s:property value="%{model.empWorkpwd}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerUser.ALIAS_HIGHER_ID%></td>	
			<td><s:property value="%{model.higherId}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerUser.ALIAS_OHIGHER_ID%></td>	
			<td><s:property value="%{model.ohigherId}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerUser.ALIAS_CONTRACT_ID%></td>	
			<td><s:property value="%{model.contractId}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerUser.ALIAS_END_DATE%></td>	
			<td><s:property value="%{model.endDateString}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerUser.ALIAS_YX_NO%></td>	
			<td><s:property value="%{model.yxNo}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerUser.ALIAS_YX_CONTRACT_ID%></td>	
			<td><s:property value="%{model.yxContractId}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerUser.ALIAS_YJSR%></td>	
			<td><s:property value="%{model.yjsrString}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerUser.ALIAS_EMP_DESP%></td>	
			<td><s:property value="%{model.empDesp}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerUser.ALIAS_EMP_FLAG%></td>	
			<td><s:property value="%{model.empFlag}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerUser.ALIAS_UPDATETIME%></td>	
			<td><s:property value="%{model.updatetimeString}" /></td>
		</tr>
	</table>
</s:form>

</body>

</html>