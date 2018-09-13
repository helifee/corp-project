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
	<title><%=TabMrhyyl.TABLE_ALIAS%> 维护</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<div class="queryPanel">
<form action="<c:url value="/pages/TabMrhyyl/list.do"/>" method="get" style="display: inline;">
<fieldset>
	<legend>搜索</legend>
	<table>
		<tr>	
			<td class="tdLabel">
					<%=TabMrhyyl.ALIAS_HYRQ%>
			</td>		
			<td>
				<input value="${pageRequest.filters.hyrq}" onclick="WdatePicker({dateFmt:'<%=TabMrhyyl.FORMAT_HYRQ%>'})"  name="s_hyrq"   />
			</td>
			<td class="tdLabel">
					<%=TabMrhyyl.ALIAS_HYKSSJ%>
			</td>		
			<td>
				<input value="${pageRequest.filters.hykssj}" onclick="WdatePicker({dateFmt:'<%=TabMrhyyl.FORMAT_HYKSSJ%>'})"  name="s_hykssj"   />
			</td>
			<td class="tdLabel">
					<%=TabMrhyyl.ALIAS_HYJSSJ%>
			</td>		
			<td>
				<input value="${pageRequest.filters.hyjssj}" onclick="WdatePicker({dateFmt:'<%=TabMrhyyl.FORMAT_HYJSSJ%>'})"  name="s_hyjssj"   />
			</td>
			<td class="tdLabel">
					<%=TabMrhyyl.ALIAS_HYZT%>
			</td>		
			<td>
				<input value="${pageRequest.filters.hyzt}"  name="s_hyzt"  />
			</td>
			<td class="tdLabel">
					<%=TabMrhyyl.ALIAS_HYSID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.hysid}"  name="s_hysid"  />
			</td>
		</tr>	
		<tr>	
			<td class="tdLabel">
					<%=TabMrhyyl.ALIAS_YYRID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.yyrid}"  name="s_yyrid"  />
			</td>
			<td class="tdLabel">
					<%=TabMrhyyl.ALIAS_BMBZ%>
			</td>		
			<td>
				<input value="${pageRequest.filters.bmbz}"  name="s_bmbz"  />
			</td>
			<td class="tdLabel">
					<%=TabMrhyyl.ALIAS_CJZRS%>
			</td>		
			<td>
				<input value="${pageRequest.filters.cjzrs}"  name="s_cjzrs"  />
			</td>
			<td class="tdLabel">
					<%=TabMrhyyl.ALIAS_ZQHYQF%>
			</td>		
			<td>
				<input value="${pageRequest.filters.zqhyqf}"  name="s_zqhyqf"  />
			</td>
			<td class="tdLabel">
					<%=TabMrhyyl.ALIAS_ZQHYID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.zqhyid}"  name="s_zqhyid"  />
			</td>
		</tr>	
		<tr>	
			<td class="tdLabel">
					<%=TabMrhyyl.ALIAS_HYSBG%>
			</td>		
			<td>
				<input value="${pageRequest.filters.hysbg}"  name="s_hysbg"  />
			</td>
			<td class="tdLabel">
					<%=TabMrhyyl.ALIAS_UPDATETIME%>
			</td>		
			<td>
				<input value="${pageRequest.filters.updatetime}" onclick="WdatePicker({dateFmt:'<%=TabMrhyyl.FORMAT_UPDATETIME%>'})"  name="s_updatetime"   />
			</td>
		</tr>	
	</table>
</fieldset>
<div class="handleControl">
	<input type="submit" class="stdButton" style="width:80px" value="查询" onclick="getReferenceForm(this).action='${ctx}/pages/TabMrhyyl/list.do'"/>
	<input type="submit" class="stdButton" style="width:80px" value="新增" onclick="getReferenceForm(this).action='${ctx}/pages/TabMrhyyl/create.do'"/>
	<input type="button" class="stdButton" style="width:80px" value="删除" onclick="batchDelete('${ctx}/pages/TabMrhyyl/delete.do','items',document.forms.ec)"/>
<div>
</form>
</div>

<ec:table items='page.result' var="item" method="get"
	retrieveRowsCallback="limit" sortRowsCallback="limit" filterRowsCallback="limit"
	action="${ctx}/pages/TabMrhyyl/list.do" autoIncludeParameters="true">
	<ec:row>
		<ec:column property="选择" title="<input type='checkbox' onclick=\"setAllCheckboxState('items',this.checked)\" >" sortable="false" width="3%" viewsAllowed="html">
			<input type="checkbox" name="items" value="hyrq=${item.id.hyrq}&hykssj=${item.id.hykssj}&hysid=${item.id.hysid}&"/>
		</ec:column>
		<ec:column property="hyrq" value="${item.hyrqString}" title="<%=TabMrhyyl.ALIAS_HYRQ%>"/>
		<ec:column property="hykssj" value="${item.hykssjString}" title="<%=TabMrhyyl.ALIAS_HYKSSJ%>"/>
		<ec:column property="hyjssj" value="${item.hyjssjString}" title="<%=TabMrhyyl.ALIAS_HYJSSJ%>"/>
		<ec:column property="hyzt"  title="<%=TabMrhyyl.ALIAS_HYZT%>"/>
		<ec:column property="hysid"  title="<%=TabMrhyyl.ALIAS_HYSID%>"/>
		<ec:column property="yyrid"  title="<%=TabMrhyyl.ALIAS_YYRID%>"/>
		<ec:column property="bmbz"  title="<%=TabMrhyyl.ALIAS_BMBZ%>"/>
		<ec:column property="cjzrs"  title="<%=TabMrhyyl.ALIAS_CJZRS%>"/>
		<ec:column property="zqhyqf"  title="<%=TabMrhyyl.ALIAS_ZQHYQF%>"/>
		<ec:column property="zqhyid"  title="<%=TabMrhyyl.ALIAS_ZQHYID%>"/>
		<ec:column property="hysbg"  title="<%=TabMrhyyl.ALIAS_HYSBG%>"/>
		<ec:column property="updatetime" value="${item.updatetimeString}" title="<%=TabMrhyyl.ALIAS_UPDATETIME%>"/>
		<ec:column property="操作" title="操作" sortable="false" viewsAllowed="html">
			<a href="${ctx}/pages/TabMrhyyl/show.do?hyrq=${item.id.hyrq}&hykssj=${item.id.hykssj}&hysid=${item.id.hysid}&">查看</a>&nbsp;&nbsp;&nbsp;
			<a href="${ctx}/pages/TabMrhyyl/edit.do?hyrq=${item.id.hyrq}&hykssj=${item.id.hykssj}&hysid=${item.id.hysid}&">修改</a>
		</ec:column>
	</ec:row>
</ec:table>

</body>

</html>

