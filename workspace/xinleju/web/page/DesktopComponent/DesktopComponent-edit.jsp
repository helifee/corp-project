<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>部件编辑</title>
		<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>

		<link rel="stylesheet" type="text/css" href="css/mask.css" />
		<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
		<script type="text/javascript" src="page/DesktopComponent/DesktopComponent-edit.js?t=<%=System.currentTimeMillis() %>"></script>

	</head>

	<body style="margin: 0px;padding: 0px;">
		<s:form action="DesktopComponent!save" id="frm">
		<s:token/>
			<table width="100%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title">
				<tr>
					<td>
						<div class="wdtable_titleh">
							部件编辑
						</div>
						<div class="wdtable_titletool">
							<a href="#" onclick="javascript:save()">提交</a>
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
									名称:
								</td>
								<td width="30%">
									<s:textfield name="desktopComponent.name" cssStyle="width:98%"></s:textfield>
								</td>
								<td align="right" class="sd" width="20%">
									url:
								</td>
								<td width="30%">
									<s:textfield name="desktopComponent.url" cssStyle="width:98%"></s:textfield>
								</td>
							</tr>
							<tr>
								<td align="right" class="sd" width="20%">
									所属模块:
								</td>
								<td width="30%" colspan="3">
									<s:select list="#request.appMap" listKey="key" listValue="value.name"  name="desktopComponent.moduleCode" headerKey="" headerValue="请选择"></s:select>
								</td>
								
							</tr>
							<tr>
								<td align="right" class="sd" width="20%">
									描述:
								</td>
								<td colspan="3">
									<s:textarea cols="70" rows="5" name="desktopComponent.remark"></s:textarea>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			<s:hidden name="desktopComponent.createDate"></s:hidden>
			<s:hidden name="desktopComponent.status"></s:hidden>
			<s:hidden name="desktopComponent.id"></s:hidden>
		</s:form>
	</body>
</html>
