<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>å®¡æ ¸åè¡¨</title>
	<link rel="stylesheet" type="text/css" href="../../static/css/framework/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="../../static/css/framework/themes/icon.css">
	<link rel="stylesheet" type="text/css" href="../../static/css/base.css">
	<script src="../../static/javascript/framework/jquery.min.js"></script>
	<script src="../../static/javascript/framework/jquery.easyui.min.js"></script>
	<script src="../../static/javascript/framework/easyui-lang-zh_CN.js"></script>
	<script src="../../static/javascript/framework/easyui-util.js"></script>
	<script src="../../static/javascript/util/dataGrid.js"></script>
	<script src="../../static/javascript/balanceCenter/verifyList.js"></script>
</head>
<body>
     <!-- å¤´é¨å è½½åå®¹-->
	 <div id="toolbar" style="padding:5px" class="clearfix toolbar">
	  	<!-- æ¥è¯¢æé® æ¡ä»¶-->
		<form id="searchForm" method="post" class="searchForm">	
			<table>
				<tr>
					<td>
			 			<label class="search-name">ç»ç®ä¸­å¿</label>
			 			<input type="text" name="text"/>
			 		</td>
			 		<td>
			 			<label class="search-name">ä¸­å¿ä¼ä¸</label>
			 			<input type="text" name="centerCorpName"/>
			 		</td>
			 		<td>
			 			<label class="search-name">å®¡æ ¸ç¶æ</label>
			 			<select name="order_status"  class="easyui-combobox width160" editable="false" data-options="panelHeight:'auto'">
				        	<option value="">å¨é¨</option>
							<option value="1">å¾å®¡æ ¸</option>
							<option value="2">å®¡æ ¸æç»</option>
						</select>
			 		</td>
					<td>
						<a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="query('module','searchForm');">æ¥è¯¢</a>
	    				<a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-clear'" onclick="cleanSearch('module','searchForm')" >æ¸ç©º</a>
					</td>
				</tr>
			</table>    	
		</form>
	 </div>
	 
	<!-- åè¡¨ -->
	<table id='module'></table>
</body>
</html>