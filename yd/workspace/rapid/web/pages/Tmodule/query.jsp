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
	<title><%=Tmodule.TABLE_ALIAS%>查询</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/Tmodule/list.do" method="post">
	<input type="submit" value="提交" onclick="return new Validation(document.forms[0]).validate();"/>
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/Tmodule/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<table class="formTable">
	
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tmodule.ALIAS_NAME%></td>
		   <td>
				<input  type="text" name="s_name" size="30" maxlength="255" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tmodule.ALIAS_SN%></td>
		   <td>
				<input  type="text" name="s_sn" size="30" maxlength="255" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tmodule.ALIAS_URL%></td>
		   <td>
				<input  type="text" name="s_url" size="30" maxlength="255" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tmodule.ALIAS_ORDER_NUM%></td>
		   <td>
				<input  type="text" name="s_orderNum" size="30" maxlength="10" class="validate-integer max-value-2147483647"/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tmodule.ALIAS_PARENT_ID%></td>
		   <td>
				<input  type="text" name="s_parentId" size="30" maxlength="10" class="validate-integer max-value-2147483647"/>
		   </td>
		</tr>
	
	</table>
</s:form>	
			
</body>

</html>