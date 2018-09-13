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
	<title><%=PerProject.TABLE_ALIAS%> 维护</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<div class="queryPanel">
<form action="<c:url value="/pages/PerProject/list.do"/>" method="get" style="display: inline;">
<fieldset>
	<legend>搜索</legend>
	<table>
		<tr>	
			<td class="tdLabel">
					<%=PerProject.ALIAS_PRO_NAME%>
			</td>		
			<td>
				<input value="${pageRequest.filters.proName}"  name="s_proName"  />
			</td>
			<td class="tdLabel">
					<%=PerProject.ALIAS_PRO_NAME_CN%>
			</td>		
			<td>
				<input value="${pageRequest.filters.proNameCn}"  name="s_proNameCn"  />
			</td>
			<td class="tdLabel">
					<%=PerProject.ALIAS_PRO_NAME_ENG%>
			</td>		
			<td>
				<input value="${pageRequest.filters.proNameEng}" onclick="WdatePicker({dateFmt:'<%=PerProject.FORMAT_PRO_NAME_ENG%>'})"  name="s_proNameEng"   />
			</td>
			<td class="tdLabel">
					<%=PerProject.ALIAS_PRO_DESC%>
			</td>		
			<td>
				<input value="${pageRequest.filters.proDesc}"  name="s_proDesc"  />
			</td>
		</tr>	
		<tr>	
			<td class="tdLabel">
					<%=PerProject.ALIAS_PARENT_PRO%>
			</td>		
			<td>
				<input value="${pageRequest.filters.parentPro}"  name="s_parentPro"  />
			</td>
			<td class="tdLabel">
					<%=PerProject.ALIAS_CUS_NAME%>
			</td>		
			<td>
				<input value="${pageRequest.filters.cusName}"  name="s_cusName"  />
			</td>
			<td class="tdLabel">
					<%=PerProject.ALIAS_CUS_CONTACT%>
			</td>		
			<td>
				<input value="${pageRequest.filters.cusContact}"  name="s_cusContact"  />
			</td>
			<td class="tdLabel">
					<%=PerProject.ALIAS_DEVELOP_ENVI%>
			</td>		
			<td>
				<input value="${pageRequest.filters.developEnvi}"  name="s_developEnvi"  />
			</td>
			<td class="tdLabel">
					<%=PerProject.ALIAS_DEPT_ID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.deptId}"  name="s_deptId"  />
			</td>
		</tr>	
		<tr>	
			<td class="tdLabel">
					<%=PerProject.ALIAS_PLAN_STA_DATE%>
			</td>		
			<td>
				<input value="${pageRequest.filters.planStaDate}" onclick="WdatePicker({dateFmt:'<%=PerProject.FORMAT_PLAN_STA_DATE%>'})"  name="s_planStaDate"   />
			</td>
			<td class="tdLabel">
					<%=PerProject.ALIAS_PLAN_END_DATE%>
			</td>		
			<td>
				<input value="${pageRequest.filters.planEndDate}" onclick="WdatePicker({dateFmt:'<%=PerProject.FORMAT_PLAN_END_DATE%>'})"  name="s_planEndDate"   />
			</td>
			<td class="tdLabel">
					<%=PerProject.ALIAS_REAL_STA_DATE%>
			</td>		
			<td>
				<input value="${pageRequest.filters.realStaDate}" onclick="WdatePicker({dateFmt:'<%=PerProject.FORMAT_REAL_STA_DATE%>'})"  name="s_realStaDate"   />
			</td>
			<td class="tdLabel">
					<%=PerProject.ALIAS_REAL_END_DATE%>
			</td>		
			<td>
				<input value="${pageRequest.filters.realEndDate}" onclick="WdatePicker({dateFmt:'<%=PerProject.FORMAT_REAL_END_DATE%>'})"  name="s_realEndDate"   />
			</td>
			<td class="tdLabel">
					<%=PerProject.ALIAS_UPDATETIME%>
			</td>		
			<td>
				<input value="${pageRequest.filters.updatetime}" onclick="WdatePicker({dateFmt:'<%=PerProject.FORMAT_UPDATETIME%>'})"  name="s_updatetime"   />
			</td>
		</tr>	
	</table>
</fieldset>
<div class="handleControl">
	<input type="submit" class="stdButton" style="width:80px" value="查询" onclick="getReferenceForm(this).action='${ctx}/pages/PerProject/list.do'"/>
	<input type="submit" class="stdButton" style="width:80px" value="新增" onclick="getReferenceForm(this).action='${ctx}/pages/PerProject/create.do'"/>
	<input type="button" class="stdButton" style="width:80px" value="删除" onclick="batchDelete('${ctx}/pages/PerProject/delete.do','items',document.forms.ec)"/>
<div>
</form>
</div>

<ec:table items='page.result' var="item" method="get"
	retrieveRowsCallback="limit" sortRowsCallback="limit" filterRowsCallback="limit"
	action="${ctx}/pages/PerProject/list.do" autoIncludeParameters="true">
	<ec:row>
		<ec:column property="选择" title="<input type='checkbox' onclick=\"setAllCheckboxState('items',this.checked)\" >" sortable="false" width="3%" viewsAllowed="html">
			<input type="checkbox" name="items" value="proId=${item.proId}&"/>
		</ec:column>
		<ec:column property="proName"  title="<%=PerProject.ALIAS_PRO_NAME%>"/>
		<ec:column property="proNameCn"  title="<%=PerProject.ALIAS_PRO_NAME_CN%>"/>
		<ec:column property="proNameEng" value="${item.proNameEngString}" title="<%=PerProject.ALIAS_PRO_NAME_ENG%>"/>
		<ec:column property="proDesc"  title="<%=PerProject.ALIAS_PRO_DESC%>"/>
		<ec:column property="parentPro"  title="<%=PerProject.ALIAS_PARENT_PRO%>"/>
		<ec:column property="cusName"  title="<%=PerProject.ALIAS_CUS_NAME%>"/>
		<ec:column property="cusContact"  title="<%=PerProject.ALIAS_CUS_CONTACT%>"/>
		<ec:column property="developEnvi"  title="<%=PerProject.ALIAS_DEVELOP_ENVI%>"/>
		<ec:column property="deptId"  title="<%=PerProject.ALIAS_DEPT_ID%>"/>
		<ec:column property="planStaDate" value="${item.planStaDateString}" title="<%=PerProject.ALIAS_PLAN_STA_DATE%>"/>
		<ec:column property="planEndDate" value="${item.planEndDateString}" title="<%=PerProject.ALIAS_PLAN_END_DATE%>"/>
		<ec:column property="realStaDate" value="${item.realStaDateString}" title="<%=PerProject.ALIAS_REAL_STA_DATE%>"/>
		<ec:column property="realEndDate" value="${item.realEndDateString}" title="<%=PerProject.ALIAS_REAL_END_DATE%>"/>
		<ec:column property="updatetime" value="${item.updatetimeString}" title="<%=PerProject.ALIAS_UPDATETIME%>"/>
		<ec:column property="操作" title="操作" sortable="false" viewsAllowed="html">
			<a href="${ctx}/pages/PerProject/show.do?proId=${item.proId}&">查看</a>&nbsp;&nbsp;&nbsp;
			<a href="${ctx}/pages/PerProject/edit.do?proId=${item.proId}&">修改</a>
		</ec:column>
	</ec:row>
</ec:table>

</body>

</html>

