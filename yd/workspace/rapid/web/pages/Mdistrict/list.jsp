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
	<title><%=Mdistrict.TABLE_ALIAS%> 维护</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<div class="queryPanel">
<form action="<c:url value="/pages/Mdistrict/list.do"/>" method="get" style="display: inline;">
<fieldset>
	<legend>搜索</legend>
	<table>
		<tr>	
			<td class="tdLabel">
					<%=Mdistrict.ALIAS_CITYID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.cityid}"  name="s_cityid"  />
			</td>
			<td class="tdLabel">
					<%=Mdistrict.ALIAS_DISTID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.distid}"  name="s_distid"  />
			</td>
			<td class="tdLabel">
					<%=Mdistrict.ALIAS_UDFLAG%>
			</td>		
			<td>
				<input value="${pageRequest.filters.udflag}"  name="s_udflag"  />
			</td>
			<td class="tdLabel">
					<%=Mdistrict.ALIAS_DISTNAME%>
			</td>		
			<td>
				<input value="${pageRequest.filters.distname}"  name="s_distname"  />
			</td>
			<td class="tdLabel">
					<%=Mdistrict.ALIAS_FLAG%>
			</td>		
			<td>
				<input value="${pageRequest.filters.flag}"  name="s_flag"  />
			</td>
		</tr>	
		<tr>	
			<td class="tdLabel">
					<%=Mdistrict.ALIAS_UPDATETIME%>
			</td>		
			<td>
				<input value="${pageRequest.filters.updatetime}" onclick="WdatePicker({dateFmt:'<%=Mdistrict.FORMAT_UPDATETIME%>'})"  name="s_updatetime"   />
			</td>
		</tr>	
	</table>
</fieldset>
<div class="handleControl">
	<input type="submit" class="stdButton" style="width:80px" value="查询" onclick="getReferenceForm(this).action='${ctx}/pages/Mdistrict/list.do'"/>
	<input type="submit" class="stdButton" style="width:80px" value="新增" onclick="getReferenceForm(this).action='${ctx}/pages/Mdistrict/create.do'"/>
	<input type="button" class="stdButton" style="width:80px" value="删除" onclick="batchDelete('${ctx}/pages/Mdistrict/delete.do','items',document.forms.ec)"/>
<div>
</form>
</div>

<ec:table items='page.result' var="item" method="get"
	retrieveRowsCallback="limit" sortRowsCallback="limit" filterRowsCallback="limit"
	action="${ctx}/pages/Mdistrict/list.do" autoIncludeParameters="true">
	<ec:row>
		<ec:column property="选择" title="<input type='checkbox' onclick=\"setAllCheckboxState('items',this.checked)\" >" sortable="false" width="3%" viewsAllowed="html">
			<input type="checkbox" name="items" value="cityid=${item.id.cityid}&distid=${item.id.distid}&"/>
		</ec:column>
		<ec:column property="cityid"  title="<%=Mdistrict.ALIAS_CITYID%>"/>
		<ec:column property="distid"  title="<%=Mdistrict.ALIAS_DISTID%>"/>
		<ec:column property="udflag"  title="<%=Mdistrict.ALIAS_UDFLAG%>"/>
		<ec:column property="distname"  title="<%=Mdistrict.ALIAS_DISTNAME%>"/>
		<ec:column property="flag"  title="<%=Mdistrict.ALIAS_FLAG%>"/>
		<ec:column property="updatetime" value="${item.updatetimeString}" title="<%=Mdistrict.ALIAS_UPDATETIME%>"/>
		<ec:column property="操作" title="操作" sortable="false" viewsAllowed="html">
			<a href="${ctx}/pages/Mdistrict/show.do?cityid=${item.id.cityid}&distid=${item.id.distid}&">查看</a>&nbsp;&nbsp;&nbsp;
			<a href="${ctx}/pages/Mdistrict/edit.do?cityid=${item.id.cityid}&distid=${item.id.distid}&">修改</a>
		</ec:column>
	</ec:row>
</ec:table>

</body>

</html>

