<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>公告查看</title>
		<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
		<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="js/App.js"></script>
		<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
		<link rel="stylesheet" type="text/css" href="css/mask.css" />
		<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
		<script type="text/javascript" src="page/NoticeWatch/NoticeWatch-list.js"></script>
		<script type="text/javascript" src="js/jquery.enplaceholder.js"></script>
		<script type="text/javascript" src="js/search.js"></script>
	</head>
	<body>
		<form id="frm" action="NoticeWatch!watch">
		<table width="50%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title">
				<tr>
					<td>
						<div class="wdtable_titleh">
							公告查看
						</div>
						<div class="wdtable_titletool">
							<a href="#" onclick="window.close();">关闭</a>
						</div>
					</td>
				</tr>
			</table>
			<div>
				<div style="float:left">
				<p style="font-size:15px">${noticeType}</p>
				</div>
				<div style="margin-left: 520px;">
					<p style="font-size:15px">${createUser }&nbsp &nbsp &nbsp 点击率【${ clickCount}】</p>
				</div>
			</div>
				
			<table width="50%" height="40px" border="0" cellspacing="0" cellpadding="0" >
				<tr>
					<td width="100%">
					<center>
					<h1>${title}</h1>
					</center>
					</td>
				</tr>
			</table>
			<table width="50%" border="0" cellspacing="0" cellpadding="0" >
				<tr>
					<td width="100%">
						${content }
					</td>
				</tr>
			</table>
		<form>
	</body>
</html>
