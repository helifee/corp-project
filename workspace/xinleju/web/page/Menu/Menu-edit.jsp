<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>菜单编辑</title>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="page/Menu/menu-edit.js?t=<%=System.currentTimeMillis() %>"></script>
	<%@ include file="/validate.jsp"%>
</head>
<body style="margin: 0px; padding: 0px;">
	<s:form action="Menu!save.do" id="frm" name="frm">
	<s:token/>
		<s:hidden name="funcModule.id"></s:hidden>
		<s:hidden name="funcModule.parentId"></s:hidden>
		<s:hidden name="funcModule.status"></s:hidden>
		<s:hidden name="funcModule.code"></s:hidden>
		<table width="100%" border="0" cellspacing="0" cellpadding="0"
			class="wdtable_title" id="maskA">
			<tr>
				<td>
					<div class="wdtable_titleh">编辑菜单</div>
					<div class="wdtable_titletool">
						<a href="#" onclick="dealSave()">保存</a>
						<a href="#" onclick="window.close()">关闭</a>
					</div>
				</td>
			</tr>
		</table>
		<table  width="100%" border="0" cellspacing="1" cellpadding="0" class="table02">
			<tr>
				<td>
					<table width="100%" border="0" cellspacing="0" cellpadding="0" class="divh3">
						<tr>
							<td>
								<div class="divh3_title">
									<a href="#">编辑菜单</a>
								</div>
							</td>
						</tr>
					</table>
					<table width="100%" border="0" cellpadding="0" cellspacing="1" class="table12">
						<tr>
							<th width="160"><span class="alertstar">*</span>菜单名称</th>
							<td><s:textfield name="funcModule.name" cssStyle="80%" dataType = "*1-50"></s:textfield> </td>
						</tr>
						<tr>
							<th width="160"><span class="alertstar">*</span>菜单URL</th>
							<td><s:textfield name="funcModule.funcUrl" cssStyle="80%" dataType = "*1-100"></s:textfield> </td>
						</tr>
						<tr>
							<th width="160"><span class="alertstar">*</span>排序</th>
							<td><s:textfield name="funcModule.sort" cssStyle="80%" dataType = "n"></s:textfield> </td>
						</tr>
						<tr>
							<th width="160"><span class="alertstar">*</span>所属模块</th>
							<td>
								<s:select list="apps" name="funcModule.systemCode" listKey="code" listValue="name"></s:select>
							</td>
						</tr>
						<tr>
							<th>描述</th>
							<td>
								<s:textarea name="funcModule.note" cssStyle="width:80%" datatype="*0-200"></s:textarea>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</s:form>
</body>
</html>
