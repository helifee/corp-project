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
	<title><%=TabTask.TABLE_ALIAS%>查询</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/TabTask/list.do" method="post">
	<input type="submit" value="提交" onclick="return new Validation(document.forms[0]).validate();"/>
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/TabTask/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<table class="formTable">
	
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabTask.ALIAS_USERID%></td>
		   <td>
				<input  type="text" name="s_userid" size="30" maxlength="8" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabTask.ALIAS_TASKFLAG%></td>
		   <td>
				<input  type="text" name="s_taskflag" size="30" maxlength="3" class="validate-integer max-value-2147483647"/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabTask.ALIAS_TASKID%></td>
		   <td>
				<input  type="text" name="s_taskid" size="30" maxlength="20" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabTask.ALIAS_CONTENT%></td>
		   <td>
				<input  type="text" name="s_content" size="30" maxlength="65535" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabTask.ALIAS_LINK%></td>
		   <td>
				<input  type="text" name="s_link" size="30" maxlength="65535" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabTask.ALIAS_READFLAG%></td>
		   <td>
				<input  type="text" name="s_readflag" size="30" maxlength="1" class="validate-integer max-value-2147483647"/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabTask.ALIAS_CREATETIME%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=TabTask.FORMAT_CREATETIME%>'})" type="text" name="s_createtime" size="30" maxlength="19" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabTask.ALIAS_UPDATETIME%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=TabTask.FORMAT_UPDATETIME%>'})" type="text" name="s_updatetime" size="30" maxlength="19" class=""/>
		   </td>
		</tr>
	
	</table>
</s:form>	
			
</body>

</html>