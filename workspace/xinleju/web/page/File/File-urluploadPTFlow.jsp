<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>URL上传</title>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript">
		function save() {
			if (true){
				$('body').mask('操作中...');
				$.post('File!urlSave.do?category=${requestScope.category}&ownerId=${requestScope.ownerId}', $('#frm').serialize(), function(data) {
					$('body').unmask();
					window.opener.location="File!listptflow.do?category=${requestScope.category}&ownerId=${requestScope.ownerId}";
					window.close();
				});
			} else {
				alert("请正确填写信息");
			}
		}
	</script>
	<%@ include file="/validate.jsp"%>
</head>
<body style="margin: 0px; padding: 0px;">
	<s:form action="File!urlSave.do" id="frm">
		<table width="70%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title" id="maskA"  style="margin-left:auto;margin-right:auto;">
			<tr>
				<td>
					<div class="wdtable_titleh">编辑URL</div>
					<div class="wdtable_titletool">
						<a href="#" onclick="save();">保存</a>
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
									<a href="#">编辑URL</a>
								</div>
							</td>
						</tr>
					</table>
					<table width="100%" border="0" cellpadding="0" cellspacing="1" class="table12">
						<tr>
							<td width="160px" align="right"><span style="color: red;">*</span>URL名称</td>
							<td>
								<s:textfield name="filedataFileName" cssStyle="width:80%" datatype="*1-50" ajaxurl="File!checkUploadUrl.do?category=${requestScope.category}&ownerId=${requestScope.ownerId}"></s:textfield>
							</td>
						</tr>
						<tr>
							<td width="160px" align="right"><span style="color: red;">*</span>URL地址</td>
							<td>
								<s:textfield name="userLabel" cssStyle="width:80%" datatype="*1-1024" ></s:textfield>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</s:form>
</body>
</html>