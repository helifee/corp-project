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
	<title><%=PerModuleOld.TABLE_ALIAS%> 维护</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<div class="queryPanel">
<form action="<c:url value="/pages/PerModuleOld/list.do"/>" method="get" style="display: inline;">
<fieldset>
	<legend>搜索</legend>
	<table>
		<tr>	
			<td class="tdLabel">
					<%=PerModuleOld.ALIAS_MODULE_NAME%>
			</td>		
			<td>
				<input value="${pageRequest.filters.moduleName}"  name="s_moduleName"  />
			</td>
			<td class="tdLabel">
					<%=PerModuleOld.ALIAS_MODULE_VALUE%>
			</td>		
			<td>
				<input value="${pageRequest.filters.moduleValue}"  name="s_moduleValue"  />
			</td>
			<td class="tdLabel">
					<%=PerModuleOld.ALIAS_LINK_URL%>
			</td>		
			<td>
				<input value="${pageRequest.filters.linkUrl}"  name="s_linkUrl"  />
			</td>
			<td class="tdLabel">
					<%=PerModuleOld.ALIAS_PARENT_MODULE%>
			</td>		
			<td>
				<input value="${pageRequest.filters.parentModule}"  name="s_parentModule"  />
			</td>
		</tr>	
		<tr>	
			<td class="tdLabel">
					<%=PerModuleOld.ALIAS_MODULE_DESC%>
			</td>		
			<td>
				<input value="${pageRequest.filters.moduleDesc}"  name="s_moduleDesc"  />
			</td>
		</tr>	
	</table>
</fieldset>
<div class="handleControl">
	<input type="submit" class="stdButton" style="width:80px" value="查询" onclick="getReferenceForm(this).action='${ctx}/pages/PerModuleOld/list.do'"/>
	<input type="submit" class="stdButton" style="width:80px" value="新增" onclick="getReferenceForm(this).action='${ctx}/pages/PerModuleOld/create.do'"/>
	<input type="button" class="stdButton" style="width:80px" value="删除" onclick="batchDelete('${ctx}/pages/PerModuleOld/delete.do','items',document.forms.ec)"/>
<div>
</form>
</div>

<ec:table items='page.result' var="item" method="get"
	retrieveRowsCallback="limit" sortRowsCallback="limit" filterRowsCallback="limit"
	action="${ctx}/pages/PerModuleOld/list.do" autoIncludeParameters="true">
	<ec:row>
		<ec:column property="选择" title="<input type='checkbox' onclick=\"setAllCheckboxState('items',this.checked)\" >" sortable="false" width="3%" viewsAllowed="html">
			<input type="checkbox" name="items" value="moduleId=${item.moduleId}&"/>
		</ec:column>
		<ec:column property="moduleName"  title="<%=PerModuleOld.ALIAS_MODULE_NAME%>"/>
		<ec:column property="moduleValue"  title="<%=PerModuleOld.ALIAS_MODULE_VALUE%>"/>
		<ec:column property="linkUrl"  title="<%=PerModuleOld.ALIAS_LINK_URL%>"/>
		<ec:column property="parentModule"  title="<%=PerModuleOld.ALIAS_PARENT_MODULE%>"/>
		<ec:column property="moduleDesc"  title="<%=PerModuleOld.ALIAS_MODULE_DESC%>"/>
		<ec:column property="操作" title="操作" sortable="false" viewsAllowed="html">
			<a href="${ctx}/pages/PerModuleOld/show.do?moduleId=${item.moduleId}&">查看</a>&nbsp;&nbsp;&nbsp;
			<a href="${ctx}/pages/PerModuleOld/edit.do?moduleId=${item.moduleId}&">修改</a>
		</ec:column>
	</ec:row>
</ec:table>

</body>

</html>

