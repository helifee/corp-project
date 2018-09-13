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
	<title><%=TabZbyl.TABLE_ALIAS%> 维护</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<div class="queryPanel">
<form action="<c:url value="/pages/TabZbyl/list.do"/>" method="get" style="display: inline;">
<fieldset>
	<legend>搜索</legend>
	<table>
		<tr>	
			<td class="tdLabel">
					<%=TabZbyl.ALIAS_JLZID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.jlzid}"  name="s_jlzid"  />
			</td>
			<td class="tdLabel">
					<%=TabZbyl.ALIAS_ZBQF%>
			</td>		
			<td>
				<input value="${pageRequest.filters.zbqf}"  name="s_zbqf"  />
			</td>
			<td class="tdLabel">
					<%=TabZbyl.ALIAS_ZZWMC%>
			</td>		
			<td>
				<input value="${pageRequest.filters.zzwmc}"  name="s_zzwmc"  />
			</td>
			<td class="tdLabel">
					<%=TabZbyl.ALIAS_UPDATETIME%>
			</td>		
			<td>
				<input value="${pageRequest.filters.updatetime}" onclick="WdatePicker({dateFmt:'<%=TabZbyl.FORMAT_UPDATETIME%>'})"  name="s_updatetime"   />
			</td>
		</tr>	
	</table>
</fieldset>
<div class="handleControl">
	<input type="submit" class="stdButton" style="width:80px" value="查询" onclick="getReferenceForm(this).action='${ctx}/pages/TabZbyl/list.do'"/>
	<input type="submit" class="stdButton" style="width:80px" value="新增" onclick="getReferenceForm(this).action='${ctx}/pages/TabZbyl/create.do'"/>
	<input type="button" class="stdButton" style="width:80px" value="删除" onclick="batchDelete('${ctx}/pages/TabZbyl/delete.do','items',document.forms.ec)"/>
<div>
</form>
</div>

<ec:table items='page.result' var="item" method="get"
	retrieveRowsCallback="limit" sortRowsCallback="limit" filterRowsCallback="limit"
	action="${ctx}/pages/TabZbyl/list.do" autoIncludeParameters="true">
	<ec:row>
		<ec:column property="选择" title="<input type='checkbox' onclick=\"setAllCheckboxState('items',this.checked)\" >" sortable="false" width="3%" viewsAllowed="html">
			<input type="checkbox" name="items" value="zbid=${item.zbid}&"/>
		</ec:column>
		<ec:column property="jlzid"  title="<%=TabZbyl.ALIAS_JLZID%>"/>
		<ec:column property="zbqf"  title="<%=TabZbyl.ALIAS_ZBQF%>"/>
		<ec:column property="zzwmc"  title="<%=TabZbyl.ALIAS_ZZWMC%>"/>
		<ec:column property="updatetime" value="${item.updatetimeString}" title="<%=TabZbyl.ALIAS_UPDATETIME%>"/>
		<ec:column property="操作" title="操作" sortable="false" viewsAllowed="html">
			<a href="${ctx}/pages/TabZbyl/show.do?zbid=${item.zbid}&">查看</a>&nbsp;&nbsp;&nbsp;
			<a href="${ctx}/pages/TabZbyl/edit.do?zbid=${item.zbid}&">修改</a>
		</ec:column>
	</ec:row>
</ec:table>

</body>

</html>

