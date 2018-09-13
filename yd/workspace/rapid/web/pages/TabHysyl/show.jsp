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
	<title><%=TabHysyl.TABLE_ALIAS%>信息</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/TabHysyl/list.do" method="get" theme="simple">
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/TabHysyl/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<s:hidden name="hysid" id="hysid" value="%{model.hysid}"/>

	<table class="formTable">
		<tr>	
			<td class="tdLabel"><%=TabHysyl.ALIAS_HYSMC%></td>	
			<td><s:property value="%{model.hysmc}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabHysyl.ALIAS_RNRS%></td>	
			<td><s:property value="%{model.rnrs}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabHysyl.ALIAS_DH%></td>	
			<td><s:property value="%{model.dh}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabHysyl.ALIAS_SB%></td>	
			<td><s:property value="%{model.sb}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabHysyl.ALIAS_HYBGBZ%></td>	
			<td><s:property value="%{model.hybgbz}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabHysyl.ALIAS_WXJK%></td>	
			<td><s:property value="%{model.wxjk}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabHysyl.ALIAS_SORTID%></td>	
			<td><s:property value="%{model.sortid}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabHysyl.ALIAS_IMAGEFROMX%></td>	
			<td><s:property value="%{model.imagefromx}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabHysyl.ALIAS_IMAGEFROMY%></td>	
			<td><s:property value="%{model.imagefromy}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabHysyl.ALIAS_IMAGETOX%></td>	
			<td><s:property value="%{model.imagetox}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabHysyl.ALIAS_IMAGETOY%></td>	
			<td><s:property value="%{model.imagetoy}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=TabHysyl.ALIAS_UPDATETIME%></td>	
			<td><s:property value="%{model.updatetimeString}" /></td>
		</tr>
	</table>
</s:form>

</body>

</html>