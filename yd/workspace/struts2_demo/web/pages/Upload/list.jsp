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
	<title><%=Upload.TABLE_ALIAS%> 维护</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<div class="queryPanel">
<form action="<c:url value="/pages/Upload/list.do"/>" method="get" style="display: inline;">
<fieldset>
	<legend>搜索</legend>
	<table>
		<tr>	
			<td class="tdLabel">
					<%=Upload.ALIAS_FILENAME%>
			</td>		
			<td>
				<input value="${pageRequest.filters.filename}"  name="s_filename"  />
			</td>
			<td class="tdLabel">
					<%=Upload.ALIAS_UPFILEDATE%>
			</td>		
			<td>
				<input value="${pageRequest.filters.upfiledate}" onclick="WdatePicker({dateFmt:'<%=Upload.FORMAT_UPFILEDATE%>'})"  name="s_upfiledate"   />
			</td>
			<td class="tdLabel">
					<%=Upload.ALIAS_UPFILEDIR%>
			</td>		
			<td>
				<input value="${pageRequest.filters.upfiledir}"  name="s_upfiledir"  />
			</td>
			<td class="tdLabel">
					<%=Upload.ALIAS_UPFILEUSER%>
			</td>		
			<td>
				<input value="${pageRequest.filters.upfileuser}"  name="s_upfileuser"  />
			</td>
		</tr>	
	</table>
</fieldset>
<div class="handleControl">
	<input type="submit" class="stdButton" style="width:80px" value="查询" onclick="getReferenceForm(this).action='${ctx}/pages/Upload/list.do'"/>
	<input type="submit" class="stdButton" style="width:80px" value="新增" onclick="getReferenceForm(this).action='${ctx}/pages/Upload/create.do'"/>
	<input type="button" class="stdButton" style="width:80px" value="删除" onclick="batchDelete('${ctx}/pages/Upload/delete.do','items',document.forms.ec)"/>
<div>
</form>
</div>

<ec:table items='page.result' var="item" method="get"
	retrieveRowsCallback="limit" sortRowsCallback="limit" filterRowsCallback="limit"
	action="${ctx}/pages/Upload/list.do" autoIncludeParameters="true">
	<ec:row>
		<ec:column property="选择" title="<input type='checkbox' onclick=\"setAllCheckboxState('items',this.checked)\" >" sortable="false" width="3%" viewsAllowed="html">
			<input type="checkbox" name="items" value="id=${item.id}&"/>
		</ec:column>
		<ec:column property="filename"  title="<%=Upload.ALIAS_FILENAME%>"/>
		<ec:column property="upfiledate" value="${item.upfiledateString}" title="<%=Upload.ALIAS_UPFILEDATE%>"/>
		<ec:column property="upfiledir"  title="<%=Upload.ALIAS_UPFILEDIR%>"/>
		<ec:column property="upfileuser"  title="<%=Upload.ALIAS_UPFILEUSER%>"/>
		<ec:column property="操作" title="操作" sortable="false" viewsAllowed="html">
			<a href="${ctx}/pages/Upload/show.do?id=${item.id}&">查看</a>&nbsp;&nbsp;&nbsp;
			<a href="${ctx}/pages/Upload/edit.do?id=${item.id}&">修改</a>
		</ec:column>
	</ec:row>
</ec:table>

</body>

</html>

