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
	<title><%=TabZqhcjz.TABLE_ALIAS%>查询</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/TabZqhcjz/list.do" method="post">
	<input type="submit" value="提交" onclick="return new Validation(document.forms[0]).validate();"/>
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/TabZqhcjz/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<table class="formTable">
	
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabZqhcjz.ALIAS_ZQHYID%></td>
		   <td>
				<input  type="text" name="s_zqhyid" size="30" maxlength="10" class="validate-integer max-value-2147483647"/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabZqhcjz.ALIAS_ZQNHYTS%></td>
		   <td>
				<input  type="text" name="s_zqnhyts" size="30" maxlength="3" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabZqhcjz.ALIAS_CJZID%></td>
		   <td>
				<input  type="text" name="s_cjzid" size="30" maxlength="8" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabZqhcjz.ALIAS_UPDATETIME%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=TabZqhcjz.FORMAT_UPDATETIME%>'})" type="text" name="s_updatetime" size="30" maxlength="19" class=""/>
		   </td>
		</tr>
	
	</table>
</s:form>	
			
</body>

</html>