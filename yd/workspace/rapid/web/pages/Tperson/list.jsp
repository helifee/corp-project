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
	<title><%=Tperson.TABLE_ALIAS%> 维护</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<div class="queryPanel">
<form action="<c:url value="/pages/Tperson/list.do"/>" method="get" style="display: inline;">
<fieldset>
	<legend>搜索</legend>
	<table>
		<tr>	
			<td class="tdLabel">
					<%=Tperson.ALIAS_NAME%>
			</td>		
			<td>
				<input value="${pageRequest.filters.name}"  name="s_name"  />
			</td>
			<td class="tdLabel">
					<%=Tperson.ALIAS_SEX%>
			</td>		
			<td>
				<input value="${pageRequest.filters.sex}"  name="s_sex"  />
			</td>
			<td class="tdLabel">
					<%=Tperson.ALIAS_ADDRESS%>
			</td>		
			<td>
				<input value="${pageRequest.filters.address}"  name="s_address"  />
			</td>
			<td class="tdLabel">
					<%=Tperson.ALIAS_DUTY%>
			</td>		
			<td>
				<input value="${pageRequest.filters.duty}"  name="s_duty"  />
			</td>
		</tr>	
		<tr>	
			<td class="tdLabel">
					<%=Tperson.ALIAS_PHONE%>
			</td>		
			<td>
				<input value="${pageRequest.filters.phone}"  name="s_phone"  />
			</td>
			<td class="tdLabel">
					<%=Tperson.ALIAS_DESCRIPTION%>
			</td>		
			<td>
				<input value="${pageRequest.filters.description}"  name="s_description"  />
			</td>
			<td class="tdLabel">
					<%=Tperson.ALIAS_ORG%>
			</td>		
			<td>
				<input value="${pageRequest.filters.org}"  name="s_org"  />
			</td>
		</tr>	
	</table>
</fieldset>
<div class="handleControl">
	<input type="submit" class="stdButton" style="width:80px" value="查询" onclick="getReferenceForm(this).action='${ctx}/pages/Tperson/list.do'"/>
	<input type="submit" class="stdButton" style="width:80px" value="新增" onclick="getReferenceForm(this).action='${ctx}/pages/Tperson/create.do'"/>
	<input type="button" class="stdButton" style="width:80px" value="删除" onclick="batchDelete('${ctx}/pages/Tperson/delete.do','items',document.forms.ec)"/>
<div>
</form>
</div>

<ec:table items='page.result' var="item" method="get"
	retrieveRowsCallback="limit" sortRowsCallback="limit" filterRowsCallback="limit"
	action="${ctx}/pages/Tperson/list.do" autoIncludeParameters="true">
	<ec:row>
		<ec:column property="选择" title="<input type='checkbox' onclick=\"setAllCheckboxState('items',this.checked)\" >" sortable="false" width="3%" viewsAllowed="html">
			<input type="checkbox" name="items" value="id=${item.id}&"/>
		</ec:column>
		<ec:column property="name"  title="<%=Tperson.ALIAS_NAME%>"/>
		<ec:column property="sex"  title="<%=Tperson.ALIAS_SEX%>"/>
		<ec:column property="address"  title="<%=Tperson.ALIAS_ADDRESS%>"/>
		<ec:column property="duty"  title="<%=Tperson.ALIAS_DUTY%>"/>
		<ec:column property="phone"  title="<%=Tperson.ALIAS_PHONE%>"/>
		<ec:column property="description"  title="<%=Tperson.ALIAS_DESCRIPTION%>"/>
		<ec:column property="org"  title="<%=Tperson.ALIAS_ORG%>"/>
		<ec:column property="操作" title="操作" sortable="false" viewsAllowed="html">
			<a href="${ctx}/pages/Tperson/show.do?id=${item.id}&">查看</a>&nbsp;&nbsp;&nbsp;
			<a href="${ctx}/pages/Tperson/edit.do?id=${item.id}&">修改</a>
		</ec:column>
	</ec:row>
</ec:table>

</body>

</html>

