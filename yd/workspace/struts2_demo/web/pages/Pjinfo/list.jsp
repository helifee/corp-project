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
	<title><%=Pjinfo.TABLE_ALIAS%> 维护</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<div class="queryPanel">
<form action="<c:url value="/pages/Pjinfo/list.do"/>" method="get" style="display: inline;">
<fieldset>
	<legend>搜索</legend>
	<table>
		<tr>	
			<td class="tdLabel">
					<%=Pjinfo.ALIAS_ENDDATE%>
			</td>		
			<td>
				<input value="${pageRequest.filters.enddate}" onclick="WdatePicker({dateFmt:'<%=Pjinfo.FORMAT_ENDDATE%>'})"  name="s_enddate"   />
			</td>
			<td class="tdLabel">
					<%=Pjinfo.ALIAS_STARTDATE%>
			</td>		
			<td>
				<input value="${pageRequest.filters.startdate}" onclick="WdatePicker({dateFmt:'<%=Pjinfo.FORMAT_STARTDATE%>'})"  name="s_startdate"   />
			</td>
			<td class="tdLabel">
					<%=Pjinfo.ALIAS_PRJMEI%>
			</td>		
			<td>
				<input value="${pageRequest.filters.prjmei}"  name="s_prjmei"  />
			</td>
			<td class="tdLabel">
					<%=Pjinfo.ALIAS_KYAKUNAME%>
			</td>		
			<td>
				<input value="${pageRequest.filters.kyakuname}"  name="s_kyakuname"  />
			</td>
		</tr>	
		<tr>	
			<td class="tdLabel">
					<%=Pjinfo.ALIAS_CANCELFLAG%>
			</td>		
			<td>
				<input value="${pageRequest.filters.cancelflag}"  name="s_cancelflag"  />
			</td>
			<td class="tdLabel">
					<%=Pjinfo.ALIAS_INTIMESTP%>
			</td>		
			<td>
				<input value="${pageRequest.filters.intimestp}"  name="s_intimestp"  />
			</td>
			<td class="tdLabel">
					<%=Pjinfo.ALIAS_UPTIMESTP%>
			</td>		
			<td>
				<input value="${pageRequest.filters.uptimestp}"  name="s_uptimestp"  />
			</td>
			<td class="tdLabel">
					<%=Pjinfo.ALIAS_PROJECTTYUNAME%>
			</td>		
			<td>
				<input value="${pageRequest.filters.projecttyuname}"  name="s_projecttyuname"  />
			</td>
			<td class="tdLabel">
					<%=Pjinfo.ALIAS_PROJECTEINAME%>
			</td>		
			<td>
				<input value="${pageRequest.filters.projecteiname}"  name="s_projecteiname"  />
			</td>
		</tr>	
		<tr>	
			<td class="tdLabel">
					<%=Pjinfo.ALIAS_MUSERID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.muserid}"  name="s_muserid"  />
			</td>
			<td class="tdLabel">
					<%=Pjinfo.ALIAS_YSTARTDATE%>
			</td>		
			<td>
				<input value="${pageRequest.filters.ystartdate}" onclick="WdatePicker({dateFmt:'<%=Pjinfo.FORMAT_YSTARTDATE%>'})"  name="s_ystartdate"   />
			</td>
			<td class="tdLabel">
					<%=Pjinfo.ALIAS_YENDDATE%>
			</td>		
			<td>
				<input value="${pageRequest.filters.yenddate}" onclick="WdatePicker({dateFmt:'<%=Pjinfo.FORMAT_YENDDATE%>'})"  name="s_yenddate"   />
			</td>
			<td class="tdLabel">
					<%=Pjinfo.ALIAS_USERNUM%>
			</td>		
			<td>
				<input value="${pageRequest.filters.usernum}"  name="s_usernum"  />
			</td>
			<td class="tdLabel">
					<%=Pjinfo.ALIAS_PJGAIYOU%>
			</td>		
			<td>
				<input value="${pageRequest.filters.pjgaiyou}"  name="s_pjgaiyou"  />
			</td>
		</tr>	
		<tr>	
			<td class="tdLabel">
					<%=Pjinfo.ALIAS_PJEM%>
			</td>		
			<td>
				<input value="${pageRequest.filters.pjem}"  name="s_pjem"  />
			</td>
			<td class="tdLabel">
					<%=Pjinfo.ALIAS_STATUSFLG%>
			</td>		
			<td>
				<input value="${pageRequest.filters.statusflg}"  name="s_statusflg"  />
			</td>
			<td class="tdLabel">
					<%=Pjinfo.ALIAS_SUPUSERID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.supuserid}"  name="s_supuserid"  />
			</td>
			<td class="tdLabel">
					<%=Pjinfo.ALIAS_BIKO%>
			</td>		
			<td>
				<input value="${pageRequest.filters.biko}"  name="s_biko"  />
			</td>
		</tr>	
	</table>
