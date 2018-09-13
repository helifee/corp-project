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
	<title><%=PerPermit.TABLE_ALIAS%>查询</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/PerPermit/list.do" method="post">
	<input type="submit" value="提交" onclick="return new Validation(document.forms[0]).validate();"/>
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/PerPermit/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<table class="formTable">
	
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerPermit.ALIAS_NAMESPACE%></td>
		   <td>
				<input  type="text" name="s_namespace" size="30" maxlength="50" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerPermit.ALIAS_ACTION_NAME%></td>
		   <td>
				<input  type="text" name="s_actionName" size="30" maxlength="30" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerPermit.ALIAS_IS_MODULE%></td>
		   <td>
				<input  type="text" name="s_isModule" size="30" maxlength="1" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerPermit.ALIAS_MODULE_NAME%></td>
		   <td>
				<input  type="text" name="s_moduleName" size="30" maxlength="100" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerPermit.ALIAS_PARENT_MODULE%></td>
		   <td>
				<input  type="text" name="s_parentModule" size="30" maxlength="6" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerPermit.ALIAS_DISP_SEQ%></td>
		   <td>
				<input  type="text" name="s_dispSeq" size="30" maxlength="3" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerPermit.ALIAS_IS_MENU%></td>
		   <td>
				<input  type="text" name="s_isMenu" size="30" maxlength="1" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerPermit.ALIAS_DESCRIPTION%></td>
		   <td>
				<input  type="text" name="s_description" size="30" maxlength="200" class=""/>
		   </td>
		</tr>
	
	</table>
</s:form>	
			
</body>

</html>