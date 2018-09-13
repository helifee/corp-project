<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>用户编辑</title>
		<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="page/CateMgr/CateMgr-editCateVal.js?t=<%=System.currentTimeMillis()%>"></script>
		<%@ include file="/validate.jsp"%>
	</head>
	<body style="margin: 0px;padding: 0px;">
		<s:form action="CateMgr!saveCateVal.do" id="frm">
			<s:hidden name="cateVal.id"></s:hidden>
			<s:hidden name="cateVal.cateId"></s:hidden>
			<s:hidden name="cateVal.isDisabled"></s:hidden>
			<table width="100%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title">
				<tr>
					<td>
						<div class="wdtable_titleh">
							用户编辑
						</div>
						<div class="wdtable_titletool">
							<a href="#" onclick="javascript:dealSave();">提交</a><a href="#" onclick="window.close();return false;">关闭</a>
						</div>
					</td>
				</tr>
			</table>
			<table width="100%" border="0" cellspacing="1" cellpadding="0" class="table02">
				<tr>
					<td>
						<table width="100%" border="0" cellspacing="0" cellpadding="0" class="divh3">
							<tr>
								<td>
									<div class="divh3_title">
										<a href="#">编辑用户</a>
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
									<s:textfield name="cateVal.name" cssStyle="width:80%" datatype="*1-50"></s:textfield>
								</td>
							</tr>
							<tr>
								<th>
									<span class="alertstar">*</span>取值:
								</th>
								<td>
									<s:textfield name="cateVal.val" cssStyle="width:80%" datatype="*1-50"></s:textfield>
								</td>
							</tr>
							<tr>
								<th width="160">
									排序:
								</th>
								<td>
									<s:textfield name="cateVal.position" cssStyle="width:80%" datatype="n1-50" ignore="ignore"></s:textfield>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</s:form>
	</body>
</html>