</fieldset>
<div class="handleControl">
	<input type="submit" class="stdButton" style="width:80px" value="查询" onclick="getReferenceForm(this).action='${ctx}/pages/Pjinfo/list.do'"/>
	<input type="submit" class="stdButton" style="width:80px" value="新增" onclick="getReferenceForm(this).action='${ctx}/pages/Pjinfo/create.do'"/>
	<input type="button" class="stdButton" style="width:80px" value="删除" onclick="batchDelete('${ctx}/pages/Pjinfo/delete.do','items',document.forms.ec)"/>
<div>
</form>
</div>

<ec:table items='page.result' var="item" method="get"
	retrieveRowsCallback="limit" sortRowsCallback="limit" filterRowsCallback="limit"
	action="${ctx}/pages/Pjinfo/list.do" autoIncludeParameters="true">
	<ec:row>
		<ec:column property="选择" title="<input type='checkbox' onclick=\"setAllCheckboxState('items',this.checked)\" >" sortable="false" width="3%" viewsAllowed="html">
			<input type="checkbox" name="items" value="projectid=${item.projectid}&"/>
		</ec:column>
		<ec:column property="enddate" value="${item.enddateString}" title="<%=Pjinfo.ALIAS_ENDDATE%>"/>
		<ec:column property="startdate" value="${item.startdateString}" title="<%=Pjinfo.ALIAS_STARTDATE%>"/>
		<ec:column property="prjmei"  title="<%=Pjinfo.ALIAS_PRJMEI%>"/>
		<ec:column property="kyakuname"  title="<%=Pjinfo.ALIAS_KYAKUNAME%>"/>
		<ec:column property="cancelflag"  title="<%=Pjinfo.ALIAS_CANCELFLAG%>"/>
		<ec:column property="intimestp"  title="<%=Pjinfo.ALIAS_INTIMESTP%>"/>
		<ec:column property="uptimestp"  title="<%=Pjinfo.ALIAS_UPTIMESTP%>"/>
		<ec:column property="projecttyuname"  title="<%=Pjinfo.ALIAS_PROJECTTYUNAME%>"/>
		<ec:column property="projecteiname"  title="<%=Pjinfo.ALIAS_PROJECTEINAME%>"/>
		<ec:column property="muserid"  title="<%=Pjinfo.ALIAS_MUSERID%>"/>
		<ec:column property="ystartdate" value="${item.ystartdateString}" title="<%=Pjinfo.ALIAS_YSTARTDATE%>"/>
		<ec:column property="yenddate" value="${item.yenddateString}" title="<%=Pjinfo.ALIAS_YENDDATE%>"/>
		<ec:column property="usernum"  title="<%=Pjinfo.ALIAS_USERNUM%>"/>
		<ec:column property="pjgaiyou"  title="<%=Pjinfo.ALIAS_PJGAIYOU%>"/>
		<ec:column property="pjem"  title="<%=Pjinfo.ALIAS_PJEM%>"/>
		<ec:column property="statusflg"  title="<%=Pjinfo.ALIAS_STATUSFLG%>"/>
		<ec:column property="supuserid"  title="<%=Pjinfo.ALIAS_SUPUSERID%>"/>
		<ec:column property="biko"  title="<%=Pjinfo.ALIAS_BIKO%>"/>
		<ec:column property="操作" title="操作" sortable="false" viewsAllowed="html">
			<a href="${ctx}/pages/Pjinfo/show.do?projectid=${item.projectid}&">查看</a>&nbsp;&nbsp;&nbsp;
			<a href="${ctx}/pages/Pjinfo/edit.do?projectid=${item.projectid}&">修改</a>
		</ec:column>
	</ec:row>
</ec:table>

</body>

</html>

