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
	<title><%=PerPosition.TABLE_ALIAS%> 维护</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<div class="queryPanel">
<form action="<c:url value="/pages/PerPosition/list.do"/>" method="get" style="display: inline;">
<fieldset>
	<legend>搜索</legend>
	<table>
		<tr>	
			<td class="tdLabel">
					<%=PerPosition.ALIAS_POS_NAME%>
			</td>		
			<td>
				<input value="${pageRequest.filters.posName}"  name="s_posName"  />
			</td>
			<td class="tdLabel">
					<%=PerPosition.ALIAS_POS_DESC%>
			</td>		
			<td>
				<input value="${pageRequest.filters.posDesc}"  name="s_posDesc"  />
			</td>
			<td class="tdLabel">
					<%=PerPosition.ALIAS_POS_LEVEL%>
			</td>		
			<td>
				<input value="${pageRequest.filters.posLevel}"  name="s_posLevel"  />
			</td>
			<td class="tdLabel">
					<%=PerPosition.ALIAS_POS_MODE%>
			</td>		
			<td>
				<input value="${pageRequest.filters.posMode}"  name="s_posMode"  />
			</td>
		</tr>	
		<tr>	
			<td class="tdLabel">
					<%=PerPosition.ALIAS_PARENT_POS%>
			</td>		
			<td>
				<input value="${pageRequest.filters.parentPos}"  name="s_parentPos"  />
			</td>
			<td class="tdLabel">
					<%=PerPosition.ALIAS_UPDATETIME%>
			</td>		
			<td>
				<input value="${pageRequest.filters.updatetime}" onclick="WdatePicker({dateFmt:'<%=PerPosition.FORMAT_UPDATETIME%>'})"  name="s_updatetime"   />
			</td>
		</tr>	
	</table>
</fieldset>
<div class="handleControl">
	<input type="submit" class="stdButton" style="width:80px" value="查询" onclick="getReferenceForm(this).action='${ctx}/pages/PerPosition/list.do'"/>
	<input type="submit" class="stdButton" style="width:80px" value="新增" onclick="getReferenceForm(this).action='${ctx}/pages/PerPosition/create.do'"/>
	<input type="button" class="stdButton" style="width:80px" value="删除" onclick="batchDelete('${ctx}/pages/PerPosition/delete.do','items',document.forms.ec)"/>
<div>
</form>
</div>

<ec:table items='page.result' var="item" method="get"
	retrieveRowsCallback="limit" sortRowsCallback="limit" filterRowsCallback="limit"
	action="${ctx}/pages/PerPosition/list.do" autoIncludeParameters="true">
	<ec:row>
		<ec:column property="选择" title="<input type='checkbox' onclick=\"setAllCheckboxState('items',this.checked)\" >" sortable="false" width="3%" viewsAllowed="html">
			<input type="checkbox" name="items" value="posId=${item.posId}&"/>
		</ec:column>
		<ec:column property="posName"  title="<%=PerPosition.ALIAS_POS_NAME%>"/>
		<ec:column property="posDesc"  title="<%=PerPosition.ALIAS_POS_DESC%>"/>
		<ec:column property="posLevel"  title="<%=PerPosition.ALIAS_POS_LEVEL%>"/>
		<ec:column property="posMode"  title="<%=PerPosition.ALIAS_POS_MODE%>"/>
		<ec:column property="parentPos"  title="<%=PerPosition.ALIAS_PARENT_POS%>"/>
		<ec:column property="updatetime" value="${item.updatetimeString}" title="<%=PerPosition.ALIAS_UPDATETIME%>"/>
		<ec:column property="操作" title="操作" sortable="false" viewsAllowed="html">
			<a href="${ctx}/pages/PerPosition/show.do?posId=${item.posId}&">查看</a>&nbsp;&nbsp;&nbsp;
			<a href="${ctx}/pages/PerPosition/edit.do?posId=${item.posId}&">修改</a>
		</ec:column>
	</ec:row>
</ec:table>

</body>

</html>

