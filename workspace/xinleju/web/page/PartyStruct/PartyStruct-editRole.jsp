<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>岗位编辑</title>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
	<script src="js/App.js"/></script>  
	<script type="text/javascript" src="page/PartyStruct/PartyStruct-editRole.js?t=<%=System.currentTimeMillis() %>"></script>
	<%@ include file="/validate.jsp"%>
</head>
<body style="margin: 0px; padding: 0px;">
	<s:form action="PartyStruct!roleSave" id="frm">
		<s:hidden name="role.id" id="id"></s:hidden>
		<s:hidden name="role.position"></s:hidden>
		<s:hidden name="role.type"></s:hidden>
		<s:hidden name="role.zbcj"></s:hidden>
		<s:hidden name="role.code"></s:hidden>
		<s:hidden name="role.status"></s:hidden>
		<s:hidden name="role.parentId" id="parentId"></s:hidden>
		<input type="hidden" name="partyStructTypeId" id="partyStructTypeId" value="${partyStructTypeId }"/>
		<input type="hidden" name="parentEntityId" id="parentEntityId" value="${parentEntityId }"/>
		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title" id="maskA">
			<tr>
				<td>
					<div class="wdtable_titleh">编辑岗位</div>
					<div class="wdtable_titletool">
						<a href="#" onclick="dealSave();">保存</a>
						<a href="#" onclick="window.close()">关闭</a>
					</div>
				</td>
			</tr>
		</table>
		<table width="100%" border="0" cellspacing="1" cellpadding="0" class="table02">
			<tr>
				<td>
					<table width="100%" border="0" cellspacing="0" cellpadding="0"
						class="divh3">
						<tr>
							<td>
								<div class="divh3_title">
									<a href="#">编辑岗位</a>
								</div>
							</td>
						</tr>
					</table>
					<table width="100%" border="0" cellpadding="0" cellspacing="1" class="table12">
						<tr>
							<th width="160"><span class="alertstar">*</span> 岗位名称：</th>
							<td><s:textfield name="role.name" cssStyle="width:80%" datatype="*1-50"></s:textfield></td>
						</tr>
						<tr>
							<th width="160"><span class="alertstar"></span>简称：</th>
							<td><s:textfield name="role.shortName" cssStyle="width:80%" datatype="*0-50"></s:textfield></td>
						</tr>
							<tr>
							<th width="160"><span class="alertstar"></span>所属角色：</th>
							<td><span id="roleName">${role.parentRole.name}</span>
								<a href="javascript:void(0)" onclick="roleWindow();">选择角色</a>
							</td>
						</tr>
						<tr>
							<th width="160">职级：</th>
							<td>
								<s:select name="role.roleType" list="#request.gwzjList" listKey="value" listValue="name" headerKey="" headerValue="" cssStyle="width:80%">
								</s:select>
							</td>
						</tr>
						<tr>
							<th width="160"><span class="alertstar"></span>领导岗位：</th>
							<td>
								<span id="leaderRole">${role.leaderRole.namefix}</span>
								<s:hidden name="role.leaderRoleId" id="leaderRoleId"></s:hidden>
								<a href="javascript:void(0)" onclick="partyWindow();">选择岗位</a>
								<a href="javascript:void(0)" onclick="delLeaderRole();">删除</a>
							</td>
						</tr>
						<tr>
							<th width="160"><span class="alertstar"></span>说明：</th>
							<td><s:textarea name="role.note" cssStyle="width:80%" datatype="*0-200"></s:textarea></td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</s:form>
</body>
</html>
