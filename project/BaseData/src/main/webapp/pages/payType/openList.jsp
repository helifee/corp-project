<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insert title here</title>
<jsp:include page="${ctx}/pages/common/tags.jsp"></jsp:include>
<script src="${ctx}/static/javascript/payType/openList.js"></script>
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
					<td colSpan='2'>
						<a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="query('module','searchForm');">查询</a>
	    				<a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-clear'" onclick="cleanSearch('module','searchForm')" >清空</a>
					</td>
				</tr>
			</table>    	
		</form>
		
		<!-- 操作按钮 -->
		<div id="sel" style="padding:5px" class="list-action">
				<a href="javascript:;"class="easyui-linkbutton"  onclick="add('添加',300,300,'openListAdd.jsp','${pageContext.request.contextPath}/paytype/newpaytype')">新增 </a>
				<!-- <a href="javascript:void(0);" class="easyui-linkbutton"  onclick="delByIds('../data/balanceAcctDetial2.json')">删除</a> -->
		</div>

	 </div>
	<!-- 列表 -->
	<table id='module'></table>
</body>
</html>