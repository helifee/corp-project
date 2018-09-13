<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<script src="${ctx}/static/javascript/util/dataGrid.js"></script>
<script src="${ctx}/static/javascript/balanceCenter/memberBusiness.js"></script>
<style type="text/css">
	  *{ margin: 0; padding: 0;}
	  .item-ul{
	  	/*margin-top: 20px;*/
	  }
	  .item-ul li{list-style: none; 
	  	float: left;
	  	padding-left: 10px;
	  	padding-top: 10px;
	  	padding-bottom: 10px;
	  }
	  .item-ul .itemdiv{
	  	position: relative;
	  }
	  .item-ul .itemdiv span{
	  	background: #FAEBD7;
	  	padding: 5px;
	  	border-radius: 5px;
	  }
	  .item-ul .itemdiv .item-del{
	  	position: absolute;
	  	top: -16px;
	  	right: 0;
	  	cursor: pointer;
	  }
</style>
<div class="easyui-layout" style='background:#F4F4F4; width:100%;'>
	<div style='padding-top:5px; padding-left:5px;'>
		<input type='hidden' id='treeId' />
		<b>结算中心名称：</b><span id='text'></span>
		<b>中心企业名称：</b><span id='centerCorpName'></span>
	</div>
	<div style='padding-top:5px; padding-left:5px; height:100px;overflow-y:auto'><b>已选企业：</b>
	<ul class='item-ul clearfix' id='item-ul'>
		<!-- <li>
			<div class='itemdiv'>
				<span>å®ä¿¡ç§ææéå¬å¸</span>
				<i class='item-del'>x</i>
			</div>
		</li> -->
	</ul>
	</div>
</div>

<div style="width:485px;height: 300px;">
	<!--头部加载内容-->
	 <div id="toolbar1" style="padding:5px" class="clearfix toolbar">
	  	<!-- 查询按钮 条件-->
		 <form id="searchForm1" method="post" class="searchForm">	
			<table>
				<tr>
					<td>
						<label class="list-name">企业名称</label>
						<input name="name"  type="text" class="easyui-textbox"/>
					</td>
					<td>
						<a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="query('module','searchForm');">查询</a>
					</td>
				</tr>
			</table>   	
		</form>
	 </div>
	<!-- 列表 -->
	<table id='module1'></table>
</div>