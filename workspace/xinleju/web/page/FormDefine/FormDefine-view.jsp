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
	</head>

	<body style="margin: 0px;padding: 0px;">
		<s:form action="FormDefine!save" id="frm">
		<s:token/>
			<s:hidden name="formDefine.formCtId"></s:hidden>
			<s:hidden name="formDefine.id"></s:hidden>
			<s:hidden name="formDefine.formVersion"></s:hidden>
			<s:hidden name="formDefine.status" id="status"></s:hidden>
			<table width="100%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title">
				<tr>
					<td>
						<div class="wdtable_titleh">
							表单编辑
						</div>
						<div class="wdtable_titletool">
							<a href="#" onclick="window.close();">关闭</a>
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
									表单名称:
								</td>
								<td width="30%">
									${formDefine.name }
								</td>
								<td align="right" class="sd" width="20%">
									类别名称:
								</td>
								<td width="30%">
									${formDefine.formCt.name}
								</td>
							</tr>
							<tr>
								<td align="right" class="sd" width="20%">
									表单编码:
								</td>
								<td>
									${formDefine.code }
								</td>
								<td align="right" class="sd" width="20%">
									表单版本:
								</td>
								<td>
									${formDefine.formVersion}
								</td>
							</tr>
							<tr>
								<td colspan="4">
   									 ${formDefine.parseHtml}
								</td>
							</tr>
						</table>
						
					</td>
				</tr>
			</table>
		</s:form>
	</body>
</html>
