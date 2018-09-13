<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>表单定义</title>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" type="text/css" href="js/ext/resources/css/ext-all.css" />
	<link href="css/mask.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/App.js"></script>
	<script type="text/javascript" src="js/ext/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="js/ext/ext-all.js"></script>
	<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
	<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
	<script type="text/javascript" src="page/FormDefine/FormDefine-index.js"></script>
	<script type="text/javascript" src="js/jquery.enplaceholder.js"></script>
	<script type="text/javascript" src="js/search.js"></script>
</head>
<body>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td width="187" height="" valign="top">
				<div id="tree" style="height:350px;overflow-y:auto;"></div>
			</td>
			<td valign="top">
				<div style="padding: 6px; padding-top: 0">
					<iframe id="rightFrame" src="FormDefine!list.do" style="width: 100%;" scrolling="no" frameborder="0" onload="iframeChangeSize('rightFrame')"></iframe>
				</div></td>
		</tr>
	</table>
</body>
</html>