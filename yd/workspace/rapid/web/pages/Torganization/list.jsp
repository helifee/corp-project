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
	<title><%=Torganization.TABLE_ALIAS%> 维护</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<div class="queryPanel">
<form action="<c:url value="/pages/Torganization/list.do"/>" method="get" style="display: inline;">
<fieldset>
	<legend>搜索</legend>
	<table>
		<tr>	
			<td class="tdLabel">
					<%=Torganization.ALIAS_NAME%>
			</td>		
			<td>
				<input value="${pageRequest.filters.name}"  name="s_name"  />
			</td>
			<td class="tdLabel">
					<%=Torganization.ALIAS_SN%>
			</td>		
			<td>
				<input value="${pageRequest.filters.sn}"  name="s_sn"  />
			</td>
			<td class="tdLabel">
					<%=Torganization.ALIAS_DESCRIPTION%>
			</td>		
			<td>
				<input value="${pageRequest.filters.description}"  name="s_description"  />
			</td>
			<td class="tdLabel">
					<%=Torganization.ALIAS_PID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.pid}"  name="s_pid"  />
			</td>
		</tr>	
	</table>
</fieldset>
<div class="handleControl">
	<input type="submit" class="stdButton" style="width:80px" value="查询" onclick="getReferenceForm(this).action='${ctx}/pages/Torganization/list.do'"/>
	<input type="submit" class="stdButton" style="width:80px" value="新增" onclick="getReferenceForm(this).action='${ctx}/pages/Torganization/create.do'"/>
	<input type="button" class="stdButton" style="width:80px" value="删除" onclick="batchDelete('${ctx}/pages/Torganization/delete.do','items',document.forms.ec)"/>
<div>
</form>
</div>

<ec:table items='page.result' var="item" method="get"
	retrieveRowsCallback="limit" sortRowsCallback="limit" filterRowsCallback="limit"
	action="${ctx}/pages/Torganization/list.do" autoIncludeParameters="true">
	<ec:row>
		<ec:column property="选择" title="<input type='checkbox' onclick=\"setAllCheckboxState('items',this.checked)\" >" sortable="false" width="3%" viewsAllowed="html">
			<input type="checkbox" name="items" value="id=${item.id}&"/>
		</ec:column>
		<ec:column property="name"  title="<%=Torganization.ALIAS_NAME%>"/>
		<ec:column property="sn"  title="<%=Torganization.ALIAS_SN%>"/>
		<ec:column property="description"  title="<%=Torganization.ALIAS_DESCRIPTION%>"/>
		<ec:column property="pid"  title="<%=Torganization.ALIAS_PID%>"/>
		<ec:column property="操作" title="操作" sortable="false" viewsAllowed="html">
			<a href="${ctx}/pages/Torganization/show.do?id=${item.id}&">查看</a>&nbsp;&nbsp;&nbsp;
			<a href="${ctx}/pages/Torganization/edit.do?id=${item.id}&">修改</a>
		</ec:column>
	</ec:row>
</ec:table>

</body>

</html>

