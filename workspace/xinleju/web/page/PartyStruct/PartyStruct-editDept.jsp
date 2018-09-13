<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>部门编辑</title>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="page/PartyStruct/PartyStruct-editDept.js?t=<%=System.currentTimeMillis() %>"></script>
	<%@ include file="/validate.jsp"%>
</head>
<body style="margin: 0px; padding: 0px;">
	<s:form action="PartyStruct!editDept.do" id="frm">
		<s:hidden name="dept.id"></s:hidden>
		<input id="partyStructTypeId" type='hidden' name="partyStructTypeId" value="${partyStructTypeId }"></input>
		<input id="parentEntityId" type='hidden' name="parentEntityId" value="${parentEntityId }"></input>
		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title" id="maskA">
			<tr>
				<td>
					<div class="wdtable_titleh">编辑部门</div>
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
									<a href="#">编辑部门</a>
								</div>
							</td>
						</tr>
					</table>
					<table width="100%" border="0" cellpadding="0" cellspacing="1" class="table12">
						<tr>
							<th width="160"><span class="alertstar">*</span>部门代码：</th>
							<td>
								<s:textfield name="dept.code" cssStyle="width:80%" datatype="*1-50" ajaxurl="PartyStruct!checkDeptCode.do?id=${dept.id}&parentEntityId=${parentEntityId }"></s:textfield>
							</td>
						</tr>
						<tr>
							<th width="160">部门简称：</th>
							<td>
								<s:textfield name="dept.shortName" cssStyle="width:80%" datatype="*0-50"></s:textfield>
							</td>
						</tr>
						<tr>
							<th width="160"><span class="alertstar">*</span>部门全称：</th>
							<td>
								<s:textfield name="dept.name" cssStyle="width:80%" datatype="*1-50"></s:textfield>
							</td>
						</tr>
						<s:if test="null != dept && dept.id != null && dept.id != 0">
							<tr>
								<th width="160">本单位领导角色：</th>
								<td>
									<s:select name="dept.deptRoleId" list="#request.deptRoleList" listKey="id" listValue="name" headerKey="" headerValue="" cssStyle="width:80%">
									</s:select>
								</td>
							</tr>
							<tr>
								<th width="160">上级单位领导角色：</th>
								<td>
									<span id="upDeptRole"><s:if test="dept.upDeptRole!=null">${dept.upDeptRole.name}</s:if></span>
									<s:hidden name="dept.upDeptRoleId" id="upDeptRoleId"></s:hidden>
									<a href="javascript:void(0)" onclick="partyWindow();"style="color:#00c;">选择角色</a>
									<a href="javascript:void(0)" onclick="clearRoles();" style="color:#00c;">清除角色</a>
								</td>
							</tr>
						</s:if>
						<tr>
							<th width="160">是否禁用：</th>
							<td>
								<s:radio list="#{1:'是',0:'否'}" name="dept.status"></s:radio><span style="color: red">&nbsp;&nbsp;&nbsp;注：请谨慎操作</span>
							</td>
						</tr>
						<tr>
							<th width="160">说明：</th>
							<td>
								<s:textarea name="dept.note" cssStyle="width:80%" datatype="*0-200"></s:textarea>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</s:form>
</body>
</html>