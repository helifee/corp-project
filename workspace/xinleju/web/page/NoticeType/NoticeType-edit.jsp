<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>任务管理</title>
		<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>

		<link rel="stylesheet" type="text/css" href="css/mask.css" />
		<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
		<script type="text/javascript" src="page/NoticeType/NoticeType-edit.js?t=<%=System.currentTimeMillis() %>"></script>

	</head>

	<body style="margin: 0px;padding: 0px;">
		<s:form action="NoticeType!save" id="frm">
		<s:token/>
			<s:hidden name="noticeType.parentId"></s:hidden>
			<s:hidden name="noticeType.id"></s:hidden>
			<s:hidden name="noticeTemplate.createDate"></s:hidden>
			<s:hidden name="noticeTemplate.createUserId"></s:hidden>
			<table width="100%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title">
				<tr>
					<td>
						<div class="wdtable_titleh">
							公告类别编辑
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
									<s:textfield name="noticeType.name" cssStyle="width:98%"></s:textfield>
								</td>
								<td align="right" class="sd" width="20%">
									父类别:
								</td>
								<td width="30%">
									${empty noticeType.parent ? "根类别" : noticeType.parent.name}
								</td>
							</tr>
							<tr>
								<td align="right" class="sd" width="20%">
									排序号:
								</td>
								<td width="30%">
									<s:textfield name="noticeType.sort" cssStyle="width:98%"></s:textfield>
								</td>
								<td align="right" class="sd" width="20%">
									状态:
								</td>
								<td width="30%" colspan="3">
									<s:radio name="noticeType.status" list="#request.statusMap" listKey="key" listValue="value"></s:radio>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</s:form>
	</body>
</html>
