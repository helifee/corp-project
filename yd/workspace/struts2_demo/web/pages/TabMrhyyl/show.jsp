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
	<title><%=TabMrhyyl.TABLE_ALIAS%>信息</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/TabMrhyyl/list.do" method="get" theme="simple">
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/TabMrhyyl/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<s:hidden name="hyrq" id="hyrq" value="%{model.hyrq}"/>
	<s:hidden name="hykssj" id="hykssj" value="%{model.hykssj}"/>
	<s:hidden name="hysid" id="hysid" value="%{model.hysid}"/>

	<table class="formTable">
		<tr>	
			<td class="tdLabel"><%=TabMrhyyl.ALIAS_HYRQ%></td>	
			<td><s:property value="%{model.hyrqString}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabMrhyyl.ALIAS_HYKSSJ%></td>	
			<td><s:property value="%{model.hykssjString}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabMrhyyl.ALIAS_HYJSSJ%></td>	
			<td><s:property value="%{model.hyjssjString}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabMrhyyl.ALIAS_HYZT%></td>	
			<td><s:property value="%{model.hyzt}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabMrhyyl.ALIAS_HYSID%></td>	
			<td><s:property value="%{model.hysid}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabMrhyyl.ALIAS_YYRID%></td>	
			<td><s:property value="%{model.yyrid}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabMrhyyl.ALIAS_BMBZ%></td>	
			<td><s:property value="%{model.bmbz}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabMrhyyl.ALIAS_CJZRS%></td>	
			<td><s:property value="%{model.cjzrs}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabMrhyyl.ALIAS_ZQHYQF%></td>	
			<td><s:property value="%{model.zqhyqf}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabMrhyyl.ALIAS_ZQHYID%></td>	
			<td><s:property value="%{model.zqhyid}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabMrhyyl.ALIAS_HYSBG%></td>	
			<td><s:property value="%{model.hysbg}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabMrhyyl.ALIAS_UPDATETIME%></td>	
			<td><s:property value="%{model.updatetimeString}" /></td>
		</tr>
	</table>
</s:form>

</body>

</html>