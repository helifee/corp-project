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
	<title><%=PerPostionUser.TABLE_ALIAS%> 维护</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<div class="queryPanel">
<form action="<c:url value="/pages/PerPostionUser/list.do"/>" method="get" style="display: inline;">
<fieldset>
	<legend>搜索</legend>
	<table>
		<tr>	
			<td class="tdLabel">
					<%=PerPostionUser.ALIAS_POSITION_ID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.positionId}"  name="s_positionId"  />
			</td>
			<td class="tdLabel">
					<%=PerPostionUser.ALIAS_EMP_ID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.empId}"  name="s_empId"  />
			</td>
			<td class="tdLabel">
					<%=PerPostionUser.ALIAS_UPDATETIME%>
			</td>		
			<td>
				<input value="${pageRequest.filters.updatetime}" onclick="WdatePicker({dateFmt:'<%=PerPostionUser.FORMAT_UPDATETIME%>'})"  name="s_updatetime"   />
			</td>
		</tr>	
	</table>
</fieldset>
<div class="handleControl">
	<input type="submit" class="stdButton" style="width:80px" value="查询" onclick="getReferenceForm(this).action='${ctx}/pages/PerPostionUser/list.do'"/>
	<input type="submit" class="stdButton" style="width:80px" value="新增" onclick="getReferenceForm(this).action='${ctx}/pages/PerPostionUser/create.do'"/>
	<input type="button" class="stdButton" style="width:80px" value="删除" onclick="batchDelete('${ctx}/pages/PerPostionUser/delete.do','items',document.forms.ec)"/>
<div>
</form>
</div>

<ec:table items='page.result' var="item" method="get"
	retrieveRowsCallback="limit" sortRowsCallback="limit" filterRowsCallback="limit"
	action="${ctx}/pages/PerPostionUser/list.do" autoIncludeParameters="true">
	<ec:row>
		<ec:column property="选择" title="<input type='checkbox' onclick=\"setAllCheckboxState('items',this.checked)\" >" sortable="false" width="3%" viewsAllowed="html">
			<input type="checkbox" name="items" value="positionId=${item.id.positionId}&empId=${item.id.empId}&"/>
		</ec:column>
		<ec:column property="positionId"  title="<%=PerPostionUser.ALIAS_POSITION_ID%>"/>
		<ec:column property="empId"  title="<%=PerPostionUser.ALIAS_EMP_ID%>"/>
		<ec:column property="updatetime" value="${item.updatetimeString}" title="<%=PerPostionUser.ALIAS_UPDATETIME%>"/>
		<ec:column property="操作" title="操作" sortable="false" viewsAllowed="html">
			<a href="${ctx}/pages/PerPostionUser/show.do?positionId=${item.id.positionId}&empId=${item.id.empId}&">查看</a>&nbsp;&nbsp;&nbsp;
			<a href="${ctx}/pages/PerPostionUser/edit.do?positionId=${item.id.positionId}&empId=${item.id.empId}&">修改</a>
		</ec:column>
	</ec:row>
</ec:table>

</body>

</html>

