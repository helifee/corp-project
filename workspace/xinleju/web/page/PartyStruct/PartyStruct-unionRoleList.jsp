<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="pragma" content="no-cache" />
	<meta http-equiv="cache-control" content="no-cache" />
	<meta http-equiv="expires" content="0" />
	<title>岗位列表</title>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/jquery/jquery-1.7.2.js"></script>
	<link rel="stylesheet" type="text/css" href="css/mask.css" />
	<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
	<script type="text/javascript" src="js/application.js"></script>
	<script type="text/javascript" src="page/PartyStruct/PartyStruct-unionRoleList.js?t=<%=System.currentTimeMillis()%>"></script>
</head>
<body>
	<form id="frm" name="frm" action="PartyStruct!unionRoleList.do" method="post">
		<input type="hidden" name="size" id="size" value="${size }"></input>
		<input type="hidden" name="parentId" id="parentId" value="${parentId }"></input>
		<input type="hidden" name="partyStructTypeId" id="partyStructTypeId" value="${partyStructTypeId }"></input>
		<div>
			<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01">
				<tr>
					<th width="5%">序号</th>
					<th width="45%">岗位名称</th>
					<th width="50%">标准角色名称</th>
				</tr>
				<s:iterator value="#request.list" var="item" status="stat">
					<s:if test="null != #item.status && #item.status==1">
						<s:set id="disabledTrClass" value="'disabledTr'"></s:set>
					</s:if>
					<s:else>
						<s:set id="disabledTrClass" value=""></s:set>
					</s:else>
					<tr class="${disabledTrClass}" ondblclick="deleteRole('${item.id}');" >
						<td align="center">${stat.index + 1}</td>
						<td align="left">${item.name}</td>
						<td align="left">${item.upPath}</td>
					</tr>
				</s:iterator>
			</table>
		</div>
	</form>
</body>
</html>