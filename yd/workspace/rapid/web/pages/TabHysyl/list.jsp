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
	<title><%=TabHysyl.TABLE_ALIAS%> 维护</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<div class="queryPanel">
<form action="<c:url value="/pages/TabHysyl/list.do"/>" method="get" style="display: inline;">
<fieldset>
	<legend>搜索</legend>
	<table>
		<tr>	
			<td class="tdLabel">
					<%=TabHysyl.ALIAS_HYSMC%>
			</td>		
			<td>
				<input value="${pageRequest.filters.hysmc}"  name="s_hysmc"  />
			</td>
			<td class="tdLabel">
					<%=TabHysyl.ALIAS_RNRS%>
			</td>		
			<td>
				<input value="${pageRequest.filters.rnrs}"  name="s_rnrs"  />
			</td>
			<td class="tdLabel">
					<%=TabHysyl.ALIAS_DH%>
			</td>		
			<td>
				<input value="${pageRequest.filters.dh}"  name="s_dh"  />
			</td>
			<td class="tdLabel">
					<%=TabHysyl.ALIAS_SB%>
			</td>		
			<td>
				<input value="${pageRequest.filters.sb}"  name="s_sb"  />
			</td>
		</tr>	
		<tr>	
			<td class="tdLabel">
					<%=TabHysyl.ALIAS_HYBGBZ%>
			</td>		
			<td>
				<input value="${pageRequest.filters.hybgbz}"  name="s_hybgbz"  />
			</td>
			<td class="tdLabel">
					<%=TabHysyl.ALIAS_WXJK%>
			</td>		
			<td>
				<input value="${pageRequest.filters.wxjk}"  name="s_wxjk"  />
			</td>
			<td class="tdLabel">
					<%=TabHysyl.ALIAS_SORTID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.sortid}"  name="s_sortid"  />
			</td>
			<td class="tdLabel">
					<%=TabHysyl.ALIAS_IMAGEFROMX%>
			</td>		
			<td>
				<input value="${pageRequest.filters.imagefromx}"  name="s_imagefromx"  />
			</td>
			<td class="tdLabel">
					<%=TabHysyl.ALIAS_IMAGEFROMY%>
			</td>		
			<td>
				<input value="${pageRequest.filters.imagefromy}"  name="s_imagefromy"  />
			</td>
		</tr>	
		<tr>	
			<td class="tdLabel">
					<%=TabHysyl.ALIAS_IMAGETOX%>
			</td>		
			<td>
				<input value="${pageRequest.filters.imagetox}"  name="s_imagetox"  />
			</td>
			<td class="tdLabel">
					<%=TabHysyl.ALIAS_IMAGETOY%>
			</td>		
			<td>
				<input value="${pageRequest.filters.imagetoy}"  name="s_imagetoy"  />
			</td>
			<td class="tdLabel">
					<%=TabHysyl.ALIAS_UPDATETIME%>
			</td>		
			<td>
				<input value="${pageRequest.filters.updatetime}" onclick="WdatePicker({dateFmt:'<%=TabHysyl.FORMAT_UPDATETIME%>'})"  name="s_updatetime"   />
			</td>
		</tr>	
	</table>
</fieldset>
<div class="handleControl">
	<input type="submit" class="stdButton" style="width:80px" value="查询" onclick="getReferenceForm(this).action='${ctx}/pages/TabHysyl/list.do'"/>
	<input type="submit" class="stdButton" style="width:80px" value="新增" onclick="getReferenceForm(this).action='${ctx}/pages/TabHysyl/create.do'"/>
	<input type="button" class="stdButton" style="width:80px" value="删除" onclick="batchDelete('${ctx}/pages/TabHysyl/delete.do','items',document.forms.ec)"/>
<div>
</form>
</div>

<ec:table items='page.result' var="item" method="get"
	retrieveRowsCallback="limit" sortRowsCallback="limit" filterRowsCallback="limit"
	action="${ctx}/pages/TabHysyl/list.do" autoIncludeParameters="true">
	<ec:row>
		<ec:column property="选择" title="<input type='checkbox' onclick=\"setAllCheckboxState('items',this.checked)\" >" sortable="false" width="3%" viewsAllowed="html">
			<input type="checkbox" name="items" value="hysid=${item.hysid}&"/>
		</ec:column>
		<ec:column property="hysmc"  title="<%=TabHysyl.ALIAS_HYSMC%>"/>
		<ec:column property="rnrs"  title="<%=TabHysyl.ALIAS_RNRS%>"/>
		<ec:column property="dh"  title="<%=TabHysyl.ALIAS_DH%>"/>
		<ec:column property="sb"  title="<%=TabHysyl.ALIAS_SB%>"/>
		<ec:column property="hybgbz"  title="<%=TabHysyl.ALIAS_HYBGBZ%>"/>
		<ec:column property="wxjk"  title="<%=TabHysyl.ALIAS_WXJK%>"/>
		<ec:column property="sortid"  title="<%=TabHysyl.ALIAS_SORTID%>"/>
		<ec:column property="imagefromx"  title="<%=TabHysyl.ALIAS_IMAGEFROMX%>"/>
		<ec:column property="imagefromy"  title="<%=TabHysyl.ALIAS_IMAGEFROMY%>"/>
		<ec:column property="imagetox"  title="<%=TabHysyl.ALIAS_IMAGETOX%>"/>
		<ec:column property="imagetoy"  title="<%=TabHysyl.ALIAS_IMAGETOY%>"/>
		<ec:column property="updatetime" value="${item.updatetimeString}" title="<%=TabHysyl.ALIAS_UPDATETIME%>"/>
		<ec:column property="操作" title="操作" sortable="false" viewsAllowed="html">
			<a href="${ctx}/pages/TabHysyl/show.do?hysid=${item.hysid}&">查看</a>&nbsp;&nbsp;&nbsp;
			<a href="${ctx}/pages/TabHysyl/edit.do?hysid=${item.hysid}&">修改</a>
		</ec:column>
	</ec:row>
</ec:table>

</body>

</html>

