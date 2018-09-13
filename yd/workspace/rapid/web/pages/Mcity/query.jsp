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
	<title><%=Mcity.TABLE_ALIAS%>查询</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/Mcity/list.do" method="post">
	<input type="submit" value="提交" onclick="return new Validation(document.forms[0]).validate();"/>
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/Mcity/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<table class="formTable">
	
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Mcity.ALIAS_CITYNAME%></td>
		   <td>
				<input  type="text" name="s_cityname" size="30" maxlength="20" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Mcity.ALIAS_FLAG%></td>
		   <td>
				<input  type="text" name="s_flag" size="30" maxlength="10" class="validate-integer max-value-2147483647"/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Mcity.ALIAS_UPDATETIME%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=Mcity.FORMAT_UPDATETIME%>'})" type="text" name="s_updatetime" size="30" maxlength="0" class=""/>
		   </td>
		</tr>
	
	</table>
</s:form>	
			
</body>

</html>