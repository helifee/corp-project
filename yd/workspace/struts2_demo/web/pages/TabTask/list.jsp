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
	<title><%=TabTask.TABLE_ALIAS%> 维护</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<div class="queryPanel">
<form action="<c:url value="/pages/TabTask/list.do"/>" method="get" style="display: inline;">
<fieldset>
	<legend>搜索</legend>
	<table>
		<tr>	
			<td class="tdLabel">
					<%=TabTask.ALIAS_USERID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.userid}"  name="s_userid"  />
			</td>
			<td class="tdLabel">
					<%=TabTask.ALIAS_TASKFLAG%>
			</td>		
			<td>
				<input value="${pageRequest.filters.taskflag}"  name="s_taskflag"  />
			</td>
			<td class="tdLabel">
					<%=TabTask.ALIAS_TASKID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.taskid}"  name="s_taskid"  />
			</td>
			<td class="tdLabel">
					<%=TabTask.ALIAS_CONTENT%>
			</td>		
			<td>
				<input value="${pageRequest.filters.content}"  name="s_content"  />
			</td>
			<td class="tdLabel">
					<%=TabTask.ALIAS_LINK%>
			</td>		
			<td>
				<input value="${pageRequest.filters.link}"  name="s_link"  />
			</td>
		</tr>	
		<tr>	
			<td class="tdLabel">
					<%=TabTask.ALIAS_READFLAG%>
			</td>		
			<td>
				<input value="${pageRequest.filters.readflag}"  name="s_readflag"  />
			</td>
			<td class="tdLabel">
					<%=TabTask.ALIAS_CREATETIME%>
			</td>		
			<td>
				<input value="${pageRequest.filters.createtime}" onclick="WdatePicker({dateFmt:'<%=TabTask.FORMAT_CREATETIME%>'})"  name="s_createtime"   />
			</td>
			<td class="tdLabel">
					<%=TabTask.ALIAS_UPDATETIME%>
			</td>		
			<td>
				<input value="${pageRequest.filters.updatetime}" onclick="WdatePicker({dateFmt:'<%=TabTask.FORMAT_UPDATETIME%>'})"  name="s_updatetime"   />
			</td>
		</tr>	
	</table>
</fieldset>
<div class="handleControl">
	<input type="submit" class="stdButton" style="width:80px" value="查询" onclick="getReferenceForm(this).action='${ctx}/pages/TabTask/list.do'"/>
	<input type="submit" class="stdButton" style="width:80px" value="新增" onclick="getReferenceForm(this).action='${ctx}/pages/TabTask/create.do'"/>
	<input type="button" class="stdButton" style="width:80px" value="删除" onclick="batchDelete('${ctx}/pages/TabTask/delete.do','items',document.forms.ec)"/>
<div>
</form>
</div>

<ec:table items='page.result' var="item" method="get"
	retrieveRowsCallback="limit" sortRowsCallback="limit" filterRowsCallback="limit"
	action="${ctx}/pages/TabTask/list.do" autoIncludeParameters="true">
	<ec:row>
		<ec:column property="选择" title="<input type='checkbox' onclick=\"setAllCheckboxState('items',this.checked)\" >" sortable="false" width="3%" viewsAllowed="html">
			<input type="checkbox" name="items" value="userid=${item.id.userid}&taskflag=${item.id.taskflag}&taskid=${item.id.taskid}&"/>
		</ec:column>
		<ec:column property="userid"  title="<%=TabTask.ALIAS_USERID%>"/>
		<ec:column property="taskflag"  title="<%=TabTask.ALIAS_TASKFLAG%>"/>
		<ec:column property="taskid"  title="<%=TabTask.ALIAS_TASKID%>"/>
		<ec:column property="content"  title="<%=TabTask.ALIAS_CONTENT%>"/>
		<ec:column property="link"  title="<%=TabTask.ALIAS_LINK%>"/>
		<ec:column property="readflag"  title="<%=TabTask.ALIAS_READFLAG%>"/>
		<ec:column property="createtime" value="${item.createtimeString}" title="<%=TabTask.ALIAS_CREATETIME%>"/>
		<ec:column property="updatetime" value="${item.updatetimeString}" title="<%=TabTask.ALIAS_UPDATETIME%>"/>
		<ec:column property="操作" title="操作" sortable="false" viewsAllowed="html">
			<a href="${ctx}/pages/TabTask/show.do?userid=${item.id.userid}&taskflag=${item.id.taskflag}&taskid=${item.id.taskid}&">查看</a>&nbsp;&nbsp;&nbsp;
			<a href="${ctx}/pages/TabTask/edit.do?userid=${item.id.userid}&taskflag=${item.id.taskflag}&taskid=${item.id.taskid}&">修改</a>
		</ec:column>
	</ec:row>
</ec:table>

</body>

</html>

