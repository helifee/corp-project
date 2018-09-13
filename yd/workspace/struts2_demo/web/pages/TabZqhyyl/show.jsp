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
	<title><%=TabZqhyyl.TABLE_ALIAS%>信息</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/TabZqhyyl/list.do" method="get" theme="simple">
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/TabZqhyyl/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<s:hidden name="zqhyid" id="zqhyid" value="%{model.zqhyid}"/>
	<s:hidden name="zqnhyts" id="zqnhyts" value="%{model.zqnhyts}"/>

	<table class="formTable">
		<tr>	
			<td class="tdLabel"><%=TabZqhyyl.ALIAS_ZQHYID%></td>	
			<td><s:property value="%{model.zqhyid}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabZqhyyl.ALIAS_ZQNHYTS%></td>	
			<td><s:property value="%{model.zqnhyts}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabZqhyyl.ALIAS_ZQLX%></td>	
			<td><s:property value="%{model.zqlx}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabZqhyyl.ALIAS_HYBZ%></td>	
			<td><s:property value="%{model.hybz}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabZqhyyl.ALIAS_ZQHYZT%></td>	
			<td><s:property value="%{model.zqhyzt}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabZqhyyl.ALIAS_BMBZ%></td>	
			<td><s:property value="%{model.bmbz}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabZqhyyl.ALIAS_HYSID%></td>	
			<td><s:property value="%{model.hysid}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabZqhyyl.ALIAS_HYKSRQ%></td>	
			<td><s:property value="%{model.hyksrqString}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabZqhyyl.ALIAS_HYJSRQ%></td>	
			<td><s:property value="%{model.hyjsrqString}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabZqhyyl.ALIAS_HYKSSJ%></td>	
			<td><s:property value="%{model.hykssjString}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabZqhyyl.ALIAS_HYJSSJ%></td>	
			<td><s:property value="%{model.hyjssjString}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabZqhyyl.ALIAS_YYRID%></td>	
			<td><s:property value="%{model.yyrid}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabZqhyyl.ALIAS_XMZID%></td>	
			<td><s:property value="%{model.xmzid}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabZqhyyl.ALIAS_CJZRS%></td>	
			<td><s:property value="%{model.cjzrs}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabZqhyyl.ALIAS_GGBZ%></td>	
			<td><s:property value="%{model.ggbz}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabZqhyyl.ALIAS_DELFLG%></td>	
			<td><s:property value="%{model.delflg}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabZqhyyl.ALIAS_UPDATETIME%></td>	
			<td><s:property value="%{model.updatetimeString}" /></td>
		</tr>
	</table>
</s:form>

</body>

</html>