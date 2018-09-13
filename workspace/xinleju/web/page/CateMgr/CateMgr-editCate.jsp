<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>招标采购首页</title>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/App.js"></script>
	<script type="text/javascript" src="page/CateMgr/CateMgr-editCate.js?t=<%=System.currentTimeMillis() %>"></script>
	<%@ include file="/validate.jsp"%>
</head>
<body style="margin: 0px;padding: 0px;">
	<s:form action="CateMgr!saveCate.do" id="frm">
		<s:hidden name="cate.id"></s:hidden>
		<s:hidden name="cate.parentId"></s:hidden>
		<s:hidden name="cate.isDisabled"></s:hidden>
		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title">
			<tr>
				<td>
					<div class="wdtable_titleh">条件编辑</div>
					<div class="wdtable_titletool">
						<a href="#" onclick="javascript:dealSave()">提交</a><a href="#" onclick="window.close();">关闭</a>
					</div></td>
			</tr>
		</table>
		<table width="100%" border="0" cellspacing="1" cellpadding="0" class="table02">
			<tr>
				<td>
					<table width="100%" border="0" cellspacing="0" cellpadding="0" class="divh3">
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
							<th width="160"><span class="alertstar">*</span>名称:</th>
							<td><s:textfield name="cate.name" cssStyle="width:80%" datatype="*1-50"></s:textfield></td>
						</tr>
						<tr>
							<th width="160"><span class="alertstar">*</span>编码:</th>
							<td><s:textfield name="cate.code" cssStyle="width:80%" datatype="*1-50"></s:textfield></td>
						</tr>
						<tr>
							<th width="160"><span class="alertstar">*</span>数据类型:</th>
							<td><s:select name="cate.dateType" list="#{'1':'字符串','2':'整数','3':'数值','4':'日期'}" cssStyle="width:80%"></s:select></td>
						</tr>
						<tr>
							<th width="160"><span class="alertstar">*</span>排序:</th>
							<td><s:textfield name="cate.position" cssStyle="width:80%" datatype="*1-50"></s:textfield></td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</s:form>
</body>
</html>
