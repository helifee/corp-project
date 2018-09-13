<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>数据字典管理</title>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="page/Dict/Dict-edit.js?t=<%=System.currentTimeMillis()%>"></script>
	<%@ include file="/validate.jsp"%>
</head>
<body>
	<s:form id="frm" action="Dict!save.do" method="post">
	<s:token/>
		<s:hidden name="dict.id" id="dictId"></s:hidden>
		<s:hidden name="dict.parent_id" id="dict.parent_id"></s:hidden>
		<s:hidden name="dict.createDate" id="dict.createDate"></s:hidden>
		<s:hidden name="dict.updateDate" id="dict.updateDate"></s:hidden>
		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title">
			<tr>
				<td>
					<div class="wdtable_titleh">
						数据字典管理
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
							<td width="100px" align="right"><span style="color: red;">*</span>名称</td>
							<td><input type="text" name="dict.name" class="input234" value="${dict.name }"/>
							</td>
						</tr>
						<tr>
							<td width="100px" align="right"><span style="color: red;">*</span>编码</td>
							<td>
								<input type="text" name="dict.code" class="input234" value="${dict.code }" id="dictcode" onchange=""/>
							</td>
						</tr>
						<tr>
							<td width="100px" align="right">值</td>
							<td>
							    <s:textarea name="dict.value" rows="2" cssClass="input234"></s:textarea>
							</td>
						</tr>
						
						<tr>
							<td width="100px" align="right">值2</td>
							<td><input type="text" name="dict.outCode" class="input234" value="${dict.outCode}" />
							</td>
						</tr>
							<tr>
							<td width="100px" align="right">排序</td>
							<td><input type="text" name="dict.position" class="input234" value="${dict.position}" />
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</s:form>
</body>
</html>
