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
	<title><%=PerModuleOld.TABLE_ALIAS%>查询</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/PerModuleOld/list.do" method="post">
	<input type="submit" value="提交" onclick="return new Validation(document.forms[0]).validate();"/>
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/PerModuleOld/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<table class="formTable">
	
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerModuleOld.ALIAS_MODULE_NAME%></td>
		   <td>
				<input  type="text" name="s_moduleName" size="30" maxlength="20" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerModuleOld.ALIAS_MODULE_VALUE%></td>
		   <td>
				<input  type="text" name="s_moduleValue" size="30" maxlength="20" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerModuleOld.ALIAS_LINK_URL%></td>
		   <td>
				<input  type="text" name="s_linkUrl" size="30" maxlength="200" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerModuleOld.ALIAS_PARENT_MODULE%></td>
		   <td>
				<input  type="text" name="s_parentModule" size="30" maxlength="4" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerModuleOld.ALIAS_MODULE_DESC%></td>
		   <td>
				<input  type="text" name="s_moduleDesc" size="30" maxlength="200" class=""/>
		   </td>
		</tr>
	
	</table>
</s:form>	
			
</body>

</html>