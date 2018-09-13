<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>平台</title>
		<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="page/Op/Op-edit.js?t=<%=System.currentTimeMillis() %>"></script>
		<%@ include file="/validate.jsp"%>
	</head>
	<body style="margin: 0px;padding: 0px;">
		<s:form action="Op!save" id="frm">
		<s:token/>
			<s:hidden name="op.id"></s:hidden>
			<s:hidden name="op.isDisabled"></s:hidden>
			<table width="100%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title">
				<tr>
					<td>
						<div class="wdtable_titleh">
							操作定义
						</div>
						<div class="wdtable_titletool">
							<a href="#" onclick="javascript:dealSave()">提交</a><a href="#" onclick="window.close();">关闭</a>
						</div>
					</td>
				</tr>
			</table>
			<table width="100%" border="0" cellspacing="1" cellpadding="0" class="table02">
				<tr>
					<td>
						<table width="100%" border="0" cellspacing="0" cellpadding="0"
							class="divh3">
							<tr>
								<td>
									<div class="divh3_title">
										<a href="#">编辑操作定义</a>
									</div>
								</td>
							</tr>
						</table>
						<table width="100%" border="0" cellpadding="0" cellspacing="1" class="table12">
							<tr>
								<th width="160">
									<span class="alertstar">*</span>名称:
								</th>
								<td>
									<s:textfield name="op.name" cssStyle="width:80%" datatype="*1-50"></s:textfield>
								</td>
							</tr>
							<tr>
								<th width="160">
									<span class="alertstar">*</span>编码:
								</th>
								<td>
									<s:textfield name="op.code" cssStyle="width:80%" datatype="*1-50"></s:textfield>
								</td>
							</tr>
							<tr>
								<th width="160">
									默认意见:
								</th>
								<td>
									<s:textarea name="op.note" cssStyle="width:80%" datatype="*0-200"></s:textarea>
								</td>
							</tr>
							<tr>
								<th width="160">
									是否需要填写意见:
								</th>
								<td>
									<s:select list="#{0:'不需要',1:'需要',2:'必填'}" cssStyle="width:120px;" name="op.noteType"></s:select>
									<font color="red">(选择"不需要"时默认值也会被带入意见框)</font>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</s:form>
	</body>
</html>