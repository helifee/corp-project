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
	<title><%=PerUser.TABLE_ALIAS%> 维护</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<div class="queryPanel">
<form action="<c:url value="/pages/PerUser/list.do"/>" method="get" style="display: inline;">
<fieldset>
	<legend>搜索</legend>
	<table>
		<tr>	
			<td class="tdLabel">
					<%=PerUser.ALIAS_EMP_PNM%>
			</td>		
			<td>
				<input value="${pageRequest.filters.empPnm}"  name="s_empPnm"  />
			</td>
			<td class="tdLabel">
					<%=PerUser.ALIAS_EMP_CNM%>
			</td>		
			<td>
				<input value="${pageRequest.filters.empCnm}"  name="s_empCnm"  />
			</td>
			<td class="tdLabel">
					<%=PerUser.ALIAS_EMP_JNM%>
			</td>		
			<td>
				<input value="${pageRequest.filters.empJnm}"  name="s_empJnm"  />
			</td>
			<td class="tdLabel">
					<%=PerUser.ALIAS_PASSWORD%>
			</td>		
			<td>
				<input value="${pageRequest.filters.password}"  name="s_password"  />
			</td>
		</tr>	
		<tr>	
			<td class="tdLabel">
					<%=PerUser.ALIAS_DEPT_ID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.deptId}"  name="s_deptId"  />
			</td>
			<td class="tdLabel">
					<%=PerUser.ALIAS_START_DATE%>
			</td>		
			<td>
				<input value="${pageRequest.filters.startDate}" onclick="WdatePicker({dateFmt:'<%=PerUser.FORMAT_START_DATE%>'})"  name="s_startDate"   />
			</td>
			<td class="tdLabel">
					<%=PerUser.ALIAS_EMP_PWDASK%>
			</td>		
			<td>
				<input value="${pageRequest.filters.empPwdask}"  name="s_empPwdask"  />
			</td>
			<td class="tdLabel">
					<%=PerUser.ALIAS_EMP_PWDASW%>
			</td>		
			<td>
				<input value="${pageRequest.filters.empPwdasw}"  name="s_empPwdasw"  />
			</td>
			<td class="tdLabel">
					<%=PerUser.ALIAS_EMP_COOKIE%>
			</td>		
			<td>
				<input value="${pageRequest.filters.empCookie}"  name="s_empCookie"  />
			</td>
		</tr>	
		<tr>	
			<td class="tdLabel">
					<%=PerUser.ALIAS_EMP_WORKID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.empWorkid}"  name="s_empWorkid"  />
			</td>
			<td class="tdLabel">
					<%=PerUser.ALIAS_EMP_WORKPWD%>
			</td>		
			<td>
				<input value="${pageRequest.filters.empWorkpwd}"  name="s_empWorkpwd"  />
			</td>
			<td class="tdLabel">
					<%=PerUser.ALIAS_HIGHER_ID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.higherId}"  name="s_higherId"  />
			</td>
			<td class="tdLabel">
					<%=PerUser.ALIAS_OHIGHER_ID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.ohigherId}"  name="s_ohigherId"  />
			</td>
			<td class="tdLabel">
					<%=PerUser.ALIAS_CONTRACT_ID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.contractId}"  name="s_contractId"  />
			</td>
		</tr>	
		<tr>	
			<td class="tdLabel">
					<%=PerUser.ALIAS_END_DATE%>
			</td>		
			<td>
				<input value="${pageRequest.filters.endDate}" onclick="WdatePicker({dateFmt:'<%=PerUser.FORMAT_END_DATE%>'})"  name="s_endDate"   />
			</td>
			<td class="tdLabel">
					<%=PerUser.ALIAS_YX_NO%>
			</td>		
			<td>
				<input value="${pageRequest.filters.yxNo}"  name="s_yxNo"  />
			</td>
			<td class="tdLabel">
					<%=PerUser.ALIAS_YX_CONTRACT_ID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.yxContractId}"  name="s_yxContractId"  />
			</td>
			<td class="tdLabel">
					<%=PerUser.ALIAS_YJSR%>
			</td>		
			<td>
				<input value="${pageRequest.filters.yjsr}" onclick="WdatePicker({dateFmt:'<%=PerUser.FORMAT_YJSR%>'})"  name="s_yjsr"   />
			</td>
			<td class="tdLabel">
					<%=PerUser.ALIAS_EMP_DESP%>
			</td>		
			<td>
				<input value="${pageRequest.filters.empDesp}"  name="s_empDesp"  />
			</td>
		</tr>	
		<tr>	
			<td class="tdLabel">
					<%=PerUser.ALIAS_EMP_FLAG%>
			</td>		
			<td>
				<input value="${pageRequest.filters.empFlag}"  name="s_empFlag"  />
			</td>
			<td class="tdLabel">
					<%=PerUser.ALIAS_UPDATETIME%>
			</td>		
			<td>
				<input value="${pageRequest.filters.updatetime}" onclick="WdatePicker({dateFmt:'<%=PerUser.FORMAT_UPDATETIME%>'})"  name="s_updatetime"   />
			</td>
		</tr>	
	</table>
