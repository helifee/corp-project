<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="pragma" content="no-cache" />
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="expires" content="0" />
<title>模块类型编辑</title>
<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
<script type="text/javascript" src="js/App.js"></script>
<link rel="stylesheet" type="text/css" href="css/mask.css" />
<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
<script type="text/javascript" src="page/Module/module-edit.js"></script>
<%@ include file="/validate.jsp"%>
</head>
<body style="margin: 0px;padding: 0px;">
	<s:form action="Module!save" id="frm" name="frm">
	<s:token/>
	<s:hidden name="appDTO.id"></s:hidden>
	<s:hidden name="appDTO.status"></s:hidden>
	<table width="100%" border="0" cellspacing="0" cellpadding="0"
			class="wdtable_title" id="maskA">
			<tr>
				<td>
					<div class="wdtable_titleh">编辑模块</div>
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
									<a href="#">编辑模块</a>
								</div>
							</td>
						</tr>
					</table>
					<table width="100%" border="0" cellpadding="0" cellspacing="1" class="table12">
						<tr>
							<th width="160"><span class="alertstar">*</span>模块名称</th>
							<td><s:textfield name="appDTO.name" cssStyle="80%" dataType = "*1-50"></s:textfield> </td>
						</tr>
						<tr>
							<th width="160"><span class="alertstar">*</span>主页URL</th>
							<td><s:textfield name="appDTO.indexUrl" cssStyle="80%" dataType = "*1-100"></s:textfield> </td>
						</tr>
						<tr>
							<th width="160"><span class="alertstar">*</span>系统路径</th>
							<td><s:textfield name="appDTO.depUrl" cssStyle="80%" dataType = "*1-100"></s:textfield> </td>
						</tr>
						<tr>
							<th width="160"><span class="alertstar">*</span>模块编码</th>
							<td><s:textfield name="appDTO.code" cssStyle="80%" dataType = "*1-50"></s:textfield> </td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
</s:form>
</body>
</html>
