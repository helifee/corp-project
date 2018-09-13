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
	<title><%=Pjpginfo.TABLE_ALIAS%> 维护</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<div class="queryPanel">
<form action="<c:url value="/pages/Pjpginfo/list.do"/>" method="get" style="display: inline;">
<fieldset>
	<legend>搜索</legend>
	<table>
		<tr>	
			<td class="tdLabel">
					<%=Pjpginfo.ALIAS_USERID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.userid}"  name="s_userid"  />
			</td>
			<td class="tdLabel">
					<%=Pjpginfo.ALIAS_PROJECTID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.projectid}"  name="s_projectid"  />
			</td>
			<td class="tdLabel">
					<%=Pjpginfo.ALIAS_INTIMESTP%>
			</td>		
			<td>
				<input value="${pageRequest.filters.intimestp}"  name="s_intimestp"  />
			</td>
			<td class="tdLabel">
					<%=Pjpginfo.ALIAS_UPTIMESTP%>
			</td>		
			<td>
				<input value="${pageRequest.filters.uptimestp}"  name="s_uptimestp"  />
			</td>
			<td class="tdLabel">
					<%=Pjpginfo.ALIAS_CANCELFLAG%>
			</td>		
			<td>
				<input value="${pageRequest.filters.cancelflag}"  name="s_cancelflag"  />
			</td>
		</tr>	
	</table>
</fieldset>
<div class="handleControl">
	<input type="submit" class="stdButton" style="width:80px" value="查询" onclick="getReferenceForm(this).action='${ctx}/pages/Pjpginfo/list.do'"/>
	<input type="submit" class="stdButton" style="width:80px" value="新增" onclick="getReferenceForm(this).action='${ctx}/pages/Pjpginfo/create.do'"/>
	<input type="button" class="stdButton" style="width:80px" value="删除" onclick="batchDelete('${ctx}/pages/Pjpginfo/delete.do','items',document.forms.ec)"/>
<div>
</form>
</div>

<ec:table items='page.result' var="item" method="get"
	retrieveRowsCallback="limit" sortRowsCallback="limit" filterRowsCallback="limit"
	action="${ctx}/pages/Pjpginfo/list.do" autoIncludeParameters="true">
	<ec:row>
		<ec:column property="选择" title="<input type='checkbox' onclick=\"setAllCheckboxState('items',this.checked)\" >" sortable="false" width="3%" viewsAllowed="html">
			<input type="checkbox" name="items" value="userid=${item.id.userid}&projectid=${item.id.projectid}&"/>
		</ec:column>
		<ec:column property="userid"  title="<%=Pjpginfo.ALIAS_USERID%>"/>
		<ec:column property="projectid"  title="<%=Pjpginfo.ALIAS_PROJECTID%>"/>
		<ec:column property="intimestp"  title="<%=Pjpginfo.ALIAS_INTIMESTP%>"/>
		<ec:column property="uptimestp"  title="<%=Pjpginfo.ALIAS_UPTIMESTP%>"/>
		<ec:column property="cancelflag"  title="<%=Pjpginfo.ALIAS_CANCELFLAG%>"/>
		<ec:column property="操作" title="操作" sortable="false" viewsAllowed="html">
			<a href="${ctx}/pages/Pjpginfo/show.do?userid=${item.id.userid}&projectid=${item.id.projectid}&">查看</a>&nbsp;&nbsp;&nbsp;
			<a href="${ctx}/pages/Pjpginfo/edit.do?userid=${item.id.userid}&projectid=${item.id.projectid}&">修改</a>
		</ec:column>
	</ec:row>
</ec:table>

</body>

</html>

