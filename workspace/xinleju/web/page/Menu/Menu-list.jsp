<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
  <head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="pragma" content="no-cache" />
	<meta http-equiv="cache-control" content="no-cache" />
	<meta http-equiv="expires" content="0" />
    <title>菜单列表</title>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/jquery/jquery-1.7.2.js"></script>
	<link rel="stylesheet" type="text/css" href="css/mask.css" />
	<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
	<script type="text/javascript" src="js/application.js"></script>
	<script type="text/javascript" src="page/Menu/menu-list.js"></script>
  </head>
  
  <body>
  	<s:form action="Menu!list.do" method="post" id="frm" name="frm">
  		<s:hidden name="start"></s:hidden>
  		<s:hidden name="parentId" id="parentId" value="%{#request.parentId }"></s:hidden>
  		<!-- 标题div -->
  		<div class="t_title">
  			<div class="hh">菜单列表</div>
  			<!-- 输入div -->
  			<div class="t_title_input">
  				<input type="text" id="keyWord" name="keyWord" placeholder = "菜单名称" value="${keyWord}"/>
  			</div>
  			<!-- 查询按钮div -->
  			<div class="t_title_input">
  				<a href="#" title="查询" onclick="javascript:doSearch()">
  					<img alt="查询" src="images/icon_search.png" height="24" width="24" align="bottom">
  				</a>
  			</div>
  			<!-- 操作列表div -->
  			<div class="tool">
  				<a href="javascript:void(0)" onclick="addMenu('${parentId}')" class="t_new">新增</a>
  				<a href="javascript:void(0)" onclick="editMenu()" class="t_edit">编辑</a>
  				<a href="javascript:void(0)" onclick="disable();" class="t_del">禁用</a>
				<a href="javascript:void(0)" onclick="enable();" class="t_submit">启用</a>
				<a href="javascript:void(0)" onclick="maintButton();" class="t_edit">维护按钮</a>
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
  					<th>菜单URL</th>
  					<th>编码</th>
  					<th>状态</th>
  					<th>描述</th>
  				</tr>
  				
  				<!-- 迭代菜单列表 -->
  				<s:iterator value="page.items" var="item" status="stat">
  					<s:if test="null != #item.status && #item.status==1">
						<s:set id="disabledTrClass" value="'disabledTr'"></s:set>
					</s:if>
					<s:else>
						<s:set id="disabledTrClass" value=""></s:set>
					</s:else>
  					<tr class="${disabledTrClass}" onclick="chooseThisRow('ids_${item.id}')" >
  						<td align="center">
  							<input type="checkbox" name="ids" id="ids_${item.id}" value="${item.id}"/>
  						</td>
  						<td align="center">
  							${stat.index + 1 }
  						</td>
  						<td align="center">${item.name }</td>
  						<td align="center">${item.funcUrl }</td>
  						<td align="center">${item.code }</td>
  						<td align="center">
  							<s:if test="#item.status==1">
								<span style="color: red">禁用</span>
							</s:if>
							<s:else>
								启用
							</s:else>
  						</td>
  						<td align="center">${item.note }</td>
  					</tr>
  				</s:iterator>
  			</table>
  			
  			<!-- 分页div -->
  			<div class="page">
  				<div style="float: left;">
  					&nbsp;
  				</div>
  				<app:PageTag actionName="Menu!list.do"></app:PageTag>
  			</div>
  		</div>
  	</s:form>
  </body>
</html>
