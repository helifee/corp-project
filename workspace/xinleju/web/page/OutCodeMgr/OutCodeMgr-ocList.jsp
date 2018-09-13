<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>招标采购首页</title>
<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
<script type="text/javascript" src="js/App.js"></script>
<script type="text/javascript" src="page/OutCodeMgr/OutCodeMgr-ocList.js"></script>
<link href="css/mask.css" rel="stylesheet" type="text/css" />
<script src="js/jquery.loadmask.min.js" type="text/javascript"></script>
</head>
<body>
	<s:form action="OutCodeMgr!ocList" id="frm">
		<s:hidden name="start"></s:hidden>
		<s:hidden id="isDisabled" name="isDisabled" value="%{#request.isDisabled}"></s:hidden>
		<s:hidden id="ocdId" name="ocdId" value="%{#request.ocdId}"></s:hidden>
		<s:hidden id="name" name="name" value="%{#request.name}"></s:hidden>
		<s:hidden id="code" name="code" value="%{#request.code}"></s:hidden>
		<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01">
			<tr>
				<th width="5%"><input id="checker" type="checkbox" value="" onclick="AutoCheckAll('ids',event)" /></th>
				<th>名称</th>
				<th width="25%">编码</th>
				<th width="35%">所属分类（编码）</th>
				<th width="10%">操作</th>
			</tr>
			<s:iterator value="page.items" id="item">
				<tr>
					<td align="center"><input name="ids" type="checkbox" value="${item.id}" /></td>
					<td><s:property value="#item.name" /></td>
					<td><s:property value="#item.val" /></td>
					<td><s:property value="#item.ocd.name" />(<s:property value="#item.ocd.code" />)</td>
					<td align="center"><a href="#" onclick="javascript:parent.editOc(${item.id})">编辑</a>
					|
					<a href="#" onclick="javascript:if(confirm('确认删除吗?')){deleteOc(${item.id})}">删除</a></td>
				</tr>
			</s:iterator>
		</table>
		<div class="page">
			<div style="float: left;">
				
			</div>
			<app:PageTag actionName="OutCodeMgr!ocList"></app:PageTag>
		</div>
	</s:form>
</body>
</html>
