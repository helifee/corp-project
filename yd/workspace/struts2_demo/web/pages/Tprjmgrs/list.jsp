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
	<title><%=Tprjmgrs.TABLE_ALIAS%> 维护</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<div class="queryPanel">
<form action="<c:url value="/pages/Tprjmgrs/list.do"/>" method="get" style="display: inline;">
<fieldset>
	<legend>搜索</legend>
	<table>
		<tr>	
			<td class="tdLabel">
					<%=Tprjmgrs.ALIAS_PRJ_NAME%>
			</td>		
			<td>
				<input value="${pageRequest.filters.prjName}"  name="s_prjName"  />
			</td>
			<td class="tdLabel">
					<%=Tprjmgrs.ALIAS_PRJ_DESCRIBE%>
			</td>		
			<td>
				<input value="${pageRequest.filters.prjDescribe}"  name="s_prjDescribe"  />
			</td>
			<td class="tdLabel">
					<%=Tprjmgrs.ALIAS_PRJ_CUSNAME%>
			</td>		
			<td>
				<input value="${pageRequest.filters.prjCusname}"  name="s_prjCusname"  />
			</td>
			<td class="tdLabel">
					<%=Tprjmgrs.ALIAS_PRJ_CUSCONTACT%>
			</td>		
			<td>
				<input value="${pageRequest.filters.prjCuscontact}"  name="s_prjCuscontact"  />
			</td>
		</tr>	
		<tr>	
			<td class="tdLabel">
					<%=Tprjmgrs.ALIAS_PRJ_ENVIR%>
			</td>		
			<td>
				<input value="${pageRequest.filters.prjEnvir}"  name="s_prjEnvir"  />
			</td>
			<td class="tdLabel">
					<%=Tprjmgrs.ALIAS_PRJ_DPTID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.prjDptid}"  name="s_prjDptid"  />
			</td>
			<td class="tdLabel">
					<%=Tprjmgrs.ALIAS_PRJ_PBDATE%>
			</td>		
			<td>
				<input value="${pageRequest.filters.prjPbdate}" onclick="WdatePicker({dateFmt:'<%=Tprjmgrs.FORMAT_PRJ_PBDATE%>'})"  name="s_prjPbdate"   />
			</td>
			<td class="tdLabel">
					<%=Tprjmgrs.ALIAS_PRJ_PEDATE%>
			</td>		
			<td>
				<input value="${pageRequest.filters.prjPedate}" onclick="WdatePicker({dateFmt:'<%=Tprjmgrs.FORMAT_PRJ_PEDATE%>'})"  name="s_prjPedate"   />
			</td>
			<td class="tdLabel">
					<%=Tprjmgrs.ALIAS_PRJ_TBDATE%>
			</td>		
			<td>
				<input value="${pageRequest.filters.prjTbdate}" onclick="WdatePicker({dateFmt:'<%=Tprjmgrs.FORMAT_PRJ_TBDATE%>'})"  name="s_prjTbdate"   />
			</td>
		</tr>	
		<tr>	
			<td class="tdLabel">
					<%=Tprjmgrs.ALIAS_PRJ_TEDATE%>
			</td>		
			<td>
				<input value="${pageRequest.filters.prjTedate}" onclick="WdatePicker({dateFmt:'<%=Tprjmgrs.FORMAT_PRJ_TEDATE%>'})"  name="s_prjTedate"   />
			</td>
			<td class="tdLabel">
					<%=Tprjmgrs.ALIAS_PRJ_DATE%>
			</td>		
			<td>
				<input value="${pageRequest.filters.prjDate}" onclick="WdatePicker({dateFmt:'<%=Tprjmgrs.FORMAT_PRJ_DATE%>'})"  name="s_prjDate"   />
			</td>
			<td class="tdLabel">
					<%=Tprjmgrs.ALIAS_PRJ_REF%>
			</td>		
			<td>
				<input value="${pageRequest.filters.prjRef}"  name="s_prjRef"  />
			</td>
			<td class="tdLabel">
					<%=Tprjmgrs.ALIAS_PRJ_CNAME%>
			</td>		
			<td>
				<input value="${pageRequest.filters.prjCname}"  name="s_prjCname"  />
			</td>
			<td class="tdLabel">
					<%=Tprjmgrs.ALIAS_PRJ_ENAME%>
			</td>		
			<td>
				<input value="${pageRequest.filters.prjEname}"  name="s_prjEname"  />
			</td>
		</tr>	
	</table>
