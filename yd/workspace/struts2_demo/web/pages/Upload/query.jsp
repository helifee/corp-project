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
	<title><%=Upload.TABLE_ALIAS%>查询</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/Upload/list.do" method="post">
	<input type="submit" value="提交" onclick="return new Validation(document.forms[0]).validate();"/>
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/Upload/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<table class="formTable">
	
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Upload.ALIAS_FILENAME%></td>
		   <td>
				<input  type="text" name="s_filename" size="30" maxlength="300" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Upload.ALIAS_UPFILEDATE%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=Upload.FORMAT_UPFILEDATE%>'})" type="text" name="s_upfiledate" size="30" maxlength="19" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Upload.ALIAS_UPFILEDIR%></td>
		   <td>
				<input  type="text" name="s_upfiledir" size="30" maxlength="80" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Upload.ALIAS_UPFILEUSER%></td>
		   <td>
				<input  type="text" name="s_upfileuser" size="30" maxlength="20" class=""/>
		   </td>
		</tr>
	
	</table>
</s:form>	
			
</body>

</html>