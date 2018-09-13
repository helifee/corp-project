<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<%@ include file="/validate.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>通用角色编辑</title>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
	<script type="text/javascript" src="js/application.js"></script>
	<script type="text/javascript" src="page/RoleGeneral/RoleGeneral-edit.js?t=<%=System.currentTimeMillis() %>"></script>
	<%@ include file="/validate.jsp"%>
</head>
<body style="margin: 0px; padding: 0px;">
	<s:form action="RoleGeneral!save" id="frm">
	<s:token/>
		<s:hidden name="roleGeneral.id"></s:hidden>
		<input type="hidden" id="oldCode" name="oldCode" value="${roleGeneral.code }"/>
		<table width="100%" border="0" cellspacing="0" cellpadding="0"
			class="wdtable_title" id="maskA">
			<tr>
				<td>
					<div class="wdtable_titleh">通用标准角色</div>
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
									<a href="#">通用角色</a>
								</div>
							</td>
						</tr>
					</table>
					<table width="100%" border="0" cellpadding="0" cellspacing="1" class="table12">
						<tr>
							<th width="160"><span class="alertstar">*</span>通用角色编码：</th>
							<td><s:textfield id="code" name="roleGeneral.code" cssStyle="width:80%" datatype="*1-50"   ajaxurl="RoleGeneral!validateCode.do?id=${roleGeneral.id }"></s:textfield></td>
						</tr>
						<tr>
							<th width="160"><span class="alertstar">*</span>通用角色名称：</th>
							<td><s:textfield name="roleGeneral.name" cssStyle="width:80%" datatype="*1-50"></s:textfield></td>
						</tr>
						<tr>
							<th><span class="alertstar">*</span>角色成员：</th>
							<td>
							<s:textarea name="roleGeneral.members" id="member" rows="5" readonly="true" cssStyle="width:80%"></s:textarea>
							<input type="button" id="selMenber" value="选择" onclick="unionRole();" />
							</td>
						</tr>
						<tr>
							<th>状态：</th>
							<td><s:radio list="#{'0':'启用','1':'禁用'}" id="status" name="roleGeneral.status" ></s:radio></td>
						</tr>
						<tr>
							<th>创建时间：</th>
							<s:date name="roleGeneral.createDate" format="yyyy-MM-dd HH:mm:ss" id="createDate" />
							<input type="hidden" name="roleGeneral.createDate" value="${createDate}" />
							<td>${createDate}</td>
						</tr>
						<tr>
							<th>修改时间：</th>
							<s:date name="roleGeneral.editDate" format="yyyy-MM-dd HH:mm:ss" id="editDate" />
							<input type="hidden" name="roleGeneral.editDate" value="${editDate}" />
							<td>${editDate}</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</s:form>
</body>
</html>