</fieldset>
<div class="handleControl">
	<input type="submit" class="stdButton" style="width:80px" value="查询" onclick="getReferenceForm(this).action='${ctx}/pages/Tprjmgrs/list.do'"/>
	<input type="submit" class="stdButton" style="width:80px" value="新增" onclick="getReferenceForm(this).action='${ctx}/pages/Tprjmgrs/create.do'"/>
	<input type="button" class="stdButton" style="width:80px" value="删除" onclick="batchDelete('${ctx}/pages/Tprjmgrs/delete.do','items',document.forms.ec)"/>
<div>
</form>
</div>

<ec:table items='page.result' var="item" method="get"
	retrieveRowsCallback="limit" sortRowsCallback="limit" filterRowsCallback="limit"
	action="${ctx}/pages/Tprjmgrs/list.do" autoIncludeParameters="true">
	<ec:row>
		<ec:column property="选择" title="<input type='checkbox' onclick=\"setAllCheckboxState('items',this.checked)\" >" sortable="false" width="3%" viewsAllowed="html">
			<input type="checkbox" name="items" value="prjId=${item.prjId}&"/>
		</ec:column>
		<ec:column property="prjName"  title="<%=Tprjmgrs.ALIAS_PRJ_NAME%>"/>
		<ec:column property="prjDescribe"  title="<%=Tprjmgrs.ALIAS_PRJ_DESCRIBE%>"/>
		<ec:column property="prjCusname"  title="<%=Tprjmgrs.ALIAS_PRJ_CUSNAME%>"/>
		<ec:column property="prjCuscontact"  title="<%=Tprjmgrs.ALIAS_PRJ_CUSCONTACT%>"/>
		<ec:column property="prjEnvir"  title="<%=Tprjmgrs.ALIAS_PRJ_ENVIR%>"/>
		<ec:column property="prjDptid"  title="<%=Tprjmgrs.ALIAS_PRJ_DPTID%>"/>
		<ec:column property="prjPbdate" value="${item.prjPbdateString}" title="<%=Tprjmgrs.ALIAS_PRJ_PBDATE%>"/>
		<ec:column property="prjPedate" value="${item.prjPedateString}" title="<%=Tprjmgrs.ALIAS_PRJ_PEDATE%>"/>
		<ec:column property="prjTbdate" value="${item.prjTbdateString}" title="<%=Tprjmgrs.ALIAS_PRJ_TBDATE%>"/>
		<ec:column property="prjTedate" value="${item.prjTedateString}" title="<%=Tprjmgrs.ALIAS_PRJ_TEDATE%>"/>
		<ec:column property="prjDate" value="${item.prjDateString}" title="<%=Tprjmgrs.ALIAS_PRJ_DATE%>"/>
		<ec:column property="prjRef"  title="<%=Tprjmgrs.ALIAS_PRJ_REF%>"/>
		<ec:column property="prjCname"  title="<%=Tprjmgrs.ALIAS_PRJ_CNAME%>"/>
		<ec:column property="prjEname"  title="<%=Tprjmgrs.ALIAS_PRJ_ENAME%>"/>
		<ec:column property="操作" title="操作" sortable="false" viewsAllowed="html">
			<a href="${ctx}/pages/Tprjmgrs/show.do?prjId=${item.prjId}&">查看</a>&nbsp;&nbsp;&nbsp;
			<a href="${ctx}/pages/Tprjmgrs/edit.do?prjId=${item.prjId}&">修改</a>
		</ec:column>
	</ec:row>
</ec:table>

</body>

</html>

