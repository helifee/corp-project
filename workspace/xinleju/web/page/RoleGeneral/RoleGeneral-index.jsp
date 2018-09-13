<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="pragma" content="no-cache" />
	<meta http-equiv="cache-control" content="no-cache" />
	<meta http-equiv="expires" content="0" />
	<title>通用角色列表</title>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/jquery/jquery-1.7.2.js"></script>
	<link rel="stylesheet" type="text/css" href="css/mask.css" />
	<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
	<script type="text/javascript" src="js/application.js"></script>
	<script type="text/javascript" src="page/RoleGeneral/RoleGeneral-index.js?t=<%=System.currentTimeMillis()%>"></script>
	<script type="text/javascript" src="page/PartyStruct/PartyStruct-roleTree.js?t=<%=System.currentTimeMillis()%>"></script>
	<script type="text/javascript" >
		var path = "${pageContext.request.contextPath }";
	</script>
</head>
<body>
		<form id="frm" name="frm" action="RoleGeneral!index.do" method="post">
		<s:hidden name="start"></s:hidden>
			<!-- 标题 -->
			<div class="t_title">
				<div class="hh">通用角色列表</div>
				<div class="t_title_input">
					<input type="text" name="name" id="name" placeholder="通用角色名称" value="${name}" />
				</div>
				<div class="t_title_input">
					<a href="#" title="查询" onclick="javascript:doSearch();">
						<img src="images/icon_search.png" width="24" height="24" align="bottom" />
					</a>
				</div>
				<div class="tool">
					<a href="javascript:void(0)" onclick="addRole();" class="t_new">新增</a>
					<a href="javascript:void(0)" onclick="editRole();" class="t_edit">编辑</a>
					<a href="javascript:void(0)" onclick="disable();" id="flagDisable" class="t_del">禁用</a>
					<a href="javascript:void(0)" onclick="enable();" id="flagEnable" class="t_submit">启用</a>
					<a href="javascript:void(0)" onclick="deleteRole();" class="t_del">删除</a>
				</div>
				<div class="clear"></div>
			</div>
			<div>
				<s:hidden id="roleGeneralId" name="id"></s:hidden>
				<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01">
					<tr>
						<th width="10px;">
							&nbsp;
						</th>
						<th width="60px;">序号</th>
						<th>通用角色编码</th>
						<th>通用角色名称</th>
						<th width="40%">成员</th>
						<th width="15%">修改时间</th>
						<th width="10%">状态</th>
					</tr>
					<s:iterator value="page.items" var="item" status="stat">
					<s:if test="null != #item.status && #item.status==1">
						<s:set id="disabledTrClass" value="'disabledTr'"></s:set>
					</s:if>
					<s:else>
						<s:set id="disabledTrClass" value=""></s:set>
					</s:else>
					<tr id="${item.id}" onclick="chooseThisRow('ids_${item.id}');changCo('${item.id}');showEnable('${item.id}', ${item.status ==0});">
						<td align="center">
							<input name="ids" type="checkbox" id="ids_${item.id}" value="${item.id}" />
						</td>
						<td align="center">
							${stat.index + 1}
						</td>
						<td align="center">${item.code}</td>
						<td align="center">${item.name}</td>
						<td align="center">${item.members}</td>
						<td align="center">
						<s:date name="#item.editDate" format="yyyy-MM-dd HH:mm:ss"/> 
						</td>
						<input type="hidden" name="status_${item.id}" id="status_${item.id}" value="${item.status}"/>
						<td align="center" id="status_img_${item.id}">
							<s:if test="#item.status == 0">
								<img src="images/icon_yes.png" width="16" height="16" />
							</s:if>
							<s:else>
								<img src="images/icon_no.png" width="16" height="16" />
							</s:else>
						</td>
					</tr>
					</s:iterator>
				</table>
				<div class="page">
					<div style="float: left;">
						&nbsp;
					</div>
					<app:PageTag actionName="RoleGeneral!index.do" ></app:PageTag>
				</div>
			</div>
		</form>
</body>
</html>