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
	<title><%=PerPermit.TABLE_ALIAS%> 维护</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<div class="queryPanel">
<form action="<c:url value="/pages/PerPermit/list.do"/>" method="get" style="display: inline;">
<fieldset>
	<legend>搜索</legend>
	<table>
		<tr>	
			<td class="tdLabel">
					<%=PerPermit.ALIAS_NAMESPACE%>
			</td>		
			<td>
				<input value="${pageRequest.filters.namespace}"  name="s_namespace"  />
			</td>
			<td class="tdLabel">
					<%=PerPermit.ALIAS_ACTION_NAME%>
			</td>		
			<td>
				<input value="${pageRequest.filters.actionName}"  name="s_actionName"  />
			</td>
			<td class="tdLabel">
					<%=PerPermit.ALIAS_IS_MODULE%>
			</td>		
			<td>
				<input value="${pageRequest.filters.isModule}"  name="s_isModule"  />
			</td>
			<td class="tdLabel">
					<%=PerPermit.ALIAS_MODULE_NAME%>
			</td>		
			<td>
				<input value="${pageRequest.filters.moduleName}"  name="s_moduleName"  />
			</td>
		</tr>	
		<tr>	
			<td class="tdLabel">
					<%=PerPermit.ALIAS_PARENT_MODULE%>
			</td>		
			<td>
				<input value="${pageRequest.filters.parentModule}"  name="s_parentModule"  />
			</td>
			<td class="tdLabel">
					<%=PerPermit.ALIAS_DISP_SEQ%>
			</td>		
			<td>
				<input value="${pageRequest.filters.dispSeq}"  name="s_dispSeq"  />
			</td>
			<td class="tdLabel">
					<%=PerPermit.ALIAS_IS_MENU%>
			</td>		
			<td>
				<input value="${pageRequest.filters.isMenu}"  name="s_isMenu"  />
			</td>
			<td class="tdLabel">
					<%=PerPermit.ALIAS_DESCRIPTION%>
			</td>		
			<td>
				<input value="${pageRequest.filters.description}"  name="s_description"  />
			</td>
		</tr>	
	</table>
</fieldset>
<div class="handleControl">
	<input type="submit" class="stdButton" style="width:80px" value="查询" onclick="getReferenceForm(this).action='${ctx}/pages/PerPermit/list.do'"/>
	<input type="submit" class="stdButton" style="width:80px" value="新增" onclick="getReferenceForm(this).action='${ctx}/pages/PerPermit/create.do'"/>
	<input type="button" class="stdButton" style="width:80px" value="删除" onclick="batchDelete('${ctx}/pages/PerPermit/delete.do','items',document.forms.ec)"/>
<div>
</form>
</div>

<ec:table items='page.result' var="item" method="get"
	retrieveRowsCallback="limit" sortRowsCallback="limit" filterRowsCallback="limit"
	action="${ctx}/pages/PerPermit/list.do" autoIncludeParameters="true">
	<ec:row>
		<ec:column property="选择" title="<input type='checkbox' onclick=\"setAllCheckboxState('items',this.checked)\" >" sortable="false" width="3%" viewsAllowed="html">
			<input type="checkbox" name="items" value="permitId=${item.permitId}&"/>
		</ec:column>
		<ec:column property="namespace"  title="<%=PerPermit.ALIAS_NAMESPACE%>"/>
		<ec:column property="actionName"  title="<%=PerPermit.ALIAS_ACTION_NAME%>"/>
		<ec:column property="isModule"  title="<%=PerPermit.ALIAS_IS_MODULE%>"/>
		<ec:column property="moduleName"  title="<%=PerPermit.ALIAS_MODULE_NAME%>"/>
		<ec:column property="parentModule"  title="<%=PerPermit.ALIAS_PARENT_MODULE%>"/>
		<ec:column property="dispSeq"  title="<%=PerPermit.ALIAS_DISP_SEQ%>"/>
		<ec:column property="isMenu"  title="<%=PerPermit.ALIAS_IS_MENU%>"/>
		<ec:column property="description"  title="<%=PerPermit.ALIAS_DESCRIPTION%>"/>
		<ec:column property="操作" title="操作" sortable="false" viewsAllowed="html">
			<a href="${ctx}/pages/PerPermit/show.do?permitId=${item.permitId}&">查看</a>&nbsp;&nbsp;&nbsp;
			<a href="${ctx}/pages/PerPermit/edit.do?permitId=${item.permitId}&">修改</a>
		</ec:column>
	</ec:row>
</ec:table>

</body>

</html>

