<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>修改密码</title>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/jquery.js"></script>
	<%@ include file="/validate.jsp"%>
	<script type="text/javascript" src="page/User/User-passwordEdit.js?t=<%=System.currentTimeMillis() %>"></script>
</head>
<body style="margin: 0px; padding: 0px;">
	<s:form action="User!updatePassword.do" id="frm">
	<s:token/>
		<s:hidden name="user.id" id="id"></s:hidden>
		<table width="70%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title" id="maskA"  style="margin-left:auto;margin-right:auto;">
			<tr>
				<td>
					<div class="wdtable_titleh">修改密码</div>
					<div class="wdtable_titletool">
						<a href="#" onclick="dealSave()">保存</a>
						<a href="#" onclick="window.opener.location.reload();window.close();">关闭</a>
					</div>
				</td>
			</tr>
		</table>
		<table width="70%" border="0" cellspacing="1" cellpadding="0" class="table02" style="margin-left:auto;margin-right:auto;">
			<tr>
				<td>
					<table width="100%" border="0" cellspacing="0" cellpadding="0"
						class="divh3">
						<tr>
							<td>
								<div class="divh3_title">
									<a href="#">修改密码</a>
								</div>
							</td>
						</tr>
					</table>
					<table width="100%" border="0" cellpadding="0" cellspacing="1" class="table12">
						<tr>
							<td width="160px" align="right"><span style="color: red;">*</span>旧密码</td>
							<td>
								<input type="password" name="oldPassword" value="" style="width:80%" datatype="*1-50"></input>
							</td>
						</tr>
						<tr>
							<td width="160px" align="right"><span style="color: red;">*</span>新密码</td>
							<td>
								<input type="password" name="newPassword" value="" style="width:80%" datatype="*1-50"></input>
							</td>
						</tr>
						<tr>
							<td width="160px" align="right"><span style="color: red;">*</span>新密码确认</td>
							<td>
								<input type="password" name="confirmPassword" value="" style="width:80%" datatype="*1-50"></input>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</s:form>
</body>
</html>