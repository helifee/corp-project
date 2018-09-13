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
	<title><%=PerProjectUser.TABLE_ALIAS%> 维护</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<div class="queryPanel">
<form action="<c:url value="/pages/PerProjectUser/list.do"/>" method="get" style="display: inline;">
<fieldset>
	<legend>搜索</legend>
	<table>
		<tr>	
			<td class="tdLabel">
					<%=PerProjectUser.ALIAS_PRO_ID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.proId}"  name="s_proId"  />
			</td>
			<td class="tdLabel">
					<%=PerProjectUser.ALIAS_USER_ID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.userId}"  name="s_userId"  />
			</td>
			<td class="tdLabel">
					<%=PerProjectUser.ALIAS_JOB_FLAG%>
			</td>		
			<td>
				<input value="${pageRequest.filters.jobFlag}"  name="s_jobFlag"  />
			</td>
			<td class="tdLabel">
					<%=PerProjectUser.ALIAS_STA_DATE%>
			</td>		
			<td>
				<input value="${pageRequest.filters.staDate}" onclick="WdatePicker({dateFmt:'<%=PerProjectUser.FORMAT_STA_DATE%>'})"  name="s_staDate"   />
			</td>
			<td class="tdLabel">
					<%=PerProjectUser.ALIAS_END_DATE%>
			</td>		
			<td>
				<input value="${pageRequest.filters.endDate}" onclick="WdatePicker({dateFmt:'<%=PerProjectUser.FORMAT_END_DATE%>'})"  name="s_endDate"   />
			</td>
		</tr>	
		<tr>	
			<td class="tdLabel">
					<%=PerProjectUser.ALIAS_OPERATOR%>
			</td>		
			<td>
				<input value="${pageRequest.filters.operator}"  name="s_operator"  />
			</td>
			<td class="tdLabel">
					<%=PerProjectUser.ALIAS_UPDATETIME%>
			</td>		
			<td>
				<input value="${pageRequest.filters.updatetime}" onclick="WdatePicker({dateFmt:'<%=PerProjectUser.FORMAT_UPDATETIME%>'})"  name="s_updatetime"   />
			</td>
		</tr>	
	</table>
</fieldset>
<div class="handleControl">
	<input type="submit" class="stdButton" style="width:80px" value="查询" onclick="getReferenceForm(this).action='${ctx}/pages/PerProjectUser/list.do'"/>
	<input type="submit" class="stdButton" style="width:80px" value="新增" onclick="getReferenceForm(this).action='${ctx}/pages/PerProjectUser/create.do'"/>
	<input type="button" class="stdButton" style="width:80px" value="删除" onclick="batchDelete('${ctx}/pages/PerProjectUser/delete.do','items',document.forms.ec)"/>
<div>
</form>
</div>

<ec:table items='page.result' var="item" method="get"
	retrieveRowsCallback="limit" sortRowsCallback="limit" filterRowsCallback="limit"
	action="${ctx}/pages/PerProjectUser/list.do" autoIncludeParameters="true">
	<ec:row>
		<ec:column property="选择" title="<input type='checkbox' onclick=\"setAllCheckboxState('items',this.checked)\" >" sortable="false" width="3%" viewsAllowed="html">
			<input type="checkbox" name="items" value="proId=${item.id.proId}&userId=${item.id.userId}&staDate=${item.id.staDate}&"/>
		</ec:column>
		<ec:column property="proId"  title="<%=PerProjectUser.ALIAS_PRO_ID%>"/>
		<ec:column property="userId"  title="<%=PerProjectUser.ALIAS_USER_ID%>"/>
		<ec:column property="jobFlag"  title="<%=PerProjectUser.ALIAS_JOB_FLAG%>"/>
		<ec:column property="staDate" value="${item.staDateString}" title="<%=PerProjectUser.ALIAS_STA_DATE%>"/>
		<ec:column property="endDate" value="${item.endDateString}" title="<%=PerProjectUser.ALIAS_END_DATE%>"/>
		<ec:column property="operator"  title="<%=PerProjectUser.ALIAS_OPERATOR%>"/>
		<ec:column property="updatetime" value="${item.updatetimeString}" title="<%=PerProjectUser.ALIAS_UPDATETIME%>"/>
		<ec:column property="操作" title="操作" sortable="false" viewsAllowed="html">
			<a href="${ctx}/pages/PerProjectUser/show.do?proId=${item.id.proId}&userId=${item.id.userId}&staDate=${item.id.staDate}&">查看</a>&nbsp;&nbsp;&nbsp;
			<a href="${ctx}/pages/PerProjectUser/edit.do?proId=${item.id.proId}&userId=${item.id.userId}&staDate=${item.id.staDate}&">修改</a>
		</ec:column>
	</ec:row>
</ec:table>

</body>

</html>

