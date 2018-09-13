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
	<title><%=PerPermitOld.TABLE_ALIAS%>查询</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/PerPermitOld/list.do" method="post">
	<input type="submit" value="提交" onclick="return new Validation(document.forms[0]).validate();"/>
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/PerPermitOld/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<table class="formTable">
	
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerPermitOld.ALIAS_MODULE_ID%></td>
		   <td>
				<input  type="text" name="s_moduleId" size="30" maxlength="4" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerPermitOld.ALIAS_ACTION_ID%></td>
		   <td>
				<input  type="text" name="s_actionId" size="30" maxlength="2" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerPermitOld.ALIAS_PERMIT_VALUE%></td>
		   <td>
				<input  type="text" name="s_permitValue" size="30" maxlength="20" class=""/>
		   </td>
		</tr>
	
	</table>
</s:form>	
			
</body>

</html>