<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>表单查看</title>
		<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
		<link rel="stylesheet" type="text/css" href="css/mask.css" />
		<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
		<script type="text/javascript" src="page/FormData/FormData-toWriteFormData.js"></script>
	</head>

	<body style="margin: 0px;padding: 0px;">
		<s:form action="FormData!saveFormData" id="frm">
			<s:hidden name="formData.id"></s:hidden>
			<s:hidden name="formData.formDefineId"></s:hidden>
			<s:hidden name="formData.dataHtml"></s:hidden>
			<table width="100%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title">
				<tr>
					<td>
						<div class="wdtable_titleh">
							表单填写
						</div>
						<div class="wdtable_titletool">
							<a href="#" onclick="save()">保存</a>
							<a href="#" onclick="window.close();">关闭</a>
						</div>
					</td>
				</tr>
			</table>
			<table width="100%" border="0" cellspacing="1" cellpadding="0" class="table02">
				<tr>
					<td>
						${formData.dataHtml}
					</td>
				</tr>
			</table>
		</s:form>
	</body>
</html>
