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
	<title><%=TabZbyl.TABLE_ALIAS%>查询</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/TabZbyl/list.do" method="post">
	<input type="submit" value="提交" onclick="return new Validation(document.forms[0]).validate();"/>
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/TabZbyl/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<table class="formTable">
	
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabZbyl.ALIAS_JLZID%></td>
		   <td>
				<input  type="text" name="s_jlzid" size="30" maxlength="8" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabZbyl.ALIAS_ZBQF%></td>
		   <td>
				<input  type="text" name="s_zbqf" size="30" maxlength="1" class="validate-integer max-value-2147483647"/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabZbyl.ALIAS_ZZWMC%></td>
		   <td>
				<input  type="text" name="s_zzwmc" size="30" maxlength="255" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabZbyl.ALIAS_UPDATETIME%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=TabZbyl.FORMAT_UPDATETIME%>'})" type="text" name="s_updatetime" size="30" maxlength="19" class=""/>
		   </td>
		</tr>
	
	</table>
</s:form>	
			
</body>

</html>