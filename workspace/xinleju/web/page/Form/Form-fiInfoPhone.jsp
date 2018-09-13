<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
</head>
<body>
	<s:if test="null != #request.fiInfo">
		<table width="100%" border="0" cellpadding="0" cellspacing="1" class="table_fj">
			<tr>
				<th width="80px" align="right">主题</th>
				<td><s:property value="#request.fiInfo.fib.flowInsName"/></td>
			</tr>
			<tr>
				<th width="80px" align="right">模板名称</th>
				<td><s:property value="#request.fiInfo.flb.flowName"/></td>
			</tr>
			<tr>
				<th width="80px" align="right">申请人</th>
				<td><s:property value="#request.fiInfo.fib.startUser.userName"/></td>
			</tr>
			<tr>
				<th width="80px" align="right">创建时间</th>
				<td><s:property value="#request.fiInfo.fib.startDate"/></td>
			</tr>
			<tr>
				<th width="80px" align="right">发布时间</th>
				<td>&nbsp;</td>
			</tr>
			<tr>
				<th width="80px" align="right">可阅读者</th>
				<td>&nbsp;</td>
			</tr>
		</table>
	</s:if>
	<s:else>
		<table width="100%" border="0" cellpadding="0" cellspacing="1" class="table_fj">
			<tr>
				<td colspan="2">&nbsp;</td>
			</tr>
		</table>
	</s:else>
</body>
</html>