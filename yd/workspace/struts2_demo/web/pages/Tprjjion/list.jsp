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
	<title><%=Tprjjion.TABLE_ALIAS%> 维护</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<div class="queryPanel">
<form action="<c:url value="/pages/Tprjjion/list.do"/>" method="get" style="display: inline;">
<fieldset>
	<legend>搜索</legend>
	<table>
		<tr>	
			<td class="tdLabel">
					<%=Tprjjion.ALIAS_PRJ_ID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.prjId}"  name="s_prjId"  />
			</td>
			<td class="tdLabel">
					<%=Tprjjion.ALIAS_PRJ_EMPID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.prjEmpid}"  name="s_prjEmpid"  />
			</td>
			<td class="tdLabel">
					<%=Tprjjion.ALIAS_PRJ_FLAG%>
			</td>		
			<td>
				<input value="${pageRequest.filters.prjFlag}"  name="s_prjFlag"  />
			</td>
			<td class="tdLabel">
					<%=Tprjjion.ALIAS_PRJ_BEGDATE%>
			</td>		
			<td>
				<input value="${pageRequest.filters.prjBegdate}" onclick="WdatePicker({dateFmt:'<%=Tprjjion.FORMAT_PRJ_BEGDATE%>'})"  name="s_prjBegdate"   />
			</td>
			<td class="tdLabel">
					<%=Tprjjion.ALIAS_PRJ_ENDDATE%>
			</td>		
			<td>
				<input value="${pageRequest.filters.prjEnddate}" onclick="WdatePicker({dateFmt:'<%=Tprjjion.FORMAT_PRJ_ENDDATE%>'})"  name="s_prjEnddate"   />
			</td>
		</tr>	
	</table>
</fieldset>
<div class="handleControl">
	<input type="submit" class="stdButton" style="width:80px" value="查询" onclick="getReferenceForm(this).action='${ctx}/pages/Tprjjion/list.do'"/>
	<input type="submit" class="stdButton" style="width:80px" value="新增" onclick="getReferenceForm(this).action='${ctx}/pages/Tprjjion/create.do'"/>
	<input type="button" class="stdButton" style="width:80px" value="删除" onclick="batchDelete('${ctx}/pages/Tprjjion/delete.do','items',document.forms.ec)"/>
<div>
</form>
</div>

<ec:table items='page.result' var="item" method="get"
	retrieveRowsCallback="limit" sortRowsCallback="limit" filterRowsCallback="limit"
	action="${ctx}/pages/Tprjjion/list.do" autoIncludeParameters="true">
	<ec:row>
		<ec:column property="选择" title="<input type='checkbox' onclick=\"setAllCheckboxState('items',this.checked)\" >" sortable="false" width="3%" viewsAllowed="html">
			<input type="checkbox" name="items" value="prjId=${item.id.prjId}&prjEmpid=${item.id.prjEmpid}&prjBegdate=${item.id.prjBegdate}&"/>
		</ec:column>
		<ec:column property="prjId"  title="<%=Tprjjion.ALIAS_PRJ_ID%>"/>
		<ec:column property="prjEmpid"  title="<%=Tprjjion.ALIAS_PRJ_EMPID%>"/>
		<ec:column property="prjFlag"  title="<%=Tprjjion.ALIAS_PRJ_FLAG%>"/>
		<ec:column property="prjBegdate" value="${item.prjBegdateString}" title="<%=Tprjjion.ALIAS_PRJ_BEGDATE%>"/>
		<ec:column property="prjEnddate" value="${item.prjEnddateString}" title="<%=Tprjjion.ALIAS_PRJ_ENDDATE%>"/>
		<ec:column property="操作" title="操作" sortable="false" viewsAllowed="html">
			<a href="${ctx}/pages/Tprjjion/show.do?prjId=${item.id.prjId}&prjEmpid=${item.id.prjEmpid}&prjBegdate=${item.id.prjBegdate}&">查看</a>&nbsp;&nbsp;&nbsp;
			<a href="${ctx}/pages/Tprjjion/edit.do?prjId=${item.id.prjId}&prjEmpid=${item.id.prjEmpid}&prjBegdate=${item.id.prjBegdate}&">修改</a>
		</ec:column>
	</ec:row>
</ec:table>

</body>

</html>

