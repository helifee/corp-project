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
	<title><%=TabZqhyyl.TABLE_ALIAS%> 维护</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<div class="queryPanel">
<form action="<c:url value="/pages/TabZqhyyl/list.do"/>" method="get" style="display: inline;">
<fieldset>
	<legend>搜索</legend>
	<table>
		<tr>	
			<td class="tdLabel">
					<%=TabZqhyyl.ALIAS_ZQHYID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.zqhyid}"  name="s_zqhyid"  />
			</td>
			<td class="tdLabel">
					<%=TabZqhyyl.ALIAS_ZQNHYTS%>
			</td>		
			<td>
				<input value="${pageRequest.filters.zqnhyts}"  name="s_zqnhyts"  />
			</td>
			<td class="tdLabel">
					<%=TabZqhyyl.ALIAS_ZQLX%>
			</td>		
			<td>
				<input value="${pageRequest.filters.zqlx}"  name="s_zqlx"  />
			</td>
			<td class="tdLabel">
					<%=TabZqhyyl.ALIAS_HYBZ%>
			</td>		
			<td>
				<input value="${pageRequest.filters.hybz}"  name="s_hybz"  />
			</td>
			<td class="tdLabel">
					<%=TabZqhyyl.ALIAS_ZQHYZT%>
			</td>		
			<td>
				<input value="${pageRequest.filters.zqhyzt}"  name="s_zqhyzt"  />
			</td>
		</tr>	
		<tr>	
			<td class="tdLabel">
					<%=TabZqhyyl.ALIAS_BMBZ%>
			</td>		
			<td>
				<input value="${pageRequest.filters.bmbz}"  name="s_bmbz"  />
			</td>
			<td class="tdLabel">
					<%=TabZqhyyl.ALIAS_HYSID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.hysid}"  name="s_hysid"  />
			</td>
			<td class="tdLabel">
					<%=TabZqhyyl.ALIAS_HYKSRQ%>
			</td>		
			<td>
				<input value="${pageRequest.filters.hyksrq}" onclick="WdatePicker({dateFmt:'<%=TabZqhyyl.FORMAT_HYKSRQ%>'})"  name="s_hyksrq"   />
			</td>
			<td class="tdLabel">
					<%=TabZqhyyl.ALIAS_HYJSRQ%>
			</td>		
			<td>
				<input value="${pageRequest.filters.hyjsrq}" onclick="WdatePicker({dateFmt:'<%=TabZqhyyl.FORMAT_HYJSRQ%>'})"  name="s_hyjsrq"   />
			</td>
			<td class="tdLabel">
					<%=TabZqhyyl.ALIAS_HYKSSJ%>
			</td>		
			<td>
				<input value="${pageRequest.filters.hykssj}" onclick="WdatePicker({dateFmt:'<%=TabZqhyyl.FORMAT_HYKSSJ%>'})"  name="s_hykssj"   />
			</td>
		</tr>	
		<tr>	
			<td class="tdLabel">
					<%=TabZqhyyl.ALIAS_HYJSSJ%>
			</td>		
			<td>
				<input value="${pageRequest.filters.hyjssj}" onclick="WdatePicker({dateFmt:'<%=TabZqhyyl.FORMAT_HYJSSJ%>'})"  name="s_hyjssj"   />
			</td>
			<td class="tdLabel">
					<%=TabZqhyyl.ALIAS_YYRID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.yyrid}"  name="s_yyrid"  />
			</td>
			<td class="tdLabel">
					<%=TabZqhyyl.ALIAS_XMZID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.xmzid}"  name="s_xmzid"  />
			</td>
			<td class="tdLabel">
					<%=TabZqhyyl.ALIAS_CJZRS%>
			</td>		
			<td>
				<input value="${pageRequest.filters.cjzrs}"  name="s_cjzrs"  />
			</td>
			<td class="tdLabel">
					<%=TabZqhyyl.ALIAS_GGBZ%>
			</td>		
			<td>
				<input value="${pageRequest.filters.ggbz}"  name="s_ggbz"  />
			</td>
		</tr>	
		<tr>	
			<td class="tdLabel">
					<%=TabZqhyyl.ALIAS_DELFLG%>
			</td>		
			<td>
				<input value="${pageRequest.filters.delflg}"  name="s_delflg"  />
			</td>
			<td class="tdLabel">
					<%=TabZqhyyl.ALIAS_UPDATETIME%>
			</td>		
			<td>
				<input value="${pageRequest.filters.updatetime}" onclick="WdatePicker({dateFmt:'<%=TabZqhyyl.FORMAT_UPDATETIME%>'})"  name="s_updatetime"   />
			</td>
		</tr>	
	</table>
