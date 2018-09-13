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
	<title><%=User.TABLE_ALIAS%>信息</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/User/list.do" method="get" theme="simple">
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/User/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<s:hidden name="userId" id="userId" value="%{model.userId}"/>

	<table class="formTable">
		<tr>	
			<td class="tdLabel"><%=User.ALIAS_USER_NAME%></td>	
			<td><s:property value="%{model.userName}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=User.ALIAS_PASS_WORD%></td>	
			<td><s:property value="%{model.passWord}" /></td>
		</tr>
	</table>
</s:form>

</body>

</html>