</fieldset>
<div class="handleControl">
	<input type="submit" class="stdButton" style="width:80px" value="查询" onclick="getReferenceForm(this).action='${ctx}/pages/PerUser/list.do'"/>
	<input type="submit" class="stdButton" style="width:80px" value="新增" onclick="getReferenceForm(this).action='${ctx}/pages/PerUser/create.do'"/>
	<input type="button" class="stdButton" style="width:80px" value="删除" onclick="batchDelete('${ctx}/pages/PerUser/delete.do','items',document.forms.ec)"/>
<div>
</form>
</div>

<ec:table items='page.result' var="item" method="get"
	retrieveRowsCallback="limit" sortRowsCallback="limit" filterRowsCallback="limit"
	action="${ctx}/pages/PerUser/list.do" autoIncludeParameters="true">
	<ec:row>
		<ec:column property="选择" title="<input type='checkbox' onclick=\"setAllCheckboxState('items',this.checked)\" >" sortable="false" width="3%" viewsAllowed="html">
			<input type="checkbox" name="items" value="empId=${item.empId}&"/>
		</ec:column>
		<ec:column property="empPnm"  title="<%=PerUser.ALIAS_EMP_PNM%>"/>
		<ec:column property="empCnm"  title="<%=PerUser.ALIAS_EMP_CNM%>"/>
		<ec:column property="empJnm"  title="<%=PerUser.ALIAS_EMP_JNM%>"/>
		<ec:column property="password"  title="<%=PerUser.ALIAS_PASSWORD%>"/>
		<ec:column property="deptId"  title="<%=PerUser.ALIAS_DEPT_ID%>"/>
		<ec:column property="startDate" value="${item.startDateString}" title="<%=PerUser.ALIAS_START_DATE%>"/>
		<ec:column property="empPwdask"  title="<%=PerUser.ALIAS_EMP_PWDASK%>"/>
		<ec:column property="empPwdasw"  title="<%=PerUser.ALIAS_EMP_PWDASW%>"/>
		<ec:column property="empCookie"  title="<%=PerUser.ALIAS_EMP_COOKIE%>"/>
		<ec:column property="empWorkid"  title="<%=PerUser.ALIAS_EMP_WORKID%>"/>
		<ec:column property="empWorkpwd"  title="<%=PerUser.ALIAS_EMP_WORKPWD%>"/>
		<ec:column property="higherId"  title="<%=PerUser.ALIAS_HIGHER_ID%>"/>
		<ec:column property="ohigherId"  title="<%=PerUser.ALIAS_OHIGHER_ID%>"/>
		<ec:column property="contractId"  title="<%=PerUser.ALIAS_CONTRACT_ID%>"/>
		<ec:column property="endDate" value="${item.endDateString}" title="<%=PerUser.ALIAS_END_DATE%>"/>
		<ec:column property="yxNo"  title="<%=PerUser.ALIAS_YX_NO%>"/>
		<ec:column property="yxContractId"  title="<%=PerUser.ALIAS_YX_CONTRACT_ID%>"/>
		<ec:column property="yjsr" value="${item.yjsrString}" title="<%=PerUser.ALIAS_YJSR%>"/>
		<ec:column property="empDesp"  title="<%=PerUser.ALIAS_EMP_DESP%>"/>
		<ec:column property="empFlag"  title="<%=PerUser.ALIAS_EMP_FLAG%>"/>
		<ec:column property="updatetime" value="${item.updatetimeString}" title="<%=PerUser.ALIAS_UPDATETIME%>"/>
		<ec:column property="操作" title="操作" sortable="false" viewsAllowed="html">
			<a href="${ctx}/pages/PerUser/show.do?empId=${item.empId}&">查看</a>&nbsp;&nbsp;&nbsp;
			<a href="${ctx}/pages/PerUser/edit.do?empId=${item.empId}&">修改</a>
		</ec:column>
	</ec:row>
</ec:table>

</body>

</html>

