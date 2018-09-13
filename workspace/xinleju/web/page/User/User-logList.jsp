<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title></title>
		<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
		<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="js/App.js"></script>
		<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
		<link rel="stylesheet" type="text/css" href="css/mask.css" />
		<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
		<script type="text/javascript" src="page/TaskIns/TaskIns-list.js"></script>
		<script language="javascript" type="text/javascript" src="js/My97DatePicker/WdatePicker.js" defer="defer"></script>
		<script type="text/javascript" src="js/jquery.enplaceholder.js"></script>
		<script type="text/javascript" src="js/search.js"></script>
	</head>
	<body>
		<s:form id="frm" action="TaskIns!list">
			<s:hidden name="start"></s:hidden>
			<s:hidden name="ifShowMore" id="ifShowMore"></s:hidden>					
			<!-- 标题 -->
			<div class="t_title">
			  <div class="hh">在线用户</div>
			  <div class="tool">
			  </div>
			  <div class="clear"></div>
			</div>
			<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01">
				<tr>
					<th width="5%;">
						<input id="checker" type="checkbox" value="" onclick="AutoCheckAll('ids',event)" />
					</th>
					<th width="5%">序号</th>
					<th width="15%">登录名</th>
					<th width="10%">姓名</th>
					<th width="15%">所在公司</th>
					<th width="10%">登录IP</th>
					<th width="10%">登录时间</th>
					<th width="30%">当前操作节点</th>
				</tr>
				<s:iterator value="page.items" id="item" status="stat">
					<tr>
						<td align="center">
							<input name="ids" type="checkbox" value="${item.id}" />
						</td>
						<td align="center">${stat.index+1 }</td>
						<td align="center">${appMap[item.moduleCode].name}</td>
						<td align="center"></td>
						<td align="center"><app:date  dateTime="${item.startAt }" style="yyyy-MM-dd HH:mm:ss"></app:date></td>
						<td align="center">${statusMap[item.status]}</td>
						<td align="center">
							<s:if test="#item.finishAt != null && #item.startAt !=null">
								<s:property value="(#item.finishAt.getTime()-#item.startAt.getTime())/1000"/>s
							</s:if>
							<s:else>
								-
							</s:else>
						</td>
						<td align="center" title="${item.failureNote }"><app:TruncateTag size="60" src="${item.failureNote }"></app:TruncateTag></td>
					</tr>
				</s:iterator>
			</table>
			<div class="page">
				<app:PageTag actionName="TaskIns!list"></app:PageTag>
			</div>
		</s:form>
	</body>
</html>
