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
	<title><%=TabMrhycjz.TABLE_ALIAS%> 维护</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<div class="queryPanel">
<form action="<c:url value="/pages/TabMrhycjz/list.do"/>" method="get" style="display: inline;">
<fieldset>
	<legend>搜索</legend>
	<table>
		<tr>	
			<td class="tdLabel">
					<%=TabMrhycjz.ALIAS_HYRQ%>
			</td>		
			<td>
				<input value="${pageRequest.filters.hyrq}" onclick="WdatePicker({dateFmt:'<%=TabMrhycjz.FORMAT_HYRQ%>'})"  name="s_hyrq"   />
			</td>
			<td class="tdLabel">
					<%=TabMrhycjz.ALIAS_HYKSSJ%>
			</td>		
			<td>
				<input value="${pageRequest.filters.hykssj}" onclick="WdatePicker({dateFmt:'<%=TabMrhycjz.FORMAT_HYKSSJ%>'})"  name="s_hykssj"   />
			</td>
			<td class="tdLabel">
					<%=TabMrhycjz.ALIAS_HYSID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.hysid}"  name="s_hysid"  />
			</td>
			<td class="tdLabel">
					<%=TabMrhycjz.ALIAS_CJZID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.cjzid}"  name="s_cjzid"  />
			</td>
			<td class="tdLabel">
					<%=TabMrhycjz.ALIAS_HZQR%>
			</td>		
			<td>
				<input value="${pageRequest.filters.hzqr}"  name="s_hzqr"  />
			</td>
		</tr>	
		<tr>	
			<td class="tdLabel">
					<%=TabMrhycjz.ALIAS_UPDATETIME%>
			</td>		
			<td>
				<input value="${pageRequest.filters.updatetime}" onclick="WdatePicker({dateFmt:'<%=TabMrhycjz.FORMAT_UPDATETIME%>'})"  name="s_updatetime"   />
			</td>
		</tr>	
	</table>
</fieldset>
<div class="handleControl">
	<input type="submit" class="stdButton" style="width:80px" value="查询" onclick="getReferenceForm(this).action='${ctx}/pages/TabMrhycjz/list.do'"/>
	<input type="submit" class="stdButton" style="width:80px" value="新增" onclick="getReferenceForm(this).action='${ctx}/pages/TabMrhycjz/create.do'"/>
	<input type="button" class="stdButton" style="width:80px" value="删除" onclick="batchDelete('${ctx}/pages/TabMrhycjz/delete.do','items',document.forms.ec)"/>
<div>
</form>
</div>

<ec:table items='page.result' var="item" method="get"
	retrieveRowsCallback="limit" sortRowsCallback="limit" filterRowsCallback="limit"
	action="${ctx}/pages/TabMrhycjz/list.do" autoIncludeParameters="true">
	<ec:row>
		<ec:column property="选择" title="<input type='checkbox' onclick=\"setAllCheckboxState('items',this.checked)\" >" sortable="false" width="3%" viewsAllowed="html">
			<input type="checkbox" name="items" value="hyrq=${item.id.hyrq}&hykssj=${item.id.hykssj}&hysid=${item.id.hysid}&cjzid=${item.id.cjzid}&"/>
		</ec:column>
		<ec:column property="hyrq" value="${item.hyrqString}" title="<%=TabMrhycjz.ALIAS_HYRQ%>"/>
		<ec:column property="hykssj" value="${item.hykssjString}" title="<%=TabMrhycjz.ALIAS_HYKSSJ%>"/>
		<ec:column property="hysid"  title="<%=TabMrhycjz.ALIAS_HYSID%>"/>
		<ec:column property="cjzid"  title="<%=TabMrhycjz.ALIAS_CJZID%>"/>
		<ec:column property="hzqr"  title="<%=TabMrhycjz.ALIAS_HZQR%>"/>
		<ec:column property="updatetime" value="${item.updatetimeString}" title="<%=TabMrhycjz.ALIAS_UPDATETIME%>"/>
		<ec:column property="操作" title="操作" sortable="false" viewsAllowed="html">
			<a href="${ctx}/pages/TabMrhycjz/show.do?hyrq=${item.id.hyrq}&hykssj=${item.id.hykssj}&hysid=${item.id.hysid}&cjzid=${item.id.cjzid}&">查看</a>&nbsp;&nbsp;&nbsp;
			<a href="${ctx}/pages/TabMrhycjz/edit.do?hyrq=${item.id.hyrq}&hykssj=${item.id.hykssj}&hysid=${item.id.hysid}&cjzid=${item.id.cjzid}&">修改</a>
		</ec:column>
	</ec:row>
</ec:table>

</body>

</html>

