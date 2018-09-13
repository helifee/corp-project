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
	<title><%=TabZqhcjz.TABLE_ALIAS%> 维护</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<div class="queryPanel">
<form action="<c:url value="/pages/TabZqhcjz/list.do"/>" method="get" style="display: inline;">
<fieldset>
	<legend>搜索</legend>
	<table>
		<tr>	
			<td class="tdLabel">
					<%=TabZqhcjz.ALIAS_ZQHYID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.zqhyid}"  name="s_zqhyid"  />
			</td>
			<td class="tdLabel">
					<%=TabZqhcjz.ALIAS_ZQNHYTS%>
			</td>		
			<td>
				<input value="${pageRequest.filters.zqnhyts}"  name="s_zqnhyts"  />
			</td>
			<td class="tdLabel">
					<%=TabZqhcjz.ALIAS_CJZID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.cjzid}"  name="s_cjzid"  />
			</td>
			<td class="tdLabel">
					<%=TabZqhcjz.ALIAS_UPDATETIME%>
			</td>		
			<td>
				<input value="${pageRequest.filters.updatetime}" onclick="WdatePicker({dateFmt:'<%=TabZqhcjz.FORMAT_UPDATETIME%>'})"  name="s_updatetime"   />
			</td>
		</tr>	
	</table>
</fieldset>
<div class="handleControl">
	<input type="submit" class="stdButton" style="width:80px" value="查询" onclick="getReferenceForm(this).action='${ctx}/pages/TabZqhcjz/list.do'"/>
	<input type="submit" class="stdButton" style="width:80px" value="新增" onclick="getReferenceForm(this).action='${ctx}/pages/TabZqhcjz/create.do'"/>
	<input type="button" class="stdButton" style="width:80px" value="删除" onclick="batchDelete('${ctx}/pages/TabZqhcjz/delete.do','items',document.forms.ec)"/>
<div>
</form>
</div>

<ec:table items='page.result' var="item" method="get"
	retrieveRowsCallback="limit" sortRowsCallback="limit" filterRowsCallback="limit"
	action="${ctx}/pages/TabZqhcjz/list.do" autoIncludeParameters="true">
	<ec:row>
		<ec:column property="选择" title="<input type='checkbox' onclick=\"setAllCheckboxState('items',this.checked)\" >" sortable="false" width="3%" viewsAllowed="html">
			<input type="checkbox" name="items" value="zqhyid=${item.id.zqhyid}&zqnhyts=${item.id.zqnhyts}&cjzid=${item.id.cjzid}&"/>
		</ec:column>
		<ec:column property="zqhyid"  title="<%=TabZqhcjz.ALIAS_ZQHYID%>"/>
		<ec:column property="zqnhyts"  title="<%=TabZqhcjz.ALIAS_ZQNHYTS%>"/>
		<ec:column property="cjzid"  title="<%=TabZqhcjz.ALIAS_CJZID%>"/>
		<ec:column property="updatetime" value="${item.updatetimeString}" title="<%=TabZqhcjz.ALIAS_UPDATETIME%>"/>
		<ec:column property="操作" title="操作" sortable="false" viewsAllowed="html">
			<a href="${ctx}/pages/TabZqhcjz/show.do?zqhyid=${item.id.zqhyid}&zqnhyts=${item.id.zqnhyts}&cjzid=${item.id.cjzid}&">查看</a>&nbsp;&nbsp;&nbsp;
			<a href="${ctx}/pages/TabZqhcjz/edit.do?zqhyid=${item.id.zqhyid}&zqnhyts=${item.id.zqnhyts}&cjzid=${item.id.cjzid}&">修改</a>
		</ec:column>
	</ec:row>
</ec:table>

</body>

</html>

