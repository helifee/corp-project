<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>历史版本</title>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/App.js"></script>
	<script type="text/javascript" src="js/ext/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="js/ext/ext-all.js"></script>
	<link rel="stylesheet" type="text/css" href="js/ext/resources/css/ext-all.css" />
	<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
	<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
	<link href="css/mask.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="page/Designer/Designer-listFl.js"></script>
	<script type="text/javascript" src="page/Designer/Designer-listHistory.js"></script>
	<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/jquery.enplaceholder.js"></script>
	<script type="text/javascript" src="js/search.js"></script>
</head>
<body>
	<div id="wrapper">
		<form id="frm" name="frm" action="Designer!listHistory.do?id=${id}" method="post">
				
				<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01">
					<tr>
						<th width="6%">排序号</th>
						<th width="10%">版本</th>
						<th width="14%">创建时间</th>
						<th width="14%">修改时间</th>
						<th width="8%">操作</th>
					</tr>
					<s:iterator value="#request.flList" var="item" begin="0" step="1" status="index">
					<tr>
						<td>
							<input type="text" readonly="readonly" value="${index.count }" style="border: 0;text-align: center"/>
						</td>
							<td >
							${item.flowVersion }
							</td>
							<td>
							${item.createTime }
							</td>
							<td >
							${item.updateTime }
							</td>
							 <td>
							<s:if test="#item.isCurrent==1">
							当前版本
							</s:if>
							<s:else>
							<a href="#" onclick="javascript:restart(${item.id})">启用</a>
							</s:else>
							</td> 
					</tr>
					</s:iterator>
				</table>
	 </form>
	</div>
</body>
</html>