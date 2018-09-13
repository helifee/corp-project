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
	<title><%=PerPostionPermit.TABLE_ALIAS%>查询</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/PerPostionPermit/list.do" method="post">
	<input type="submit" value="提交" onclick="return new Validation(document.forms[0]).validate();"/>
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/PerPostionPermit/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<table class="formTable">
	
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerPostionPermit.ALIAS_PERMIT_ID%></td>
		   <td>
				<input  type="text" name="s_permitId" size="30" maxlength="4000" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerPostionPermit.ALIAS_OPERATOR%></td>
		   <td>
				<input  type="text" name="s_operator" size="30" maxlength="8" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerPostionPermit.ALIAS_UPDATETIME%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=PerPostionPermit.FORMAT_UPDATETIME%>'})" type="text" name="s_updatetime" size="30" maxlength="0" class=""/>
		   </td>
		</tr>
	
	</table>
</s:form>	
			
</body>

</html>