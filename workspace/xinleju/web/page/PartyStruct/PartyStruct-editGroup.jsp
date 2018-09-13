<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>项目编辑</title>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="page/PartyStruct/PartyStruct-editGroup.js?t=<%=System.currentTimeMillis() %>"></script>
	<%@ include file="/validate.jsp"%>
</head>
<body style="margin: 0px; padding: 0px;">
	<s:form action="PartyStruct!editGroup.do" id="frm">
		<s:hidden name="group.id"></s:hidden>
		<input id="partyStructTypeId" type='hidden' name="partyStructTypeId" value="${partyStructTypeId }"></input>
		<input id="parentEntityId" type='hidden' name="parentEntityId" value="${parentEntityId }"></input>
		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title" id="maskA">
			<tr>
				<td>
					<div class="wdtable_titleh">编辑项目</div>
					<div class="wdtable_titletool">
							<a href="#" onclick="dealSave()">保存</a>
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
									<a href="#">编辑项目</a>
								</div>
							</td>
						</tr>
					</table>
					<table width="100%" border="0" cellpadding="0" cellspacing="1" class="table12">
						<tr>
							<th width="160"><span class="alertstar">*</span>项目代码：</th>
							<td>
								<s:textfield name="group.code" id = "code" cssStyle="width:80%" datatype="*1-50" ajaxurl="PartyStruct!checkGroupCode.do?id=${group.id}"></s:textfield>
							</td>
						</tr>
						<tr>
							<th width="160">项目简称：</th>
							<td>
								<s:textfield name="group.shortName" cssStyle="width:80%" datatype="*0-50"></s:textfield>
							</td>
						</tr>
						<tr>
							<th width="160"><span class="alertstar">*</span>项目全称：</th>
							<td>
								<s:textfield name="group.name" cssStyle="width:80%" datatype="*1-50"></s:textfield>
							</td>
						</tr>
						<s:if test="null != dept && group.id != null && group.id != 0">
							<tr>
								<th width="160">本单位领导角色：</th>
								<td>
									<s:select name="group.groupRoleId" list="#request.groupRoleList" listKey="value" listValue="name" headerKey="" headerValue="" cssStyle="width:80%">
									</s:select>
								</td>
							</tr>
							<tr>
								<th width="160">上级单位领导角色：</th>
								<td>
									<span id="upGroupRole"><s:if test="group.upGroupRole != null">${group.upGroupRole.name}</s:if></span>
									<s:hidden name="group.upGroupRoleId" id="upGroupRoleId"></s:hidden>
									<a href="javascript:void(0)" onclick="partyWindow();">选择角色</a>
								</td>
							</tr>
						</s:if>
						<tr>
							<th width="160">是否禁用：</th>
							<td>
								<s:radio  list="#{1:'是',0:'否'}" name="group.status"></s:radio><span style="color: red">&nbsp;&nbsp;&nbsp;注：请谨慎操作</span>
							</td>
						</tr>
						<tr>
							<th width="160">说明：</th>
							<td>
								<s:textarea name="group.note" cssStyle="width:80%" datatype="*0-200"></s:textarea>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</s:form>
</body>
</html>