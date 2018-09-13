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
	<title><%=TabMcyl.TABLE_ALIAS%>查询</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/TabMcyl/list.do" method="post">
	<input type="submit" value="提交" onclick="return new Validation(document.forms[0]).validate();"/>
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/TabMcyl/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<table class="formTable">
	
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabMcyl.ALIAS_JNID%></td>
		   <td>
				<input  type="text" name="s_jnid" size="30" maxlength="3" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabMcyl.ALIAS_HMID%></td>
		   <td>
				<input  type="text" name="s_hmid" size="30" maxlength="3" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabMcyl.ALIAS_XMID%></td>
		   <td>
				<input  type="text" name="s_xmid" size="30" maxlength="4" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabMcyl.ALIAS_XMSX%></td>
		   <td>
				<input  type="text" name="s_xmsx" size="30" maxlength="3" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabMcyl.ALIAS_XMMC%></td>
		   <td>
				<input  type="text" name="s_xmmc" size="30" maxlength="255" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabMcyl.ALIAS_SCQF%></td>
		   <td>
				<input  type="text" name="s_scqf" size="30" maxlength="1" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabMcyl.ALIAS_UPDATETIME%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=TabMcyl.FORMAT_UPDATETIME%>'})" type="text" name="s_updatetime" size="30" maxlength="19" class=""/>
		   </td>
		</tr>
	
	</table>
</s:form>	
			
</body>

</html>