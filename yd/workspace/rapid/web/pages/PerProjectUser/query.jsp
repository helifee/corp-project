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
	<title><%=PerProjectUser.TABLE_ALIAS%>查询</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/PerProjectUser/list.do" method="post">
	<input type="submit" value="提交" onclick="return new Validation(document.forms[0]).validate();"/>
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/PerProjectUser/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<table class="formTable">
	
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerProjectUser.ALIAS_PRO_ID%></td>
		   <td>
				<input  type="text" name="s_proId" size="30" maxlength="8" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerProjectUser.ALIAS_USER_ID%></td>
		   <td>
				<input  type="text" name="s_userId" size="30" maxlength="8" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerProjectUser.ALIAS_JOB_FLAG%></td>
		   <td>
				<input  type="text" name="s_jobFlag" size="30" maxlength="1" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerProjectUser.ALIAS_STA_DATE%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=PerProjectUser.FORMAT_STA_DATE%>'})" type="text" name="s_staDate" size="30" maxlength="0" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerProjectUser.ALIAS_END_DATE%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=PerProjectUser.FORMAT_END_DATE%>'})" type="text" name="s_endDate" size="30" maxlength="0" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerProjectUser.ALIAS_OPERATOR%></td>
		   <td>
				<input  type="text" name="s_operator" size="30" maxlength="8" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerProjectUser.ALIAS_UPDATETIME%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=PerProjectUser.FORMAT_UPDATETIME%>'})" type="text" name="s_updatetime" size="30" maxlength="0" class=""/>
		   </td>
		</tr>
	
	</table>
</s:form>	
			
</body>

</html>