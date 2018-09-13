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
	<title><%=TabZqhcjz.TABLE_ALIAS%>信息</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/TabZqhcjz/list.do" method="get" theme="simple">
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/TabZqhcjz/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<s:hidden name="zqhyid" id="zqhyid" value="%{model.zqhyid}"/>
	<s:hidden name="zqnhyts" id="zqnhyts" value="%{model.zqnhyts}"/>
	<s:hidden name="cjzid" id="cjzid" value="%{model.cjzid}"/>

	<table class="formTable">
		<tr>	
			<td class="tdLabel"><%=TabZqhcjz.ALIAS_ZQHYID%></td>	
			<td><s:property value="%{model.zqhyid}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabZqhcjz.ALIAS_ZQNHYTS%></td>	
			<td><s:property value="%{model.zqnhyts}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabZqhcjz.ALIAS_CJZID%></td>	
			<td><s:property value="%{model.cjzid}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabZqhcjz.ALIAS_UPDATETIME%></td>	
			<td><s:property value="%{model.updatetimeString}" /></td>
		</tr>
	</table>
</s:form>

</body>

</html>