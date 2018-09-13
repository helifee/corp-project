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
	<title><%=TabZbcyyl.TABLE_ALIAS%> 维护</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<div class="queryPanel">
<form action="<c:url value="/pages/TabZbcyyl/list.do"/>" method="get" style="display: inline;">
<fieldset>
	<legend>搜索</legend>
	<table>
		<tr>	
			<td class="tdLabel">
					<%=TabZbcyyl.ALIAS_ZBID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.zbid}"  name="s_zbid"  />
			</td>
			<td class="tdLabel">
					<%=TabZbcyyl.ALIAS_ZCYID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.zcyid}"  name="s_zcyid"  />
			</td>
			<td class="tdLabel">
					<%=TabZbcyyl.ALIAS_UPDATETIME%>
			</td>		
			<td>
				<input value="${pageRequest.filters.updatetime}" onclick="WdatePicker({dateFmt:'<%=TabZbcyyl.FORMAT_UPDATETIME%>'})"  name="s_updatetime"   />
			</td>
		</tr>	
	</table>
</fieldset>
<div class="handleControl">
	<input type="submit" class="stdButton" style="width:80px" value="查询" onclick="getReferenceForm(this).action='${ctx}/pages/TabZbcyyl/list.do'"/>
	<input type="submit" class="stdButton" style="width:80px" value="新增" onclick="getReferenceForm(this).action='${ctx}/pages/TabZbcyyl/create.do'"/>
	<input type="button" class="stdButton" style="width:80px" value="删除" onclick="batchDelete('${ctx}/pages/TabZbcyyl/delete.do','items',document.forms.ec)"/>
<div>
</form>
</div>

<ec:table items='page.result' var="item" method="get"
	retrieveRowsCallback="limit" sortRowsCallback="limit" filterRowsCallback="limit"
	action="${ctx}/pages/TabZbcyyl/list.do" autoIncludeParameters="true">
	<ec:row>
		<ec:column property="选择" title="<input type='checkbox' onclick=\"setAllCheckboxState('items',this.checked)\" >" sortable="false" width="3%" viewsAllowed="html">
			<input type="checkbox" name="items" value="zbid=${item.id.zbid}&zcyid=${item.id.zcyid}&"/>
		</ec:column>
		<ec:column property="zbid"  title="<%=TabZbcyyl.ALIAS_ZBID%>"/>
		<ec:column property="zcyid"  title="<%=TabZbcyyl.ALIAS_ZCYID%>"/>
		<ec:column property="updatetime" value="${item.updatetimeString}" title="<%=TabZbcyyl.ALIAS_UPDATETIME%>"/>
		<ec:column property="操作" title="操作" sortable="false" viewsAllowed="html">
			<a href="${ctx}/pages/TabZbcyyl/show.do?zbid=${item.id.zbid}&zcyid=${item.id.zcyid}&">查看</a>&nbsp;&nbsp;&nbsp;
			<a href="${ctx}/pages/TabZbcyyl/edit.do?zbid=${item.id.zbid}&zcyid=${item.id.zcyid}&">修改</a>
		</ec:column>
	</ec:row>
</ec:table>

</body>

</html>

