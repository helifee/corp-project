<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>标准角色编辑</title>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="page/Role/Role-edit.js?t=<%=System.currentTimeMillis() %>"></script>
	<%@ include file="/validate.jsp"%>
</head>
<body style="margin: 0px; padding: 0px;">
	<s:form action="Role!save" id="frm">
	<s:token/>
		<s:hidden name="role.id"></s:hidden>
		<s:hidden name="role.type"></s:hidden>
		<s:hidden name="role.parentId"></s:hidden>
		<s:hidden name="role.code"></s:hidden>
		<s:hidden name="role.myUnitId"></s:hidden>
		<s:hidden name="role.status"></s:hidden>
		<table width="100%" border="0" cellspacing="0" cellpadding="0"
			class="wdtable_title" id="maskA">
			<tr>
				<td>
					<div class="wdtable_titleh">编辑标准角色</div>
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
					<table width="100%" border="0" cellspacing="0" cellpadding="0" class="divh3">
						<tr>
							<td>
								<div class="divh3_title">
									<a href="#">编辑标准角色</a>
								</div>
							</td>
						</tr>
					</table>
					<table width="100%" border="0" cellpadding="0" cellspacing="1" class="table12">
						<tr>
							<th width="160"><span class="alertstar">*</span>标准角色名称：</th>
							<td><s:textfield name="role.name" cssStyle="width:80%" datatype="*1-50"></s:textfield></td>
						</tr>
						<tr>
							<th width="160">排序：</th>
							<td><s:textfield name="role.sort" cssStyle="width:80%" datatype="n0-50" ajaxurl="Role!checkRoleSeq.do?typeCode=${role.typeCode }&parentId=${role.parentId}&roleid=${role.id}"></s:textfield></td>
						</tr>
						<tr>
							<th width="160">所属级别：</th>
							<td>
								<%-- <s:select name="role.typeCode" list="partyTypeList" listKey="type" listValue="name" headerKey="" headerValue="目录" cssStyle="width:80%">
								</s:select> --%>
								<s:select name="role.typeCode" list="partyTypeList" listKey="type" listValue="name" cssStyle="width:80%">
								</s:select>
							</td>
						</tr>
						<tr>
							<th>说明：</th>
							<td><s:textarea name="role.note" cssStyle="width:80%" datatype="*0-200"></s:textarea>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</s:form>
</body>
</html>
