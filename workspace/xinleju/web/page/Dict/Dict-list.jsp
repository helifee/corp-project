<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="pragma" content="no-cache" />
	<meta http-equiv="cache-control" content="no-cache" />
	<meta http-equiv="expires" content="0" />
	<title>字典管理</title>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" type="text/css" href="css/mask.css" />
	
	<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
	<script type="text/javascript" src="js/App.js"></script>
	<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
	<script type="text/javascript" src="page/Dict/Dict-list.js?t=<%=System.currentTimeMillis()%>"></script>
</head>
<body>
	<s:form id="frm" action="Dict!list.do" method="post">
		<s:hidden name="parentId" id="parentId"></s:hidden>
		<!-- 标题 -->
		<div class="t_title">
			<div class="hh">字典列表</div>
			<div class="t_title_input">
				&nbsp;
			</div>
			<div class="tool">
				<a href="javascript:void(0)" onclick="newDict('${parentId}');return false;" class="t_new">新增</a>
				<a href="javascript:void(0)" onclick="editDict();return false;" class="t_edit">编辑</a>
				<a href="javascript:void(0)" onclick="batchDel();return false;" class="t_del">删除</a>
			</div>
			<div class="clear"></div>
		</div>
		<div>
			<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01">
			<tr>
				<th width="5%"><input type="checkbox" name="checkbox" id="checkbox" onclick="AutoCheckAll('dictIds',this,window.event);" value="total" /></th>
				<th width="35%">名称</th>
				<th width="20%">编码</th>
				<th width="20%">值</th>
				<th width="20%">排序</th>
			</tr>
			<s:if test="page.items.size>0">
				<s:iterator value="page.items" var="item" status="stat">
					<tr>
						<td align="center">
							<input name="dictIds" type="checkbox"  value="${item.id}" />
						</td>
						<td align="left">${item.name }</td>
						<td align="left">${item.code }</td>
						<td align="right">${item.value}</td>
						<td align="right">${item.position}</td>
					</tr>
				</s:iterator>
			</s:if>
			<s:else>
				<tr>
					<td align="center" colspan="5">&nbsp;</td>
				</tr>
			</s:else>
			
		</table>
		<div class="page">
			<app:PageTag actionName="Dict!list.do"></app:PageTag>
		</div>
	</s:form>
</body>
</html>
