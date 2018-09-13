<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>结算中心</title>
	<jsp:include  page='${ctx}/pages/common/tags.jsp'></jsp:include>
	<script src="${ctx}/static/javascript/balanceCenter/tree.js"></script>
</head>
<body class="easyui-layout">
	<!-- 左側div引入 -->
	<div data-options="region:'west',split:true,border:false" style="width:200px;">
	   <!-- 树加载 -->
	   <ul id="tree" class="easyui-tree"></ul>
	</div>

	<!--右侧列表-->
	<div data-options="region:'center',plain:true,title:'',border:false" style="overflow: hidden;">
 		
		<!-- 模块名称 -->
		<table id="module"></table>
	 	
		<!-- 查询按钮 条件-->
		<div id="toolbar" style="padding:5px" class="clearfix toolbar">
		    <!-- <input type="hidden" id="creater" value="${creater}" /> -->
			<!-- <form id="searchForm" class="list-choice">	
				<div style="padding-left:5px">
					<label class="list-name">名称 </label><input name="name" class="enoradius margint5" type="text"  id="name" style="width:100px;height:25px"/>
				    <input type="hidden"  id="knowledge_id" name="knowledge_id" /> 
				    <input class="btn btn12" type="button" onclick="query('module','searchForm');" value="查询"/>
				    <input class="btn btn12" type="button" onclick="clearData()"value="清空"/>
				</div>
			</form> -->
			<div style="padding:5px" class="list-action" id='toolBarBtn'>
				<a id = "addBtn" href="javascript:void(0);" class="easyui-linkbutton" onclick="myAdd('新增结算中心',350,200,'add.jsp','${ctx}/settle/save');">新增</a>
				<a href="javascript:void(0);" class="easyui-linkbutton" onclick="myEdit('修改结算中心',350,200,'add.jsp','${ctx}/settle/query','${ctx}/settle/save');">修改</a>
				<a href="javascript:void(0);" class="easyui-linkbutton" onclick="setSettleStatus('${ctx}/settle/delete');">删除</a>
				<a href="javascript:void(0);" class="easyui-linkbutton" onclick="setSettleStatus('${ctx}/settle/setStatus',0);">启用</a>
				<a href="javascript:void(0);" class="easyui-linkbutton" onclick="setSettleStatus('${ctx}/settle/setStatus',1);">停用</a>
				<a href="javascript:void(0);" class="easyui-linkbutton" onclick="setMemberBusiness()">配置成员企业</a>
			</div>

			<div style="margin-top:5px; margin-bottom:5px;">
				<span>中心企业名称：<label id="centerCorpName">宜信集团</label></span>
				<span style="margin-left:50px;">结算中心状态：<label id="status">正常</label></span>
			</div>
	    </div>
	</div>




</body>
</html>