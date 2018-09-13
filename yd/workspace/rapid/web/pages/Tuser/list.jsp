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
	<title><%=Tuser.TABLE_ALIAS%> 维护</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<div class="queryPanel">
<form action="<c:url value="/pages/Tuser/list.do"/>" method="get" style="display: inline;">
<fieldset>
	<legend>搜索</legend>
	<table>
		<tr>	
			<td class="tdLabel">
					<%=Tuser.ALIAS_USERNAME%>
			</td>		
			<td>
				<input value="${pageRequest.filters.username}"  name="s_username"  />
			</td>
			<td class="tdLabel">
					<%=Tuser.ALIAS_PASSWORD%>
			</td>		
			<td>
				<input value="${pageRequest.filters.password}"  name="s_password"  />
			</td>
			<td class="tdLabel">
					<%=Tuser.ALIAS_CREATE_TIME%>
			</td>		
			<td>
				<input value="${pageRequest.filters.createTime}" onclick="WdatePicker({dateFmt:'<%=Tuser.FORMAT_CREATE_TIME%>'})"  name="s_createTime"   />
			</td>
			<td class="tdLabel">
					<%=Tuser.ALIAS_EXPIRE_TIME%>
			</td>		
			<td>
				<input value="${pageRequest.filters.expireTime}" onclick="WdatePicker({dateFmt:'<%=Tuser.FORMAT_EXPIRE_TIME%>'})"  name="s_expireTime"   />
			</td>
		</tr>	
		<tr>	
			<td class="tdLabel">
					<%=Tuser.ALIAS_PERSON%>
			</td>		
			<td>
				<input value="${pageRequest.filters.person}"  name="s_person"  />
			</td>
		</tr>	
	</table>
</fieldset>
<div class="handleControl">
	<input type="submit" class="stdButton" style="width:80px" value="查询" onclick="getReferenceForm(this).action='${ctx}/pages/Tuser/list.do'"/>
	<input type="submit" class="stdButton" style="width:80px" value="新增" onclick="getReferenceForm(this).action='${ctx}/pages/Tuser/create.do'"/>
	<input type="button" class="stdButton" style="width:80px" value="删除" onclick="batchDelete('${ctx}/pages/Tuser/delete.do','items',document.forms.ec)"/>
<div>
</form>
</div>

<ec:table items='page.result' var="item" method="get"
	retrieveRowsCallback="limit" sortRowsCallback="limit" filterRowsCallback="limit"
	action="${ctx}/pages/Tuser/list.do" autoIncludeParameters="true">
	<ec:row>
		<ec:column property="选择" title="<input type='checkbox' onclick=\"setAllCheckboxState('items',this.checked)\" >" sortable="false" width="3%" viewsAllowed="html">
			<input type="checkbox" name="items" value="id=${item.id}&"/>
		</ec:column>
		<ec:column property="username"  title="<%=Tuser.ALIAS_USERNAME%>"/>
		<ec:column property="password"  title="<%=Tuser.ALIAS_PASSWORD%>"/>
		<ec:column property="createTime" value="${item.createTimeString}" title="<%=Tuser.ALIAS_CREATE_TIME%>"/>
		<ec:column property="expireTime" value="${item.expireTimeString}" title="<%=Tuser.ALIAS_EXPIRE_TIME%>"/>
		<ec:column property="person"  title="<%=Tuser.ALIAS_PERSON%>"/>
		<ec:column property="操作" title="操作" sortable="false" viewsAllowed="html">
			<a href="${ctx}/pages/Tuser/show.do?id=${item.id}&">查看</a>&nbsp;&nbsp;&nbsp;
			<a href="${ctx}/pages/Tuser/edit.do?id=${item.id}&">修改</a>
		</ec:column>
	</ec:row>
</ec:table>

</body>

</html>

