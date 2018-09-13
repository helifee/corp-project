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
	<title><%=PerProject.TABLE_ALIAS%>信息</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/PerProject/list.do" method="get" theme="simple">
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/PerProject/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<s:hidden name="proId" id="proId" value="%{model.proId}"/>

	<table class="formTable">
		<tr>	
			<td class="tdLabel"><%=PerProject.ALIAS_PRO_NAME%></td>	
			<td><s:property value="%{model.proName}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerProject.ALIAS_PRO_NAME_CN%></td>	
			<td><s:property value="%{model.proNameCn}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerProject.ALIAS_PRO_NAME_ENG%></td>	
			<td><s:property value="%{model.proNameEngString}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerProject.ALIAS_PRO_DESC%></td>	
			<td><s:property value="%{model.proDesc}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerProject.ALIAS_PARENT_PRO%></td>	
			<td><s:property value="%{model.parentPro}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerProject.ALIAS_CUS_NAME%></td>	
			<td><s:property value="%{model.cusName}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerProject.ALIAS_CUS_CONTACT%></td>	
			<td><s:property value="%{model.cusContact}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerProject.ALIAS_DEVELOP_ENVI%></td>	
			<td><s:property value="%{model.developEnvi}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerProject.ALIAS_DEPT_ID%></td>	
			<td><s:property value="%{model.deptId}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerProject.ALIAS_PLAN_STA_DATE%></td>	
			<td><s:property value="%{model.planStaDateString}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerProject.ALIAS_PLAN_END_DATE%></td>	
			<td><s:property value="%{model.planEndDateString}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerProject.ALIAS_REAL_STA_DATE%></td>	
			<td><s:property value="%{model.realStaDateString}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerProject.ALIAS_REAL_END_DATE%></td>	
			<td><s:property value="%{model.realEndDateString}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=PerProject.ALIAS_UPDATETIME%></td>	
			<td><s:property value="%{model.updatetimeString}" /></td>
		</tr>
	</table>
</s:form>

</body>

</html>