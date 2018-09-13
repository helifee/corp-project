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
	<title><%=PerDepartment.TABLE_ALIAS%> 维护</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<div class="queryPanel">
<form action="<c:url value="/pages/PerDepartment/list.do"/>" method="get" style="display: inline;">
<fieldset>
	<legend>搜索</legend>
	<table>
		<tr>	
			<td class="tdLabel">
					<%=PerDepartment.ALIAS_DEPT_NM%>
			</td>		
			<td>
				<input value="${pageRequest.filters.deptNm}"  name="s_deptNm"  />
			</td>
			<td class="tdLabel">
					<%=PerDepartment.ALIAS_PARENT_DEPT_ID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.parentDeptId}"  name="s_parentDeptId"  />
			</td>
			<td class="tdLabel">
					<%=PerDepartment.ALIAS_COMPANY_ID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.companyId}"  name="s_companyId"  />
			</td>
			<td class="tdLabel">
					<%=PerDepartment.ALIAS_DEPT_DESC%>
			</td>		
			<td>
				<input value="${pageRequest.filters.deptDesc}"  name="s_deptDesc"  />
			</td>
		</tr>	
		<tr>	
			<td class="tdLabel">
					<%=PerDepartment.ALIAS_DEPT_ROOM%>
			</td>		
			<td>
				<input value="${pageRequest.filters.deptRoom}"  name="s_deptRoom"  />
			</td>
			<td class="tdLabel">
					<%=PerDepartment.ALIAS_LEADER_ID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.leaderId}"  name="s_leaderId"  />
			</td>
			<td class="tdLabel">
					<%=PerDepartment.ALIAS_LEADER_TEL%>
			</td>		
			<td>
				<input value="${pageRequest.filters.leaderTel}"  name="s_leaderTel"  />
			</td>
			<td class="tdLabel">
					<%=PerDepartment.ALIAS_UPDATETIME%>
			</td>		
			<td>
				<input value="${pageRequest.filters.updatetime}" onclick="WdatePicker({dateFmt:'<%=PerDepartment.FORMAT_UPDATETIME%>'})"  name="s_updatetime"   />
			</td>
		</tr>	
	</table>
</fieldset>
<div class="handleControl">
	<input type="submit" class="stdButton" style="width:80px" value="查询" onclick="getReferenceForm(this).action='${ctx}/pages/PerDepartment/list.do'"/>
	<input type="submit" class="stdButton" style="width:80px" value="新增" onclick="getReferenceForm(this).action='${ctx}/pages/PerDepartment/create.do'"/>
	<input type="button" class="stdButton" style="width:80px" value="删除" onclick="batchDelete('${ctx}/pages/PerDepartment/delete.do','items',document.forms.ec)"/>
<div>
</form>
</div>

<ec:table items='page.result' var="item" method="get"
	retrieveRowsCallback="limit" sortRowsCallback="limit" filterRowsCallback="limit"
	action="${ctx}/pages/PerDepartment/list.do" autoIncludeParameters="true">
	<ec:row>
		<ec:column property="选择" title="<input type='checkbox' onclick=\"setAllCheckboxState('items',this.checked)\" >" sortable="false" width="3%" viewsAllowed="html">
			<input type="checkbox" name="items" value="deptId=${item.deptId}&"/>
		</ec:column>
		<ec:column property="deptNm"  title="<%=PerDepartment.ALIAS_DEPT_NM%>"/>
		<ec:column property="parentDeptId"  title="<%=PerDepartment.ALIAS_PARENT_DEPT_ID%>"/>
		<ec:column property="companyId"  title="<%=PerDepartment.ALIAS_COMPANY_ID%>"/>
		<ec:column property="deptDesc"  title="<%=PerDepartment.ALIAS_DEPT_DESC%>"/>
		<ec:column property="deptRoom"  title="<%=PerDepartment.ALIAS_DEPT_ROOM%>"/>
		<ec:column property="leaderId"  title="<%=PerDepartment.ALIAS_LEADER_ID%>"/>
		<ec:column property="leaderTel"  title="<%=PerDepartment.ALIAS_LEADER_TEL%>"/>
		<ec:column property="updatetime" value="${item.updatetimeString}" title="<%=PerDepartment.ALIAS_UPDATETIME%>"/>
		<ec:column property="操作" title="操作" sortable="false" viewsAllowed="html">
			<a href="${ctx}/pages/PerDepartment/show.do?deptId=${item.deptId}&">查看</a>&nbsp;&nbsp;&nbsp;
			<a href="${ctx}/pages/PerDepartment/edit.do?deptId=${item.deptId}&">修改</a>
		</ec:column>
	</ec:row>
</ec:table>

</body>

</html>

