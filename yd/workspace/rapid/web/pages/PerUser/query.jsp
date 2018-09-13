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
	<title><%=PerUser.TABLE_ALIAS%>查询</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/PerUser/list.do" method="post">
	<input type="submit" value="提交" onclick="return new Validation(document.forms[0]).validate();"/>
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/PerUser/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<table class="formTable">
	
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerUser.ALIAS_EMP_PNM%></td>
		   <td>
				<input  type="text" name="s_empPnm" size="30" maxlength="30" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerUser.ALIAS_EMP_CNM%></td>
		   <td>
				<input  type="text" name="s_empCnm" size="30" maxlength="20" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerUser.ALIAS_EMP_JNM%></td>
		   <td>
				<input  type="text" name="s_empJnm" size="30" maxlength="20" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerUser.ALIAS_PASSWORD%></td>
		   <td>
				<input  type="text" name="s_password" size="30" maxlength="50" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerUser.ALIAS_DEPT_ID%></td>
		   <td>
				<input  type="text" name="s_deptId" size="30" maxlength="3" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerUser.ALIAS_START_DATE%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=PerUser.FORMAT_START_DATE%>'})" type="text" name="s_startDate" size="30" maxlength="0" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerUser.ALIAS_EMP_PWDASK%></td>
		   <td>
				<input  type="text" name="s_empPwdask" size="30" maxlength="100" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerUser.ALIAS_EMP_PWDASW%></td>
		   <td>
				<input  type="text" name="s_empPwdasw" size="30" maxlength="100" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerUser.ALIAS_EMP_COOKIE%></td>
		   <td>
				<input  type="text" name="s_empCookie" size="30" maxlength="1" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerUser.ALIAS_EMP_WORKID%></td>
		   <td>
				<input  type="text" name="s_empWorkid" size="30" maxlength="5" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerUser.ALIAS_EMP_WORKPWD%></td>
		   <td>
				<input  type="text" name="s_empWorkpwd" size="30" maxlength="5" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerUser.ALIAS_HIGHER_ID%></td>
		   <td>
				<input  type="text" name="s_higherId" size="30" maxlength="6" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerUser.ALIAS_OHIGHER_ID%></td>
		   <td>
				<input  type="text" name="s_ohigherId" size="30" maxlength="6" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerUser.ALIAS_CONTRACT_ID%></td>
		   <td>
				<input  type="text" name="s_contractId" size="30" maxlength="2" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerUser.ALIAS_END_DATE%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=PerUser.FORMAT_END_DATE%>'})" type="text" name="s_endDate" size="30" maxlength="0" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerUser.ALIAS_YX_NO%></td>
		   <td>
				<input  type="text" name="s_yxNo" size="30" maxlength="6" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerUser.ALIAS_YX_CONTRACT_ID%></td>
		   <td>
				<input  type="text" name="s_yxContractId" size="30" maxlength="2" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerUser.ALIAS_YJSR%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=PerUser.FORMAT_YJSR%>'})" type="text" name="s_yjsr" size="30" maxlength="0" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerUser.ALIAS_EMP_DESP%></td>
		   <td>
				<input  type="text" name="s_empDesp" size="30" maxlength="200" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerUser.ALIAS_EMP_FLAG%></td>
		   <td>
				<input  type="text" name="s_empFlag" size="30" maxlength="1" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerUser.ALIAS_UPDATETIME%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=PerUser.FORMAT_UPDATETIME%>'})" type="text" name="s_updatetime" size="30" maxlength="0" class=""/>
		   </td>
		</tr>
	
	</table>
</s:form>	
			
</body>

</html>