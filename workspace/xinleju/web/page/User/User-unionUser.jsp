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
	<script type="text/javascript" src="js/ext/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="js/ext/ext-all.js"></script>
	<link rel="stylesheet" type="text/css" href="js/ext/resources/css/ext-all.css" />
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/jquery/jquery-1.7.2.js"></script>
	<link rel="stylesheet" type="text/css" href="css/mask.css" />
	<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
	<script type="text/javascript" src="js/application.js"></script>
	<script language="javascript" type="text/javascript" src="js/App.js?t=<%=System.currentTimeMillis()%>"></script>
	<script type="text/javascript" src="page/User/User-unionUser.js?t=<%=System.currentTimeMillis()%>"></script>
</head>
<body>
	<form id="frm" name="frm" action="User!unionUser.do" method="post">
		<s:hidden name="start"></s:hidden>
		<input type="hidden" name="parentId" id="parentId" value="${parentEntityId }"/>
		<input type="hidden" name="partyStructTypeId" id="partyStructTypeId" value="${partyStructTypeId }"/>
		<input type="hidden" name="roleId" id="roleId" value="${roleId }"/>
		<!-- 标题 -->
		<div class="t_title">
			<div class="hh">
				用户列表
			</div>
			<div class="t_title_input">
				<input type="text" name="nameOrLogName" id="nameOrLogName" placeholder="用户名称、用户代码" value="${nameOrLogName}" />
			</div>
			<div class="t_title_input">
				<a href="#" title="查询" onclick="javascript:doSearch();">
					<img src="images/icon_search.png" width="24" height="24" align="bottom" />
				</a>
			</div>
			<div class="tool">
				&nbsp;
			</div>
			<div style="float:right;vertical-align: middle;line-height:37px;">
				<a href="#" onclick="joinUsers('${parentEntityId}','${partyStructTypeId }');" style="vertical-align: middle;">保存</a>
				<a href="#" onclick="window.close();" style="vertical-align: middle;">关闭</a>
			</div>
			<div class="clear"></div>
		</div>
		<div>
			<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01">
				<tr>
					<th width="60px">操作</th>
					<th width="60px">序号</th>
					<th width="15%">用户名称</th>
					<th width="80px">用户代码</th>
					<th width="15%">职务</th>
					<th width="">所属组织机构</th>
					<th width="120px">手机</th>
					<!-- th width="60px">状态</th-->
					
				</tr>
				<s:iterator value="page.items" var="item" status="stat">
					<s:if test="null != #item.status && #item.status == 1">
						<s:set id="disabledTrClass" value="'disabledTr'"></s:set>
					</s:if>
					<s:else>
						<s:set id="disabledTrClass" value=""></s:set>
					</s:else>
					<tr class="${disabledTrClass}" id="t_${item.id}">
						<td align="center">
							<s:set id="objId" value="%{',' + #item.id + ','}"></s:set>
							<s:set id="isChecked" value="false"></s:set>
							<s:if test="null != #request.roleUserIds && #request.roleUserIds.indexOf(#objId) >= 0">
							<s:set id="isChecked" value="true"></s:set>
							</s:if>
							<!-- input type="checkbox" onclick="joinUser(this,'${item.id }','${parentEntityId}','${partyStructTypeId }');" <s:if test="#isChecked==true">checked</s:if> ></input-->
							<input type="checkbox" name="userIdCk" value="${item.id }" <s:if test="#isChecked==true">checked</s:if> ></input>
							
						</td>
						<td align="center">${stat.index + 1}</td>
						<td align="left">${item.realName}</td>
						<td align="left">${item.loginname}</td>
						<td align="left">${item.position}</td>
						<td align="left">${item.mainRole.namefix}</td>
						<td align="left">${item.mobile}</td>
						<!--  td align="center">
							<s:if test="null != #item.status && #item.status == 1">
								<span style="color:red">禁用</span>
							</s:if>
							<s:else>
								启用
							</s:else>
						</td-->
						
					</tr>
				</s:iterator>
			</table>
			<div class="page">
				<div style="float: left;">
					&nbsp;
				</div>
				<app:PageTag actionName="User!unionUser.do" ></app:PageTag>
			</div>
		</div>
	</form>
</body>
</html>