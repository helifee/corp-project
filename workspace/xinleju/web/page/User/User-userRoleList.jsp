<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="pragma" content="no-cache" />
	<meta http-equiv="cache-control" content="no-cache" />
	<meta http-equiv="expires" content="0" />
	<title>兼职岗位列表</title>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/jquery/jquery-1.7.2.js"></script>
	<link rel="stylesheet" type="text/css" href="css/mask.css" />
	<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
	<script type="text/javascript" src="js/application.js"></script>
	<script type="text/javascript" src="page/User/User-userRoleList.js?t=<%=System.currentTimeMillis()%>"></script>
</head>
<body>
	<form id="frm" name="frm" action="User!userRoleList.do" method="post">
		<s:hidden name="start"></s:hidden>
		<s:hidden name="limit"></s:hidden>
		<input type="hidden" name="userId" id="userId" value="${userId }"></input>
		<!-- 标题 -->
		<div class="t_title">
			<div class="hh">
				<span><b>兼职岗位</b></span>
				<span style="font-size:14px"><b>(${user.realName})</b></span>
			</div>
			<div class="t_title_input">
				&nbsp;
			</div>
			<div class="t_title_input">
				&nbsp;
			</div>
			<div class="tool">
				&nbsp;
			</div>
			<div class="clear"></div>
		</div>
		<div>
			<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01">
				<tr>
					<th width="60px">序号</th>
					<th>岗位名称</th>
					<!-- th>标准角色</th-->
					<th width="60px">操作</th>
				</tr>
				<s:iterator value="page.items" var="item" status="stat">
					<s:if test="null != #item.status && #item.status == 1">
						<s:set id="disabledTrClass" value="'disabledTr'"></s:set>
					</s:if>
					<s:else>
						<s:set id="disabledTrClass" value=""></s:set>
					</s:else>
					<tr class="${disabledTrClass}" id="t_${item.id}">
						<td >${stat.index+1 }</td>
						<td title="${item.namefix}">${item.namefix}</td>
						<!-- td align="center">${item.upPath }</td-->
						<td align="center"><a  href="javascript:void(0)" onclick="removeRole(${item.id})">移除</a></td>
					</tr>
				</s:iterator>
			</table>
			<div class="page">
				<div style="float: left;">
					&nbsp;
				</div>
				<app:PageTag actionName="User!userRoleList.do" ></app:PageTag>
			</div>
		</div>
	</form>
</body>
</html>