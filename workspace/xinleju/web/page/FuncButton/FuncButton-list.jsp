<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>按钮列表</title>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/jquery/jquery-1.7.2.js"></script>
	<link rel="stylesheet" type="text/css" href="css/mask.css" />
	<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
	<script type="text/javascript" src="js/application.js"></script>
	<script type="text/javascript" src="js/App.js"></script>
	<script type="text/javascript" src="page/FuncButton/funcButton-list.js"></script>
  </head>
  
  <body>
  	<s:form action="FuncButton!list.do" method="post" id="frm" name="frm">
  		<s:hidden name="start"></s:hidden>
  		<s:hidden name="funcModuleId" value="%{#request.funcModuleId}"></s:hidden>
  		<!-- 标题div -->
  		<div class="t_title">
  			<div class="hh">按钮列表</div>
  			<!-- 输入div -->
  			<div class="t_title_input">
  				<input type="text" id="keyWord" name="keyWord" placeholder = "按钮名称" value="${keyWord}"/>
  			</div>
  			<!-- 查询按钮div -->
  			<div class="t_title_input">
  				<a href="#" title="查询" onclick="javascript:doSearch()">
  					<img alt="查询" src="images/icon_search.png" height="24" width="24" align="bottom">
  				</a>
  			</div>
  			<!-- 操作列表div -->
  			<div class="tool">
  				<a href="javascript:void(0)" onclick="addFuncButton(${funcModuleId})" class="t_new">新增</a>
  				<a href="javascript:void(0)" onclick="editFuncButton()" class="t_edit">编辑</a>
  				<a href="javascript:void(0)" onclick="deleteFuncButton()" class="t_del">删除</a>
  			</div>
  			
  		</div>
  		
  		<!-- 列表div -->
  		<div>
  			<table width="100%" class="wd_tablelist01" cellpadding="0" cellspacing="1">
  				<!-- table标题栏 -->
  				<tr>
  					<th width="10px;">
  						&nbsp;
  					</th>
  					<th width="60px;">序号</th>
  					<th>名称</th>
  					<th>编码</th>
  					<th>描述</th>
  				</tr>
  				<s:if test="1 > page.items.size()">
  					<tr align="center"><td colspan="5">无数据</td></tr>
  				</s:if>
  				<s:else>
  				<!-- 迭代菜单列表 -->
  				<s:iterator value="page.items" var="item" status="stat">
  					<tr onclick="chooseThisRow('ids_${item.id}')" >
  					
  						<td align="center">
  							<input type="checkbox" name="ids" id="ids_${item.id}" value="${item.id}"/>
  						</td>
  						<td align="center">
  							${stat.index + 1 }
  						</td>
  						<td align="left">${item.name }</td>
  						<td align="left">${item.code }</td>
  						<td align="left">${item.note }</td>
  					</tr>
  				</s:iterator>
  				</s:else>
  			</table>
  			<!-- 分页div -->
  			<div class="page">
  				<div style="float: left;">
  					&nbsp;
  				</div>
  				<app:PageTag actionName="FuncButton!list.do"></app:PageTag>
  			</div>
  		</div>
  	</s:form>
  </body>
</html>
