<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>未启用数据</title>
	<jsp:include  page='${ctx}/pages/common/tags.jsp'></jsp:include>
	<script src="${ctx}/static/javascript/balanceCenter/unEnableList.js"></script>
</head>
<body>
		    <!-- 头部加载内容-->
	 <div id="toolbar" style="padding:5px" class="clearfix toolbar">
	  	<!-- 查询按钮 条件-->
		<form id="searchForm" method="post" class="searchForm">	
			<table>
				<tr>
					<td>
			 			<label class="search-name">结算中心</label>
			 			<input type="text" name="text"/>
			 		</td>
			 		<td>
			 			<label class="search-name">中心企业</label>
			 			<input type="text" name="centerCorpName"/>
			 		</td>
			 		<td>
			 			<label class="search-name">审核状态</label>
			 			<select name="order_status"  class="easyui-combobox width160" editable="false" data-options="panelHeight:'auto'">
				        	<option value="">全部</option>
							<option value="1">待审核</option>
							<option value="2">审核拒绝</option>
						</select>
			 		</td>
					<td>
						<a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="query('module','searchForm');">查询</a>
	    				<a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-clear'" onclick="cleanSearch('module','searchForm')" >清空</a>
					</td>
				</tr>
			</table>    	
		</form>
	 </div>
	 
	<!-- 列表 -->
	<table id='module'></table>
</body>
</html>