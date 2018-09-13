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
	<link href="${ctx}/widgets/extremecomponents/extremecomponents.css" type="text/css" rel=stylesheet>
	<title><%=Usermst.TABLE_ALIAS%> 维护</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<div class="queryPanel">
<form action="<c:url value="/pages/Usermst/list.do"/>" method="get" style="display: inline;">
<fieldset>
	<legend>搜索</legend>
	<table>
		<tr>	
			<td class="tdLabel">
					<%=Usermst.ALIAS_USERNAME%>
			</td>		
			<td>
				<input value="${pageRequest.filters.username}"  name="s_username"  />
			</td>
			<td class="tdLabel">
					<%=Usermst.ALIAS_BUSYOID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.busyoid}"  name="s_busyoid"  />
			</td>
			<td class="tdLabel">
					<%=Usermst.ALIAS_USERKINDID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.userkindid}"  name="s_userkindid"  />
			</td>
			<td class="tdLabel">
					<%=Usermst.ALIAS_PASSWORD%>
			</td>		
			<td>
				<input value="${pageRequest.filters.password}"  name="s_password"  />
			</td>
		</tr>	
	</table>
</fieldset>
<div class="handleControl">
	<input type="submit" class="stdButton" style="width:80px" value="查询" onclick="getReferenceForm(this).action='${ctx}/pages/Usermst/list.do'"/>
	<input type="submit" class="stdButton" style="width:80px" value="新增" onclick="getReferenceForm(this).action='${ctx}/pages/Usermst/create.do'"/>
	<input type="button" class="stdButton" style="width:80px" value="删除" onclick="batchDelete('${ctx}/pages/Usermst/delete.do','items',document.forms.ec)"/>
<div>
</form>
</div>

<ec:table items='page.result' var="item" method="get"
	retrieveRowsCallback="limit" sortRowsCallback="limit" filterRowsCallback="limit"
	action="${ctx}/pages/Usermst/list.do" autoIncludeParameters="true">
	<ec:row>
		<ec:column property="选择" title="<input type='checkbox' onclick=\"setAllCheckboxState('items',this.checked)\" >" sortable="false" width="3%" viewsAllowed="html">
			<input type="checkbox" name="items" value="userid=${item.userid}&"/>
		</ec:column>
		<ec:column property="username"  title="<%=Usermst.ALIAS_USERNAME%>"/>
		<ec:column property="busyoid"  title="<%=Usermst.ALIAS_BUSYOID%>"/>
		<ec:column property="userkindid"  title="<%=Usermst.ALIAS_USERKINDID%>"/>
		<ec:column property="password"  title="<%=Usermst.ALIAS_PASSWORD%>"/>
		<ec:column property="操作" title="操作" sortable="false" viewsAllowed="html">
			<a href="${ctx}/pages/Usermst/show.do?userid=${item.userid}&">查看</a>&nbsp;&nbsp;&nbsp;
			<a href="${ctx}/pages/Usermst/edit.do?userid=${item.userid}&">修改</a>
		</ec:column>
	</ec:row>
</ec:table>

</body>

</html>

