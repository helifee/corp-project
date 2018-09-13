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
	<title><%=Tur.TABLE_ALIAS%>查询</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/Tur/list.do" method="post">
	<input type="submit" value="提交" onclick="return new Validation(document.forms[0]).validate();"/>
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/Tur/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<table class="formTable">
	
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tur.ALIAS_ROLE%></td>
		   <td>
				<input  type="text" name="s_role" size="30" maxlength="10" class="validate-integer max-value-2147483647"/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tur.ALIAS_USER%></td>
		   <td>
				<input  type="text" name="s_user" size="30" maxlength="10" class="validate-integer max-value-2147483647"/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tur.ALIAS_ORDER_NUM%></td>
		   <td>
				<input  type="text" name="s_orderNum" size="30" maxlength="10" class="validate-integer max-value-2147483647"/>
		   </td>
		</tr>
	
	</table>
</s:form>	
			
</body>

</html>