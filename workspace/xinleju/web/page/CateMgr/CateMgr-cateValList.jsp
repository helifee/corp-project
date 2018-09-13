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
<script type="text/javascript" src="page/CateMgr/CateMgr-cateValList.js"></script>
<link href="css/mask.css" rel="stylesheet" type="text/css" />
<script src="js/jquery.loadmask.min.js" type="text/javascript"></script>
</head>
<body>
	<s:form action="CateMgr!cateValList" id="frm">
		<s:hidden id="isDisabled" name="isDisabled" value="%{#request.isDisabled}"></s:hidden>
		<s:hidden id="cateId" name="cateId" value="%{#request.cateId}"></s:hidden>
		<s:hidden id="name" name="name" value="%{#request.name}"></s:hidden>
		<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01">
			<tr>
				<th width="5%"><input id="checker" type="checkbox" value="" onclick="AutoCheckAll('ids',event)" /></th>
				<th>名称</th>
				<th width="25%">取值</th>
				<th width="35%">所属分类（编码）</th>
				<th width="10%">操作</th>
			</tr>
			<s:iterator value="page.items" id="item">
				<tr>
					<td align="center"><input name="ids" type="checkbox" value="${item.id}" /></td>
					<td><s:property value="#item.name" /></td>
					<td><s:property value="#item.val" /></td>
					<td><s:property value="#item.cate.name" />（<s:property value="#item.cate.code" />）</td>
					<td align="center"><a href="#" onclick="javascript:parent.editCateVal(${item.id})">编辑</a></td>
				</tr>
			</s:iterator>
		</table>
		<div class="page">
			<div style="float: left;">
				<s:if test="#request.isDisabled==1">
					<jdt:operators postUrl="CateMgr!unDelete.do" postMessage="启用"></jdt:operators>

				</s:if>
				<s:else>
					<jdt:operators postUrl="CateMgr!delete.do" postMessage="禁用"></jdt:operators>
				</s:else>
			</div>
			<jdt:pager url="CateMgr!cateValList.do"></jdt:pager>
		</div>
	</s:form>
</body>
</html>
