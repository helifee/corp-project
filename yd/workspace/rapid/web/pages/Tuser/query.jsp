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
	<title><%=Tuser.TABLE_ALIAS%>查询</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/Tuser/list.do" method="post">
	<input type="submit" value="提交" onclick="return new Validation(document.forms[0]).validate();"/>
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/Tuser/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<table class="formTable">
	
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tuser.ALIAS_USERNAME%></td>
		   <td>
				<input  type="text" name="s_username" size="30" maxlength="255" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tuser.ALIAS_PASSWORD%></td>
		   <td>
				<input  type="text" name="s_password" size="30" maxlength="255" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tuser.ALIAS_CREATE_TIME%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=Tuser.FORMAT_CREATE_TIME%>'})" type="text" name="s_createTime" size="30" maxlength="0" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tuser.ALIAS_EXPIRE_TIME%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=Tuser.FORMAT_EXPIRE_TIME%>'})" type="text" name="s_expireTime" size="30" maxlength="0" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tuser.ALIAS_PERSON%></td>
		   <td>
				<input  type="text" name="s_person" size="30" maxlength="10" class="validate-integer max-value-2147483647"/>
		   </td>
		</tr>
	
	</table>
</s:form>	
			
</body>

</html>