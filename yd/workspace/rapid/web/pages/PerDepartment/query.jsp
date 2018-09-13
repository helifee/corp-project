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
	<title><%=PerDepartment.TABLE_ALIAS%>查询</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/PerDepartment/list.do" method="post">
	<input type="submit" value="提交" onclick="return new Validation(document.forms[0]).validate();"/>
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/PerDepartment/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<table class="formTable">
	
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerDepartment.ALIAS_DEPT_NM%></td>
		   <td>
				<input  type="text" name="s_deptNm" size="30" maxlength="30" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerDepartment.ALIAS_PARENT_DEPT_ID%></td>
		   <td>
				<input  type="text" name="s_parentDeptId" size="30" maxlength="3" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerDepartment.ALIAS_COMPANY_ID%></td>
		   <td>
				<input  type="text" name="s_companyId" size="30" maxlength="3" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerDepartment.ALIAS_DEPT_DESC%></td>
		   <td>
				<input  type="text" name="s_deptDesc" size="30" maxlength="200" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerDepartment.ALIAS_DEPT_ROOM%></td>
		   <td>
				<input  type="text" name="s_deptRoom" size="30" maxlength="20" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerDepartment.ALIAS_LEADER_ID%></td>
		   <td>
				<input  type="text" name="s_leaderId" size="30" maxlength="8" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerDepartment.ALIAS_LEADER_TEL%></td>
		   <td>
				<input  type="text" name="s_leaderTel" size="30" maxlength="10" class="validate-integer max-value-2147483647"/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerDepartment.ALIAS_UPDATETIME%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=PerDepartment.FORMAT_UPDATETIME%>'})" type="text" name="s_updatetime" size="30" maxlength="0" class=""/>
		   </td>
		</tr>
	
	</table>
</s:form>	
			
</body>

</html>