</fieldset>
<div class="handleControl">
	<input type="submit" class="stdButton" style="width:80px" value="查询" onclick="getReferenceForm(this).action='${ctx}/pages/TabZqhyyl/list.do'"/>
	<input type="submit" class="stdButton" style="width:80px" value="新增" onclick="getReferenceForm(this).action='${ctx}/pages/TabZqhyyl/create.do'"/>
	<input type="button" class="stdButton" style="width:80px" value="删除" onclick="batchDelete('${ctx}/pages/TabZqhyyl/delete.do','items',document.forms.ec)"/>
<div>
</form>
</div>

<ec:table items='page.result' var="item" method="get"
	retrieveRowsCallback="limit" sortRowsCallback="limit" filterRowsCallback="limit"
	action="${ctx}/pages/TabZqhyyl/list.do" autoIncludeParameters="true">
	<ec:row>
		<ec:column property="选择" title="<input type='checkbox' onclick=\"setAllCheckboxState('items',this.checked)\" >" sortable="false" width="3%" viewsAllowed="html">
			<input type="checkbox" name="items" value="zqhyid=${item.id.zqhyid}&zqnhyts=${item.id.zqnhyts}&"/>
		</ec:column>
		<ec:column property="zqhyid"  title="<%=TabZqhyyl.ALIAS_ZQHYID%>"/>
		<ec:column property="zqnhyts"  title="<%=TabZqhyyl.ALIAS_ZQNHYTS%>"/>
		<ec:column property="zqlx"  title="<%=TabZqhyyl.ALIAS_ZQLX%>"/>
		<ec:column property="hybz"  title="<%=TabZqhyyl.ALIAS_HYBZ%>"/>
		<ec:column property="zqhyzt"  title="<%=TabZqhyyl.ALIAS_ZQHYZT%>"/>
		<ec:column property="bmbz"  title="<%=TabZqhyyl.ALIAS_BMBZ%>"/>
		<ec:column property="hysid"  title="<%=TabZqhyyl.ALIAS_HYSID%>"/>
		<ec:column property="hyksrq" value="${item.hyksrqString}" title="<%=TabZqhyyl.ALIAS_HYKSRQ%>"/>
		<ec:column property="hyjsrq" value="${item.hyjsrqString}" title="<%=TabZqhyyl.ALIAS_HYJSRQ%>"/>
		<ec:column property="hykssj" value="${item.hykssjString}" title="<%=TabZqhyyl.ALIAS_HYKSSJ%>"/>
		<ec:column property="hyjssj" value="${item.hyjssjString}" title="<%=TabZqhyyl.ALIAS_HYJSSJ%>"/>
		<ec:column property="yyrid"  title="<%=TabZqhyyl.ALIAS_YYRID%>"/>
		<ec:column property="xmzid"  title="<%=TabZqhyyl.ALIAS_XMZID%>"/>
		<ec:column property="cjzrs"  title="<%=TabZqhyyl.ALIAS_CJZRS%>"/>
		<ec:column property="ggbz"  title="<%=TabZqhyyl.ALIAS_GGBZ%>"/>
		<ec:column property="delflg"  title="<%=TabZqhyyl.ALIAS_DELFLG%>"/>
		<ec:column property="updatetime" value="${item.updatetimeString}" title="<%=TabZqhyyl.ALIAS_UPDATETIME%>"/>
		<ec:column property="操作" title="操作" sortable="false" viewsAllowed="html">
			<a href="${ctx}/pages/TabZqhyyl/show.do?zqhyid=${item.id.zqhyid}&zqnhyts=${item.id.zqnhyts}&">查看</a>&nbsp;&nbsp;&nbsp;
			<a href="${ctx}/pages/TabZqhyyl/edit.do?zqhyid=${item.id.zqhyid}&zqnhyts=${item.id.zqnhyts}&">修改</a>
		</ec:column>
	</ec:row>
</ec:table>

</body>

</html>

