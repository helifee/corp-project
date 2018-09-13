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
	<title><%=Tacl.TABLE_ALIAS%> 维护</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<div class="queryPanel">
<form action="<c:url value="/pages/Tacl/list.do"/>" method="get" style="display: inline;">
<fieldset>
	<legend>搜索</legend>
	<table>
		<tr>	
			<td class="tdLabel">
					<%=Tacl.ALIAS_PRINCIPAL_TYPE%>
			</td>		
			<td>
				<input value="${pageRequest.filters.principalType}"  name="s_principalType"  />
			</td>
			<td class="tdLabel">
					<%=Tacl.ALIAS_PRINCIPAL_SN%>
			</td>		
			<td>
				<input value="${pageRequest.filters.principalSn}"  name="s_principalSn"  />
			</td>
			<td class="tdLabel">
					<%=Tacl.ALIAS_RESOURCE_SN%>
			</td>		
			<td>
				<input value="${pageRequest.filters.resourceSn}"  name="s_resourceSn"  />
			</td>
			<td class="tdLabel">
					<%=Tacl.ALIAS_ACL_STATE%>
			</td>		
			<td>
				<input value="${pageRequest.filters.aclState}"  name="s_aclState"  />
			</td>
		</tr>	
		<tr>	
			<td class="tdLabel">
					<%=Tacl.ALIAS_EXTENDS_STATE%>
			</td>		
			<td>
				<input value="${pageRequest.filters.extendsState}"  name="s_extendsState"  />
			</td>
		</tr>	
	</table>
</fieldset>
<div class="handleControl">
	<input type="submit" class="stdButton" style="width:80px" value="查询" onclick="getReferenceForm(this).action='${ctx}/pages/Tacl/list.do'"/>
	<input type="submit" class="stdButton" style="width:80px" value="新增" onclick="getReferenceForm(this).action='${ctx}/pages/Tacl/create.do'"/>
	<input type="button" class="stdButton" style="width:80px" value="删除" onclick="batchDelete('${ctx}/pages/Tacl/delete.do','items',document.forms.ec)"/>
<div>
</form>
</div>

<ec:table items='page.result' var="item" method="get"
	retrieveRowsCallback="limit" sortRowsCallback="limit" filterRowsCallback="limit"
	action="${ctx}/pages/Tacl/list.do" autoIncludeParameters="true">
	<ec:row>
		<ec:column property="选择" title="<input type='checkbox' onclick=\"setAllCheckboxState('items',this.checked)\" >" sortable="false" width="3%" viewsAllowed="html">
			<input type="checkbox" name="items" value="id=${item.id}&"/>
		</ec:column>
		<ec:column property="principalType"  title="<%=Tacl.ALIAS_PRINCIPAL_TYPE%>"/>
		<ec:column property="principalSn"  title="<%=Tacl.ALIAS_PRINCIPAL_SN%>"/>
		<ec:column property="resourceSn"  title="<%=Tacl.ALIAS_RESOURCE_SN%>"/>
		<ec:column property="aclState"  title="<%=Tacl.ALIAS_ACL_STATE%>"/>
		<ec:column property="extendsState"  title="<%=Tacl.ALIAS_EXTENDS_STATE%>"/>
		<ec:column property="操作" title="操作" sortable="false" viewsAllowed="html">
			<a href="${ctx}/pages/Tacl/show.do?id=${item.id}&">查看</a>&nbsp;&nbsp;&nbsp;
			<a href="${ctx}/pages/Tacl/edit.do?id=${item.id}&">修改</a>
		</ec:column>
	</ec:row>
</ec:table>

</body>

</html>

