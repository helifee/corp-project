<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>启用数据</title>
	<link rel="stylesheet" type="text/css" href="../../static/css/framework/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="../../static/css/framework/themes/icon.css">
	<link rel="stylesheet" type="text/css" href="../../static/css/base.css">
	<script src="../../static/javascript/framework/jquery.min.js"></script>
	<script src="../../static/javascript/framework/jquery.easyui.min.js"></script>
	<script src="../../static/javascript/framework/easyui-lang-zh_CN.js"></script>
	<script src="../../static/javascript/framework/easyui-util.js"></script>
	<script src="../../static/javascript/util/dataGrid.js"></script>
	<script type="text/javascript" src='opinionList.js'></script>

</head>
<body>
    <!-- 头部加载内容-->
	 <div id="toolbar" style="padding:5px"  class="clearfix toolbar">
	  	<!-- 查询按钮 条件-->
		 <form id="searchForm" method="post" class="searchForm">	
			<table>
				<tr>				
			 		<td>
			 			<label class="search-name">支付类型</label>
			 			<input type="text" name="payType"/>
			 		</td>
			 		<td>
			 			<label class="search-name">审核状态</label>
			 			<select name="status" class="easyui-combobox width160" editable="false" data-options="panelHeight:'auto'">
			 				<option value="0">待审核</option>
			 				<option value="1">审核通过</option>
			 				<option value="2">审核拒绝</option>
			 			</select>
			 		</td>
					<td colSpan='2'>
						<a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="query('module','searchForm');">查询</a>
	    				<a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-clear'" onclick="cleanSearch('module','searchForm')" >清空</a>
					</td>
				</tr>
			</table>    	
		</form>
		
		<!-- 操作按钮 -->
	<!-- 	<div id="sel" style="padding:5px" class="list-action">
			<a href="javascript:;"class="easyui-linkbutton"  onclick="add('添加',300,300,'wayBaseDateAdd.html','后台url')">新增 </a>
			<a href="javascript:void(0);" class="easyui-linkbutton"  onclick="delByIds('../data/balanceAcctDetial2.json')">删除</a>
	</div> -->

	 </div>
	<!-- 列表 -->
	<table id='module'></table>

</body>
</html>