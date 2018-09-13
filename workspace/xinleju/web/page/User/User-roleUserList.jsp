<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="pragma" content="no-cache" />
	<meta http-equiv="cache-control" content="no-cache" />
	<meta http-equiv="expires" content="0" />
	<title>用户列表</title>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/jquery/jquery-1.7.2.js"></script>
	<link rel="stylesheet" type="text/css" href="css/mask.css" />
	<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
	<script type="text/javascript" src="js/application.js"></script>
	<script type="text/javascript" src="page/User/User-roleUserList.js?t=<%=System.currentTimeMillis()%>"></script>
</head>
<body>
	<form id="frm" name="frm2" action="User!roleUserList.do" method="post">
		<s:hidden name="start" id="start"></s:hidden>
		<s:hidden name="limit"></s:hidden>
		<input id="parentEntityId" name="parentEntityId" value='${parentEntityId }' type="hidden"></input>
		<input id="roleId" name="roleId" value='${roleId }' type="hidden"></input>
		<input id="t" name="t" value='<%=System.currentTimeMillis()%>' type="hidden"></input>
		<!-- 标题 -->
		<div class="t_title">
			<div class="hh">
				<span><b>用户 </b></span>
				<span style="font-size:14px"><b>(${role.name})</b></span>
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
					<th width="15%">用户名称</th>
					<th width="15%">用户代码</th>
					<th width="15%" >移动电话</th>
					<!-- th>默认岗位</th-->
					<th width="100px">岗位类别</th>
					<th width="100px">状态</th>
					<th width="100px">操作</th>
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
						<td>${item.realName}</td>
						<td>${item.loginname}</td>
						<td>${item.mobile}</td>
						<!-- td>${item.mainRole.namefix}</td-->
						<td align="center">
							<script>
								if('${role.id}'=='${item.mainRole.id}'){
									document.write("默认岗位");
								}else {
									document.write("兼职岗位");
								}
							</script>
						</td>
						<td align="center">
							<s:if test="null != #item.status && #item.status == 1">
								<span style="color:red">禁用</span>
							</s:if>
							<s:else>
								启用
							</s:else>
						</td>
						<td align="center"><a href="javascript:void(0)" onclick="removeUser(${item.id})">移除成员</a></td>
					</tr>
				</s:iterator>
			</table>
			<div class="page">
				<div style="float: left;">
					&nbsp;
				</div>
				<app:PageTag actionName="User!roleUserList.do" ></app:PageTag>
			</div>
		</div>
	</form>
</body>
</html>