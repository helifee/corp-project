<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>招标采购首页</title>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<link href="js/ext/resources/css/ext-all.css" rel="stylesheet" type="text/css" />
	<script src="js/ext/adapter/ext/ext-base.js"></script>
	<script src="js/ext/ext-all.js"></script>
	<script type="text/javascript" src="js/ext/ux/ux-all.js"></script>
	<script type="text/javascript" src="js/App.js"></script>
	<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
	<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
	<link href="css/mask.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="page/Ct/Ct-selectCtTree.js?t=<%=System.currentTimeMillis()%>"></script>
</head>
<style>
.ui-menu { width: 150px; }
</style>
<body style="height:400px">
	<form id="frm"  action="Ct!updateCateId.do" method="post">
		<table width="100%" border="0" cellspacing="0" cellpadding="0" id="myTable">
			<tr>
				<td width="280" valign="top" height="380" >
					<input id="treeRootPrefix" name="treeRootPrefix" value='${treeRootPrefix}' type="hidden"></input>
					<input id="treeRootId" name="treeRootId" value='${treeRootId}' type="hidden"></input>
					<input id="flId" name="flId" value='${flId}' type="hidden"></input>
					<input id="objectId" name="objectId" value="" type="hidden"></input>
					<div id="tree"></div>
				</td>
			</tr>
		</table>
	</form>
</body>
</html>