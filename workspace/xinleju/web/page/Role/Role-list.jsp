<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="pragma" content="no-cache" />
	<meta http-equiv="cache-control" content="no-cache" />
	<meta http-equiv="expires" content="0" />
	<title>标准角色列表</title>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/jquery/jquery-1.7.2.js"></script>
	<link rel="stylesheet" type="text/css" href="css/mask.css" />
	<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
	<script type="text/javascript" src="js/application.js"></script>
	<script type="text/javascript" src="page/Role/Role-list.js?t=<%=System.currentTimeMillis()%>"></script>
</head>
<body>
		<form id="frm" name="frm" action="Role!list.do" method="post">
		<s:hidden name="start"></s:hidden>
		<s:hidden name="parentId" id="parentId"></s:hidden>
			<!-- 标题 -->
			<div class="t_title">
				<div class="hh">标准角色列表</div>
				<div class="t_title_input">
					<input type="text" name="name" id="name" placeholder="标准角色名称" value="${name}" />
				</div>
				<div class="t_title_input">
					<a href="#" title="查询" onclick="javascript:doSearch();">
						<img src="images/icon_search.png" width="24" height="24" align="bottom" />
					</a>
				</div>
				<div class="tool"> 
					<a href="javascript:void(0)" onclick="addRole('${parentId}');" class="t_new">新增</a>
					<a href="javascript:void(0)" onclick="editRole();" class="t_edit">编辑</a>
					<a href="javascript:void(0)" onclick="deleteRole();" class="t_del">删除</a>
					<a href="javascript:void(0)" onclick="disable();" class="t_del">禁用</a>
					<a href="javascript:void(0)" onclick="enable();" class="t_submit">启用</a>
					<a href="javascript:void(0)" onclick="grantFunc();" class="t_edit">功能授权</a>
					<a href="javascript:void(0)" onclick="grantData();" class="t_edit">数据授权</a>
				</div> 
				<div class="clear"></div>
			</div>
			<div>
				<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01">
					<tr>
						<th width="5%">
							&nbsp;
						</th>
						<th width="5%">序号</th>
						<th width="35%">标准角色名称</th>
						<th width="35%">所属级别</th>
						<th width="10%">排序</th>
						<th width="10%">状态</th>
					</tr>
					<s:iterator value="page.items" var="item" status="stat">
					<s:if test="null != #item.status && #item.status==1">
						<s:set id="disabledTrClass" value="'disabledTr'"></s:set>
					</s:if>
					<s:else>
						<s:set id="disabledTrClass" value=""></s:set>
					</s:else>
					<tr class="${disabledTrClass}" onclick="chooseThisRow('ids_${item.id}');">
						<td align="center">
							<input name="ids" type="checkbox" id="ids_${item.id}" value="${item.id}" />
						</td>
						<td align="center">
							${stat.index + 1}
						</td>
						<td align="left">${item.name}</td>
						<td align="left">${item.typeCodeName }</td>
						<td align="right">${item.sort}</td>
						<td align="center">
							<s:if test="#item.status==1">
								<span style="color: red">禁用</span>
							</s:if>
							<s:else>
								启用
							</s:else>
						</td>
					</tr>
					</s:iterator>
					<!-- <script type="text/javascript">
						var currRoleId = '${currentRoleId }';
						if ( currRoleId.length > 0 && $("#ids_"+currRoleId) ) {
							$("#ids_"+currRoleId).attr("checked","checked");
						}
					</script> -->
				</table>
				<div class="page">
					<div style="float: left;">
						&nbsp;
					</div>
					<app:PageTag actionName="Role!list.do" ></app:PageTag>
				</div>
			</div>
		</form>
</body>
</html>