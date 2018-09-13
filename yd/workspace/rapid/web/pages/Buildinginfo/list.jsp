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
	<title><%=Buildinginfo.TABLE_ALIAS%> 维护</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<div class="queryPanel">
<form action="<c:url value="/pages/Buildinginfo/list.do"/>" method="get" style="display: inline;">
<fieldset>
	<legend>搜索</legend>
	<table>
		<tr>	
			<td class="tdLabel">
					<%=Buildinginfo.ALIAS_CITYID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.cityid}"  name="s_cityid"  />
			</td>
			<td class="tdLabel">
					<%=Buildinginfo.ALIAS_DISTID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.distid}"  name="s_distid"  />
			</td>
			<td class="tdLabel">
					<%=Buildinginfo.ALIAS_BUILDNAME%>
			</td>		
			<td>
				<input value="${pageRequest.filters.buildname}"  name="s_buildname"  />
			</td>
			<td class="tdLabel">
					<%=Buildinginfo.ALIAS_ADDRESS%>
			</td>		
			<td>
				<input value="${pageRequest.filters.address}"  name="s_address"  />
			</td>
		</tr>	
		<tr>	
			<td class="tdLabel">
					<%=Buildinginfo.ALIAS_SURPLUS_NUMBER%>
			</td>		
			<td>
				<input value="${pageRequest.filters.surplusNumber}"  name="s_surplusNumber"  />
			</td>
			<td class="tdLabel">
					<%=Buildinginfo.ALIAS_STARTING_PRICE%>
			</td>		
			<td>
				<input value="${pageRequest.filters.startingPrice}"  name="s_startingPrice"  />
			</td>
			<td class="tdLabel">
					<%=Buildinginfo.ALIAS_EVEN_PRICE%>
			</td>		
			<td>
				<input value="${pageRequest.filters.evenPrice}"  name="s_evenPrice"  />
			</td>
			<td class="tdLabel">
					<%=Buildinginfo.ALIAS_NOTICE%>
			</td>		
			<td>
				<input value="${pageRequest.filters.notice}"  name="s_notice"  />
			</td>
			<td class="tdLabel">
					<%=Buildinginfo.ALIAS_IMAGE_PATH%>
			</td>		
			<td>
				<input value="${pageRequest.filters.imagePath}"  name="s_imagePath"  />
			</td>
		</tr>	
		<tr>	
			<td class="tdLabel">
					<%=Buildinginfo.ALIAS_SALES_COMPANY%>
			</td>		
			<td>
				<input value="${pageRequest.filters.salesCompany}"  name="s_salesCompany"  />
			</td>
			<td class="tdLabel">
					<%=Buildinginfo.ALIAS_DETAIL_INTRODUCTION%>
			</td>		
			<td>
				<input value="${pageRequest.filters.detailIntroduction}"  name="s_detailIntroduction"  />
			</td>
			<td class="tdLabel">
					<%=Buildinginfo.ALIAS_FLAG%>
			</td>		
			<td>
				<input value="${pageRequest.filters.flag}"  name="s_flag"  />
			</td>
			<td class="tdLabel">
					<%=Buildinginfo.ALIAS_UPDATETIME%>
			</td>		
			<td>
				<input value="${pageRequest.filters.updatetime}" onclick="WdatePicker({dateFmt:'<%=Buildinginfo.FORMAT_UPDATETIME%>'})"  name="s_updatetime"   />
			</td>
		</tr>	
	</table>
</fieldset>
<div class="handleControl">
	<input type="submit" class="stdButton" style="width:80px" value="查询" onclick="getReferenceForm(this).action='${ctx}/pages/Buildinginfo/list.do'"/>
	<input type="submit" class="stdButton" style="width:80px" value="新增" onclick="getReferenceForm(this).action='${ctx}/pages/Buildinginfo/create.do'"/>
	<input type="button" class="stdButton" style="width:80px" value="删除" onclick="batchDelete('${ctx}/pages/Buildinginfo/delete.do','items',document.forms.ec)"/>
<div>
</form>
</div>

<ec:table items='page.result' var="item" method="get"
	retrieveRowsCallback="limit" sortRowsCallback="limit" filterRowsCallback="limit"
	action="${ctx}/pages/Buildinginfo/list.do" autoIncludeParameters="true">
	<ec:row>
		<ec:column property="选择" title="<input type='checkbox' onclick=\"setAllCheckboxState('items',this.checked)\" >" sortable="false" width="3%" viewsAllowed="html">
			<input type="checkbox" name="items" value="buildid=${item.buildid}&"/>
		</ec:column>
		<ec:column property="cityid"  title="<%=Buildinginfo.ALIAS_CITYID%>"/>
		<ec:column property="distid"  title="<%=Buildinginfo.ALIAS_DISTID%>"/>
		<ec:column property="buildname"  title="<%=Buildinginfo.ALIAS_BUILDNAME%>"/>
		<ec:column property="address"  title="<%=Buildinginfo.ALIAS_ADDRESS%>"/>
		<ec:column property="surplusNumber"  title="<%=Buildinginfo.ALIAS_SURPLUS_NUMBER%>"/>
		<ec:column property="startingPrice"  title="<%=Buildinginfo.ALIAS_STARTING_PRICE%>"/>
		<ec:column property="evenPrice"  title="<%=Buildinginfo.ALIAS_EVEN_PRICE%>"/>
		<ec:column property="notice"  title="<%=Buildinginfo.ALIAS_NOTICE%>"/>
		<ec:column property="imagePath"  title="<%=Buildinginfo.ALIAS_IMAGE_PATH%>"/>
		<ec:column property="salesCompany"  title="<%=Buildinginfo.ALIAS_SALES_COMPANY%>"/>
		<ec:column property="detailIntroduction"  title="<%=Buildinginfo.ALIAS_DETAIL_INTRODUCTION%>"/>
		<ec:column property="flag"  title="<%=Buildinginfo.ALIAS_FLAG%>"/>
		<ec:column property="updatetime" value="${item.updatetimeString}" title="<%=Buildinginfo.ALIAS_UPDATETIME%>"/>
		<ec:column property="操作" title="操作" sortable="false" viewsAllowed="html">
			<a href="${ctx}/pages/Buildinginfo/show.do?buildid=${item.buildid}&">查看</a>&nbsp;&nbsp;&nbsp;
			<a href="${ctx}/pages/Buildinginfo/edit.do?buildid=${item.buildid}&">修改</a>
		</ec:column>
	</ec:row>
</ec:table>

</body>

</html>

