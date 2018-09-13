<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>表单类别</title>
		<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>

		<link rel="stylesheet" type="text/css" href="css/mask.css" />
		<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
		<script type="text/javascript" src="page/FormCt/FormCt-edit.js?t=<%=System.currentTimeMillis() %>"></script>

	</head>

	<body style="margin: 0px;padding: 0px;">
		<s:form action="FormCt!save" id="frm">
		<s:token/>
			<s:hidden name="formCt.parentId"></s:hidden>
			<s:hidden name="formCt.id"></s:hidden>
			<table width="100%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title">
				<tr>
					<td>
						<div class="wdtable_titleh">
							表单类别
						</div>
						<div class="wdtable_titletool">
							<a href="#" onclick="javascript:save()">保存</a><a href="#" onclick="window.close();">关闭</a>
						</div>
					</td>
				</tr>
			</table>
			<table width="100%" border="0" cellspacing="1" cellpadding="0" class="table02">
				<tr>
					<td>
						<table width="100%" border="0" cellpadding="0" cellspacing="1" class="wd_tablelist01_2">
							<tr>
								<td align="right" class="sd" width="20%">
									类别名称:
								</td>
								<td width="30%">
									<s:textfield name="formCt.name" cssStyle="width:98%"></s:textfield>
								</td>
								<td align="right" class="sd" width="20%">
									父类别:
								</td>
								<td width="30%">
									${empty formCt.parent ? "根类别" : formCt.parent.name}
								</td>
							</tr>
							<tr>
								<td align="right" class="sd" width="20%">
									排序号:
								</td>
								<td width="30%">
									<s:textfield name="formCt.sort" cssStyle="width:98%"></s:textfield>
								</td>
								<td align="right" class="sd" width="20%">
									状态:
								</td>
								<td width="30%" colspan="3">
									<s:radio name="formCt.status" list="#request.statusMap" listKey="key" listValue="value"></s:radio>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</s:form>
	</body>
</html>
