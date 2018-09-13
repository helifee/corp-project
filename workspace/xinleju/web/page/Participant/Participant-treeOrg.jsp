<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>组织架构选择</title>
		<base target="_self"/>
		<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="js/App.js"></script>
		<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
		<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
		<link href="css/mask.css" rel="stylesheet" type="text/css" />
		<link href="js/ext/resources/css/ext-all.css" rel="stylesheet" type="text/css" />
		<script src="js/ext/adapter/ext/ext-base.js"></script>
		<script src="js/ext/ext-all.js"></script>
		<script type="text/javascript" src="js/ext/ux/ux-all.js"></script>
		<script type="text/javascript" src="page/Participant/Participant-treeOrg.js?t=<%=System.currentTimeMillis()%>"></script>
		<link rel="stylesheet" href="css/icon.css" type="text/css" />
		<script src="js/ext/TreeCheckNodeUI.js"></script>
	</head>
	<body>
		<div class="popgsfl_title" style="width:300px; margin-bottom: 5px;">
			<table width="100%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title" style="background: #f1f1f1;">
				<tr>
					<td>
						<div class="wdtable_titleh" style="color: #0078ce;">请选择</div>
						<div class="wdtable_titletool">
							<a href="#" onclick="window.choosePartyAll();return false;" style="color: #0078ce;">确定</a>
							<a href="#" onclick="window.close();return false;" style="color: #0078ce;">关闭</a>
						</div>
					</td>
				</tr>
			</table>
		</div>
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td height="400" valign="top" >
					<div style='margin-left:10px'>查询条件：<input id="query_tree_qk" style="width: 180px">
					&nbsp;<input id="btn_q" class="btn_q" type="button" value=" 查询 " onclick="query_tree()"></div>
					<div style='margin-left:10px' id="partyEntityTree"></div>
				</td>
			</tr>
		</table>
	</body>
</html>
