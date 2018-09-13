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
	<title><%=TabMcyl.TABLE_ALIAS%> 维护</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<div class="queryPanel">
<form action="<c:url value="/pages/TabMcyl/list.do"/>" method="get" style="display: inline;">
<fieldset>
	<legend>搜索</legend>
	<table>
		<tr>	
			<td class="tdLabel">
					<%=TabMcyl.ALIAS_JNID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.jnid}"  name="s_jnid"  />
			</td>
			<td class="tdLabel">
					<%=TabMcyl.ALIAS_HMID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.hmid}"  name="s_hmid"  />
			</td>
			<td class="tdLabel">
					<%=TabMcyl.ALIAS_XMID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.xmid}"  name="s_xmid"  />
			</td>
			<td class="tdLabel">
					<%=TabMcyl.ALIAS_XMSX%>
			</td>		
			<td>
				<input value="${pageRequest.filters.xmsx}"  name="s_xmsx"  />
			</td>
			<td class="tdLabel">
					<%=TabMcyl.ALIAS_XMMC%>
			</td>		
			<td>
				<input value="${pageRequest.filters.xmmc}"  name="s_xmmc"  />
			</td>
		</tr>	
		<tr>	
			<td class="tdLabel">
					<%=TabMcyl.ALIAS_SCQF%>
			</td>		
			<td>
				<input value="${pageRequest.filters.scqf}"  name="s_scqf"  />
			</td>
			<td class="tdLabel">
					<%=TabMcyl.ALIAS_UPDATETIME%>
			</td>		
			<td>
				<input value="${pageRequest.filters.updatetime}" onclick="WdatePicker({dateFmt:'<%=TabMcyl.FORMAT_UPDATETIME%>'})"  name="s_updatetime"   />
			</td>
		</tr>	
	</table>
</fieldset>
<div class="handleControl">
	<input type="submit" class="stdButton" style="width:80px" value="查询" onclick="getReferenceForm(this).action='${ctx}/pages/TabMcyl/list.do'"/>
	<input type="submit" class="stdButton" style="width:80px" value="新增" onclick="getReferenceForm(this).action='${ctx}/pages/TabMcyl/create.do'"/>
	<input type="button" class="stdButton" style="width:80px" value="删除" onclick="batchDelete('${ctx}/pages/TabMcyl/delete.do','items',document.forms.ec)"/>
<div>
</form>
</div>

<ec:table items='page.result' var="item" method="get"
	retrieveRowsCallback="limit" sortRowsCallback="limit" filterRowsCallback="limit"
	action="${ctx}/pages/TabMcyl/list.do" autoIncludeParameters="true">
	<ec:row>
		<ec:column property="选择" title="<input type='checkbox' onclick=\"setAllCheckboxState('items',this.checked)\" >" sortable="false" width="3%" viewsAllowed="html">
			<input type="checkbox" name="items" value="jnid=${item.id.jnid}&hmid=${item.id.hmid}&xmid=${item.id.xmid}&xmsx=${item.id.xmsx}&"/>
		</ec:column>
		<ec:column property="jnid"  title="<%=TabMcyl.ALIAS_JNID%>"/>
		<ec:column property="hmid"  title="<%=TabMcyl.ALIAS_HMID%>"/>
		<ec:column property="xmid"  title="<%=TabMcyl.ALIAS_XMID%>"/>
		<ec:column property="xmsx"  title="<%=TabMcyl.ALIAS_XMSX%>"/>
		<ec:column property="xmmc"  title="<%=TabMcyl.ALIAS_XMMC%>"/>
		<ec:column property="scqf"  title="<%=TabMcyl.ALIAS_SCQF%>"/>
		<ec:column property="updatetime" value="${item.updatetimeString}" title="<%=TabMcyl.ALIAS_UPDATETIME%>"/>
		<ec:column property="操作" title="操作" sortable="false" viewsAllowed="html">
			<a href="${ctx}/pages/TabMcyl/show.do?jnid=${item.id.jnid}&hmid=${item.id.hmid}&xmid=${item.id.xmid}&xmsx=${item.id.xmsx}&">查看</a>&nbsp;&nbsp;&nbsp;
			<a href="${ctx}/pages/TabMcyl/edit.do?jnid=${item.id.jnid}&hmid=${item.id.hmid}&xmid=${item.id.xmid}&xmsx=${item.id.xmsx}&">修改</a>
		</ec:column>
	</ec:row>
</ec:table>

</body>

</html>

