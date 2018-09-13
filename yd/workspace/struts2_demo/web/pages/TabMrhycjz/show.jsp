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
	<title><%=TabMrhycjz.TABLE_ALIAS%>信息</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/TabMrhycjz/list.do" method="get" theme="simple">
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/TabMrhycjz/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<s:hidden name="hyrq" id="hyrq" value="%{model.hyrq}"/>
	<s:hidden name="hykssj" id="hykssj" value="%{model.hykssj}"/>
	<s:hidden name="hysid" id="hysid" value="%{model.hysid}"/>
	<s:hidden name="cjzid" id="cjzid" value="%{model.cjzid}"/>

	<table class="formTable">
		<tr>	
			<td class="tdLabel"><%=TabMrhycjz.ALIAS_HYRQ%></td>	
			<td><s:property value="%{model.hyrqString}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabMrhycjz.ALIAS_HYKSSJ%></td>	
			<td><s:property value="%{model.hykssjString}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabMrhycjz.ALIAS_HYSID%></td>	
			<td><s:property value="%{model.hysid}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabMrhycjz.ALIAS_CJZID%></td>	
			<td><s:property value="%{model.cjzid}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabMrhycjz.ALIAS_HZQR%></td>	
			<td><s:property value="%{model.hzqr}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabMrhycjz.ALIAS_UPDATETIME%></td>	
			<td><s:property value="%{model.updatetimeString}" /></td>
		</tr>
	</table>
</s:form>

</body>

</html>